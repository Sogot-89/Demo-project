import { useState } from 'react';
import type { FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, validatePassword } from '../utils/validators';

interface LocationState {
  from?: string;
}

export const Login = () => {
  const { login, status, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as LocationState | null)?.from ?? '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });

  const emailError = touched.email ? validateEmail(email) : null;
  const passwordError = touched.password ? validatePassword(password) : null;
  const formValid = !validateEmail(email) && !validatePassword(password);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({ email: true, password: true });
    if (!formValid) return;

    try {
      await login({ email, password });
      navigate(redirectTo, { replace: true });
    } catch {
      /* error surfaced via context */
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your dashboard">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate data-testid="login-form">
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          data-testid="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          error={emailError}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          data-testid="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
          error={passwordError}
        />

        {error ? (
          <p role="alert" data-testid="form-error" className="text-sm text-red-600">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          data-testid="submit-button"
          isLoading={status === 'pending'}
          disabled={!formValid}
        >
          Sign in
        </Button>
      </form>
    </AuthLayout>
  );
};
