
import express from 'express';
import productsRoutes from './products.js';
import cartRoutes from './cart.js';
import ordersRoutes from './orders.js';

const router = express.Router();

// Mount the sub-routers
router.use('/products', productsRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', ordersRoutes);

export default router;
