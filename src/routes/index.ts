import { Router } from 'express';
import booksroutes from './apis/books.routes';
const routes = Router();

routes.use('/books', booksroutes);

export default routes;
