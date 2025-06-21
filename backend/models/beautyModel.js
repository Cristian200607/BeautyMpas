import { pool } from '../config/db.js';

const idRolAdmin = 1;
const idRolProfesional = 2;
const idRolCliente = 3;
export const crearUsuario = async(id_rol, id_tipo_documento, nombre, email, direccion, telefono, documento, contraseña) => {
    if (id_rol === idRolProfesional) {
            const [result] = await pool.query(
            'insert into profesional (id_rol, id_tipo_documento, nombre, email, direccion, telefono, documento, contraseña) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
            [id_rol, id_tipo_documento, nombre, email, direccion, telefono, documento, contraseña]
        );
        return result.insertId;
    } else if (id_rol === idRolCliente) {
        const [result] = await pool.query(
            'INSERT INTO cliente (id_rol, id_tipo_documento, nombre, email, telefono, documento, contraseña) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [id_rol, id_tipo_documento, nombre, email, telefono, documento, contraseña]
        );
        return result.insertId;

    } else if (id_rol === idRolAdmin) {
        const [result] = await pool.query(
            'INSERT INTO administrador (id_rol, id_tipo_documento, nombre, email, telefono, documento, contraseña) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [id_rol, id_tipo_documento, nombre, email, telefono, documento, contraseña]
        );
        return result.insertId;
    }
};

export const getProfesional = async () => {
    const [rows] = await pool.query(
        'SELECT * FROM profesional'
    );
    return rows;
}

export const getProfesionalById = async (id) => {
    const [rows] = await pool.query(
        'select * from profesional where id = ?', [id]
    );
    return rows[0];
}

export const getProfesionalByEmail = async (email) => {
    const [rows] = await pool.query(
        'select * from profesional where email = ?', [email],
    );
    return rows[0];
}

export const updateProfesional = async (id, datos) => {
    const {nombre, email, direccion, telefono} = datos;
    const [rows] = await pool.query(
        'update profesional set nombre = ?, email = ?, direccion = ?, telefono = ? where id = ?', 
        [nombre, email, direccion, telefono, id]
    )
    return rows
}

export const deleteProfesional = async (id) => {
    const [rows] = await pool.query(
        'delete from profesional where id = ?', [id]
    )
    return rows
}

export const buscarUsuariosPorEmail = async (email) => {
    const [rows] = await pool.query(
        'SELECT * FROM usuarios WHERE email = ?', [email]
    );
    return rows[0]; // <-- también corregí esto: antes retornabas `[0]`, que no tiene sentido
};

export const obtenerRolPorId = async (id) => {
    const [rows] = await pool.query(
        'SELECT id_rol FROM usuarios WHERE id_rol = ?', [id]
    );
    return rows[0]?.id_rol;
};