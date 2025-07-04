const API_URL = 'http://localhost:3000/api';

export async function getServiciosByIdProfesional(id_profesional) {
  const res = await fetch(`${API_URL}/getServiciosByIdProfesional/${id_profesional}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error al obtener servicios");
  }

  return data; // devuelve el array de servicios
}