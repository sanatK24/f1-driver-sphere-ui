// API Configuration

// Google Maps API Key - Required for circuit map previews
// Get your API key from: https://developers.google.com/maps/documentation/javascript/get-api-key
export const GOOGLE_MAPS_API_KEY = 'AIzaSyBiSsbqR78DZoF0Zix772LSPGdv60WBtL8';

// OpenF1 API Configuration
export const OPENF1_API_BASE_URL = 'https://api.openf1.org/v1';

// Ergast API Configuration (for historical F1 data)
export const ERGAST_API_BASE_URL = 'https://ergast.com/api/f1';

// Backend API Configuration
export const BACKEND_API_BASE_URL = 'http://localhost:5000/api';

// Environment
const ENV = {
  development: process.env.NODE_ENV === 'development',
  production: process.env.NODE_ENV === 'production',
};

// Export a configuration object
export default {
  googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  openF1Api: {
    baseUrl: OPENF1_API_BASE_URL,
  },
  ergastApi: {
    baseUrl: ERGAST_API_BASE_URL,
  },
  backendApi: {
    baseUrl: BACKEND_API_BASE_URL,
  },
  env: ENV,
} as const;
