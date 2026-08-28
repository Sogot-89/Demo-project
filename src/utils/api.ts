import type { AuthResponse, AvatarUploadResponse, Credentials } from '../types';
import { validateAvatarFile } from './validators';

const readAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Could not read the selected file'));
    reader.readAsDataURL(file);
  });

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

/**
 * Mock avatar upload endpoint. Rejects invalid files, otherwise echoes the
 * image back as a data URL after a short delay to emulate network latency.
 */
export const profileApi = {
  uploadAvatar: async (file: File): Promise<AvatarUploadResponse> => {
    const validationError = validateAvatarFile(file);
    if (validationError) {
      throw new Error(validationError);
    }
    const avatarUrl = await readAsDataUrl(file);
    await new Promise((resolve) => setTimeout(resolve, 400));
    return { avatarUrl };
  },
};
