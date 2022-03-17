import { Request, Response, NextFunction } from 'express';
import ProductModel from '../models/product.model';

// import gr from '../utilities/generateRandom';
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
      const newUser = await controller.create(req.body);
      const token = jwt.sign({ user: newUser }, env.tokenSecret as string);
      res.json(token);
    } catch (error) {
      next(error);
    }
  };
}

export default Controller;
