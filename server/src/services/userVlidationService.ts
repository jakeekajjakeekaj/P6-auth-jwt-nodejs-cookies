import { Pool } from 'mysql2/promise';
import pool from '../config/database';

// Verificar si el usuario ya existe
// Devuelve una promesa de tipo booleana ya que retorna true o false
export const userExists = async (username: string): Promise<boolean>=> {
  // Realiza un contador en todas las filas *
  const [rows] = await pool.query(`
    SELECT COUNT(*) AS count FROM users WHERE username = ?
  `, [username]);
  const count = (rows as any)[0].count;

  return count > 0; // Retorna true si es mayor a 0
}