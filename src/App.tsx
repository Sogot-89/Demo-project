import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';

const Placeholder = ({ title }: { title: string }) => (
  <div data-testid="placeholder-page">
    <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
    <p className="text-sm text-slate-500">Coming soon.</p>
  </div>
);

export const App = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="reports" element={<Placeholder title="Reports" />} />
        <Route path="settings" element={<Placeholder title="Settings" />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AuthProvider>
);
