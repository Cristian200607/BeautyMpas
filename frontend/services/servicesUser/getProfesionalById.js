document.addEventListener('DOMContentLoaded',() => {
  
  const params = new URLSearchParams(window.location.search);
  const idRolProfesional = params.get('id');

  fetch(`http://localhost:3000/api/getProfesionalById/${idRolProfesional}`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    const profesional = data.profesional;
    
    document.getElementById("nombreDisplay").textContent = profesional.nombre;
    document.getElementById("emailDisplay").textContent = profesional.email;
    document.getElementById("direccionDisplay").textContent = profesional.documento;
    document.getElementById("telefonoDisplay").textContent = profesional.telefono;
  })
  .catch(err => {
    console.error("Error en la solicitud:", err);
  });

});
  