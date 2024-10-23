import { Request, Response } from 'express';
import {
  createLogin,
  createRegister,
  createLogout
} from '../models/authenticationModel';

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

export const postRegister = async(req: Request, res: Response)=> {
  try {
    const register = await createRegister();
    res.status(200).json(register);
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