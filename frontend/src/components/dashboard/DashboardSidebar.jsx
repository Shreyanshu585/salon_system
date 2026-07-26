/**
 * Dashboard Sidebar
 * Navigation sidebar for dashboard
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiCalendar,
  FiUsers,
  FiShoppingBag,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiBarChart3,
  FiBook,
} from 'react-icons/fi';
import { Button } from '@components/ui';
import useAuth from '@hooks/useAuth';

const DashboardSidebar = ({ open, onToggle }) => {
  const { handleLogout } = useAuth();

  const navItems = [
    { icon: FiHome, label: 'Dashboard', path: '/dashboard', badge: null },
    { icon: FiCalendar, label: 'Appointments', path: '/appointments', badge: '3' },
    { icon: FiUsers, label: 'Clients', path: '/clients', badge: null },
    { icon: FiShoppingBag, label: 'Services', path: '/services', badge: null },
    { icon: FiBook, label: 'Bookings', path: '/bookings', badge: null },
    { icon: FiBarChart3, label: 'Analytics', path: '/analytics', badge: null },
  ];

  const handleLogoutClick = async () => {
    await handleLogout();
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => onToggle(!open)}
        className="fixed bottom-6 right-6 z-50 lg:hidden bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg transition-colors"
      >
        {open ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => onToggle(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white dark:bg-secondary-800 border-r border-secondary-200 dark:border-secondary-700 z-40 flex flex-col transition-all duration-300 transform lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
            💇 SalonHub
          </h2>
          <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">Salon Management System</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                      isActive
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                        : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700'
                    }`
                  }
                  onClick={() => onToggle(false)}
                >
                  <Icon size={20} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-semibold text-white bg-primary-600 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-secondary-200 dark:border-secondary-700" />

          {/* Settings */}
          <div className="space-y-2">
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                    : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700'
                }`
              }
              onClick={() => onToggle(false)}
            >
              <FiSettings size={20} />
              <span>Settings</span>
            </NavLink>
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-secondary-200 dark:border-secondary-700">
          <Button
            variant="outline"
            fullWidth
            onClick={handleLogoutClick}
            className="flex items-center justify-center gap-2"
          >
            <FiLogOut size={18} />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
