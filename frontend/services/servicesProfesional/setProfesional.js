
document.addEventListener('DOMContentLoaded',() => {
  
  /*const params = new URLSearchParams(window.location.search);
  const idRolProfesional = params.get('id');*/

  const email = localStorage.getItem('email');
  


  if (!email){
    document.body.innerHTML = "<p>email no proporcionado</p>"
    return;
  }
    
  //fetch(`http://localhost:3000/api/getProfesionalById/${email}`)
  fetch(`http://localhost:3000/api/getProfesionalByEmail?email=${encodeURIComponent(email)}`)
  .then(res => res.json())
  .then(pro => {
    console.log(pro);
    const profesional = pro.profesional;

    document.getElementById("nombreDisplay").textContent = profesional.nombre;
    document.getElementById("emailDisplay").textContent = profesional.email;
    document.getElementById("direccionDisplay").textContent = profesional.direccion;
    document.getElementById("telefonoDisplay").textContent = profesional.telefono;

    document.getElementById('nombre').value = profesional.nombre;
    document.getElementById('email').value = profesional.email;
    document.getElementById('direccion').value = profesional.direccion;
    document.getElementById('telefono').value = profesional.telefono;

    document.getElementById('btnActualizar').addEventListener('click', () => {
      const nuevosDatos = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        direccion: document.getElementById('direccion').value,
        telefono: document.getElementById('telefono').value
      };

      fetch(`http://localhost:3000/api/updateProfesional/${profesional.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevosDatos)
      })
      .then(res => {
        if (!res.ok) {
          throw new Error("Error al actualizar");
        }
        return res.json();
      })
      .then(data => {
        console.log(data)
        alert("Datos actualizados correctamente");
      })
      .catch(err => {
        console.error("Error al actualizar:", err);
        alert("Hubo un error al actualizar los datos");
      });
    });

    document.getElementById('btnEliminar').addEventListener('click', () => {
      const confirmacion = confirm("¿Estás seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.");
      if (!confirmacion) return;

      fetch(`http://localhost:3000/api/deleteProfesional/${profesional.id}`, {
        method: 'DELETE'
      })
      .then(res => {
        if (!res.ok) {
          throw new Error("Error al eliminar");
        }
        return res.json();
      })
      .then(data => {
        console.log(data)
        alert("Cuenta eliminada correctamente");
        window.location.href = '/frontend/home.html '; // o donde quieras redirigir
      })
      .catch(err => {
        console.error("Error al eliminar:", err);
        alert("Hubo un error al eliminar la cuenta");
      });
    });

  });

  document.getElementById('btnEditar').addEventListener('click', () => {
    ['nombre', 'email', 'direccion', 'telefono'].forEach(id => {
      document.getElementById(id).style.display = 'block'; // Mostrar input
      document.getElementById(id + 'Display').style.display = 'none'; // Ocultar h2
    });
  });
});
