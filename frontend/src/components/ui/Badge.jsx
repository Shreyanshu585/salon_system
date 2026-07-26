import React from 'react';
import clsx from 'clsx';

/**
 * Badge Component
 * Reusable badge/tag component
 *
 * @component
 * @example
 * <Badge variant="primary">New</Badge>
 * <Badge variant="success" size="sm">Verified</Badge>
 *
 * @param {Object} props - Component props
 * @param {string} props.variant - Badge style: primary, success, warning, error, secondary
 * @param {string} props.size - Badge size: sm, md, lg
 * @param {React.ReactNode} props.children - Badge content
 * @returns {React.ReactElement} Badge element
 */
const Badge = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
}) => {
  const variantClasses = {
    primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400',
    success: 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-400',
    warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-400',
    error: 'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-400',
    secondary: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-700 dark:text-secondary-200',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
