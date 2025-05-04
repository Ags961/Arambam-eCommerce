import express from 'express';
import {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
  editProduct,
} from '../controllers/productController.js';

import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// Image upload config used in both add/edit
const uploadImages = upload.fields([
  { name: 'image1' },
  { name: 'image2' },
  { name: 'image3' },
  { name: 'image4' },
]);

/**
 * Admin-only Product Management Routes
 */
router.post('/add', adminAuth, uploadImages, addProduct);
router.post('/edit', adminAuth, uploadImages, editProduct);
router.post('/remove', adminAuth, removeProduct);

/**
 * Public Product Access Routes
 */
router.post('/single', singleProduct);
router.get('/list', listProducts);

export default router;