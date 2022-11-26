import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { verifyToken } from '../middlewares/jwt';

const userController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const login = await UserService.userService(email, password);
  res.status(login.status).json(login?.message);
};

const getUser = async (req: Request, res: Response) => {
  const token = req.headers.authorization as string;
  const id = verifyToken(token);
  const user = await UserService.getUser(id);
  res.status(user.status).json(user.message);
};

export default { userController, getUser };
