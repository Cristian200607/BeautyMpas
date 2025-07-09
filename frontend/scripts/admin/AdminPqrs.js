import {
  getPQRS,
  putEstadoPQRS,
  deletePQRS,
  getTiposPQRS,
  postTipoPQRS,
} from '../../apis/apisPqrs.js';

document.addEventListener('DOMContentLoaded', async () => {
  await cargarPQRS();
  await cargarTipos();

  // Configurar el filtro de estado
  document.getElementById('filtroEstado').addEventListener('change', (e) => {
    const estadoSeleccionado = e.target.value;
    cargarPQRS(estadoSeleccionado);
  });
});

// Cargar PQRS (opcionalmente filtradas por estado)
async function cargarPQRS(filtro = 'todos') {
  try {
    const { pqrs } = await getPQRS();
    const tbody = document.getElementById('pqrs-body');
    tbody.innerHTML = '';

    const filtradas = filtro === 'todos'
      ? pqrs
      : pqrs.filter(p => p.estado === filtro);

    if (filtradas.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7">No hay PQRS con ese estado.</td></tr>';
      return;
    }

    filtradas.forEach((item) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.nombre_usuario}</td>
        <td>${item.correo_usuario}</td>
        <td>${item.tipo_nombre}</td>
        <td>${item.descripcion}</td>
        <td>
          <select onchange="cambiarEstado(${item.id}, this.value)">
            <option value="pendiente" ${item.estado === 'pendiente' ? 'selected' : ''}>Pendiente</option>
            <option value="en proceso" ${item.estado === 'en proceso' ? 'selected' : ''}>En proceso</option>
            <option value="resuelto" ${item.estado === 'resuelto' ? 'selected' : ''}>Resuelto</option>
          </select>
        </td>
        <td><button onclick="eliminarPQRS(${item.id})">🗑️</button></td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error('Error al cargar PQRS:', err);
    alert('❌ Error al cargar PQRS');
  }
}

// Cargar lista de tipos
async function cargarTipos() {
  try {
    const { tipos } = await getTiposPQRS();
    const lista = document.getElementById('tipos-lista');
    lista.innerHTML = '';

    tipos.forEach((tipo) => {
      const li = document.createElement('li');
      li.textContent = `${tipo.id}. ${tipo.nombre_tipó}`;
      lista.appendChild(li);
    });
  } catch (err) {
    console.error('Error al cargar tipos:', err);
    alert('❌ Error al cargar tipos de PQRS');
  }
}

// Cambiar estado
window.cambiarEstado = async (id, nuevoEstado) => {
  try {
    await putEstadoPQRS(id, nuevoEstado);
    alert('✅ Estado actualizado');
  } catch (err) {
    console.error('Error al actualizar estado:', err);
    alert('❌ Error al actualizar estado');
  }
};

// Eliminar PQRS
window.eliminarPQRS = async (id) => {
  if (!confirm('¿Eliminar esta PQRS?')) return;

  try {
    await deletePQRS(id);
    alert('✅ PQRS eliminada');
    await cargarPQRS(document.getElementById('filtroEstado').value); // Refrescar con filtro actual
  } catch (err) {
    console.error('Error al eliminar PQRS:', err);
    alert('❌ Error al eliminar PQRS');
  }
};

// Crear nuevo tipo de PQRS
const form = document.getElementById('form-tipo');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const input = document.getElementById('nuevoTipoInput');
  const nombre = input.value.trim();

  if (!nombre) return alert('⚠️ Ingresa un nombre válido');

  try {
    await postTipoPQRS(nombre);
    alert('✅ Tipo creado');
    input.value = '';
    await cargarTipos(); // Refrescar lista
  } catch (err) {
    console.error('Error al crear tipo:', err);
    alert('❌ Error al crear tipo');
  }
});
