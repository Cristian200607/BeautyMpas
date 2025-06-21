const API_URL_PROF = 'http://localhost:3000/api/getProfesionales';

document.addEventListener('DOMContentLoaded', () => {
  const nombreElements = document.querySelectorAll('.texts p');
  const botones = document.querySelectorAll('.btnVer');

  fetch(API_URL_PROF)
    .then(response => {
      if (!response.ok) {
        throw new Error("Error en la respuesta de la red");
      }
      return response.json();
    })
    .then(data => {
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
          window.location.href = `/frontend/pages/user/cuentaProfesional.html?id=${id}`;

        });
      });

    })
    .catch(error => {
      console.error("Hubo un problema con la solicitud Fetch:", error);
      nombreElements.forEach(p => {
        p.textContent = "Error al cargar los datos de profesionales.";
      });
    });
});
