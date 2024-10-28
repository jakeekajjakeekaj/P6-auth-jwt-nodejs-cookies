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
import jwt from 'jsonwebtoken'
import { config } from '../config/config';

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
    // Generación de la cookie
    res.cookie('access_token', token, {
      httpOnly: true,  // La cookie solo se puede acceder en el servidor, es decir que con un document.cookie no es posible acceder
      secure: process.env.NODE_ENV === 'production', // La cookie solo se puede acceder en https
      sameSite: 'strict',  // La cookie solo se puede acceder en el mismo dominio
      maxAge: 1000 * 60 * 60  // La cookie tiene un tiempo de validez de 1 hora
    })
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

export const postLogout = async(req: Request, res: Response): Promise<void>=> {
  try {
    const logout = await createLogout();
    res.status(200).json(logout);
  }
  catch(err) {
    res.status(500).json({ error: `Error en el logout ${err}` });
  }
};

export const getProtected = async(req: Request, res: Response): Promise<void>=> {
  try {
    const token = req.cookies.access_token;
    if(!config.jwt_secret) {
      // res.status(400).json({ error: 'Internal server error' });
      throw new Error("JWT secret is not defined");
    }
    const data = jwt.verify(token, config.jwt_secret)
    if(!token) {
      res.status(403).send("Access not authorized");
    }
    const protect = await fetchProtected(data);
    res.status(200).json(protect);
  }
  catch (err) {
    res.status(500).json({ error: `Error en la ruta protected ${err}` });
  }
};