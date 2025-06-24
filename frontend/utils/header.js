function loadHeader() {
  fetch('/frontend/utils/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-container').innerHTML = data;

      // Esperar un momento para que el DOM se actualice
      setTimeout(() => {
        const nav = document.querySelector("#nav");
        const abrir = document.querySelector("#abrir");
        const cerrar = document.querySelector("#cerrar");

        if (abrir && cerrar) {
          abrir.addEventListener("click", () => {
            nav.classList.add("visible");
          });

          cerrar.addEventListener("click", () => {
            nav.classList.remove("visible");
          });
        }

        const usuarios = JSON.parse(localStorage.getItem('usuario'));
        const userLinks = document.getElementById('user-links');

        if (usuarios && userLinks) {
          userLinks.innerHTML = `
            <span>Hola, ${usuarios.nombre}</span>
            <a href="#">Contacto</a>
            <a href="#">Soporte</a>
            <a href="#" id="logout-link">Cerrar sesión</a>
          `;

          const logout = document.getElementById('logout-link');
          if (logout) {
            logout.addEventListener('click', (e) => {
              e.preventDefault();
              localStorage.removeItem('usuario');
              window.location.href = "/frontend/pages/login.html";
            });
          }
        }
      }, 0); // <= Esto asegura que el DOM ya tenga el HTML insertado
    });
}

document.addEventListener('DOMContentLoaded', loadHeader);
