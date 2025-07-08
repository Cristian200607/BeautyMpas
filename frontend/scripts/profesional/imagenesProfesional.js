import {
  getImagenPerfil,
  subirImagenPerfil,
  getImagenesPortafolio,
  subirImagenPortafolio,
  eliminarImagenPortafolio
} from '../../apis/apisImagen.js';

import { getProfesionalByEmail } from '../../apis/apisProfesional.js';

// Función para mostrar toast con tipo: success | error
function mostrarToast(mensaje, tipo = 'success') {
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${tipo}`;
  toast.textContent = mensaje;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

document.addEventListener('DOMContentLoaded', async () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const email = usuario?.email;
  if (!email) return;

  try {
    const data = await getProfesionalByEmail(email);
    const profesional = data.profesional;
    const id = profesional.id;

    async function cargarImagenPerfil() {
      try {
        const { urlPerfil } = await getImagenPerfil(id);
        if (urlPerfil) {
          document.getElementById('imagenPerfil').src = urlPerfil;
        }
      } catch (e) {
        console.error("Error cargando imagen de perfil:", e);
        mostrarToast("Error al cargar imagen de perfil", 'error');
      }
    }

    async function cargarPortafolio() {
      try {
        const { imagenes } = await getImagenesPortafolio(id);
        const contenedor = document.getElementById('imagenesPortafolio');
        contenedor.innerHTML = '';
        imagenes.forEach(img => {
          const div = document.createElement('div');
          div.style.position = 'relative';
          div.style.display = 'inline-block';
          div.style.margin = '5px';

          div.innerHTML = `
            <img src="${img.urlPortafolio}" alt="img" width="150" height="150" style="object-fit:cover; border-radius:10px;">
            <button style="position:absolute; top:5px; right:5px; background:red; color:white; border:none; border-radius:50%; width:25px; height:25px; cursor:pointer;"
              data-id="${img.id}">×</button>
          `;
          contenedor.appendChild(div);
        });

        document.querySelectorAll('#imagenesPortafolio button').forEach(btn => {
          btn.addEventListener('click', async () => {
            const idImg = btn.getAttribute('data-id');
            try {
              await eliminarImagenPortafolio(idImg);
              await cargarPortafolio();
              mostrarToast("Imagen eliminada del portafolio", 'success');
            } catch (e) {
              console.error("Error eliminando imagen:", e);
              mostrarToast("Error al eliminar imagen", 'error');
            }
          });
        });

      } catch (e) {
        console.error("Error cargando portafolio:", e);
        mostrarToast("Error al cargar portafolio", 'error');
      }
    }

    // Subir imagen de perfil
    document.getElementById('btnSubirImagenPerfil').addEventListener('click', async () => {
      const urlPerfil = document.getElementById('urlImagenPerfil').value.trim();
      if (!urlPerfil) return mostrarToast("Ingresa una URL válida", 'error');

      try {
        await subirImagenPerfil(id, urlPerfil);
        await cargarImagenPerfil();
        mostrarToast("Imagen de perfil actualizada", 'success');
        document.getElementById('urlImagenPerfil').value = '';
      } catch (e) {
        console.error("Error subiendo imagen perfil:", e);
        mostrarToast("Error al subir imagen de perfil", 'error');
      }
    });

    // Subir imagen al portafolio
    document.getElementById('btnEnviarArchivo').addEventListener('click', async () => {
      const url = document.getElementById('urlArchivo').value.trim();
      if (!url) return mostrarToast("Ingresa una URL válida", 'error');

      try {
        await subirImagenPortafolio(id, url);
        await cargarPortafolio();
        mostrarToast("Imagen añadida al portafolio", 'success');
        document.getElementById('urlArchivo').value = '';
      } catch (e) {
        console.error("Error subiendo imagen portafolio:", e);
        mostrarToast("Error al subir imagen al portafolio", 'error');
      }
    });

    await cargarImagenPerfil();
    await cargarPortafolio();

  } catch (error) {
    console.error("Error obteniendo profesional:", error);
    mostrarToast("Error al obtener los datos del profesional", 'error');
  }
});
