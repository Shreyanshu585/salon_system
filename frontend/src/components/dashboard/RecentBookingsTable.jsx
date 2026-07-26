/**
 * Recent Bookings Table
 * Displays recent bookings
 */

import React, { useState } from 'react';
import { FiMoreVertical, FiEye, FiEdit2, FiTrash2, FiPhone, FiMail } from 'react-icons/fi';
import { Card, Badge, Button } from '@components/ui';

const RecentBookingsTable = () => {
  const [bookings] = useState([
    {
      id: 1,
      client: 'Sarah Johnson',
      service: 'Hair Cut + Color',
      date: '2026-07-26',
      time: '10:00 AM',
      status: 'confirmed',
      price: '$85',
      contact: '+1 (555) 123-4567',
    },
    {
      id: 2,
      client: 'Emma Davis',
      service: 'Styling',
      date: '2026-07-26',
      time: '2:30 PM',
      status: 'pending',
      price: '$45',
      contact: '+1 (555) 234-5678',
    },
    {
      id: 3,
      client: 'Michael Brown',
      service: 'Beard Trim',
      date: '2026-07-27',
      time: '11:00 AM',
      status: 'confirmed',
      price: '$25',
      contact: '+1 (555) 345-6789',
    },
    {
      id: 4,
      client: 'Jessica Wilson',
      service: 'Hair Treatment',
      date: '2026-07-27',
      time: '3:00 PM',
      status: 'completed',
      price: '$120',
      contact: '+1 (555) 456-7890',
    },
    {
      id: 5,
      client: 'David Martinez',
      service: 'Extensions',
      date: '2026-07-28',
      time: '1:00 PM',
      status: 'cancelled',
      price: '$150',
      contact: '+1 (555) 567-8901',
    },
  ]);

  const statusConfig = {
    confirmed: { color: 'success', label: 'Confirmed' },
    pending: { color: 'warning', label: 'Pending' },
    completed: { color: 'info', label: 'Completed' },
    cancelled: { color: 'error', label: 'Cancelled' },
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
          Recent Bookings
        </h3>
        <Button variant="primary" size="sm">
          View All
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-secondary-200 dark:border-secondary-700">
              <th className="text-left py-3 px-4 font-semibold text-secondary-700 dark:text-secondary-300">
                Client
              </th>
              <th className="text-left py-3 px-4 font-semibold text-secondary-700 dark:text-secondary-300">
                Service
              </th>
              <th className="text-left py-3 px-4 font-semibold text-secondary-700 dark:text-secondary-300">
                Date & Time
              </th>
              <th className="text-left py-3 px-4 font-semibold text-secondary-700 dark:text-secondary-300">
                Status
              </th>
              <th className="text-left py-3 px-4 font-semibold text-secondary-700 dark:text-secondary-300">
                Price
              </th>
              <th className="text-center py-3 px-4 font-semibold text-secondary-700 dark:text-secondary-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b border-secondary-100 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-700/50 transition-colors"
              >
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-secondary-100">
                      {booking.client}
                    </p>
                    <p className="text-xs text-secondary-500 dark:text-secondary-400">
                      {booking.contact}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-4 text-secondary-700 dark:text-secondary-300">
                  {booking.service}
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-secondary-900 dark:text-secondary-100">
                      {booking.date}
                    </p>
                    <p className="text-xs text-secondary-500 dark:text-secondary-400">
                      {booking.time}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <Badge
                    variant={statusConfig[booking.status].color}
                  >
                    {statusConfig[booking.status].label}
                  </Badge>
                </td>
                <td className="py-4 px-4 font-semibold text-secondary-900 dark:text-secondary-100">
                  {booking.price}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-1 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded transition-colors">
                      <FiEye size={16} className="text-secondary-600 dark:text-secondary-400" />
                    </button>
                    <button className="p-1 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded transition-colors">
                      <FiEdit2 size={16} className="text-secondary-600 dark:text-secondary-400" />
                    </button>
                    <button className="p-1 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded transition-colors">
                      <FiTrash2 size={16} className="text-error-600 dark:text-error-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default RecentBookingsTable;
