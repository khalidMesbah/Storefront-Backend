import { Router } from 'express';
import usersRoutes from './apis/v1/users.routes';
import productsRoutes from './apis/v1/products.routes';
// import ordersRoutes from './apis/v1/orders.routes';

const router = Router();
router.use('/users', usersRoutes);
// router.use('/orders', ordersRoutes);
router.use('/products', productsRoutes);

export default router;
