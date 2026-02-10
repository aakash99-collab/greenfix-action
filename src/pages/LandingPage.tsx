import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Cpu, FileText, Leaf, MapPin, BarChart3, ArrowRight } from "lucide-react";

const STEPS = [
  {
    icon: Camera,
    title: "Capture",
    description: "Take photos of urban climate issues in your locality using your phone camera or upload existing images.",
  },
  {
    icon: Cpu,
    title: "Analyze",
    description: "Our AI identifies problems, pulls environmental data, and recommends nature-based solutions.",
  },
  {
    icon: FileText,
    title: "Report",
    description: "Generate a comprehensive report and submit it directly to local government authorities.",
  },
];

const STATS = [
  { value: "1,240+", label: "Reports Filed", icon: FileText },
  { value: "38", label: "Cities Active", icon: MapPin },
  { value: "156", label: "Issues Resolved", icon: BarChart3 },
  { value: "12K+", label: "Trees Advocated", icon: Leaf },
];

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        <div className="container relative py-20 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground">
              <Leaf className="h-4 w-4 text-primary" />
              Empowering Citizens for Climate Action
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              From Observation to Action —{" "}
              <span className="text-primary">Fix Your Climate</span>, One Click at a Time
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              Document urban climate issues, get AI-powered analysis with nature-based solutions, and report directly to government authorities.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="gap-2 text-base">
                <Link to="/report/new">
                  Start a Report <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link to="/community">View Community Map</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold">How It Works</h2>
            <p className="mt-2 text-muted-foreground">Three simple steps to make a real impact</p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Card key={step.title} className="relative overflow-hidden border-none bg-background shadow-md">
                <CardContent className="p-6 pt-8 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Step {i + 1}
                  </div>
                  <h3 className="font-display text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold">Our Impact So Far</h2>
            <p className="mt-2 text-muted-foreground">Community-driven climate action in numbers</p>
          </div>
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((stat) => (
              <Card key={stat.label} className="border-none bg-primary/5 shadow-none">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <stat.icon className="mb-3 h-6 w-6 text-primary" />
                  <span className="font-display text-3xl font-extrabold text-foreground">{stat.value}</span>
                  <span className="mt-1 text-sm text-muted-foreground">{stat.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-primary/5 py-16">
        <div className="container text-center">
          <h2 className="font-display text-3xl font-bold">Ready to Make a Difference?</h2>
          <p className="mt-3 text-muted-foreground">
            Your observation today could trigger real government action tomorrow.
          </p>
          <Button asChild size="lg" className="mt-6 gap-2 text-base">
            <Link to="/report/new">
              <Camera className="h-4 w-4" /> Start Your First Report
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
