import { Router } from 'express';
import Controller from '../../../handlers/products.handler';
import authenticateToken from '../../../middlewares/authenticateToken';

const controller = new Controller();
const routes = Router();

routes
  .route('/')
  .get(controller.index)
  .post(authenticateToken, controller.create);
routes
  .route('/:id')
  .get(controller.show)
  .delete(authenticateToken, controller.delete);

export default routes;
