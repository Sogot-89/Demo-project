import { validateCredentials, validateEmail, validatePassword } from './validators';

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
