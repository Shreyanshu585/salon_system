import React from 'react';
import clsx from 'clsx';

/**
 * EmptyState Component
 * Display when no data is available
 *
 * @component
 * @example
 * <EmptyState
 *   icon={<FiInbox />}
 *   title="No Results"
 *   message="Try adjusting your filters"
 *   action={<Button>Clear Filters</Button>}
 * />
 *
 * @param {Object} props - Component props
 * @param {React.ReactElement} props.icon - Empty state icon
 * @param {string} props.title - Title text
 * @param {string} props.message - Message text
 * @param {React.ReactElement} props.action - Action button/element
 * @returns {React.ReactElement} Empty state component
 */
const EmptyState = ({
  icon,
  title = 'No Data',
  message = 'There is nothing here yet.',
  action,
  className = '',
}) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center py-12 px-4',
        className
      )}
    >
      {icon && (
        <div className="mb-4 text-secondary-300 dark:text-secondary-600 text-5xl">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
        {title}
      </h3>
      <p className="text-secondary-600 dark:text-secondary-400 mb-6 text-center max-w-sm">
        {message}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
