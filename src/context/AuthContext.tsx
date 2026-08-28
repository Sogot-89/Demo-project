import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type {
  AuthContextValue,
  AuthResponse,
  AuthStatus,
  AvatarUploadResponse,
  Credentials,
  User,
} from '../types';
import { authApi, profileApi } from '../utils/api';

const TOKEN_KEY = 'auth.token';
const USER_KEY = 'auth.user';

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  loginFn?: (credentials: Credentials) => Promise<AuthResponse>;
  uploadAvatarFn?: (file: File) => Promise<AvatarUploadResponse>;
}

const readStoredUser = (): User | null => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({
  children,
  loginFn = authApi.login,
  uploadAvatarFn = profileApi.uploadAvatar,
}: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<User | null>(() => readStoredUser());
  const [status, setStatus] = useState<AuthStatus>(() =>
    localStorage.getItem(TOKEN_KEY) ? 'authenticated' : 'idle',
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  const login = useCallback(
    async (credentials: Credentials) => {
      setStatus('pending');
      setError(null);
      try {
        const response = await loginFn(credentials);
        setToken(response.token);
        setUser(response.user);
        setStatus('authenticated');
      } catch (err) {
        setToken(null);
        setUser(null);
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Login failed');
        throw err;
      }
    },
    [loginFn],
  );

  const updateAvatar = useCallback(
    async (file: File) => {
      const { avatarUrl } = await uploadAvatarFn(file);
      setUser((current) => (current ? { ...current, avatarUrl } : current));
    },
    [uploadAvatarFn],
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setStatus('idle');
    setError(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      status,
      error,
      isAuthenticated: Boolean(token),
      login,
      logout,
      updateAvatar,
    }),
    [user, token, status, error, login, logout, updateAvatar],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
