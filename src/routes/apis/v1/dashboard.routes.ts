import { Router } from 'express';
import Controller from '../../../handlers/services/dashboard.handler';
// import authenticateToken from '../../../middlewares/authenticateToken';

const controller = new Controller();
const routes = Router();

routes.get('/getAllProductsInOrders', controller.getProductsInOrders);
routes.get('/getUsersWithOrders', controller.getUsersWithOrders);
routes.get('/getMostExpProducts', controller.getMostExpProducts);
routes.get('/getMostPopProducts', controller.getMostPopProducts);
export default routes;
