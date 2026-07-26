import React from 'react';
import clsx from 'clsx';

/**
 * Loader Component
 * Loading spinner with optional text
 *
 * @component
 * @example
 * <Loader />
 * <Loader size="lg" text="Loading..." />
 *
 * @param {Object} props - Component props
 * @param {string} props.size - Loader size: sm, md, lg
 * @param {string} props.text - Loading text
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement} Loader element
 */
const Loader = ({
  size = 'md',
  text,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className={clsx('flex flex-col items-center justify-center gap-3', className)}>
      <div
        className={clsx(
          'animate-spin rounded-full border-primary-300 border-t-primary-600 dark:border-secondary-700 dark:border-t-primary-400',
          sizeClasses[size]
        )}
      />
      {text && <p className="text-secondary-600 dark:text-secondary-400 text-sm">{text}</p>}
    </div>
  );
};

export default Loader;
