import mysql, { Pool } from 'mysql2/promise';
import { config } from '../config/config';


const pool: Pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

export default pool;