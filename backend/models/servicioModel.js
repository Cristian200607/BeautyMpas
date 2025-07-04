import { pool } from '../config/db.js';

export const getServiciosPorProfesional = async (id_profesional) => {
  const [rows] = await pool.query(
    'SELECT id, id_categoria, servicio, precio FROM servicio WHERE id_profesional = ?',
    [id_profesional]
  );
  return rows;
};