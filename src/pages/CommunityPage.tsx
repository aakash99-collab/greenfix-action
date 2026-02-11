import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_REPORTS } from "@/lib/mock-data";
import { PROBLEM_LABELS, type Severity } from "@/lib/types";
import { MapPin, Filter } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const SEVERITY_COLORS: Record<Severity, string> = {
  low: "#22c55e",
  medium: "#eab308",
  high: "#f97316",
  critical: "#ef4444",
};

function getWorstSeverity(problems: { severity: Severity }[]): Severity {
  const order: Severity[] = ["critical", "high", "medium", "low"];
  for (const s of order) {
    if (problems.some((p) => p.severity === s)) return s;
  }
  return "low";
}

function createColorIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="width:24px;height:24px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,.35);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -14],
  });
}

export default function CommunityPage() {
  const reports = MOCK_REPORTS;
  const totalResolved = reports.filter((r) => r.status === "resolved").length;
  const center: [number, number] = [
    reports.reduce((a, r) => a + r.location.lat, 0) / reports.length,
    reports.reduce((a, r) => a + r.location.lng, 0) / reports.length,
  ];

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView(center, 13);
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    reports.forEach((report) => {
      const worst = getWorstSeverity(report.problems);
      const marker = L.marker([report.location.lat, report.location.lng], {
        icon: createColorIcon(SEVERITY_COLORS[worst]),
      }).addTo(map);

      const dateStr = new Date(report.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      const labels = report.problems
        .map(
          (p) =>
            `<span style="display:inline-block;background:#f1f5f9;border-radius:4px;padding:1px 6px;font-size:10px;font-weight:500;margin:2px 2px 0 0;">${PROBLEM_LABELS[p.type]}</span>`
        )
        .join("");

      marker.bindPopup(
        `<div style="min-width:180px"><p style="font-weight:600;font-size:13px;margin:0">${report.location.address}</p><p style="font-size:11px;color:#6b7280;margin:2px 0 6px">${dateStr}</p><div>${labels}</div></div>`
      );
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

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

      {/* Interactive Leaflet Map */}
      <Card className="mb-6 overflow-hidden">
        <CardContent className="h-72 p-0 md:h-96">
          <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
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
