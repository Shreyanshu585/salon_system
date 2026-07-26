import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * RoleBasedRoute Component
 *
 * Wrapper component that restricts access based on user role.
 * Only allows access if user has one of the required roles.
 * If user lacks required role, redirects to unauthorized or home page.
 *
 * @component
 * @example
 * <RoleBasedRoute requiredRoles={['admin', 'owner']}>
 *   <AdminDashboard />
 * </RoleBasedRoute>
 *
 * @param {Object} props - Component props
 * @param {Array<string>} props.requiredRoles - Array of roles allowed to access
 * @param {React.ReactNode} props.children - Child component to render if role matches
 * @param {string} props.fallbackPath - Path to redirect if role doesn't match (default: '/')
 * @returns {React.ReactNode} - Either the component or redirect based on role
 */
const RoleBasedRoute = ({ requiredRoles, children, fallbackPath = '/' }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

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

  // Check if user role is in required roles
  const hasRequiredRole = requiredRoles.includes(user?.role);

  // Redirect if user doesn't have required role
  if (!hasRequiredRole) {
    return <Navigate to={fallbackPath} replace />;
  }

  // Render component if role matches
  return children;
};

export default RoleBasedRoute;
