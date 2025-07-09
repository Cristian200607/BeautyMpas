import { pool } from '../config/db.js';

export const postCita = async (id_profesional, id_cliente, fecha_cita, hora_cita) => {
  const [result] = await pool.query(
    'INSERT INTO cita (id_profesional, id_cliente, fecha_cita, hora_cita, estado_cita) VALUES (?, ?, ?, ?, ?)',
    [id_profesional, id_cliente, fecha_cita, hora_cita, 'pendiente']
  );
  return result.insertId;
};

export const postCitaServicios = async (id_cita, id_servicios) => {
  for (const id_servicio of id_servicios) {
    await pool.query('INSERT INTO cita_servicio (id_cita, id_servicio) VALUES (?, ?)', [id_cita, id_servicio]);
  }
};

export const getCitasByProfesional = async (id_profesional) => {
  const [rows] = await pool.query(`
    SELECT 
      c.id AS id_cita,
      c.fecha_cita,
      c.hora_cita,
      c.estado_cita,
      u.nombre AS nombre_cliente,
      u.email,
      GROUP_CONCAT(s.servicio SEPARATOR ', ') AS servicios,
      GROUP_CONCAT(s.precio SEPARATOR ', ') AS precios,
      p.direccion
    FROM cita c
    JOIN usuarios u ON c.id_cliente = u.id
    JOIN cita_servicio cs ON c.id = cs.id_cita
    JOIN servicio s ON cs.id_servicio = s.id
    JOIN profesional p ON c.id_profesional = p.id
    WHERE c.id_profesional = ?
    GROUP BY c.id
    ORDER BY c.fecha_cita ASC, c.hora_cita ASC
  `, [id_profesional]);

  return rows;
};

export async function actualizarEstadoCita(id_cita, nuevoEstado) {
  const [result] = await pool.query(
    'UPDATE cita SET estado_cita = ? WHERE id = ?',
    [nuevoEstado, id_cita]
  );
}
