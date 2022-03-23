import jwt from 'jsonwebtoken';
import env from '../configs/config';
import { Request, Response, NextFunction } from 'express';
const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, env.tokenSecret as string);
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
  next();
};

export default verifyAuthToken;
