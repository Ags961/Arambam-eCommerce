import React, { useContext, useEffect, useState, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ✅ SearchBar Component - Used to filter products on the collection page
const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false); // Show bar only on /collection
  const location = useLocation();
  const inputRef = useRef(); // Focus input on open

  // ✅ Determine if SearchBar should appear based on URL
  useEffect(() => {
    setVisible(location.pathname.includes('collection'));
  }, [location]);

  // ✅ Auto-focus input when bar is shown
  useEffect(() => {
    if (showSearch && visible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch, visible]);

  // ✅ Handle ESC key to close search
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setShowSearch(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [setShowSearch]);

  return (
    <AnimatePresence>
      {showSearch && visible && (
        <motion.div
          className="border-t border-b bg-white/10 backdrop-blur-md text-center border-white/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* ✅ Input Field */}
          <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 px-5 py-2 my-5 mx-3 rounded-full w-11/12 sm:w-2/3 md:w-1/2 shadow-md">
            <input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none bg-transparent text-sm text-white placeholder-gray-300"
              type="text"
              placeholder="Search products..."
              aria-label="Search for products"
            />
            <img className="w-4 ml-2" src={assets.search_icon} alt="Search icon" />
          </div>

          {/* ✅ Close Button */}
          <div className="pt-2">
            <img
              onClick={() => setShowSearch(false)}
              className="inline w-5 cursor-pointer hover:rotate-90 transition-transform hover:scale-110"
              src={assets.cross_icon}
              alt="Close search"
              title="Close search"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;