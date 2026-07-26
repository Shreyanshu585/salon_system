import React from 'react';
import clsx from 'clsx';

/**
 * Skeleton Component
 * Loading skeleton for content placeholders
 *
 * @component
 * @example
 * <Skeleton width="100%" height="200px" />
 * <Skeleton variant="circle" width="48px" height="48px" />
 *
 * @param {Object} props - Component props
 * @param {string} props.variant - Shape: rect, circle, text
 * @param {string} props.width - Width (default: 100%)
 * @param {string} props.height - Height (default: 16px for text)
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement} Skeleton element
 */
const Skeleton = ({
  variant = 'rect',
  width = '100%',
  height = '16px',
  className = '',
}) => {
  const variantClasses = {
    rect: 'rounded-lg',
    circle: 'rounded-full',
    text: 'rounded',
  };

  return (
    <div
      className={clsx(
        'animate-skeleton bg-secondary-200 dark:bg-secondary-700',
        variantClasses[variant],
        className
      )}
      style={{ width, height }}
    />
  );
};

export default Skeleton;
