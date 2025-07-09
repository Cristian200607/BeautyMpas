import {getProfesionalById} from '../../apis/apisProfesional.js'

document.addEventListener('DOMContentLoaded', async () => {
  
  const params = new URLSearchParams(window.location.search);
  const idRolProfesional = params.get('id');
  console.log('ID recibido desde la URL:', idRolProfesional);
  // ✅ Establecer el ID del profesional como parámetro en el botón de agendar
  const agendarBtn = document.getElementById("agendarCitaBtn");
  agendarBtn.href = `/frontend/pages/user/cuestionarioServicios.html?id=${idRolProfesional}`;



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

});
  