import express from 'express';
import {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// ✅ Admin Routes - Only accessible by Admin
orderRouter.post('/list', adminAuth, allOrders); // Fetch all orders (Admin Panel)
orderRouter.post('/status', adminAuth, updateStatus); // Update order status (Admin Panel)

// ✅ User Routes - Only accessible by Logged-in Users
orderRouter.post('/place', authUser, placeOrder); // Place order using Cash On Delivery
orderRouter.post('/stripe', authUser, placeOrderStripe); // Place order using Stripe Checkout
orderRouter.post('/userorders', authUser, userOrders); // Fetch orders for a specific user
orderRouter.post('/verifyStripe', authUser, verifyStripe); // Verify Stripe Payment after checkout

export default orderRouter;
