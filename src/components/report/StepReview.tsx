import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PROBLEM_LABELS, ReportLocation, ReportProblem, EnvironmentalData, Solution } from "@/lib/types";
import { MapPin, FileText, User, Shield } from "lucide-react";

interface Props {
  images: string[];
  location: ReportLocation | null;
  problems: ReportProblem[];
  envData: EnvironmentalData | null;
  solutions: Solution[];
}

export default function StepReview({ images, location, problems, envData, solutions }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [pledge, setPledge] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-lg font-semibold mb-1 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" /> Review & Submit
        </h3>
        <p className="text-sm text-muted-foreground">
          Review your report before submitting to local authorities
        </p>
      </div>

      {/* Summary */}
      <div className="space-y-4">
        {/* Location */}
        {location && (
          <Card className="border-none bg-muted/50 shadow-none">
            <CardContent className="p-4 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm">
                {location.address || `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`}
              </span>
            </CardContent>
          </Card>
        )}

        {/* Images */}
        <div className="flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <img key={i} src={src} alt={`Photo ${i + 1}`} className="h-20 w-20 rounded-lg border object-cover" />
          ))}
        </div>

        {/* Problems */}
        <div>
          <p className="text-sm font-medium mb-2">Issues Identified ({problems.length})</p>
          <div className="flex flex-wrap gap-1.5">
            {problems.map((p) => (
              <Badge key={p.type} variant="secondary">{PROBLEM_LABELS[p.type]}</Badge>
            ))}
          </div>
        </div>

        {/* Env data summary */}
        {envData && (
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div className="rounded-lg border p-2">
              <div className="font-bold">{envData.aqi}</div>
              <div className="text-xs text-muted-foreground">AQI</div>
            </div>
            <div className="rounded-lg border p-2">
              <div className="font-bold">{envData.temperature}°C</div>
              <div className="text-xs text-muted-foreground">Temp</div>
            </div>
            <div className="rounded-lg border p-2">
              <div className="font-bold">{envData.greenCoverEstimate}%</div>
              <div className="text-xs text-muted-foreground">Green Cover</div>
            </div>
          </div>
        )}

        {/* Solutions count */}
        <p className="text-sm text-muted-foreground">
          💡 {solutions.length} solution recommendations generated
        </p>
      </div>

      {/* Reporter Info */}
      <div className="space-y-4 border-t pt-4">
        <h4 className="font-display font-semibold flex items-center gap-2">
          <User className="h-4 w-4 text-primary" /> Reporter Information
        </h4>

        <div className="flex items-center gap-2">
          <Checkbox
            id="anonymous"
            checked={anonymous}
            onCheckedChange={(v) => setAnonymous(v as boolean)}
          />
          <Label htmlFor="anonymous" className="text-sm">Submit anonymously</Label>
        </div>

        {!anonymous && (
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="name" className="text-xs">Name</Label>
              <Input id="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="email" className="text-xs">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
        )}
      </div>

      {/* Citizen Pledge */}
      <div className="rounded-lg border bg-primary/5 p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            id="pledge"
            checked={pledge}
            onCheckedChange={(v) => setPledge(v as boolean)}
            className="mt-0.5"
          />
          <div>
            <Label htmlFor="pledge" className="text-sm font-medium flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-primary" /> Citizen Pledge
            </Label>
            <p className="mt-1 text-xs text-muted-foreground">
              "I verify this report is factual and based on personal observation. I pledge to support climate action in my community."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
