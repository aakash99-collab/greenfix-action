
# Climate Fixer (Green-V) — MVP Plan

## Overview
A clean, modern web app that empowers citizens to document urban climate issues, get AI-powered analysis, view environmental data, receive solution recommendations, and generate reports for government authorities.

---

## Pages & Features

### 1. Landing Page
- Hero section with tagline: "From Observation to Action – Fix Your Climate, One Click at a Time" 🌿
- How it works (3 steps: Capture → Analyze → Report)
- Impact stats section (mock data initially)
- CTA button to start a new report

### 2. New Report Flow (Multi-step Form)
**Step 1 — Image Upload**
- Camera capture via browser API or file upload
- Support 2–5 images per report
- Client-side image compression (max 2MB)
- Auto-capture GPS coordinates with manual address entry fallback

**Step 2 — AI Analysis**
- Send images to Lovable AI (Gemini Vision) via edge function
- AI detects urban issues: traffic congestion, lack of green cover, poor drainage, pollution indicators, etc.
- Display detected problems as toggleable tags — user can confirm, remove, or add more manually

**Step 3 — Environmental Data**
- Display mock AQI, weather, and climate stress indicators for the captured location
- Metrics: PM2.5, PM10, temperature, humidity, heat index, green cover estimate
- Clean card-based layout with color-coded severity indicators

**Step 4 — Solutions**
- For each detected problem, show short-term and long-term Nature-Based Solutions
- Include estimated cost (₹ Low/Med/High), timeline, expected impact, and responsible authority
- Expandable accordion-style display

**Step 5 — Review & Submit**
- Summary of the full report: location, images, problems, environmental data, solutions
- Reporter info form (name, email — optional anonymous mode)
- Citizen pledge checkbox
- Generate and download report as formatted view
- Submit button (stores report in database)

### 3. My Reports Dashboard
- List of user's submitted reports with status tracking
- Status badges: Submitted → Under Review → Action Initiated → Resolved
- Click to view full report details

### 4. Public Dashboard (Community Map)
- Map view (Leaflet) showing all submitted reports as pins
- Color-coded by severity (green/yellow/orange/red)
- Click pin to see summary card
- Filter by problem type
- Aggregate stats: total reports, issues resolved, etc.

### 5. Educational Section
- Static informational page about climate solutions
- Problem-solution reference cards
- Links to resources (UN Habitat, IPCC guidelines)

---

## Backend (Lovable Cloud)

### Database Tables
- **reports** — id, user_id, location (lat/lng), address, status, created_at
- **report_images** — id, report_id, image_url (stored in Cloud Storage)
- **report_problems** — id, report_id, problem_type, severity, ai_detected (boolean)
- **report_solutions** — id, report_id, problem_type, solution data (JSON)
- **environmental_data** — id, report_id, aqi, temperature, humidity, etc. (mock data)

### Edge Functions
- **analyze-image** — sends images to Lovable AI (Gemini Vision) for urban issue detection
- **generate-report** — compiles report data into a structured format

### Storage
- Image uploads bucket for report photos

### Authentication
- Email-based sign-up/login
- Optional anonymous reporting (no auth required for basic submissions)

---

## Design Direction
- Clean, modern UI with generous whitespace
- Green accent color palette (#22C55E family) on white/light gray backgrounds
- Professional, trustworthy feel — suitable for government-facing output
- Responsive design (mobile-first, since users will often capture images on phones)
- Card-based layouts for data display, step indicators for the report flow

---

## What's Included in MVP
✅ Image upload with geolocation  
✅ AI-powered image analysis (Lovable AI / Gemini Vision)  
✅ Environmental data display (mock data, ready for API swap)  
✅ Problem detection with manual override  
✅ Solution recommendations engine  
✅ Report generation and submission  
✅ Report tracking dashboard  
✅ Community map view  
✅ User authentication  
✅ Mobile-responsive design  

## Deferred to Later Phases
- Real weather/AQI API integration (swap mock data for live APIs)
- Email-based government reporting (Resend integration)
- PDF export
- Gamification / Climate Credits
- Multilingual support
- Offline/PWA mode
- Mobile app (React Native)
