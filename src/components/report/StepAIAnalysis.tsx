import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PROBLEM_LABELS, ProblemType, ReportProblem, Severity } from "@/lib/types";
import { Cpu, Plus, X, AlertTriangle, CheckCircle } from "lucide-react";

interface AIAnalysisResult {
  detected_issues: {
    issue: string;
    problem_type: string;
    severity: string;
    environmental_impact_type: string;
    climate_impact_score: number;
  }[];
  overall_climate_impact_score: number;
  suggested_action_plan: string[];
  municipal_intervention_required: string;
  summary: string;
}

interface Props {
  images: string[];
  problems: ReportProblem[];
  setProblems: (p: ReportProblem[]) => void;
}

const ALL_PROBLEMS = Object.keys(PROBLEM_LABELS) as ProblemType[];

const SEVERITY_MAP: Record<string, Severity> = {
  Low: "low",
  Medium: "medium",
  High: "high",
};

const SIMULATED_RESULTS: Record<ProblemType, AIAnalysisResult> = {
  traffic_congestion: {
    detected_issues: [
      { issue: "Heavy vehicle congestion detected", problem_type: "traffic_congestion", severity: "High", environmental_impact_type: "Air Quality", climate_impact_score: 8 },
      { issue: "High pollution from idling vehicles", problem_type: "high_pollution", severity: "Medium", environmental_impact_type: "Emissions", climate_impact_score: 7 },
    ],
    overall_climate_impact_score: 8,
    suggested_action_plan: ["Implement congestion pricing during peak hours", "Add dedicated bus rapid transit lanes", "Install real-time traffic monitoring sensors"],
    municipal_intervention_required: "Yes",
    summary: "Significant traffic congestion contributing to elevated CO₂ and particulate emissions. Immediate traffic management intervention recommended.",
  },
  lack_of_green: {
    detected_issues: [
      { issue: "Minimal tree canopy coverage", problem_type: "lack_of_green", severity: "High", environmental_impact_type: "Urban Ecology", climate_impact_score: 7 },
      { issue: "Urban heat amplification due to bare surfaces", problem_type: "urban_heat_island", severity: "Medium", environmental_impact_type: "Temperature", climate_impact_score: 6 },
    ],
    overall_climate_impact_score: 7,
    suggested_action_plan: ["Plant native shade trees along sidewalks", "Create pocket parks in vacant lots", "Install green roofs on public buildings"],
    municipal_intervention_required: "Yes",
    summary: "Area lacks adequate green cover, increasing surface temperatures and reducing biodiversity. Urban greening program recommended.",
  },
  urban_heat_island: {
    detected_issues: [
      { issue: "Excessive dark pavement absorbing heat", problem_type: "urban_heat_island", severity: "High", environmental_impact_type: "Temperature", climate_impact_score: 9 },
      { issue: "No shading structures present", problem_type: "lack_of_green", severity: "Medium", environmental_impact_type: "Thermal Comfort", climate_impact_score: 6 },
    ],
    overall_climate_impact_score: 9,
    suggested_action_plan: ["Apply cool-pavement coatings to roads", "Install shade canopies at bus stops and walkways", "Mandate reflective roofing materials for new construction"],
    municipal_intervention_required: "Yes",
    summary: "Strong urban heat island effect detected. Surface temperatures significantly exceed surrounding areas. Cool infrastructure measures are critical.",
  },
  visibility_barriers: {
    detected_issues: [
      { issue: "Obstructed sightlines at intersection", problem_type: "visibility_barriers", severity: "Medium", environmental_impact_type: "Safety", climate_impact_score: 4 },
    ],
    overall_climate_impact_score: 4,
    suggested_action_plan: ["Trim overgrown vegetation near intersections", "Relocate signage blocking driver sightlines", "Install convex mirrors at blind corners"],
    municipal_intervention_required: "No",
    summary: "Visibility barriers detected that may compromise pedestrian and driver safety. Moderate intervention needed.",
  },
  poor_signage: {
    detected_issues: [
      { issue: "Missing or faded road signage", problem_type: "poor_signage", severity: "Low", environmental_impact_type: "Safety", climate_impact_score: 3 },
    ],
    overall_climate_impact_score: 3,
    suggested_action_plan: ["Replace faded signs with reflective materials", "Add multilingual directional signage", "Install digital information boards at key junctions"],
    municipal_intervention_required: "No",
    summary: "Signage in the area is inadequate or deteriorated. Replacement and standardization recommended.",
  },
  poor_drainage: {
    detected_issues: [
      { issue: "Waterlogging on road surface", problem_type: "poor_drainage", severity: "High", environmental_impact_type: "Water Management", climate_impact_score: 7 },
    ],
    overall_climate_impact_score: 7,
    suggested_action_plan: ["Clear blocked storm drains", "Install permeable pavement in flood-prone zones", "Build bioswales along roadways for natural water absorption"],
    municipal_intervention_required: "Yes",
    summary: "Poor drainage infrastructure leading to waterlogging and potential flooding risk. Immediate drainage improvements required.",
  },
  no_pedestrian_separation: {
    detected_issues: [
      { issue: "No sidewalk or pedestrian barrier", problem_type: "no_pedestrian_separation", severity: "High", environmental_impact_type: "Safety", climate_impact_score: 5 },
    ],
    overall_climate_impact_score: 5,
    suggested_action_plan: ["Construct raised sidewalks with curb separation", "Install bollards to protect pedestrian zones", "Add pedestrian crossing signals at major intersections"],
    municipal_intervention_required: "Yes",
    summary: "Pedestrians share road space with vehicles without any separation, creating significant safety risks.",
  },
  waste_disposal: {
    detected_issues: [
      { issue: "Improper waste accumulation on streets", problem_type: "waste_disposal", severity: "Medium", environmental_impact_type: "Sanitation", climate_impact_score: 6 },
    ],
    overall_climate_impact_score: 6,
    suggested_action_plan: ["Increase waste collection frequency", "Install segregated waste bins every 100 meters", "Launch community awareness campaigns on waste segregation"],
    municipal_intervention_required: "Yes",
    summary: "Waste disposal issues detected contributing to unsanitary conditions and potential groundwater contamination.",
  },
  poor_walkability: {
    detected_issues: [
      { issue: "Broken or uneven footpaths", problem_type: "poor_walkability", severity: "Medium", environmental_impact_type: "Accessibility", climate_impact_score: 4 },
    ],
    overall_climate_impact_score: 4,
    suggested_action_plan: ["Repair and level damaged footpaths", "Add tactile paving for visually impaired pedestrians", "Widen sidewalks to meet accessibility standards"],
    municipal_intervention_required: "No",
    summary: "Walkability is compromised by uneven surfaces and narrow pathways. Improvements needed for accessibility compliance.",
  },
  high_pollution: {
    detected_issues: [
      { issue: "Elevated particulate matter levels", problem_type: "high_pollution", severity: "High", environmental_impact_type: "Air Quality", climate_impact_score: 9 },
      { issue: "Visible smog and haze", problem_type: "high_pollution", severity: "High", environmental_impact_type: "Health", climate_impact_score: 8 },
    ],
    overall_climate_impact_score: 9,
    suggested_action_plan: ["Enforce emission standards for vehicles", "Install air quality monitoring stations", "Promote electric vehicle adoption with charging infrastructure"],
    municipal_intervention_required: "Yes",
    summary: "Dangerously high pollution levels detected. Immediate public health and emission control measures are essential.",
  },
  high_traffic: {
    detected_issues: [
      { issue: "Excessive vehicle volume on local roads", problem_type: "high_traffic", severity: "Medium", environmental_impact_type: "Noise & Emissions", climate_impact_score: 6 },
    ],
    overall_climate_impact_score: 6,
    suggested_action_plan: ["Implement traffic calming measures", "Create alternative bypass routes", "Promote cycling infrastructure to reduce car dependency"],
    municipal_intervention_required: "No",
    summary: "High traffic volume contributing to noise pollution and elevated emissions. Traffic redistribution strategies recommended.",
  },
  ongoing_construction: {
    detected_issues: [
      { issue: "Construction dust and debris on roadway", problem_type: "ongoing_construction", severity: "Medium", environmental_impact_type: "Air Quality", climate_impact_score: 5 },
    ],
    overall_climate_impact_score: 5,
    suggested_action_plan: ["Mandate dust suppression measures at construction sites", "Erect barriers to contain debris", "Schedule heavy machinery work outside peak hours"],
    municipal_intervention_required: "No",
    summary: "Ongoing construction activity generating dust and temporary traffic disruption. Standard mitigation measures should be enforced.",
  },
};

