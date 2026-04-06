import { useState, useEffect, useRef, useCallback } from "react";

// ─────────────────────────────────────────────────────────
// ORIGIN STORY TIMELINE
// Art Direction: Visual Data Lexicon v1.0-Strict
// Aesthetic: Didactic Minimalism — "The Textbook Diagram"
// Palette: Ink Black #000 / Paper White #FFF / Grid Grey #999
// Typography: Geometric Sans-Serif (Futura/Avant Garde)
// Data Primitives: Dots (position), Bars (magnitude), Lines (trend)
// ─────────────────────────────────────────────────────────

const PHASES = [
  {
    id: 0,
    tag: "GENESIS",
    title: "The Insight",
    date: "2024",
    primitive: "dot",
    headline: "What if AI could do the work of an entire defense engineering team?",
    story: "Started with a question: defense startups post job descriptions for warfighter researchers, systems architects, C2 engineers, electrical engineers, motion designers — each role costing $150-250K/yr. What if those job descriptions weren't hiring ads, but training data?",
    details: [
      "Scraped job postings from Anduril, Shield AI, Palantir, L3Harris, Northrop",
      "Identified 20+ distinct engineering roles across the defense stack",
      "Hypothesis: each role's responsibilities could become an AI skill definition",
      "Key insight — JDs describe what the person DOES, not who they ARE"
    ],
    metrics: { roles: "20+", companies: "12", "cost/role": "$180K" },
    investorNote: "Total addressable labor cost replaced: ~$3.6M/yr for a single program office.",
    defenseNote: "Covers the full acquisition lifecycle: requirements → design → build → qualify → field.",
    techNote: "Each JD maps to a structured SKILL.md with lifecycle phases, tools, and validation gates."
  },
  {
    id: 1,
    tag: "COLLECTION",
    title: "Building the Stack",
    date: "2024-2025",
    primitive: "bar",
    headline: "20+ AI skills covering the entire defense engineering pipeline.",
    story: "Each job description became a structured AI skill — not a chatbot, but a deterministic workflow engine. Warfighter research. Systems architecture. C2 software. Electrical engineering. Venture strategy. Spatial design. Each with its own lifecycle, tools, and quality gates.",
    details: [
      "warfighter-research-package — threat analysis, capability gaps, CONOPs",
      "warfighter-systems-architect-package — platform specs, autonomy levels, comms",
      "c2-fleet-autonomy-package — ground control, truth-state rendering, degraded modes",
      "senior-electrical-engineer — PCB design, mil-spec qualification, production",
      "spatial-motion-genai-architect — concept reels, XR prototypes, motion language",
      "autonomous-venture-studio — market validation, product design, go-to-market",
      "lift-bench, orbital, HAAL, and 10+ more specialized skills"
    ],
    metrics: { skills: "20+", domains: "7", "phases/skill": "4-5" },
    investorNote: "This is the moat — not one model, but an orchestrated system of specialized AI agents.",
    defenseNote: "Maps directly to DoD acquisition milestones: MSA → TMRR → EMD → Production.",
    techNote: "Each skill has lifecycle phases, tool bindings, validation rules, and handoff protocols."
  },
  {
    id: 2,
    tag: "AUDIT",
    title: "The Reckoning",
    date: "Session Start",
    primitive: "line",
    headline: "Cataloged everything. Found the gaps. Built the benchmark.",
    story: "Ran a full audit across all skills. Standardized naming (kebab-case), stripped brand references, scored completeness. Created the Gold Standard: every skill needs SKILL.md + PRD.yaml + common-schema.yaml + SWARM.md. Result: only 6 of 16 skills were gold.",
    details: [
      "Renamed all packages to kebab-case convention",
      "Stripped 47 brand-specific references across skill files",
      "Defined Gold Standard: SKILL.md + PRD.yaml + common-schema.yaml + SWARM.md",
      "Scored each skill: gold (4/4), silver (3/4), bronze (2/4), stub (1/4)",
      "Generated SKILLS-FULL-AUDIT-REPORT.xlsx with complete scoring",
      "Generated SKILLS-STRATEGIC-REPORT.xlsx with upgrade roadmap"
    ],
    metrics: { audited: "16", gold: "6", gaps: "24", minutes: "45" },
    investorNote: "This is quality infrastructure — the difference between a demo and a product.",
    defenseNote: "Mirrors CMMI Level 3 process definition: documented, measured, repeatable.",
    techNote: "Gold Standard = deterministic execution. PRD defines goals, schema enforces types, SWARM orchestrates agents."
  },
  {
    id: 3,
    tag: "UPGRADE",
    title: "Gold Standard",
    date: "Phase 3",
    primitive: "bar",
    headline: "Upgraded 3 weak skills to full bundle format. 9 of 16 now gold.",
    story: "Read the 3 best existing bundles (lift-bench, c2-fleet, orbital) to extract the exact pattern. Then replicated it for the 3 weakest skills in parallel: autonomous-venture-studio, spatial-motion-genai-architect, and senior-electrical-engineer.",
    details: [
      "autonomous-venture-studio: PRD + schema (7 types) + SWARM (3 cells, 4 gates)",
      "spatial-motion: PRD (5 phases) + schema (5 types) + SWARM (4 cells)",
      "senior-electrical-engineer: PRD + schema (6 types) + SWARM (5 cells, PDR→PRR)",
      "Fixed cascading YAML validation errors across all schema files",
      "Final count: 9 of 16 skills at gold standard (56.25%)"
    ],
    metrics: { upgraded: "3", files: "9", "gold now": "9/16", coverage: "56%" },
    investorNote: "Each upgrade took ~15 minutes. Full coverage in one more session.",
    defenseNote: "PDR→CDR→TRR→PRR gate structure mirrors real defense program review milestones.",
    techNote: "SWARM topology enables multi-agent orchestration with defined handoff artifacts."
  },
  {
    id: 4,
    tag: "PIPELINE",
    title: "Wiring the Brain",
    date: "Phase 4",
    primitive: "line",
    headline: "Connected skills into an end-to-end mission pipeline with handoff gates.",
    story: "Skills alone are tools. A pipeline is a factory. Wired warfighter-research → warfighter-architect → c2-fleet into a single pipeline with explicit handoff artifacts, gate criteria, and founder sprint timelines.",
    details: [
      "Created PIPELINE_mission-to-c2.yaml — 3-stage pipeline definition",
      "Stage 1: threat_brief, conops, risk_register → gate: mission_clarity",
      "Stage 2: architecture_spec, platform_matrix, comms_topology → gate: systems_coherence",
      "Stage 3: c2_software_spec, operator_interface, deployment_plan → gate: operator_readiness",
      "Created handoff templates between each stage",
      "Mapped provides→consumes ports across all 3 skills",
      "Founder sprint mode: 2-3 + 3-4 + 4-5 = ~12 days total"
    ],
    metrics: { stages: "3", handoffs: "2", gates: "9", "sprint": "12d" },
    investorNote: "12 days from threat assessment to C2 spec. Traditional defense: 12-18 months.",
    defenseNote: "Gate criteria map to DoD 5000.02 decision points. Artifacts are CDR-ready.",
    techNote: "Pipeline YAML defines input_mapping — outputs of stage N auto-feed stage N+1."
  },
  {
    id: 5,
    tag: "LIVE FIRE",
    title: "Real Intelligence In",
    date: "Phase 5",
    primitive: "dot",
    headline: "Fed the 2025 Annual Threat Assessment. Got a defense program out.",
    story: "The real test: feed actual intelligence into the pipeline. Used the ODNI's 2025 Annual Threat Assessment — 30 pages of classified-derived, unclassified geopolitical intelligence. Selected Indo-Pacific autonomous ISR as the mission scenario.",
    details: [
      "INPUT: 2025 Annual Threat Assessment (ODNI, March 2025, 30 pages)",
      "Mission: Indo-Pacific autonomous ISR — China's A2/AD challenge",
      "STAGE 1: Mission Analysis Brief — threat framing, 3 concepts, risk register",
      "STAGE 2: Architecture Definition — 3-tier ISR, autonomy levels, comms, degraded modes",
      "STAGE 3: C2 Software Spec — GCS design, truth-state rendering, ROE enforcement",
      "All tables production-quality, all documents professional .docx",
      "Total: 1,145 paragraphs, 17 tables, 3 documents"
    ],
    metrics: { input: "30pg", output: "3 docs", paragraphs: "1145", tables: "17" },
    investorNote: "Public intelligence to program-of-record quality in one session. No team. No office.",
    defenseNote: "Three-tier mixed-fleet architecture matches current doctrinal direction for distributed maritime ISR.",
    techNote: "Truth-state: confirmed/estimated/stale/lost. Degraded-mode: nominal→constrained→critical→denied."
  },
  {
    id: 6,
    tag: "BUILD",
    title: "The Product",
    date: "Phase 6",
    primitive: "bar",
    headline: "Built a Tier 3 USV: engineering spec, hardware PCB, 3D visualization.",
    story: "Took the Tier 3 USV from the architecture and built it. 8.5m deep-V monohull, hybrid diesel-electric, towed hydrophone array, passive SIGINT, edge compute on Jetson AGX Orin. Complete with 12-layer HDI PCB stack-ups and MIL-STD qualification plans.",
    details: [
      "SPEC: 8.5m hull, 1800kg, 72hr endurance, 25kt sprint / 8kt loiter",
      "SENSORS: 8-ch hydrophone, passive SIGINT 2-18GHz, EO/IR gimbal",
      "COMPUTE: Jetson AGX Orin, 275 TOPS, sensor fusion + autonomy",
      "COMMS: 900MHz mesh + Ku-band VSAT + HF SSB (triple redundant)",
      "HARDWARE: 12-layer HDI compute + 8-layer analog hydrophone PCB",
      "POWER: 48V LiFePO4, 15kW electric, 50HP diesel generator",
      "3D VIZ: Three.js model, x-ray mode, subsystem inspection",
      "QUAL: MIL-STD-810H, -461G, -882E"
    ],
    metrics: { hull: "8.5m", mass: "1800kg", endurance: "72hr", PCB: "12+8L" },
    investorNote: "This is a $15-25M program. Designed in one afternoon by one person with AI.",
    defenseNote: "MANTAS T-38 equivalent. Designed to MIL-STD. Ready for PDR submission.",
    techNote: "Full SWaP budget, thermal analysis, EMI stack-up. Not a sketch — a buildable design."
  },
  {
    id: 7,
    tag: "STARTUP",
    title: "One Person. Full Stack.",
    date: "Now",
    primitive: "dot",
    headline: "The complete technical IP package for a defense startup — built by one founder.",
    story: "This is what exists right now: 16 AI skills covering the full defense engineering stack. A validated pipeline that turns intelligence into products. Three program-quality documents from real threat data. A fully specified autonomous USV. All built by one person.",
    details: [
      "16 AI skills — 9 at gold standard, covering 7 defense domains",
      "1 validated pipeline — intelligence → architecture → C2 software",
      "3 program documents — 1,145 paragraphs, 17 tables, from real ODNI data",
      "1 complete USV — engineering spec + PCB hardware + 3D model",
      "Traditional cost equivalent: ~$20M+ value",
      "Actual cost: one person, Claude, and determination",
      "This isn't a pitch deck. This is the product."
    ],
    metrics: { skills: "16", pipeline: "1", docs: "3", value: "$20M+" },
    investorNote: "The question isn't whether AI can do defense engineering. It already did. Who gets there first?",
    defenseNote: "Solo founder produced CDR-ready artifacts typically requiring a 15-person team over 12-18 months.",
    techNote: "Fully reproducible. Every step logged. Every artifact traceable. Every decision documented."
  }
];

