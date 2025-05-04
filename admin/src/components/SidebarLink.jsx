import React from 'react';
import { NavLink } from 'react-router-dom';


const SidebarLink = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-l-lg transition-all border-l-4 ${
          isActive
            ? 'border-black bg-gray-100 dark:bg-neutral-800 dark:border-white'
            : 'border-transparent hover:bg-gray-100 dark:hover:bg-neutral-800'
        }`
      }
    >
      <img src={icon} alt={`${label} icon`} className="w-5 h-5" />
      <span className="text-sm text-gray-800 dark:text-white hidden md:inline">{label}</span>
    </NavLink>
  );
};

export default SidebarLink;