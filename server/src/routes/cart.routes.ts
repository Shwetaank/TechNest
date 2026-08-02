import { Router } from 'express';
import { CartController } from '../modules/cart/cart.controller.js';

const router = Router();
const controller = new CartController();

router.get('/', controller.getCart);
router.post('/add', controller.addToCart);
router.patch('/items/:itemId', controller.updateItemQuantity);

export default router;
