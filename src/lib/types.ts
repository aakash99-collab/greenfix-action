export type ProblemType =
  | "traffic_congestion"
  | "lack_of_green"
  | "urban_heat_island"
  | "visibility_barriers"
  | "poor_signage"
  | "poor_drainage"
  | "no_pedestrian_separation"
  | "waste_disposal"
  | "poor_walkability"
  | "high_pollution"
  | "high_traffic"
  | "ongoing_construction";

export const PROBLEM_LABELS: Record<ProblemType, string> = {
  traffic_congestion: "Traffic Congestion",
  lack_of_green: "Lack of Green Cover",
  urban_heat_island: "Urban Heat Island",
  visibility_barriers: "Visibility Barriers",
  poor_signage: "Poor Signage",
  poor_drainage: "Poor Drainage",
  no_pedestrian_separation: "No Pedestrian-Vehicle Separation",
  waste_disposal: "Waste Disposal Issues",
  poor_walkability: "Poor Walkability",
  high_pollution: "High Pollution",
  high_traffic: "High Traffic Volume",
  ongoing_construction: "Ongoing Construction",
};

export type Severity = "low" | "medium" | "high" | "critical";

export type ReportStatus = "submitted" | "under_review" | "action_initiated" | "resolved";

export interface ReportProblem {
  type: ProblemType;
  severity: Severity;
  aiDetected: boolean;
}

export interface Solution {
  problemType: ProblemType;
  shortTerm: {
    title: string;
    description: string;
    cost: "Low" | "Medium" | "High";
    timeline: string;
    impact: string;
    authority: string;
  };
  longTerm: {
    title: string;
    description: string;
    cost: "Low" | "Medium" | "High";
    timeline: string;
    impact: string;
    authority: string;
  };
}

export interface EnvironmentalData {
  aqi: number;
  aqiCategory: string;
  pm25: number;
  pm10: number;
  co2: number;
  no2: number;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  heatIslandEffect: number;
  urbanHeatIndex: number;
  greenCoverEstimate: number;
}

export interface ReportLocation {
  lat: number;
  lng: number;
  address: string;
}

export interface Report {
  id: string;
  location: ReportLocation;
  images: string[];
  problems: ReportProblem[];
  environmentalData: EnvironmentalData;
  solutions: Solution[];
  reporterName?: string;
  reporterEmail?: string;
  anonymous: boolean;
  citizenPledge: boolean;
  status: ReportStatus;
  createdAt: string;
}
