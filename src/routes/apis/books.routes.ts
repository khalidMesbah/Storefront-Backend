import { Router } from 'express';

import * as controllers from '../../controllers/books.controllers';

const routes = Router();
routes.get('/', controllers.create);

export default routes;
