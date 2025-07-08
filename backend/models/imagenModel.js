import { pool } from '../config/db.js';

// Obtener todas las imágenes del portafolio de un profesional
export const obtenerImagenesPorProfesional = async (id_profesional) => {
  const [rows] = await pool.query(
    'SELECT id, urlPortafolio FROM imagenes WHERE id_profesional = ? AND urlPortafolio IS NOT NULL',
    [id_profesional]
  );
  return rows;
};

// Agregar imagen de portafolio
export const agregarImagenPortafolio = async (id_profesional, urlPortafolio) => {
  const [result] = await pool.query(
    'INSERT INTO imagenes (id_profesional, urlPortafolio) VALUES (?, ?)',
    [id_profesional, urlPortafolio]
  );
  return result.insertId;
};

// Eliminar imagen de portafolio por ID
export const eliminarImagenPortafolio = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM imagenes WHERE id = ?',
    [id]
  );
  return result.affectedRows;
};

// Cambiar o establecer imagen de perfil
export const actualizarImagenPerfil = async (id_profesional, urlPerfil) => {
  // Verificamos si ya existe un registro de perfil
  const [rows] = await pool.query(
    'SELECT id FROM imagenes WHERE id_profesional = ? AND urlPerfil IS NOT NULL LIMIT 1',
    [id_profesional]
  );

  if (rows.length > 0) {
    // Si ya existe, actualizamos
    const id = rows[0].id;
    await pool.query(
      'UPDATE imagenes SET urlPerfil = ? WHERE id = ?',
      [urlPerfil, id]
    );
    return id;
  } else {
    // Si no, insertamos uno nuevo
    const [result] = await pool.query(
      'INSERT INTO imagenes (id_profesional, urlPerfil) VALUES (?, ?)',
      [id_profesional, urlPerfil]
    );
    return result.insertId;
  }
};

// Obtener la imagen de perfil de un profesional
export const obtenerImagenPerfil = async (id_profesional) => {
  const [rows] = await pool.query(
    'SELECT id, urlPerfil FROM imagenes WHERE id_profesional = ? AND urlPerfil IS NOT NULL LIMIT 1',
    [id_profesional]
  );
  return rows[0] || null;
};
