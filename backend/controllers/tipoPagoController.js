import { getTiposPago } from '../models/tipoPagoModel.js';

export const obtenerTiposPago = async (req, res) => {
  try {
    const tipos = await getTiposPago();
    res.json({ tipos });
  } catch (error) {
    console.error('Error al obtener tipos de pago:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};
