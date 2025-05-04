import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { motion } from 'framer-motion';

// ✅ Cart Page - Displays cart items, quantity management, subtotal preview, and checkout
const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, getCartCount } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  // ✅ Extract cart data with size + quantity for rendering
  useEffect(() => {
    if (products.length > 0) {
      const structured = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            structured.push({
              _id: productId,
              size,
              quantity: cartItems[productId][size],
            });
          }
        }
      }
      setCartData(structured);
    }
  }, [cartItems, products]);

  return (
    <div className='border-t pt-14 border-white/20 overflow-hidden'>

      {/* ✅ Page Title */}
      <motion.div
        className='text-2xl mb-8 text-center'
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <Title text1={'YOUR'} text2={'CART'} />
      </motion.div>

      {/* ✅ Cart Item List */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } }
        }}
      >
        {cartData.map((item, index) => {
          const product = products.find(p => p._id === item._id);
          const subtotal = product.price * item.quantity;

          return (
            <motion.div
              key={index}
              className='py-6 border-t border-b border-white/20 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl my-6 px-4'
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              {/* ✅ Product Details */}
              <div className='flex items-start gap-6'>
                <img className='w-16 sm:w-20 rounded-lg' src={product.image[0]} alt={product.name} />
                <div>
                  <p className='text-sm sm:text-lg font-medium text-white'>{product.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p className='text-black'>{currency}{product.price.toFixed(2)}</p>
                    <p className='px-2 sm:px-3 sm:py-1 border border-white/20 bg-white/10 rounded-full text-white text-xs'>{item.size}</p>
                  </div>
                  {/* ✅ Live Subtotal Display */}
                  <p className='text-xs text-white/70 mt-1'>
                    Subtotal: {currency}{subtotal.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* ✅ Quantity Editor */}
              <input
                type="number"
                min={1}
                defaultValue={item.quantity}
                onChange={(e) =>
                  e.target.value === '' || e.target.value === '0'
                    ? null
                    : updateQuantity(item._id, item.size, Number(e.target.value))
                }
                className='border border-white/20 bg-white/10 backdrop-blur-md rounded-md max-w-10 sm:max-w-20 px-2 py-1 text-white text-center outline-none focus:ring focus:ring-teal-300 transition'
              />

              {/* ✅ Remove Button */}
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                src={assets.bin_icon}
                className='w-5 cursor-pointer hover:scale-110 transition-transform'
                alt="Remove"
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* ✅ Cart Summary & Checkout */}
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />

          {/* ✅ Checkout CTA */}
          <div className='w-full text-end'>
            <motion.button
              onClick={() => navigate('/place-order')}
              disabled={getCartCount() === 0}
              whileHover={{ scale: getCartCount() > 0 ? 1.05 : 1 }}
              className={`text-sm my-8 px-8 py-3 rounded-full transition-all font-semibold
                ${getCartCount() > 0
                  ? 'bg-teal-400 hover:bg-teal-500 text-white'
                  : 'bg-gray-400 cursor-not-allowed text-white/80'}
              `}
            >
              {getCartCount() === 0 ? 'CART IS EMPTY' : 'PROCEED TO CHECKOUT'}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;