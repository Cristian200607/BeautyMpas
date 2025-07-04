import { getCategoria, postCategoriaProfesional } from '../../apis/apisCategoria.js';
import { getServiciosByIdProfesional } from '../../apis/apisServicio.js'; // función ya importada

const selectCategorias = document.getElementById('select-categorias');
const btnAgregar = document.getElementById('btnAgregar');
const tabla = document.querySelector('#tablaCategorias tbody');
const btnFinalizar = document.getElementById('btnFinalizar');

const inputNombreServicio = document.getElementById('nombreServicio');
const inputPrecioServicio = document.getElementById('precioServicio');
const params = new URLSearchParams(window.location.search);
const idProfesional = params.get('id');

let categoriasSeleccionadas = [];
let categoriasDisponibles = [];

// 🟩 Cargar categorías al <select>
try {
  const data = await getCategoria();
  categoriasDisponibles = data.categorias || [];
  categoriasDisponibles.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.id;
    option.textContent = cat.categoria;
    selectCategorias.appendChild(option);
  });
} catch (err) {
  console.error("Error al cargar categorías:", err);
  alert("No se pudieron cargar las categorías.");
}

// 🟩 Cargar servicios existentes
try {
  const dataServicios = await getServiciosByIdProfesional(idProfesional);
  categoriasSeleccionadas = dataServicios.servicios.map(serv => {
    const categoria = categoriasDisponibles.find(cat => cat.id == serv.id_categoria);
    return {
      id: serv.id_categoria,
      nombre: categoria ? categoria.categoria : `Categoría ${serv.id_categoria}`,
      servicio: serv.servicio,
      precio: serv.precio,
      id_servicio: serv.id
    };
  });
  renderizarTabla();
} catch (err) {
  console.error("Error al cargar servicios existentes:", err);
}

// 🟩 Agregar nueva fila
btnAgregar.addEventListener('click', () => {
  const selectedId = selectCategorias.value;
  const selectedText = selectCategorias.options[selectCategorias.selectedIndex].text;
  const nombreServicio = inputNombreServicio.value.trim();
  const precioServicio = inputPrecioServicio.value.trim();

  if (!selectedId || categoriasSeleccionadas.some(c => c.id == selectedId)) {
    alert("Categoría ya seleccionada o inválida.");
    return;
  }

  if (!nombreServicio || !precioServicio) {
    alert("Debes escribir el nombre y el precio del servicio.");
    return;
  }

  categoriasSeleccionadas.push({ 
    id: selectedId, 
    nombre: selectedText, 
    servicio: nombreServicio,
    precio: parseFloat(precioServicio)
  });

  selectCategorias.selectedIndex = 0;
  inputNombreServicio.value = '';
  inputPrecioServicio.value = '';

  renderizarTabla();
});

// 🟩 Renderizar tabla con inputs editables
function renderizarTabla() {
  tabla.innerHTML = '';
  categoriasSeleccionadas.forEach((cat, index) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${cat.nombre}</td>
      <td><input type="text" value="${cat.servicio}" data-index="${index}" class="input-servicio"></td>
      <td><input type="number" value="${cat.precio}" data-index="${index}" class="input-precio"></td>
      <td>
        <button class="btnGuardar" data-index="${index}">Guardar</button>
        <button class="btnEliminar" data-id="${cat.id}">Eliminar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });

  // 🟩 Eliminar categoría de la tabla
  document.querySelectorAll('.btnEliminar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      categoriasSeleccionadas = categoriasSeleccionadas.filter(cat => cat.id != id);
      renderizarTabla();
    });
  });

  // 🟩 Guardar cambios en inputs (sin enviar al backend)
  document.querySelectorAll('.btnGuardar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      const nuevoServicio = document.querySelector(`.input-servicio[data-index="${index}"]`).value.trim();
      const nuevoPrecio = parseFloat(document.querySelector(`.input-precio[data-index="${index}"]`).value);

      if (!nuevoServicio || isNaN(nuevoPrecio)) {
        alert("Servicio o precio inválido.");
        return;
      }

      // ✅ Actualiza los valores del array
      categoriasSeleccionadas[index].servicio = nuevoServicio;
      categoriasSeleccionadas[index].precio = nuevoPrecio;

      alert("Cambios guardados en la tabla (sin actualizar aún en el servidor)");
    });
  });
}

// 🟩 Enviar NUEVOS servicios al backend
btnFinalizar.addEventListener('click', async () => {
  const nuevos = categoriasSeleccionadas.filter(cat => !cat.id_servicio);

  if (nuevos.length === 0) {
    alert("No hay nuevos servicios para registrar.");
    return;
  }

  const dataPostCategoriaProfesional = nuevos.map(cat => ({
    id_profesional: parseInt(idProfesional),
    id_categoria: parseInt(cat.id),
    servicio: cat.servicio,
    precio: cat.precio  
  }));

  try {
    const data = await postCategoriaProfesional(dataPostCategoriaProfesional);
    alert(data.message);

    if (data.message.includes("correctamente")) {
      window.location.reload(); // refresca la página
    }

  } catch (error) {
    console.error('Error en el registro:', error);
    alert(error.message || 'Ocurrió un error al intentar registrar. Inténtalo de nuevo.');
  }
});
