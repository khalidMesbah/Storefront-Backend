import { Request, Response, NextFunction } from 'express';
import Dashboard from '../../models/services/dashboard';
const controller = new Dashboard();

class Controller {
  getProductsInOrders = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await controller.productsInOrders();
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getUsersWithOrders = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await controller.usersWithOrders();
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getMostExpProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await controller.mostExpProducts(req.body.limit);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getMostPopProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await controller.mostPopProducts(req.body.limit);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  getCurrentOrderByUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await controller.CurrentOrderByUser(req.params.uuid);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default Controller;
