import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PROBLEM_LABELS, ProblemType, ReportProblem, Severity } from "@/lib/types";
import { Cpu, Loader2, Plus, X } from "lucide-react";

interface Props {
  images: string[];
  problems: ReportProblem[];
  setProblems: (p: ReportProblem[]) => void;
}

const ALL_PROBLEMS = Object.keys(PROBLEM_LABELS) as ProblemType[];

export default function StepAIAnalysis({ images, problems, setProblems }: Props) {
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const runAnalysis = async () => {
    setAnalyzing(true);
    // Simulate AI analysis with a delay
    await new Promise((r) => setTimeout(r, 2000));
    const mockDetected: ReportProblem[] = [
      { type: "traffic_congestion", severity: "high", aiDetected: true },
      { type: "lack_of_green", severity: "medium", aiDetected: true },
      { type: "high_pollution", severity: "high", aiDetected: true },
    ];
    setProblems(mockDetected);
    setAnalyzing(false);
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
        <Button onClick={runAnalysis} disabled={analyzing} className="gap-2">
          {analyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Cpu className="h-4 w-4" />}
          {analyzing ? "Analyzing Images..." : "Run AI Analysis"}
        </Button>
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
