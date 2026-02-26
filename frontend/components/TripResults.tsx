"use client";

import { TripResponse } from "@/lib/types";
import StatusBadge from "./StatusBadge";
import RouteLeg from "./RouteLeg";
import DelayExplanation from "./DelayExplanation";
import AlternativeRoutes from "./AlternativeRoutes";

interface TripResultsProps {
  trip: TripResponse;
  origin: string;
  destination: string;
}

function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function TripResults({
  trip,
  origin,
  destination,
}: TripResultsProps) {
  const { recommendation, route, alternatives } = trip;

  return (
    <div className="space-y-6">
      {/* Header with Status */}
      <div className="text-center space-y-4">
        <StatusBadge status={recommendation.status} />

        <div className="space-y-1">
          <p className="text-secondary">
            {origin} → {destination}
          </p>
        </div>
      </div>

      {/* Main Recommendation Card */}
      <div className="bg-surface rounded-2xl p-6 border border-surface-light">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="text-center">
            <p className="text-secondary text-sm mb-1">Leave by</p>
            <p className="text-primary text-3xl font-bold">
              {formatTime(recommendation.leave_by)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-secondary text-sm mb-1">Arrive at</p>
            <p className="text-primary text-3xl font-bold">
              {formatTime(recommendation.estimated_arrival)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-secondary">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Total trip: <span className="text-primary font-medium">{route.total_duration_min} min</span>
          </span>
        </div>
      </div>

      {/* AI Explanation */}
      <DelayExplanation
        explanation={recommendation.explanation}
        confidence={recommendation.confidence}
      />

      {/* Route Details */}
      <div className="bg-surface rounded-2xl p-6 border border-surface-light">
        <h3 className="text-primary font-semibold mb-4 flex items-center gap-2">
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
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          Your Route
        </h3>

        <div className="space-y-0">
          {route.legs.map((leg, index) => (
            <RouteLeg
              key={index}
              leg={leg}
              isLast={index === route.legs.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-surface rounded-2xl border border-surface-light overflow-hidden">
        {/* Mapbox map will be integrated here */}
        <div className="h-48 bg-surface-light flex items-center justify-center">
          <p className="text-secondary">Map view coming soon</p>
        </div>
      </div>

      {/* Alternative Routes */}
      <AlternativeRoutes alternatives={alternatives} />
    </div>
  );
}
