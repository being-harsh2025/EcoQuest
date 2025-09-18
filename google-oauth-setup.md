# Google OAuth Setup Instructions for EcoQuest

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Create Project" or select an existing project
3. Name your project (e.g., "EcoQuest Authentication")

## Step 2: Enable Google Sign-In API

1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Sign-In API" or "Google Identity"
3. Click on "Google Sign-In API" and click "Enable"

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. If prompted, configure the OAuth consent screen first:
   - Choose "External" user type
   - Fill in required fields:
     - App name: "EcoQuest"
     - User support email: your email
     - Developer contact: your email
   - Add scopes: email, profile, openid
   - Add test users if needed

4. Create OAuth 2.0 Client ID:
   - Application type: "Web application"
   - Name: "EcoQuest Web Client"
   - Authorized JavaScript origins:
     - http://localhost:3000
     - http://127.0.0.1:3000
     - Add your production domain when ready
   - Authorized redirect URIs:
     - http://localhost:3000/login.html
     - http://127.0.0.1:3000/login.html

## Step 4: Configure Your Application

1. Copy the Client ID from the credentials page
2. Replace `YOUR_GOOGLE_CLIENT_ID` in the following files:
   - `login.html` (line 115 and 514)
   - `.env` file (create if doesn't exist)

## Step 5: Update Environment Variables

Create or update your `.env` file:

```
GOOGLE_CLIENT_ID=your_actual_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
```

## Step 6: Test the Integration

1. Start your server: `node server.js`
2. Open http://localhost:3000/login.html
3. Click "Continue with Google"
4. Sign in with your Google account
5. Verify you're redirected to the dashboard

## Security Notes

- Never commit your actual Client ID to public repositories
- Use environment variables for production
- Regularly rotate your credentials
- Monitor usage in Google Cloud Console

## Troubleshooting

**"Error 400: redirect_uri_mismatch"**
- Check that your redirect URIs match exactly in Google Cloud Console

**"Error 403: access_blocked"**
- Make sure your OAuth consent screen is properly configured
- Add test users if using external user type

**Google Sign-In button not appearing**
- Check browser console for JavaScript errors
- Verify the Google Sign-In API script is loading
- Ensure Client ID is correctly set
