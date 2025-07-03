import bcrypt from 'bcryptjs';
import{ crearUsuario, 
        getProfesional, 
        getProfesionalById,
        getProfesionalByEmail,
        updateProfesional,
        deleteProfesional,
        obtenerRolPorId, 
        buscarUsuariosPorEmail,
        getCategorias as obtenerCategoriasDesdeBD,
        getCategoriaById,
        createCategoria,
        updateCategoria,
        deleteCategoria,
        getClientes,
        getClienteById,
        getClienteByEmail,
        updateCliente,
        deleteCliente,
        getTiposDocumento as getTiposDocumentoFromDB
      } 
from '../models/beautyModel.js';


export const getProfesionales = async (req, res) => {
    const profesionales = await getProfesional()
    if(!profesionales) {
        return res.status(404).json({ message: 'profesionales no encontrados'});
    }
    res.status(200).json({ message: 'profesionales econtrados', profesionales});
};

export const getProfesionalesById = async (req, res) => {
    try {
        const { id } = req.params;
        const profesional = await getProfesionalById(id);

        if (!profesional) {
            return res.status(404).json({ message: 'Profesional no encontrado' });
        }
        res.status(200).json({ message: 'Profesional encontrado', profesional });
    } catch (error) {
        console.error('Error al obtener el profesional:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getProfesionalesByEmail = async (req, res) => {
    try {
        const email = req.query.email;

        if (!email) {
            return res.status(400).json({ message: 'Email no proporcionado' });
        }

        const profesional = await getProfesionalByEmail(email);

        if (!profesional) {
            return res.status(404).json({ message: 'Profesional no encontrado' });
        }

        res.status(200).json({ message: 'Profesional encontrado', profesional });

    } catch (error) {
        console.error('Error al obtener el profesional:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

  


export const registerUsuarios = async (req, res) =>{
    const { id_rol, id_tipo_documento, nombre, email, direccion, telefono, documento, contraseña } = req.body;
    const userExistente = await buscarUsuariosPorEmail(email);
    if (userExistente) {
        return res.status(400).json({ message: 'correo ya registrado'});
    }
    const hash = await bcrypt.hash(contraseña, 10); //Salt: texto aleatorio 
    await crearUsuario(id_rol, id_tipo_documento, nombre, email, direccion, telefono, documento, hash);
    res.status(201).json({ message: 'usuario creado correctamete'});
};

export const updateProfesionales = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, direccion, telefono } = req.body;

        const result = await updateProfesional(id, { nombre, email, direccion, telefono });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Profesional no encontrado' });
        }

        res.status(200).json({ message: 'Profesional actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar profesional:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteProfesionales = async (req, res) => {
    try {
        const { id } = req.params;
        const profesional = await deleteProfesional(id);

        if (!profesional) {
            return res.status(404).json({ message: 'Profesional no encontrado' });
        }
        res.status(200).json({ message: 'Profesional eliminado', profesional });
    } catch (error) {
        console.error('Error al obtener el profesional:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// funciones Categorias
export const getCategorias = async (req, res) => {
  try {
    const categorias = await obtenerCategoriasDesdeBD(); // ✅ usamos el nombre renombrado
    res.json({ categorias });
  } catch (error) {
    console.error('Error obteniendo las categorías:', error);
    res.status(500).json({ error: 'Error del servidor' });
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

// funcion get tipo documentos 
export const getTiposDocumento = async (req, res) => {
  try {
    const tipos = await getTiposDocumentoFromDB();
    res.status(200).json({ tipos });
  } catch (error) {
    console.error('Error al obtener tipos de documento:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// apartado clientes- admin

export const getAllClientes = async (req, res) => {
  try {
    const clientes = await getClientes();
    res.json({ clientes });
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export const getClientePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await getClienteById(id);

    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.status(200).json({ message: 'Cliente encontrado', cliente });
  } catch (error) {
    console.error('Error al obtener cliente por ID:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getClientePorEmail = async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).json({ message: 'Email no proporcionado' });

    const cliente = await getClienteByEmail(email);
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });

    res.status(200).json({ message: 'Cliente encontrado', cliente });
  } catch (error) {
    console.error('Error al obtener cliente por email:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updateClientePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, telefono, documento, id_tipo_documento } = req.body;

    const result = await updateCliente(id, { nombre, email, telefono, documento, id_tipo_documento });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.status(200).json({ message: 'Cliente actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteCliente(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    res.status(200).json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


//funcion login
export const login = async (req, res) => {
    const { email, contraseña } = req.body;

    const user = await buscarUsuariosPorEmail(email);
    if (!user) return res.status(404).json({ message: 'usuario no encontrado' });

    const esValido = await bcrypt.compare(contraseña, user.contraseña);
    if (!esValido) return res.status(401).json({ message: 'contraseña incorrecta' });

    const rol = await obtenerRolPorId(user.id_rol);

    res.status(200).json({ 
        message: 'Login Exitoso', 
        rol, 
        nombre: user.nombre // ✅ devuelto al frontend
    });
};