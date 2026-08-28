import { useCallback, useState } from 'react';
import type { NotificationChannel, NotificationSettings } from '../types';
import { getCookie, setCookie } from '../utils/cookies';

export const NOTIFICATION_COOKIE = 'notification.settings';

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  email: true,
  slack: false,
  sms: false,
};

const CHANNELS: NotificationChannel[] = ['email', 'slack', 'sms'];

const isChannel = (value: string): value is NotificationChannel =>
  (CHANNELS as string[]).includes(value);

export const parseSettings = (raw: string | null): NotificationSettings => {
  if (!raw) return { ...DEFAULT_NOTIFICATION_SETTINGS };
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const result = { ...DEFAULT_NOTIFICATION_SETTINGS };
    for (const [key, value] of Object.entries(parsed)) {
      if (isChannel(key) && typeof value === 'boolean') {
        result[key] = value;
      }
    }
    return result;
  } catch {
    return { ...DEFAULT_NOTIFICATION_SETTINGS };
  }
};

interface UseNotificationSettings {
  settings: NotificationSettings;
  channels: NotificationChannel[];
  toggleChannel: (channel: NotificationChannel) => void;
}

export const useNotificationSettings = (): UseNotificationSettings => {
  const [settings, setSettings] = useState<NotificationSettings>(() =>
    parseSettings(getCookie(NOTIFICATION_COOKIE)),
  );

  const toggleChannel = useCallback((channel: NotificationChannel) => {
    setSettings((current) => {
      const next = { ...current, [channel]: !current[channel] };
      setCookie(NOTIFICATION_COOKIE, JSON.stringify(next));
      return next;
    });
  }, []);

  return { settings, channels: CHANNELS, toggleChannel };
};
