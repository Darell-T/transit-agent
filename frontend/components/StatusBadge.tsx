"use client";

interface StatusBadgeProps {
  status: "on_time" | "cutting_it_close" | "late";
}

const statusConfig = {
  on_time: {
    label: "On Time",
    bgColor: "bg-success/20",
    textColor: "text-success",
    borderColor: "border-success/30",
  },
  cutting_it_close: {
    label: "Cutting It Close",
    bgColor: "bg-warning/20",
    textColor: "text-warning",
    borderColor: "border-warning/30",
  },
  late: {
    label: "You'll Be Late",
    bgColor: "bg-danger/20",
    textColor: "text-danger",
    borderColor: "border-danger/30",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`
        inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold
        border ${config.bgColor} ${config.textColor} ${config.borderColor}
      `}
    >
      <span
        className={`w-2 h-2 rounded-full mr-2 ${
          status === "on_time"
            ? "bg-success"
            : status === "cutting_it_close"
            ? "bg-warning"
            : "bg-danger"
        }`}
      />
      {config.label}
    </span>
  );
}
