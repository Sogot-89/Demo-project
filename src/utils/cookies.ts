const DEFAULT_MAX_AGE_DAYS = 365;

export const getCookie = (name: string): string | null => {
  const prefix = `${encodeURIComponent(name)}=`;
  const match = document.cookie
    .split('; ')
    .find((entry) => entry.startsWith(prefix));
  return match ? decodeURIComponent(match.slice(prefix.length)) : null;
};

export const setCookie = (
  name: string,
  value: string,
  maxAgeDays: number = DEFAULT_MAX_AGE_DAYS,
): void => {
  const maxAgeSeconds = Math.round(maxAgeDays * 24 * 60 * 60);
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value,
  )}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
};
