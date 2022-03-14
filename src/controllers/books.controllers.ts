import { Request, Response, NextFunction } from 'express';
import BookModel from '../models/book.model';
import { Book } from '../types/book.type';

const controller = new BookModel();
class Controller {
  create = async (req: Request, res: Response, next: NextFunction) => {
    const data: Book = {
      title: 'the wonder',
      author: 'khaled',
      total_pages: 200,
      summary: 'i love this book',
    };
    try {
      const book = await controller.create(data);
      res.json({
        status: 'success',
        msg: 'the book has been created',
        data: { ...book },
      });
    } catch (error) {
      next(error);
    }
  };
}

export default Controller;
