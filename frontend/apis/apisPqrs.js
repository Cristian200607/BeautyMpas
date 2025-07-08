const API_URL = 'http://localhost:3000/api';

// Obtener todas las PQRS
export async function getPQRS() {
  const res = await fetch(`${API_URL}/pqrs`);
  if (!res.ok) throw new Error('Error al obtener PQRS');
  return res.json();
}

// Obtener una PQRS por ID
export async function getPQRSById(id) {
  const res = await fetch(`${API_URL}/pqrs/${id}`);
  if (!res.ok) throw new Error('Error al obtener PQRS por ID');
  return res.json();
}

// Crear nueva PQRS
export async function postPQRS(dataPQRS) {
  const res = await fetch(`${API_URL}/pqrs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataPQRS),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al crear PQRS');
  return data;
}

// Actualizar estado de PQRS
export async function putEstadoPQRS(id, nuevoEstado) {
  const res = await fetch(`${API_URL}/pqrs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado: nuevoEstado }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al actualizar estado');
  return data;
}

// Eliminar PQRS
export async function deletePQRS(id) {
  const res = await fetch(`${API_URL}/pqrs/${id}`, {
    method: 'DELETE',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al eliminar PQRS');
  return data;
}

// Obtener tipos de PQRS
export async function getTiposPQRS() {
  const res = await fetch(`${API_URL}/tipoPQRS`);
  if (!res.ok) throw new Error('Error al obtener tipos de PQRS');
  return res.json();
}

// Crear tipo de PQRS
export async function postTipoPQRS(nombre_tipó) {
  const res = await fetch(`${API_URL}/tipoPQRS`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre_tipó }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al crear tipo de PQRS');
  return data;
}
