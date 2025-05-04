import React from 'react';
import { motion } from 'framer-motion';

// ✅ Title Component - Reusable animated heading for any section
const Title = ({ text1, text2 }) => {
  return (
    <motion.div 
      className="inline-flex flex-wrap items-center gap-3 mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
      role="heading"
      aria-level={2}
    >
      {/* ✅ Primary + Highlighted Title Text */}
      <p className="text-teal-200 text-lg sm:text-xl font-medium">
        {text1}{' '}
        <span className="text-white font-semibold">
          {text2}
        </span>
      </p>

      {/* ✅ Decorative Line (acts like underline) */}
      <div className="w-8 sm:w-12 h-[2px] bg-teal-400 rounded-full"></div>
    </motion.div>
  );
};

export default Title;