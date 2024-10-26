import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export const generateToken = (userId: number, username: string): string => {
  return jwt.sign(
    { id: userId, username },
    config.jwt_secret as string,
    { expiresIn: '1h' }
  );
};