import { getTiposPQRS, postPQRS } from '../apis/apisPqrs.js';

document.addEventListener('DOMContentLoaded', async () => {
  await cargarTiposPQRS();

  const form = document.getElementById('form-soporte');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const tipoId = document.getElementById('tipoPQRS').value;
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('email').value.trim();
    const descripcion = document.getElementById('mensaje').value.trim();

    if (!tipoId || !nombre || !correo || !descripcion) {
      return alert('⚠️ Por favor, completa todos los campos.');
    }

    const nuevaPQRS = {
      id_tipo: parseInt(tipoId),
      nombre_usuario: nombre,
      correo_usuario: correo,
      descripcion,
    };

    try {
      await postPQRS(nuevaPQRS);
      alert('✅ Solicitud enviada con éxito');
      form.reset();
    } catch (err) {
      console.error('Error al enviar PQRS:', err);
      alert('❌ No se pudo enviar tu solicitud. Intenta más tarde.');
    }
  });
});

async function cargarTiposPQRS() {
  try {
    const { tipos } = await getTiposPQRS();
    const select = document.getElementById('tipoPQRS');
    tipos.forEach(tipo => {
      const option = document.createElement('option');
      option.value = tipo.id;
      option.textContent = tipo.nombre_tipó;
      select.appendChild(option);
    });
  } catch (err) {
    console.error('Error al cargar tipos:', err);
    alert('❌ No se pudieron cargar los tipos de solicitud.');
  }
}
