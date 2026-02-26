export interface Location {
  lat: number;
  lng: number;
  name: string;
}

export interface TripRequest {
  origin: Location;
  destination: Location;
  arrive_by: string;
}

export interface RouteLeg {
  type: "transit" | "transfer" | "walk";
  line?: string;
  from: string;
  to: string;
  duration_min: number;
  delay_min?: number;
}

export interface Route {
  legs: RouteLeg[];
  total_duration_min: number;
}

export interface Alternative {
  summary: string;
  leave_by: string;
  estimated_arrival: string;
  confidence: number;
}

export interface Recommendation {
  leave_by: string;
  estimated_arrival: string;
  status: "on_time" | "cutting_it_close" | "late";
  confidence: number;
  explanation: string;
}

export interface TripResponse {
  recommendation: Recommendation;
  route: Route;
  alternatives: Alternative[];
}

export type SubwayLine =
  | "A"
  | "C"
  | "E"
  | "B"
  | "D"
  | "F"
  | "M"
  | "G"
  | "J"
  | "Z"
  | "L"
  | "N"
  | "Q"
  | "R"
  | "W"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "S";

export const lineColors: Record<string, string> = {
  A: "#2850AD",
  C: "#2850AD",
  E: "#2850AD",
  B: "#FF6319",
  D: "#FF6319",
  F: "#FF6319",
  M: "#FF6319",
  G: "#6CBE45",
  J: "#996633",
  Z: "#996633",
  L: "#A7A9AC",
  N: "#FCCC0A",
  Q: "#FCCC0A",
  R: "#FCCC0A",
  W: "#FCCC0A",
  "1": "#EE352E",
  "2": "#EE352E",
  "3": "#EE352E",
  "4": "#00933C",
  "5": "#00933C",
  "6": "#00933C",
  "7": "#B933AD",
  S: "#808183",
};
