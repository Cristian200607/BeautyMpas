const API_URL = 'http://localhost:3000/api';

// Crear una nueva cita con servicios
export async function postCita(reserva) {
  const response = await fetch(`${API_URL}/postCita`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(reserva)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al crear la cita');
  }

  return await response.json();
}

// Obtener citas por id del profesional
export async function getCitasByIdProfesional(id_profesional) {
  const response = await fetch(`${API_URL}/getCitaByprofesional/${id_profesional}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al obtener las citas');
  }

  return await response.json();
}

export async function updateEstadoCita(id, estado) {
  const response = await fetch(`${API_URL}/cita/${id}/estado`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al actualizar estado');
  }

  return await response.json();
}
