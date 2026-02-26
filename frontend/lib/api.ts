import { TripRequest, TripResponse } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Mock data for development - matches the API contract
const mockTripResponse: TripResponse = {
  recommendation: {
    leave_by: new Date(Date.now() + 18 * 60 * 1000).toISOString(),
    estimated_arrival: new Date(Date.now() + 52 * 60 * 1000).toISOString(),
    status: "on_time",
    confidence: 0.85,
    explanation:
      "Take the G to Atlantic Ave, transfer to the B/D to 34th St. The G is running about 4 minutes behind schedule due to signal issues near Hoyt-Schermerhorn, but you still have an 18-minute buffer.",
  },
  route: {
    legs: [
      {
        type: "transit",
        line: "G",
        from: "Bedford-Nostrand",
        to: "Atlantic Ave-Barclays",
        duration_min: 12,
        delay_min: 4,
      },
      {
        type: "transfer",
        from: "G platform",
        to: "B/D platform",
        duration_min: 5,
      },
      {
        type: "transit",
        line: "B",
        from: "Atlantic Ave-Barclays",
        to: "34 St-Herald Sq",
        duration_min: 18,
        delay_min: 0,
      },
    ],
    total_duration_min: 35,
  },
  alternatives: [
    {
      summary: "Take the G to Fulton St, transfer to the 2/3",
      leave_by: new Date(Date.now() + 22 * 60 * 1000).toISOString(),
      estimated_arrival: new Date(Date.now() + 55 * 60 * 1000).toISOString(),
      confidence: 0.78,
    },
    {
      summary: "Take the G to Hoyt-Schermerhorn, transfer to the A/C",
      leave_by: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
      estimated_arrival: new Date(Date.now() + 50 * 60 * 1000).toISOString(),
      confidence: 0.72,
    },
  ],
};

const mockLateResponse: TripResponse = {
  recommendation: {
    leave_by: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    estimated_arrival: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
    status: "late",
    confidence: 0.92,
    explanation:
      "Unfortunately, you'll likely be about 15 minutes late. The L train is experiencing significant delays due to a sick passenger at Bedford Ave. Consider the alternative route via the G train, or adjust your arrival expectations.",
  },
  route: {
    legs: [
      {
        type: "walk",
        from: "Your Location",
        to: "Bedford Ave L",
        duration_min: 5,
      },
      {
        type: "transit",
        line: "L",
        from: "Bedford Ave",
        to: "14 St-Union Sq",
        duration_min: 20,
        delay_min: 12,
      },
      {
        type: "transfer",
        from: "L platform",
        to: "4/5/6 platform",
        duration_min: 4,
      },
      {
        type: "transit",
        line: "6",
        from: "14 St-Union Sq",
        to: "Grand Central-42 St",
        duration_min: 8,
        delay_min: 0,
      },
    ],
    total_duration_min: 49,
  },
  alternatives: [
    {
      summary: "Walk to Lorimer St and take the G to Court Sq, transfer to 7",
      leave_by: new Date(Date.now() + 2 * 60 * 1000).toISOString(),
      estimated_arrival: new Date(Date.now() + 48 * 60 * 1000).toISOString(),
      confidence: 0.81,
    },
  ],
};

const mockCuttingItCloseResponse: TripResponse = {
  recommendation: {
    leave_by: new Date(Date.now() + 3 * 60 * 1000).toISOString(),
    estimated_arrival: new Date(Date.now() + 58 * 60 * 1000).toISOString(),
    status: "cutting_it_close",
    confidence: 0.68,
    explanation:
      "You should make it, but it'll be tight. The 2/3 trains are running with minor delays due to crew availability. Leave within the next 3 minutes to stay on schedule. If you miss this window, take the express bus as a backup.",
  },
  route: {
    legs: [
      {
        type: "walk",
        from: "Your Location",
        to: "Nostrand Ave",
        duration_min: 8,
      },
      {
        type: "transit",
        line: "3",
        from: "Nostrand Ave",
        to: "14 St-7 Ave",
        duration_min: 25,
        delay_min: 3,
      },
      {
        type: "transfer",
        from: "2/3 platform",
        to: "L platform",
        duration_min: 3,
      },
      {
        type: "transit",
        line: "L",
        from: "14 St-7 Ave",
        to: "6 Ave",
        duration_min: 4,
        delay_min: 0,
      },
    ],
    total_duration_min: 43,
  },
  alternatives: [
    {
      summary: "Take the B44 bus to Atlantic Ave, then the D train",
      leave_by: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
      estimated_arrival: new Date(Date.now() + 62 * 60 * 1000).toISOString(),
      confidence: 0.75,
    },
  ],
};

// Use different mock responses based on a simple hash of the destination
function getMockResponse(request: TripRequest): TripResponse {
  const hash = request.destination.name.length % 3;
  switch (hash) {
    case 0:
      return mockTripResponse;
    case 1:
      return mockCuttingItCloseResponse;
    case 2:
      return mockLateResponse;
    default:
      return mockTripResponse;
  }
}

export async function getTrip(request: TripRequest): Promise<TripResponse> {
  // For development, return mock data
  // In production, this would hit the actual API
  const useMockData = true;

  if (useMockData) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return getMockResponse(request);
  }

  const response = await fetch(`${API_BASE_URL}/api/trip`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch trip data");
  }

  return response.json();
}

export async function getAlerts(lines: string[]): Promise<unknown> {
  const useMockData = true;

  if (useMockData) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      alerts: [
        {
          line: "G",
          title: "Service Change",
          description:
            "G trains are running with delays due to signal problems.",
          severity: "moderate",
        },
      ],
    };
  }

  const response = await fetch(
    `${API_BASE_URL}/api/alerts?lines=${lines.join(",")}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch alerts");
  }

  return response.json();
}
