/**
 * useAuth Hook
 * Provides authentication state and methods
 */

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  setUser,
} from '../redux/slices/authSlice';
import authService from '../services/authService';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error, isAuthenticated } = useSelector((state) => state.auth);

  /**
   * Handle user login
   */
  const handleLogin = useCallback(
    async (email, password) => {
      dispatch(loginStart());
      try {
        const response = await authService.login(email, password);
        dispatch(loginSuccess(response.user));
        return { success: true, data: response };
      } catch (err) {
        const errorMessage = err.message || 'Login failed';
        dispatch(loginFailure(errorMessage));
        return { success: false, error: errorMessage };
      }
    },
    [dispatch]
  );

  /**
   * Handle user registration
   */
  const handleRegister = useCallback(
    async (userData) => {
      dispatch(registerStart());
      try {
        const response = await authService.register(userData);
        dispatch(registerSuccess(response.user));
        return { success: true, data: response };
      } catch (err) {
        const errorMessage = err.message || 'Registration failed';
        dispatch(registerFailure(errorMessage));
        return { success: false, error: errorMessage };
      }
    },
    [dispatch]
  );

  /**
   * Handle user logout
   */
  const handleLogout = useCallback(async () => {
    try {
      await authService.logout();
      dispatch(logout());
      return { success: true };
    } catch (err) {
      dispatch(logout());
      return { success: true }; // Still logout on client side
    }
  }, [dispatch]);

  /**
   * Request password reset
   */
  const handleForgotPassword = useCallback(async (email) => {
    try {
      const response = await authService.forgotPassword(email);
      return { success: true, data: response };
    } catch (err) {
      const errorMessage = err.message || 'Failed to request password reset';
      return { success: false, error: errorMessage };
    }
  }, []);

  /**
   * Reset password with token
   */
  const handleResetPassword = useCallback(async (token, password, confirmPassword) => {
    try {
      const response = await authService.resetPassword(token, password, confirmPassword);
      return { success: true, data: response };
    } catch (err) {
      const errorMessage = err.message || 'Failed to reset password';
      return { success: false, error: errorMessage };
    }
  }, []);

  /**
   * Check if user is authenticated
   */
  const checkAuth = useCallback(() => {
    const token = authService.getToken();
    const user = authService.getUser();
    if (token && user) {
      dispatch(setUser(user));
      return true;
    }
    return false;
  }, [dispatch]);

  return {
    user,
    loading,
    error,
    isAuthenticated,
    handleLogin,
    handleRegister,
    handleLogout,
    handleForgotPassword,
    handleResetPassword,
    checkAuth,
  };
};

export default useAuth;
