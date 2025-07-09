import { pool } from '../config/db.js';

// Obtener todas las PQRS
export const getAllPQRS = async () => {
  const [rows] = await pool.query(
    `SELECT p.*, t.nombre_tipó AS tipo_nombre 
     FROM pqrs p 
     JOIN tipo_pqrs t ON p.id_tipo = t.id`
  );
  return rows;
};

// Obtener una PQRS por ID
export const getPQRSById = async (id) => {
  const [rows] = await pool.query(
    `SELECT p.*, t.nombre_tipó AS tipo_nombre 
     FROM pqrs p 
     JOIN tipo_pqrs t ON p.id_tipo = t.id 
     WHERE p.id = ?`, 
    [id]
  );
  return rows[0];
};

// Crear una nueva PQRS
export const createPQRS = async (pqrs) => {
  const { id_tipo, nombre_usuario, correo_usuario, descripcion } = pqrs;
  const [result] = await pool.query(
    `INSERT INTO pqrs (id_tipo, nombre_usuario, correo_usuario, descripcion) 
     VALUES (?, ?, ?, ?)`,
    [id_tipo, nombre_usuario, correo_usuario, descripcion]
  );
  return { id: result.insertId, ...pqrs, estado: 'pendiente' };
};

// Actualizar estado de PQRS
export const updateEstadoPQRS = async (id, estado) => {
  await pool.query(
    `UPDATE pqrs SET estado = ? WHERE id = ?`,
    [estado, id]
  );
  return { id, estado };
};

// Eliminar PQRS
export const deletePQRS = async (id) => {
  await pool.query(`DELETE FROM pqrs WHERE id = ?`, [id]);
};

// Obtener tipos de PQRS
export const getTiposPQRS = async () => {
  const [rows] = await pool.query('SELECT * FROM tipo_pqrs');
  return rows;
};

// Crear un nuevo tipo de PQRS
export const createTipoPQRS = async (nombre_tipó) => {
  const [result] = await pool.query(
    `INSERT INTO tipo_pqrs (nombre_tipó) VALUES (?)`, 
    [nombre_tipó]
  );
  return { id: result.insertId, nombre_tipó };
};
