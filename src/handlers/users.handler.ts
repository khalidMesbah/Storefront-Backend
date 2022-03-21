import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.model';

import jwt from 'jsonwebtoken';
import env from '../middlewares/config';
const controller = new UserModel();
import parseJwt from '../utilities/pareJWT';
class Controller {
  index = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.index();
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.show(req.params.id);
      if (typeof result === 'undefined') res.json("the user doesn't exist");
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await controller.create(req.body);
      const token = jwt.sign({ user: newUser }, env.tokenSecret as string);
      res.json(token);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    // check if the user is the same user that will be updated
    try {
      const userInfo = await controller.getAll(req.params.id); // get the user's info from the database
      const tokenInfo = parseJwt(
        String(req.headers.authorization).split(' ')[1] as string
      ); // get the users info from the token
      // if data from token === data from database =>update successfully
      if (
        tokenInfo.user.first_name === userInfo.first_name &&
        tokenInfo.user.last_name === userInfo.last_name &&
        tokenInfo.user.password === userInfo.password
      ) {
        // update the user
        try {
          const result = await controller.update(req.params.id, req.body);
          const newUser = await controller.getAll(req.params.id);
          const token = jwt.sign({ user: newUser }, env.tokenSecret as string);

          res.json({ ...result, newtoken: token });
          return;
        } catch (error) {
          next(error);
        }
        return;
      } else {
        res.json({
          msg: 'you are not the same user',
          token: tokenInfo.user,
          user: userInfo,
        });
        return;
      }
    } catch (error) {
      next();
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    // check if the user is the same user that will be updated
    try {
      const userInfo = await controller.getAll(req.params.id); // get the user's info from the database
      const tokenInfo = parseJwt(
        String(req.headers.authorization).split(' ')[1] as string
      ); // get the users info from the token
      // if data from token === data from database =>update successfully
      if (
        tokenInfo.user.first_name === userInfo.first_name &&
        tokenInfo.user.last_name === userInfo.last_name &&
        tokenInfo.user.password === userInfo.password
      ) {
        // update the user
        try {
          const result = await controller.delete(req.params.id as string);
          res.json(result);
          return;
        } catch (error) {
          next(error);
        }
        return;
      } else {
        res.json({
          msg: 'you are not the same user',
          token: tokenInfo.user,
          user: userInfo,
        });
        return;
      }
    } catch (error) {
      next();
    }
  };

  authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.authenticate(
        req.params.id as string,
        req.body.password
      );
      if (typeof result === 'undefined') res.json("the user doesn't exist");
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default Controller;
