const API_URL = 'http://localhost:3000/api';


export async function getProfesionalByEmail(email) {
  const res = await fetch(`${API_URL}/getProfesionalByEmail?email=${encodeURIComponent(email)}`);
  if (!res.ok) throw new Error("No se pudo obtener el profesional");
  return res.json();
}

export async function getProfesionalById(idRolProfesional) {
  const res = await fetch(`${API_URL}/getProfesionalById/${idRolProfesional}`);
  if (!res.ok) throw new Error("No se pudo obtener el profesional");
  return res.json();
}

export async function getProfesional() {
  const res = await fetch(`${API_URL}/getProfesionales`);
  if (!res.ok) throw new Error("No se pudo obtener el profesional");
  return res.json();
}

export async function updateProfesional(id, dataUpdate) {
  const res = await fetch(`${API_URL}/updateProfesional/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataUpdate)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error desconocido");
  }
  return data; // Esto contiene el mensaje del backend
}

export async function deleteProfesional(id) {
  const res = await fetch(`${API_URL}/deleteProfesional/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error("Error al eliminar");
  return res.json();
}