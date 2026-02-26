import { ProblemType, Severity } from "@/lib/types";

export interface AnalysisIssue {
  issue: string;
  problem_type: string;
  severity: string;
  environmental_impact_type: string;
  climate_impact_score: number;
}

export interface AnalysisResult {
  detected_issues: AnalysisIssue[];
  overall_climate_impact_score: number;
  suggested_action_plan: string[];
  municipal_intervention_required: string;
  summary: string;
}

// ── Vocabulary pools keyed by problem type ──────────────────────────

interface IssueSeed {
  phrases: string[];
  impacts: string[];
  actions_low: string[];
  actions_medium: string[];
  actions_high: string[];
  summaries_low: string[];
  summaries_medium: string[];
  summaries_high: string[];
  secondary?: { type: ProblemType; phrases: string[]; impacts: string[] };
}

const SEEDS: Record<ProblemType, IssueSeed> = {
  traffic_congestion: {
    phrases: [
      "Significant vehicular bottleneck identified at this corridor",
      "Peak-hour congestion causing prolonged vehicle idling",
      "Multi-lane traffic backup with poor throughput efficiency",
      "Intersection gridlock contributing to elevated tailpipe emissions",
      "Recurring stop-and-go patterns increasing fuel waste",
    ],
    impacts: ["Air Quality", "Emissions", "Noise Pollution", "Carbon Footprint"],
    actions_low: [
      "Adjust signal timing at nearby intersections to improve flow",
      "Install real-time traffic advisory signage for alternate routes",
      "Introduce temporary one-way routing during morning peak",
    ],
    actions_medium: [
      "Deploy adaptive traffic signal control systems across the corridor",
      "Implement congestion pricing for peak-hour vehicle entry",
      "Construct dedicated bus rapid transit lanes to shift modal share",
      "Install vehicle-count sensors for data-driven signal optimization",
    ],
    actions_high: [
      "Redesign the road network with grade-separated interchanges",
      "Enforce mandatory low-emission zone regulations across the district",
      "Commission a comprehensive mobility plan with multimodal integration",
      "Mandate congestion impact assessments for all new developments",
      "Deploy AI-driven traffic management across the metropolitan grid",
    ],
    summaries_low: [
      "Moderate traffic slowdowns detected. Minor signal adjustments can improve throughput.",
      "Localized congestion observed; targeted timing changes should alleviate delays.",
    ],
    summaries_medium: [
      "Consistent congestion patterns are raising emission levels along this corridor. Structured interventions are needed.",
      "Traffic density is degrading air quality and commuter efficiency. Operational improvements are recommended.",
    ],
    summaries_high: [
      "Severe congestion is a primary driver of poor air quality and carbon output in this area. Infrastructure-level redesign and policy enforcement are critical.",
      "Chronic gridlock requires systemic mobility reform, including network redesign and regulatory measures.",
    ],
    secondary: {
      type: "high_pollution",
      phrases: [
        "Elevated NO₂ concentrations linked to idling traffic",
        "Particulate matter spike correlated with congestion density",
      ],
      impacts: ["Respiratory Health", "Emissions"],
    },
  },

  lack_of_green: {
    phrases: [
      "Canopy coverage falls well below the recommended 25% threshold",
      "Built surfaces dominate with negligible vegetation buffer",
      "Tree-to-pavement ratio indicates ecological deficit",
      "No functional green corridor connecting nearby habitat patches",
      "Severely limited ground-level biomass reducing evapotranspiration",
    ],
    impacts: ["Urban Ecology", "Biodiversity", "Thermal Regulation", "Carbon Sequestration"],
    actions_low: [
      "Plant drought-resistant shrubs along sidewalk edges",
      "Introduce container-based micro-gardens at transit stops",
      "Launch a community tree-adoption programme for this block",
    ],
    actions_medium: [
      "Design pocket parks in underutilized lots within 200 m radius",
      "Mandate green frontage requirements for commercial buildings",
      "Install vertical green walls on south-facing facades",
      "Establish a neighborhood urban forest stewardship plan",
    ],
    actions_high: [
      "Commission a district-wide green infrastructure masterplan",
      "Require minimum 30% canopy cover in all new developments",
      "Retrofit public buildings with extensive green roof systems",
      "Create linked ecological corridors connecting parks and waterways",
      "Allocate municipal funding for large-scale afforestation",
    ],
    summaries_low: [
      "Green cover is below optimal levels. Small-scale planting efforts can improve microclimatic conditions.",
      "Minor vegetation gaps detected. Targeted greening will enhance local ecology.",
    ],
    summaries_medium: [
      "Insufficient green infrastructure is weakening thermal regulation and biodiversity. Structured urban greening is needed.",
      "Vegetation deficit is measurable. Coordinated planting and policy changes can restore ecological function.",
    ],
    summaries_high: [
      "Critical lack of green cover is amplifying heat stress and degrading ecosystem services. Large-scale intervention and policy reform are essential.",
      "Ecological deficit requires a comprehensive green infrastructure overhaul with regulatory backing.",
    ],
    secondary: {
      type: "urban_heat_island",
      phrases: [
        "Surface temperatures elevated due to absent vegetative shading",
        "Reduced evapotranspiration contributing to localized heat gain",
      ],
      impacts: ["Temperature", "Thermal Comfort"],
    },
  },

  urban_heat_island: {
    phrases: [
      "Surface temperature differential exceeds 4°C relative to surrounding green zones",
      "Dark impervious surfaces absorbing and re-radiating significant heat",
      "Nighttime heat retention preventing adequate urban cooling",
      "Albedo measurement indicates high solar absorption across rooftops",
      "Thermal imaging reveals concentrated heat pockets at this location",
    ],
    impacts: ["Temperature", "Thermal Comfort", "Energy Demand", "Public Health"],
    actions_low: [
      "Apply high-albedo coating to exposed pavement sections",
      "Install temporary shade sails over pedestrian rest areas",
      "Encourage light-colored exterior finishes on adjacent buildings",
    ],
    actions_medium: [
      "Retrofit roads with cool-pavement materials across the precinct",
      "Deploy shade canopies and misting stations at transit stops",
      "Mandate reflective roofing for all public buildings in the zone",
      "Introduce permeable light-colored paving in parking areas",
    ],
    actions_high: [
      "Implement a district-wide cool-surface retrofit programme",
      "Enact building codes requiring maximum albedo thresholds",
      "Design interconnected shade corridors using tree canopy and structures",
      "Commission an urban heat mitigation strategy with monitoring infrastructure",
      "Integrate district cooling systems in high-density blocks",
    ],
    summaries_low: [
      "Mild heat island effect observed. Localized surface treatments can reduce temperature differential.",
      "Moderate thermal absorption detected. Light interventions will improve pedestrian comfort.",
    ],
    summaries_medium: [
      "Heat island intensity is measurably impacting outdoor comfort and energy use. Systematic cool-surface deployment is warranted.",
      "Surface temperatures indicate a developing heat island. Coordinated material and shading interventions are recommended.",
    ],
    summaries_high: [
      "Pronounced urban heat island effect poses serious public health and energy risks. Infrastructure-scale cooling and regulatory enforcement are imperative.",
      "Extreme thermal retention demands comprehensive surface retrofits, shade infrastructure, and policy mandates.",
    ],
  },

  visibility_barriers: {
    phrases: [
      "Sightline obstruction at approach to intersection",
      "Overgrown vegetation blocking critical driver-pedestrian visibility",
      "Misplaced street furniture reducing sight triangle compliance",
      "Advertising signage encroaching on required clear-view zone",
    ],
    impacts: ["Road Safety", "Pedestrian Safety", "Accident Risk"],
    actions_low: [
      "Trim vegetation within the sight triangle zone",
      "Relocate obstructing signage to compliant positions",
      "Install convex mirrors at the affected blind corner",
    ],
    actions_medium: [
      "Redesign the intersection geometry to improve approach visibility",
      "Enforce clear-zone regulations with regular compliance audits",
      "Install supplementary warning signage on approach roads",
      "Add pedestrian-activated flashing beacons at the crossing",
    ],
    actions_high: [
      "Reconstruct the intersection with modern sight-distance standards",
      "Mandate visibility impact assessments for all roadside installations",
      "Implement a district-wide sight-triangle compliance programme",
      "Install smart detection systems that alert drivers to hidden pedestrians",
    ],
    summaries_low: [
      "Minor visibility issues identified. Vegetation trimming and sign relocation should resolve concerns.",
    ],
    summaries_medium: [
      "Visibility barriers are creating measurable safety risks. Geometric and regulatory corrections are needed.",
    ],
    summaries_high: [
      "Critical sightline obstructions require infrastructure reconstruction and enforceable compliance standards.",
    ],
  },

  poor_signage: {
    phrases: [
      "Faded regulatory signage no longer meeting retroreflectivity standards",
      "Missing directional signs at a decision point for unfamiliar road users",
      "Inconsistent sign placement causing navigational confusion",
      "Damaged sign posts reducing information availability after dark",
    ],
    impacts: ["Wayfinding", "Road Safety", "Accessibility"],
    actions_low: [
      "Replace faded signs with high-retroreflectivity sheeting",
      "Add multilingual directional signs at the nearest junction",
      "Repair damaged sign posts and ensure nighttime visibility",
    ],
    actions_medium: [
      "Conduct a signage audit across the precinct and replace non-compliant units",
      "Install digital variable-message signs at key decision points",
      "Standardize sign design and placement per national guidelines",
    ],
    actions_high: [
      "Commission a comprehensive wayfinding strategy for the district",
      "Mandate periodic retroreflectivity inspections with enforceable standards",
      "Deploy connected signage infrastructure with real-time information updates",
    ],
    summaries_low: [
      "Minor signage deficiencies identified. Targeted replacements will restore compliance.",
    ],
    summaries_medium: [
      "Signage quality is below standard across the area. A systematic audit and upgrade programme is recommended.",
    ],
    summaries_high: [
      "Widespread signage failure requires a district-level wayfinding overhaul and enforceable maintenance standards.",
    ],
  },

  poor_drainage: {
    phrases: [
      "Standing water accumulation on roadway after moderate rainfall",
      "Storm drain inlets blocked with debris reducing discharge capacity",
      "Surface gradient directing runoff toward pedestrian pathways",
      "Inadequate pipe sizing for current precipitation intensity patterns",
      "Erosion undermining pavement edges near drainage outfalls",
    ],
    impacts: ["Flood Risk", "Water Quality", "Infrastructure Integrity", "Public Health"],
    actions_low: [
      "Clear debris from storm drain inlets along this stretch",
      "Regrade the shoulder to redirect surface flow away from walkways",
      "Install temporary sandbag barriers at low-point accumulation zones",
    ],
    actions_medium: [
      "Construct bioswales along the roadway for natural stormwater absorption",
      "Replace impervious surfaces with permeable interlocking pavers",
      "Upsize undersized pipe segments identified in the hydraulic model",
      "Install real-time water-level sensors at critical drainage nodes",
    ],
    actions_high: [
      "Design a comprehensive stormwater management plan with retention basins",
      "Mandate on-site stormwater detention for all new developments in the catchment",
      "Retrofit the drainage network with climate-resilient capacity standards",
      "Integrate green infrastructure into the municipal flood mitigation framework",
      "Establish a dedicated stormwater utility with long-term funding mechanisms",
    ],
    summaries_low: [
      "Localized drainage issues noted. Clearing inlets and minor regrading should prevent pooling.",
    ],
    summaries_medium: [
      "Drainage capacity is insufficient for current rainfall patterns. Green infrastructure and pipe upgrades are needed.",
    ],
    summaries_high: [
      "Systemic drainage failure poses significant flood and public health risks. Comprehensive stormwater redesign and regulatory reform are critical.",
    ],
  },

  no_pedestrian_separation: {
    phrases: [
      "Pedestrians sharing the carriageway with motorized traffic without any barrier",
      "Absence of raised sidewalk forcing foot traffic onto road shoulders",
      "No tactile or physical delineation between vehicle and pedestrian zones",
      "Children observed walking in the traffic lane due to missing footpath",
    ],
    impacts: ["Pedestrian Safety", "Accessibility", "Social Equity"],
    actions_low: [
      "Paint temporary lane markings to delineate a pedestrian corridor",
      "Place flexible delineator posts along the roadway edge",
      "Install portable bollards at high-footfall crossing points",
    ],
    actions_medium: [
      "Construct raised sidewalks with curb separation along the affected stretch",
      "Install permanent bollards and tactile paving at intersections",
      "Add pedestrian-priority signal phases at nearby signalized crossings",
      "Deploy speed-reduction measures in the shared-use zone",
    ],
    actions_high: [
      "Redesign the street cross-section to include protected pedestrian infrastructure",
      "Mandate pedestrian-separation standards for all arterial roads in the district",
      "Implement a Safe Routes programme covering schools and healthcare facilities",
      "Enforce traffic calming and 30 km/h speed limits in mixed-use zones",
    ],
    summaries_low: [
      "Minor pedestrian separation gap identified. Temporary markings and delineators can improve safety.",
    ],
    summaries_medium: [
      "Pedestrian exposure to vehicular traffic is creating measurable safety risks. Permanent separation infrastructure is warranted.",
    ],
    summaries_high: [
      "Complete absence of pedestrian protection requires street redesign and enforceable safety regulations.",
    ],
  },

  waste_disposal: {
    phrases: [
      "Uncollected solid waste accumulating along the roadside",
      "Open waste dumping observed near a storm drain inlet",
      "Overflowing communal bins attracting vermin and generating odor",
      "Absence of segregated waste collection points in the vicinity",
    ],
    impacts: ["Sanitation", "Water Contamination", "Public Health", "Urban Aesthetics"],
    actions_low: [
      "Increase collection frequency for this micro-zone to daily service",
      "Install color-coded segregated bins at 50 m intervals",
      "Organize a community clean-up drive with local stakeholders",
    ],
    actions_medium: [
      "Deploy compactor bins with fill-level sensors to optimize collection routes",
      "Establish a material recovery facility within 2 km to process recyclables",
      "Launch a door-to-door source-segregation awareness programme",
      "Enforce penalties for illegal roadside dumping with surveillance",
    ],
    actions_high: [
      "Redesign the municipal solid waste management system for this ward",
      "Mandate extended producer responsibility for packaging waste streams",
      "Construct a decentralized composting facility for organic waste processing",
      "Integrate waste-to-energy pathways into the district infrastructure plan",
      "Enact by-laws requiring waste management plans for commercial establishments",
    ],
    summaries_low: [
      "Minor waste management lapses detected. Increased collection and bin placement should resolve issues.",
    ],
    summaries_medium: [
      "Waste disposal failures are impacting sanitation and groundwater quality. Systematic collection and enforcement improvements are needed.",
    ],
    summaries_high: [
      "Severe waste mismanagement poses public health and environmental contamination risks. Systemic reform and infrastructure investment are essential.",
    ],
  },

  poor_walkability: {
    phrases: [
      "Footpath surface is uneven with trip hazards from displaced pavers",
      "Sidewalk width falls below accessibility standards for wheelchair users",
      "Lack of continuous pedestrian network forcing route discontinuities",
      "Poorly maintained walking surfaces discouraging active mobility",
    ],
    impacts: ["Accessibility", "Active Mobility", "Social Inclusion", "Public Health"],
    actions_low: [
      "Repair displaced pavers and patch surface irregularities",
      "Add tactile guidance strips at key transition points",
      "Install temporary ramps at step barriers along the route",
    ],
    actions_medium: [
      "Widen sidewalks to meet universal accessibility standards",
      "Create continuous pedestrian links between transit stops and destinations",
      "Install adequate street lighting along the walking corridor",
      "Deploy wayfinding signage for pedestrians at decision points",
    ],
    actions_high: [
      "Redesign the pedestrian network with universal design principles",
      "Mandate walkability impact assessments for all infrastructure projects",
      "Implement a comprehensive pedestrian priority zone in the commercial core",
      "Allocate dedicated municipal funding for annual walkability improvements",
    ],
    summaries_low: [
      "Minor walkability issues identified. Surface repairs and accessibility additions will improve conditions.",
    ],
    summaries_medium: [
      "Walkability deficiencies are limiting active mobility and accessibility. Structured improvements to the pedestrian network are recommended.",
    ],
    summaries_high: [
      "Systemic walkability failure requires a complete pedestrian infrastructure redesign with enforceable accessibility mandates.",
    ],
  },

  high_pollution: {
    phrases: [
      "Particulate matter concentrations exceeding safe exposure thresholds",
      "Visible haze indicating elevated PM2.5 and PM10 levels",
      "Ground-level ozone formation driven by vehicular and industrial precursors",
      "Continuous exposure risk for residents within 500 m of emission sources",
      "Air quality index categorized in the unhealthy range for sensitive groups",
    ],
    impacts: ["Respiratory Health", "Air Quality", "Ecosystem Damage", "Climate Forcing"],
    actions_low: [
      "Install localized air quality monitoring stations for data collection",
      "Promote anti-idling campaigns near schools and healthcare facilities",
      "Encourage use of personal air filtration in high-exposure micro-zones",
    ],
    actions_medium: [
      "Enforce emission standards for vehicles operating in this zone",
      "Deploy roadside particulate barriers such as green buffers",
      "Establish a low-emission zone with access restrictions for non-compliant vehicles",
      "Incentivize electric vehicle adoption through subsidized charging infrastructure",
    ],
    actions_high: [
      "Mandate industrial emission audits and real-time stack monitoring",
      "Implement a comprehensive clean air action plan with enforceable targets",
      "Redesign the transport network to minimize through-traffic in residential areas",
      "Establish a regional air quality management authority with enforcement powers",
      "Deploy large-scale urban greening to serve as particulate sinks",
    ],
    summaries_low: [
      "Moderate air quality concerns detected. Monitoring and targeted awareness campaigns can reduce exposure.",
    ],
    summaries_medium: [
      "Pollution levels are impacting health outcomes. Emission controls and green buffers are needed to restore air quality.",
    ],
    summaries_high: [
      "Dangerous pollution levels pose immediate public health risks. Regulatory enforcement, transport reform, and large-scale greening are imperative.",
    ],
  },

  high_traffic: {
    phrases: [
      "Vehicle volume exceeding the designed capacity of the roadway",
      "Heavy goods vehicles contributing disproportionate noise and emission load",
      "Rat-running through residential streets due to arterial congestion",
      "Peak-hour traffic density reducing average travel speed below 15 km/h",
    ],
    impacts: ["Noise Pollution", "Emissions", "Road Safety", "Livability"],
    actions_low: [
      "Install traffic-calming measures such as speed cushions",
      "Promote cycling infrastructure along parallel low-traffic routes",
      "Introduce time-based access restrictions for heavy vehicles",
    ],
    actions_medium: [
      "Create dedicated freight corridors to divert heavy traffic",
      "Implement area-wide 30 km/h speed limits with enforcement",
      "Deploy real-time traffic distribution systems across the network",
      "Establish park-and-ride facilities at network entry points",
    ],
    actions_high: [
      "Commission a transport demand management strategy for the district",
      "Mandate traffic impact assessments for all commercial developments",
      "Redesign the road hierarchy to eliminate through-traffic in residential areas",
      "Invest in mass transit capacity expansion to shift modal balance",
      "Enforce vehicle emission and noise standards with automated monitoring",
    ],
    summaries_low: [
      "Elevated traffic volumes observed. Calming measures and modal shift incentives can improve conditions.",
    ],
    summaries_medium: [
      "Sustained high traffic is degrading livability and air quality. Network management and freight routing changes are recommended.",
    ],
    summaries_high: [
      "Excessive traffic volume requires systemic transport reform, demand management, and mass transit investment.",
    ],
  },

  ongoing_construction: {
    phrases: [
      "Active construction generating airborne dust beyond permissible limits",
      "Construction debris encroaching on pedestrian pathways",
      "Heavy machinery operations causing ground vibration and noise disturbance",
      "Temporary traffic diversions creating secondary congestion points",
    ],
    impacts: ["Air Quality", "Noise Pollution", "Pedestrian Safety", "Traffic Flow"],
    actions_low: [
      "Mandate wet-suppression dust control at the construction perimeter",
      "Erect hoarding to contain debris and protect pedestrian routes",
      "Restrict heavy machinery operation to off-peak hours",
    ],
    actions_medium: [
      "Require real-time dust and noise monitoring with public dashboards",
      "Design temporary traffic management plans to minimize diversion impact",
      "Enforce wheel-wash facilities to prevent mud tracking onto public roads",
      "Install noise barriers along the construction boundary facing residences",
    ],
    actions_high: [
      "Mandate comprehensive environmental management plans for all major construction",
      "Enforce construction logistics plans with designated vehicle routes and staging areas",
      "Require performance bonds for environmental compliance during construction",
      "Integrate construction impact mitigation into municipal planning approvals",
    ],
    summaries_low: [
      "Minor construction-related disruptions noted. Standard dust and debris containment will suffice.",
    ],
    summaries_medium: [
      "Construction activity is generating measurable air quality and safety impacts. Enhanced monitoring and containment are warranted.",
    ],
    summaries_high: [
      "Large-scale construction is causing significant environmental and safety degradation. Enforceable environmental management standards are required.",
    ],
  },
};

