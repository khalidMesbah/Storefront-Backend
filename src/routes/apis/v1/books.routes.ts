import { Router } from 'express';
import Controller from '../../../controllers/books.controllers';

const controller = new Controller();
const routes = Router();

routes.get('/', controller.index);
routes.get('/:id', controller.show);
routes.post('/', controller.create);
routes.put('/:id', controller.update);
routes.patch('/:id', controller.update);
routes.delete('/:id', controller.delete);

export default routes;
