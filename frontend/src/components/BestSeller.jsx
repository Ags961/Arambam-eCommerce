import React, { useContext, useEffect, useRef, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const [sortType, setSortType] = useState('default');
  const scrollRef = useRef(null);

  // Load & filter bestseller products
  useEffect(() => {
    let popular = products.filter(product => product.bestseller);
    
    // Sort logic
    switch (sortType) {
      case 'priceLow':
        popular = [...popular].sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        popular = [...popular].sort((a, b) => b.price - a.price);
        break;
      case 'name':
        popular = [...popular].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setBestSeller(popular.slice(0, 10));
  }, [products, sortType]);

  // Scroll carousel
  const scroll = (direction) => {
    const scrollDistance = window.innerWidth < 768 ? 240 : 320;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollDistance : scrollDistance,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="my-20 px-4">
      {/* Title and Description */}
      <div className="text-center mb-10">
        <Title text1="Best" text2="Sellers" />
        <p className="text-sm md:text-base text-white/80 max-w-xl mx-auto mt-3">
          Shop the most popular products our customers can't get enough of.
        </p>
      </div>

      {/* Controls: Sorting & View All */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-5 gap-3 sm:gap-0">
        <div className="flex gap-2 items-center text-sm text-white">
          <label htmlFor="sort" className="text-white/70">Sort by:</label>
          <select
            id="sort"
            className="bg-white/20 text-white px-3 py-1 rounded border border-white/30"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>

      </div>

      {/* Scroll Arrows */}
      <div className="flex justify-end gap-4 mb-3 pr-2">
        <button onClick={() => scroll('left')} className="text-white hover:text-teal-300">
          <FaChevronLeft size={18} />
        </button>
        <button onClick={() => scroll('right')} className="text-white hover:text-teal-300">
          <FaChevronRight size={18} />
        </button>
      </div>

      {/* Product Scroll Row */}
      {bestSeller.length === 0 ? (
        <p className="text-white/60 text-center">No best sellers available.</p>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide pb-2 touch-pan-x"
        >
          {bestSeller.map((item, index) => (
            <motion.div
              key={index}
              className="min-w-[200px] sm:min-w-[250px] md:min-w-[220px] bg-white/10 p-2 rounded-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <ProductItem
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
                sale={item.sale}
              />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BestSeller;