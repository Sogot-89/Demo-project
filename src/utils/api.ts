import type { AuthResponse, Credentials } from '../types';

/**
 * Mock authentication endpoint. Resolves for any valid-looking credentials
 * except the reserved "denied@example.com" address, which rejects.
 */
export const authApi = {
  login: (credentials: Credentials): Promise<AuthResponse> =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'denied@example.com') {
          reject(new Error('Invalid email or password'));
          return;
        }
        resolve({
          token: `token-${Math.random().toString(36).slice(2)}`,
          user: {
            id: 'u-1',
            name: credentials.email.split('@')[0],
            email: credentials.email,
          },
        });
      }, 400);
    }),
};
