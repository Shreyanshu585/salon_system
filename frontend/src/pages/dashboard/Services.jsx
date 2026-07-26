/**
 * Services Page
 * Manage salon services
 */

import React, { useState } from 'react';
import { FiFilter, FiSearch, FiPlus, FiEdit2, FiTrash2, FiMoreVertical } from 'react-icons/fi';
import { Card, Button, Input, Badge } from '@components/ui';
import DashboardSidebar from '@components/dashboard/DashboardSidebar';

const Services = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [services] = useState([
    {
      id: 1,
      name: 'Hair Cut',
      category: 'Hair',
      price: '$30',
      duration: '30 min',
      availability: true,
    },
    {
      id: 2,
      name: 'Hair Coloring',
      category: 'Hair',
      price: '$65',
      duration: '90 min',
      availability: true,
    },
    {
      id: 3,
      name: 'Styling',
      category: 'Hair',
      price: '$45',
      duration: '45 min',
      availability: true,
    },
    {
      id: 4,
      name: 'Hair Treatment',
      category: 'Treatment',
      price: '$75',
      duration: '60 min',
      availability: true,
    },
    {
      id: 5,
      name: 'Beard Trim',
      category: 'Men',
      price: '$25',
      duration: '20 min',
      availability: true,
    },
    {
      id: 6,
      name: 'Extensions',
      category: 'Hair',
      price: '$150',
      duration: '120 min',
      availability: false,
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
                  Services
                </h1>
                <p className="text-secondary-600 dark:text-secondary-400 mt-1">
                  Manage your salon services
                </p>
              </div>
              <Button variant="primary" className="flex items-center gap-2">
                <FiPlus size={20} />
                Add Service
              </Button>
            </div>

            {/* Search */}
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={FiSearch}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">
                      {service.name}
                    </h3>
                    <Badge variant="secondary" className="mt-2">
                      {service.category}
                    </Badge>
                  </div>
                  <button className="text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300">
                    <FiMoreVertical size={20} />
                  </button>
                </div>

                <div className="space-y-3 mb-4 pb-4 border-b border-secondary-200 dark:border-secondary-700">
                  <div className="flex items-center justify-between">
                    <span className="text-secondary-600 dark:text-secondary-400 text-sm">Price</span>
                    <span className="font-semibold text-secondary-900 dark:text-secondary-100">
                      {service.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-secondary-600 dark:text-secondary-400 text-sm">Duration</span>
                    <span className="font-semibold text-secondary-900 dark:text-secondary-100">
                      {service.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-secondary-600 dark:text-secondary-400 text-sm">Availability</span>
                    <Badge variant={service.availability ? 'success' : 'error'}>
                      {service.availability ? 'Available' : 'Unavailable'}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="secondary" fullWidth size="sm" className="flex items-center justify-center gap-2">
                    <FiEdit2 size={16} />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center justify-center gap-2">
                    <FiTrash2 size={16} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Services;
