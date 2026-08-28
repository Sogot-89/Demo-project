import type { MetricSummary } from '../types';
import { Card } from './ui/Card';

interface MetricCardProps {
  metric: MetricSummary;
}

export const MetricCard = ({ metric }: MetricCardProps) => {
  const positive = metric.delta >= 0;
  return (
    <Card data-testid={`metric-${metric.id}`} className="flex flex-col gap-1">
      <span className="text-sm text-slate-500">{metric.label}</span>
      <span className="text-2xl font-semibold text-slate-900">{metric.value}</span>
      <span className={`text-xs font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
        {positive ? '▲' : '▼'} {Math.abs(metric.delta)}% vs last month
      </span>
    </Card>
  );
};
