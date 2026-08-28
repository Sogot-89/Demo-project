import type { Credentials, ValidationResult } from '../types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email: string): string | null => {
  if (!email.trim()) return 'Email is required';
  if (!EMAIL_PATTERN.test(email)) return 'Enter a valid email address';
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  return null;
};

export const ACCEPTED_AVATAR_TYPES = ['image/jpeg', 'image/png'] as const;
export const MAX_AVATAR_BYTES = 5 * 1024 * 1024;

export const validateAvatarFile = (file: File): string | null => {
  if (!ACCEPTED_AVATAR_TYPES.includes(file.type as (typeof ACCEPTED_AVATAR_TYPES)[number])) {
    return 'Avatar must be a JPG or PNG image';
  }
  if (file.size > MAX_AVATAR_BYTES) {
    return 'Avatar must be 5MB or smaller';
  }
  return null;
};

export const validateCredentials = (credentials: Credentials): ValidationResult => {
  const errors: ValidationResult['errors'] = {};

  const emailError = validateEmail(credentials.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(credentials.password);
  if (passwordError) errors.password = passwordError;

  return { valid: Object.keys(errors).length === 0, errors };
};
