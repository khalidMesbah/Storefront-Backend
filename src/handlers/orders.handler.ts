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

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.show(req.params.uuid);
      if (typeof result === 'undefined') res.json("The order doesn't exist");
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.create(
        req.body.status,
        req.body.user_id_FK
      );
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.update(req.body.status, req.params.uuid);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.delete(req.params.uuid as string);
      if (typeof result === 'undefined') res.json("the order doesn't exist");
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  indexProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.indexProducts(req.params.uuid);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderStatus = await controller.show(req.params.uuid);
      if (orderStatus.status === 'active') {
        const result = await controller.addProduct(
          req.body.quantity,
          req.params.uuid,
          req.body.product_id_FK
        );
        res.json(result);
      } else {
        res.json(
          'sorry you can not add a new product because the order is completed'
        );
      }
    } catch (error) {
      next(error);
    }
  };
}

export default Controller;
