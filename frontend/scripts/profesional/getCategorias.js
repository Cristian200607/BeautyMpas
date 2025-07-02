import { getCategoria, postCategoriaProfesional } from '../../apis/apisCategoria.js';

const selectCategorias = document.getElementById('select-categorias');
const btnAgregar = document.getElementById('btnAgregar');
const tabla = document.querySelector('#tablaCategorias tbody');
const btnFinalizar = document.getElementById('btnFinalizar');

let categoriasSeleccionadas = [];

// Cargar categorías en el select
try {
  const data = await getCategoria();
  const categorias = data.categorias || [];
  categorias.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.id;
    option.textContent = cat.categoria;
    selectCategorias.appendChild(option);
  });
} catch (err) {
  console.error("Error al cargar categorías:", err);
  alert("No se pudieron cargar las categorías.");
}

// Agregar categoría seleccionada
btnAgregar.addEventListener('click', () => {
  const selectedId = selectCategorias.value;
  const selectedText = selectCategorias.options[selectCategorias.selectedIndex].text;

  if (!selectedId || categoriasSeleccionadas.some(c => c.id === selectedId)) {
    alert("Categoría ya seleccionada o inválida.");
    return;
  }

  categoriasSeleccionadas.push({ id: selectedId, nombre: selectedText });
  selectCategorias.selectedIndex = 0; // limpia selección
  renderizarTabla();
});

// Renderizar tabla
function renderizarTabla() {
  tabla.innerHTML = '';
  categoriasSeleccionadas.forEach((cat, index) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${cat.nombre}</td>
      <td><button class="btnEliminar" data-id="${cat.id}">Eliminar</button></td>
    `;
    tabla.appendChild(fila);
  });

  // Agregar eventos a botones de eliminar
  document.querySelectorAll('.btnEliminar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      categoriasSeleccionadas = categoriasSeleccionadas.filter(cat => cat.id !== id);
      renderizarTabla();
    });
  });
}

// Enviar categorías seleccionadas
btnFinalizar.addEventListener('click', async () => {
  if (categoriasSeleccionadas.length === 0) {
    alert("Debe seleccionar al menos una categoría.");
    return;
  }

  const id_profesional = JSON.parse(localStorage.getItem('usuario')).id;
  const id_categorias = categoriasSeleccionadas.map(cat => parseInt(cat.id));

  try {
    const data = await postCategoriaProfesional(id_profesional, id_categorias);
    alert(data.message);

    if (data.message.includes("correctamente")) {
      // Limpiar tabla y selección
      categoriasSeleccionadas = [];
      renderizarTabla();
      selectCategorias.selectedIndex = 0;

      // Redirigir si quieres
      window.location.href = '/frontend/pages/profesional/miCuenta.html';
    }

  } catch (error) {
    console.error('Error en el registro:', error);
    alert(error.message || 'Ocurrió un error al intentar registrar. Inténtalo de nuevo.');
  }
});
