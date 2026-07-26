/**
 * Stat Card Component
 * Displays statistics with trends
 */

import React from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import { Card } from '@components/ui';

const StatCard = ({
  icon: Icon,
  label,
  value,
  trend = 0,
  trendType = 'up',
  color = 'primary',
}) => {
  const colorClasses = {
    primary: 'from-primary-500 to-primary-600',
    secondary: 'from-secondary-500 to-secondary-600',
    success: 'from-success-500 to-success-600',
    warning: 'from-warning-500 to-warning-600',
    error: 'from-error-500 to-error-600',
  };

  const trendColor = trendType === 'up' ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400';
  const TrendIcon = trendType === 'up' ? FiTrendingUp : FiTrendingDown;

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-secondary-600 dark:text-secondary-400 text-sm font-medium mb-2">
            {label}
          </p>
          <p className="text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-3">
            {value}
          </p>
          {trend !== 0 && (
            <div className={`flex items-center gap-1 ${trendColor}`}>
              <TrendIcon size={16} />
              <span className="text-sm font-semibold">{trend}%</span>
              <span className="text-xs ml-1">from last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]} shadow-lg`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
