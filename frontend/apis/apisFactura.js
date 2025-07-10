const API_URL = 'http://localhost:3000/api';

export async function getFacturaPorCita(id_cita) {
  const res = await fetch(`${API_URL}/factura/cita/${id_cita}`);
  if (!res.ok) throw new Error('No se pudo obtener la factura');
  return await res.json(); // Devuelve { factura: [...] }
}
