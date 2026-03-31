# Client Production Platform

A conversational platform that builds client-specific operating models and layers a live tech platform on top — so the ops model isn't just a document, it's a working system that ingests, produces, QCs, formats, and delivers assets to the right platform in the right spec.

> **The core principle:** The ops model IS the tech platform. One drives the other. These two things are inseparable.

---

## Overview

Each client gets their own named instance — their own ops model, their own tech configuration, their own asset library and delivery setup. The production company builds a library of client platforms over time.

```
Phase 1 → Client Setup (Conversational)
Phase 2 → Generate the Connected Model (Ops + Tech)
Phase 3 → The Client Runs Their Work Through It
```

---

## Phase 1 — Client Setup (Conversational)

**Status: Built**

A clean, professional React app that collects all client information one question at a time, then displays a structured summary screen.

### What it collects

#### Client Identity
| Field | Type | Purpose |
|---|---|---|
| Client name | Free text | Names the dedicated platform instance |
| Industry | Single select | Shapes production context and asset types |
| Brand complexity | Single select | Affects team structure and approval layers |
| Markets | Multi-select | Determines regional configuration |
| Languages | Multi-select | Sets transcreation and localisation scope |

#### Production Scope
| Field | Type | Purpose |
|---|---|---|
| Content types | Multi-select | Stills, video, banners, social, OOH, print, display, email |
| Platforms | Multi-select | Instagram, TikTok, YouTube, Facebook, LinkedIn, etc. |
| Asset volume | Single select | Monthly output — shapes team capacity and automation |
| Format variations | Single select | Number of size/format adaptations per asset |
| Language variations | Single select | Transcreation workload per asset |
| Production cadence | Single select | Always-on, campaign-based, seasonal, or mixed |

#### Existing Infrastructure
| Field | Type | Purpose |
|---|---|---|
| DAM system | Single select | Whether to connect to or build the asset library layer |
| Creative tools | Multi-select | Integration points in the production workflow |
| Approval process | Single select | How much of the workflow needs formalising |

#### Final Notes
| Field | Type | Purpose |
|---|---|---|
| Additional context | Free text (optional) | SLAs, compliance requirements, regional quirks |

### Summary screen

After all questions are answered, the app displays:
- **Headline stats** — assets/month, languages, platforms, format variations
- **All answers** grouped by section, with multi-selects shown as tags
- **Next steps panel** — three-phase roadmap with Phase 1 ticked off

### How to run

```bash
cd client-platform
npm install
npm run dev
```

Open `http://localhost:5173`.

---

## Phase 2 — Generate the Connected Model

**Status: Planned**

Based on Phase 1 answers, the platform auto-generates a complete, client-specific ops model and tech configuration. Nothing is generic — every output is derived from what was captured in setup.

### The Ops Layer

#### End-to-end production workflow
A named, staged workflow built from the client's content types and cadence:

```
Brief Intake → Creative Production → Internal Review → 
Client Approval → Transcreation → QC → Formatting → Delivery
```

Each stage is configured with:
- Who owns it (role title)
- What the input and output are
- SLA (hours/days, derived from asset type and cadence)
- Approval gate — yes/no, and who signs off

#### Team structure
Roles generated from the client's scope:

| Role | When generated |
|---|---|
| Project Manager | Always |
| Creative Lead | When stills or video are in scope |
| Motion Designer | When video or animated banners are in scope |
| Social Content Producer | When social platforms are selected |
| Transcreation Manager | When 2+ languages are selected |
| Localisation Specialist (per language) | One per language beyond English |
| QC Specialist | Always |
| Traffic Manager | When volume exceeds 200 assets/month |
| DAM Administrator | When a DAM is in scope |

#### SLAs per asset type
Auto-calculated from cadence and volume:

| Asset Type | Always-on SLA | Campaign SLA |
|---|---|---|
| Social static | 24 hours | 48 hours |
| Social video | 48 hours | 72 hours |
| Animated banner (per size) | 48 hours | 72 hours |
| OOH / Print | 5 days | 7 days |
| Transcreation (per language) | +24 hours per language | +24 hours per language |

### The Tech Layer

Directly connected to the ops workflow — each workflow stage has a corresponding tech component.

#### Ingestion
Where assets and briefs come in:
- **Brief intake form** — structured template matching the client's asset types and markets
- **Brand asset library** — logo, fonts, colour palette, brand guidelines uploaded once
- **Raw file upload** — photography, video footage, copy files

#### Production tooling
Configured from the client's existing creative tools:
- **Adobe CC integration** — if Photoshop/Illustrator/After Effects are in use
- **Figma integration** — for design-led workflows
- **Template engine** — for high-volume, format-heavy output (banners, social)
- **Automated resizing** — batch-adapts master assets to all required platform specs

#### Transcreation engine
Configured from language count and markets:
- Translation memory per client/brand
- Terminology glossary with brand-approved terms
- In-context review — translators see the asset, not just the copy
- Back-translation QC for regulated markets

