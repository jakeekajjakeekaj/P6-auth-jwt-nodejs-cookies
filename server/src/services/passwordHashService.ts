import bcrypt from 'bcrypt';
import { config } from '../config/config';

// saltRounds indicaría una cadena de caracteres aleatoria antes de aplicar el hash, para que así la probalidad de que con una misma contraseña se genere un mismo hash sea poca, así mismo el número indica la cantidad de veces que se realizará el proceso, 10 es un número ideal para un equilibrio entre seguridad y consumo de recursos, ya que entre más alto el número, mejor seguridad, pero mayor consumo de recursos
const saltRounds = config.salt_rounds ? parseInt(config.salt_rounds) : 10;

export const passwordHash = async (password: string): Promise<string>=> {
  const passwordHashed = await bcrypt.hash(password, saltRounds);
  return passwordHashed;
};

export const comparePassword = async (password: string, hashedPassword: any): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};