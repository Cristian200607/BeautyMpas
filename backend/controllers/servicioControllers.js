import {getServiciosPorProfesional,
  getServicios,
  postServicioProfesional,
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
    if (!servicios || servicios.length === 0) {
      return res.status(404).json({ message: 'No hay servicios registrados.' });
    }

    return res.status(200).json({ servicios }); // ✅ Solo una respuesta
  } catch (error) {
    console.error('Error al obtener todos los servicios:', error);
    return res.status(500).json({ message: 'Error al obtener servicios.' });
  }
};


export const postServicioProfesionales = async (req, res) => {
  const servicios = req.body;

  if (!Array.isArray(servicios) || servicios.length === 0) {
    return res.status(400).json({ message: 'Datos inválidos. Se esperaba un array de servicios.' });
  }

  try {
    for (const servicio of servicios) {
      const {
        id_profesional,
        id_categoria,
        servicio: nombre,
        precio,
        descripcion_servicio,
        tiempo_servicio
      } = servicio;

      if (!id_profesional || !id_categoria || !nombre || !precio || !descripcion_servicio || !tiempo_servicio) {
        return res.status(400).json({ message: 'Faltan campos obligatorios.' });
      }

      await postServicioProfesional(
        id_profesional,
        id_categoria,
        nombre,
        precio,
        descripcion_servicio,
        tiempo_servicio
      );
    }

    res.status(201).json({ message: 'Servicios registrados correctamente.' });
  } catch (error) {
    console.error('Error al registrar servicios:', error);
    res.status(500).json({ message: 'Error al registrar servicios.' });
  }
};


export const updateServicio = async (req, res) => {
  const { id } = req.params;
  const servicioData = req.body;

  try {
    const affected = await actualizarServicio(id, servicioData);

    if (affected === 0) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    res.json({ message: 'Servicio actualizado correctamente' });
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