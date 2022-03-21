import { Router } from 'express';
import Controller from '../../../handlers/services/dashboard.handler';
import authenticateToken from '../../../middlewares/authenticateToken';

const controller = new Controller();
const routes = Router();

routes.get(
  '/getAllProductsInOrders',
  authenticateToken,
  controller.getProductsInOrders
);
routes.get(
  '/getUsersWithOrders',
  authenticateToken,
  controller.getUsersWithOrders
);
routes.get(
  '/getMostExpProducts',
  authenticateToken,
  controller.getMostExpProducts
);
routes.get(
  '/getMostPopProducts',
  authenticateToken,
  controller.getMostPopProducts
);
routes.get(
  '/getCurrentOrderByUser/:uuid',
  authenticateToken,
  controller.getCurrentOrderByUser
);
export default routes;
