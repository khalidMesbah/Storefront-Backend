import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.model';

// import gr from '../utilities/generateRandom';
// import jwt from 'jsonwebtoken';
// import env from '../middlewares/config';
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
      const result = await controller.create(req.body);
      // const result = await controller.create({
      //   firstName: gr(false, false, Math.floor(Math.random() * 10 + 5)),
      //   lastName: gr(false, false, Math.floor(Math.random() * 10 + 5)),
      //   password: gr(true, false, Math.floor(Math.random() * 20 + 5)),
      // });
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.update(req.params.id as string, req.body);
      // const result = await controller.update(req.params.id as string, {
      //   firstName: gr(false, false, Math.floor(Math.random() * 10 + 5)),
      //   lastName: gr(false, false, Math.floor(Math.random() * 10 + 5)),
      //   password: gr(true, false, Math.floor(Math.random() * 20 + 5)),
      // });
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
      console.log(
        '🚀 ~ file: users.controllers.ts ~ line 74 ~ Controller ~ authenticate= ~ result',
        result
      );
      if (result === null) res.json('Could not authenticate user');
      res.send(result);
    } catch (error) {
      next(error);
    }
  };
}

export default Controller;
