import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { fetchHome } from '../models/homeModel';

export const getHome = async(req: Request, res: Response): Promise<void>=> {
  try {
    const token = req.cookies.access_token;
    if(!token) {
      res.status(403).send("Access not authorized");
    }
    if(!config.jwt_secret) {
      // res.status(400).json({ error: 'Internal server error' });
      throw new Error("JWT secret is not defined");
    }
    const data = jwt.verify(token, config.jwt_secret)
    const protect = await fetchHome(data);
    res.status(200).json(protect);
  }
  catch (err) {
    res.status(400).json({ error: 'Internal server error' });
  }
};