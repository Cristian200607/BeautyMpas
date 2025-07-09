import { getProfesionalById } from '../../apis/apisProfesional.js';
import { getImagenPerfil, getImagenesPortafolio } from '../../apis/apisImagen.js';
import { getCategoria } from '../../apis/apisCategoria.js';
import { getServiciosByIdProfesional } from '../../apis/apisServicio.js';

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const idRolProfesional = params.get('id');
  console.log('ID recibido desde la URL:', idRolProfesional);
  const agendarBtn = document.getElementById("agendarCitaBtn");


  console.log('[INFO] ID del profesional desde URL:', idRolProfesional);

  // DATOS DEL PROFESIONAL
  try {
    const data = await getProfesionalById(idRolProfesional);
    const profesional = data.profesional;
    console.log('[INFO] Profesional cargado:', profesional);

    document.getElementById("nombreDisplay").textContent = profesional.nombre;
    document.getElementById("emailDisplay").textContent = profesional.email;
    document.getElementById("direccionDisplay").textContent = profesional.documento;
    document.getElementById("telefonoDisplay").textContent = profesional.telefono;


    agendarBtn.addEventListener('click', () => {
      const id = profesional.id;
      window.location.href = `/frontend/pages/user/cuestionarioServicios.html?id=${id}`;
    });
  } catch (err) {
    console.error("[ERROR] No se pudo cargar el profesional:", err);
  }

  // IMAGEN DE PERFIL
  try {
    const imagenPerfil = await getImagenPerfil(idRolProfesional);
    console.log('[INFO] Imagen de perfil cargada:', imagenPerfil);
    if (imagenPerfil.urlPerfil) {
      document.getElementById("imagenPerfil").src = imagenPerfil.urlPerfil;
    }
  } catch (err) {
    console.error("[ERROR] Imagen de perfil:", err);
  }

  // PORTAFOLIO
  try {
    const response = await getImagenesPortafolio(idRolProfesional);
    const imagenesPortafolio = response.imagenes || [];
    console.log('[INFO] Imágenes del portafolio:', imagenesPortafolio);

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

    function abrirModal(index) {
      modal.style.display = "block";
      modalImg.src = urlsImagenes[index];
      modalImg.style.transform = "scale(1)";
    }

    spanCerrar.onclick = () => {
      modal.style.display = "none";
      modalImg.style.transform = "scale(1)";
    };

    window.onclick = event => {
      if (event.target == modal) {
        modal.style.display = "none";
        modalImg.style.transform = "scale(1)";
      }
    };

    btnSiguiente.onclick = () => {
      imagenActual = (imagenActual + 1) % urlsImagenes.length;
      abrirModal(imagenActual);
    };

    btnAnterior.onclick = () => {
      imagenActual = (imagenActual - 1 + urlsImagenes.length) % urlsImagenes.length;
      abrirModal(imagenActual);
    };

    let zoomIn = false;
    modalImg.addEventListener("click", () => {
      zoomIn = !zoomIn;
      modalImg.style.transform = zoomIn ? "scale(2)" : "scale(1)";
    });

  } catch (err) {
    console.error("[ERROR] Imágenes del portafolio:", err);
  }

  // SERVICIOS Y CATEGORÍAS
  try {
    const serviciosData = await getServiciosByIdProfesional(idRolProfesional);
    console.log('[INFO] Servicios del profesional:', serviciosData);

    const categoriasData = await getCategoria();
    console.log('[INFO] Categorías disponibles:', categoriasData);

    const serviciosContainer = document.getElementById("serviciosContainer");
    if (!serviciosContainer) {
      console.warn('[WARN] No se encontró el contenedor con ID serviciosContainer');
      return;
    }

    serviciosContainer.innerHTML = "";

    const tituloGeneral = document.createElement("h2");
    tituloGeneral.textContent = "Categorias y Servicios ofercidos:";
    tituloGeneral.style.marginBottom = "15px";
    serviciosContainer.appendChild(tituloGeneral);

    const serviciosPorCategoria = {};
    (serviciosData.servicios || []).forEach(servicio => {
      if (!serviciosPorCategoria[servicio.id_categoria]) {
        serviciosPorCategoria[servicio.id_categoria] = [];
      }
      serviciosPorCategoria[servicio.id_categoria].push(servicio);
    });

    categoriasData.categorias.forEach(categoria => {
      const servicios = serviciosPorCategoria[categoria.id];
      console.log(`[DEBUG] Procesando categoría ${categoria.categoria}:`, servicios);

      if (servicios && servicios.length > 0) {
        const categoriaDiv = document.createElement("div");
        categoriaDiv.classList.add("categoria-bloque");
        categoriaDiv.style.marginBottom = "20px";
        categoriaDiv.style.padding = "15px";
        categoriaDiv.style.border = "1px solid #ccc";
        categoriaDiv.style.borderRadius = "8px";
        categoriaDiv.style.backgroundColor = "#f9f9f9";

        const titulo = document.createElement("h3");
        titulo.textContent = categoria.categoria;
        titulo.style.marginBottom = "10px";
        titulo.style.color = "#333";
        titulo.style.fontSize = "18px";
        categoriaDiv.appendChild(titulo);

        const lista = document.createElement("ul");
        lista.style.listStyle = "disc inside";
        servicios.forEach(servicio => {
          const item = document.createElement("li");
          item.textContent = `${servicio.servicio} - $${parseFloat(servicio.precio).toFixed(2)}`;
          item.style.marginBottom = "5px";
          item.style.color = "#555";
          lista.appendChild(item);
        });

        categoriaDiv.appendChild(lista);
        serviciosContainer.appendChild(categoriaDiv);
      }
    });

    console.log("[DEBUG] HTML final de #serviciosContainer:", serviciosContainer.innerHTML);

  } catch (err) {
    console.error("[ERROR] Categorías o servicios:", err);
  }
});
