import { getCitasByIdProfesional, updateEstadoCita } from '../../apis/apisCita.js';

document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const id_profesional = params.get('id');

  if (!id_profesional) {
    console.error("ID del profesional no encontrado");
    return;
  }

  try {
    const citas = await getCitasByIdProfesional(id_profesional);
    

    if (!citas || citas.length === 0) {
      document.getElementById("lista-citas").innerHTML = "<p>No hay citas pendientes.</p>";
      return;
    }

    renderizarCitas(citas);
  } catch (error) {
    console.error("Error al cargar citas:", error.message);
  }
});

function renderizarCitas(citas) {
  const contenedor = document.getElementById("lista-citas");
  contenedor.innerHTML = "";

  citas.forEach(cita => {
    const div = document.createElement("div");
    div.classList.add("citas");

    div.innerHTML = `
      <div>${cita.nombre_cliente}</div>
      <div>${cita.email}</div>
      <div>${cita.servicios || 'N/A'}</div>
      <div>${cita.fecha_cita}</div>
      <div>${cita.hora_cita}</div>
      <div>${cita.precios}</div>
      <div>${cita.direccion}</div>
      <div>${cita.estado_cita}</div>
      <div class="buttons">
        <button class="accept" data-id="${cita.id_cita}">Aceptar</button>
        <button class="decline" data-id="${cita.id_cita}">Cancelar</button>
      </div>
    `;

    contenedor.appendChild(div);
  });

  // Eventos para aceptar/rechazar
  document.querySelectorAll('.accept').forEach(btn => {
    btn.addEventListener('click', async () => {
      const idCita = btn.getAttribute('data-id');
      try {
        await updateEstadoCita(idCita, 'confirmada');
        alert('Cita confirmada');
        location.reload();
      } catch (error) {
        console.error("Error al confirmar cita:", error.message);
        alert("Error al confirmar cita");
      }
    });
  });

  document.querySelectorAll('.decline').forEach(btn => {
    btn.addEventListener('click', async () => {
      const idCita = btn.getAttribute('data-id');
      try {
        await updateEstadoCita(idCita, 'cancelada');
        alert('Cita cancelada');
        location.reload();
      } catch (error) {
        console.error("Error al rechazar cita:", error.message);
        alert("Error al rechazar cita");
      }
    });
  });
}
