/**
 * Quick Actions Section
 * Quick action buttons
 */

import React from 'react';
import { FiPlus, FiCalendar, FiUserPlus, FiPhone } from 'react-icons/fi';
import { Button } from '@components/ui';

const QuickActionsSection = () => {
  const actions = [
    {
      icon: FiPlus,
      label: 'New Booking',
      color: 'primary',
      action: () => console.log('New Booking'),
    },
    {
      icon: FiCalendar,
      label: 'View Schedule',
      color: 'secondary',
      action: () => console.log('View Schedule'),
    },
    {
      icon: FiUserPlus,
      label: 'Add Client',
      color: 'success',
      action: () => console.log('Add Client'),
    },
    {
      icon: FiPhone,
      label: 'Contact Support',
      color: 'warning',
      action: () => console.log('Contact Support'),
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <Button
            key={index}
            variant={action.color}
            className="flex items-center justify-center gap-2 h-14 text-sm font-medium"
            onClick={action.action}
          >
            <Icon size={18} />
            <span className="hidden sm:inline">{action.label}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default QuickActionsSection;
