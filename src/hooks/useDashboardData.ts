import { useEffect, useState } from 'react';
import type { DashboardData } from '../types';
import { dashboardFixture } from '../utils/dashboardFixtures';

interface DashboardState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
}

export const useDashboardData = (): DashboardState => {
  const [state, setState] = useState<DashboardState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => {
      if (active) setState({ data: dashboardFixture, loading: false, error: null });
    }, 300);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);

  return state;
};
