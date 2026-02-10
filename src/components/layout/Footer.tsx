import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Leaf className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold">
                Climate<span className="text-primary">Fixer</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              From Observation to Action — Fix Your Climate, One Click at a Time. 🌿
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-sm font-semibold">Platform</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/report/new" className="hover:text-primary transition-colors">New Report</Link>
              <Link to="/dashboard" className="hover:text-primary transition-colors">My Reports</Link>
              <Link to="/community" className="hover:text-primary transition-colors">Community Map</Link>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-sm font-semibold">Resources</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/learn" className="hover:text-primary transition-colors">Learn</Link>
              <a href="https://www.unhabitat.org" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">UN Habitat</a>
              <a href="https://www.ipcc.ch" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">IPCC Guidelines</a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-display text-sm font-semibold">Contact</h4>
            <p className="text-sm text-muted-foreground">
              Have feedback or ideas? Reach out to us at{" "}
              <a href="mailto:hello@climatefixer.org" className="text-primary hover:underline">
                hello@climatefixer.org
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} ClimateFixer. Built for a greener tomorrow.
        </div>
      </div>
    </footer>
  );
}
