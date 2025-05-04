import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

// ✅ Login Page - Handles both login and signup with form validation
const Login = () => {
  const [currentState, setCurrentState] = useState('Login'); // Toggle between 'Login' and 'Sign Up'

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  // ✅ Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ✅ Handle form submission for login/signup
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success("Sign up successful!");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success("Login successful!");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // ✅ If user is already authenticated, redirect to home
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-20 gap-6 text-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >

      {/* ✅ Heading with underline */}
      <div className="inline-flex items-center gap-2 mb-2">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[2px] w-8 bg-teal-400" />
      </div>

      {/* ✅ Name field only for Sign Up */}
      {currentState === 'Sign Up' && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg placeholder-gray-300 outline-none"
          placeholder="Name"
          required
        />
      )}

      {/* ✅ Email field */}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg placeholder-gray-300 outline-none"
        placeholder="Email"
        required
      />

      {/* ✅ Password field */}
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg placeholder-gray-300 outline-none"
        placeholder="Password"
        required
      />

      {/* ✅ Auth utility links */}
      <div className="w-full flex justify-between text-xs text-gray-300 mt-[-8px]">
        <p className="cursor-pointer hover:underline">Forgot password?</p>
        <p
          onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
          className="cursor-pointer hover:underline"
        >
          {currentState === 'Login' ? 'Create account' : 'Login here'}
        </p>
      </div>

      {/* ✅ Auth Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        type="submit"
        className="w-full bg-teal-400 hover:bg-teal-500 text-white font-semibold py-3 rounded-full transition-all"
      >
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </motion.button>

    </motion.form>
  );
};

export default Login;