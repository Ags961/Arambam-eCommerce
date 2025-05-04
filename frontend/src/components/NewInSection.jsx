import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ✅ Import New In Images
import new1 from '../assets/fragrance.png';
import new5 from '../assets/summer.png';
import new6 from '../assets/winter.png';
import new7 from '../assets/p_img7.png';
import new8 from '../assets/TOP.png';

// ✅ Static List of New In Items
const items = [
  { img: new1, label: "The Fragrance" },
  { img: new5, label: "Summer Essentials" },
  { img: new6, label: "Winter Essentials" },
  { img: new7, label: "Back in Stock" },
  { img: new8, label: "Top Picks" },
];

// ✅ NewInSection Component - Displays horizontally scrollable promotional categories
const NewInSection = () => {
  const navigate = useNavigate(); // Navigation hook
  const scrollRef = useRef(null); // Ref for scrollable container
  const [canScrollLeft, setCanScrollLeft] = useState(false); // Show left arrow
  const [canScrollRight, setCanScrollRight] = useState(true); // Show right arrow

  // ✅ Scroll the container programmatically
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const distance = 300;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  // ✅ Update scroll indicator visibility on scroll
  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.offsetWidth < el.scrollWidth);
  };

  // ✅ Auto-scroll every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (canScrollRight) scroll('right');
      else scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' }); // Reset to start
    }, 8000);
    return () => clearInterval(interval);
  }, [canScrollRight]);

  // ✅ Attach scroll listener to update buttons
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener('scroll', updateScrollButtons);
    updateScrollButtons(); // Initialize
    return () => container.removeEventListener('scroll', updateScrollButtons);
  }, []);

  return (
    <div className="my-16 px-4 sm:px-6">
      {/* ✅ Header Row with Title and Scroll Arrows */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          New <span className="text-teal-300">In</span>
        </h2>

        {/* Scroll Buttons - visible only on larger screens */}
        <div className="space-x-2 hidden sm:flex">
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="bg-white/10 text-white px-3 py-1 rounded-full hover:bg-white/20 transition"
            >
              ←
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="bg-white/10 text-white px-3 py-1 rounded-full hover:bg-white/20 transition"
            >
              →
            </button>
          )}
        </div>
      </div>

      {/* ✅ Scrollable Cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide pb-1"
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            onClick={() => navigate('/collection')}
            className="min-w-[200px] sm:min-w-[240px] cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition border border-white/10 bg-white/5 backdrop-blur-md"
          >
            {/* Image */}
            <img
              src={item.img}
              alt={item.label}
              className="w-full h-64 object-cover"
            />

            {/* Label */}
            <div className="bg-black/60 text-white text-center py-2 font-medium text-sm sm:text-base">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewInSection;