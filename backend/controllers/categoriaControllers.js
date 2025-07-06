import{ getCategoria, 
  contarCategoriasPorProfesional, 
  getIdProfesionalesPorCategoria, 
  getProfesionalesPorIds,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria
} from '../models/categoriaModel.js';


// funcion get categoria
export const getCategorias = async (req, res) => {
  try {
    const categorias = await getCategoria(); 
    res.json({ categorias });
  } catch (error) {
    console.error('Error obteniendo las categorías:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};


export const tieneCategoriasAsignadas = async (id_profesional) => {
  const total = await contarCategoriasPorProfesional(id_profesional);
  return total > 0;
};


export const getProfesionalesPorCategoria = async (req, res) => {
  const { id_categoria } = req.params;

  try {
    // Paso 1: obtener los ids de usuario desde la categoría
    const idsRaw = await getIdProfesionalesPorCategoria(id_categoria); // te da usuarios.id
    const idsProfesional = idsRaw.map(row => row.id_profesional); // Ojo: aquí es el id del usuario, no profesional

    console.log('🎯 IDs de usuario desde profesional_categoria:', idsProfesional);

    // Paso 3: obtener los datos desde la tabla profesional
    const profesionales = await getProfesionalesPorIds(idsProfesional);
    console.log('📦 Profesionales encontrados:', profesionales);

    res.status(200).json({ profesionales });

  } catch (error) {
    console.error('❌ Error al obtener profesionales por categoría:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// 🔹 Obtener categoría por ID
export const obtenerCategoriaPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const categoria = await getCategoriaById(id);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json({ categoria });
  } catch (err) {
    console.error('Error al obtener categoría:', err);
    res.status(500).json({ error: 'Error al obtener categoría' });
  }
};

// 🔹 Crear nueva categoría
export const crearCategoria = async (req, res) => {
  try {
    const { categoria } = req.body;
    const nuevaCategoria = await createCategoria(categoria);
    res.status(201).json({ categoria: nuevaCategoria });
  } catch (err) {
    console.error('Error al crear categoría:', err);
    res.status(500).json({ error: 'Error al crear categoría' });
  }
};

// 🔹 Actualizar categoría
export const actualizarCategoria = async (req, res) => {
  try {
    const id = req.params.id;
    const { categoria } = req.body;
    const categoriaActualizada = await updateCategoria(id, categoria);
    res.json({ categoria: categoriaActualizada });
  } catch (err) {
    console.error('Error al actualizar categoría:', err);
    res.status(500).json({ error: 'Error al actualizar categoría' });
  }
};

// 🔹 Eliminar categoría
export const eliminarCategoria = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteCategoria(id);
    res.json({ mensaje: 'Categoría eliminada correctamente' });
  } catch (err) {
    console.error('Error al eliminar categoría:', err);
    res.status(500).json({ error: 'Error al eliminar categoría' });
  }
};

