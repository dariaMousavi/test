import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

export const checkPassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const generateJWT = (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};
