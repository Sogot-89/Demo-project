import { Link } from 'react-router-dom';

export const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-100 text-center">
    <p className="text-4xl font-bold text-slate-800">404</p>
    <p className="text-sm text-slate-500">This page could not be found.</p>
    <Link to="/dashboard" className="text-sm font-medium text-indigo-600 hover:underline">
      Back to dashboard
    </Link>
  </div>
);
