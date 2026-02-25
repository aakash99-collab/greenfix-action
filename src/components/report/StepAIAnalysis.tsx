import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PROBLEM_LABELS, ProblemType, ReportProblem, Severity } from "@/lib/types";
import { Cpu, Loader2, Plus, X, AlertTriangle, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

export default function StepAIAnalysis({ images, problems, setProblems }: Props) {
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const { toast } = useToast();

  const MAX_IMAGE_BYTES = 200_000;
  const MAX_TOTAL_BYTES = 900_000;

  const estimateDataUriBytes = (dataUri: string) => {
    const [, base64 = ""] = dataUri.split(",");
    return Math.ceil((base64.length * 3) / 4);
  };

  const resizeAndBase64 = (url: string, maxDim = 1024, quality = 0.7): Promise<string> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          const ratio = Math.min(maxDim / width, maxDim / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = url;
    });

  const compressForPayload = async (url: string) => {
    let maxDim = 1024;
    let quality = 0.7;
    let optimized = await resizeAndBase64(url, maxDim, quality);

    while (estimateDataUriBytes(optimized) > MAX_IMAGE_BYTES && (maxDim > 512 || quality > 0.45)) {
      if (quality > 0.5) {
        quality = Math.max(0.45, Number((quality - 0.1).toFixed(2)));
      } else {
        maxDim = Math.max(512, Math.round(maxDim * 0.85));
        quality = Math.max(0.45, Number((quality - 0.05).toFixed(2)));
      }

      optimized = await resizeAndBase64(url, maxDim, quality);
    }

    return optimized;
  };

  const trimPayloadToLimit = (encodedImages: string[]) => {
    let selected = [...encodedImages];
    let totalBytes = selected.reduce((sum, img) => sum + estimateDataUriBytes(img), 0);

    while (totalBytes > MAX_TOTAL_BYTES && selected.length > 1) {
      selected = selected.slice(0, -1);
      totalBytes = selected.reduce((sum, img) => sum + estimateDataUriBytes(img), 0);
    }

    return { selected, totalBytes };
  };

  const runAnalysis = async () => {
    setAnalyzing(true);
    try {
      const optimizedImages = await Promise.all(images.map((img) => compressForPayload(img)));
      const { selected: payloadImages, totalBytes } = trimPayloadToLimit(optimizedImages);

      if (payloadImages.length === 0 || totalBytes > MAX_TOTAL_BYTES) {
        throw new Error("Images are too large to analyze. Please upload smaller photos.");
      }

      if (payloadImages.length < images.length) {
        toast({
          title: "Images optimized",
          description: `Using ${payloadImages.length} of ${images.length} images for reliable analysis.`,
        });
      }

      const { data, error } = await supabase.functions.invoke("analyze-image", {
        body: { images: payloadImages },
      });

      if (error) throw error;

      const result = data as AIAnalysisResult;
      setAnalysisResult(result);

      // Map AI detected issues to ReportProblems
      const detected: ReportProblem[] = result.detected_issues
        .filter((issue) => ALL_PROBLEMS.includes(issue.problem_type as ProblemType))
        .map((issue) => ({
          type: issue.problem_type as ProblemType,
          severity: SEVERITY_MAP[issue.severity] || "medium",
          aiDetected: true,
        }));

      setProblems(detected);
      setAnalyzed(true);
    } catch (err: any) {
      console.error("Analysis failed:", err);
      toast({
        title: "Analysis failed",
        description: err?.message || "Could not analyze images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAnalyzing(false);
    }
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
