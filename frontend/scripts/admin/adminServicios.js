import { getCategoria } from '../../apis/apisCategoria.js';
import {
  getServicios,
  postServicioProfesional,
  actualizarServicio,
  eliminarServicio
} from '../../apis/apisServicio.js';

const btnAgregar = document.getElementById('btnAgregar');
const tabla = document.querySelector('#tablaCategorias tbody');

const inputNombreServicio = document.getElementById('nombreServicio');
const inputPrecioServicio = document.getElementById('precioServicio');
const inputDescripcionServicio = document.getElementById('descripcionServicio');
const inputTiempoServicio = document.getElementById('tiempoServicio');

let categoriasSeleccionadas = [];
let categoriasDisponibles = [];

try {
  const data = await getCategoria();
  categoriasDisponibles = data.categorias || [];
  categoriasDisponibles.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.id;
    option.textContent = cat.categoria;
  });
} catch (err) {
  console.error("Error al cargar categorías:", err);
  alert("No se pudieron cargar las categorías.");
}

try {
  const dataServicios = await getServicios();
  categoriasSeleccionadas = dataServicios.map(serv => {
    const categoria = categoriasDisponibles.find(cat => cat.id == serv.id_categoria);
    return {
      id: serv.id_categoria,
      nombre: categoria ? categoria.categoria : `Categoría ${serv.id_categoria}`,
      servicio: serv.servicio,
      precio: serv.precio,
      descripcion: serv.descripcion_servicio || '',
      tiempo: serv.tiempo_servicio || '',
      id_servicio: serv.id,
      id_profesional: serv.id_profesional,
      nombre_profesional: serv.nombre_profesional || '',
      email_profesional: serv.email_profesional || ''
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

  if (!nombreServicio || !precioServicio) {
    alert("Debes escribir el nombre y el precio del servicio.");
    return;
  }

  categoriasSeleccionadas.push({
    id: selectedId,
    nombre: selectedText,
    servicio: nombreServicio,
    precio: parseFloat(precioServicio),
    descripcion: descripcionServicio,
    tiempo: tiempoServicio,
    id_profesional: null,
    nombre_profesional: '',
    email_profesional: ''
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
      <td>${cat.nombre_profesional || '-'}</td>
      <td>${cat.email_profesional || '-'}</td>
      <td>
        <div style="display:flex; gap:8px; justify-content:center;">
          <button class="btnGuardar" data-index="${index}">Guardar</button>
          <button class="btnEliminar" data-index="${index}">Eliminar</button>
        </div>
      </td>
    `;
    tabla.appendChild(fila);
  });

  // Listeners para botones
  document.querySelectorAll('.btnEliminar').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const index = e.target.getAttribute('data-index');
      const cat = categoriasSeleccionadas[index];
      if (!cat) return;

      const confirmar = confirm(`¿Seguro que deseas eliminar el servicio "${cat.servicio}"?`);
      if (!confirmar) return;

      if (cat.id_servicio) {
        try {
          await eliminarServicio(cat.id_servicio);
          alert("Servicio eliminado del servidor.");
        } catch (err) {
          console.error("Error al eliminar servicio:", err);
          alert("Error al eliminar servicio.");
          return;
        }
      }

      categoriasSeleccionadas.splice(index, 1);
      renderizarTabla();
    });
  });

  document.querySelectorAll('.btnGuardar').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const index = e.target.getAttribute('data-index');
      const nuevoServicio = document.querySelector(`.input-servicio[data-index="${index}"]`).value.trim();
      const nuevoPrecio = parseFloat(document.querySelector(`.input-precio[data-index="${index}"]`).value);
      const nuevaDescripcion = document.querySelector(`.input-descripcion[data-index="${index}"]`).value.trim();
      const nuevoTiempo = document.querySelector(`.input-tiempo[data-index="${index}"]`).value.trim();

      if (!nuevoServicio || isNaN(nuevoPrecio)) {
        alert("Campos inválidos.");
        return;
      }

      const cat = categoriasSeleccionadas[index];
      cat.servicio = nuevoServicio;
      cat.precio = nuevoPrecio;
      cat.descripcion = nuevaDescripcion;
      cat.tiempo = nuevoTiempo;

      if (cat.id_servicio) {
        try {
          await actualizarServicio(cat.id_servicio, {
            id_categoria: cat.id,
            id_profesional: cat.id_profesional,
            servicio: cat.servicio,
            precio: cat.precio,
            descripcion_servicio: cat.descripcion,
            tiempo_servicio: cat.tiempo
          });
          alert("Servicio actualizado correctamente.");
        } catch (err) {
          console.error("Error al actualizar servicio:", err);
          alert("Error al actualizar servicio.");
        }
      } else {
        alert("Cambios guardados localmente (servicio nuevo aún no registrado).");
      }
    });
  });
}


