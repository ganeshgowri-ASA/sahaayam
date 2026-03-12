import { RequestPriority } from '@/lib/data/requests';

const priorityConfig: Record<RequestPriority, { label: string; className: string }> = {
  LOW: {
    label: 'Low',
    className: 'bg-slate-100 text-slate-600 border border-slate-200',
  },
  MEDIUM: {
    label: 'Medium',
    className: 'bg-orange-100 text-orange-700 border border-orange-200',
  },
  HIGH: {
    label: 'High',
    className: 'bg-red-100 text-red-700 border border-red-200',
  },
  CRITICAL: {
    label: 'Critical',
    className: 'bg-red-600 text-white border border-red-700',
  },
};

interface PriorityBadgeProps {
  priority: RequestPriority;
}

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  const { label, className } = priorityConfig[priority];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}
