import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

// Orders Component: Displays and manages all user orders
const Orders = ({ token, darkMode }) => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders from the backend API
  const fetchAllOrders = async () => {
    if (!token) return null; // Skip if no token (not authenticated)
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, {
        headers: { token }
      });
      if (response.data.success) {
        setOrders(response.data.orders.reverse()); // Latest orders first
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Update order status in the backend when changed from dropdown
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', {
        orderId,
        status: event.target.value
      }, {
        headers: { token }
      });

      if (response.data.success) {
        await fetchAllOrders(); // Refresh orders after status change
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Load all orders on initial render or when token updates
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <motion.div
      className={`flex flex-col gap-6 ${darkMode ? 'text-white' : 'text-black'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Section heading */}
      <h3 className="text-2xl font-semibold text-teal-400 mb-6">Order Management</h3>

      {/* Render all orders */}
      <div>
        {orders.map((order, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 p-6 my-4 
              rounded-xl shadow-md text-xs sm:text-sm
              ${darkMode ? 'bg-gray-800 border border-gray-700 text-gray-300' : 'bg-white/10 backdrop-blur-lg border border-teal-300/40 text-gray-800'}`}
          >
            {/* Parcel icon */}
            <img className="w-12" src={assets.parcel_icon} alt="Parcel" />

            {/* Order items and customer address */}
            <div>
              <div>
                {order.items.map((item, idx) => (
                  <p className="py-0.5" key={idx}>
                    {item.name} x {item.quantity} <span>{item.size}</span>
                    {idx !== order.items.length - 1 && ','}
                  </p>
                ))}
              </div>
              <p className="mt-3 mb-2 font-semibold">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div>
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>

            {/* Order metadata */}
            <div>
              <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
              <p className="mt-3">Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
              <p>Date: {new Date(order.date).toLocaleDateString('en-GB')}</p>
            </div>

            {/* Order total */}
            <p className="text-lg font-bold">{currency}{order.amount}</p>

            {/* Status dropdown for admins to update order state */}
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className={`p-3 rounded-lg hover:border-teal-400 font-semibold 
                ${darkMode ? 'bg-gray-700 border border-gray-600 text-white' : 'bg-white/10 border border-teal-300/40 backdrop-blur-lg text-gray-800'}`}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Orders;