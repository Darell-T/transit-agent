"use client";

import { RouteLeg as RouteLegType, lineColors } from "@/lib/types";

interface RouteLegProps {
  leg: RouteLegType;
  isLast: boolean;
}

function SubwayIcon({ line }: { line: string }) {
  const bgColor = lineColors[line] || "#808183";
  const textColor =
    line === "N" || line === "Q" || line === "R" || line === "W"
      ? "#000000"
      : "#FFFFFF";

  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {line}
    </div>
  );
}

function LegIcon({ type, line }: { type: string; line?: string }) {
  if (type === "transit" && line) {
    return <SubwayIcon line={line} />;
  }

  if (type === "transfer") {
    return (
      <div className="w-8 h-8 rounded-full bg-surface-light flex items-center justify-center shrink-0">
        <svg
          className="w-4 h-4 text-secondary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      </div>
    );
  }

  // Walk
  return (
    <div className="w-8 h-8 rounded-full bg-surface-light flex items-center justify-center shrink-0">
      <svg
        className="w-4 h-4 text-secondary"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    </div>
  );
}

export default function RouteLeg({ leg, isLast }: RouteLegProps) {
  const hasDelay = leg.delay_min && leg.delay_min > 0;

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <LegIcon type={leg.type} line={leg.line} />
        {!isLast && <div className="w-0.5 h-full bg-surface-light mt-2" />}
      </div>

      <div className="flex-1 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary font-medium">
              {leg.type === "transit" && leg.line
                ? `${leg.line} Train`
                : leg.type === "transfer"
                ? "Transfer"
                : "Walk"}
            </p>
            <p className="text-secondary text-sm">
              {leg.from} → {leg.to}
            </p>
          </div>

          <div className="text-right">
            <p className="text-primary">{leg.duration_min} min</p>
            {hasDelay && (
              <p className="text-danger text-sm">+{leg.delay_min} min delay</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
