import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl, currency } from '../App';

/**
 * List component: shows all products in a tabular layout
 * with edit and delete functionality.
 */
const List = ({ token, darkMode }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  /**
   * Fetches product list and sets the component state.
   */
  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success) {
        // Reverse list to show latest first
        setProducts(res.data.products.reverse());
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      toast.error(err.message || 'Failed to fetch product list');
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  /**
   * Sends a delete request and refreshes the product list.
   * @param {string} id - Product ID
   */
  const handleDelete = async (id) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        fetchProducts();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error('Deletion error:', err);
      toast.error(err.message || 'Delete failed');
    }
  };

  /**
   * Redirects user to the add/edit page with product state.
   */
  const handleEdit = (product) => {
    navigate(`/add?id=${product._id}`, { state: product });
  };

  /**
   * Renders a single product row
   */
  const ProductRow = ({ product }) => (
    <motion.div
      key={product._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className={`grid items-center grid-cols-[1fr_2fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] gap-3 px-4 py-3 rounded-md border
        ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white/90 text-black'}
        shadow hover:shadow-lg transition-all`}
    >
      <img src={product.image[0]} alt={product.name} className="w-12 h-12 rounded-full object-cover" />
      <p className="font-medium truncate">{product.name}</p>
      <p className="text-sm">{product.category}</p>
      <p className="hidden md:block font-semibold">{currency}{product.price}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => handleEdit(product)}
        className="bg-teal-500 hover:bg-teal-600 text-white text-xs px-3 py-1 rounded"
      >
        Edit
      </motion.button>
      <motion.p
        whileHover={{ scale: 1.2, color: '#ff3333' }}
        onClick={() => handleDelete(product._id)}
        className="cursor-pointer text-center text-lg"
      >
        ✖
      </motion.p>
    </motion.div>
  );

  return (
    <motion.section
      className={`p-6 flex flex-col gap-6 ${darkMode ? 'text-white' : 'text-black'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold">All Products</h2>

      {/* Table Header */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] py-2 px-4 rounded-lg font-semibold
          ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-r from-teal-400 to-green-500 text-white'}
        `}
      >
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span className="text-center">Edit</span>
        <span className="text-center">Delete</span>
      </motion.div>

      {/* Product Rows */}
      <AnimatePresence>
        {products.map((product) => (
          <ProductRow key={product._id} product={product} />
        ))}
      </AnimatePresence>
    </motion.section>
  );
};

export default List;