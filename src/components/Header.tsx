import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/Button';

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
        <div className="text-right">
          <p className="text-sm font-medium text-slate-800" data-testid="profile-name">
            {user?.name ?? 'Guest'}
          </p>
          <p className="text-xs text-slate-400">{user?.email}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
          {(user?.name ?? 'G').charAt(0).toUpperCase()}
        </div>
        <Button variant="ghost" onClick={logout} data-testid="logout-button">
          Sign out
        </Button>
      </div>
    </header>
  );
};
