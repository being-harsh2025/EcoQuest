// Google OAuth Configuration
const GOOGLE_CONFIG = {
  // Replace with your actual Google Client ID from Google Cloud Console
  CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '1234567890-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com',
  
  // Scopes for Google Sign-In
  SCOPES: ['email', 'profile', 'openid'],
  
  // Redirect URIs (update for production)
  REDIRECT_URIS: [
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GOOGLE_CONFIG };
} else {
  window.GOOGLE_CONFIG = GOOGLE_CONFIG;
}
