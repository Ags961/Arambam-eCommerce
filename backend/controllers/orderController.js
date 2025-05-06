import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js"; 
import createStripeSession from "../utils/stripeSession.js";

// ✅ Place Order - COD
const placeOrder = async (req, res) => {
  console.log("✅ [placeOrder] - Entry");

  try {
    const { userId, items, amount, address } = req.body;

    if (!userId || !items || !amount || !address) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const enrichedItems = await Promise.all(
      items.map(async (item) => {
        const product = await productModel.findById(item._id);
        return {
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          size: item.size,
          image: product.image,
        };
      })
    );

    const newOrder = new orderModel({
      userId,
      items: enrichedItems,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    console.log("📦 COD Order Created:", newOrder._id);
    res.status(200).json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.error("❌ [placeOrder] Error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Place Order - Stripe
const placeOrderStripe = async (req, res) => {
  console.log("✅ [placeOrderStripe] - Entry");

  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    if (!userId || !items || !amount || !address || !origin) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const enrichedItems = await Promise.all(
      items.map(async (item) => {
        const product = await productModel.findById(item._id);
        return {
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          size: item.size,
          image: product.image,
        };
      })
    );

    const newOrder = await new orderModel({
      userId,
      items: enrichedItems,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    }).save();

    const sessionUrl = await createStripeSession(enrichedItems, origin, newOrder._id);
    console.log("🧾 Stripe Session Created:", newOrder._id);

    res.status(200).json({ success: true, session_url: sessionUrl });
  } catch (error) {
    console.error("❌ [placeOrderStripe] Error:", error.message);
    res.status(500).json({ success: false, message: "Stripe Payment Failed" });
  }
};

// ✅ Verify Stripe
const verifyStripe = async (req, res) => {
  console.log("✅ [verifyStripe] - Entry");

  try {
    const { orderId, success, userId } = req.body;

    if (!orderId || success == null || !userId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      console.log("✅ Stripe Payment Confirmed - Order Updated:", orderId);
      res.status(200).json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      console.log("❌ Stripe Payment Failed - Order Deleted:", orderId);
      res.status(200).json({ success: false });
    }
  } catch (error) {
    console.error("❌ [verifyStripe] Error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Admin - All Orders
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("❌ [allOrders] Error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ User - Orders
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ success: false, message: "Missing userId" });
    }

    const orders = await orderModel.find({ userId });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("❌ [userOrders] Error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Admin - Update Order Status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    await orderModel.findByIdAndUpdate(orderId, { status });
    res.status(200).json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.error("❌ [updateStatus] Error:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export {
  verifyStripe,
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
};