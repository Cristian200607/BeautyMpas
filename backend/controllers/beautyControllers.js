import bcrypt from 'bcryptjs';
import{ crearUsuario, 
        getProfesional, 
        getProfesionalById,
        getProfesionalByEmail,
        updateProfesional,
        deleteProfesional,
        obtenerRolPorId, 
        buscarUsuariosPorEmail 
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

//funcion login
export const login = async (req, res) => {
    const {email, contraseña } = req.body;
    const user = await buscarUsuariosPorEmail(email);
    if(!user) return res.status(404).json({ message: 'usuario no encontrado'});
    const esValido = await bcrypt.compare(contraseña, user.contraseña);
    if(!esValido) return res.status(401).json({ message: 'contraseña incorrecta'});
    const rol = await obtenerRolPorId(user.id_rol);
    res.status(200).json({ message: 'Login Exitoso', rol});
};