import { NextFunction, Request, Response } from 'express';
import BookStore from '../models/book.model';

const bookStore = new BookStore();

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await bookStore.create(req.body);
    res.json({
      status: 'success',
      data: { ...book },
      message: 'created succussfully',
    });
  } catch (error) {
    next(error);
  }
};
