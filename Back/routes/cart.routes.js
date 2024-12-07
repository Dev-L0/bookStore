import express from 'express';
import {addToCart, getCartBooks,removeAllFromCart, updateQuantity } from '../controllers/cart.controller.js';
const router = express.Router();

router.get('/',getCartBooks);
router.post('/', addToCart);
router.delete('/', removeAllFromCart);
router.put('/:id', updateQuantity);


export default router;