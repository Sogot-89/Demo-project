import { NavLink } from 'react-router-dom';

interface SidebarProps {
  collapsed: boolean;
}

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Overview', icon: '▣' },
  { to: '/dashboard/reports', label: 'Reports', icon: '▤' },
  { to: '/dashboard/settings', label: 'Settings', icon: '⚙' },
];

export const Sidebar = ({ collapsed }: SidebarProps) => (
  <aside
    data-testid="sidebar"
    data-collapsed={collapsed}
    className={`flex shrink-0 flex-col border-r border-slate-200 bg-white transition-all duration-200 ${
      collapsed ? 'w-16' : 'w-60'
    }`}
  >
    <div className="flex h-16 items-center gap-2 px-4 font-semibold text-indigo-600">
      <span className="text-xl">◆</span>
      {!collapsed && <span>Acme Analytics</span>}
    </div>
    <nav className="flex flex-1 flex-col gap-1 px-2 py-4">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/dashboard'}
          data-testid={`nav-${item.label.toLowerCase()}`}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'
            }`
          }
        >
          <span>{item.icon}</span>
          {!collapsed && <span>{item.label}</span>}
        </NavLink>
      ))}
    </nav>
  </aside>
);
