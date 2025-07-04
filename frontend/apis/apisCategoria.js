const API_URL = 'http://localhost:3000/api';

export async function getCategoria() {
  const res = await fetch(`${API_URL}/getCategorias`);
  if (!res.ok) throw new Error("No se pudo obtener el profesional");
  return res.json();
}

export async function postCategoriaProfesional(dataPostCategoriaProfesional) {
    
    const res = await fetch(`${API_URL}/postCategoriaProfesional`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataPostCategoriaProfesional),
    })
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Error desconocido");
    }
    return data; // Esto contiene el mensaje del backend
}


export async function getProfesionalesPorCategoria(id_categoria) {
  const res = await fetch(`${API_URL}/getProfesionalesByCategoria/${id_categoria}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al obtener los profesionales');
  }

  return res.json(); // Devuelve { profesionales: [...], usuarios: [...] }
}