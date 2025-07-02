import{ getCategoria, contarCategoriasPorProfesional, getIdProfesionalesPorCategoria, getUsuariosPorIdProfesional, getProfesionalesPorIds} from '../models/categoriaModel.js';


// funcion get servicios
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
    const idsUsuario = idsRaw.map(row => row.id_profesional); // Ojo: aquí es el id del usuario, no profesional

    console.log('🎯 IDs de usuario desde profesional_categoria:', idsUsuario);

    // Paso 2: obtener los id_profesional reales desde la tabla usuarios
    const idsProfesional = await getUsuariosPorIdProfesional(idsUsuario);
    console.log('🔁 IDs reales de profesional desde usuarios:', idsProfesional);

    // Paso 3: obtener los datos desde la tabla profesional
    const profesionales = await getProfesionalesPorIds(idsProfesional);
    console.log('📦 Profesionales encontrados:', profesionales);

    res.status(200).json({ profesionales });

  } catch (error) {
    console.error('❌ Error al obtener profesionales por categoría:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

