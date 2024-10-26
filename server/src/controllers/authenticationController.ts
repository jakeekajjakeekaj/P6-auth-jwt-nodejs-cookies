import { Request, Response } from 'express';
import {
  createLogin,
  createRegister,
  createLogout,
  fetchProtected
} from '../models/authenticationModel';
import { fetchUser, userExists } from '../services/userValidationService';
import { passwordHash, comparePassword } from '../services/passwordHashService';
import { generateToken } from '../services/jsonWebTokenService';

export const postLogin = async(req: Request, res: Response): Promise<void>=> {
  try {
    const { username, password } = req.body;

    // Verificar si el usuario existe
    const user = await fetchUser(username);
    if(!user) {
      res.status(400).json({ error: "Username don't exists" });
      return;
    }
    
    // Verificar si el login es correcto
    const handleLogin = await comparePassword(password, user.password);

    if (!handleLogin) {
      res.status(400).json({ error: "Incorrect Password" });
      return;
    }


    // Llamada al model
    const login = await createLogin();

    // Generacion del JWT
    const token = generateToken(user.id, user.username);
    res.status(200).json(login);
  }
  catch(err) {
    // *** RECUERDA CAMBIAR LOS ERRORES A ALGO MÁS GENERAL POR CUESTIONES DE SEGURIDAD, ALGO COMO "INTERNAL SERVER ERROR" ***
    res.status(500).json({ error: `Error en el Login` });
  }
};

export const postRegister = async(req: Request, res: Response): Promise<void>=> {
  try {
    const { username, password } = req.body;

    // Verificar si el usuario ya existe
    const user = await userExists(username);
    if(user) {
      res.status(400).json({ error: "Username already exists" });
      return;
    }

    // Hasheo de contraseña
    const passwordHashed = await passwordHash(password);
    
    // LLamada al Model
    await createRegister(username, passwordHashed);
    res.status(201).json({ message: "User registered successfully" });
  }
  catch(err) {
    res.status(500).json({ error: `Error en el register ${err}` });
  }
};

export const postLogout = async(req: Request, res: Response)=> {
  try {
    const logout = await createLogout();
    res.status(200).json(logout);
  }
  catch(err) {
    res.status(500).json({ error: `Error en el logout ${err}` });
  }
};

export const getProtected = async(req: Request, res: Response)=> {
  try {
    const protect = await fetchProtected();
    res.status(200).json(protect);
  }
  catch (err) {
    res.status(500).json({ error: `Error en la ruta protected ${err}` });
  }
};