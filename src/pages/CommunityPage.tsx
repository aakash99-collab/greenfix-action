import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_REPORTS } from "@/lib/mock-data";
import { PROBLEM_LABELS } from "@/lib/types";
import { MapPin, Filter } from "lucide-react";

export default function CommunityPage() {
  const reports = MOCK_REPORTS;
  const totalResolved = reports.filter((r) => r.status === "resolved").length;

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Community Map</h1>
        <p className="mt-1 text-muted-foreground">
          Explore climate reports submitted by citizens across the city
        </p>
      </div>

      {/* Stats bar */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="rounded-lg border bg-card px-4 py-2 text-center">
          <div className="font-display text-2xl font-bold">{reports.length}</div>
          <div className="text-xs text-muted-foreground">Total Reports</div>
        </div>
        <div className="rounded-lg border bg-card px-4 py-2 text-center">
          <div className="font-display text-2xl font-bold">{totalResolved}</div>
          <div className="text-xs text-muted-foreground">Resolved</div>
        </div>
        <div className="rounded-lg border bg-card px-4 py-2 text-center">
          <div className="font-display text-2xl font-bold">
            {reports.reduce((acc, r) => acc + r.problems.length, 0)}
          </div>
          <div className="text-xs text-muted-foreground">Issues Tracked</div>
        </div>
      </div>

      {/* Map placeholder */}
      <Card className="mb-6 overflow-hidden">
        <CardContent className="flex h-72 items-center justify-center bg-muted/50 p-0 md:h-96">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <MapPin className="h-10 w-10" />
            <p className="text-sm font-medium">Interactive Map</p>
            <p className="text-xs">(Leaflet map integration coming soon)</p>
          </div>
        </CardContent>
      </Card>

      {/* Report list */}
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">All Reports</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.id} className="transition-shadow hover:shadow-md">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-semibold">{report.location.address}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(report.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {report.problems.map((p) => (
                  <Badge key={p.type} variant="secondary" className="text-xs">
                    {PROBLEM_LABELS[p.type]}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
