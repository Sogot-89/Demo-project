import { Card } from '../components/ui/Card';
import { MetricCard } from '../components/MetricCard';
import { LineChart } from '../components/charts/LineChart';
import { BarChart } from '../components/charts/BarChart';
import { EventsTable } from '../components/EventsTable';
import { useDashboardData } from '../hooks/useDashboardData';

export const Dashboard = () => {
  const { data, loading } = useDashboardData();

  if (loading || !data) {
    return (
      <p className="text-sm text-slate-500" data-testid="dashboard-loading">
        Loading dashboard…
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6" data-testid="dashboard">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Charts Overview</h1>
        <p className="text-sm text-slate-500">Operational performance at a glance</p>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Monthly Performance Trend" className="lg:col-span-2">
          <LineChart data={data.monthlyTrend} />
        </Card>
        <Card title="Category Distribution">
          <BarChart data={data.categories} />
        </Card>
      </section>

      <section>
        <Card title="Real-time Events">
          <EventsTable events={data.events} />
        </Card>
      </section>
    </div>
  );
};
