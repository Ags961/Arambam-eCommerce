import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  const navLinks = [
    { path: '/sale', label: 'SALE' },
    { path: '/about', label: 'ABOUT' },
    { path: '/contact', label: 'CONTACT' },
  ];

  return (
    <div className="flex items-center justify-between py-5 px-4 font-medium relative backdrop-blur-md bg-white/10 border-b border-white/20 rounded-b-2xl z-50">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="Logo" />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex gap-8 text-sm text-gray-200 items-center relative">
        {/* HOME */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 hover:text-teal-300 transition-colors ${isActive ? 'text-teal-400' : ''}`
          }
        >
          <p>HOME</p>
        </NavLink>

        {/* COLLECTION with dropdown */}
        <div
          className="relative group"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <p
            onClick={() => navigate('/collection')}
            className="flex flex-col items-center gap-1 text-sm text-gray-200 cursor-pointer hover:text-teal-300 transition-colors"
          >
            COLLECTION
          </p>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                className="absolute top-full left-0 flex flex-col bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-md shadow-md mt-2 z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Link to="/mens" className="px-4 py-2 hover:bg-white/30 transition">MENS</Link>
                <Link to="/womens" className="px-4 py-2 hover:bg-white/30 transition">WOMENS</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Other nav links */}
        {navLinks.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 hover:text-teal-300 transition-colors ${isActive ? 'text-teal-400' : ''}`
            }
          >
            <p>{label}</p>
          </NavLink>
        ))}
      </ul>

      {/* Right Side Icons */}
      <div className="flex items-center gap-6">
        <img
          onClick={() => {
            setShowSearch(true);
            navigate('/collection');
          }}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
        />

        {/* Profile */}
        <div className="relative group">
          <img
            onClick={() => (token ? null : navigate('/login'))}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="Profile"
          />

          {/* Dropdown when logged in */}
          <AnimatePresence>
            {token && (
              <motion.div
                className="absolute right-0 pt-4 hidden group-hover:block z-50"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-white/20 backdrop-blur-md text-gray-100 rounded shadow-md">
                  <p className="cursor-pointer hover:text-white">My Profile</p>
                  <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-white">Orders</p>
                  <p onClick={logout} className="cursor-pointer hover:text-white">Logout</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
          {getCartCount() > 0 && (
            <p className="absolute right-[-5px] bottom-[-5px] w-4 h-4 bg-teal-400 text-white text-center rounded-full text-[10px] leading-4">
              {getCartCount()}
            </p>
          )}
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      {/* Sidebar Mobile Menu */}
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-3/4 sm:w-1/2 bg-white/20 backdrop-blur-lg z-50 p-6 border-l border-white/20"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col text-gray-100">
              <div
                onClick={() => setVisible(false)}
                className="flex items-center gap-4 mb-8 cursor-pointer"
              >
                <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="Back" />
                <p>Back</p>
              </div>

              {/* Mobile Links */}
              <NavLink to="/" onClick={() => setVisible(false)} className="py-3 pl-6 border-b border-white/20 hover:bg-white/10 transition">HOME</NavLink>
              <NavLink to="/collection" onClick={() => setVisible(false)} className="py-3 pl-6 border-b border-white/20 hover:bg-white/10 transition">COLLECTION</NavLink>
              <NavLink to="/mens" onClick={() => setVisible(false)} className="py-3 pl-6 border-b border-white/20 hover:bg-white/10 transition">MENS</NavLink>
              <NavLink to="/womens" onClick={() => setVisible(false)} className="py-3 pl-6 border-b border-white/20 hover:bg-white/10 transition">WOMENS</NavLink>
              <NavLink to="/sale" onClick={() => setVisible(false)} className="py-3 pl-6 border-b border-white/20 hover:bg-white/10 transition">SALE</NavLink>
              <NavLink to="/about" onClick={() => setVisible(false)} className="py-3 pl-6 border-b border-white/20 hover:bg-white/10 transition">ABOUT</NavLink>
              <NavLink to="/contact" onClick={() => setVisible(false)} className="py-3 pl-6 border-b border-white/20 hover:bg-white/10 transition">CONTACT</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
