import { enviarCorreo } from '../utils/mailer.js';

export const enviarCorreoController = async (req, res) => {
  const { destinatario, asunto, mensaje } = req.body;

  if (!destinatario || !asunto || !mensaje) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const exito = await enviarCorreo(destinatario, asunto, mensaje);

  if (exito) {
    res.status(200).json({ mensaje: 'Correo enviado correctamente' });
  } else {
    res.status(500).json({ error: 'Error al enviar el correo' });
  }
};
