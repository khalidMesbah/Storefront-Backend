import { Router } from 'express';
import booksroutes from './apis/v1/books.routes';

const router = Router();

router.use('/books', booksroutes);

export default router;
