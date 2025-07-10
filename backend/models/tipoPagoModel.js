import { pool } from '../config/db.js';

export const getTiposPago = async () => {
  const [rows] = await pool.query('SELECT * FROM tipo_pago');
  return rows;
};
