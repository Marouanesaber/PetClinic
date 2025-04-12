
import express from 'express';
import { getUserCart, addToCart, updateCartItem, removeFromCart } from '../controllers/cartController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// All cart routes require authentication
router.use(authenticateUser);

// Get user's cart
router.get('/', getUserCart);

// Add item to cart
router.post('/add', addToCart);

// Update cart item quantity
router.put('/update', updateCartItem);

// Remove item from cart
router.delete('/remove', removeFromCart);

export default router;
