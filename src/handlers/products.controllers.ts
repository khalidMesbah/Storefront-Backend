import { Request, Response, NextFunction } from 'express';
import ProductModel from '../models/product.model';
import jwt from 'jsonwebtoken';
import env from '../middlewares/config';
const controller = new ProductModel();

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
      jwt.verify(req.body.token, env.tokenSecret as string);
    } catch (error) {
      console.log();
      res
        .status(401)
        .json(`🚀🔥👉 ⚡ Controller ⚡ create= ⚡ error => ${error}`);
      return;
    }
    try {
      const result = await controller.create(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default Controller;
