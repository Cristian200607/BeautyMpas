import {
  obtenerImagenesPorProfesional,
  agregarImagenPortafolio,
  eliminarImagenPortafolio,
  actualizarImagenPerfil,
  obtenerImagenPerfil
} from '../models/imagenModel.js';

// Portafolio
export const getImagenesByProfesional = async (req, res) => {
  const { id } = req.params;
  try {
    const imagenes = await obtenerImagenesPorProfesional(id);
    res.json({ imagenes });
  } catch (error) {
    console.error('Error al obtener imágenes de portafolio:', error);
    res.status(500).json({ message: 'Error al obtener imágenes de portafolio.' });
  }
};

export const subirImagenPortafolio = async (req, res) => {
  const { id } = req.params;
  const { urlPortafolio } = req.body;
  try {
    const newId = await agregarImagenPortafolio(id, urlPortafolio);
    res.status(201).json({ message: 'Imagen de portafolio subida', id: newId });
  } catch (error) {
    console.error('Error al subir imagen de portafolio:', error);
    res.status(500).json({ message: 'Error al subir imagen de portafolio.' });
  }
};

export const deleteImagen = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await eliminarImagenPortafolio(id);
    if (deleted === 0) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }
    res.json({ message: 'Imagen eliminada' });
  } catch (error) {
    console.error('Error al eliminar imagen:', error);
    res.status(500).json({ message: 'Error al eliminar imagen.' });
  }
};

// Imagen de perfil
export const subirImagenPerfil = async (req, res) => {
  const { id } = req.params;
  const { urlPerfil } = req.body;
  try {
    const perfilId = await actualizarImagenPerfil(id, urlPerfil);
    res.status(200).json({ message: 'Imagen de perfil actualizada', id: perfilId });
  } catch (error) {
    console.error('Error al actualizar imagen de perfil:', error);
    res.status(500).json({ message: 'Error al actualizar imagen de perfil.' });
  }
};

export const getImagenPerfil = async (req, res) => {
  const { id } = req.params;
  try {
    const imagen = await obtenerImagenPerfil(id);
    res.json(imagen);
  } catch (error) {
    console.error('Error al obtener imagen de perfil:', error);
    res.status(500).json({ message: 'Error al obtener imagen de perfil.' });
  }
};
