import { pool } from '../config/db.js';

export const getFacturaPorCita = async (id_cita) => {
  // Traer factura, cliente y profesional
  const [facturaRows] = await pool.query(`
    SELECT 
      f.id AS factura_id,
      f.fecha_factura,
      f.total AS total_factura,
      f.id_metodo_pago,
      tp.metodo_pago,
      
      c.id AS cita_id,
      c.fecha_cita,
      c.hora_cita,

      cli.nombre AS cliente_nombre,

      prof.nombre AS profesional_nombre,
      prof.email AS profesional_email

    FROM factura f
    JOIN cita c ON f.id_cita = c.id
    JOIN usuarios cli ON c.id_cliente = cli.id
    JOIN profesional prof ON c.id_profesional = prof.id
    LEFT JOIN tipo_pago tp ON f.id_metodo_pago = tp.id
    WHERE c.id = ?
  `, [id_cita]);

  if (facturaRows.length === 0) {
    return [];
  }

  // Traer servicios vinculados a la cita
  const [serviciosRows] = await pool.query(`
    SELECT 
      s.id,
      s.servicio,
      s.precio
    FROM cita_servicio cs
    JOIN servicio s ON cs.id_servicio = s.id
    WHERE cs.id_cita = ?
  `, [id_cita]);

  const factura = {
    ...facturaRows[0],
    servicios: serviciosRows
  };

  return [factura];
};
