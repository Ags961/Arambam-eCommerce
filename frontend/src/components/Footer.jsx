import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTiktok, FaTwitter } from 'react-icons/fa';

// ✅ Footer Component - Displays website footer with navigation, contact info, and social links
const Footer = () => {
  const navigate = useNavigate(); // Hook for internal navigation

  return (
    <motion.footer
      className="bg-white/20 backdrop-blur-md border-t border-white/30 mt-16"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      {/* ✅ Main Footer Content */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-16 text-sm px-6">
        
        {/* ✅ Logo and Description */}
        <div>
          <img src={assets.logo} alt="Aarambam Logo" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-200 leading-relaxed">
            Discover timeless styles and premium quality. Arambam brings you fashion that lasts beyond seasons.
          </p>

          {/* ✅ Social Icons */}
          <div className="flex gap-4 mt-5">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-300 hover:text-white transition">
              <FaInstagram size={18} />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-300 hover:text-white transition">
              <FaFacebookF size={18} />
            </a>
            <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-gray-300 hover:text-white transition">
              <FaTiktok size={18} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-300 hover:text-white transition">
              <FaTwitter size={18} />
            </a>
          </div>
        </div>

        {/* ✅ Company Navigation Links */}
        <div>
          <p className="text-xl font-semibold mb-5 text-white">Company</p>
          <ul className="flex flex-col gap-2 text-gray-300">
            <li onClick={() => navigate('/')} className="hover:text-white cursor-pointer transition">Home</li>
            <li onClick={() => navigate('/about')} className="hover:text-white cursor-pointer transition">About Us</li>
            <li onClick={() => navigate('/delivery')} className="hover:text-white cursor-pointer transition">Delivery</li>
            <li onClick={() => navigate('/privacy-policy')} className="hover:text-white cursor-pointer transition">Privacy Policy</li>
          </ul>
        </div>

        {/* ✅ Contact Information */}
        <div>
          <p className="text-xl font-semibold mb-5 text-white">Get In Touch</p>
          <ul className="flex flex-col gap-2 text-gray-300">
            <li>
              <a href="tel:+442077303366" className="hover:text-white transition">+44 20 7730 3366</a>
            </li>
            <li>
              <a href="mailto:aarambam.ltd@gmail.com" className="hover:text-white transition">aarambam.ltd@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* ✅ Bottom Footer Strip */}
      <div className="px-6">
        <hr className="border-white/20" />
        <p className="py-5 text-xs text-center text-gray-400">
          &copy; 2025 Arambam — All Rights Reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;