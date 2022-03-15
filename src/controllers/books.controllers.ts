import { Request, Response, NextFunction } from 'express';
import BookModel from '../models/book.model';

const controller = new BookModel();
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
      if (typeof result === 'undefined') res.json("the book doesn't exist");
      res.json({ ...result });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await controller.create(req.body);
      res.json(book);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await controller.delete(req.params.id as string);
      if (typeof result === 'undefined') res.json("the book doesn't exist");
      res.json({ ...result });
    } catch (error) {
      next(error);
    }
  };
}

export default Controller;
