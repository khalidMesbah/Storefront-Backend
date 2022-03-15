import { Router } from 'express';

import Controller from '../../controllers/books.controllers';
// import Book from '../../models/types/book.type';
const controller = new Controller();
const routes = Router();
routes.get('/', controller.index);
routes.get('/:id', controller.show);
routes.post('/', controller.create);
// routes.put('/:id', controller);
// routes.patch('/:id', controller);
routes.delete('/:id', controller.delete);

export default routes;
