import { getCookie, setCookie } from './cookies';

const clearCookies = () => {
  for (const entry of document.cookie.split('; ')) {
    const name = entry.split('=')[0];
    if (name) document.cookie = `${name}=; path=/; max-age=0`;
  }
};

beforeEach(clearCookies);

describe('cookies', () => {
  it('returns null for a missing cookie', () => {
    expect(getCookie('missing')).toBeNull();
  });

  it('round-trips a value', () => {
    setCookie('theme', 'dark');
    expect(getCookie('theme')).toBe('dark');
  });

  it('encodes values with special characters', () => {
    const value = JSON.stringify({ email: true, slack: false });
    setCookie('notification.settings', value);
    expect(getCookie('notification.settings')).toBe(value);
  });

  it('expires a cookie when max-age is zero', () => {
    setCookie('temp', 'x', 0);
    expect(getCookie('temp')).toBeNull();
  });
});
