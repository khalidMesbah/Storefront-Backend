import { Router } from 'express';
import Controller from '../../../handlers/products.handler';
import authenticateToken from '../../../middlewares/authenticateToken';

const controller = new Controller();
const routes = Router();

routes
  .route('/')
  .get(authenticateToken, controller.index)
  .post(authenticateToken, controller.create);
routes
  .route('/:uuid')
  .get(controller.show)
  .delete(authenticateToken, controller.delete)
  .put(authenticateToken, controller.update)
  .patch(authenticateToken, controller.update);
routes.get(
  '/indexByCategory/:category',
  authenticateToken,
  controller.getIndexByCategory
);

export default routes;
