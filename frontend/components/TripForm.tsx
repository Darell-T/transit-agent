"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TripForm() {
  const router = useRouter();
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [arriveBy, setArriveBy] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setOrigin(
          `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
        );
        setIsLocating(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to get your location. Please enter it manually.");
        setIsLocating(false);
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Store form data in sessionStorage for the results page
    const tripData = {
      origin: {
        lat: 40.6872,
        lng: -73.9418,
        name: origin || "My Location",
      },
      destination: {
        lat: 40.7484,
        lng: -73.9857,
        name: destination,
      },
      arrive_by: new Date(arriveBy).toISOString(),
    };

    sessionStorage.setItem("tripRequest", JSON.stringify(tripData));
    router.push("/results");
  };

  // Set default time to 1 hour from now
  const getDefaultTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    now.setMinutes(0);
    return now.toISOString().slice(0, 16);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Origin Input */}
      <div className="space-y-2">
        <label htmlFor="origin" className="block text-primary font-medium">
          Where are you?
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Enter starting location"
            className="flex-1 bg-surface border border-surface-light rounded-xl px-4 py-3 text-primary placeholder-secondary focus:outline-none focus:border-accent transition-colors"
          />
          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={isLocating}
            className="px-4 py-3 bg-surface border border-surface-light rounded-xl text-secondary hover:text-primary hover:border-accent transition-colors disabled:opacity-50"
          >
            {isLocating ? (
              <svg
                className="w-5 h-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Destination Input */}
      <div className="space-y-2">
        <label
          htmlFor="destination"
          className="block text-primary font-medium"
        >
          Where are you going?
        </label>
        <input
          type="text"
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter destination"
          required
          className="w-full bg-surface border border-surface-light rounded-xl px-4 py-3 text-primary placeholder-secondary focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {/* Arrive By Input */}
      <div className="space-y-2">
        <label htmlFor="arriveBy" className="block text-primary font-medium">
          When do you need to arrive?
        </label>
        <input
          type="datetime-local"
          id="arriveBy"
          value={arriveBy}
          onChange={(e) => setArriveBy(e.target.value)}
          min={new Date().toISOString().slice(0, 16)}
          defaultValue={getDefaultTime()}
          required
          className="w-full bg-surface border border-surface-light rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-4 px-6 rounded-xl transition-colors text-lg"
      >
        Check My Trip
      </button>
    </form>
  );
}
