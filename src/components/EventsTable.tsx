import type { EventRow } from '../types';

interface EventsTableProps {
  events: EventRow[];
}

const STATUS_STYLES: Record<EventRow['status'], string> = {
  success: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
  pending: 'bg-amber-100 text-amber-700',
};

export const EventsTable = ({ events }: EventsTableProps) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left text-sm" data-testid="events-table">
      <thead>
        <tr className="border-b border-slate-200 text-xs uppercase text-slate-400">
          <th className="py-2 pr-4">Time</th>
          <th className="py-2 pr-4">User</th>
          <th className="py-2 pr-4">Action</th>
          <th className="py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event.id} className="border-b border-slate-100 last:border-0">
            <td className="py-2 pr-4 text-slate-500">{event.timestamp}</td>
            <td className="py-2 pr-4 text-slate-700">{event.user}</td>
            <td className="py-2 pr-4 text-slate-700">{event.action}</td>
            <td className="py-2">
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[event.status]}`}
              >
                {event.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
