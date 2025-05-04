import React, { useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

// ✅ Contact Page - Location, support details, career info, and newsletter signup
const Contact = () => {
  const [subscribed, setSubscribed] = useState(false);       // Track form submission
  const [email, setEmail] = useState('');                    // Email input value
  const [error, setError] = useState('');                    // Error state for empty email

  // ✅ Handle newsletter subscribe
  const handleSubscribe = (e) => {
    e.preventDefault();

    // Validate input
    if (!email.trim()) {
      setError('Please enter a valid email.');
      return;
    }

    // Simulate submission
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setError('');
    }, 3000); // Reset error & email after 3 seconds
  };

  return (
    <div className="overflow-hidden">

      {/* ✅ Page Title */}
      <motion.div
        className="text-center text-2xl pt-10 border-t border-white/20"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <Title text1={'CONTACT'} text2={'US'} />
      </motion.div>

      {/* ✅ Contact Info Section */}
      <div className="my-16 flex flex-col md:flex-row gap-10 justify-center items-center px-6">

        {/* 📍 Office Image */}
        <motion.img
          className="w-full md:max-w-[480px] rounded-2xl shadow-md object-cover hover:scale-105 transition-transform duration-700"
          src={assets.contact_img}
          alt="Contact Us"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        />

        {/* 📞 Contact Details */}
        <motion.div
          className="flex flex-col justify-center items-start gap-6 text-white"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <p className="font-semibold text-2xl text-teal-300">Our Store</p>
          <p className="text-white text-sm leading-relaxed">
            140 Hook Road <br /> Surrey, UK
          </p>
          <p className="text-white text-sm">
            Tel: +44 20 7730 3366 <br />
            Email: <a href="mailto:aarambam.ltd@gmail.com" className="underline hover:text-teal-200">aarambam.ltd@gmail.com</a>
          </p>

          <p className="font-semibold text-2xl text-teal-300 mt-6">Careers at Arambam</p>
          <p className="text-white text-sm">
            Learn more about our teams and job openings.
          </p>

          {/* 📩 Job Email Button */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="mailto:aarambam.ltd@gmail.com?subject=Job Opportunity Inquiry"
            className="mt-2"
          >
            <button className="border border-teal-300 px-8 py-4 text-sm rounded-full hover:bg-teal-400 hover:text-white transition-all duration-500">
              Explore Jobs
            </button>
          </motion.a>
        </motion.div>
      </div>

      {/* ✅ Newsletter Signup */}
      <div className="flex flex-col items-center justify-center mt-20">

        {!subscribed ? (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-lg px-4"
          >
            {/* Email Input */}
            <input
              type="email"
              required
              aria-label="Email Address"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-md placeholder-white text-white w-full focus:outline-none"
            />

            {/* Subscribe Button */}
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-teal-400 hover:bg-teal-500 text-white font-semibold w-full sm:w-auto"
            >
              SUBSCRIBE
            </button>
          </form>
        ) : (
          // ✅ Success Message Only
          <motion.div
            className="text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-teal-200 font-semibold text-xl">
              🎉 You're now subscribed to our newsletter!
            </p>
            <p className="text-white/70 text-sm mt-2">
              Look out for exclusive updates in your inbox.
            </p>
          </motion.div>
        )}

        {/* ❌ Error Message */}
        {error && (
          <p className="text-red-400 text-sm mt-2">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Contact;