import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { Login } from './Login';
import type { AuthResponse } from '../types';

const renderLogin = (loginFn: jest.Mock) =>
  render(
    <MemoryRouter initialEntries={['/login']}>
      <AuthProvider loginFn={loginFn}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<div data-testid="dashboard-page">Dashboard</div>} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>,
  );

beforeEach(() => localStorage.clear());

describe('Login page', () => {
  it('shows validation errors for invalid input', async () => {
    const user = userEvent.setup();
    renderLogin(jest.fn());

    await user.type(screen.getByTestId('email-input'), 'bad');
    await user.click(screen.getByTestId('password-input'));
    await user.tab();

    expect(await screen.findByTestId('email-error')).toHaveTextContent(
      'Enter a valid email address',
    );
    expect(screen.getByTestId('password-error')).toHaveTextContent('Password is required');
    expect(screen.getByTestId('submit-button')).toBeDisabled();
  });

  it('submits valid credentials and redirects to the dashboard', async () => {
    const user = userEvent.setup();
    const resolved: AuthResponse = {
      token: 't',
      user: { id: 'u-1', name: 'Jane', email: 'jane@example.com' },
    };
    const loginFn = jest.fn().mockResolvedValue(resolved);
    renderLogin(loginFn);

    await user.type(screen.getByTestId('email-input'), 'jane@example.com');
    await user.type(screen.getByTestId('password-input'), 'password1');
    await user.click(screen.getByTestId('submit-button'));

    await waitFor(() => expect(screen.getByTestId('dashboard-page')).toBeInTheDocument());
    expect(loginFn).toHaveBeenCalledWith({
      email: 'jane@example.com',
      password: 'password1',
    });
  });

  it('surfaces an API rejection', async () => {
    const user = userEvent.setup();
    const loginFn = jest.fn().mockRejectedValue(new Error('Invalid email or password'));
    renderLogin(loginFn);

    await user.type(screen.getByTestId('email-input'), 'denied@example.com');
    await user.type(screen.getByTestId('password-input'), 'password1');
    await user.click(screen.getByTestId('submit-button'));

    expect(await screen.findByTestId('form-error')).toHaveTextContent('Invalid email or password');
  });
});
