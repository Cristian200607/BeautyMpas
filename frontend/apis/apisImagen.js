const API_URL = 'http://localhost:3000/api';

// Obtener imagen de perfil
export async function getImagenPerfil(idProfesional) {
  const res = await fetch(`${API_URL}/profesional/${idProfesional}/imagen-perfil`);
  if (!res.ok) throw new Error("No se pudo obtener la imagen de perfil");
  return res.json();
}

// Subir imagen de perfil
export async function subirImagenPerfil(idProfesional, urlPerfil) {
  const res = await fetch(`${API_URL}/profesional/${idProfesional}/imagen-perfil`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ urlPerfil })
  });
  if (!res.ok) throw new Error("No se pudo guardar la imagen de perfil");
  return res.json();
}

// Obtener imágenes de portafolio
export async function getImagenesPortafolio(idProfesional) {
  const res = await fetch(`${API_URL}/profesional/${idProfesional}/imagenes`);
  if (!res.ok) throw new Error("No se pudieron obtener las imágenes de portafolio");
  return res.json();
}

// Subir imagen al portafolio
export async function subirImagenPortafolio(idProfesional, urlPortafolio) {
  const res = await fetch(`${API_URL}/profesional/${idProfesional}/imagenes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ urlPortafolio })
  });
  if (!res.ok) throw new Error("No se pudo agregar imagen al portafolio");
  return res.json();
}

// Eliminar imagen del portafolio
export async function eliminarImagenPortafolio(idImagen) {
  const res = await fetch(`${API_URL}/imagenes/${idImagen}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error("No se pudo eliminar la imagen del portafolio");
  return res.json();
}
