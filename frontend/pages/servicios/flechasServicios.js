document.addEventListener("DOMContentLoaded", () => {
  const rutas = [
    "/frontend/pages/servicios/maquillaje.html",
    "/frontend/pages/servicios/pestañas.html",
    "/frontend/pages/servicios/depilacion.html",
    "/frontend/pages/servicios/spa.html",
    "/frontend/pages/servicios/barberia.html"
  ];

  const rutaActual = window.location.pathname;

  const rutasDisponibles = rutas.filter(ruta => ruta !== rutaActual);

  function rutaAleatoria() {
    const indice = Math.floor(Math.random() * rutasDisponibles.length);
    return rutasDisponibles[indice];
  }

  const contenedor = document.getElementById("flechas-navegacion");

  contenedor.innerHTML = `
    <div class="navegacion-servicios">
      <a href="#" class="nav-flecha" id="flecha-atras">⬅ Servicio anterior</a>
      <a href="#" class="nav-flecha" id="flecha-siguiente">Siguiente servicio ➡</a>
    </div>
  `;

  document.getElementById("flecha-atras").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = rutaAleatoria();
  });

  document.getElementById("flecha-siguiente").addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = rutaAleatoria();
  });
});
