import { Card } from '../components/ui/Card';
import { Toggle } from '../components/ui/Toggle';
import { useNotificationSettings } from '../hooks/useNotificationSettings';
import type { NotificationChannel } from '../types';

const CHANNEL_COPY: Record<NotificationChannel, { label: string; description: string }> = {
  email: { label: 'Email', description: 'Send notifications to your account email address' },
  slack: { label: 'Slack', description: 'Post notifications to your connected Slack workspace' },
  sms: { label: 'SMS', description: 'Text notifications to your verified phone number' },
};

export const Settings = () => {
  const { settings, channels, toggleChannel } = useNotificationSettings();

  return (
    <div className="flex flex-col gap-6" data-testid="settings-page">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500">Choose how you want to be notified</p>
      </div>

      <Card title="Notification Channels" className="max-w-md">
        <div className="flex flex-col gap-4" data-testid="notification-channels">
          {channels.map((channel) => (
            <Toggle
              key={channel}
              label={CHANNEL_COPY[channel].label}
              description={CHANNEL_COPY[channel].description}
              checked={settings[channel]}
              onChange={() => toggleChannel(channel)}
              data-testid={`channel-${channel}`}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};
