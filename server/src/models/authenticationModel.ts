import { RowDataPacket, ResultSetHeader } from "mysql2";
import pool from '../config/database';

export const createLogin = async ()=> {
  return "Creacion del Login";
};

export const createRegister = async(
  username: string,
  password: string
): Promise<ResultSetHeader>=> {
  const [result] = await pool.query<ResultSetHeader>(`
    INSERT INTO users (username, password) VALUES (?, ?) 
  `, [username, password]);
  return result;
}

export const createLogout = async()=> {
  return "Creacion del Logout";
}

export const fetchProtected = async(data: any)=> {
  return "Obtención de la ruta Protected" + data;
}