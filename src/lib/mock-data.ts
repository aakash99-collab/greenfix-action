import { EnvironmentalData, Report, ReportLocation } from "./types";

// Realistic environmental data generation based on lat/lng region characteristics
export function generateMockEnvironmentalData(location: ReportLocation): EnvironmentalData {
  const lat = location.lat;
  const lng = location.lng;

  // Derive a deterministic seed from coordinates
  const seed = Math.abs(Math.sin(lat * 12.9898 + lng * 78.233) * 43758.5453) % 1;

  // Tropical / subtropical regions (closer to equator) → hotter, more humid
  const isTropical = Math.abs(lat) < 25;
  const isUrbanIndia = lat > 8 && lat < 35 && lng > 68 && lng < 97;

  // Base temperature from latitude (rough model)
  const baseTemp = isTropical
    ? 30 + Math.round(seed * 8)       // 30–38°C
    : 15 + Math.round(seed * 15);     // 15–30°C

  // AQI — Indian cities tend higher
  const baseAqi = isUrbanIndia
    ? 120 + Math.round(seed * 180)    // 120–300
    : 30 + Math.round(seed * 120);    // 30–150

  const aqiCategory =
    baseAqi <= 50 ? "Good" :
    baseAqi <= 100 ? "Satisfactory" :
    baseAqi <= 200 ? "Moderate" :
    baseAqi <= 300 ? "Poor" :
    baseAqi <= 400 ? "Very Poor" : "Severe";

  const humidity = isTropical
    ? 60 + Math.round(seed * 30)      // 60–90%
    : 30 + Math.round(seed * 40);     // 30–70%

  const feelsLike = baseTemp + Math.round((humidity / 100) * 6); // heat index approximation

  return {
    aqi: baseAqi,
    aqiCategory,
    pm25: Math.round(baseAqi * (0.3 + seed * 0.3)),
    pm10: Math.round(baseAqi * (0.5 + seed * 0.4)),
    co2: 410 + Math.round(seed * 190),           // 410–600 ppm
    no2: 10 + Math.round(baseAqi * 0.15 * seed), // correlated with AQI
    temperature: baseTemp,
    feelsLike,
    humidity,
    windSpeed: 3 + Math.round(seed * 22),         // 3–25 km/h
    heatIslandEffect: isUrbanIndia ? 2 + Math.round(seed * 5) : 1 + Math.round(seed * 3),
    urbanHeatIndex: feelsLike + Math.round(seed * 4),
    greenCoverEstimate: isUrbanIndia
      ? Math.max(3, 25 - Math.round(seed * 20))   // 3–25% for Indian urban
      : Math.max(10, 40 - Math.round(seed * 25)), // 10–40% elsewhere
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
