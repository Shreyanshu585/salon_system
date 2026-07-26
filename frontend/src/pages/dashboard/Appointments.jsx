/**
 * Appointments Page
 * Manage appointments and bookings
 */

import React, { useState } from 'react';
import { FiFilter, FiSearch, FiPlus, FiChevronDown } from 'react-icons/fi';
import { Card, Button, Input, Select, Badge } from '@components/ui';
import DashboardSidebar from '@components/dashboard/DashboardSidebar';
import RecentBookingsTable from '@components/dashboard/RecentBookingsTable';

const Appointments = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 flex">
      {/* Sidebar */}
      <DashboardSidebar open={sidebarOpen} onToggle={setSidebarOpen} />

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Header */}
        <div className="bg-white dark:bg-secondary-800 border-b border-secondary-200 dark:border-secondary-700 sticky top-0 z-40">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-secondary-900 dark:text-secondary-100">
                  Appointments
                </h1>
                <p className="text-secondary-600 dark:text-secondary-400 mt-1">
                  Manage all your salon appointments
                </p>
              </div>
              <Button variant="primary" className="flex items-center gap-2">
                <FiPlus size={20} />
                New Appointment
              </Button>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Search by client name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={FiSearch}
              />
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                options={[
                  { value: 'all', label: 'All Status' },
                  { value: 'confirmed', label: 'Confirmed' },
                  { value: 'pending', label: 'Pending' },
                  { value: 'completed', label: 'Completed' },
                  { value: 'cancelled', label: 'Cancelled' },
                ]}
              />
              <Select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                options={[
                  { value: 'all', label: 'All Dates' },
                  { value: 'today', label: 'Today' },
                  { value: 'tomorrow', label: 'Tomorrow' },
                  { value: 'week', label: 'This Week' },
                  { value: 'month', label: 'This Month' },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <RecentBookingsTable />
        </div>
      </main>
    </div>
  );
};

export default Appointments;
