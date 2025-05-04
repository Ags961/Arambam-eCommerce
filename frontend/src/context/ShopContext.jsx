import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

function ShopContextProvider({ children }) {
  const currency = '£';
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const [wishlist, setWishlist] = useState([]);

  const navigate = useNavigate();

  // ----------------------- Cart Logic -----------------------

  const addToCart = async (itemId, size) => {
    if (!size) return toast.error('Select Product Size');

    const cartData = structuredClone(cartItems);
    cartData[itemId] = {
      ...cartData[itemId],
      [size]: (cartData[itemId]?.[size] || 0) + 1,
    };
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token } });
      } catch {
        toast.error('Failed to sync cart.');
      }
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { token } });
      } catch {
        toast.error('Quantity update failed.');
      }
    }
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce((total, item) =>
      total + Object.values(item).reduce((sum, qty) => sum + qty, 0), 0);

  const getCartAmount = () =>
    Object.entries(cartItems).reduce((total, [itemId, sizes]) => {
      const product = products.find(p => p._id === itemId);
      return !product ? total : total + Object.values(sizes).reduce((sum, qty) => sum + qty * product.price, 0);
    }, 0);

  // -------------------- Wishlist Logic --------------------

  const addToWishlist = (productId) => {
    if (!wishlist.includes(productId)) {
      setWishlist(prev => [...prev, productId]);
      toast.success('Added to wishlist!');
    } else {
      toast.info('Already in wishlist');
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(id => id !== productId));
    toast.success('Removed from wishlist!');
  };

  // ------------------- Data Fetching -------------------

  const getProductsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/product/list`);
      if (data.success) setProducts(data.products.reverse());
      else toast.error(data.message || 'Failed to fetch products');
    } catch {
      toast.error('Could not load products');
    }
  };

  const getUserCart = async (userToken) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token: userToken } });
      if (data.success) setCartItems(data.cartData);
    } catch {
      toast.error('Could not load cart');
    }
  };

  // ----------------------- Effects -----------------------

  useEffect(() => { getProductsData(); }, []);

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (!token && localToken) {
      setToken(localToken);
      getUserCart(localToken);
    } else if (token) {
      getUserCart(token);
    }
  }, [token]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // -------------------- Context Output --------------------

  const contextValue = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    wishlist,
    addToWishlist,
    removeFromWishlist,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
}

export default ShopContextProvider;