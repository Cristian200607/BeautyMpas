function loadHeader() {
  fetch('/frontend/utils/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-container').innerHTML = data;

      setTimeout(() => {
        const nav = document.querySelector("#nav");
        const abrir = document.querySelector("#abrir");
        const cerrar = document.querySelector("#cerrar");
        const userLinks = document.getElementById('user-links');
        const cerrarSesion = document.getElementById('cerrar-sesion');

        // Mostrar y ocultar el menú
        if (abrir && cerrar && nav) {
          abrir.addEventListener("click", () => {
            nav.classList.add("visible");
            abrir.style.display = "none";
          });

          cerrar.addEventListener("click", () => {
            nav.classList.remove("visible");
            abrir.style.display = "inline-block";
          });
        }

        // Mostrar datos del usuario
        const usuario = JSON.parse(localStorage.getItem('usuario'));

        if (usuario && userLinks) {
          userLinks.innerHTML = `Hola, ${usuario.nombre}`;
        }

        if (usuario && cerrarSesion) {
          cerrarSesion.innerHTML = `
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
      }, 0);
    });
}

document.addEventListener('DOMContentLoaded', loadHeader);
