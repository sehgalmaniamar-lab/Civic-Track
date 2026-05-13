import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

/**
 * StatusBadge displays a labeled badge with color based on status.
 * Supported statuses: 'open', 'in_progress', 'resolved', 'rejected'.
 * You can extend the mapping by updating the STATUS_MAP.
 */
export default function StatusBadge({ status }) {
  const STATUS_MAP = {
    open: { label: 'Open', color: 'bg-primary-100 text-primary-800', icon: Clock },
    in_progress: { label: 'In Progress', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    resolved: { label: 'Resolved', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800', icon: XCircle },
  };

  const { label, color, icon: Icon } = STATUS_MAP[status] || {
    label: status,
    color: 'bg-gray-100 text-gray-800',
    icon: null,
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {Icon && <Icon className="w-3 h-3" aria-hidden="true" />}
      {label}
    </span>
  );
}
