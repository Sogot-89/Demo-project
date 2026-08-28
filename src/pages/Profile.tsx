import { useRef, useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { useAuth } from '../hooks/useAuth';
import { ACCEPTED_AVATAR_TYPES, validateAvatarFile } from '../utils/validators';

export const Profile = () => {
  const { user, updateAvatar } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;

    const validationError = validateAvatarFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setUploading(true);
    try {
      await updateAvatar(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6" data-testid="profile-page">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Profile</h1>
        <p className="text-sm text-slate-500">Manage how your account appears across the dashboard</p>
      </div>

      <Card title="Profile Photo" className="max-w-md">
        <div className="flex items-center gap-5">
          <Avatar name={user?.name ?? 'Guest'} src={user?.avatarUrl} size="lg" />
          <div className="flex flex-col gap-2">
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPTED_AVATAR_TYPES.join(',')}
              data-testid="avatar-input"
              className="hidden"
              onChange={(event) => {
                void handleFile(event.target.files?.[0]);
                event.target.value = '';
              }}
            />
            <Button
              type="button"
              data-testid="avatar-upload-button"
              isLoading={uploading}
              onClick={() => inputRef.current?.click()}
            >
              Upload photo
            </Button>
            <p className="text-xs text-slate-400">JPG or PNG, up to 5MB.</p>
          </div>
        </div>

        {error ? (
          <p role="alert" data-testid="avatar-error" className="mt-4 text-xs text-red-600">
            {error}
          </p>
        ) : null}
      </Card>

      <Card title="Account" className="max-w-md">
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <dt className="font-medium text-slate-500">Name</dt>
          <dd className="text-slate-800" data-testid="profile-account-name">
            {user?.name ?? '—'}
          </dd>
          <dt className="font-medium text-slate-500">Email</dt>
          <dd className="text-slate-800" data-testid="profile-account-email">
            {user?.email ?? '—'}
          </dd>
        </dl>
      </Card>
    </div>
  );
};
