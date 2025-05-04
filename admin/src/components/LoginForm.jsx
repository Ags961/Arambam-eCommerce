import React from 'react';
import InputField from './InputField';

const LoginForm = ({ email, setEmail, password, setPassword, onSubmit }) => {
  return (
    <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>
      <form onSubmit={onSubmit}>
        <InputField
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@example.com"
        />

        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <button
          type="submit"
          className="w-full mt-4 bg-black text-white py-2 rounded-md hover:bg-opacity-90 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;