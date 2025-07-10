import {
  getAllPQRS,
  getPQRSById,
  createPQRS,
  updateEstadoPQRS,
  deletePQRS,
  getTiposPQRS,
  createTipoPQRS
} from '../models/pqrsModel.js';
import { enviarCorreo } from '../utils/mailer.js';

export const obtenerPQRS = async (req, res) => {
  try {
    const pqrs = await getAllPQRS();
    res.json({ pqrs });
  } catch (error) {
    console.error('Error obteniendo PQRS:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const obtenerPQRSporId = async (req, res) => {
  try {
    const { id } = req.params;
    const pqrs = await getPQRSById(id);
    if (!pqrs) {
      return res.status(404).json({ error: 'PQRS no encontrada' });
    }
    res.json({ pqrs });
  } catch (err) {
    console.error('Error al obtener PQRS por ID:', err);
    res.status(500).json({ error: 'Error al obtener PQRS' });
  }
};

export const crearPQRS = async (req, res) => {
  try {
    const nuevaPQRS = await createPQRS(req.body);

    // Enviar correo al administrador (correo fijo del .env)
    const adminEmail = process.env.EMAIL_RECEIVER;
    const { nombre_usuario, correo_usuario, descripcion } = req.body;

    const asunto = 'Nueva solicitud PQRS recibida';
    const mensaje = `
      Nueva PQRS enviada:

      👤 Nombre: ${nombre_usuario}
      📧 Correo: ${correo_usuario}
      📝 Descripción: ${descripcion}
    `;

    await enviarCorreo(adminEmail, asunto, mensaje);
    const mensajeUsuario = `Hola ${nombre_usuario}, hemos recibido tu solicitud y la estaremos revisando. Gracias por escribirnos.`;
    await enviarCorreo(correo_usuario, 'Confirmación de solicitud PQRS', mensajeUsuario);
    

    res.status(201).json({ pqrs: nuevaPQRS });
  } catch (err) {
    console.error('Error al crear PQRS:', err);
    res.status(500).json({ error: 'Error al crear PQRS' });
  }
};

export const actualizarEstadoPQRS = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const actualizada = await updateEstadoPQRS(id, estado);
    res.json({ pqrs: actualizada });
  } catch (err) {
    console.error('Error al actualizar PQRS:', err);
    res.status(500).json({ error: 'Error al actualizar PQRS' });
  }
};

export const eliminarPQRSporId = async (req, res) => {
  try {
    const { id } = req.params;
    await deletePQRS(id);
    res.json({ mensaje: 'PQRS eliminada correctamente' });
  } catch (err) {
    console.error('Error al eliminar PQRS:', err);
    res.status(500).json({ error: 'Error al eliminar PQRS' });
  }
};

export const obtenerTiposPQRS = async (req, res) => {
  try {
    const tipos = await getTiposPQRS();
    res.json({ tipos });
  } catch (err) {
    console.error('Error al obtener tipos de PQRS:', err);
    res.status(500).json({ error: 'Error al obtener tipos de PQRS' });
  }
};

export const crearTipoPQRS = async (req, res) => {
  try {
    const { nombre_tipó } = req.body;
    const nuevoTipo = await createTipoPQRS(nombre_tipó);
    res.status(201).json({ tipo: nuevoTipo });
  } catch (err) {
    console.error('Error al crear tipo PQRS:', err);
    res.status(500).json({ error: 'Error al crear tipo PQRS' });
  }
};