const DEFAULT_RESULT: AIAnalysisResult = {
  detected_issues: [
    { issue: "General urban climate concern detected", problem_type: "urban_heat_island", severity: "Medium", environmental_impact_type: "Climate", climate_impact_score: 5 },
    { issue: "Insufficient green infrastructure", problem_type: "lack_of_green", severity: "Medium", environmental_impact_type: "Urban Ecology", climate_impact_score: 5 },
  ],
  overall_climate_impact_score: 5,
  suggested_action_plan: ["Conduct detailed environmental assessment", "Engage community stakeholders for feedback", "Develop a phased improvement plan"],
  municipal_intervention_required: "No",
  summary: "General urban climate issues identified. A detailed site assessment is recommended to determine specific interventions.",
};

export default function StepAIAnalysis({ images, problems, setProblems }: Props) {
  const [analyzed, setAnalyzed] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);

  const runAnalysis = () => {
    // Pick the first existing problem type as category hint, or use default
    const hintType = problems.length > 0 ? problems[0].type : null;
    const result = hintType && SIMULATED_RESULTS[hintType] ? SIMULATED_RESULTS[hintType] : DEFAULT_RESULT;

    setAnalysisResult(result);

    const detected: ReportProblem[] = result.detected_issues
      .filter((issue) => ALL_PROBLEMS.includes(issue.problem_type as ProblemType))
      .map((issue) => ({
        type: issue.problem_type as ProblemType,
        severity: SEVERITY_MAP[issue.severity] || "medium",
        aiDetected: true,
      }));

    setProblems(detected);
    setAnalyzed(true);
  };

  const toggleProblem = (type: ProblemType) => {
    const exists = problems.find((p) => p.type === type);
    if (exists) {
      setProblems(problems.filter((p) => p.type !== type));
    } else {
      setProblems([...problems, { type, severity: "medium" as Severity, aiDetected: false }]);
    }
  };

  const removeProblem = (type: ProblemType) => {
    setProblems(problems.filter((p) => p.type !== type));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-lg font-semibold mb-1">AI-Powered Analysis</h3>
        <p className="text-sm text-muted-foreground">
          Our AI will analyze your images to detect urban climate issues. You can confirm, remove, or add more.
        </p>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto">
        {images.map((src, i) => (
          <img key={i} src={src} alt={`Upload ${i + 1}`} className="h-16 w-16 rounded-md border object-cover" />
        ))}
      </div>

      {!analyzed && (
        <Button onClick={runAnalysis} className="gap-2">
          <Cpu className="h-4 w-4" />
          Run AI Analysis
        </Button>
      )}

      {/* AI Summary Card */}
      {analysisResult && (
        <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
          <p className="text-sm font-medium">{analysisResult.summary}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="font-medium">Climate Impact:</span>
              <Badge variant={analysisResult.overall_climate_impact_score >= 7 ? "destructive" : "secondary"}>
                {analysisResult.overall_climate_impact_score}/10
              </Badge>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-medium">Municipal Intervention:</span>
              {analysisResult.municipal_intervention_required === "Yes" ? (
                <Badge variant="destructive" className="gap-1">
                  <AlertTriangle className="h-3 w-3" /> Required
                </Badge>
              ) : (
                <Badge variant="secondary" className="gap-1">
                  <CheckCircle className="h-3 w-3" /> Not Required
                </Badge>
              )}
            </div>
          </div>
          {analysisResult.suggested_action_plan.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Action Plan:</p>
              <ul className="text-xs text-muted-foreground space-y-0.5 list-disc list-inside">
                {analysisResult.suggested_action_plan.map((action, i) => (
                  <li key={i}>{action}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {problems.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium">Detected Issues:</p>
          <div className="flex flex-wrap gap-2">
            {problems.map((p) => (
              <Badge
                key={p.type}
                variant="outline"
                className={`gap-1 py-1.5 px-3 ${
                  p.aiDetected ? "border-primary/50 bg-primary/5" : "border-border"
                }`}
              >
                {p.aiDetected && <Cpu className="h-3 w-3 text-primary" />}
                {PROBLEM_LABELS[p.type]}
                <button onClick={() => removeProblem(p.type)} className="ml-1 hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {analyzed && (
        <div className="space-y-3 border-t pt-4">
          <p className="text-sm font-medium">Add more issues manually:</p>
          <div className="flex flex-wrap gap-2">
            {ALL_PROBLEMS.filter((pt) => !problems.find((p) => p.type === pt)).map((pt) => (
              <Button
                key={pt}
                variant="outline"
                size="sm"
                className="gap-1 text-xs"
                onClick={() => toggleProblem(pt)}
              >
                <Plus className="h-3 w-3" /> {PROBLEM_LABELS[pt]}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
