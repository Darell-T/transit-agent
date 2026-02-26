"use client";

interface DelayExplanationProps {
  explanation: string;
  confidence: number;
}

export default function DelayExplanation({
  explanation,
  confidence,
}: DelayExplanationProps) {
  const confidencePercent = Math.round(confidence * 100);

  return (
    <div className="bg-surface rounded-xl p-5 border border-surface-light">
      <div className="flex items-center gap-2 mb-3">
        <svg
          className="w-5 h-5 text-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-primary font-medium">AI Analysis</span>
        <span className="ml-auto text-secondary text-sm">
          {confidencePercent}% confident
        </span>
      </div>

      <p className="text-secondary leading-relaxed">{explanation}</p>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-secondary">Prediction confidence</span>
          <span className="text-primary font-medium">{confidencePercent}%</span>
        </div>
        <div className="h-2 bg-surface-light rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${confidencePercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
