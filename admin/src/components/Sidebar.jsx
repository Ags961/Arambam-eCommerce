import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import SidebarLink from './SidebarLink';

// Centralised config for sidebar routes
const menuItems = [
  {
    label: 'Dashboard',
    to: '/',
    icon: assets.dashboard_icon || assets.order_icon,
  },
  {
    label: 'Add Items',
    to: '/add',
    icon: assets.add_icon,
  },
  {
    label: 'List Items',
    to: '/list',
    icon: assets.order_icon,
  },
  {
    label: 'Orders',
    to: '/orders',
    icon: assets.order_icon,
  },
];

const Sidebar = () => {
  return (
    <aside className="w-[17%] min-h-screen border-r-2 bg-white dark:bg-neutral-900 transition-all">
      <nav className="flex flex-col gap-4 pt-6 px-4">
        {menuItems.map((item, idx) => (
          <SidebarLink key={idx} to={item.to} icon={item.icon} label={item.label} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;