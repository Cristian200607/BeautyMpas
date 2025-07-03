// admin.js

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('http://localhost:3000/api/getProfesionales');
    if (!response.ok) {
      throw new Error('Error al obtener profesionales');
    }

    const data = await response.json();
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

// Funciones para botones
function editarProfesional(id) {
  fetch(`http://localhost:3000/api/getProfesionalById/${id}`)
    .then(res => res.json())
    .then(data => {
      const prof = data.profesional;
      const nuevoNombre = prompt('Editar nombre:', prof.nombre);
      const nuevoEmail = prompt('Editar email:', prof.email);
      const nuevaDireccion = prompt('Editar dirección:', prof.direccion);
      const nuevoTelefono = prompt('Editar teléfono:', prof.telefono);

      if (!nuevoNombre || !nuevoEmail) {
        alert('Nombre y Email son obligatorios');
        return;
      }

      fetch(`http://localhost:3000/api/updateProfesional/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: nuevoNombre,
          email: nuevoEmail,
          direccion: nuevaDireccion,
          telefono: nuevoTelefono
        })
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Error al actualizar');
        }
        return res.json();
      })
      .then(() => {
        alert('Profesional actualizado correctamente');
        location.reload();
      })
      .catch(err => {
        console.error(err);
        alert('No se pudo actualizar el profesional');
      });
    })
    .catch(err => {
      console.error('Error al cargar datos del profesional:', err);
    });
}


function eliminarProfesional(id) {
  if (confirm('¿Estás seguro de que deseas eliminar este profesional?')) {
    fetch(`http://localhost:3000/api/deleteProfesional/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error al eliminar profesional');
        }
        return res.json();
      })
      .then(() => {
        alert('Profesional eliminado');
        location.reload(); // recargar para reflejar los cambios
      })
      .catch((err) => {
        console.error(err);
        alert('No se pudo eliminar el profesional');
      });
  }
}

document.getElementById('form-editar-profesional').addEventListener('submit', async (e) => {
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
    const res = await fetch(`http://localhost:3000/api/editarProfesional/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profesionalActualizado)
    });

    if (!res.ok) throw new Error('Error al editar profesional');

    alert('Profesional actualizado');
    location.reload();
  } catch (err) {
    console.error(err);
    alert('No se pudo actualizar el profesional');
  }
});
