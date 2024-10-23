import { Request, Response } from 'express';
import {
  createLogin,
  createRegister,
  createLogout,
  fetchProtected
} from '../models/authenticationModel';
import { userExists } from '../services/userVlidationService';

export const postLogin = async(req: Request, res: Response)=> {
  try {
    const login = await createLogin();
    res.status(200).json(login);
  }
  catch(err) {
    // *** RECUERDA CAMBIAR LOS ERRORES A ALGO MÁS GENERAL POR CUESTIONES DE SEGURIDAD, ALGO COMO "INTERNAL SERVER ERROR" ***
    res.status(500).json({ error: `Error en el Login ${err}` });
  }
};

export const postRegister = async(req: Request, res: Response): Promise<void>=> {
  try {
    const { username, password } = req.body;

    // Verificar si el usuario ya existe
    const exists = await userExists(username);
    if(exists) {
      res.status(400).json({ error: "Username already exists" });
      return;
    }

    await createRegister(username, password);
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