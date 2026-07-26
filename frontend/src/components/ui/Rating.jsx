import React from 'react';
import { FiStar } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import clsx from 'clsx';

/**
 * Rating Component
 * Reusable star rating component
 *
 * @component
 * @example
 * <Rating value={4} onChange={setRating} />
 * <Rating value={3.5} readOnly size="lg" />
 *
 * @param {Object} props - Component props
 * @param {number} props.value - Current rating (0-5)
 * @param {Function} props.onChange - Change handler
 * @param {number} props.maxStars - Maximum stars (default: 5)
 * @param {boolean} props.readOnly - Disable interaction
 * @param {string} props.size - Star size: sm, md, lg
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement} Rating component
 */
const Rating = ({
  value = 0,
  onChange,
  maxStars = 5,
  readOnly = false,
  size = 'md',
  className = '',
}) => {
  const [hoverValue, setHoverValue] = React.useState(0);

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const handleClick = (index) => {
    if (!readOnly && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div
      className={clsx('flex items-center gap-1', sizeClasses[size], className)}
      onMouseLeave={() => setHoverValue(0)}
    >
      {[...Array(maxStars)].map((_, index) => {
        const displayValue = hoverValue || value;
        const isFilled = index < Math.floor(displayValue);
        const isHalf = index === Math.floor(displayValue) && displayValue % 1 !== 0;

        return (
          <button
            key={index}
            onClick={() => handleClick(index)}
            onMouseEnter={() => !readOnly && setHoverValue(index + 1)}
            disabled={readOnly}
            className={clsx(
              'transition-colors duration-200',
              !readOnly && 'cursor-pointer hover:text-warning-400',
              readOnly && 'cursor-default'
            )}
          >
            {isFilled || isHalf ? (
              <FaStar className="text-warning-500" />
            ) : (
              <FiStar className="text-secondary-400 dark:text-secondary-500" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Rating;
