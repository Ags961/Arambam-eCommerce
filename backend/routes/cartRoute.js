import express from 'express';
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';

const cartRouter = express.Router();

// ✅ Route to Get User's Cart Data
cartRouter.post('/get', authUser, getUserCart);
// Authenticated user fetches their cart

// ✅ Route to Add Item to User Cart
cartRouter.post('/add', authUser, addToCart);
// Authenticated user adds product to their cart

// ✅ Route to Update Item Quantity in Cart
cartRouter.post('/update', authUser, updateCart);
// Authenticated user updates cart item quantity

export default cartRouter;