// ── Helpers ──────────────────────────────────────────────────────────

/** Pick a random element from an array */
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Pick N unique random elements */
function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, shuffled.length));
}

/** Map severity string to our Severity type */
function severityLabel(s: Severity): "Low" | "Medium" | "High" {
  if (s === "high" || s === "critical") return "High";
  if (s === "medium") return "Medium";
  return "Low";
}

/** Compute a climate impact score based on severity with jitter */
function computeImpactScore(severity: Severity): number {
  const base = severity === "high" || severity === "critical" ? 8 : severity === "medium" ? 6 : 3;
  const jitter = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
  return Math.max(1, Math.min(10, base + jitter));
}

// ── Main generator ──────────────────────────────────────────────────

export function generateAnalysis(
  problemType: ProblemType,
  severity: Severity,
): AnalysisResult {
  const seed = SEEDS[problemType];
  const sevLabel = severityLabel(severity);
  const impactScore = computeImpactScore(severity);

  // Build primary issue
  const primaryIssue: AnalysisIssue = {
    issue: pick(seed.phrases),
    problem_type: problemType,
    severity: sevLabel,
    environmental_impact_type: pick(seed.impacts),
    climate_impact_score: impactScore,
  };

  const issues: AnalysisIssue[] = [primaryIssue];

  // Optionally add a secondary correlated issue
  if (seed.secondary && (severity === "high" || severity === "medium" || Math.random() > 0.5)) {
    const sec = seed.secondary;
    issues.push({
      issue: pick(sec.phrases),
      problem_type: sec.type,
      severity: severity === "high" ? "Medium" : "Low",
      environmental_impact_type: pick(sec.impacts),
      climate_impact_score: Math.max(1, impactScore - 2),
    });
  }

  // Select actions scaled by severity
  const actionPool =
    severity === "high" || severity === "critical"
      ? seed.actions_high
      : severity === "medium"
        ? seed.actions_medium
        : seed.actions_low;

  const actionCount = severity === "high" || severity === "critical" ? 4 : severity === "medium" ? 3 : 2;
  const actions = pickN(actionPool, actionCount);

  // Pick summary
  const summaryPool =
    severity === "high" || severity === "critical"
      ? seed.summaries_high
      : severity === "medium"
        ? seed.summaries_medium
        : seed.summaries_low;

  const municipalRequired =
    severity === "high" || severity === "critical"
      ? "Yes"
      : severity === "medium"
        ? Math.random() > 0.4 ? "Yes" : "No"
        : "No";

  return {
    detected_issues: issues,
    overall_climate_impact_score: impactScore,
    suggested_action_plan: actions,
    municipal_intervention_required: municipalRequired,
    summary: pick(summaryPool),
  };
}

