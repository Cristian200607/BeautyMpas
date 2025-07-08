import {getProfesionalById} from '../../apis/apisProfesional.js';
import { getImagenPerfil, getImagenesPortafolio } from '../../apis/apisImagen.js';


document.addEventListener('DOMContentLoaded', async () => {
  
  const params = new URLSearchParams(window.location.search);
  const idRolProfesional = params.get('id');
  console.log('ID recibido desde la URL:', idRolProfesional);


  try{
    const data = await getProfesionalById(idRolProfesional)
    console.log("aqui", data);
    const profesional = data.profesional;
    
    document.getElementById("nombreDisplay").textContent = profesional.nombre;
    document.getElementById("emailDisplay").textContent = profesional.email;
    document.getElementById("direccionDisplay").textContent = profesional.documento;
    document.getElementById("telefonoDisplay").textContent = profesional.telefono;
  
  }catch (err)  {
    console.error("Error en la solicitud:", err);
  };

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
  const imagenesPortafolio = response.imagenes; // ← Asegúrate de acceder al array correcto
  const collageDiv = document.getElementById("collagePortafolio");

  imagenesPortafolio.forEach(img => {
    const imgElement = document.createElement("img");
    imgElement.src = img.urlPortafolio;
    imgElement.alt = "Imagen del portafolio";
    collageDiv.appendChild(imgElement);
  });
} catch (err) {
  console.error("Error al obtener imágenes del portafolio:", err);
}


});
  