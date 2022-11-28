import { NextFunction, Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { IToken } from '../interfaces/userInterface';

const jwtSecret = process.env.JWT_SECRET as string;

const jwt = (id: number | string) => {
  const token = sign({ data: { id } }, jwtSecret, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });
  return token;
};

const verifyToken = (token: string) => {
  const value = verify(token, jwtSecret) as IToken;
  return value.data.id;
};

const tokenValidate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization as string;
  if (!token) {
    return res.status(401).json({
      message: 'Token not found',
    });
  }
  try {
    verifyToken(token);
  } catch (error) {
    return res.status(401).json({
      message: 'Token must be a valid token',
    });
  }
  next();
};

export default { jwt, verifyToken, tokenValidate };
