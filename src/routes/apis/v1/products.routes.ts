import { Router } from 'express';
import Controller from '../../../handlers/products.controllers';

const controller = new Controller();
const routes = Router();

routes.route('/').get(controller.index).post(controller.create);
routes.route('/:id').get(controller.show);

export default routes;
