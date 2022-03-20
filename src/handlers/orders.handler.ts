import { Request, Response, NextFunction } from 'express';
import ProductModel from '../models/order.model';
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

  indexProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.indexProducts();
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.addProduct(
        req.body.quantity,
        req.params.id,
        req.body.product_id
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.show(req.params.id as string);
      if (typeof result === 'undefined') res.json("The product doesn't exist");
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.create(req.body.status, req.body.user_id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  /* 


  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.delete(req.params.id as string);
      if (typeof result === 'undefined') res.json("the product doesn't exist");
      res.json(result);
    } catch (error) {
      next(error);
    }
  }; */
}

export default Controller;
