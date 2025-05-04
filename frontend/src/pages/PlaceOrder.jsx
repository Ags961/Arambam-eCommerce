import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [submitting, setSubmitting] = useState(false);

  const {
    navigate, backendUrl, token,
    cartItems, setCartItems,
    getCartAmount, delivery_fee
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    street: '', city: '', county: '', postcode: '',
    country: 'United Kingdom', phone: ''
  });

  const onChangeHandler = async (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'postcode' && value.length >= 5 && formData.country === 'United Kingdom') {
      try {
        const res = await axios.get(`https://api.postcodes.io/postcodes/${value}`);
        if (res.data.status === 200) {
          const { admin_district, region } = res.data.result;
          setFormData(prev => ({
            ...prev,
            city: admin_district || '',
            county: region || ''
          }));
        }
      } catch (err) {
        toast.warn('Invalid UK postcode entered.');
      }
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (submitting) return;

    try {
      setSubmitting(true);

      const orderItems = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          const qty = cartItems[productId][size];
          if (qty > 0) orderItems.push({ _id: productId, size, quantity: qty });
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      const config = { headers: { token } };

      if (method === 'cod') {
        const res = await axios.post(`${backendUrl}/api/order/place`, orderData, config);
        if (res.data.success) {
          toast.success('Order placed successfully!');
          setCartItems({});
          navigate('/orders');
        } else {
          toast.error(res.data.message);
        }
      }

      if (method === 'stripe') {
        const res = await axios.post(`${backendUrl}/api/order/stripe`, orderData, config);
        if (res.data.success && res.data.session_url) {
          window.location.replace(res.data.session_url);
        } else {
          toast.error(res.data.message || 'Stripe checkout failed.');
        }
      }

    } catch (err) {
      if (err.response?.status === 401) {
        toast.warn("⚠️ Please log in before completing your purchase.");
        navigate('/login'); // Optional: redirect to login
      } else {
        toast.error(err.response?.data?.message || err.message || "An error occurred.");
      }
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">

      {/* 🚚 Delivery Info */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex gap-3">
          <input required name="firstName" value={formData.firstName} onChange={onChangeHandler} className="input" placeholder="First name" />
          <input required name="lastName" value={formData.lastName} onChange={onChangeHandler} className="input" placeholder="Last name" />
        </div>
        <input required name="email" value={formData.email} onChange={onChangeHandler} className="input" type="email" placeholder="Email address" />
        <input required name="street" value={formData.street} onChange={onChangeHandler} className="input" placeholder="Street" />
        <div className="flex gap-3">
          <input required name="city" value={formData.city} onChange={onChangeHandler} className="input" placeholder="City" />
          <input name="county" value={formData.county} onChange={onChangeHandler} className="input" placeholder="County (optional)" />
        </div>
        <div className="flex gap-3">
          <input required name="postcode" value={formData.postcode} onChange={onChangeHandler} className="input" placeholder="Postcode" />
          <input disabled name="country" value={formData.country} className="input bg-gray-100 text-gray-500" />
        </div>
        <input required name="phone" value={formData.phone} onChange={onChangeHandler} className="input" type="tel" placeholder="Phone" />
      </div>

      {/* 💳 Payment + Summary */}
      <div className="mt-8 flex-1">
        <CartTotal />

        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex gap-4 flex-col lg:flex-row mt-4">

            {/* Stripe Option */}
            <div
              onClick={() => setMethod('stripe')}
              className={`cursor-pointer flex items-center gap-3 border rounded-lg px-4 py-3 w-full lg:w-[260px] transition-all duration-300 ${method === 'stripe' ? 'border-teal-500 bg-teal-50' : 'border-gray-300'
                }`}
            >
              <div className={`w-4 h-4 border-2 rounded-full ${method === 'stripe' ? 'bg-teal-400 border-teal-500' : ''}`}></div>
              <img src={assets.stripe_logo} alt="Stripe" className="h-5" />
              <p className="text-sm font-medium ml-2">Pay with Stripe</p>
            </div>

            {/* Cash on Delivery Option */}
            <div
              onClick={() => setMethod('cod')}
              className={`cursor-pointer flex items-center gap-3 border rounded-lg px-4 py-3 w-full lg:w-[260px] transition-all duration-300 ${method === 'cod' ? 'border-teal-500 bg-teal-50' : 'border-gray-300'
                }`}
            >
              <div className={`w-4 h-4 border-2 rounded-full ${method === 'cod' ? 'bg-teal-400 border-teal-500' : ''}`}></div>
              <p className="text-sm font-medium ml-2">Cash on Delivery</p>
            </div>
          </div>

          {/* Submit */}
          <div className="w-full text-end mt-8">
            <button type="submit" disabled={submitting} className="bg-black text-white px-16 py-3 text-sm rounded-full hover:bg-gray-900 disabled:opacity-50">
              {submitting ? 'Placing Order...' : 'PLACE ORDER'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

// Reusable input style
const inputClass = 'border border-gray-300 rounded py-1.5 px-3.5 w-full';
export default PlaceOrder;