/**
 * Authentication Service
 * Handles all API calls related to authentication
 */

import axiosInstance from './axiosConfig';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const authService = {
  /**
   * Login user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} Authentication response with token
   */
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Register new user
   * @param {Object} userData - User data {firstName, lastName, email, password, phone}
   * @returns {Promise} Registration response
   */
  register: async (userData) => {
    try {
      const response = await axiosInstance.post(`${API_BASE_URL}/auth/register`, userData);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Request password reset
   * @param {string} email - User email
   * @returns {Promise} Reset request response
   */
  forgotPassword: async (email) => {
    try {
      const response = await axiosInstance.post(`${API_BASE_URL}/auth/forgot-password`, {
        email,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Reset password with token
   * @param {string} token - Reset token from email
   * @param {string} password - New password
   * @param {string} confirmPassword - Confirm password
   * @returns {Promise} Reset response
   */
  resetPassword: async (token, password, confirmPassword) => {
    try {
      const response = await axiosInstance.post(`${API_BASE_URL}/auth/reset-password`, {
        token,
        password,
        confirmPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Verify email with OTP
   * @param {string} email - User email
   * @param {string} otp - OTP from email
   * @returns {Promise} Verification response
   */
  verifyEmail: async (email, otp) => {
    try {
      const response = await axiosInstance.post(`${API_BASE_URL}/auth/verify-email`, {
        email,
        otp,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Logout user
   * @returns {Promise} Logout response
   */
  logout: async () => {
    try {
      await axiosInstance.post(`${API_BASE_URL}/auth/logout`);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      return { success: true };
    } catch (error) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      throw error.response?.data || error;
    }
  },

  /**
   * Get current user profile
   * @returns {Promise} User profile data
   */
  getCurrentUser: async () => {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}/auth/me`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Refresh authentication token
   * @returns {Promise} New token
   */
  refreshToken: async () => {
    try {
      const response = await axiosInstance.post(`${API_BASE_URL}/auth/refresh-token`);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} True if authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  /**
   * Get stored auth token
   * @returns {string|null} Auth token
   */
  getToken: () => {
    return localStorage.getItem('authToken');
  },

  /**
   * Get stored user data
   * @returns {Object|null} User data
   */
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default authService;
