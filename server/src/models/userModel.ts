import pool from '../config/database';
import User from '../interfaces/userInterface';
import { RowDataPacket } from 'mysql2';

// Búsqueda de existencia del usuario
export const userExistsByUsername = async (username: string): Promise<Boolean>=> {
  const [rows] = await pool.query<RowDataPacket[]>(`
    SELECT COUNT(*) AS count FROM users WHERE username = ?
  `, [username]);
  // Retorna true si existe, false en caso contrario
  return rows[0].count > 0;
}

// Extracción del usuario
export const findUserByUsername = async (username: string): Promise<User | null> => {
  const [rows] = await pool.query<User[] & RowDataPacket[]>(`
    SELECT id, username, password 
    FROM users 
    WHERE username = ?
  `, [username]);

  if ((rows).length === 0) {
    return null;  // Usuario no encontrado
  }

  return rows[0];  // Retorna el objeto del usuario
};