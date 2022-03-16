import { Request, Response, NextFunction } from 'express';
import env from './config';
import jwt from 'jsonwebtoken';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null)
    return res.json({
      status: 'error',
      msg: 'no token',
    });

  jwt.verify(token, env.tokenSecret as string, (err, user) => {
    if (err)
      return res.json({
        status: 'error',
        msg: 'not authed',
      });
    req.body.user = user;
    next();
  });
};

export default authenticateToken;
