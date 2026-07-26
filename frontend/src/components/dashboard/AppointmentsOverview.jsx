/**
 * Appointments Overview
 * Shows appointments status
 */

import React, { useState } from 'react';
import { FiCalendar, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { Card, Button } from '@components/ui';

const AppointmentsOverview = () => {
  const [appointments] = useState([
    { status: 'Today', count: 5, icon: FiCalendar, color: 'primary' },
    { status: 'Pending', count: 3, icon: FiClock, color: 'warning' },
    { status: 'Completed', count: 28, icon: FiCheckCircle, color: 'success' },
    { status: 'Cancelled', count: 2, icon: FiXCircle, color: 'error' },
  ]);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-6">
        Appointments Status
      </h3>

      <div className="space-y-4">
        {appointments.map((apt, index) => {
          const Icon = apt.icon;
          const colorClasses = {
            primary: 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400',
            success: 'bg-success-50 dark:bg-success-900/20 text-success-600 dark:text-success-400',
            warning: 'bg-warning-50 dark:bg-warning-900/20 text-warning-600 dark:text-warning-400',
            error: 'bg-error-50 dark:bg-error-900/20 text-error-600 dark:text-error-400',
          };

          return (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary-50 dark:bg-secondary-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${colorClasses[apt.color]}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    {apt.status}
                  </p>
                  <p className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
                    {apt.count}
                  </p>
                </div>
              </div>
              <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm transition-colors">
                View →
              </button>
            </div>
          );
        })}
      </div>

      {/* Action Button */}
      <Button variant="primary" fullWidth className="mt-6">
        Schedule New Appointment
      </Button>
    </Card>
  );
};

export default AppointmentsOverview;
