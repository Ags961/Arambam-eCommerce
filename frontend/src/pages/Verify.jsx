import React, { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { motion } from 'framer-motion';

// ✅ Verify Component - Handles payment success/failure redirect from Stripe
const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  const success = searchParams.get('success');
  const canceled = searchParams.get('canceled');
  const orderId = searchParams.get('orderId');

  // 🔄 Check Stripe payment and update order
  const verifyPayment = async () => {
    try {
      if (!token) return;

      if (canceled) {
        toast.error("❌ Payment was cancelled.");
        return navigate('/cart');
      }

      if (success && orderId) {
        const response = await axios.post(
          `${backendUrl}/api/order/verifyStripe`,
          { success, orderId },
          { headers: { token } }
        );

        if (response.data.success) {
          toast.success("Payment verified!");
          setCartItems({});
          setTimeout(() => {
            navigate('/orders');
          }, 4000);
        } else {
          toast.error("⚠️ Payment verification failed.");
          navigate('/cart');
        }
      } else {
        toast.error("⚠️ Invalid payment verification link.");
        navigate('/cart');
      }

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong during verification.");
      navigate('/cart');
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center text-white">
      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* 🌀 Loader Spinner */}
        <motion.div
          className="w-12 h-12 border-4 border-t-transparent border-teal-400 rounded-full animate-spin"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 120 }}
        ></motion.div>

        <p className="text-lg font-semibold text-white/90">Verifying your payment...</p>
        <p className="text-sm text-gray-300">Please wait, this won’t take long 🚀</p>
      </motion.div>
    </div>
  );
};

export default Verify;