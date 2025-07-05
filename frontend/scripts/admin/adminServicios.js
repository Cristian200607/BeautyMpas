import {
  getCategoria,
} from '../../apis/apisCategoria.js';

import {
  getServicios,
  crearServicio,
  actualizarServicio,
  eliminarServicio,
} from '../../apis/apisServicio.js';

let modoEdicion = false;
let idEditar = null;

document.addEventListener('DOMContentLoaded', async () => {
  await cargarCategorias();
  await cargarServicios();
});

async function cargarCategorias() {
  try {
    const data = await getCategoria();
    const select = document.getElementById('nueva-categoria');
    select.innerHTML = '';

    data.categorias.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.id;
      option.textContent = cat.categoria;
      select.appendChild(option);
    });
  } catch (err) {
    console.error('Error cargando categorías:', err);
  }
}

async function cargarServicios() {
  try {
    const servicios = await getServicios(); // corregido: ya es array, no destructures
    const tbody = document.getElementById('servicios-body');
    tbody.innerHTML = '';

    servicios.forEach(serv => {
      const servicioSanitizado = serv.servicio.replace(/'/g, "\\'");
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${serv.id}</td>
        <td>${serv.servicio}</td>
        <td>${serv.precio}</td>
        <td>${serv.nombre_categoria}</td>
        <td>
          <button onclick="editarServicio(${serv.id}, '${servicioSanitizado}', ${serv.precio}, ${serv.id_categorias})">✏️Editar</button>
          <button onclick="eliminarServicio(${serv.id})">🗑️Eliminar</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error('Error cargando servicios:', err);
  }
}

document.getElementById('form-crear-servicio').addEventListener('submit', async (e) => {
  e.preventDefault();

  const servicio = document.getElementById('nuevo-servicio').value;
  const precio = document.getElementById('nuevo-precio').value;
  const id_categorias = document.getElementById('nueva-categoria').value;

  const datos = { servicio, precio, id_categorias };

  try {
    if (modoEdicion) {
      await actualizarServicio(idEditar, datos);
    } else {
      await crearServicio(datos);
    }

    alert(`Servicio ${modoEdicion ? 'editado' : 'creado'} correctamente`);
    document.getElementById('form-crear-servicio').reset();
    modoEdicion = false;
    idEditar = null;
    document.querySelector('#form-crear-servicio button').textContent = 'Guardar';

    await cargarServicios();
  } catch (err) {
    console.error(`Error al ${modoEdicion ? 'editar' : 'crear'} servicio:`, err);
    alert(`No se pudo ${modoEdicion ? 'editar' : 'crear'} el servicio`);
  }
});

window.editarServicio = function(id, servicio, precio, id_categorias) {
  document.getElementById('nuevo-servicio').value = servicio;
  document.getElementById('nuevo-precio').value = precio;
  document.getElementById('nueva-categoria').value = id_categorias;
  document.querySelector('#form-crear-servicio button').textContent = 'Actualizar';
  modoEdicion = true;
  idEditar = id;
};

window.eliminarServicio = async function(id) {
  if (!confirm('¿Deseas eliminar este servicio?')) return;

  try {
    await eliminarServicio(id);
    alert('Servicio eliminado correctamente');
    await cargarServicios();
  } catch (err) {
    console.error('Error al eliminar:', err);
    alert('No se pudo eliminar el servicio');
  }
};
