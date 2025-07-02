import {Register} from '../apis/authService.js'

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const dataRegister = {
    id_rol: parseInt(document.getElementById('rol').value),
    id_tipo_documento: parseInt(document.getElementById('tipo_documento').value),
    nombre: document.getElementById('nombre').value.trim(),
    email: document.getElementById('email').value,
    direccion: document.getElementById('direccion').value,
    telefono: document.getElementById('telefono').value,
    documento: document.getElementById('documento').value,
    contraseña: document.getElementById('contraseña').value
  };

  try {
    const data = await Register(dataRegister);
    alert(data.message);

    if (data && data.message) {
      window.location.href = '/frontend/pages/login.html';
    }
  } catch (error) {
    console.error('Error en el registro:', error);
    alert(error.message || 'Ocurrió un error al intentar registrarte.');
  }
});
