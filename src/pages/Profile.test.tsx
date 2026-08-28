import { useEffect } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';
import { Profile } from './Profile';
import type { AvatarUploadResponse } from '../types';

const AuthedProfile = ({
  uploadAvatarFn,
}: {
  uploadAvatarFn: (file: File) => Promise<AvatarUploadResponse>;
}) => {
  const Primer = () => {
    const { login, isAuthenticated } = useAuth();
    useEffect(() => {
      if (!isAuthenticated) {
        void login({ email: 'jane@example.com', password: 'password1' });
      }
    }, [isAuthenticated, login]);
    return isAuthenticated ? <Profile /> : null;
  };
  return (
    <MemoryRouter>
      <AuthProvider
        loginFn={jest.fn().mockResolvedValue({
          token: 't',
          user: { id: 'u-1', name: 'Jane', email: 'jane@example.com' },
        })}
        uploadAvatarFn={uploadAvatarFn}
      >
        <Primer />
      </AuthProvider>
    </MemoryRouter>
  );
};

const pngFile = (name = 'me.png') => new File(['data'], name, { type: 'image/png' });

beforeEach(() => localStorage.clear());

describe('Profile page', () => {
  it('renders the upload button and initial fallback avatar', async () => {
    render(<AuthedProfile uploadAvatarFn={jest.fn()} />);

    expect(await screen.findByTestId('avatar-upload-button')).toBeInTheDocument();
    expect(screen.getByTestId('avatar-fallback')).toHaveTextContent('J');
  });

  it('uploads a valid image and shows it as the avatar', async () => {
    const user = userEvent.setup({ applyAccept: false });
    const uploadAvatarFn = jest
      .fn()
      .mockResolvedValue({ avatarUrl: 'data:image/png;base64,ZZZ' });
    render(<AuthedProfile uploadAvatarFn={uploadAvatarFn} />);

    await user.upload(await screen.findByTestId('avatar-input'), pngFile());

    const image = await screen.findByTestId('avatar-image');
    expect(image).toHaveAttribute('src', 'data:image/png;base64,ZZZ');
    expect(uploadAvatarFn).toHaveBeenCalledTimes(1);
  });

  it('shows a loading state while the upload is in flight', async () => {
    const user = userEvent.setup({ applyAccept: false });
    let release: (value: AvatarUploadResponse) => void = () => {};
    const uploadAvatarFn = jest.fn(
      () => new Promise<AvatarUploadResponse>((res) => { release = res; }),
    );
    render(<AuthedProfile uploadAvatarFn={uploadAvatarFn} />);

    await user.upload(await screen.findByTestId('avatar-input'), pngFile());

    await waitFor(() =>
      expect(screen.getByTestId('avatar-upload-button')).toBeDisabled(),
    );

    release({ avatarUrl: 'data:image/png;base64,ZZZ' });
    await waitFor(() =>
      expect(screen.getByTestId('avatar-upload-button')).not.toBeDisabled(),
    );
  });

  it('rejects a file that is not a JPG or PNG without calling the API', async () => {
    const user = userEvent.setup({ applyAccept: false });
    const uploadAvatarFn = jest.fn();
    render(<AuthedProfile uploadAvatarFn={uploadAvatarFn} />);

    await user.upload(
      await screen.findByTestId('avatar-input'),
      new File(["x"], "notes.pdf", { type: "application/pdf" }),
    );

    expect(await screen.findByTestId('avatar-error')).toHaveTextContent(
      'Avatar must be a JPG or PNG image',
    );
    expect(uploadAvatarFn).not.toHaveBeenCalled();
  });
});
