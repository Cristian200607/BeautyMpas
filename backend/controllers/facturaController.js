import { getFacturaPorCita } from '../models/facturaModel.js';

export const obtenerFacturaPorCita = async (req, res) => {
  try {
    const id_cita = req.params.id;

    const factura = await getFacturaPorCita(id_cita);

    if (!factura || factura.length === 0) {
      return res.status(404).json({ error: 'Factura no encontrada para la cita especificada' });
    }

    res.json({ factura });
  } catch (err) {
    console.error('Error al obtener la factura:', err);
    res.status(500).json({ error: 'Error del servidor al obtener la factura' });
  }
};
