import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Settings } from './Settings';
import { NOTIFICATION_COOKIE } from '../hooks/useNotificationSettings';
import { getCookie, setCookie } from '../utils/cookies';

const clearCookies = () => {
  for (const entry of document.cookie.split('; ')) {
    const name = entry.split('=')[0];
    if (name) document.cookie = `${name}=; path=/; max-age=0`;
  }
};

beforeEach(clearCookies);

describe('Settings page', () => {
  it('renders a toggle for each notification channel', () => {
    render(<Settings />);
    expect(screen.getByTestId('channel-email')).toBeInTheDocument();
    expect(screen.getByTestId('channel-slack')).toBeInTheDocument();
    expect(screen.getByTestId('channel-sms')).toBeInTheDocument();
  });

  it('defaults to email enabled, slack and sms disabled', () => {
    render(<Settings />);
    expect(screen.getByTestId('channel-email')).toBeChecked();
    expect(screen.getByTestId('channel-slack')).not.toBeChecked();
    expect(screen.getByTestId('channel-sms')).not.toBeChecked();
  });

  it('persists a toggled channel to the cookie', async () => {
    const user = userEvent.setup();
    render(<Settings />);

    await user.click(screen.getByTestId('channel-slack'));

    expect(screen.getByTestId('channel-slack')).toBeChecked();
    expect(JSON.parse(getCookie(NOTIFICATION_COOKIE) ?? '{}')).toMatchObject({
      email: true,
      slack: true,
      sms: false,
    });
  });

  it('hydrates initial state from an existing cookie', () => {
    setCookie(NOTIFICATION_COOKIE, JSON.stringify({ email: false, slack: true, sms: true }));
    render(<Settings />);

    expect(screen.getByTestId('channel-email')).not.toBeChecked();
    expect(screen.getByTestId('channel-slack')).toBeChecked();
    expect(screen.getByTestId('channel-sms')).toBeChecked();
  });

  it('ignores a malformed cookie and falls back to defaults', () => {
    setCookie(NOTIFICATION_COOKIE, 'not-json');
    render(<Settings />);
    expect(screen.getByTestId('channel-email')).toBeChecked();
    expect(screen.getByTestId('channel-slack')).not.toBeChecked();
  });
});
