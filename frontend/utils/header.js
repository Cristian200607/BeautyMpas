function loadHeader() {
  fetch('../utils/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-container').innerHTML = data;

      const nav = document.querySelector("#nav");
      const abrir = document.querySelector("#abrir");
      const cerrar = document.querySelector("#cerrar");

      abrir.addEventListener("click", () => {
        nav.classList.add("visible");
      });

      cerrar.addEventListener("click", () => {
        nav.classList.remove("visible");
      });

      const usuarios = JSON.parse(localStorage.getItem('usuario')); // 👈 nombre correcto
      const userLinks = document.getElementById('user-links');

      if (usuarios) {
        userLinks.innerHTML = `
          <span>Hola, ${usuarios.nombre}</span>
          <a href="#">Contacto</a>
          <a href="#">Soporte</a>
          <a href="#" id="logout-link">Cerrar sesión</a>
        `;

        document.getElementById('logout-link').addEventListener('click', (e) => {
          e.preventDefault(); 
          localStorage.removeItem('usuario'); 
          window.location.href = "/frontend/pages/login.html";
        });

      }
    });
}

document.addEventListener('DOMContentLoaded', loadHeader);
