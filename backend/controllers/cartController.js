import userModel from "../models/userModel.js";

/**
 * Helper: Sends a consistent error response
 */
const sendError = (res, message, code = 400) => {
  return res.status(code).json({ success: false, message });
};

/**
 * Helper: Fetches user by ID or returns a 404 response
 */
const findUserById = async (userId, res) => {
  const user = await userModel.findById(userId);
  if (!user) {
    sendError(res, 'User not found', 404);
    return null;
  }
  return user;
};

/**
 * ADD product to cart
 */
const addToCart = async (req, res) => {
  console.log("🛒 [addToCart] - Called");

  try {
    const { userId, itemId, size } = req.body;
    if (!userId || !itemId || !size) return sendError(res, 'Missing required fields');

    const user = await findUserById(userId, res);
    if (!user) return;

    const cart = { ...user.cartData } || {};

    // Increment quantity or add new item
    if (cart[itemId]) {
      cart[itemId][size] = (cart[itemId][size] || 0) + 1;
      console.log(`↺ Updated quantity: ${itemId} (${size}) = ${cart[itemId][size]}`);
    } else {
      cart[itemId] = { [size]: 1 };
      console.log(`➕ Added new item: ${itemId} (${size})`);
    }

    await userModel.findByIdAndUpdate(userId, { cartData: cart });
    res.status(200).json({ success: true, message: "Added to cart" });

  } catch (err) {
    console.error("❌ [addToCart] Error:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * UPDATE specific item/size quantity in cart
 */
const updateCart = async (req, res) => {
  console.log("🛠️ [updateCart] - Called");

  try {
    const { userId, itemId, size, quantity } = req.body;
    if (!userId || !itemId || !size || quantity == null) return sendError(res, 'Missing required fields');

    const user = await findUserById(userId, res);
    if (!user) return;

    const cart = { ...user.cartData } || {};

    if (!cart[itemId]) cart[itemId] = {};
    cart[itemId][size] = quantity;

    console.log(`🔧 Updated: ${itemId} (${size}) = ${quantity}`);

    await userModel.findByIdAndUpdate(userId, { cartData: cart });
    res.status(200).json({ success: true, message: "Cart updated" });

  } catch (err) {
    console.error("❌ [updateCart] Error:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * GET user's current cart data
 */
const getUserCart = async (req, res) => {
  console.log("📦 [getUserCart] - Called");

  try {
    const { userId } = req.body;
    if (!userId) return sendError(res, 'Missing userId');

    const user = await findUserById(userId, res);
    if (!user) return;

    const cart = user.cartData || {};
    console.log("📤 Returning Cart:", cart);

    res.status(200).json({ success: true, cartData: cart });

  } catch (err) {
    console.error("❌ [getUserCart] Error:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Exporting all controllers
export { addToCart, updateCart, getUserCart };