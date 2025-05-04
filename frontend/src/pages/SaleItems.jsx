import React from "react";
import Title from "../components/Title";
import { motion } from "framer-motion";

// 🛍️ SaleItems Component - Display placeholder content until sale items are ready
const SaleItems = () => {
  return (
    <motion.div
      className="px-4 py-12 min-h-[70vh] flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* 🔖 Page Title */}
      <Title text1="SALE" text2="ITEMS" />

      {/* 💬 Message */}
      <p className="mt-8 text-lg text-gray-600 max-w-xl">
        Stay tuned! 🚀 Our best deals are on the way.
        We’re preparing exclusive discounts and limited-time offers you’ll love.
      </p>

      {/* 📩 Optional "Notify Me" CTA */}
      <button
        onClick={() => alert("You’ll be notified when the sale starts!")}
        className="mt-8 px-6 py-3 bg-teal-400 hover:bg-teal-500 text-white rounded-full font-semibold transition"
      >
        Notify Me
      </button>
    </motion.div>
  );
};

export default SaleItems;