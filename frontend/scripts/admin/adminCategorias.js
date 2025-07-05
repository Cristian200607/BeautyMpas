import {
  getCategoria,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoriaPorId,
} from '../../apis/apisCategoria.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const data = await getCategoria();
    console.log('Respuesta del backend:', data);

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
    await crearCategoria(nombre);
    alert('✅ Categoría creada con éxito');
    location.reload();
  } catch (err) {
    console.error('Error creando categoría:', err);
    alert('❌ Ocurrió un error al crear la categoría');
  }
});

window.editarCategoria = async (id, nombreActual) => {
  const nuevoNombre = prompt('Editar categoría:', nombreActual);
  if (nuevoNombre === null) return;
  const nombreTrim = nuevoNombre.trim();
  if (!nombreTrim) return alert('El nombre no puede estar vacío');

  try {
    await actualizarCategoria(id, nombreTrim);
    alert('✅ Categoría actualizada');
    location.reload();
  } catch (err) {
    console.error('Error actualizando categoría:', err);
    alert('❌ No se pudo actualizar');
  }
};

window.eliminarCategoria = async (id) => {
  const confirmar = confirm('¿Estás seguro de que quieres eliminar esta categoría?');
  if (!confirmar) return;

  try {
    await eliminarCategoriaPorId(id);
    alert('✅ Categoría eliminada');
    location.reload();
  } catch (err) {
    console.error('Error eliminando categoría:', err);
    alert('❌ No se pudo eliminar');
  }
};
