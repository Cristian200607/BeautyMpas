import {getProfesional} from '../../apis/apisProfesional.js'

document.addEventListener('DOMContentLoaded', async () => {
  
  const nombreElements = document.querySelectorAll('.texts p');
  const botones = document.querySelectorAll('.btnVer');

  try{
    
    const data = await getProfesional()
    console.log(data);
    const listaProfesionales = data.profesionales;

    listaProfesionales.forEach((pro, index) => {
      if (index < nombreElements.length) {
        nombreElements[index].textContent = pro.nombre;
      }
      if (index < botones.length) {
        botones[index].setAttribute('data-id', pro.id);
        
      }
    });

    botones.forEach(btn => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        console.log('ID al hacer clic:', id);
        window.location.href = `/frontend/pages/user/cuentaProfesional.html?id=${id}`;

      });
    });

  }catch(error) {
    console.error("Hubo un problema con la solicitud Fetch:", error);
    nombreElements.forEach(p => {
      p.textContent = "Error al cargar los datos de profesionales.";
    });
  }
});
