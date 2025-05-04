import mongoose from 'mongoose';

// Define the order schema with the same structure
const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  items: {
    type: Array,         // Keeping as Array per original schema
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  address: {
    type: Object,        // Keeping generic Object as per original
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'Order Placed'
  },
  paymentMethod: {
    type: String,
    required: true
  },
  payment: {
    type: Boolean,
    required: true,
    default: false
  },
  date: {
    type: Number,
    required: true
  }
});

// Export the model (reuse if already compiled)
const OrderModel = mongoose.models.order || mongoose.model('order', orderSchema);
export default OrderModel;