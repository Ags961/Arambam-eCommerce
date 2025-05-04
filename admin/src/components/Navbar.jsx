import React from 'react';
import { assets } from '../assets/assets';

// Utility function to toggle theme label
const getModeLabel = (darkMode) => (darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode');

const Navbar = ({ setToken, darkMode, setDarkMode }) => {

  // Handle logout logic (can be extended for backend session invalidation)
  const handleLogout = () => {
    setToken(''); // Clear token to log out
  };

  // Handle theme toggle
  const handleThemeToggle = () => {
    setDarkMode((prev) => !prev); // Flip the boolean value
  };

  return (
    <header className="w-full px-6 py-3 flex justify-between items-center bg-white shadow-sm dark:bg-neutral-900 transition-all duration-300">
      
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <img
          src={assets.logo}
          alt="Brand Logo"
          className="h-10 sm:h-12 object-contain"
        />
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white hidden sm:block">
          Aarambam Admin
        </h1>
      </div>

      {/* Action Buttons */}
      <nav className="flex items-center gap-3 sm:gap-5">
        {/* Theme Toggle Button */}
        <ThemeToggleButton
          darkMode={darkMode}
          onClick={handleThemeToggle}
        />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm transition-colors duration-200"
        >
          Logout
        </button>
      </nav>
    </header>
  );
};

// Separate component for theme toggle button for clarity
const ThemeToggleButton = ({ darkMode, onClick }) => {
  const label = getModeLabel(darkMode);

  return (
    <button
      onClick={onClick}
      className={`${
        darkMode ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-gray-800 hover:bg-black'
      } text-white px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm transition-all duration-200`}
    >
      {label}
    </button>
  );
};

export default Navbar;