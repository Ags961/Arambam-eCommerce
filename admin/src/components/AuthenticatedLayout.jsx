import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

/**
 * Layout wrapper for authenticated admin pages.
 */
const AuthenticatedLayout = ({ token, setToken, darkMode, setDarkMode, children }) => {
  return (
    <>
      <Navbar setToken={setToken} darkMode={darkMode} setDarkMode={setDarkMode} />
      <hr />
      <main className="flex w-full">
        <Sidebar darkMode={darkMode} />
        <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8">
          {children}
        </div>
      </main>
    </>
  );
};

export default AuthenticatedLayout;