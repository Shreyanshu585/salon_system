import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * ProtectedRoute Component
 *
 * Wrapper component that protects routes by requiring authentication.
 * If user is not authenticated, redirects to login page.
 *
 * @component
 * @example
 * <ProtectedRoute>
 *   <CustomerHome />
 * </ProtectedRoute>
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child component to render if authenticated
 * @returns {React.ReactNode} - Either the protected component or redirect to login
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex-center min-h-screen bg-white dark:bg-secondary-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-secondary-600 dark:text-secondary-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render protected component if authenticated
  return children;
};

export default ProtectedRoute;
