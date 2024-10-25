import { findUserByUsername, userExistsByUsername } from '../models/userModel';

// Devuelve una promesa de tipo booleana ya que retorna true o false
// Verificar si el usuario existe en la base de datos
export const fetchUser = async (username: string): Promise<any> => {
  const user = await findUserByUsername(username);

  return user;
};

export const userExists = async (username: string): Promise<Boolean>=> {
  const exists = await userExistsByUsername(username);

  // Retorna true si el usuario existe, false si no existe
  return exists;
}

// // VERIFICAR CONTRASEÑA

// export const fetchPassword = async (username: string): Promise<string | null>=> {
//   const [rows] = await pool.query(`
//     SELECT password FROM users WHERE username = ?  
//   `, [username]);

//   if ((rows as any).length === 0) {
//     return null;
//   }

//   const { password } = (rows as any)[0];

//   return password;
// }