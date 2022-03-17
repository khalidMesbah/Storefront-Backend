import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.model';

// import gr from '../utilities/generateRandom';
import jwt from 'jsonwebtoken';
import env from '../middlewares/config';
const controller = new UserModel();

class Controller {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.index();
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.show(req.params.id as string);
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
    try {
      const result = await controller.update(req.params.id as string, req.body);
      if (typeof result === 'undefined') res.json("the user doesn't exist");
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.delete(req.params.id as string);
      if (typeof result === 'undefined') res.json("the user doesn't exist");
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.authenticate(
        req.body.id,
        req.body.password
      );

      if (result === null) res.json('Could not authenticate user');
      res.send(result);
    } catch (error) {
      next(error);
    }
  };
}

export default Controller;
