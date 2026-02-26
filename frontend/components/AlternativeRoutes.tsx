"use client";

import { Alternative } from "@/lib/types";

interface AlternativeRoutesProps {
  alternatives: Alternative[];
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function AlternativeRoutes({
  alternatives,
}: AlternativeRoutesProps) {
  if (alternatives.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-primary font-semibold flex items-center gap-2">
        <svg
          className="w-5 h-5 text-secondary"
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
        Alternative Routes
      </h3>

      <div className="space-y-2">
        {alternatives.map((alt, index) => (
          <div
            key={index}
            className="bg-surface rounded-xl p-4 border border-surface-light hover:border-accent/30 transition-colors cursor-pointer"
          >
            <p className="text-primary font-medium mb-2">{alt.summary}</p>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="text-secondary">
                  Leave by{" "}
                  <span className="text-primary font-medium">
                    {formatTime(alt.leave_by)}
                  </span>
                </span>
                <span className="text-secondary">
                  Arrive{" "}
                  <span className="text-primary font-medium">
                    {formatTime(alt.estimated_arrival)}
                  </span>
                </span>
              </div>

              <span className="text-secondary">
                {Math.round(alt.confidence * 100)}% confident
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
