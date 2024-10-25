import jwt from 'jsonwebtoken';

export const generateToken = (userId: number, username: string): string => {
  return jwt.sign(
    { id: userId, username },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );
};