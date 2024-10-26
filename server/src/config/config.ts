import dotenv from 'dotenv';

dotenv.config();

export const config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  salt_rounds: process.env.MYSQL_SALT_ROUNDS,
  jwt_secret: process.env.JWT_SECRET
}