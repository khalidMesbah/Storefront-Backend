import { Router } from 'express';
import Controller from '../../../handlers/orders.handler';
// import authenticateToken from '../../../middlewares/authenticateToken';

const controller = new Controller();
const routes = Router();

routes.route('/').get(controller.index).post(controller.create);
routes
  .route('/:uuid')
  .get(controller.show)
  .delete(controller.delete)
  .put(controller.update)
  .patch(controller.update);
routes
  .route('/:uuid/products')
  .post(controller.addProduct)
  .get(controller.indexProduct);

export default routes;
