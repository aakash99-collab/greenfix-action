import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PROBLEM_LABELS, ProblemType, ReportProblem, Severity } from "@/lib/types";
import { generateMultiProblemAnalysis, AnalysisResult } from "@/lib/analysis-engine";
import { Cpu, Plus, X, AlertTriangle, CheckCircle } from "lucide-react";

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

export default function StepAIAnalysis({ images, problems, setProblems }: Props) {
  const [analyzed, setAnalyzed] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const runAnalysis = () => {
    const inputProblems = problems.length > 0
      ? problems.map((p) => ({ type: p.type, severity: p.severity }))
      : [{ type: "urban_heat_island" as ProblemType, severity: "medium" as Severity }];

    const result = generateMultiProblemAnalysis(inputProblems);
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
