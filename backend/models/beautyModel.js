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
  const [rows] = await pool.query(`
    SELECT 
      p.id,
      p.nombre,
      p.email,
      p.direccion,
      p.telefono,
      c.categoria AS nombre_categoria,
      s.servicio AS nombre_servicio
    FROM profesional p
    LEFT JOIN categoria c ON p.id_categoria = c.id
    LEFT JOIN servicio s ON p.id_servicio = s.id
  `);
  return rows;
};


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
// modelo tipo documento

export const getTiposDocumento = async () => {
  const [rows] = await pool.query('SELECT * FROM tipo_documento');

  return rows;
};

// MODELO: Clientes

export const getClientes = async () => {
  const [rows] = await pool.query('SELECT * FROM cliente');
  return rows;
};

export const getClienteById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM cliente WHERE id = ?', [id]
  );
  return rows[0];
};

export const getClienteByEmail = async (email) => {
  const [rows] = await pool.query(
    'SELECT * FROM cliente WHERE email = ?', [email]
  );
  return rows[0];
};

export const updateCliente = async (id, datos) => {
  const { nombre, email, telefono } = datos;
  const [rows] = await pool.query(
    'UPDATE cliente SET nombre = ?, email = ?, telefono = ? WHERE id = ?',
    [nombre, email, telefono, id]
  );
  return rows;
};

export const deleteCliente = async (id) => {
  const [rows] = await pool.query(
    'DELETE FROM cliente WHERE id = ?', [id]
  );
  return rows;
};

// categorias

export const getCategorias = async () => {
  const [rows] = await pool.query('select * from categoria');
  return rows;
};

export const getCategoriaById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM categoria WHERE id = ?', [id]);
  return rows[0];
};

export const createCategoria = async (categoria) => {
  const [result] = await pool.query('INSERT INTO categoria (categoria) VALUES (?)', [categoria]);
  return { id: result.insertId, categoria };
};

export const updateCategoria = async (id, nuevaCategoria) => {
  await pool.query('UPDATE categoria SET categoria = ? WHERE id = ?', [nuevaCategoria, id]);
  return { id, categoria: nuevaCategoria };
};

export const deleteCategoria = async (id) => {
  await pool.query('DELETE FROM categoria WHERE id = ?', [id]);
};
