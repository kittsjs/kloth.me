import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '../constants';
import { toast } from 'react-toastify';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // You can add auth tokens or other headers here
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle error responses
    if (error.response) {
      // Server responded with error status
      const message = (error.response.data as any)?.message || error.message || 'An error occurred';
      toast.error(message, {
        autoClose: 3000,
      });
    } else if (error.request) {
      // Request was made but no response received
      toast.error('Network error. Please check your connection.', {
        autoClose: 3000,
      });
    } else {
      // Something else happened
      toast.error(error.message || 'An unexpected error occurred', {
        autoClose: 3000,
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

