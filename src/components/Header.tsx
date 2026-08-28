import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/Button';
import { Avatar } from './ui/Avatar';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header = ({ onToggleSidebar }: HeaderProps) => {
  const { user, logout } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4">
      <button
        type="button"
        onClick={onToggleSidebar}
        data-testid="sidebar-toggle"
        aria-label="Toggle sidebar"
        className="rounded-md p-2 text-slate-500 hover:bg-slate-100"
      >
        ☰
      </button>
      <div className="flex items-center gap-3">
        <Link
          to="/dashboard/profile"
          data-testid="profile-link"
          className="flex items-center gap-3 rounded-md p-1 hover:bg-slate-100"
        >
          <div className="text-right">
            <p className="text-sm font-medium text-slate-800" data-testid="profile-name">
              {user?.name ?? 'Guest'}
            </p>
            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>
          <Avatar name={user?.name ?? 'Guest'} src={user?.avatarUrl} />
        </Link>
        <Button variant="ghost" onClick={logout} data-testid="logout-button">
          Sign out
        </Button>
      </div>
    </header>
  );
};
