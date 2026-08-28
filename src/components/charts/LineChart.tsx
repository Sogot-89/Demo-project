import { useMemo } from 'react';
import type { MonthlyTrendPoint } from '../../types';

interface LineChartProps {
  data: MonthlyTrendPoint[];
  width?: number;
  height?: number;
}

const PADDING = 24;

export const LineChart = ({ data, width = 480, height = 220 }: LineChartProps) => {
  const { points, max } = useMemo(() => {
    const maxValue = Math.max(...data.map((d) => d.value), 1);
    const innerW = width - PADDING * 2;
    const innerH = height - PADDING * 2;
    const step = data.length > 1 ? innerW / (data.length - 1) : 0;

    const coords = data.map((d, i) => {
      const x = PADDING + step * i;
      const y = PADDING + innerH - (d.value / maxValue) * innerH;
      return `${x},${y}`;
    });

    return { points: coords.join(' '), max: maxValue };
  }, [data, width, height]);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label="Monthly performance trend"
      data-testid="line-chart"
      data-max={max}
    >
      <polyline
        points={points}
        fill="none"
        stroke="#4f46e5"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {data.map((d, i) => {
        const [x, y] = points.split(' ')[i].split(',').map(Number);
        return <circle key={d.month} cx={x} cy={y} r={3.5} fill="#4f46e5" />;
      })}
    </svg>
  );
};
