import * as bycrypt from 'bcryptjs';
import { jwt } from '../middlewares/jwt';
import Users from '../models/Users';

const validate = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;

const incorrect = 'Incorrect email or password';

const userService = async (email: string, password: string) => {
  if (!email || !password) {
    return { status: 400, message: { message: 'All fields must be filled' } };
  }

  if (password.length < 6) {
    return { status: 400, message: { message: 'Password must be at least 6 characters long' } };
  }

  if (!validate.test(email)) {
    return { status: 401, message: { message: incorrect } };
  }

  const login = await Users.findOne({ where: { email } });
  if (login) {
    const { id } = login;
    if (!await bycrypt.compare(password, login.password)) {
      return { status: 401, message: { message: incorrect } };
    }
    return { status: 200, message: { token: jwt(Number(id)) } };
  }
  return { status: 401, message: { message: incorrect } };
};

const getUser = async (id: number) => {
  const user = await Users.findOne({ where: { id } });
  return { status: 200, message: { role: user?.role } };
};

export default { userService, getUser };
