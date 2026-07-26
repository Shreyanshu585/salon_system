import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import RoleBasedRoute from './RoleBasedRoute';

// Lazy load page components for better performance
const Login = React.lazy(() => import('@pages/auth/Login'));
const Register = React.lazy(() => import('@pages/auth/Register'));
const ForgotPassword = React.lazy(() => import('@pages/auth/ForgotPassword'));
const ResetPassword = React.lazy(() => import('@pages/auth/ResetPassword'));

const Home = React.lazy(() => import('@pages/customer/Home'));
const SearchSalons = React.lazy(() => import('@pages/customer/SearchSalons'));
const SalonDetails = React.lazy(() => import('@pages/customer/SalonDetails'));
const BookingFlow = React.lazy(() => import('@pages/customer/BookingFlow'));
const BookingSuccess = React.lazy(() => import('@pages/customer/BookingSuccess'));
const BookingHistory = React.lazy(() => import('@pages/customer/BookingHistory'));
const FavoriteSalons = React.lazy(() => import('@pages/customer/FavoriteSalons'));
const CustomerProfile = React.lazy(() => import('@pages/customer/Profile'));
const CustomerNotifications = React.lazy(() => import('@pages/customer/Notifications'));

const OwnerDashboard = React.lazy(() => import('@pages/owner/Dashboard'));
const OwnerAnalytics = React.lazy(() => import('@pages/owner/Analytics'));
const Appointments = React.lazy(() => import('@pages/owner/Appointments'));
const StaffManagement = React.lazy(() => import('@pages/owner/StaffManagement'));
const ServiceManagement = React.lazy(() => import('@pages/owner/ServiceManagement'));
const Gallery = React.lazy(() => import('@pages/owner/Gallery'));
const Offers = React.lazy(() => import('@pages/owner/Offers'));
const OwnerReviews = React.lazy(() => import('@pages/owner/Reviews'));
const WorkingHours = React.lazy(() => import('@pages/owner/WorkingHours'));
const OwnerProfile = React.lazy(() => import('@pages/owner/Profile'));

const AdminDashboard = React.lazy(() => import('@pages/admin/Dashboard'));
const UserManagement = React.lazy(() => import('@pages/admin/UserManagement'));
const SalonManagement = React.lazy(() => import('@pages/admin/SalonManagement'));
const BookingManagement = React.lazy(() => import('@pages/admin/BookingManagement'));
const PaymentReports = React.lazy(() => import('@pages/admin/PaymentReports'));
const CategoryManagement = React.lazy(() => import('@pages/admin/CategoryManagement'));
const AdminNotifications = React.lazy(() => import('@pages/admin/Notifications'));
const AdminSettings = React.lazy(() => import('@pages/admin/Settings'));

const NotFound = React.lazy(() => import('@pages/errors/NotFound'));
const Unauthorized = React.lazy(() => import('@pages/errors/Unauthorized'));
const ServerError = React.lazy(() => import('@pages/errors/ServerError'));

/**
 * Loading Fallback Component
 * Shown while lazy-loaded routes are loading
 */
const LoadingFallback = () => (
  <div className="flex-center min-h-screen bg-white dark:bg-secondary-900">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-500 mx-auto mb-4"></div>
      <p className="text-secondary-600 dark:text-secondary-400">Loading page...</p>
    </div>
  </div>
);

/**
 * Main Routes Component
 * Defines all application routes with proper protection and role-based access
 *
 * Route Structure:
 * - Public Routes: Login, Register, Password Reset, Error Pages
 * - Customer Routes: Protected by authentication, role = 'customer'
 * - Owner Routes: Protected by authentication, role = 'owner'
 * - Admin Routes: Protected by authentication, role = 'admin'
 * - Catch-all: 404 Not Found
 */
const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* ============================================
              PUBLIC ROUTES - No Authentication Required
              ============================================ */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* ============================================
              ERROR ROUTES
              ============================================ */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/server-error" element={<ServerError />} />

          {/* ============================================
              CUSTOMER ROUTES - Role: 'customer'
              ============================================ */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/salons/search"
            element={
              <ProtectedRoute>
                <SearchSalons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/salons/:salonId"
            element={
              <ProtectedRoute>
                <SalonDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/:salonId"
            element={
              <ProtectedRoute>
                <BookingFlow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/success/:bookingId"
            element={
              <ProtectedRoute>
                <BookingSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <BookingHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoriteSalons />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <CustomerProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <CustomerNotifications />
              </ProtectedRoute>
            }
          />

          {/* ============================================
              SALON OWNER ROUTES - Role: 'owner'
              ============================================ */}
          <Route
            path="/owner"
            element={
              <RoleBasedRoute requiredRoles={['owner']} fallbackPath="/">
                <OwnerDashboard />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/owner/analytics"
            element={
              <RoleBasedRoute requiredRoles={['owner']} fallbackPath="/">
                <OwnerAnalytics />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/owner/appointments"
            element={
              <RoleBasedRoute requiredRoles={['owner']} fallbackPath="/">
                <Appointments />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/owner/staff"
            element={
              <RoleBasedRoute requiredRoles={['owner']} fallbackPath="/">
                <StaffManagement />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/owner/services"
            element={
              <RoleBasedRoute requiredRoles={['owner']} fallbackPath="/">
                <ServiceManagement />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/owner/gallery"
            element={
              <RoleBasedRoute requiredRoles={['owner']} fallbackPath="/">
                <Gallery />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/owner/offers"
            element={
              <RoleBasedRoute requiredRoles={['owner']} fallbackPath="/">
                <Offers />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/owner/reviews"
            element={
              <RoleBasedRoute requiredRoles={['owner']} fallbackPath="/">
                <OwnerReviews />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/owner/working-hours"
            element={
              <RoleBasedRoute requiredRoles={['owner']} fallbackPath="/">
                <WorkingHours />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/owner/profile"
            element={
              <RoleBasedRoute requiredRoles={['owner']} fallbackPath="/">
                <OwnerProfile />
              </RoleBasedRoute>
            }
          />

          {/* ============================================
              ADMIN ROUTES - Role: 'admin'
              ============================================ */}
          <Route
            path="/admin"
            element={
              <RoleBasedRoute requiredRoles={['admin']} fallbackPath="/">
                <AdminDashboard />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <RoleBasedRoute requiredRoles={['admin']} fallbackPath="/">
                <UserManagement />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/admin/salons"
            element={
              <RoleBasedRoute requiredRoles={['admin']} fallbackPath="/">
                <SalonManagement />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <RoleBasedRoute requiredRoles={['admin']} fallbackPath="/">
                <BookingManagement />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/admin/payments"
            element={
              <RoleBasedRoute requiredRoles={['admin']} fallbackPath="/">
                <PaymentReports />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <RoleBasedRoute requiredRoles={['admin']} fallbackPath="/">
                <CategoryManagement />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/admin/notifications"
            element={
              <RoleBasedRoute requiredRoles={['admin']} fallbackPath="/">
                <AdminNotifications />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <RoleBasedRoute requiredRoles={['admin']} fallbackPath="/">
                <AdminSettings />
              </RoleBasedRoute>
            }
          />

          {/* ============================================
              CATCH-ALL ROUTE - 404 Not Found
              ============================================ */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
