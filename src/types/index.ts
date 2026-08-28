export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface AvatarUploadResponse {
  avatarUrl: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Credentials {
  email: string;
  password: string;
}

export type AuthStatus = 'idle' | 'pending' | 'authenticated' | 'error';

export interface AuthContextValue {
  user: User | null;
  token: string | null;
  status: AuthStatus;
  error: string | null;
  isAuthenticated: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
  updateAvatar: (file: File) => Promise<void>;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<'email' | 'password', string>>;
}

export interface MetricSummary {
  id: string;
  label: string;
  value: string;
  delta: number;
}

export interface MonthlyTrendPoint {
  month: string;
  value: number;
}

export interface CategoryDatum {
  category: string;
  value: number;
}

export interface EventRow {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  status: 'success' | 'failed' | 'pending';
}

export interface DashboardData {
  metrics: MetricSummary[];
  monthlyTrend: MonthlyTrendPoint[];
  categories: CategoryDatum[];
  events: EventRow[];
}
