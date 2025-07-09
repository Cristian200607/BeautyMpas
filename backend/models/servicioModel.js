import { pool } from '../config/db.js';

export const getServiciosPorProfesional = async (id_profesional) => {
  const [rows] = await pool.query(
    'SELECT id, id_profesional, id_categoria, servicio, precio, tiempo_servicio, descripcion_servicio FROM servicio WHERE id_profesional = ?',
    [id_profesional]
  );
  return rows;
};

export const getServicios = async () => {
  const [rows] = await pool.query(`
    SELECT s.id, s.servicio, s.precio, c.categoria AS nombre_categoria, s.id_categoria
    FROM servicio s
    JOIN categoria c ON s.id_categoria = c.id
  `);
  return rows;
};

export const postServicioProfesional = async (id_profesional, id_categoria, servicio, precio, descripcion_servicio, tiempo_servicio) => {
  const [result] = await pool.query(
    'INSERT INTO servicio (id_profesional, id_categoria, servicio, precio, descripcion_servicio, tiempo_servicio) VALUES (?, ?, ?, ?, ?, ?)',
    [id_profesional, id_categoria, servicio, precio, descripcion_servicio, tiempo_servicio]
  );
  return result.insertId;
};


export const actualizarServicio = async (id, { servicio, precio, id_categorias }) => {
    console.log('acualizando servicio con ID:', id);
  const [result] = await pool.query(
    `UPDATE servicio SET servicio = ?, precio = ?, id_categoria = ?, tiempo_servicio = ? WHERE id = ?`,
    [servicio, precio, id_categorias, id]
  );
  return result.affectedRows;
};

export const eliminarServicio = async (id) => {
    console.log('Eliminando servicio con ID:', id);
  const [result] = await pool.query(`DELETE FROM servicio WHERE id = ?`, [id]);
  return result.affectedRows;
};