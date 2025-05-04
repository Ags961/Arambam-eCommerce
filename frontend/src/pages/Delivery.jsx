import React from 'react';
import { motion } from 'framer-motion';
import Title from '../components/Title';
import { assets } from '../assets/assets';

// ✅ Delivery Page - Shipping policy, rates, and dispatch info
const Delivery = () => {
  return (
    <motion.div 
      className="p-10 max-w-3xl mx-auto text-white overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >

      {/* ✅ Animated Section Title */}
      <div className="text-center mb-10">
        <Title text1="Delivery" text2="Information" />
        <p className="text-white/70 text-sm sm:text-base mt-2 max-w-md mx-auto">
          Learn more about our shipping options, rates, and tracking process.
        </p>
      </div>

      {/* ✅ Delivery Options List */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 space-y-4 shadow-md">
        <h2 className="text-xl font-semibold text-teal-300">UK Delivery Options</h2>
        <ul className="list-disc pl-6 text-white/80 space-y-2 text-sm">
          <li>Standard Delivery (3–5 working days): <strong>£3.99</strong></li>
          <li>Express Delivery (1–2 working days): <strong>£6.99</strong></li>
          <li>Orders over <strong>£50</strong> qualify for <span className="text-teal-300 font-medium">Free Delivery</span></li>
        </ul>

        <h2 className="text-xl font-semibold text-teal-300 pt-6">International Shipping</h2>
        <p className="text-white/70 text-sm">
          We ship globally — rates and delivery times vary by destination. Shipping charges are calculated at checkout.
        </p>
      </div>

      {/* ✅ Tracking Information Section */}
      <div className="mt-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-md">
        <h2 className="text-lg font-semibold text-teal-300 mb-2">Tracking Your Order</h2>
        <p className="text-white/70 text-sm">
          Once your order has been dispatched, we’ll email you a confirmation along with a tracking link so you can monitor delivery progress.
        </p>
      </div>

      {/* ✅ Delivery Truck Visual (optional) */}
      <motion.img 
        src={assets.delivery_icon} 
        alt="Delivery Truck" 
        className="w-40 mx-auto mt-10 opacity-80"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      />

    </motion.div>
  );
};

export default Delivery;