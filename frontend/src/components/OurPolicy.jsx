import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

// ✅ Static list of Policies (can be expanded easily)
const policies = [
  {
    icon: assets.exchange_icon,
    title: 'Easy Exchange Policy',
    description: 'We offer hassle-free exchanges for your convenience.',
  },
  {
    icon: assets.quality_icon,
    title: '7 Days Return Policy',
    description: 'You can return products within 7 days free of charge.',
  },
  {
    icon: assets.support_img,
    title: 'Best Customer Support',
    description: 'Our team is available 24/7 to assist you.',
  },
];

// ✅ OurPolicy Component - Shows store policies/features
const OurPolicy = () => {
  return (
    <motion.section
      className="flex flex-col sm:flex-row justify-around items-stretch gap-10 sm:gap-6 py-20 px-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      {/* ✅ Render each policy card */}
      {policies.map((policy) => (
        <motion.article
          key={policy.title}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 180 }}
          className="bg-white/10 backdrop-blur-lg flex flex-col items-center text-center p-6 rounded-2xl shadow-lg border border-white/30 w-full sm:w-1/3 hover:shadow-xl transition"
          aria-label={policy.title}
        >
          {/* ✅ Icon */}
          <img
            src={policy.icon}
            alt={policy.title}
            className="w-14 mb-3"
          />

          {/* ✅ Title */}
          <h3 className="text-white text-lg font-semibold mb-2">
            {policy.title}
          </h3>

          {/* ✅ Description */}
          <p className="text-sm text-white/80 leading-relaxed">
            {policy.description}
          </p>
        </motion.article>
      ))}
    </motion.section>
  );
};

export default OurPolicy;