/** Generate a combined analysis from multiple problems */
export function generateMultiProblemAnalysis(
  problems: { type: ProblemType; severity: Severity }[],
): AnalysisResult {
  if (problems.length === 0) {
    return generateAnalysis("urban_heat_island", "medium");
  }

  // Generate individual results
  const results = problems.map((p) => generateAnalysis(p.type, p.severity));

  // Merge issues (deduplicate by problem_type)
  const seenTypes = new Set<string>();
  const allIssues: AnalysisIssue[] = [];
  for (const r of results) {
    for (const issue of r.detected_issues) {
      if (!seenTypes.has(issue.problem_type + issue.issue)) {
        seenTypes.add(issue.problem_type + issue.issue);
        allIssues.push(issue);
      }
    }
  }

  // Merge action plans (unique)
  const actionSet = new Set<string>();
  const allActions: string[] = [];
  for (const r of results) {
    for (const a of r.suggested_action_plan) {
      if (!actionSet.has(a)) {
        actionSet.add(a);
        allActions.push(a);
      }
    }
  }

  // Overall score = max of individual scores
  const overallScore = Math.max(...results.map((r) => r.overall_climate_impact_score));
  const anyMunicipal = results.some((r) => r.municipal_intervention_required === "Yes");

  // Use the summary from the highest-scoring result
  const topResult = results.reduce((a, b) =>
    a.overall_climate_impact_score >= b.overall_climate_impact_score ? a : b
  );

  return {
    detected_issues: allIssues,
    overall_climate_impact_score: overallScore,
    suggested_action_plan: allActions.slice(0, 6),
    municipal_intervention_required: anyMunicipal ? "Yes" : "No",
    summary: topResult.summary,
  };
}
