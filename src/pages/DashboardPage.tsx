import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_REPORTS } from "@/lib/mock-data";
import { PROBLEM_LABELS, ReportStatus } from "@/lib/types";
import { MapPin, Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const STATUS_CONFIG: Record<ReportStatus, { label: string; className: string }> = {
  submitted: { label: "Submitted", className: "bg-info/10 text-info border-info/20" },
  under_review: { label: "Under Review", className: "bg-warning/10 text-warning border-warning/20" },
  action_initiated: { label: "Action Initiated", className: "bg-primary/10 text-primary border-primary/20" },
  resolved: { label: "Resolved", className: "bg-success/10 text-success border-success/20" },
};

export default function DashboardPage() {
  const reports = MOCK_REPORTS;

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">My Reports</h1>
        <p className="mt-1 text-muted-foreground">Track the status of your submitted climate reports</p>
      </div>

      {reports.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-muted-foreground">You haven't submitted any reports yet.</p>
            <Button asChild className="mt-4">
              <a href="/report/new">Create Your First Report</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {reports.map((report) => {
            const statusCfg = STATUS_CONFIG[report.status];
            return (
              <Card key={report.id} className="transition-shadow hover:shadow-md">
                <CardHeader className="flex flex-row items-start justify-between gap-4 pb-2">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-mono font-semibold text-foreground">{report.id}</span>
                      <Badge variant="outline" className={statusCfg.className}>
                        {statusCfg.label}
                      </Badge>
                    </div>
                    <CardTitle className="mt-1 flex items-center gap-2 text-base">
                      <MapPin className="h-4 w-4 text-primary" />
                      {report.location.address}
                    </CardTitle>
                  </div>
                  <Button variant="ghost" size="icon" aria-label="View report">
                    <Eye className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {report.problems.map((p) => (
                      <Badge key={p.type} variant="secondary" className="text-xs">
                        {PROBLEM_LABELS[p.type]}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(report.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
