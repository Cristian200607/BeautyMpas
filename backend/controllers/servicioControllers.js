import {getServiciosPorProfesional,
  getServicios,
  crearServicio,
  actualizarServicio,
  eliminarServicio
} from '../models/servicioModel.js'

export const getServiciosByIdProfesional = async (req, res) => {
  const { id } = req.params;
  console.log("ID recibido:", id);
  try {
    const servicios = await getServiciosPorProfesional(id);
    res.json({ servicios });
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    res.status(500).json({ message: 'Error al obtener servicios.' });
  }
};
export const getAllServicios = async (req, res) => {
  try {
    const servicios = await getServicios();
    res.json({ servicios });
  } catch (error) {
    console.error('Error al obtener todos los servicios:', error);
    res.status(500).json({ message: 'Error al obtener servicios.' });
  }
};

export const createServicio = async (req, res) => {
  const { servicio, precio, id_categorias } = req.body;
  try {
    const id = await crearServicio(servicio, precio, id_categorias);
    res.status(201).json({ message: 'Servicio creado', id });
  } catch (error) {
    console.error('Error al crear servicio:', error);
    res.status(500).json({ message: 'Error al crear servicio.' });
  }
};

export const updateServicio = async (req, res) => {
  const { id } = req.params;
  const { servicio, precio, id_categorias } = req.body;
  try {
    const affected = await actualizarServicio(id, { servicio, precio, id_categorias });
    if (affected === 0) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    res.json({ message: 'Servicio actualizado' });
  } catch (error) {
    console.error('Error al actualizar servicio:', error);
    res.status(500).json({ message: 'Error al actualizar servicio.' });
  }
};

export const deleteServicio = async (req, res) => {
  const { id } = req.params;
  try {
    const affected = await eliminarServicio(id);
    if (affected === 0) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    res.json({ message: 'Servicio eliminado' });
  } catch (error) {
    console.error('Error al eliminar servicio:', error);
    res.status(500).json({ message: 'Error al eliminar servicio.' });
  }
};