import pool from '../config/database';

// Verificar si el usuario ya existe
// Devuelve una promesa de tipo booleana ya que retorna true o false
export const userExists = async (username: string): Promise<boolean>=> {
  // Realiza un contador en todas las filas *
  const [rows] = await pool.query(`
    SELECT COUNT(*) AS count FROM users WHERE username = ?
  `, [username]);
  // La consulta de arriba daría como resultado algo como [{"count": 0}] si no se encuentra coincidencia y [{"count": 1}] si se encuentra coincidencia
  // Al utilizar el .count significa que de nuestro arreglo rows, que para este caso solo sería una fila, accedemos al punto 0 del arreglo porque solo hay una fila, y con .count accedemos al valor de la consulta realizada arriba
  const count = (rows as any)[0].count;

  return count > 0; // Retorna true si es mayor a 0
}