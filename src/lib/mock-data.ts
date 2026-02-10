import { EnvironmentalData, Report, ReportLocation } from "./types";

export function generateMockEnvironmentalData(location: ReportLocation): EnvironmentalData {
  // Deterministic-ish mock based on lat/lng
  const seed = Math.abs(location.lat * 1000 + location.lng * 100) % 100;
  return {
    aqi: 80 + Math.round(seed * 1.5),
    aqiCategory: seed > 60 ? "Unhealthy" : seed > 30 ? "Moderate" : "Good",
    pm25: 35 + Math.round(seed * 0.8),
    pm10: 60 + Math.round(seed * 1.2),
    co2: 400 + Math.round(seed * 3),
    no2: 20 + Math.round(seed * 0.5),
    temperature: 28 + Math.round(seed * 0.1),
    feelsLike: 32 + Math.round(seed * 0.15),
    humidity: 55 + Math.round(seed * 0.3),
    windSpeed: 5 + Math.round(seed * 0.1),
    heatIslandEffect: 2 + Math.round(seed * 0.05),
    urbanHeatIndex: 35 + Math.round(seed * 0.1),
    greenCoverEstimate: Math.max(5, 30 - Math.round(seed * 0.25)),
  };
}

export const MOCK_REPORTS: Report[] = [
  {
    id: "RPT-001",
    location: { lat: 22.5726, lng: 88.3639, address: "Salt Lake, Sector V, Kolkata" },
    images: [],
    problems: [
      { type: "traffic_congestion", severity: "high", aiDetected: true },
      { type: "lack_of_green", severity: "medium", aiDetected: true },
      { type: "poor_drainage", severity: "high", aiDetected: false },
    ],
    environmentalData: generateMockEnvironmentalData({ lat: 22.5726, lng: 88.3639, address: "" }),
    solutions: [],
    reporterName: "Amit Roy",
    reporterEmail: "amit@example.com",
    anonymous: false,
    citizenPledge: true,
    status: "under_review",
    createdAt: "2026-02-05T10:30:00Z",
  },
  {
    id: "RPT-002",
    location: { lat: 22.5448, lng: 88.3426, address: "Park Street, Kolkata" },
    images: [],
    problems: [
      { type: "high_pollution", severity: "critical", aiDetected: true },
      { type: "poor_walkability", severity: "medium", aiDetected: true },
    ],
    environmentalData: generateMockEnvironmentalData({ lat: 22.5448, lng: 88.3426, address: "" }),
    solutions: [],
    reporterName: undefined,
    anonymous: true,
    citizenPledge: true,
    status: "submitted",
    createdAt: "2026-02-08T14:15:00Z",
  },
  {
    id: "RPT-003",
    location: { lat: 22.5626, lng: 88.3510, address: "New Town, Rajarhat, Kolkata" },
    images: [],
    problems: [
      { type: "urban_heat_island", severity: "high", aiDetected: true },
      { type: "ongoing_construction", severity: "medium", aiDetected: true },
      { type: "waste_disposal", severity: "low", aiDetected: false },
    ],
    environmentalData: generateMockEnvironmentalData({ lat: 22.5626, lng: 88.3510, address: "" }),
    solutions: [],
    status: "action_initiated",
    anonymous: false,
    reporterName: "Priya Sen",
    citizenPledge: true,
    createdAt: "2026-01-20T09:00:00Z",
  },
];
