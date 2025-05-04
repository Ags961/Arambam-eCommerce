import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// ✅ LatestCollection Component - Displays the newest added products
const LatestCollection = () => {
  const { products } = useContext(ShopContext); // Access products from global context
  const [latestProducts, setLatestProducts] = useState([]); // Latest product state
  const [filtered, setFiltered] = useState([]); // Filtered products from search
  const [searchTerm, setSearchTerm] = useState(''); // User's search query
  const [loading, setLoading] = useState(true); // Show skeleton on load
  const navigate = useNavigate(); // Navigation

  // ✅ Load latest 10 products with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      const latest = products.slice(0, 10);
      setLatestProducts(latest);
      setFiltered(latest);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [products]);

  // ✅ Handle product search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredList = latestProducts.filter((item) =>
      item.name.toLowerCase().includes(term)
    );
    setFiltered(filteredList);
  };

  return (
    <motion.div
      className="my-16 px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      {/* ✅ Section Title */}
      <div className="text-center mb-12">
        <Title text1="Latest" text2="Collections" />
        <p className="w-full max-w-lg mx-auto text-sm md:text-base text-white/80 mt-4">
          Explore our freshest arrivals — curated just for you.
        </p>

        {/* ✅ Search Bar */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search latest products..."
          className="mt-6 w-full max-w-xs px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      </div>

      {/* ✅ Products Grid or Skeleton Loading */}
      {loading ? (
        // Loading shimmer skeletons
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gradient-to-r from-white/20 to-white/10 h-48 rounded-lg border border-white/30"
              aria-hidden="true"
            ></div>
          ))}
        </div>
      ) : filtered.length > 0 ? (
        // ✅ Render filtered products
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filtered.map((item, index) => (
            <motion.div
              key={index}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ type: 'spring', stiffness: 120 }}
              whileHover={{ scale: 1.05 }}
            >
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                sale={item.sale}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        // ✅ No products found
        <div className="text-center text-white/60 py-10">
          No products found matching your search.
        </div>
      )}

      {/* ✅ 'View All' CTA */}
      <div className="text-center mt-10">
        <motion.button
          onClick={() => navigate('/collection')}
          whileHover={{ scale: 1.05 }}
          className="px-8 py-3 bg-white text-teal-500 font-bold rounded-full shadow-lg hover:bg-teal-100 transition-all"
        >
          View All Products
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LatestCollection;