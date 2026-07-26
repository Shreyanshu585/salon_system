import React from 'react';
import clsx from 'clsx';

/**
 * Pagination Component
 * Reusable pagination component
 *
 * @component
 * @example
 * <Pagination current={1} total={10} onChange={handlePageChange} />
 *
 * @param {Object} props - Component props
 * @param {number} props.current - Current page
 * @param {number} props.total - Total pages
 * @param {Function} props.onChange - Page change handler
 * @param {number} props.maxButtons - Max visible buttons (default: 5)
 * @returns {React.ReactElement} Pagination component
 */
const Pagination = ({
  current = 1,
  total = 1,
  onChange,
  maxButtons = 5,
  className = '',
}) => {
  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, current - Math.floor(maxButtons / 2));
    let end = Math.min(total, start + maxButtons - 1);

    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < total) {
      if (end < total - 1) pages.push('...');
      pages.push(total);
    }

    return pages;
  };

  const handlePrevious = () => {
    if (current > 1) onChange(current - 1);
  };

  const handleNext = () => {
    if (current < total) onChange(current + 1);
  };

  const pageNumbers = getPageNumbers();

  return (
    <div
      className={clsx(
        'flex items-center justify-center gap-2',
        className
      )}
    >
      <button
        onClick={handlePrevious}
        disabled={current === 1}
        className="px-3 py-2 rounded-lg border border-secondary-300 dark:border-secondary-600 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>

      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-2 py-2 text-secondary-500">...</span>
            ) : (
              <button
                onClick={() => onChange(page)}
                className={clsx(
                  'px-3 py-2 rounded-lg transition-colors',
                  current === page
                    ? 'bg-primary-600 text-white'
                    : 'border border-secondary-300 dark:border-secondary-600 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700'
                )}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={current === total}
        className="px-3 py-2 rounded-lg border border-secondary-300 dark:border-secondary-600 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
