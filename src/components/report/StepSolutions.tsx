import { useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PROBLEM_LABELS, ReportProblem, Solution } from "@/lib/types";
import { getSolutionsForProblems } from "@/lib/solutions-data";
import { Lightbulb } from "lucide-react";

interface Props {
  problems: ReportProblem[];
  solutions: Solution[];
  setSolutions: (s: Solution[]) => void;
}

export default function StepSolutions({ problems, solutions, setSolutions }: Props) {
  useEffect(() => {
    if (problems.length > 0 && solutions.length === 0) {
      setSolutions(getSolutionsForProblems(problems.map((p) => p.type)));
    }
  }, [problems, solutions.length, setSolutions]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-lg font-semibold mb-1 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" /> Recommended Solutions
        </h3>
        <p className="text-sm text-muted-foreground">
          Nature-based and tactical urbanism solutions for each detected problem
        </p>
      </div>

      <Accordion type="multiple" defaultValue={solutions.map((s) => s.problemType)} className="space-y-2">
        {solutions.map((sol) => (
          <AccordionItem key={sol.problemType} value={sol.problemType} className="rounded-lg border bg-card px-4">
            <AccordionTrigger className="hover:no-underline">
              <span className="font-display font-semibold">{PROBLEM_LABELS[sol.problemType]}</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4 md:grid-cols-2 pb-2">
                <Card className="border-none bg-primary/5 shadow-none">
                  <CardHeader className="pb-2">
                    <Badge className="w-fit bg-primary/10 text-primary border-primary/20" variant="outline">
                      Short-term
                    </Badge>
                    <CardTitle className="text-base">{sol.shortTerm.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-1">
                    <p>{sol.shortTerm.description}</p>
                    <p>💰 Cost: {sol.shortTerm.cost} · ⏱ {sol.shortTerm.timeline}</p>
                    <p>📊 {sol.shortTerm.impact}</p>
                    <p>🏛 {sol.shortTerm.authority}</p>
                  </CardContent>
                </Card>
                <Card className="border-none bg-accent shadow-none">
                  <CardHeader className="pb-2">
                    <Badge className="w-fit" variant="outline">Long-term</Badge>
                    <CardTitle className="text-base">{sol.longTerm.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-1">
                    <p>{sol.longTerm.description}</p>
                    <p>💰 Cost: {sol.longTerm.cost} · ⏱ {sol.longTerm.timeline}</p>
                    <p>📊 {sol.longTerm.impact}</p>
                    <p>🏛 {sol.longTerm.authority}</p>
                  </CardContent>
                </Card>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
