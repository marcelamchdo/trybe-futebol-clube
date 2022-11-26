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

export { jwt, verifyToken };
