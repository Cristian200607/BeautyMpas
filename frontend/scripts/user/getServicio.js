import {getCategoria} from '../../apis/apisCategoria.js'

document.addEventListener('DOMContentLoaded', async () => {
  const contenedor = document.querySelector('.contenedor-servicios');
  
    try{
      const data = await getCategoria();
      const categorias = data.categorias;

      contenedor.innerHTML = ''; // Limpiar contenido previo

      categorias.forEach(cat => {
        const tarjeta = document.createElement('a');
        //tarjeta.href = `Info_servicios/${cat.categoria.toLowerCase()}.html`; // opcional
        tarjeta.href = `/frontend/pages/user/catalogoProfesionales.html?id=${cat.id}`;
        tarjeta.innerHTML = `<div class="tarjeta"><p>${cat.categoria}</p></div>`;
        contenedor.appendChild(tarjeta);
      });
    }
    catch(error) {
      console.error("Hubo un problema con la solicitud Fetch:", error);
      contenedor.innerHTML = '<p>Error al cargar las categorías.</p>';
    };
});
