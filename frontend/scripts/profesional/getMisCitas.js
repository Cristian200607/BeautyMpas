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
      document.getElementById("lista-citas").innerHTML = "<tr><td colspan='7'>No hay citas pendientes.</td></tr>";
      return;
    }

    renderizarCitas(citas);
  } catch (error) {
    console.error("Error al cargar citas:", error.message);
  }
});

function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const anio = fecha.getFullYear();
  return `${dia}/${mes}/${anio}`; // Cambia el formato si prefieres anio-mes-dia
}

function renderizarCitas(citas) {
  const tbody = document.getElementById("lista-citas");
  tbody.innerHTML = "";

  citas.forEach(cita => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${cita.nombre_cliente}</td>
      <td>${cita.email}</td>
      <td>${cita.servicios || 'N/A'}</td>
      <td>${formatearFecha(cita.fecha_cita)}</td>
      <td>${cita.hora_cita}</td>
      <td>${cita.direccion}</td>
      <td>${cita.estado_cita}</td> <!-- NUEVO -->
      <td>
        <div class="botones">
          <button class="accept" data-id="${cita.id_cita}"><i class="bi bi-check-circle"></i></button>
          <button class="decline" data-id="${cita.id_cita}"><i class="bi bi-x-circle"></i></button>
        </div>
      </td>
    `;

    tbody.appendChild(tr);
  });

  // Eventos de los botones
  
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
        console.error("Error al cancelar cita:", error.message);
        alert("Error al cancelar cita");
      }
    });
  });
}
