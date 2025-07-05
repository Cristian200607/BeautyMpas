// adminProfesionales.js
import {
  getProfesionalById,
  getProfesional,
  updateProfesional,
  deleteProfesional
} from '../../apis/apisProfesional.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const data = await getProfesional(); // Usa la función que obtiene todos los profesionales
    const profesionales = data.profesionales;

    const tbody = document.getElementById('profesionales-body');

    profesionales.forEach((prof) => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${prof.nombre}</td>
        <td>${prof.email}</td>
        <td>${prof.direccion || 'Sin dirección'}</td>
        <td>${prof.telefono}</td>
        <td>${prof.id_categoria || 'N/A'}</td>
        <td>${prof.id_servicio || 'N/A'}</td>
        <td>
          <button onclick="editarProfesional(${prof.id})">✏️ Editar</button>
          <button onclick="eliminarProfesional(${prof.id})">🗑️ Eliminar</button>
        </td>
      `;

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Error al obtener profesionales:', error);
  }
});

// ✅ Función para editar profesional
window.editarProfesional = async (id) => {
  try {
    const data = await getProfesionalById(id);
    const prof = data.profesional;

    const nuevoNombre = prompt('Editar nombre:', prof.nombre);
    const nuevoEmail = prompt('Editar email:', prof.email);
    const nuevaDireccion = prompt('Editar dirección:', prof.direccion);
    const nuevoTelefono = prompt('Editar teléfono:', prof.telefono);

    if (!nuevoNombre || !nuevoEmail) {
      alert('Nombre y Email son obligatorios');
      return;
    }

    await updateProfesional(id, {
      nombre: nuevoNombre,
      email: nuevoEmail,
      direccion: nuevaDireccion,
      telefono: nuevoTelefono
    });

    alert('Profesional actualizado correctamente');
    location.reload();
  } catch (err) {
    console.error('Error al actualizar profesional:', err);
    alert('No se pudo actualizar el profesional');
  }
};

// ✅ Función para eliminar profesional
window.eliminarProfesional = async (id) => {
  if (!confirm('¿Estás seguro de que deseas eliminar este profesional?')) return;

  try {
    await deleteProfesional(id);
    alert('Profesional eliminado correctamente');
    location.reload();
  } catch (err) {
    console.error('Error al eliminar profesional:', err);
    alert('No se pudo eliminar el profesional');
  }
};

// ✅ Formulario (opcional si lo usás en otra vista)
const formEditar = document.getElementById('form-editar-profesional');
if (formEditar) {
  formEditar.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('edit-id').value;

    const profesionalActualizado = {
      nombre: document.getElementById('edit-nombre').value,
      email: document.getElementById('edit-email').value,
      direccion: document.getElementById('edit-direccion').value,
      telefono: document.getElementById('edit-telefono').value,
      documento: document.getElementById('edit-documento').value,
      id_categoria: document.getElementById('edit-id_categoria').value || null,
      id_servicio: document.getElementById('edit-id_servicio').value || null
    };

    try {
      await updateProfesional(id, profesionalActualizado);
      alert('Profesional actualizado');
      location.reload();
    } catch (err) {
      console.error(err);
      alert('No se pudo actualizar el profesional');
    }
  });
}
