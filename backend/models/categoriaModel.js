import { pool } from '../config/db.js';

export const getCategoria = async () => {
  const [rows] = await pool.query('select * from categoria');
  return rows;
};

export const contarCategoriasPorProfesional = async (id_profesional) => {
  const [result] = await pool.query(
    `SELECT COUNT(DISTINCT id_categoria) AS total 
     FROM servicio 
     WHERE id_profesional = ?`,
    [id_profesional]
  );
  return result[0].total;
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


