import {
  MAX_AVATAR_BYTES,
  validateAvatarFile,
  validateCredentials,
  validateEmail,
  validatePassword,
} from './validators';

const fileOfSize = (bytes: number, type: string): File => {
  const file = new File(['x'], 'avatar', { type });
  Object.defineProperty(file, 'size', { value: bytes });
  return file;
};

describe('validateEmail', () => {
  it('rejects an empty value', () => {
    expect(validateEmail('')).toBe('Email is required');
  });

  it('rejects a malformed address', () => {
    expect(validateEmail('not-an-email')).toBe('Enter a valid email address');
  });

  it('accepts a well-formed address', () => {
    expect(validateEmail('user@example.com')).toBeNull();
  });
});

describe('validatePassword', () => {
  it('rejects an empty value', () => {
    expect(validatePassword('')).toBe('Password is required');
  });

  it('rejects short passwords', () => {
    expect(validatePassword('abc123')).toBe('Password must be at least 8 characters');
  });

  it('accepts an 8+ character password', () => {
    expect(validatePassword('supersecret')).toBeNull();
  });
});

describe('validateAvatarFile', () => {
  it('accepts a small JPG', () => {
    expect(validateAvatarFile(fileOfSize(1024, 'image/jpeg'))).toBeNull();
  });

  it('accepts a small PNG', () => {
    expect(validateAvatarFile(fileOfSize(1024, 'image/png'))).toBeNull();
  });

  it('rejects an unsupported type', () => {
    expect(validateAvatarFile(fileOfSize(1024, 'image/gif'))).toBe(
      'Avatar must be a JPG or PNG image',
    );
  });

  it('rejects a file over 5MB', () => {
    expect(validateAvatarFile(fileOfSize(MAX_AVATAR_BYTES + 1, 'image/png'))).toBe(
      'Avatar must be 5MB or smaller',
    );
  });
});

describe('validateCredentials', () => {
  it('aggregates field errors', () => {
    const result = validateCredentials({ email: '', password: '' });
    expect(result.valid).toBe(false);
    expect(result.errors).toEqual({
      email: 'Email is required',
      password: 'Password is required',
    });
  });

  it('is valid for good input', () => {
    const result = validateCredentials({ email: 'a@b.com', password: 'password1' });
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });
});
