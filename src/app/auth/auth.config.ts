import { AuthConfig } from '@auth0/auth0-angular';

export const authConfig: AuthConfig = {
  // TODO: Replace with your Auth0 domain (e.g., 'your-tenant.us.auth0.com')
  domain: 'YOUR_AUTH0_DOMAIN',

  // TODO: Replace with your Auth0 application client ID
  clientId: 'YOUR_AUTH0_CLIENT_ID',

  authorizationParams: {
    // Where Auth0 redirects after login
    redirect_uri: window.location.origin,
  },

  // Cache tokens in localStorage for persistence
  cacheLocation: 'localstorage',
};

/*
 * HOW TO SET UP AUTH0:
 *
 * 1. Go to https://auth0.com and create a free account
 * 2. Create a new Application (Single Page Application)
 * 3. In Application Settings:
 *    - Copy the "Domain" and paste it above as YOUR_AUTH0_DOMAIN
 *    - Copy the "Client ID" and paste it above as YOUR_AUTH0_CLIENT_ID
 *    - Add http://localhost:4200 to:
 *      - Allowed Callback URLs
 *      - Allowed Logout URLs
 *      - Allowed Web Origins
 * 4. Save Changes
 */