const AUDIENCE_MODES = {
  all:      { label: "Full Story",  key: "all" },
  investor: { label: "Investor",    key: "investor" },
  defense:  { label: "Defense PM",  key: "defense" },
  tech:     { label: "Tech / AI",   key: "tech" }
};

// ─── DATA PRIMITIVE RENDERERS ───
// Dots = position, Bars = magnitude, Lines = angle/trend

function PrimitiveDot({ size = 10, filled = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10">
      <circle cx="5" cy="5" r="4" fill={filled ? "#000" : "none"} stroke="#000" strokeWidth="1.5" />
    </svg>
  );
}

function PrimitiveBar({ width = 40, height = 10 }) {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <rect x="0" y="1" width={width} height={height - 2} fill="#000" />
    </svg>
  );
}

function PrimitiveLine({ width = 40, angle = -15 }) {
  const rad = (angle * Math.PI) / 180;
  const y1 = 10 + Math.sin(rad) * 18;
  const y2 = 10 - Math.sin(rad) * 18;
  return (
    <svg width={width} height="20" viewBox={`0 0 ${width} 20`}>
      <line x1="2" y1={y1} x2={width - 2} y2={y2} stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function DataPrimitive({ type, size = "sm" }) {
  const s = size === "lg" ? 2 : 1;
  if (type === "dot") return <PrimitiveDot size={10 * s} />;
  if (type === "bar") return <PrimitiveBar width={40 * s} height={10 * s} />;
  if (type === "line") return <PrimitiveLine width={40 * s} />;
  return null;
}

// ─── METRIC CELL (matrix table style) ───

function MetricCell({ label, value, active }) {
  const [displayed, setDisplayed] = useState(0);
  const numTarget = parseInt(String(value).replace(/[^0-9]/g, "")) || 0;
  const isNumeric = /^\d/.test(String(value));
  const suffix = String(value).replace(/^[\d,]+/, "");

  useEffect(() => {
    if (!active || !isNumeric) return;
    let curr = 0;
    const inc = Math.max(1, Math.ceil(numTarget / 60));
    const timer = setInterval(() => {
      curr += inc;
      if (curr >= numTarget) { setDisplayed(numTarget); clearInterval(timer); }
      else setDisplayed(curr);
    }, 20);
    return () => clearInterval(timer);
  }, [active, numTarget, isNumeric]);

  return (
    <div style={{
      borderLeft: "1px dotted #999",
      padding: "10px 16px",
      textAlign: "center",
      minWidth: 80,
    }}>
      <div style={{
        fontFamily: "'Futura', 'Avant Garde', 'Century Gothic', sans-serif",
        fontSize: 22, fontWeight: 700, color: "#000",
        letterSpacing: "-0.02em", lineHeight: 1
      }}>
        {isNumeric && active ? `${displayed}${suffix}` : value}
      </div>
      <div style={{
        fontFamily: "'Futura', 'Avant Garde', 'Century Gothic', sans-serif",
        fontSize: 10, fontWeight: 400, color: "#999",
        textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4
      }}>
        {label}
      </div>
    </div>
  );
}

// ─── CONNECTOR (dotted vertical rule) ───

function Connector({ visible }) {
  return (
    <div style={{
      height: 24, paddingLeft: 13,
    }}>
      <div style={{
        width: 0, height: "100%",
        borderLeft: visible ? "1.5px dotted #999" : "1.5px dotted #ddd",
        transition: "border-color 0.6s ease",
      }} />
    </div>
  );
}

// ─── PHASE ROW (matrix row) ───

function PhaseRow({ phase, isExpanded, isVisible, audienceMode, onToggle }) {
  const noteKey = audienceMode === "investor" ? "investorNote"
    : audienceMode === "defense" ? "defenseNote"
    : audienceMode === "tech" ? "techNote"
    : null;

  return (
    <div
      onClick={onToggle}
      style={{
        borderTop: "1px dotted #999",
        padding: "20px 0",
        cursor: "pointer",
        opacity: isVisible ? 1 : 0.15,
        transform: isVisible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      {/* ─ Header row ─ */}
      <div className="vdl-phase-header" style={{
        display: "flex", alignItems: "flex-start", gap: 16,
      }}>
        {/* Phase number circle */}
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          border: "2px solid #000",
          background: isExpanded ? "#000" : "#fff",
          color: isExpanded ? "#fff" : "#000",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Futura', 'Avant Garde', 'Century Gothic', sans-serif",
          fontSize: 13, fontWeight: 700,
          flexShrink: 0, marginTop: 2,
          transition: "all 0.25s ease",
        }}>
          {phase.id}
        </div>

        {/* Data primitive */}
        <div className="vdl-primitive" style={{ flexShrink: 0, marginTop: 6 }}>
          <DataPrimitive type={phase.primitive} />
        </div>

        {/* Tag + Title + Headline */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
            <span style={{
              fontFamily: "'Futura', 'Avant Garde', 'Century Gothic', sans-serif",
              fontSize: 10, fontWeight: 700, letterSpacing: "0.15em",
              textTransform: "uppercase", color: "#000",
            }}>
              {phase.tag}
            </span>
            <span style={{
              fontFamily: "'Futura', 'Avant Garde', 'Century Gothic', sans-serif",
              fontSize: 10, fontWeight: 400, color: "#999",
              letterSpacing: "0.08em",
            }}>
              {phase.date}
            </span>
          </div>
          <h3 style={{
            fontFamily: "'Futura', 'Avant Garde', 'Century Gothic', sans-serif",
            fontSize: 18, fontWeight: 700, margin: "4px 0 4px",
            color: "#000", lineHeight: 1.2,
          }}>
            {phase.title}
          </h3>
          <p style={{
            fontFamily: "'Futura', 'Avant Garde', 'Century Gothic', sans-serif",
            fontSize: 13, fontWeight: 400, color: "#666",
            margin: 0, lineHeight: 1.5,
          }}>
            {phase.headline}
          </p>
        </div>

        {/* Expand indicator */}
        <div style={{
          fontFamily: "'Futura', 'Avant Garde', 'Century Gothic', sans-serif",
          fontSize: 14, color: "#999", flexShrink: 0, marginTop: 4,
          transform: isExpanded ? "rotate(90deg)" : "rotate(0)",
          transition: "transform 0.25s ease",
        }}>
          →
        </div>
      </div>

      {/* ─ Expanded content ─ */}
      {isExpanded && (
        <div className="vdl-expanded-content" style={{
          marginTop: 20, marginLeft: 44,
          animation: "vdlFadeIn 0.35s ease-out",
        }}>
          {/* Story */}
          <p style={{
            fontFamily: "'Futura', 'Avant Garde', 'Century Gothic', sans-serif",
            fontSize: 14, fontWeight: 400, color: "#333",
            lineHeight: 1.7, margin: "0 0 16px", maxWidth: 640,
          }}>
            {phase.story}
          </p>

          {/* Detail list — monoline items */}
          <div style={{
            borderLeft: "2px solid #000",
            paddingLeft: 16, marginBottom: 20,
          }}>
            {phase.details.map((d, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 8,
                padding: "4px 0",
                animation: `vdlSlideIn 0.25s ease-out ${i * 0.04}s both`,
              }}>
                <svg width="6" height="6" style={{ flexShrink: 0, marginTop: 6 }}>
                  <circle cx="3" cy="3" r="3" fill="#000" />
                </svg>
                <span style={{
                  fontFamily: "'Futura', 'Avant Garde', 'Century Gothic', sans-serif",
                  fontSize: 12, color: "#444", lineHeight: 1.5,
                }}>
                  {d}
                </span>
              </div>
            ))}
          </div>

          {/* Metrics row — matrix table cells */}
          <div style={{
            display: "flex", flexWrap: "wrap",
            borderTop: "1px dotted #999",
            borderBottom: "1px dotted #999",
            margin: "0 0 16px",
          }}>
            {Object.entries(phase.metrics).map(([key, val], i) => (
              <MetricCell key={key} label={key} value={String(val)} active={isExpanded} />
            ))}
          </div>

          {/* Audience note(s) */}
          {audienceMode === "all" ? (
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 0, borderTop: "1px dotted #999",
            }}>
              {["investor", "defense", "tech"].map((k) => (
                <div key={k} style={{
                  padding: "12px 16px",
                  borderRight: "1px dotted #999",
                }}>
                  <div style={{
                    fontFamily: "'Futura', 'Avant Garde', 'Century Gothic', sans-serif",
                    fontSize: 9, fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.12em", color: "#999", marginBottom: 4,
                  }}>
                    {AUDIENCE_MODES[k].label}
                  </div>
                  <div style={{
                    fontFamily: "'Futura', 'Avant Garde', 'Century Gothic', sans-serif",
                    fontSize: 12, color: "#444", lineHeight: 1.5,
                  }}>
                    {phase[`${k}Note`]}
                  </div>
                </div>
              ))}
            </div>
          ) : noteKey && (
            <div style={{
              padding: "12px 0", borderTop: "1px dotted #999",
            }}>
              <div style={{
                fontFamily: "'Futura', 'Avant Garde', 'Century Gothic', sans-serif",
                fontSize: 9, fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.12em", color: "#999", marginBottom: 4,
              }}>
                {AUDIENCE_MODES[audienceMode].label} perspective
              </div>
              <div style={{
                fontFamily: "'Futura', 'Avant Garde', 'Century Gothic', sans-serif",
                fontSize: 13, color: "#333", lineHeight: 1.6,
              }}>
                {phase[noteKey]}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ───

export default function OriginStoryTimeline() {
  const [audienceMode, setAudienceMode] = useState("all");
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [visiblePhases, setVisiblePhases] = useState(new Set());
  const [autoPlaying, setAutoPlaying] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const phaseRefs = useRef({});
  const autoPlayRef = useRef(null);

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.dataset.phase);
            setVisiblePhases((prev) => new Set([...prev, id]));
          }
        });
      },
      { threshold: 0.25 }
    );
    Object.values(phaseRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [showIntro]);

  const startAutoPlay = useCallback(() => {
    setShowIntro(false);
    setAutoPlaying(true);
    let idx = 0;
    autoPlayRef.current = setInterval(() => {
      if (idx >= PHASES.length) {
        clearInterval(autoPlayRef.current);
        setAutoPlaying(false);
        return;
      }
      setExpandedPhase(idx);
      setVisiblePhases((prev) => new Set([...prev, idx]));
      const el = phaseRefs.current[idx];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      idx++;
    }, 3500);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setAutoPlaying(false);
  }, []);

  useEffect(() => () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#FFFFFF",
      color: "#000000",
      fontFamily: "'Futura', 'Avant Garde', 'Century Gothic', sans-serif",
      overflowX: "hidden",
    }}>
      <style>{`
        @keyframes vdlFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes vdlSlideIn {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes vdlDotPulse {
          0%, 100% { r: 4; }
          50% { r: 6; }
        }
        * { scrollbar-width: thin; scrollbar-color: #ccc #fff; }
        *::-webkit-scrollbar { width: 4px; }
        *::-webkit-scrollbar-track { background: #fff; }
        *::-webkit-scrollbar-thumb { background: #ccc; border-radius: 2px; }
        ::selection { background: #000; color: #fff; }

        @media (max-width: 600px) {
          .vdl-audience-bar { flex-wrap: wrap; }
          .vdl-audience-bar button { flex: 1 1 auto; min-width: 0; padding: 6px 8px !important; font-size: 9px !important; }
          .vdl-intro-metrics { flex-wrap: wrap; }
          .vdl-intro-metrics > div { flex: 1 1 33%; min-width: 0; }
          .vdl-phase-header { gap: 10px !important; }
          .vdl-phase-header .vdl-primitive { display: none; }
          .vdl-expanded-content { margin-left: 0 !important; }
          .vdl-column-header .vdl-col-type { display: none; }
        }
      `}</style>

      {/* ─── INTRO ─── */}
      {showIntro && (
        <div style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "60px 24px", position: "relative",
        }}>
          {/* Background dot grid — textbook style */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.08,
            backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }} />

          <div style={{
            position: "relative", zIndex: 1,
            textAlign: "center", maxWidth: 700,
            animation: "vdlFadeIn 0.8s ease-out",
          }}>
            {/* Classification bar */}
            <div style={{
              fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase",
              color: "#999", marginBottom: 32, fontWeight: 700,
            }}>
              VISUAL DATA LEXICON — BUILD LOG v1.0
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 700,
              lineHeight: 1.1, margin: "0 0 20px", color: "#000",
              letterSpacing: "-0.02em",
            }}>
              How One Person Built a Defense Startup with AI
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: 16, color: "#666", lineHeight: 1.6,
              maxWidth: 520, margin: "0 auto 40px", fontWeight: 400,
            }}>
              From job descriptions to a fully specified autonomous USV.
              16 AI skills, 1 validated pipeline, 3 program documents,
              and a complete product design.
            </p>

            {/* Buttons */}
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => setShowIntro(false)}
                style={{
                  padding: "12px 28px", fontSize: 13, fontWeight: 700,
                  background: "#000", color: "#fff",
                  border: "2px solid #000", borderRadius: 0,
                  cursor: "pointer", letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontFamily: "'Futura', 'Avant Garde', 'Century Gothic', sans-serif",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => { e.target.style.background = "#fff"; e.target.style.color = "#000"; }}
                onMouseLeave={e => { e.target.style.background = "#000"; e.target.style.color = "#fff"; }}
              >
                Explore Timeline
              </button>
              <button
                onClick={startAutoPlay}
                style={{
                  padding: "12px 28px", fontSize: 13, fontWeight: 700,
                  background: "#fff", color: "#000",
                  border: "2px solid #000", borderRadius: 0,
                  cursor: "pointer", letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontFamily: "'Futura', 'Avant Garde', 'Century Gothic', sans-serif",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => { e.target.style.background = "#000"; e.target.style.color = "#fff"; }}
                onMouseLeave={e => { e.target.style.background = "#fff"; e.target.style.color = "#000"; }}
              >
                Auto-Play Demo
              </button>
            </div>

            {/* Summary data row — matrix style */}
            <div className="vdl-intro-metrics" style={{
              display: "flex", justifyContent: "center",
              marginTop: 56, borderTop: "1px dotted #999", borderBottom: "1px dotted #999",
              animation: "vdlFadeIn 1s ease-out 0.3s both",
            }}>
              {[
                { v: "16", l: "Skills" },
                { v: "1", l: "Pipeline" },
                { v: "3", l: "Documents" },
                { v: "1", l: "Product" },
                { v: "$20M+", l: "Value" },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: "14px 20px", textAlign: "center",
                  borderLeft: i > 0 ? "1px dotted #999" : "none",
                }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: "#000", lineHeight: 1 }}>
                    {s.v}
                  </div>
                  <div style={{
                    fontSize: 9, fontWeight: 700, color: "#999",
                    textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 4,
                  }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            {/* Data primitives legend */}
            <div style={{
              display: "flex", justifyContent: "center", gap: 32,
              marginTop: 28, opacity: 0.5,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <PrimitiveDot size={8} />
                <span style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase" }}>Position</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <PrimitiveBar width={20} height={6} />
                <span style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase" }}>Magnitude</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <PrimitiveLine width={20} />
                <span style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase" }}>Trend</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TIMELINE ─── */}
      {!showIntro && (
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "40px 24px 80px" }}>

          {/* Top bar */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 36, flexWrap: "wrap", gap: 12,
            animation: "vdlFadeIn 0.4s ease-out",
          }}>
            <button
              onClick={() => { setShowIntro(true); stopAutoPlay(); setExpandedPhase(null); }}
              style={{
                background: "none", border: "none", padding: 0,
                cursor: "pointer", fontSize: 12, fontWeight: 700, color: "#999",
                fontFamily: "'Futura', 'Avant Garde', 'Century Gothic', sans-serif",
                letterSpacing: "0.06em", textTransform: "uppercase",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => e.target.style.color = "#000"}
              onMouseLeave={e => e.target.style.color = "#999"}
            >
              ← Intro
            </button>

            {autoPlaying && (
              <button onClick={stopAutoPlay} style={{
                background: "#000", border: "none", color: "#fff",
                padding: "6px 14px", cursor: "pointer",
                fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "'Futura', 'Avant Garde', 'Century Gothic', sans-serif",
              }}>
                Stop
              </button>
            )}

            {/* Audience selector */}
            <div className="vdl-audience-bar" style={{ display: "flex", gap: 0 }}>
              {Object.entries(AUDIENCE_MODES).map(([key, mode]) => (
                <button
                  key={key}
                  onClick={() => setAudienceMode(key)}
                  style={{
                    padding: "6px 14px", fontSize: 10, fontWeight: 700,
                    background: audienceMode === key ? "#000" : "#fff",
                    color: audienceMode === key ? "#fff" : "#999",
                    border: "1px solid #000",
                    borderRight: "none",
                    cursor: "pointer",
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    fontFamily: "'Futura', 'Avant Garde', 'Century Gothic', sans-serif",
                    transition: "all 0.15s ease",
                  }}
                >
                  {mode.label}
                </button>
              ))}
              {/* Close the button group border */}
              <div style={{ borderRight: "1px solid #000" }} />
            </div>
          </div>

          {/* Column header */}
          <div className="vdl-column-header" style={{
            display: "flex", alignItems: "center", gap: 16,
            padding: "12px 0",
            borderBottom: "2px solid #000",
            marginBottom: 0,
          }}>
            <div style={{ width: 28, textAlign: "center" }}>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "#999" }}>#</span>
            </div>
            <div className="vdl-col-type" style={{ width: 40 }}>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "#999" }}>TYPE</span>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", color: "#999" }}>PHASE</span>
            </div>
            <div style={{ width: 24 }} />
          </div>

          {/* Phase rows */}
          {PHASES.map((phase, idx) => (
            <div key={phase.id}>
              <div
                ref={(el) => { phaseRefs.current[phase.id] = el; }}
                data-phase={phase.id}
              >
                <PhaseRow
                  phase={phase}
                  isExpanded={expandedPhase === phase.id}
                  isVisible={visiblePhases.has(phase.id)}
                  audienceMode={audienceMode}
                  onToggle={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
                />
              </div>
              {idx < PHASES.length - 1 && (
                <Connector visible={visiblePhases.has(phase.id)} />
              )}
            </div>
          ))}

          {/* Final border */}
          <div style={{ borderTop: "2px solid #000", marginTop: 0 }} />

          {/* ─── CLOSING ─── */}
          <div style={{
            marginTop: 56, textAlign: "center",
            padding: "40px 0",
          }}>
            <div style={{
              fontSize: 9, fontWeight: 700, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "#999", marginBottom: 16,
            }}>
              End of build log
            </div>

            <h3 style={{
              fontSize: 22, fontWeight: 700, margin: "0 0 12px",
              color: "#000", lineHeight: 1.2,
            }}>
              This Isn't a Pitch Deck. This Is the Product.
            </h3>

            <p style={{
              fontSize: 13, color: "#666", maxWidth: 440,
              margin: "0 auto 28px", lineHeight: 1.6,
            }}>
              16 AI skills. 1 pipeline. 3 program documents. 1 autonomous USV.
              Built by one founder. Verified against real intelligence.
            </p>

            <div style={{ display: "flex", gap: 0, justifyContent: "center" }}>
              <button
                onClick={() => {
                  setExpandedPhase(null);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setTimeout(() => setShowIntro(true), 400);
                }}
                style={{
                  padding: "10px 24px", fontSize: 11, fontWeight: 700,
                  background: "#000", color: "#fff",
                  border: "2px solid #000", borderRadius: 0,
                  cursor: "pointer", letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontFamily: "'Futura', 'Avant Garde', 'Century Gothic', sans-serif",
                }}
              >
                Replay
              </button>
              <button
                onClick={startAutoPlay}
                style={{
                  padding: "10px 24px", fontSize: 11, fontWeight: 700,
                  background: "#fff", color: "#000",
                  border: "2px solid #000", borderLeft: "none", borderRadius: 0,
                  cursor: "pointer", letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontFamily: "'Futura', 'Avant Garde', 'Century Gothic', sans-serif",
                }}
              >
                Auto-Play
              </button>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            textAlign: "center", marginTop: 40, paddingTop: 16,
            borderTop: "1px dotted #999",
            fontSize: 9, color: "#999", letterSpacing: "0.15em",
            textTransform: "uppercase", fontWeight: 700,
          }}>
            Built by DEFENSE.OBSERVER
          </div>
        </div>
      )}
    </div>
  );
}
