import {getProfesionalByEmail, updateProfesional, deleteProfesional} from '../../apis/apisProfesional.js'
document.addEventListener('DOMContentLoaded', async () => {

  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const email = usuario?.email;
  const boton = document.getElementById('btnSeviciosyCategorias');

  if (!email){
    document.body.innerHTML = "<p>email no proporcionado</p>"
    return;
  }

  const data = await getProfesionalByEmail(email) 
  console.log(data);
  const profesional = data.profesional;

  document.getElementById("nombreDisplay").textContent = profesional.nombre;
  document.getElementById("emailDisplay").textContent = profesional.email;
  document.getElementById("direccionDisplay").textContent = profesional.direccion;
  document.getElementById("telefonoDisplay").textContent = profesional.telefono;

  document.getElementById('nombre').value = profesional.nombre;
  document.getElementById('email').value = profesional.email;
  document.getElementById('direccion').value = profesional.direccion;
  document.getElementById('telefono').value = profesional.telefono;

  boton.addEventListener('click', () => {
    const id = profesional.id;
    window.location.href = `/frontend/pages/profesional/misCategoriasYServicios.html?id=${id}`;
  });

  document.getElementById('btnActualizar').addEventListener('click', async () => {
    const nuevosDatos = {
      nombre: document.getElementById('nombre').value,
      email: document.getElementById('email').value,
      direccion: document.getElementById('direccion').value,
      telefono: document.getElementById('telefono').value
    };

    try {
      const resultado = await updateProfesional(profesional.id, nuevosDatos);
      alert('Datos actualizados correctamente');
      console.log(resultado);
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Hubo un error al actualizar los datos");
    }
      
  });

  document.getElementById('btnEliminar').addEventListener('click', async () => {
    const confirmacion = confirm("¿Estás seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.");
    if (!confirmacion) return;

    const resultado = await deleteProfesional(profesional.id)
    alert('Profesional elimanado correctamente');
    console.log(resultado);
    window.location.href = '/frontend/pages/home.html';
  });

  document.getElementById('btnEditar').addEventListener('click', () => {
    ['nombre', 'email', 'direccion', 'telefono'].forEach(id => {
      document.getElementById(id).style.display = 'block'; // Mostrar input
      document.getElementById(id + 'Display').style.display = 'none'; // Ocultar h2
    });
  });
});
