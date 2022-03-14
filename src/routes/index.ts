import { Router } from 'express';
import booksroutes from './apis/books.routes';
const router = Router();

router.use('/books', booksroutes);

export default router;
