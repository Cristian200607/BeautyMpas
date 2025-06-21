
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const nombre = document.getElementById('nombre');
  const email = document.getElementById('email');
  const mensaje = document.getElementById('mensaje');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que se envíe el formulario automáticamente

    // Validaciones básicas
    if (nombre.value.trim() === '' || email.value.trim() === '' || mensaje.value.trim() === '') {
      alert('Por favor completa todos los campos.');
      return;
    }

    if (!validateEmail(email.value)) {
      alert('Por favor ingresa un correo válido.');
      return;
    }

    // Simula envío exitoso
    alert('¡Gracias! Tu mensaje ha sido enviado correctamente.');
    form.reset(); // Limpia el formulario
  });
});

// Función para validar correo electrónico
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}