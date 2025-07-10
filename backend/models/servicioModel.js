import { pool } from '../config/db.js';

export const getServiciosPorProfesional = async (id_profesional) => {
  const [rows] = await pool.query(
    'SELECT id, id_profesional, id_categoria, servicio, precio, tiempo_servicio, descripcion_servicio FROM servicio WHERE id_profesional = ?',
    [id_profesional]
  );
  return rows;
};

export async function getServicios() {
  const [rows] = await pool.query(`
    SELECT 
      s.id,
      s.id_profesional,
      p.nombre AS nombre_profesional,
      p.email AS email_profesional,
      s.servicio,
      s.precio,
      s.descripcion_servicio,
      s.tiempo_servicio,
      s.id_categoria,
      c.categoria AS nombre_categoria
    FROM servicio s
    JOIN categoria c ON s.id_categoria = c.id
    JOIN profesional p ON s.id_profesional = p.id
  `);

  return rows;
}


export const postServicioProfesional = async (id_profesional, id_categoria, servicio, precio, descripcion_servicio, tiempo_servicio) => {
  const [result] = await pool.query(
    'INSERT INTO servicio (id_profesional, id_categoria, servicio, precio, descripcion_servicio, tiempo_servicio) VALUES (?, ?, ?, ?, ?, ?)',
    [id_profesional, id_categoria, servicio, precio, descripcion_servicio, tiempo_servicio]
  );
  return result.insertId;
};


export const actualizarServicio = async (id, servicioData) => {
  const {
    id_profesional,
    id_categoria,
    servicio,
    precio,
    descripcion_servicio,
    tiempo_servicio
  } = servicioData;

  const [result] = await pool.query(
    `UPDATE servicio 
     SET id_profesional = ?, id_categoria = ?, servicio = ?, precio = ?, descripcion_servicio = ?, tiempo_servicio = ?
     WHERE id = ?`,
    [id_profesional, id_categoria, servicio, precio, descripcion_servicio, tiempo_servicio, id]
  );

  return result.affectedRows;
};


export const eliminarServicio = async (id) => {
  console.log('Eliminando servicio con ID:', id);
  const [result] = await pool.query(`DELETE FROM servicio WHERE id = ?`, [id]);
  return result.affectedRows;
};