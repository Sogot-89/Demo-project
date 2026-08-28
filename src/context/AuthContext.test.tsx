import { act, renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { useAuth } from '../hooks/useAuth';
import type { AuthResponse } from '../types';

const resolved: AuthResponse = {
  token: 'test-token',
  user: { id: 'u-1', name: 'Test', email: 'test@example.com' },
};

const wrapperWith = (loginFn: jest.Mock) => {
  return ({ children }: { children: ReactNode }) => (
    <AuthProvider loginFn={loginFn}>{children}</AuthProvider>
  );
};

beforeEach(() => localStorage.clear());

describe('AuthProvider', () => {
  it('starts unauthenticated', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: wrapperWith(jest.fn()),
    });
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.status).toBe('idle');
  });

  it('handles a resolved login and persists the token', async () => {
    const loginFn = jest.fn().mockResolvedValue(resolved);
    const { result } = renderHook(() => useAuth(), { wrapper: wrapperWith(loginFn) });

    await act(async () => {
      await result.current.login({ email: 'test@example.com', password: 'password1' });
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user?.email).toBe('test@example.com');
    expect(localStorage.getItem('auth.token')).toBe('test-token');
  });

  it('handles a rejected login', async () => {
    const loginFn = jest.fn().mockRejectedValue(new Error('Invalid email or password'));
    const { result } = renderHook(() => useAuth(), { wrapper: wrapperWith(loginFn) });

    await act(async () => {
      await expect(
        result.current.login({ email: 'denied@example.com', password: 'password1' }),
      ).rejects.toThrow('Invalid email or password');
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.status).toBe('error');
    expect(result.current.error).toBe('Invalid email or password');
  });

  it('exposes a pending status while the request is in flight', async () => {
    let release: (value: AuthResponse) => void = () => {};
    const loginFn = jest.fn(
      () => new Promise<AuthResponse>((res) => { release = res; }),
    );
    const { result } = renderHook(() => useAuth(), { wrapper: wrapperWith(loginFn) });

    act(() => {
      void result.current.login({ email: 'test@example.com', password: 'password1' });
    });

    await waitFor(() => expect(result.current.status).toBe('pending'));

    await act(async () => {
      release(resolved);
    });

    await waitFor(() => expect(result.current.status).toBe('authenticated'));
  });

  it('clears state on logout', async () => {
    const loginFn = jest.fn().mockResolvedValue(resolved);
    const { result } = renderHook(() => useAuth(), { wrapper: wrapperWith(loginFn) });

    await act(async () => {
      await result.current.login({ email: 'test@example.com', password: 'password1' });
    });
    act(() => result.current.logout());

    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorage.getItem('auth.token')).toBeNull();
  });
});
