import express from 'express';
import {
  loginUser,
  registerUser,
  adminLogin,
} from '../controllers/userController.js';

const userRouter = express.Router();

// ✅ User Authentication Routes

// User Registration
userRouter.post('/register', registerUser); // 📩 Create a new user account

// User Login
userRouter.post('/login', loginUser); // 🔑 User login and token generation

// ✅ Admin Authentication Route

// Admin Login
userRouter.post('/admin', adminLogin); // 🔑 Admin login and token generation

export default userRouter;