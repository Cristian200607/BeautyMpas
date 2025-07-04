import {getServiciosPorProfesional} from '../models/servicioModel.js'

export const getServiciosByIdProfesional = async (req, res) => {
  const { id } = req.params;
  try {
    const servicios = await getServiciosPorProfesional(id);
    res.json({ servicios });
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    res.status(500).json({ message: 'Error al obtener servicios.' });
  }
};