#### QC module
Automated checks run before anything leaves the system. Rules are pulled directly from selected platforms:

| Platform | Checks run |
|---|---|
| Instagram (Feed 1:1) | 1080×1080px, <30MB, JPG/PNG/MP4 |
| Instagram (Stories/Reels 9:16) | 1080×1920px, <4GB, safe zone margins |
| TikTok | 1080×1920px, 9:16, <287.6MB, safe zones |
| YouTube (Shorts) | 1080×1920px, <256GB, 60fps max |
| Facebook (Feed) | 1080×1080px or 1200×630px |
| Google Display | All IAB standard sizes, file size limits |
| OOH | Resolution checks, bleed/trim/safe zone |
| Print | CMYK check, resolution minimum (300dpi), bleed |

Any asset that fails QC is flagged, returned to the relevant workflow stage, and logged.

#### Delivery architecture
Each selected platform gets a configured delivery connection:
- **Social platforms** — direct API connections (Meta, TikTok, YouTube) or scheduled delivery
- **Client DAM** — API connection to Bynder, Widen, Brandfolder, AEM, or Canto; or built-in DAM if none exists
- **Print/OOH** — packaged delivery with print-ready spec sheet
- **Email** — asset package delivered to ESP or CRM system

#### Version control
Every asset variant is tracked by:
- Client
- Campaign / project
- Asset type
- Market
- Language
- Platform
- Format/size
- Version number (v1, v2, v3 with change log)

---

## Phase 3 — The Client Runs Their Work Through It

**Status: Planned**

The platform isn't a document describing a workflow — it IS the workflow. Assets are uploaded, move through stages automatically, are QC'd, and are delivered without manual routing.

### Asset lifecycle

```
1. Brief submitted via intake form
2. Assets uploaded to ingestion layer
3. Auto-tagged by client / campaign / market / asset type
4. Routed to correct production stage based on asset type
5. Production team works within the platform (or integrated tools)
6. Internal review gate — assigned reviewer notified, approves or returns with notes
7. Client approval gate — client receives review link, approves or requests changes
8. If multi-language: routed to transcreation engine, one job per language
9. Automated QC runs against platform-specific rules
10. On pass: formatted to all required specs, delivered to destination
11. On fail: returned to relevant stage with specific QC failure notes
12. Delivery confirmed, asset logged in version control
13. All activity recorded in client dashboard
```

### The client dashboard

Each client's named instance has a live dashboard showing:

#### Active work
- All in-progress assets with current stage, owner, and SLA status (on track / at risk / overdue)
- Flagged QC failures needing attention
- Pending approvals (internal and client)

#### Delivery log
- All delivered assets with destination, spec, date, and version
- Filter by campaign, market, language, platform, or asset type

#### Volume reporting
- Assets delivered vs. planned this month/quarter
- Breakdown by type, market, and platform
- Language/transcreation volume

#### Library
- All approved master assets with full version history
- Search by client, campaign, market, language, platform
- Download any version in any delivered format

### Client instances

The production company maintains a library of client platforms. From the admin view:
- See all active client instances
- Spin up a new client (triggers Phase 1 setup)
- Compare volume and activity across clients
- Manage team assignments across client accounts

---

## Technical Architecture

### Current stack (Phase 1)
- **Frontend:** React 18 + Vite
- **Styling:** Custom CSS (no component library)
- **State:** React hooks (useState, useEffect)
- **Data:** Static question definitions in `src/data/questions.js`

### Planned additions (Phase 2–3)
| Layer | Technology options |
|---|---|
| Backend API | Node.js / Express or Next.js API routes |
| Database | PostgreSQL (clients, assets, versions, workflow state) |
| Auth | Clerk or Auth.js (multi-tenant, per-client access) |
| File storage | AWS S3 or Cloudflare R2 |
| QC engine | Custom rules engine + Sharp (image processing) + FFmpeg (video) |
| Delivery | Platform APIs (Meta Graph API, TikTok API, YouTube Data API) |
| DAM connectors | Bynder API, Widen API, Brandfolder API, AEM API |
| Transcreation | Smartling or Phrase integration, or custom TMS |
| Notifications | Email (Resend) + in-app |
| Hosting | Vercel (frontend) + Railway or Render (API) |

---

## Project structure

```
allybrown/
├── client-platform/          # Phase 1 React app
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.jsx      # Conversational question flow
│   │   │   └── Summary.jsx   # Final summary screen
│   │   ├── data/
│   │   │   └── questions.js  # All 15 questions defined here
│   │   ├── App.jsx           # App shell (landing → chat → summary)
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # All styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── rocketship.html           # (unrelated demo)
└── PLATFORM.md               # This document
```

---

## Build sequence

- [x] Phase 1 — Conversational client setup + summary screen
- [ ] Phase 2 — Ops model generator + tech layer configuration
- [ ] Phase 3 — Live workflow, QC engine, delivery connections, dashboard
