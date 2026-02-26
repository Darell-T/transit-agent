"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getTrip } from "@/lib/api";
import { TripRequest, TripResponse } from "@/lib/types";
import TripResults from "@/components/TripResults";

export default function ResultsPage() {
  const router = useRouter();
  const [tripRequest, setTripRequest] = useState<TripRequest | null>(null);
  const [tripResponse, setTripResponse] = useState<TripResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedRequest = sessionStorage.getItem("tripRequest");

    if (!storedRequest) {
      router.push("/");
      return;
    }

    const request: TripRequest = JSON.parse(storedRequest);
    setTripRequest(request);

    getTrip(request)
      .then((response) => {
        setTripResponse(response);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to get trip:", err);
        setError("Failed to calculate your trip. Please try again.");
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-primary text-lg">Calculating your trip...</p>
          <p className="text-secondary text-sm">
            Checking real-time MTA data and delays
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-danger/20 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-6 h-6 text-danger"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <p className="text-primary text-lg">{error}</p>
          <Link
            href="/"
            className="inline-block bg-accent hover:bg-accent/90 text-white font-medium py-2 px-6 rounded-xl transition-colors"
          >
            Try Again
          </Link>
        </div>
      </main>
    );
  }

  if (!tripResponse || !tripRequest) {
    return null;
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 border-b border-surface-light">
        <div className="max-w-md mx-auto flex items-center">
          <Link
            href="/"
            className="p-2 -ml-2 text-secondary hover:text-primary transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <h1 className="flex-1 text-center text-lg font-semibold text-primary">
            Trip Results
          </h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Results */}
      <div className="flex-1 px-6 py-6">
        <div className="max-w-md mx-auto">
          <TripResults
            trip={tripResponse}
            origin={tripRequest.origin.name}
            destination={tripRequest.destination.name}
          />
        </div>
      </div>

      {/* Footer Action */}
      <div className="px-6 py-4 border-t border-surface-light">
        <div className="max-w-md mx-auto">
          <Link
            href="/"
            className="block w-full bg-surface hover:bg-surface-light text-primary font-medium py-3 px-6 rounded-xl transition-colors text-center border border-surface-light"
          >
            Plan Another Trip
          </Link>
        </div>
      </div>
    </main>
  );
}
