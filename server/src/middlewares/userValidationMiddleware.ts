import { Request, Response, NextFunction } from 'express';

export const validateUserInput = (req: Request, res: Response, next: NextFunction): void=> {
  const { username, password } = req.body;

  // --- USER
  if(typeof username !== 'string') {
    res.status(400).json({ error: "Username must be a string" });
    return;
  }

  // --- PASSWORD
  if(password.length < 3) {
  res.status(400).json({ error: "Password must be at least 3 characters long" });
  return;
  }

  if(password.length > 20) {
    res.status(400).json({ error: "Password must be less than 20 characters long" });
    return;
  }

  if(typeof password !== 'string') {
    res.status(400).json({ error: "Password must be an string" });
    return;
  }

  next();
}