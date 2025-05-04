import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages & Components
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import AuthenticatedLayout from './components/AuthenticatedLayout';

// Global Constants
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '£';

/**
 * Root App component - handles routing and authentication logic.
 */
const App = () => {
  // Store token in localStorage to persist login
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [darkMode, setDarkMode] = useState(false); // Theme toggle

  // Keep token in localStorage synced
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'
      }`}
    >
      <ToastContainer />

      {token ? (
        <AuthenticatedLayout token={token} setToken={setToken} darkMode={darkMode} setDarkMode={setDarkMode}>
          <Routes>
            <Route path="/" element={<Dashboard token={token} darkMode={darkMode} />} />
            <Route path="/add" element={<Add token={token} darkMode={darkMode} />} />
            <Route path="/list" element={<List token={token} darkMode={darkMode} />} />
            <Route path="/orders" element={<Orders token={token} darkMode={darkMode} />} />
          </Routes>
        </AuthenticatedLayout>
      ) : (
        <Login setToken={setToken} />
      )}
    </div>
  );
};

export default App;