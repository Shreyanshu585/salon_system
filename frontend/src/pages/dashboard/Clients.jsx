/**
 * Clients Page
 * Manage salon clients
 */

import React, { useState } from 'react';
import { FiSearch, FiPlus, FiMail, FiPhone, FiMoreVertical, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Card, Button, Input, Badge } from '@components/ui';
import DashboardSidebar from '@components/dashboard/DashboardSidebar';

const Clients = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [clients] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+1 (555) 123-4567',
      visits: 15,
      totalSpent: '$450',
      lastVisit: '2026-07-20',
      status: 'active',
    },
    {
      id: 2,
      name: 'Emma Davis',
      email: 'emma@example.com',
      phone: '+1 (555) 234-5678',
      visits: 8,
      totalSpent: '$280',
      lastVisit: '2026-07-18',
      status: 'active',
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael@example.com',
      phone: '+1 (555) 345-6789',
      visits: 3,
      totalSpent: '$75',
      lastVisit: '2026-07-15',
      status: 'inactive',
    },
    {
      id: 4,
      name: 'Jessica Wilson',
      email: 'jessica@example.com',
      phone: '+1 (555) 456-7890',
      visits: 20,
      totalSpent: '$650',
      lastVisit: '2026-07-26',
      status: 'active',
    },
    {
      id: 5,
      name: 'David Martinez',
      email: 'david@example.com',
      phone: '+1 (555) 567-8901',
      visits: 5,
      totalSpent: '$125',
      lastVisit: '2026-07-12',
      status: 'inactive',
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      email: 'lisa@example.com',
      phone: '+1 (555) 678-9012',
      visits: 12,
      totalSpent: '$380',
      lastVisit: '2026-07-22',
      status: 'active',
    },
  ]);

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
                  Clients
                </h1>
                <p className="text-secondary-600 dark:text-secondary-400 mt-1">
                  Manage your salon clients
                </p>
              </div>
              <Button variant="primary" className="flex items-center gap-2">
                <FiPlus size={20} />
                Add Client
              </Button>
            </div>

            {/* Search */}
            <Input
              placeholder="Search clients by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={FiSearch}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary-200 dark:border-secondary-700">
                  <th className="text-left py-3 px-4 font-semibold text-secondary-700 dark:text-secondary-300">
                    Client Name
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-secondary-700 dark:text-secondary-300">
                    Contact
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-secondary-700 dark:text-secondary-300">
                    Visits
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-secondary-700 dark:text-secondary-300">
                    Total Spent
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-secondary-700 dark:text-secondary-300">
                    Last Visit
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-secondary-700 dark:text-secondary-300">
                    Status
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-secondary-700 dark:text-secondary-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr
                    key={client.id}
                    className="border-b border-secondary-100 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-700/50 transition-colors"
                  >
                    <td className="py-4 px-4 font-medium text-secondary-900 dark:text-secondary-100">
                      {client.name}
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <a
                          href={`mailto:${client.email}`}
                          className="flex items-center gap-2 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                        >
                          <FiMail size={14} />
                          {client.email}
                        </a>
                        <a
                          href={`tel:${client.phone}`}
                          className="flex items-center gap-2 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
                        >
                          <FiPhone size={14} />
                          {client.phone}
                        </a>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-secondary-900 dark:text-secondary-100 font-medium">
                      {client.visits}
                    </td>
                    <td className="py-4 px-4 text-secondary-900 dark:text-secondary-100 font-medium">
                      {client.totalSpent}
                    </td>
                    <td className="py-4 px-4 text-secondary-600 dark:text-secondary-400 text-sm">
                      {client.lastVisit}
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={client.status === 'active' ? 'success' : 'secondary'}>
                        {client.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
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
        </div>
      </main>
    </div>
  );
};

export default Clients;
