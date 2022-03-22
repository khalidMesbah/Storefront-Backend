import { Router } from 'express';
import Controller from '../../../handlers/users.handler';
import authenticateToken from '../../../middlewares/authenticateToken';
const controller = new Controller();
const routes = Router();

routes
  .route('/')
  .get(authenticateToken, controller.index)
  .post(controller.create);
routes
  .route('/:uuid')
  .get(authenticateToken, controller.show)
  .put(authenticateToken, controller.update)
  .patch(authenticateToken, controller.update)
  .delete(authenticateToken, controller.delete);
routes.get('/auth/:uuid', controller.authenticate);
export default routes;
