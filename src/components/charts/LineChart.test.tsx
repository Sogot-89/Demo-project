import { render, screen } from '@testing-library/react';
import { LineChart } from './LineChart';
import { BarChart } from './BarChart';
import type { CategoryDatum, MonthlyTrendPoint } from '../../types';

const trend: MonthlyTrendPoint[] = [
  { month: 'Jan', value: 10 },
  { month: 'Feb', value: 20 },
  { month: 'Mar', value: 40 },
];

const categories: CategoryDatum[] = [
  { category: 'A', value: 50 },
  { category: 'B', value: 25 },
];

describe('chart layout calculations', () => {
  it('plots one point per data item and tracks the max value', () => {
    render(<LineChart data={trend} width={400} height={200} />);
    const chart = screen.getByTestId('line-chart');
    expect(chart).toHaveAttribute('data-max', '40');
    expect(chart.querySelectorAll('circle')).toHaveLength(3);

    const points = chart.querySelector('polyline')?.getAttribute('points')?.split(' ') ?? [];
    expect(points).toHaveLength(3);
    // Highest value maps to the smallest y (top of the chart).
    const ys = points.map((p) => Number(p.split(',')[1]));
    expect(ys[2]).toBeLessThan(ys[0]);
  });

  it('renders one bar per category sized against the max', () => {
    render(<BarChart data={categories} />);
    const chart = screen.getByTestId('bar-chart');
    expect(chart).toHaveAttribute('data-max', '50');
    const bars = chart.querySelectorAll('div[style]');
    expect(bars).toHaveLength(2);
    expect((bars[0] as HTMLElement).style.width).toBe('100%');
    expect((bars[1] as HTMLElement).style.width).toBe('50%');
  });
});
