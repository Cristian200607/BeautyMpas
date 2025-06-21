// config/db.js
import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'cristian',
  password: 'Pardo071020',
  database: 'beautymaps',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log('Conectado a la base de datos');