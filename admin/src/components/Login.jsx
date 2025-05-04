import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';
import LoginForm from './LoginForm';

const Login = ({ setToken }) => {
  // Form state for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Form submission handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });

      if (data.success) {
        setToken(data.token);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error('Login failed:', err);
      toast.error(err.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSubmit={onSubmitHandler}
      />
    </div>
  );
};

export default Login;