import express from 'express';
import cors from 'cors';
import authenticationRoutes from './routes/authenticationRoutes';
import homeRoutes from './routes/homeRoutes';
import cookieParser from 'cookie-parser';

const corsOptions = {
  origin : ['http://127.0.0.1:5173', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// app.get('/', (req, res)=> {
//   res.send("Hello World");
// });
app.use('/', homeRoutes);

app.use('/authentication', authenticationRoutes);

export default app;