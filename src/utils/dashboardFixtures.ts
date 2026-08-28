import type { DashboardData } from '../types';

export const dashboardFixture: DashboardData = {
  metrics: [
    { id: 'revenue', label: 'Monthly Revenue', value: '$48,200', delta: 12.4 },
    { id: 'active-users', label: 'Active Users', value: '3,914', delta: 4.1 },
    { id: 'conversion', label: 'Conversion Rate', value: '2.8%', delta: -0.6 },
    { id: 'tickets', label: 'Open Tickets', value: '27', delta: -8.3 },
  ],
  monthlyTrend: [
    { month: 'Jan', value: 32 },
    { month: 'Feb', value: 38 },
    { month: 'Mar', value: 35 },
    { month: 'Apr', value: 44 },
    { month: 'May', value: 51 },
    { month: 'Jun', value: 48 },
    { month: 'Jul', value: 58 },
    { month: 'Aug', value: 64 },
  ],
  categories: [
    { category: 'Direct', value: 40 },
    { category: 'Referral', value: 25 },
    { category: 'Social', value: 20 },
    { category: 'Organic', value: 15 },
  ],
  events: [
    { id: 'e1', timestamp: '2026-08-28 09:12', user: 'a.morgan', action: 'Signed in', status: 'success' },
    { id: 'e2', timestamp: '2026-08-28 09:03', user: 'j.lee', action: 'Exported report', status: 'success' },
    { id: 'e3', timestamp: '2026-08-28 08:47', user: 's.patel', action: 'Payment retry', status: 'pending' },
    { id: 'e4', timestamp: '2026-08-28 08:31', user: 'k.novak', action: 'API key rotated', status: 'success' },
    { id: 'e5', timestamp: '2026-08-28 08:05', user: 'unknown', action: 'Login attempt', status: 'failed' },
  ],
};
