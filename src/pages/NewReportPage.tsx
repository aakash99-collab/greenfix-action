import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import StepImageUpload from "@/components/report/StepImageUpload";
import StepAIAnalysis from "@/components/report/StepAIAnalysis";
import StepEnvironmentalData from "@/components/report/StepEnvironmentalData";
import StepSolutions from "@/components/report/StepSolutions";
import StepReview from "@/components/report/StepReview";
import { ReportLocation, ReportProblem, EnvironmentalData, Solution } from "@/lib/types";

const STEP_LABELS = ["Upload Images", "AI Analysis", "Environment", "Solutions", "Review & Submit"];

export default function NewReportPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState<ReportLocation | null>(null);
  const [problems, setProblems] = useState<ReportProblem[]>([]);
  const [envData, setEnvData] = useState<EnvironmentalData | null>(null);
  const [solutions, setSolutions] = useState<Solution[]>([]);

  const canNext = () => {
    if (currentStep === 0) return images.length >= 1;
    if (currentStep === 1) return problems.length > 0;
    return true;
  };

  const stepContent = [
    <StepImageUpload key="upload" images={images} setImages={setImages} location={location} setLocation={setLocation} />,
    <StepAIAnalysis key="analysis" images={images} problems={problems} setProblems={setProblems} />,
    <StepEnvironmentalData key="env" location={location} envData={envData} setEnvData={setEnvData} />,
    <StepSolutions key="solutions" problems={problems} solutions={solutions} setSolutions={setSolutions} />,
    <StepReview key="review" images={images} location={location} problems={problems} envData={envData} solutions={solutions} />,
  ];

  return (
    <div className="container max-w-3xl py-8 md:py-12">
      <h1 className="font-display text-3xl font-bold mb-2">New Climate Report</h1>
      <p className="text-muted-foreground mb-8">Document an urban climate issue in your locality</p>

      {/* Step indicator */}
      <div className="mb-8 flex items-center gap-1">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  i < currentStep
                    ? "bg-primary text-primary-foreground"
                    : i === currentStep
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < currentStep ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className="mt-1.5 hidden text-[10px] font-medium text-muted-foreground sm:block">
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div
                className={`mx-1 h-0.5 flex-1 rounded ${
                  i < currentStep ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">{stepContent[currentStep]}</CardContent>
      </Card>

      <div className="mt-6 flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((s) => s - 1)}
          disabled={currentStep === 0}
        >
          Back
        </Button>
        {currentStep < STEP_LABELS.length - 1 ? (
          <Button onClick={() => setCurrentStep((s) => s + 1)} disabled={!canNext()}>
            Continue
          </Button>
        ) : (
          <Button className="gap-2">Submit Report</Button>
        )}
      </div>
    </div>
  );
}
