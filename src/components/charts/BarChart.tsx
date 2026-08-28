import type { CategoryDatum } from '../../types';

interface BarChartProps {
  data: CategoryDatum[];
}

const COLORS = ['#4f46e5', '#0ea5e9', '#22c55e', '#f59e0b', '#ef4444'];

export const BarChart = ({ data }: BarChartProps) => {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex flex-col gap-3" data-testid="bar-chart" data-max={max}>
      {data.map((d, i) => (
        <div key={d.category} className="flex items-center gap-3">
          <span className="w-20 shrink-0 text-xs text-slate-500">{d.category}</span>
          <div className="h-3 flex-1 rounded-full bg-slate-100">
            <div
              className="h-3 rounded-full"
              style={{
                width: `${(d.value / max) * 100}%`,
                backgroundColor: COLORS[i % COLORS.length],
              }}
            />
          </div>
          <span className="w-10 shrink-0 text-right text-xs font-medium text-slate-600">
            {d.value}%
          </span>
        </div>
      ))}
    </div>
  );
};
