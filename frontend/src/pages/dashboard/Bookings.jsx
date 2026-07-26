/**
 * Bookings Page
 * Manage salon bookings and calendar
 */

import React, { useState } from 'react';
import { FiSearch, FiPlus, FiCalendar, FiClock, FiMapPin } from 'react-icons/fi';
import { Card, Button, Input, Badge } from '@components/ui';
import DashboardSidebar from '@components/dashboard/DashboardSidebar';

const Bookings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-07-26');
  const [bookings] = useState([
    {
      id: 1,
      client: 'Sarah Johnson',
      service: 'Hair Cut + Color',
      date: '2026-07-26',
      time: '10:00',
      duration: '90 min',
      location: 'Station 1',
      status: 'confirmed',
      price: '$85',
    },
    {
      id: 2,
      client: 'Emma Davis',
      service: 'Styling',
      date: '2026-07-26',
      time: '14:30',
      duration: '45 min',
      location: 'Station 2',
      status: 'confirmed',
      price: '$45',
    },
    {
      id: 3,
      client: 'Michael Brown',
      service: 'Beard Trim',
      date: '2026-07-27',
      time: '11:00',
      duration: '20 min',
      location: 'Station 1',
      status: 'pending',
      price: '$25',
    },
    {
      id: 4,
      client: 'Jessica Wilson',
      service: 'Hair Treatment',
      date: '2026-07-27',
      time: '15:00',
      duration: '60 min',
      location: 'Station 3',
      status: 'confirmed',
      price: '$120',
    },
    {
      id: 5,
      client: 'David Martinez',
      service: 'Extensions',
      date: '2026-07-28',
      time: '13:00',
      duration: '120 min',
      location: 'Station 2',
      status: 'cancelled',
      price: '$150',
    },
  ]);

  const todayBookings = bookings.filter((b) => b.date === selectedDate);

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
                  Bookings Calendar
                </h1>
                <p className="text-secondary-600 dark:text-secondary-400 mt-1">
                  View and manage all bookings
                </p>
              </div>
              <Button variant="primary" className="flex items-center gap-2">
                <FiPlus size={20} />
                New Booking
              </Button>
            </div>

            {/* Search and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Search by client name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={FiSearch}
              />
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                icon={FiCalendar}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Bookings List */}
            <div className="lg:col-span-2 space-y-4">
              {todayBookings.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-secondary-500 dark:text-secondary-400">
                    No bookings for this date
                  </p>
                </Card>
              ) : (
                todayBookings.map((booking) => (
                  <Card key={booking.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                          {booking.client}
                        </h3>
                        <p className="text-secondary-600 dark:text-secondary-400 text-sm mt-1">
                          {booking.service}
                        </p>
                      </div>
                      <Badge variant={booking.status === 'confirmed' ? 'success' : booking.status === 'pending' ? 'warning' : 'error'}>
                        {booking.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-secondary-200 dark:border-secondary-700">
                      <div className="flex items-center gap-2">
                        <FiClock size={16} className="text-secondary-500" />
                        <span className="text-sm text-secondary-600 dark:text-secondary-400">
                          {booking.time} ({booking.duration})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiMapPin size={16} className="text-secondary-500" />
                        <span className="text-sm text-secondary-600 dark:text-secondary-400">
                          {booking.location}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-secondary-900 dark:text-secondary-100">
                          {booking.price}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="primary" size="sm" fullWidth>
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" fullWidth>
                        Mark Complete
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>

            {/* Stats Sidebar */}
            <div>
              <Card className="p-6 mb-6">
                <h3 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-4">
                  {selectedDate} Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-secondary-600 dark:text-secondary-400">Total Bookings</span>
                    <span className="font-semibold text-secondary-900 dark:text-secondary-100">
                      {todayBookings.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600 dark:text-secondary-400">Confirmed</span>
                    <span className="font-semibold text-success-600 dark:text-success-400">
                      {todayBookings.filter((b) => b.status === 'confirmed').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary-600 dark:text-secondary-400">Pending</span>
                    <span className="font-semibold text-warning-600 dark:text-warning-400">
                      {todayBookings.filter((b) => b.status === 'pending').length}
                    </span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-secondary-200 dark:border-secondary-700">
                    <span className="text-secondary-600 dark:text-secondary-400">Cancelled</span>
                    <span className="font-semibold text-error-600 dark:text-error-400">
                      {todayBookings.filter((b) => b.status === 'cancelled').length}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3">
                    <span className="text-secondary-600 dark:text-secondary-400">Total Revenue</span>
                    <span className="font-bold text-lg text-primary-600 dark:text-primary-400">
                      ${todayBookings
                        .filter((b) => b.status !== 'cancelled')
                        .reduce((sum, b) => sum + parseInt(b.price.replace('$', '')), 0)}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Bookings;
