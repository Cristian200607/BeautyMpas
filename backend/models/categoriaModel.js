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



// 1. Obtener los id_profesional que pertenecen a la categoría
export const getIdProfesionalesPorCategoria = async (id_categoria) => {
  const [rows] = await pool.query(
    'SELECT id_profesional FROM servicio WHERE id_categoria = ?',
    [id_categoria]
  );
  return rows; // Ej: [ { id_profesional: 19 }, { id_profesional: 21 } ]
};

// 3. Obtener datos de los profesionales usando el id
export const getProfesionalesPorIds = async (idsProfesional) => {
  if (!idsProfesional.length) return [];
  const [rows] = await pool.query(
    `SELECT * FROM profesional WHERE id IN (${idsProfesional.map(() => '?').join(',')})`,
    idsProfesional
  );
  return rows;
};


