import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NewsletterBox = () => {
  const [subscribed, setSubscribed] = useState(false); // ✅ Tracks if user subscribed
  const [email, setEmail] = useState(''); // ✅ Stores email input

  // ✅ Handles form submission
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!email) return;

    // 🔗 Optionally send to backend/email API here
    // e.g., await axios.post('/api/subscribe', { email });

    setSubscribed(true);
    setEmail('');
  };

  return (
    <motion.div
      className="text-center my-16 px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <AnimatePresence mode="wait">
        {/* ✅ Message after subscription */}
        {subscribed ? (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <p className="text-3xl sm:text-4xl font-extrabold text-teal-400 mb-4">
              🎉 Thank you for signing up!
            </p>
            <p className="text-teal-200 text-sm md:text-base">
              You’ll now receive exclusive offers and updates.
            </p>
          </motion.div>
        ) : (
          // ✅ Signup form
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-2xl font-semibold text-white">
              Subscribe now & get 20% off
            </p>
            <p className="text-teal-200 mt-4 max-w-md mx-auto text-sm md:text-base">
              Get exclusive offers and updates straight to your inbox.
            </p>

            {/* ✅ Form Section */}
            <form
              onSubmit={onSubmitHandler}
              className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-8 bg-white/20 backdrop-blur-md border border-white/30 rounded-full overflow-hidden pl-4 pr-2 py-2 shadow-lg"
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none bg-transparent text-sm text-white placeholder-gray-300"
                type="email"
                placeholder="Enter your email"
                required
              />
              <button
                type="submit"
                className="bg-teal-400 hover:bg-teal-500 text-white text-xs sm:text-sm px-6 sm:px-8 py-3 rounded-full transition-all duration-300 font-semibold"
              >
                SUBSCRIBE
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NewsletterBox;