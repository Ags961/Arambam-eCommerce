import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import hero1 from '../assets/hero_img.png';
import hero2 from '../assets/hero_img_copy.png';
import hero3 from '../assets/hero_img_copy_2.png';

// ✅ Slides data: title, subtitle, and image for each slide
const slides = [
  { id: 1, title: 'New Season Sale', subtitle: 'Limited Time Only', image: hero1 },
  { id: 2, title: 'Latest Arrivals', subtitle: 'Our Bestsellers', image: hero2 },
  { id: 3, title: 'Timeless Classics', subtitle: 'Premium Styles', image: hero3 },
];

// ✅ Hero Component - Animated Fullscreen Banner
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // Track active slide
  const navigate = useNavigate();
  const touchStartRef = useRef(null);

  // ✅ Automatically switch slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Keyboard arrow key support
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') setCurrentSlide((prev) => (prev + 1) % slides.length);
      if (e.key === 'ArrowLeft') setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // ✅ Touch swipe support for mobile
  const handleTouchStart = (e) => (touchStartRef.current = e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (!touchStartRef.current) return;
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (diff > 50) setCurrentSlide((prev) => (prev + 1) % slides.length); // Swipe Left
    else if (diff < -50) setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); // Swipe Right
    touchStartRef.current = null;
  };

  return (
    <div
      className="relative w-full h-[80vh] overflow-hidden rounded-2xl border border-white/20 backdrop-blur-md bg-white/10"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ✅ Animated Slide Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[currentSlide].id}
          className="absolute inset-0 flex flex-col sm:flex-row"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* ✅ Text Section */}
          <div className="w-full sm:w-1/2 flex flex-col justify-center items-center text-center sm:text-left p-8 sm:p-16 bg-white/20 backdrop-blur-lg rounded-l-2xl">
            <div className="text-white max-w-md">
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-4">
                <p className="w-8 md:w-11 h-[2px] bg-white"></p>
                <p className="font-medium text-sm md:text-base tracking-wide uppercase">
                  {slides[currentSlide].subtitle}
                </p>
              </div>

              <h1 className="prata-regular text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
                {slides[currentSlide].title}
              </h1>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/collection')}
                className="mt-4 px-6 py-2 bg-teal-400 text-white font-medium rounded-full shadow-md hover:bg-teal-500 transition"
                role="button"
              >
                Shop Now
              </motion.button>
            </div>
          </div>

          {/* ✅ Image Section */}
          <img
            src={slides[currentSlide].image}
            alt={`Hero Slide ${currentSlide + 1}`}
            className="w-full sm:w-1/2 object-cover transform transition-transform duration-500 hover:scale-105"
          />
        </motion.div>
      </AnimatePresence>

      {/* ✅ Slide Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === idx ? 'bg-teal-400' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;