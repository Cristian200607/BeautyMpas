import { postCita, postCitaServicios, getCitasByProfesional, actualizarEstadoCita } from '../models/citaModels.js';

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

  if (!['confirmada', 'cancelada'].includes(estado)) {
    return res.status(400).json({ message: "Estado inválido" });
  }

  try {
    await actualizarEstadoCita(id, estado);
    res.status(200).json({ message: `Cita actualizada a ${estado}` });
  } catch (error) {
    console.error('Error actualizando estado:', error);
    res.status(500).json({ message: 'Error al actualizar cita' });
  }
};

