const API_URL = 'http://localhost:3000/api';

export async function getClientes() {
  const res = await fetch(`${API_URL}/clientes`);
  if (!res.ok) throw new Error("No se pudieron obtener los clientes");
  return res.json();
}

export async function getClienteById(id) {
  const res = await fetch(`${API_URL}/cliente/${id}`);
  if (!res.ok) throw new Error("No se pudo obtener el cliente");
  return res.json();
}

export async function getClienteByEmail(email) {
  const res = await fetch(`${API_URL}/cliente?email=${encodeURIComponent(email)}`);
  if (!res.ok) throw new Error("No se pudo obtener el cliente por email");
  return res.json();
}

export async function updateCliente(id, dataUpdate) {
  const res = await fetch(`${API_URL}/cliente/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dataUpdate)
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al actualizar el cliente");
  }
  return data;
}

export async function deleteCliente(id) {
  const res = await fetch(`${API_URL}/cliente/${id}`, {
    method: 'DELETE'
  });

  if (!res.ok) throw new Error("Error al eliminar el cliente");
  return res.json();
}
