import { getProfesionalById } from '../../apis/apisProfesional.js';
import { getImagenPerfil, getImagenesPortafolio } from '../../apis/apisImagen.js';

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const idRolProfesional = params.get('id');
  console.log('ID recibido desde la URL:', idRolProfesional);

  try {
    const data = await getProfesionalById(idRolProfesional);
    const profesional = data.profesional;

    document.getElementById("nombreDisplay").textContent = profesional.nombre;
    document.getElementById("emailDisplay").textContent = profesional.email;
    document.getElementById("direccionDisplay").textContent = profesional.documento;
    document.getElementById("telefonoDisplay").textContent = profesional.telefono;
  } catch (err) {
    console.error("Error en la solicitud:", err);
  }

  // Mostrar imagen de perfil
  try {
    const imagenPerfil = await getImagenPerfil(idRolProfesional);
    if (imagenPerfil.urlPerfil) {
      document.getElementById("imagenPerfil").src = imagenPerfil.urlPerfil;
    }
  } catch (err) {
    console.error("Error al obtener imagen de perfil:", err);
  }

  // Mostrar imágenes del portafolio
  try {
    const response = await getImagenesPortafolio(idRolProfesional);
    const imagenesPortafolio = response.imagenes || [];
    const collageDiv = document.getElementById("collagePortafolio");

    const modal = document.getElementById("modalImagen");
    const modalImg = document.getElementById("imgGrande");
    const spanCerrar = document.querySelector(".cerrar");
    const btnAnterior = document.querySelector(".anterior");
    const btnSiguiente = document.querySelector(".siguiente");

    let imagenActual = 0;
    const urlsImagenes = [];

    imagenesPortafolio.forEach((img, index) => {
      const imgElement = document.createElement("img");
      imgElement.src = img.urlPortafolio;
      imgElement.alt = "Imagen del portafolio";
      collageDiv.appendChild(imgElement);

      urlsImagenes.push(img.urlPortafolio);

      imgElement.addEventListener("click", () => {
        imagenActual = index;
        abrirModal(imagenActual);
      });
    });

    // Funciones del modal
    function abrirModal(index) {
      modal.style.display = "block";
      modalImg.src = urlsImagenes[index];
      modalImg.style.transform = "scale(1)";
    }

    spanCerrar.onclick = function () {
      modal.style.display = "none";
      modalImg.style.transform = "scale(1)";
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
        modalImg.style.transform = "scale(1)";
      }
    };

    btnSiguiente.onclick = function () {
      imagenActual = (imagenActual + 1) % urlsImagenes.length;
      abrirModal(imagenActual);
    };

    btnAnterior.onclick = function () {
      imagenActual = (imagenActual - 1 + urlsImagenes.length) % urlsImagenes.length;
      abrirModal(imagenActual);
    };

    // Zoom al hacer click
    let zoomIn = false;
    modalImg.addEventListener("click", () => {
      zoomIn = !zoomIn;
      modalImg.style.transform = zoomIn ? "scale(2)" : "scale(1)";
    });

  } catch (err) {
    console.error("Error al obtener imágenes del portafolio:", err);
  }
});
