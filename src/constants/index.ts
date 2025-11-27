// Determine API base URL based on environment
export const API_BASE_URL = 
  import.meta.env.MODE === 'development' 
    ? 'http://localhost:3000' 
    : 'http://216.81.245.162:3000';
export const API_ENDPOINTS = {
  EXTRACT_IMAGES: '/api/extract-images',
} as const;

export const ROUTES = {
  LANDING: '/',
  DASHBOARD: '/dashboard',
} as const;

export const TOAST_DURATION = 3000; // 3 seconds
