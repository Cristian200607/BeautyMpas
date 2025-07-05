const API_BASE = 'http://localhost:3000/api';

export async function getServiciosByIdProfesional(id_profesional) {
  const res = await fetch(`${API_BASE}/getServiciosByIdProfesional/${id_profesional}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al obtener servicios");
  }

  return data;
}

export async function getServicios() {
  const res = await fetch(`${API_BASE}/servicios`);
  const data = await res.json();
  console.log('Respuesta de /servicios:', data); // ✅ ayuda a depurar

  if (!res.ok) throw new Error('No se pudieron cargar los servicios');
  return data.servicios; // si data.servicios es un array
}

export async function crearServicio(data) {
  const res = await fetch(`${API_BASE}/servicio`, { // ⬅️ corregido
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear servicio');
  return await res.json();
}


export async function actualizarServicio(id, data) {
  const res = await fetch(`${API_BASE}/servicio/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al actualizar servicio');
  return await res.json();
}

export async function eliminarServicio(id) {
  const res = await fetch(`${API_BASE}/servicio/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error al eliminar: ${errorText}`);
  }
  return await res.json();
}