/**
 * Dashboard Page
 * Main dashboard with overview and quick stats
 */

import React, { useState, useEffect } from 'react';
import { FiCalendar, FiUsers, FiShoppingCart, FiTrendingUp, FiMoreVertical } from 'react-icons/fi';
import { Card, Button, Badge, Loader } from '@components/ui';
import DashboardSidebar from '@components/dashboard/DashboardSidebar';
import StatCard from '@components/dashboard/StatCard';
import RecentBookingsTable from '@components/dashboard/RecentBookingsTable';
import AppointmentsOverview from '@components/dashboard/AppointmentsOverview';
import QuickActionsSection from '@components/dashboard/QuickActionsSection';
import useAuth from '@hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock data - Replace with API calls
  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalAppointments: 45,
        totalClients: 128,
        totalRevenue: 12500,
        appointmentsThisMonth: 18,
        appointmentsTrend: 12,
        clientsTrend: 8,
        revenueTrend: 15,
      });
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 flex items-center justify-center">
        <Loader size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 flex">
      {/* Sidebar */}
      <DashboardSidebar open={sidebarOpen} onToggle={setSidebarOpen} />

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Header */}
        <div className="bg-white dark:bg-secondary-800 border-b border-secondary-200 dark:border-secondary-700 sticky top-0 z-40">
          <div className="px-8 py-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100">
                Welcome back, {user?.firstName}! 👋
              </h1>
              <p className="text-secondary-600 dark:text-secondary-400 mt-1">
                Here's what's happening in your salon today
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="secondary" size="sm">
                Today
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Quick Actions */}
          <QuickActionsSection />

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={FiCalendar}
              label="Total Appointments"
              value={stats.totalAppointments}
              trend={stats.appointmentsTrend}
              trendType="up"
              color="primary"
            />
            <StatCard
              icon={FiUsers}
              label="Total Clients"
              value={stats.totalClients}
              trend={stats.clientsTrend}
              trendType="up"
              color="secondary"
            />
            <StatCard
              icon={FiShoppingCart}
              label="Total Revenue"
              value={`$${stats.totalRevenue}`}
              trend={stats.revenueTrend}
              trendType="up"
              color="success"
            />
            <StatCard
              icon={FiTrendingUp}
              label="This Month"
              value={stats.appointmentsThisMonth}
              trend={5}
              trendType="up"
              color="warning"
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Recent Bookings - 2 columns */}
            <div className="lg:col-span-2">
              <RecentBookingsTable />
            </div>

            {/* Appointments Overview */}
            <div>
              <AppointmentsOverview />
            </div>
          </div>

          {/* Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Revenue Chart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                  Revenue Trend
                </h3>
                <button className="text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300">
                  <FiMoreVertical size={20} />
                </button>
              </div>
              <div className="h-64 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/10 rounded-lg flex items-center justify-center">
                <p className="text-secondary-500 dark:text-secondary-400">Chart - Replace with Charts.js</p>
              </div>
            </Card>

            {/* Services Performance */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                  Top Services
                </h3>
                <button className="text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300">
                  <FiMoreVertical size={20} />
                </button>
              </div>
              <div className="space-y-4">
                {['Hair Cutting', 'Coloring', 'Styling', 'Treatment', 'Extensions'].map((service, index) => (
                  <div key={index} className="flex items-center justify-between pb-4 border-b border-secondary-200 dark:border-secondary-700 last:border-0 last:pb-0">
                    <span className="text-secondary-700 dark:text-secondary-300 font-medium">{service}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-secondary-200 dark:bg-secondary-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
                          style={{ width: `${Math.random() * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-secondary-500 dark:text-secondary-400 w-8 text-right">
                        {Math.floor(Math.random() * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
