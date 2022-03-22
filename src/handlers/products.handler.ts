import { Request, Response, NextFunction } from 'express';
import ProductModel from '../models/product.model';
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

  getIndexByCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await controller.indexByCategory(req.params.category);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.show(req.params.uuid as string);
      if (typeof result === 'undefined') res.json("The product doesn't exist");
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.create(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        uuid: req.params.uuid,
      };
      const result = await controller.update(Product);
      if (typeof result === 'undefined') res.json("the product doesn't exist");
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.delete(req.params.uuid as string);
      if (typeof result === 'undefined') res.json("the product doesn't exist");
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default Controller;
