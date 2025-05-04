import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion';

// ✅ RelatedProducts Component - Displays other products from the same category and subCategory
const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext); // Access global product list
  const [related, setRelated] = useState([]); // Local state to hold related product list

  // ✅ Effect to compute related products when dependencies change
  useEffect(() => {
    if (products.length > 0 && category && subCategory) {
      const matches = products
        .filter(
          (item) =>
            item.category === category &&
            item.subCategory === subCategory
        )
        .slice(0, 5); // Show only top 5

      setRelated(matches);
    }
  }, [products, category, subCategory]);

  return (
    <motion.div
      className="my-24 px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      {/* ✅ Section Heading */}
      <div className="text-center mb-10">
        <Title text1="Related" text2="Products" />
        <p className="text-teal-300 mt-2 text-sm md:text-base">
          Discover similar styles we think you’ll love.
        </p>
      </div>

      {/* ✅ Grid of Related Products or Fallback */}
      {related.length > 0 ? (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {related.map((item, index) => (
            <motion.div
              key={index}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ type: 'spring', stiffness: 120 }}
              whileHover={{ scale: 1.05 }}
            >
              <ProductItem
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
                sale={item.sale}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-white/50 text-sm mt-6">
          No related products available for this selection.
        </p>
      )}
    </motion.div>
  );
};

export default RelatedProducts;