import { NextFunction, Request, Response } from 'express';
import Error from '../interfaces/error.interface';

const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(error.status || 500).json({
    status: error.status || 500,
    message: error.message || 'oooopppsss st went wrong!!',
  });
};

export default errorMiddleware;
