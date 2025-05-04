import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import { motion } from 'framer-motion';

// ✅ CartTotal Component - Shows cart totals with optional discount input
const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountMessage, setDiscountMessage] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee - discountAmount;

  // ✅ Handle discount application
  const handleApplyDiscount = (e) => {
    e.preventDefault();

    if (discountApplied) {
      setDiscountMessage('Discount already applied');
      return;
    }

    const validCodes = {
      SAVE10: 10,   // £10 off
      SAVE5: 5,     // £5 off
      FREEDEL: delivery_fee, // Waive delivery fee
    };

    const discount = validCodes[discountCode.toUpperCase()];

    if (discount && subtotal > 0) {
      setDiscountAmount(discount);
      setDiscountApplied(true);
      setDiscountMessage(`Discount of ${currency}${discount} applied!`);
    } else {
      setDiscountMessage('Invalid or expired discount code');
    }
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto p-6 border border-white/30 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      {/* 🏷️ Title */}
      <div className="text-2xl text-center mb-6 text-white">
        <Title text1="Cart" text2="Totals" />
      </div>

      {/* 🧮 Totals */}
      <div className="flex flex-col gap-4 text-sm text-gray-100">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency} {subtotal}.00</p>
        </div>
        <hr className="border-white/20" />

        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency} {delivery_fee}.00</p>
        </div>

        {discountApplied && (
          <>
            <hr className="border-white/20" />
            <div className="flex justify-between text-green-300 font-semibold">
              <p>Discount</p>
              <p>-{currency}{discountAmount}.00</p>
            </div>
          </>
        )}

        <hr className="border-white/20" />
        <div className="flex justify-between font-bold text-base text-teal-200">
          <p>Total</p>
          <p>{currency} {total}.00</p>
        </div>
      </div>

      {/* 🎟️ Discount Input */}
      <form onSubmit={handleApplyDiscount} className="mt-6 flex flex-col gap-3">
        <input
          type="text"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className="w-full p-2 rounded-md bg-white/30 text-white placeholder-white/60 border border-white/20 focus:outline-none"
          placeholder="Enter discount code"
        />
        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md font-semibold transition"
        >
          Apply Discount
        </button>
        {discountMessage && (
          <p className={`text-sm ${discountApplied ? 'text-green-400' : 'text-red-400'}`}>
            {discountMessage}
          </p>
        )}
      </form>
    </motion.div>
  );
};

export default CartTotal;