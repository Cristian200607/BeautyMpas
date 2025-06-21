document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id_rol = parseInt(document.getElementById('rol').value);
  const id_tipo_documento = parseInt(document.getElementById('tipo_documento').value); 
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value;
  const direccion = document.getElementById('direccion').value;
  const telefono = document.getElementById('telefono').value;
  const documento = document.getElementById('documento').value;
  const contraseña = document.getElementById('contraseña').value; 

  try {
    const res = await fetch('http://localhost:3000/api/registerUsuario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_rol, id_tipo_documento, nombre, email, direccion, telefono, documento, contraseña })
    });

    const data = await res.json();

    alert(data.message);

    if (res.status === 201) {
      window.location.href = '../pages/login.html'; // Ajusta según tu ruta de login
    }

  } catch (error) {
    console.error('Error en el registro:', error);
    alert('Ocurrió un error al intentar registrarte. Inténtalo de nuevo.');
  }

});
