const API_URL_CAT = 'http://localhost:3000/api/categorias';

document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.querySelector('.contenedor-servicios');

  fetch(API_URL_CAT)
    .then(response => {
      if (!response.ok) {
        throw new Error("Error en la respuesta de la red");
      }
      return response.json();
    })
    .then(data => {
      const categorias = data.categorias;

      contenedor.innerHTML = ''; // Limpiar contenido previo

      categorias.forEach(cat => {
        const tarjeta = document.createElement('a');
        tarjeta.href = `Info_servicios/${cat.categoria.toLowerCase()}.html`; // opcional
        tarjeta.innerHTML = `<div class="tarjeta"><p>${cat.categoria}</p></div>`;
        contenedor.appendChild(tarjeta);
      });
    })
    .catch(error => {
      console.error("Hubo un problema con la solicitud Fetch:", error);
      contenedor.innerHTML = '<p>Error al cargar las categorías.</p>';
    });
});
