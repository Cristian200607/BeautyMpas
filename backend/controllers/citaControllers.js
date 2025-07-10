import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { postCita, postCitaServicios, getCitasByProfesional, actualizarEstadoCita, getCorreoDatosCita} from '../models/citaModels.js';
import { enviarCorreo } from '../utils/mailer.js';

export const crearCita = async (req, res) => {
  try {
    const { id_profesional, id_cliente, fecha_cita, hora_cita, id_servicios } = req.body;

    if (!id_profesional || !id_cliente || !fecha_cita || !hora_cita || !Array.isArray(id_servicios)) {
      return res.status(400).json({ message: 'Datos incompletos o incorrectos' });
    }

    const id_cita = await postCita(id_profesional, id_cliente, fecha_cita, hora_cita);
    await postCitaServicios(id_cita, id_servicios);

    res.status(201).json({ message: 'Cita creada', citaId: id_cita });
  } catch (error) {
    console.error('Error creando cita:', error);
    res.status(500).json({ message: 'Error interno' });
  }
};

export const obtenerCitasPorProfesional = async (req, res) => {
  try {
    const { id_profesional } = req.params;
    const citas = await getCitasByProfesional(id_profesional);
    res.json(citas);
  } catch (error) {
    console.error('Error al obtener citas:', error);
    res.status(500).json({ message: 'Error interno' });
  }
};

export const actualizarCitaEstado = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    // 1. Actualizamos el estado
    await actualizarEstadoCita(id, estado);

    // 2. Recuperamos datos de la cita + cliente
    const datos = await getCorreoDatosCita(id);
    if (!datos) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }
    const { email, nombre, fecha, hora } = datos;

    // 3. Solo enviamos correo en caso de cita aceptada o confirmada
    if (estado === 'aceptada' || estado === 'confirmada') {
      // — Aquí formateamos la fecha en español:
      const fechaFormateada = format(
        new Date(fecha),
        "EEEE d 'de' MMMM 'de' yyyy",
        { locale: es }
      );

      // — Construimos el mensaje con la fecha formateada
      const asunto = 'Tu cita ha sido confirmada';
      const mensaje = `Hola ${nombre}, tu cita ha sido aceptada. Te esperamos el ${fechaFormateada} a las ${hora}.`;

      await enviarCorreo(email, asunto, mensaje);
    }

    return res.status(200).json({ mensaje: 'Cita actualizada y correo enviado si fue aceptada.' });
  } catch (error) {
    console.error('Error al actualizar cita:', error);
    return res.status(500).json({ error: 'Error al actualizar la cita' });
  }
};



