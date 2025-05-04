import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { backendUrl, currency } from '../App';

/**
 * Dashboard component displays admin metrics:
 * Products, Orders, Revenue, and Customers.
 */
const Dashboard = ({ token, darkMode }) => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
    customers: 0,
  });

  /**
   * Fetch product count from the backend.
   */
  const fetchProductCount = async () => {
    const res = await axios.get(`${backendUrl}/api/product/list`);
    if (res.data.success) return res.data.products.length;
    return 0;
  };

  /**
   * Fetch order-related metrics: count, revenue, and customer uniqueness.
   */
  const fetchOrderStats = async () => {
    const res = await axios.post(
      `${backendUrl}/api/order/list`,
      {},
      { headers: { token } }
    );

    if (!res.data.success) return { count: 0, revenue: 0, customers: 0 };

    const orders = res.data.orders || [];
    const revenue = orders.reduce((sum, order) => sum + order.amount, 0);

    // Use either email or phone for customer uniqueness
    const unique = new Set(orders.map((o) => o.address?.email || o.address?.phone));

    return {
      count: orders.length,
      revenue,
      customers: unique.size,
    };
  };

  /**
   * Combined function to populate all dashboard metrics.
   */
  const populateDashboard = useCallback(async () => {
    try {
      const [productCount, orderStats] = await Promise.all([
        fetchProductCount(),
        fetchOrderStats(),
      ]);

      setStats({
        products: productCount,
        orders: orderStats.count,
        revenue: orderStats.revenue,
        customers: orderStats.customers,
      });
    } catch (err) {
      console.error('Dashboard load error:', err);
      toast.error('Unable to load dashboard data');
    }
  }, [token]);

  useEffect(() => {
    populateDashboard();
  }, [populateDashboard]);

  /**
   * Generates data array for the chart component.
   */
  const chartData = [
    { name: 'Products', value: stats.products },
    { name: 'Orders', value: stats.orders },
    { name: 'Revenue', value: stats.revenue },
    { name: 'Customers', value: stats.customers },
  ];

  /**
   * Data for the top cards on the dashboard.
   */
  const cards = [
    { label: 'Products', value: stats.products },
    { label: 'Orders', value: stats.orders },
    { label: 'Revenue', value: `${currency}${stats.revenue.toFixed(2)}` },
    { label: 'Customers', value: stats.customers },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="p-6 flex flex-col gap-10"
    >
      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className={`p-5 rounded-xl shadow-md text-center ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
            }`}
          >
            <h4 className="text-md font-semibold mb-2">{card.label}</h4>
            <p className="text-2xl font-bold">{card.value}</p>
          </motion.div>
        ))}
      </section>

      {/* Bar Chart */}
      <section
        className={`rounded-xl shadow-md p-6 ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white'
        }`}
      >
        <h3
          className={`text-lg font-semibold mb-4 ${
            darkMode ? 'text-teal-300' : 'text-teal-600'
          }`}
        >
          Overview
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke={darkMode ? '#ccc' : '#000'} />
            <YAxis stroke={darkMode ? '#ccc' : '#000'} allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#14b8a6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </motion.div>
  );
};

export default Dashboard;