import { cn } from "@/lib/utils";
import type { VehicleStatus } from "@/lib/data/types";

const statusStyles: Record<VehicleStatus, { label: string; className: string }> =
  {
    available: {
      label: "Available",
      className: "bg-brand text-white",
    },
    reserved: {
      label: "Reserved",
      className: "bg-amber-500 text-white",
    },
    sold: {
      label: "Sold",
      className: "bg-depth text-white",
    },
  };

interface StatusBadgeProps {
  status: VehicleStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { label, className: statusClass } = statusStyles[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold",
        statusClass,
        className
      )}
    >
      {label}
    </span>
  );
}
