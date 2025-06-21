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
    });
}

document.addEventListener('DOMContentLoaded', loadHeader);