import { ProblemType, Solution } from "./types";

export const SOLUTIONS_MAP: Record<ProblemType, Omit<Solution, "problemType">> = {
  traffic_congestion: {
    shortTerm: {
      title: "Traffic Flow Optimization",
      description: "Conduct traffic flow analysis and optimize signal timing at key intersections.",
      cost: "Low",
      timeline: "0–3 months",
      impact: "15–25% reduction in peak-hour congestion",
      authority: "Traffic Police / Municipal Corporation",
    },
    longTerm: {
      title: "Bus Rapid Transit Lanes",
      description: "Implement dedicated BRT lanes and pedestrianize select streets to reduce private vehicle dependency.",
      cost: "High",
      timeline: "2–5 years",
      impact: "40–60% reduction in traffic volume",
      authority: "State Transport Authority / Municipal Corporation",
    },
  },
  lack_of_green: {
    shortTerm: {
      title: "Pop-up Green Buffers",
      description: "Deploy movable planters and pop-up green zones along major roads and public spaces.",
      cost: "Low",
      timeline: "1–3 months",
      impact: "Immediate visual improvement, 2–3°C local cooling",
      authority: "Municipal Corporation / Horticulture Dept",
    },
    longTerm: {
      title: "Urban Canopy Program",
      description: "Plant street trees at 50m intervals, install vertical gardens on metro pillars and building facades.",
      cost: "Medium",
      timeline: "1–5 years",
      impact: "30% tree canopy target, 5–8°C cooling",
      authority: "Municipal Corporation / Forest Department",
    },
  },
  urban_heat_island: {
    shortTerm: {
      title: "Cool Pavements",
      description: "Apply high-albedo paint on crosswalks and public spaces to reflect heat.",
      cost: "Low",
      timeline: "1–2 months",
      impact: "3–5°C surface temperature reduction",
      authority: "Public Works Department",
    },
    longTerm: {
      title: "Green Roofs & Permeable Surfaces",
      description: "Mandate green roofs on new buildings, replace impervious surfaces with permeable alternatives.",
      cost: "High",
      timeline: "2–5 years",
      impact: "8–12°C reduction in urban heat island effect",
      authority: "Urban Development Authority",
    },
  },
  visibility_barriers: {
    shortTerm: {
      title: "Visual Clutter Removal",
      description: "Remove unauthorized signage, paint 'green trail' wayfinding markers.",
      cost: "Low",
      timeline: "1–2 months",
      impact: "Improved pedestrian safety and navigation",
      authority: "Municipal Corporation",
    },
    longTerm: {
      title: "Unified Signage System",
      description: "Install standardized, transparent barriers and unified wayfinding signage throughout the area.",
      cost: "Medium",
      timeline: "6–12 months",
      impact: "Significant improvement in visibility and safety",
      authority: "Municipal Corporation / Urban Planning",
    },
  },
  poor_signage: {
    shortTerm: {
      title: "Temporary Wayfinding Art",
      description: "Install artistic, temporary wayfinding installations at key junctions.",
      cost: "Low",
      timeline: "1–2 months",
      impact: "Improved navigation for pedestrians and commuters",
      authority: "Municipal Corporation",
    },
    longTerm: {
      title: "Digital Smart Signage",
      description: "Install digital signage with real-time transit info, AQI updates, and emergency alerts.",
      cost: "High",
      timeline: "1–2 years",
      impact: "Complete wayfinding overhaul",
      authority: "Smart City Mission / Municipal Corporation",
    },
  },
  poor_drainage: {
    shortTerm: {
      title: "Drain Cleaning Drive",
      description: "Organize community-led drain cleaning and debris removal campaigns.",
      cost: "Low",
      timeline: "0–1 month",
      impact: "Immediate flood risk reduction",
      authority: "Municipal Corporation / Ward Office",
    },
    longTerm: {
      title: "Bioswales & Permeable Pavement",
      description: "Install bioswales along roads and replace impervious surfaces with 500mm porous concrete.",
      cost: "High",
      timeline: "1–3 years",
      impact: "70% reduction in surface water runoff",
      authority: "Public Works Department / Municipal Corporation",
    },
  },
  no_pedestrian_separation: {
    shortTerm: {
      title: "Weighted Planter Barriers",
      description: "Place weighted movable planters as temporary barriers between pedestrian and vehicle zones.",
      cost: "Low",
      timeline: "1–2 months",
      impact: "Immediate pedestrian safety improvement",
      authority: "Municipal Corporation / Traffic Police",
    },
    longTerm: {
      title: "Protected Lanes & Raised Crosswalks",
      description: "Build protected bike lanes, raised crosswalks, and dedicated pedestrian corridors.",
      cost: "High",
      timeline: "1–3 years",
      impact: "80% reduction in pedestrian-vehicle conflicts",
      authority: "Municipal Corporation / PWD",
    },
  },
  waste_disposal: {
    shortTerm: {
      title: "Community Cleanup & Temp Bins",
      description: "Organize neighborhood cleanup drives and install temporary segregated waste bins.",
      cost: "Low",
      timeline: "0–1 month",
      impact: "Visible cleanliness improvement",
      authority: "Municipal Corporation / Ward Office",
    },
    longTerm: {
      title: "Segregated Waste Infrastructure",
      description: "Build permanent segregated waste collection points, composting units, and recycling centers.",
      cost: "Medium",
      timeline: "6–18 months",
      impact: "60% reduction in open waste dumping",
      authority: "Municipal Corporation / Solid Waste Management",
    },
  },
  poor_walkability: {
    shortTerm: {
      title: "Tactical Paint & Curb Ramps",
      description: "Apply tactical paint for crosswalks, add temporary curb ramps for accessibility.",
      cost: "Low",
      timeline: "1–2 months",
      impact: "Immediate walkability improvement",
      authority: "Municipal Corporation / PWD",
    },
    longTerm: {
      title: "Complete Streets Redesign",
      description: "Implement ADA-compliant sidewalks, continuous walking paths, and shade infrastructure.",
      cost: "High",
      timeline: "1–3 years",
      impact: "Complete walkability transformation",
      authority: "Urban Development Authority / PWD",
    },
  },
  high_pollution: {
    shortTerm: {
      title: "Air-Purifying Plant Barriers",
      description: "Install air-purifying plants in large planters along polluted corridors, add noise barriers.",
      cost: "Low",
      timeline: "1–3 months",
      impact: "10–15% local PM reduction",
      authority: "Environment Department / Municipal Corporation",
    },
    longTerm: {
      title: "Green Walls & EV Zones",
      description: "Build green walls for PM capture, implement traffic calming measures, designate EV-only zones.",
      cost: "High",
      timeline: "2–5 years",
      impact: "40–60% pollution reduction in target areas",
      authority: "Environment Department / Transport Authority",
    },
  },
  high_traffic: {
    shortTerm: {
      title: "Peak-Hour Lane Management",
      description: "Implement reversible lanes and peak-hour traffic management strategies.",
      cost: "Low",
      timeline: "1–3 months",
      impact: "20% improvement in peak flow",
      authority: "Traffic Police / Municipal Corporation",
    },
    longTerm: {
      title: "Multi-Modal Transit Hubs",
      description: "Build integrated transit hubs with congestion pricing to shift users to public transport.",
      cost: "High",
      timeline: "3–5 years",
      impact: "50% reduction in private vehicle traffic",
      authority: "State Transport Authority / Smart City Mission",
    },
  },
  ongoing_construction: {
    shortTerm: {
      title: "Dust Suppression & Green Screens",
      description: "Mandate water sprays for dust suppression, install hoarding with green screen panels.",
      cost: "Low",
      timeline: "0–1 month",
      impact: "Immediate air quality improvement around site",
      authority: "Municipal Corporation / Builder",
    },
    longTerm: {
      title: "Green Construction Mandates",
      description: "Enforce green construction practices, buffer zones, and mandatory environmental compliance.",
      cost: "Medium",
      timeline: "6–12 months (policy)",
      impact: "Systemic improvement in construction impact",
      authority: "Urban Development Authority / Environment Dept",
    },
  },
};

export function getSolutionsForProblems(problemTypes: string[]): Solution[] {
  return problemTypes
    .filter((pt) => pt in SOLUTIONS_MAP)
    .map((pt) => ({
      problemType: pt as ProblemType,
      ...SOLUTIONS_MAP[pt as ProblemType],
    }));
}
