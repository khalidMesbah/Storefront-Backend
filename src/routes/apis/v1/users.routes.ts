import { Router } from 'express';
import Controller from '../../../controllers/users.controllers';

const controller = new Controller();
const routes = Router();

routes.route('/').get(controller.index).post(controller.create);
routes
  .route('/:id')
  .get(controller.show)
  .put(controller.update)
  .patch(controller.update)
  .delete(controller.delete);

export default routes;
