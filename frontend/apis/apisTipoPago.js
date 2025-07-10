const API_URL = 'http://localhost:3000/api';

export async function getTiposPago() {
  const res = await fetch(`${API_URL}/tipo-pago`);
  if (!res.ok) throw new Error('No se pudieron obtener los métodos de pago');
  return await res.json(); // Devuelve { tipos_pago: [...] }
}
