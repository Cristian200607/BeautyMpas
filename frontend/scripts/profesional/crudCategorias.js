import { getCategoria } from '../../apis/apisCategoria.js';
import { getServiciosByIdProfesional, postServicioProfesional} from '../../apis/apisServicio.js';

const selectCategorias = document.getElementById('select-categorias');
const btnAgregar = document.getElementById('btnAgregar');
const tabla = document.querySelector('#tablaCategorias tbody');
const btnFinalizar = document.getElementById('btnFinalizar');

const inputNombreServicio = document.getElementById('nombreServicio');
const inputPrecioServicio = document.getElementById('precioServicio');
const inputDescripcionServicio = document.getElementById('descripcionServicio');
const inputTiempoServicio = document.getElementById('tiempoServicio');

const params = new URLSearchParams(window.location.search);
const idProfesional = params.get('id');

let categoriasSeleccionadas = [];
let categoriasDisponibles = [];

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

try {
  const dataServicios = await getServiciosByIdProfesional(idProfesional);
  categoriasSeleccionadas = dataServicios.servicios.map(serv => {
    const categoria = categoriasDisponibles.find(cat => cat.id == serv.id_categoria);
    return {
      id: serv.id_categoria,
      nombre: categoria ? categoria.categoria : `Categoría ${serv.id_categoria}`,
      servicio: serv.servicio,
      precio: serv.precio,
      descripcion: serv.descripcion_servicio || '',
      tiempo: serv.tiempo_servicio || '',
      id_servicio: serv.id
    };
  });
  renderizarTabla();
} catch (err) {
  console.error("Error al cargar servicios existentes:", err);
}

btnAgregar.addEventListener('click', () => {
  const selectedId = selectCategorias.value;
  const selectedText = selectCategorias.options[selectCategorias.selectedIndex].text;
  const nombreServicio = inputNombreServicio.value.trim();
  const precioServicio = inputPrecioServicio.value.trim();
  const descripcionServicio = inputDescripcionServicio.value.trim();
  const tiempoServicio = inputTiempoServicio.value.trim();

  if (!nombreServicio || !precioServicio || !descripcionServicio || !tiempoServicio) {
    alert("Debes completar todos los campos.");
    return;
  }

  categoriasSeleccionadas.push({ 
    id: selectedId, 
    nombre: selectedText, 
    servicio: nombreServicio,
    precio: parseFloat(precioServicio),
    descripcion: descripcionServicio,
    tiempo: tiempoServicio
  });

  selectCategorias.selectedIndex = 0;
  inputNombreServicio.value = '';
  inputPrecioServicio.value = '';
  inputDescripcionServicio.value = '';
  inputTiempoServicio.value = '';

  renderizarTabla();
});

function renderizarTabla() {
  tabla.innerHTML = '';
  categoriasSeleccionadas.forEach((cat, index) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${cat.nombre}</td>
      <td><input type="text" value="${cat.servicio}" data-index="${index}" class="input-servicio"></td>
      <td><input type="number" value="${cat.precio}" data-index="${index}" class="input-precio"></td>
      <td><input type="text" value="${cat.descripcion}" data-index="${index}" class="input-descripcion"></td>
      <td><input type="text" value="${cat.tiempo}" data-index="${index}" class="input-tiempo"></td>
      <td>
        <button class="btnGuardar" data-index="${index}">Guardar</button>
        <button class="btnEliminar" data-id="${cat.id}">Eliminar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });

  document.querySelectorAll('.btnEliminar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      categoriasSeleccionadas = categoriasSeleccionadas.filter(cat => cat.id != id);
      renderizarTabla();
    });
  });

  document.querySelectorAll('.btnGuardar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      const nuevoServicio = document.querySelector(`.input-servicio[data-index="${index}"]`).value.trim();
      const nuevoPrecio = parseFloat(document.querySelector(`.input-precio[data-index="${index}"]`).value);
      const nuevaDescripcion = document.querySelector(`.input-descripcion[data-index="${index}"]`).value.trim();
      const nuevoTiempo = document.querySelector(`.input-tiempo[data-index="${index}"]`).value.trim();

      if (!nuevoServicio || isNaN(nuevoPrecio) || !nuevaDescripcion || !nuevoTiempo) {
        alert("Campos inválidos.");
        return;
      }

      categoriasSeleccionadas[index].servicio = nuevoServicio;
      categoriasSeleccionadas[index].precio = nuevoPrecio;
      categoriasSeleccionadas[index].descripcion = nuevaDescripcion;
      categoriasSeleccionadas[index].tiempo = nuevoTiempo;

      alert("Cambios guardados en la tabla (sin actualizar aún en el servidor)");
    });
  });
}

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
    precio: cat.precio,
    descripcion_servicio: cat.descripcion,
    tiempo_servicio: cat.tiempo
  }));

  try {
    const data = await postServicioProfesional(dataPostCategoriaProfesional);
    alert(data.message);

    if (data.message.includes("correctamente")) {
      window.location.reload();
    }

  } catch (error) {
    console.error('Error en el registro:', error);
    alert(error.message || 'Ocurrió un error al intentar registrar. Inténtalo de nuevo.');
  }
});
