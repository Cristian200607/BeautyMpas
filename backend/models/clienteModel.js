import { pool } from '../config/db.js';

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
