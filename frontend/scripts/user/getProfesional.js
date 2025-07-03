import {getProfesional} from '../../apis/apisProfesional.js'
import {getProfesionalesPorCategoria} from '../../apis/apisCategoria.js'

document.addEventListener('DOMContentLoaded', async () => {
  
  const nombreElements = document.querySelectorAll('.texts p');
  const params = new URLSearchParams(window.location.search);
  const idCategoria = params.get('id');
  console.log('ID recibido desde la URL:', idCategoria);

  try{
    if(idCategoria){
      const data = await getProfesionalesPorCategoria(idCategoria);
      console.log(data);
      const listProfesionalByCategoria = data.profesionales;
      const contenedor = document.querySelector('.container');
      contenedor.innerHTML = ''; // Limpiar contenido anterior
      if (listProfesionalByCategoria.length === 0) {
        contenedor.innerHTML = `
          <div class="sin-resultados">
            <p>No hay profesionales disponibles en esta categoría por ahora.</p>
          </div>
        `;
        return; // salir de la función para no seguir
      }
      listProfesionalByCategoria.forEach(profesional => {
        const box = document.createElement('div');
        box.className = 'box';
        box.innerHTML = `
          <div class="texts">
            <p>${profesional.nombre}</p>
            <button class="btnVer" data-id="${profesional.id}">RESERVA TU CITA YA</button>
          </div>
        `;

        const boton = box.querySelector('.btnVer');
        boton.addEventListener('click', () => {
          window.location.href = `/frontend/pages/user/cuentaProfesional.html?id=${profesional.id}`;
        });

        contenedor.appendChild(box);
        
      });

    }else{
      const data = await getProfesional()
      console.log(data);
      const listaProfesionales = data.profesionales;
      
      const contenedor = document.querySelector('.container');
      listaProfesionales.forEach(profesional => {
        const box = document.createElement('div');
        box.className = 'box';
        box.innerHTML = `
          <div class="texts">
            <p>${profesional.nombre}</p>
            <button class="btnVer" data-id="${profesional.id}">RESERVA TU CITA YA</button>
          </div>
        `;

        const boton = box.querySelector('.btnVer');
        boton.addEventListener('click', () => {
          window.location.href = `/frontend/pages/user/cuentaProfesional.html?id=${profesional.id}`;
        });

        contenedor.appendChild(box);
        
      });
    }
  }catch(error) {
    console.error("Hubo un problema con la solicitud Fetch:", error);
    nombreElements.forEach(p => {
      p.textContent = "Error al cargar los datos de profesionales.";
    });
  }
});
