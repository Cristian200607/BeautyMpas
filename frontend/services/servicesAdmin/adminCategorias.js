document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('http://localhost:3000/api/categorias');
    const data = await res.json();
    console.log('Respuesta del backend:', data); // 👈 importante

    const categorias = data.categorias;

    if (!Array.isArray(categorias)) {
      throw new Error('La respuesta no contiene un array de categorías');
    }

    const tbody = document.getElementById('categorias-body');
    categorias.forEach((cat) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${cat.id}</td>
        <td>${cat.categoria}</td>
        <td>
          <button onclick="editarCategoria(${cat.id}, '${cat.categoria}')">✏️ Editar</button>
          <button onclick="eliminarCategoria(${cat.id})">🗑️ Eliminar</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (err) {
    console.error('Error al cargar categorías:', err);
  }
});

const formCategoria = document.getElementById('form-categoria');
formCategoria.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nueva-categoria').value.trim();
  if (!nombre) return alert('El nombre de la categoría no puede estar vacío');

  try {
    const res = await fetch('http://localhost:3000/api/categoria', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categoria: nombre }),
    });

    if (!res.ok) throw new Error('Error al crear la categoría');

    const nuevaCategoria = await res.json();
    alert('✅ Categoría creada con éxito');

    // Opcional: recargar página o insertar directamente en la tabla
    location.reload();
  } catch (err) {
    console.error('Error creando categoría:', err);
    alert('❌ Ocurrió un error al crear la categoría');
  }
});
window.editarCategoria = (id, nombreActual) => {
  const nuevoNombre = prompt('Editar categoría:', nombreActual);

  if (nuevoNombre === null) return; // Canceló
  const nombreTrim = nuevoNombre.trim();
  if (nombreTrim === '') return alert('El nombre no puede estar vacío');

  fetch(`http://localhost:3000/api/categoria/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ categoria: nombreTrim }),
  })
    .then((res) => {
      if (!res.ok) throw new Error('Error al actualizar la categoría');
      return res.json();
    })
    .then(() => {
      alert('✅ Categoría actualizada');
      location.reload();
    })
    .catch((err) => {
      console.error('Error actualizando categoría:', err);
      alert('❌ No se pudo actualizar');
    });
};

window.eliminarCategoria = (id) => {
  const confirmar = confirm('¿Estás seguro de que quieres eliminar esta categoría?');

  if (!confirmar) return;

  fetch(`http://localhost:3000/api/categoria/${id}`, {
    method: 'DELETE',
  })
    .then((res) => {
      if (!res.ok) throw new Error('Error al eliminar categoría');
      return res.json();
    })
    .then(() => {
      alert('✅ Categoría eliminada');
      location.reload();
    })
    .catch((err) => {
      console.error('Error eliminando categoría:', err);
      alert('❌ No se pudo eliminar');
    });
};


