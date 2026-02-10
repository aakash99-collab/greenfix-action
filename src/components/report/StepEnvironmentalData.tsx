import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReportLocation, EnvironmentalData } from "@/lib/types";
import { generateMockEnvironmentalData } from "@/lib/mock-data";
import { Thermometer, Wind, Droplets, Leaf, Activity } from "lucide-react";

interface Props {
  location: ReportLocation | null;
  envData: EnvironmentalData | null;
  setEnvData: (d: EnvironmentalData) => void;
}

function aqiColor(aqi: number) {
  if (aqi <= 50) return "text-severity-good";
  if (aqi <= 100) return "text-severity-moderate";
  if (aqi <= 150) return "text-severity-concerning";
  return "text-severity-critical";
}

export default function StepEnvironmentalData({ location, envData, setEnvData }: Props) {
  useEffect(() => {
    if (location && !envData) {
      setEnvData(generateMockEnvironmentalData(location));
    }
  }, [location, envData, setEnvData]);

  if (!envData) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        <p>Location data needed to display environmental metrics.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-lg font-semibold mb-1">Environmental Data</h3>
        <p className="text-sm text-muted-foreground">
          Real-time environmental metrics for your reported location (mock data — ready for live API swap)
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* AQI Card */}
        <Card className="border-none bg-primary/5 shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="h-4 w-4 text-primary" /> Air Quality Index
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className={`font-display text-4xl font-extrabold ${aqiColor(envData.aqi)}`}>
                {envData.aqi}
              </span>
              <Badge variant="outline" className="text-xs">{envData.aqiCategory}</Badge>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div>PM2.5: <span className="font-semibold text-foreground">{envData.pm25} μg/m³</span></div>
              <div>PM10: <span className="font-semibold text-foreground">{envData.pm10} μg/m³</span></div>
              <div>CO₂: <span className="font-semibold text-foreground">{envData.co2} ppm</span></div>
              <div>NO₂: <span className="font-semibold text-foreground">{envData.no2} ppb</span></div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Card */}
        <Card className="border-none bg-accent shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Thermometer className="h-4 w-4 text-primary" /> Weather Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl font-extrabold">{envData.temperature}°C</span>
              <span className="text-sm text-muted-foreground">Feels {envData.feelsLike}°C</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Droplets className="h-3.5 w-3.5" /> Humidity: <span className="font-semibold text-foreground">{envData.humidity}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Wind className="h-3.5 w-3.5" /> Wind: <span className="font-semibold text-foreground">{envData.windSpeed} km/h</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Climate Stress */}
        <Card className="border-none bg-muted/50 shadow-none sm:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Leaf className="h-4 w-4 text-primary" /> Climate Stress Indicators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-display text-2xl font-bold text-severity-concerning">
                  +{envData.heatIslandEffect}°C
                </div>
                <div className="text-xs text-muted-foreground">Heat Island Effect</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold">{envData.urbanHeatIndex}</div>
                <div className="text-xs text-muted-foreground">Urban Heat Index</div>
              </div>
              <div>
                <div className={`font-display text-2xl font-bold ${envData.greenCoverEstimate < 15 ? "text-severity-critical" : "text-severity-good"}`}>
                  {envData.greenCoverEstimate}%
                </div>
                <div className="text-xs text-muted-foreground">Green Cover</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
