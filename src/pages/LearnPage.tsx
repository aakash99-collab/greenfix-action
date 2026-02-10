import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PROBLEM_LABELS, ProblemType } from "@/lib/types";
import { SOLUTIONS_MAP } from "@/lib/solutions-data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink } from "lucide-react";

const PROBLEM_TYPES = Object.keys(SOLUTIONS_MAP) as ProblemType[];

const RESOURCES = [
  { title: "UN Habitat — Urban Acupuncture Framework", url: "https://unhabitat.org" },
  { title: "IPCC Urban Climate Adaptation Guidelines", url: "https://www.ipcc.ch" },
  { title: "Tactical Urbanism Guide — Mike Lydon", url: "https://tacticalurbanismguide.com" },
  { title: "India's Smart Cities Mission", url: "https://smartcities.gov.in" },
];

export default function LearnPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Learn About Climate Solutions</h1>
        <p className="mt-1 text-muted-foreground">
          Understand urban climate problems and nature-based solutions you can advocate for
        </p>
      </div>

      {/* Problem-Solution Reference */}
      <div className="mb-12">
        <h2 className="font-display text-xl font-bold mb-4">Problem ↔ Solution Reference</h2>
        <Accordion type="multiple" className="space-y-2">
          {PROBLEM_TYPES.map((pt) => {
            const sol = SOLUTIONS_MAP[pt];
            return (
              <AccordionItem key={pt} value={pt} className="rounded-lg border bg-card px-4">
                <AccordionTrigger className="hover:no-underline">
                  <span className="font-display font-semibold">{PROBLEM_LABELS[pt]}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 md:grid-cols-2 pb-2">
                    <Card className="border-none bg-primary/5 shadow-none">
                      <CardHeader className="pb-2">
                        <Badge className="w-fit bg-primary/10 text-primary border-primary/20" variant="outline">Short-term</Badge>
                        <CardTitle className="text-base">{sol.shortTerm.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground space-y-1">
                        <p>{sol.shortTerm.description}</p>
                        <p>💰 Cost: {sol.shortTerm.cost} · ⏱ {sol.shortTerm.timeline}</p>
                        <p>📊 Impact: {sol.shortTerm.impact}</p>
                        <p>🏛 Authority: {sol.shortTerm.authority}</p>
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
                        <p>📊 Impact: {sol.longTerm.impact}</p>
                        <p>🏛 Authority: {sol.longTerm.authority}</p>
                      </CardContent>
                    </Card>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      {/* Resources */}
      <div>
        <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" /> Resources & Further Reading
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {RESOURCES.map((res) => (
            <a
              key={res.title}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-lg border bg-card p-4 transition-colors hover:border-primary/50"
            >
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary" />
              <span className="text-sm font-medium group-hover:text-primary">{res.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
