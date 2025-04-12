
import express from 'express';
import { checkout, getUserOrders, getOrderDetails } from '../controllers/orderController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// All order routes require authentication
router.use(authenticateUser);

// Checkout
router.post('/checkout', checkout);

// Get user's orders
router.get('/', getUserOrders);

// Get order details
router.get('/:id', getOrderDetails);

export default router;
