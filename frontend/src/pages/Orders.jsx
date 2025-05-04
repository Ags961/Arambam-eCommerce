import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { motion } from 'framer-motion';

// ✅ Orders Page - Shows all past orders placed by the user
const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext); // Global config
  const [itemsWithOrderMeta, setItemsWithOrderMeta] = useState([]); // Orders with metadata
  const [error, setError] = useState(null); // Error state for failed fetch

  // ✅ Fetch user's past orders from backend
  const fetchUserOrders = async () => {
    if (!token) return;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (data.success) {
        // Flatten order structure into individual items with shared metadata
        const enrichedItems = data.orders.flatMap(order =>
          order.items.map(item => ({
            ...item,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.date,
          }))
        );

        setItemsWithOrderMeta(enrichedItems.reverse()); // Newest first
        setError(null); // Clear previous errors
      } else {
        setError('Failed to fetch orders.');
      }
    } catch (err) {
      console.error('❌ Error fetching orders:', err.message);
      setError('Something went wrong while loading your orders.');
    }
  };

  // ✅ Load orders on mount or when token changes
  useEffect(() => {
    fetchUserOrders();
  }, [token]);

  return (
    <motion.div
      className="border-t pt-16 px-4 text-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* ✅ Orders Page Heading */}
      <div className="text-2xl mb-8 text-teal-500">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {/* ✅ Error Message Display */}
      {error && (
        <div className="text-center text-red-500 text-sm mb-6">
          {error}
          <button
            onClick={fetchUserOrders}
            className="ml-3 underline text-teal-500 hover:text-teal-600"
          >
            Try again
          </button>
        </div>
      )}

      {/* ✅ Orders List or Empty Message */}
      <div className="flex flex-col gap-6">
        {itemsWithOrderMeta.length === 0 && !error ? (
          <motion.p
            className="text-center text-gray-500 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            You have no orders yet.
          </motion.p>
        ) : (
          itemsWithOrderMeta.map((item, index) => (
            <motion.div
              key={index}
              className="border rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
            >
              {/* ✅ Product Info Block */}
              <div className="flex items-start gap-4 w-full">
                <img
                  className="w-20 h-20 object-cover rounded-md border border-gray-200"
                  src={item.image?.[0] || '/placeholder.jpg'}
                  alt={item.name}
                />
                <div className="flex flex-col gap-2 text-sm w-full">
                  <p className="font-semibold text-lg">{item.name}</p>
                  <div className="flex flex-wrap gap-4 text-gray-800">
                    <p><span className="font-semibold">Price:</span> {currency}{item.price}</p>
                    <p><span className="font-semibold">Qty:</span> {item.quantity}</p>
                    <p><span className="font-semibold">Size:</span> {item.size || 'N/A'}</p>
                  </div>
                  <div className="text-gray-700">
                    <p><span className="font-semibold">Ordered:</span> {new Date(item.date).toLocaleDateString('en-GB')}</p>
                    <p><span className="font-semibold">Payment:</span> {item.paymentMethod}</p>
                    <p className="mt-1 text-gray-600 text-sm"><span className="font-semibold">Total:</span> {currency}{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* ✅ Order Status & Refresh Button */}
              <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    item.status === 'Delivered'
                      ? 'bg-green-500'
                      : item.status === 'Shipped'
                      ? 'bg-yellow-400'
                      : 'bg-gray-400'
                  }`} />
                  <p className="font-semibold">{item.status}</p>
                </div>

                <button
                  onClick={fetchUserOrders}
                  className="border border-teal-400 hover:bg-teal-400 hover:text-white text-sm font-semibold px-6 py-2 rounded-full transition"
                >
                  Refresh Status
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default Orders;