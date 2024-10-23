import express from 'express';
import cors from 'cors';
import authenticationRoutes from './routes/authenticationRoutes';

const corsOptions = {
  origin : ['http://127.0.0.1:5173', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.get('/', (req, res)=> {
  res.send("Hello World");
});

app.use('/authentication', authenticationRoutes);

export default app;