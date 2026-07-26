import React from 'react';
import clsx from 'clsx';

/**
 * Card Component
 * Reusable card container with optional hover effects
 *
 * @component
 * @example
 * <Card hover>
 *   <Card.Header title="Card Title" />
 *   <Card.Body>Card content</Card.Body>
 *   <Card.Footer>Footer content</Card.Footer>
 * </Card>
 *
 * @param {Object} props - Component props
 * @param {boolean} props.hover - Enable hover effect
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Card content
 * @returns {React.ReactElement} Card element
 */
const Card = ({ hover = false, className = '', children, ...props }) => {
  return (
    <div
      className={clsx(
        'bg-white dark:bg-secondary-800 rounded-lg shadow-md p-6',
        'transition-all duration-200',
        hover && 'hover:shadow-lg hover:scale-105 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Header = ({ title, subtitle, className = '' }) => (
  <div className={clsx('mb-4 pb-4 border-b border-secondary-200 dark:border-secondary-700', className)}>
    {title && <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">{title}</h3>}
    {subtitle && <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-1">{subtitle}</p>}
  </div>
);

Card.Body = ({ children, className = '' }) => (
  <div className={clsx('mb-4', className)}>
    {children}
  </div>
);

Card.Footer = ({ children, className = '' }) => (
  <div className={clsx('pt-4 border-t border-secondary-200 dark:border-secondary-700', className)}>
    {children}
  </div>
);

export default Card;
