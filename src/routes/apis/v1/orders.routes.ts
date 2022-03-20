import { Router } from 'express';
import Controller from '../../../handlers/orders.handler';
// import authenticateToken from '../../../middlewares/authenticateToken';

const controller = new Controller();
const routes = Router();

routes.route('/').get(controller.index).post(controller.create);
routes.route('/:id').get(controller.show);
routes
  .route('/:id/products')
  .post(controller.addProduct)
  .get(controller.indexProduct);

export default routes;
