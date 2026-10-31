"use client";
import { useState, useEffect, useContext } from "react";
import { ThemeCtx } from "@/components/ui/Theme";

type Theme = "light" | "dark";
const useTheme = () => useContext(ThemeCtx);

const LIGHT = {
  bg: "#F8FAFC", surface: "#FFFFFF", surface2: "#F1F5F9", surface3: "#E2E8F0",
  primary: "#2563EB", text: "#0F172A", textMuted: "#64748B", textDim: "#94A3B8",
  border: "#E2E8F0", cardShadow: "0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)",
};
const DARK = {
  bg: "#080D1A", surface: "#0F172A", surface2: "#172033", surface3: "#1E293B",
  primary: "#3B82F6", text: "#F8FAFC", textMuted: "#94A3B8", textDim: "#475569",
  border: "#1E293B", cardShadow: "0 1px 4px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.18)",
};
const tok = (t: Theme) => t === "light" ? LIGHT : DARK;

const P: Record<string, string[]> = {
  search: ["M21 21l-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z"],
  arrowL: ["M19 12H5M12 19l-7-7 7-7"],
  chevR: ["M9 18l6-6-6-6"],
  chevL: ["M15 18l-6-6 6-6"],
  bookmark: ["M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"],
  share: ["M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8", "M16 6l-4-4-4 4", "M12 2v13"],
  calendar: ["M8 2v4M16 2v4M3 10h18", "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"],
  clock: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M12 6v6l4 2"],
  map: ["M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z", "M12 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"],
  check: ["M20 6L9 17l-5-5"],
  bell: ["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0"],
  users: ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M23 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75", "M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  star: ["M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"],
  alert: ["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z", "M12 9v4M12 17h.01"],
  x: ["M18 6L6 18M6 6l12 12"],
  zap: ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"],
  list: ["M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"],
  copy: ["M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-4-4H8z", "M14 4v4h4", "M10 12h4", "M10 16h4"],
  mail: ["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", "M22 6l-10 7L2 6"],
};
function Ic({ n, size = 16, color = "currentColor" }: { n: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      {(P[n] ?? []).map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

// ─── TYPES ─────────────────────────────────────────────────────────────────────
type EventCat = "Academic" | "Seminar" | "Workshop" | "Competition" | "Hackathon" | "Club" | "Sports" | "Cultural" | "Career" | "General" | "Research";
type EventStatus = "upcoming" | "today" | "ongoing" | "completed" | "cancelled" | "postponed";
type RegStatus = "open" | "closed" | "registered" | "waitlist" | "none";

type CampusEvent = {
  id: string; title: string; category: EventCat; organizer: string; organizerType: "university" | "department" | "club" | "cr";
  date: string; dateShort: string; time: string; location: string; building?: string;
  status: EventStatus; regStatus: RegStatus;
  capacity?: number; registeredCount?: number;
  regDeadline?: string; eligibility?: string[];
  description: string; color: string; featured?: boolean; postponedFrom?: string; savedAgo?: string;
  schedule?: { day?: string; time: string; title: string }[];
};

const CAT_CFG: Record<string, { color: string; bg: string }> = {
  Academic: { color: "#2563EB", bg: "rgba(37,99,235,0.08)" },
  Seminar: { color: "#8B5CF6", bg: "rgba(139,92,246,0.08)" },
  Workshop: { color: "#10B981", bg: "rgba(16,185,129,0.08)" },
  Competition: { color: "#F59E0B", bg: "rgba(245,158,11,0.08)" },
  Hackathon: { color: "#EF4444", bg: "rgba(239,68,68,0.08)" },
  Club: { color: "#06B6D4", bg: "rgba(6,182,212,0.08)" },
  Sports: { color: "#10B981", bg: "rgba(16,185,129,0.08)" },
  Cultural: { color: "#EC4899", bg: "rgba(236,72,153,0.08)" },
  Career: { color: "#475569", bg: "rgba(71,85,105,0.08)" },
  Research: { color: "#7C3AED", bg: "rgba(124,58,237,0.08)" },
  General: { color: "#64748B", bg: "rgba(100,116,139,0.08)" },
};

const STATUS_CFG: Record<EventStatus, { label: string; color: string; bg: string; border: string }> = {
  upcoming: { label: "Upcoming", color: "#2563EB", bg: "rgba(37,99,235,0.08)", border: "rgba(37,99,235,0.2)" },
  today: { label: "Today", color: "#F59E0B", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)" },
  ongoing: { label: "Ongoing", color: "#10B981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)" },
  completed: { label: "Completed", color: "#94A3B8", bg: "rgba(148,163,184,0.08)", border: "rgba(148,163,184,0.2)" },
  cancelled: { label: "Cancelled", color: "#94A3B8", bg: "rgba(148,163,184,0.06)", border: "rgba(148,163,184,0.2)" },
  postponed: { label: "Postponed", color: "#8B5CF6", bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.2)" },
};

const REG_CFG: Record<RegStatus, { label: string; color: string }> = {
  open: { label: "Registration Open", color: "#10B981" },
  closed: { label: "Registration Closed", color: "#94A3B8" },
  registered: { label: "Registered", color: "#2563EB" },
  waitlist: { label: "Waitlist", color: "#F59E0B" },
  none: { label: "No Registration Required", color: "#64748B" },
};

const EVENTS: CampusEvent[] = [
  {
    id: "ev1", title: "UniHack 2026", category: "Hackathon", organizer: "CSE Programming Club", organizerType: "club",
    date: "September 18–19, 2026", dateShort: "Sep 18", time: "9:00 AM – 6:00 PM", location: "University Innovation Center", building: "Building 5",
    status: "upcoming", regStatus: "open", capacity: 80, registeredCount: 52, regDeadline: "September 15, 2026",
    eligibility: ["CSE Students", "All Undergraduate Students", "Batch 50–54"],
    description: "UniHack 2026 is a university-level hackathon where students work in teams to build innovative technology solutions to real-world problems. 36 hours of coding, creativity, and collaboration.",
    color: "#EF4444", featured: true,
    schedule: [
      { day: "Day 1", time: "9:00 AM", title: "Registration" },
      { day: "Day 1", time: "10:00 AM", title: "Opening Ceremony" },
      { day: "Day 1", time: "11:00 AM", title: "Hackathon Begins" },
      { day: "Day 1", time: "1:00 PM", title: "Lunch" },
      { day: "Day 1", time: "6:00 PM", title: "Day 1 Ends" },
      { day: "Day 2", time: "9:00 AM", title: "Project Development" },
      { day: "Day 2", time: "3:00 PM", title: "Final Submission" },
      { day: "Day 2", time: "4:00 PM", title: "Project Presentation" },
      { day: "Day 2", time: "6:00 PM", title: "Award Ceremony" },
    ],
  },
  {
    id: "ev2", title: "AI & Machine Learning Seminar", category: "Seminar", organizer: "Department of CSE", organizerType: "department",
    date: "September 5, 2026", dateShort: "Sep 5", time: "3:00 PM – 5:00 PM", location: "Auditorium A", building: "Building 1",
    status: "upcoming", regStatus: "registered", capacity: 150, registeredCount: 98, regDeadline: "September 3, 2026",
    eligibility: ["All University Students"],
    description: "Expert speakers discuss the latest developments in AI, machine learning, and their applications in industry and academia.",
    color: "#8B5CF6", savedAgo: "Yesterday",
  },
  {
    id: "ev3", title: "Inter-University Programming Contest", category: "Competition", organizer: "Programming Club", organizerType: "club",
    date: "September 12, 2026", dateShort: "Sep 12", time: "9:00 AM – 4:00 PM", location: "Computer Lab 2", building: "Lab Block",
    status: "upcoming", regStatus: "open", capacity: 60, registeredCount: 41, regDeadline: "September 10, 2026",
    eligibility: ["CSE Students", "Batch 50–54"],
    description: "A competitive programming contest featuring algorithm challenges. Teams of 2–3 compete for prizes and campus recognition.",
    color: "#F59E0B",
  },
  {
    id: "ev4", title: "Career Preparation Workshop", category: "Career", organizer: "Career Development Center", organizerType: "university",
    date: "September 15, 2026", dateShort: "Sep 15", time: "2:00 PM – 4:00 PM", location: "Seminar Hall", building: "Building 2",
    status: "upcoming", regStatus: "open", capacity: 120, registeredCount: 67, regDeadline: "September 13, 2026",
    eligibility: ["All University Students"],
    description: "Industry professionals share resume tips, interview strategies, and career roadmaps for technology roles.",
    color: "#475569", savedAgo: "3 days ago",
  },
  {
    id: "ev5", title: "Cultural Night 2026", category: "Cultural", organizer: "Cultural Club", organizerType: "club",
    date: "September 20, 2026", dateShort: "Sep 20", time: "6:00 PM – 9:00 PM", location: "University Auditorium", building: "Building 1",
    status: "upcoming", regStatus: "none",
    eligibility: ["All University Students"],
    description: "A celebration of cultural diversity featuring performances, food, and exhibitions from students across different backgrounds.",
    color: "#EC4899",
  },
  {
    id: "ev6", title: "Database Workshop", category: "Workshop", organizer: "Department of CSE", organizerType: "department",
    date: "September 8, 2026", dateShort: "Sep 8", time: "2:00 PM – 4:00 PM", location: "Lab 3", building: "Lab Block",
    status: "upcoming", regStatus: "open", capacity: 40, registeredCount: 28, regDeadline: "September 6, 2026",
    eligibility: ["CSE 305 Students"],
    description: "A hands-on workshop on advanced database design, query optimization, and practical SQL patterns.",
    color: "#10B981",
  },
  {
    id: "ev7", title: "Robotics Club Workshop", category: "Workshop", organizer: "Robotics Club", organizerType: "club",
    date: "September 9, 2026", dateShort: "Sep 9", time: "10:00 AM – 1:00 PM", location: "Lab 5", building: "Lab Block",
    status: "postponed", regStatus: "open", postponedFrom: "September 3",
    eligibility: ["All University Students"],
    description: "An introductory robotics workshop covering basic circuits, sensors, and programming microcontrollers.",
    color: "#10B981",
  },
];

// ─── OVERLAY HELPER ─────────────────────────────────────────────────────────────
function Overlay({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300 }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(5px)" }} />
      <div onClick={e => e.stopPropagation()} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
        {children}
      </div>
    </div>
  );
}

// ─── REGISTRATION MODAL ─────────────────────────────────────────────────────────
type RegStep = "form" | "confirm" | "success";
function RegistrationModal({ ev, onClose, onDone }: { ev: CampusEvent; onClose: () => void; onDone: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [step, setStep] = useState<RegStep>("form");

  const baseBox: React.CSSProperties = {
    background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20,
    padding: "28px 32px", minWidth: 420, maxWidth: 460,
    boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
  };

  if (step === "success") {
    return (
      <Overlay onClose={onClose}>
        <div style={baseBox}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
              <Ic n="check" size={26} color="#10B981" />
            </div>
            <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 20, color: c.text, marginBottom: 8 }}>Registration Successful</div>
            <div style={{ fontSize: 13, color: c.textMuted, marginBottom: 24, lineHeight: 1.6 }}>You are registered for <strong>{ev.title}</strong>.</div>
            <div style={{ background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 12, padding: "14px 16px", marginBottom: 22, textAlign: "left" }}>
              {[{ label: "Event", val: ev.title }, { label: "Date", val: ev.date }, { label: "Location", val: ev.location }].map(r => (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, gap: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: c.textDim }}>{r.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: c.text, textAlign: "right" }}>{r.val}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={onClose} style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>View Event</button>
              <button style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Add to Calendar</button>
            </div>
          </div>
        </div>
      </Overlay>
    );
  }

  if (step === "confirm") {
    return (
      <Overlay onClose={onClose}>
        <div style={baseBox}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 18, color: c.text }}>Confirm Registration</div>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><Ic n="x" size={18} color={c.textDim} /></button>
          </div>
          <div style={{ background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 12, padding: "16px 18px", marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: c.textDim, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Event</div>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text, marginBottom: 4 }}>{ev.title}</div>
            <div style={{ fontSize: 12, color: c.textMuted }}>{ev.date} · {ev.location}</div>
          </div>
          <div style={{ background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 12, padding: "16px 18px", marginBottom: 22 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: c.textDim, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Your Details</div>
            {[{ label: "Name", val: "Ovi" }, { label: "Student ID", val: "52-0124" }, { label: "Email", val: "ovi@university.edu" }].map(r => (
              <div key={r.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 7, gap: 12 }}>
                <span style={{ fontSize: 12, color: c.textDim }}>{r.label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: c.text }}>{r.val}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setStep("form")} style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Back</button>
            <button onClick={() => { setStep("success"); onDone(); }} style={{ flex: 2, padding: "10px 0", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Confirm Registration</button>
          </div>
        </div>
      </Overlay>
    );
  }

  return (
    <Overlay onClose={onClose}>
      <div style={baseBox}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 18, color: c.text }}>Register for {ev.title}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><Ic n="x" size={18} color={c.textDim} /></button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 22 }}>
          {[{ label: "Full Name", placeholder: "Ovi", type: "text" }, { label: "Student ID", placeholder: "52-0124", type: "text" }, { label: "Email Address", placeholder: "ovi@university.edu", type: "email" }].map(f => (
            <div key={f.label}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: c.textDim, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{f.label}</label>
              <input type={f.type} placeholder={f.placeholder}
                style={{ width: "100%", padding: "9px 12px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
            </div>
          ))}
        </div>
        <div style={{ padding: "12px 14px", background: `${ev.color}06`, border: `1px solid ${ev.color}20`, borderRadius: 10, marginBottom: 18 }}>
          <div style={{ fontSize: 12, color: c.textMuted }}>
            <strong style={{ color: c.text }}>{ev.title}</strong> · {ev.date} · {ev.location}
          </div>
          {ev.regDeadline && <div style={{ fontSize: 11, color: c.textDim, marginTop: 4 }}>Registration deadline: {ev.regDeadline}</div>}
        </div>
        <button onClick={() => setStep("confirm")}
          style={{ width: "100%", padding: "11px 0", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
          Continue to Confirm
        </button>
      </div>
    </Overlay>
  );
}

// ─── SHARE MODAL ────────────────────────────────────────────────────────────────
function ShareModal({ ev, onClose }: { ev: CampusEvent; onClose: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [copied, setCopied] = useState(false);
  function copy() { setCopied(true); setTimeout(() => setCopied(false), 2000); }

  const options = [
    { label: "Messenger", emoji: "💬" },
    { label: "Email", emoji: "📧" },
    { label: "WhatsApp", emoji: "📱" },
    { label: "Other", emoji: "⋯" },
  ];

  return (
    <Overlay onClose={onClose}>
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, padding: "24px 28px", minWidth: 340, boxShadow: "0 24px 80px rgba(0,0,0,0.25)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 16, color: c.text }}>Share Event</div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><Ic n="x" size={16} color={c.textDim} /></button>
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 4 }}>{ev.title}</div>
        <div style={{ fontSize: 11, color: c.textDim, marginBottom: 18 }}>{ev.date} · {ev.location}</div>

        <div style={{ display: "flex", gap: 8, padding: "10px 12px", background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 10, marginBottom: 18, alignItems: "center" }}>
          <span style={{ flex: 1, fontSize: 12, color: c.textDim, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>unilink.app/events/{ev.id}</span>
          <button onClick={copy} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 7, background: copied ? "rgba(16,185,129,0.08)" : c.surface3, border: `1px solid ${copied ? "rgba(16,185,129,0.25)" : c.border}`, color: copied ? "#10B981" : c.textMuted, fontFamily: "Inter", fontSize: 11, fontWeight: 700, cursor: "pointer", flexShrink: 0 }}>
            {copied ? <Ic n="check" size={11} color="#10B981" /> : <Ic n="copy" size={11} color={c.textMuted} />} {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>Share to</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
          {options.map(o => (
            <button key={o.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "12px 8px", borderRadius: 12, background: c.surface2, border: `1px solid ${c.border}`, cursor: "pointer", transition: "background 0.12s" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = c.surface3)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = c.surface2)}>
              <span style={{ fontSize: 22 }}>{o.emoji}</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: c.textMuted }}>{o.label}</span>
            </button>
          ))}
        </div>
      </div>
    </Overlay>
  );
}

// ─── ADD TO CALENDAR MODAL ──────────────────────────────────────────────────────
function AddToCalModal({ ev, onClose }: { ev: CampusEvent; onClose: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [added, setAdded] = useState(false);

  const options = [
    { label: "Personal UniLink Calendar", emoji: "📅", primary: true },
    { label: "Google Calendar", emoji: "🗓️" },
    { label: "Apple Calendar", emoji: "🍎" },
    { label: "Outlook", emoji: "📬" },
  ];

  return (
    <Overlay onClose={onClose}>
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, padding: "24px 28px", minWidth: 360, boxShadow: "0 24px 80px rgba(0,0,0,0.25)" }}>
        {added ? (
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Ic n="check" size={22} color="#10B981" />
            </div>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 16, color: c.text, marginBottom: 8 }}>Added to Calendar</div>
            <div style={{ fontSize: 13, color: c.textMuted, marginBottom: 18 }}>{ev.title} has been added to your calendar.</div>
            <button onClick={onClose} style={{ width: "100%", padding: "10px 0", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 16, color: c.text }}>Add to Calendar</div>
              <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><Ic n="x" size={16} color={c.textDim} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {options.map(o => (
                <button key={o.label} onClick={() => setAdded(true)}
                  style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 16px", borderRadius: 12, background: o.primary ? `${c.primary}08` : c.surface2, border: `1px solid ${o.primary ? c.primary + "25" : c.border}`, cursor: "pointer", transition: "background 0.12s", textAlign: "left" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = c.surface3)}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = o.primary ? `${c.primary}08` : c.surface2)}>
                  <span style={{ fontSize: 20 }}>{o.emoji}</span>
                  <span style={{ fontSize: 13, fontWeight: o.primary ? 700 : 500, color: o.primary ? c.primary : c.text }}>{o.label}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </Overlay>
  );
}

// ─── TOAST ─────────────────────────────────────────────────────────────────────
function Toast({ msg, onUndo, onDismiss }: { msg: string; onUndo?: () => void; onDismiss: () => void }) {
  useEffect(() => { const t = setTimeout(onDismiss, 3000); return () => clearTimeout(t); }, [onDismiss]);
  return (
    <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 9999, background: "#1E293B", color: "#F8FAFC", borderRadius: 12, padding: "11px 20px", display: "flex", gap: 10, alignItems: "center", boxShadow: "0 8px 24px rgba(0,0,0,0.3)", fontFamily: "Inter", fontSize: 13, fontWeight: 500, whiteSpace: "nowrap" }}>
      <Ic n="check" size={13} color="#10B981" /> {msg}
      {onUndo && <button onClick={onUndo} style={{ color: "#60A5FA", fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontSize: 13, padding: 0 }}>Undo</button>}
      <button onClick={onDismiss} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, marginLeft: 4 }}><Ic n="x" size={13} color="#94A3B8" /></button>
    </div>
  );
}

// ─── ATOMS ─────────────────────────────────────────────────────────────────────
function CatBadge({ cat }: { cat: string }) {
  const cfg = CAT_CFG[cat] ?? CAT_CFG.General;
  return <span style={{ padding: "2px 8px", borderRadius: 6, fontSize: 10, fontWeight: 700, color: cfg.color, background: cfg.bg, letterSpacing: "0.03em" }}>{cat}</span>;
}
function StatusPill({ status }: { status: EventStatus }) {
  const s = STATUS_CFG[status];
  return <span style={{ padding: "2px 9px", borderRadius: 999, fontSize: 10, fontWeight: 700, color: s.color, background: s.bg, border: `1px solid ${s.border}`, whiteSpace: "nowrap" }}>{s.label}</span>;
}
function StatCard({ label, value, icon, color, bg }: { label: string; value: string | number; icon: string; color: string; bg: string }) {
  const { theme } = useTheme(); const c = tok(theme);
  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "16px 18px", boxShadow: c.cardShadow, display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 42, height: 42, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Ic n={icon} size={19} color={color} />
      </div>
      <div>
        <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 24, color, lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: c.text, marginTop: 3 }}>{label}</div>
      </div>
    </div>
  );
}

// ─── EVENT CARD ────────────────────────────────────────────────────────────────
function EventCard({ ev, saved, registered, onSave, onOpen }: {
  ev: CampusEvent; saved: boolean; registered: boolean; onSave: () => void; onOpen: () => void;
}) {
  const { theme } = useTheme(); const c = tok(theme);
  const [hov, setHov] = useState(false);
  const reg = registered ? "registered" : ev.regStatus;

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: c.surface, border: `1px solid ${hov ? ev.color + "45" : c.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: hov ? `0 6px 24px ${ev.color}12, ${c.cardShadow}` : c.cardShadow, transition: "all 0.15s", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 3, borderRadius: 2, background: ev.color, marginBottom: 14, width: 36 }} />
      <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
        <CatBadge cat={ev.category} />
        <StatusPill status={ev.status} />
        {ev.postponedFrom && <span style={{ fontSize: 10, color: "#8B5CF6", fontWeight: 700 }}>Moved from {ev.postponedFrom}</span>}
      </div>
      <div onClick={onOpen} style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 15, color: ev.status === "cancelled" ? c.textDim : c.text, marginBottom: 5, cursor: "pointer", lineHeight: 1.35 }}>{ev.title}</div>
      <div style={{ fontSize: 12, color: c.textMuted, marginBottom: 12 }}>{ev.organizer}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 }}>
        {[{ i: "calendar", t: ev.date }, { i: "clock", t: ev.time }, { i: "map", t: ev.location }].map(row => (
          <div key={row.i} style={{ display: "flex", gap: 7, alignItems: "center" }}>
            <Ic n={row.i} size={11} color={c.textDim} /><span style={{ fontSize: 11, color: c.textDim }}>{row.t}</span>
          </div>
        ))}
      </div>
      {reg !== "none" && (
        <div style={{ fontSize: 11, fontWeight: 600, color: REG_CFG[reg as RegStatus]?.color ?? "#64748B", marginBottom: 12, display: "flex", alignItems: "center", gap: 4 }}>
          {reg === "registered" && <Ic n="check" size={11} color={REG_CFG.registered.color} />}
          {REG_CFG[reg as RegStatus]?.label}
        </div>
      )}
      <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
        <button onClick={onOpen} style={{ flex: 1, padding: "7px 0", borderRadius: 9, background: ev.color, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
          View Event <Ic n="chevR" size={11} color="#fff" />
        </button>
        <button onClick={e => { e.stopPropagation(); onSave(); }} style={{ padding: "7px 10px", borderRadius: 9, background: saved ? "rgba(37,99,235,0.08)" : c.surface2, border: `1px solid ${saved ? "rgba(37,99,235,0.25)" : c.border}`, cursor: "pointer" }}>
          <Ic n="bookmark" size={14} color={saved ? "#2563EB" : c.textDim} />
        </button>
      </div>
    </div>
  );
}

// ─── FEATURED BANNER ───────────────────────────────────────────────────────────
function FeaturedBanner({ ev, saved, onSave, onOpen }: { ev: CampusEvent; saved: boolean; onSave: () => void; onOpen: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, padding: "24px 28px", boxShadow: c.cardShadow, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap", marginBottom: 24, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: ev.color }} />
      <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
        <div style={{ width: 52, height: 52, borderRadius: 15, background: `${ev.color}12`, border: `1px solid ${ev.color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Ic n="zap" size={24} color={ev.color} />
        </div>
        <div>
          <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 5 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: ev.color, textTransform: "uppercase", letterSpacing: "0.1em" }}>Featured</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: REG_CFG.open.color, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 999, padding: "1px 7px" }}>Registration Open</span>
          </div>
          <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 18, color: c.text, marginBottom: 4 }}>{ev.title}</div>
          <div style={{ fontSize: 12, color: c.textMuted }}>{ev.description.slice(0, 100)}…</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap", flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Date</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: c.text }}>{ev.date}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Location</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: c.text }}>{ev.location}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onOpen} style={{ padding: "9px 20px", borderRadius: 10, background: ev.color, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>View Event</button>
          <button onClick={onSave} style={{ padding: "9px 12px", borderRadius: 10, background: saved ? "rgba(37,99,235,0.08)" : c.surface2, border: `1px solid ${saved ? "rgba(37,99,235,0.25)" : c.border}`, cursor: "pointer" }}>
            <Ic n="bookmark" size={16} color={saved ? "#2563EB" : c.textDim} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CAMPUS CALENDAR ───────────────────────────────────────────────────────────
type CalView = "month" | "week" | "list";
const CAL_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const CAL_DATES = [
  [null, null, null, null, null, null, 1], [2, 3, 4, 5, 6, 7, 8], [9, 10, 11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20, 21, 22], [23, 24, 25, 26, 27, 28, 29], [30, null, null, null, null, null, null],
];
const EV_BY_DAY: Record<number, CampusEvent[]> = {};
EVENTS.forEach(e => {
  const d = parseInt(e.dateShort.replace("Sep ", ""));
  if (!isNaN(d)) { if (!EV_BY_DAY[d]) EV_BY_DAY[d] = []; EV_BY_DAY[d].push(e); }
});
const CAL_EXTRA: Record<number, { label: string; color: string; type: string }[]> = {
  2: [{ label: "SE Quiz", color: "#10B981", type: "exam" }],
  10: [{ label: "DB Midterm", color: "#2563EB", type: "exam" }],
  1: [{ label: "DB Assignment Due", color: "#F59E0B", type: "deadline" }],
};

function CampusCalendar({ onOpenEvent }: { onOpenEvent: (ev: CampusEvent) => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [calView, setCalView] = useState<CalView>("month");
  const [popoverDay, setPopoverDay] = useState<number | null>(null);

  const dayItems = (d: number) => [
    ...(EV_BY_DAY[d] ?? []).map(e => ({ label: e.title, color: e.color, type: "event", ev: e as CampusEvent | null })),
    ...(CAL_EXTRA[d] ?? []).map(x => ({ label: x.label, color: x.color, type: x.type, ev: null as CampusEvent | null })),
  ];

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 22 }}>
          <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 24, color: c.text, letterSpacing: "-0.02em", marginBottom: 4 }}>Campus Calendar</h1>
          <p style={{ fontSize: 13, color: c.textMuted }}>See everything happening across your university in one organized calendar.</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button style={{ padding: "7px 12px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.textMuted, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "Inter" }}>‹</button>
            <span style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 16, color: c.text, minWidth: 160, textAlign: "center" }}>September 2026</span>
            <button style={{ padding: "7px 12px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.textMuted, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "Inter" }}>›</button>
            <button style={{ padding: "7px 12px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "Inter" }}>Today</button>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {(["month", "week", "list"] as CalView[]).map(v => (
              <button key={v} onClick={() => setCalView(v)}
                style={{ padding: "7px 14px", borderRadius: 9, background: calView === v ? `${c.primary}10` : "transparent", color: calView === v ? c.primary : c.textMuted, border: `1px solid ${calView === v ? c.primary + "30" : c.border}`, fontFamily: "Inter", fontSize: 12, fontWeight: calView === v ? 700 : 500, cursor: "pointer", textTransform: "capitalize" }}>
                {v}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, marginBottom: 16, flexWrap: "wrap" }}>
          {[{ label: "Campus Event", dot: "#EF4444" }, { label: "Exam / Quiz", dot: "#2563EB" }, { label: "Assignment / Deadline", dot: "#F59E0B" }].map(l => (
            <div key={l.label} style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.dot }} />
              <span style={{ fontSize: 11, color: c.textDim }}>{l.label}</span>
            </div>
          ))}
        </div>

        {calView === "month" && (
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, overflow: "hidden", boxShadow: c.cardShadow }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", borderBottom: `1px solid ${c.border}`, background: c.surface2 }}>
              {CAL_DAYS.map(d => <div key={d} style={{ padding: "10px 0", textAlign: "center", fontSize: 10, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.06em" }}>{d}</div>)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)" }}>
              {CAL_DATES.flat().map((day, i) => {
                const items = day ? dayItems(day) : [];
                const has = items.length > 0;
                return (
                  <div key={i} onClick={() => has && setPopoverDay(day)}
                    style={{ minHeight: 84, borderRight: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}`, padding: 6, cursor: has ? "pointer" : "default", transition: "background 0.12s" }}
                    onMouseEnter={e => { if (has) (e.currentTarget as HTMLElement).style.background = c.surface2; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                    {day && (
                      <>
                        <div style={{ fontSize: 12, fontWeight: has ? 700 : 400, color: has ? c.text : c.textDim, marginBottom: 4 }}>{day}</div>
                        {items.slice(0, 2).map((it, ei) => (
                          <div key={ei} style={{ marginBottom: 3, padding: "2px 5px", borderRadius: 4, background: `${it.color}14`, borderLeft: `2px solid ${it.color}` }}>
                            <div style={{ fontSize: 9, fontWeight: 600, color: it.color, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.label.split(" ").slice(0, 3).join(" ")}</div>
                          </div>
                        ))}
                        {items.length > 2 && <div style={{ fontSize: 9, color: c.textDim, fontWeight: 600 }}>+{items.length - 2} more</div>}
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {popoverDay !== null && (
              <div style={{ position: "fixed", inset: 0, zIndex: 100 }} onClick={() => setPopoverDay(null)}>
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }} />
                <div onClick={e => e.stopPropagation()} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "22px 24px", minWidth: 300, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text }}>Sep {popoverDay}</div>
                    <button onClick={() => setPopoverDay(null)} style={{ background: "none", border: "none", cursor: "pointer" }}><Ic n="x" size={16} color={c.textDim} /></button>
                  </div>
                  {dayItems(popoverDay!).map((it, i) => (
                    <div key={i} onClick={() => { if (it.ev) { onOpenEvent(it.ev); setPopoverDay(null); } }}
                      style={{ padding: "10px 12px", background: c.surface2, borderRadius: 10, border: `1px solid ${c.border}`, borderLeft: `3px solid ${it.color}`, marginBottom: 8, cursor: it.ev ? "pointer" : "default" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: c.text, marginBottom: 2 }}>{it.label}</div>
                      <div style={{ fontSize: 11, color: c.textDim, textTransform: "capitalize" }}>{it.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {calView === "week" && (
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "20px 22px", boxShadow: c.cardShadow }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 16 }}>Sep 7 – Sep 13, 2026</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 8 }}>
              {["Mon 7", "Tue 8", "Wed 9", "Thu 10", "Fri 11", "Sat 12", "Sun 13"].map((day, di) => {
                const evs: { label: string; color: string; time: string }[] = [];
                if (di === 1) evs.push({ label: "Database Workshop", color: "#10B981", time: "2:00 PM" });
                if (di === 3) evs.push({ label: "DB Midterm", color: "#2563EB", time: "10:00 AM" });
                if (di === 5) evs.push({ label: "Programming Contest", color: "#F59E0B", time: "9:00 AM" });
                return (
                  <div key={day} style={{ minHeight: 130 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: c.textDim, marginBottom: 8, textAlign: "center" }}>{day}</div>
                    {evs.map((ev, ei) => (
                      <div key={ei} style={{ padding: "6px 8px", borderRadius: 8, background: `${ev.color}10`, border: `1px solid ${ev.color}25`, borderLeft: `3px solid ${ev.color}`, marginBottom: 6, cursor: "pointer" }}>
                        <div style={{ fontSize: 9, color: ev.color, fontWeight: 700, marginBottom: 2 }}>{ev.time}</div>
                        <div style={{ fontSize: 10, fontWeight: 600, color: c.text, lineHeight: 1.3 }}>{ev.label}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {calView === "list" && (
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, overflow: "hidden", boxShadow: c.cardShadow }}>
            <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 120px 150px 80px 80px", padding: "10px 20px", background: c.surface2, borderBottom: `1px solid ${c.border}` }}>
              {["Date", "Event", "Category", "Organizer", "Time", "Status"].map(h => (
                <div key={h} style={{ fontSize: 10, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</div>
              ))}
            </div>
            {EVENTS.map((ev, i) => (
              <div key={ev.id} onClick={() => onOpenEvent(ev)}
                style={{ display: "grid", gridTemplateColumns: "80px 1fr 120px 150px 80px 80px", alignItems: "center", padding: "13px 20px", borderBottom: i < EVENTS.length - 1 ? `1px solid ${c.border}` : "none", cursor: "pointer", transition: "background 0.13s" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = c.surface2)}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}>
                <div style={{ fontSize: 11, fontWeight: 700, color: c.textDim }}>{ev.dateShort}</div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", minWidth: 0 }}>
                  <div style={{ width: 3, height: 28, borderRadius: 2, background: ev.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: c.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ev.title}</span>
                </div>
                <CatBadge cat={ev.category} />
                <div style={{ fontSize: 12, color: c.textMuted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ev.organizer}</div>
                <div style={{ fontSize: 11, color: c.textDim }}>{ev.time.split(" – ")[0]}</div>
                <StatusPill status={ev.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SAVED EVENTS ──────────────────────────────────────────────────────────────
const SAVED_FILTERS = ["All", "Upcoming", "Registered", "Completed"] as const;

function SavedEventsPage({ savedIds, registeredIds, onToggleSave, onOpenEvent, onBrowse }: {
  savedIds: Set<string>; registeredIds: Set<string>; onToggleSave: (id: string) => void;
  onOpenEvent: (ev: CampusEvent) => void; onBrowse: () => void;
}) {
  const { theme } = useTheme(); const c = tok(theme);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [toast, setToast] = useState<{ msg: string; id: string } | null>(null);

  const savedEvents = EVENTS.filter(e => savedIds.has(e.id));
  const filtered = savedEvents.filter(e => {
    const mq = !query || e.title.toLowerCase().includes(query.toLowerCase());
    const mf = filter === "All" ? true
      : filter === "Upcoming" ? e.status === "upcoming" || e.status === "today"
        : filter === "Registered" ? registeredIds.has(e.id)
          : filter === "Completed" ? e.status === "completed"
            : true;
    return mq && mf;
  });

  function handleRemove(id: string) {
    onToggleSave(id);
    setToast({ msg: "Event removed from Saved", id });
  }

  const reg = (e: CampusEvent) => registeredIds.has(e.id) ? "registered" : e.regStatus;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 24, color: c.text, letterSpacing: "-0.02em", marginBottom: 4 }}>Saved Events</h1>
          <p style={{ fontSize: 13, color: c.textMuted }}>Keep track of events you don&apos;t want to miss.</p>
          {savedIds.size > 0 && <div style={{ fontSize: 12, fontWeight: 600, color: c.textDim, marginTop: 6 }}>{savedIds.size} saved {savedIds.size === 1 ? "event" : "events"}</div>}
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: "1 1 220px" }}>
            <div style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}><Ic n="search" size={14} color={c.textDim} /></div>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search saved events..."
              style={{ width: "100%", padding: "8px 12px 8px 34px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ display: "flex", gap: 5 }}>
            {SAVED_FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                style={{ padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: filter === f ? 700 : 500, background: filter === f ? `${c.primary}10` : "transparent", color: filter === f ? c.primary : c.textMuted, border: `1px solid ${filter === f ? c.primary + "30" : c.border}`, cursor: "pointer" }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "60px 24px", textAlign: "center", boxShadow: c.cardShadow }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: c.surface2, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><Ic n="bookmark" size={24} color={c.textDim} /></div>
            <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 6 }}>{savedEvents.length === 0 ? "No Saved Events" : "No Events Found"}</div>
            <div style={{ fontSize: 13, color: c.textDim, marginBottom: 20 }}>{savedEvents.length === 0 ? "Save events you're interested in and they'll appear here." : "No saved events match your filters."}</div>
            {savedEvents.length === 0 && <button onClick={onBrowse} style={{ padding: "9px 22px", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Explore Events</button>}
          </div>
        ) : (
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, overflow: "hidden", boxShadow: c.cardShadow }}>
            {filtered.map((ev, i) => {
              const regStatus = reg(ev);
              return (
                <div key={ev.id} style={{ display: "flex", gap: 14, alignItems: "center", padding: "15px 20px", borderBottom: i < filtered.length - 1 ? `1px solid ${c.border}` : "none", transition: "background 0.13s" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = c.surface2)}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}>
                  <div style={{ width: 4, height: 44, borderRadius: 2, background: ev.color, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: c.text, marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ev.title}</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: c.textMuted }}>{ev.dateShort}</span>
                      <span style={{ fontSize: 11, color: c.textDim }}>·</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: REG_CFG[regStatus as RegStatus]?.color ?? c.textDim }}>{REG_CFG[regStatus as RegStatus]?.label}</span>
                      {ev.savedAgo && <span style={{ fontSize: 11, color: c.textDim }}>· Saved {ev.savedAgo}</span>}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 7, flexShrink: 0 }}>
                    <button onClick={() => onOpenEvent(ev)} style={{ padding: "7px 16px", borderRadius: 9, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>View Event</button>
                    <button onClick={() => handleRemove(ev.id)} style={{ padding: "7px 10px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, cursor: "pointer" }} title="Remove">
                      <Ic n="x" size={13} color={c.textDim} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {toast && <Toast msg={toast.msg} onUndo={() => { onToggleSave(toast!.id); setToast(null); }} onDismiss={() => setToast(null)} />}
    </div>
  );
}

// ─── EVENT DETAIL ──────────────────────────────────────────────────────────────
function EventDetail({ ev, saved, isRegistered, onSave, onRegister, onBack }: {
  ev: CampusEvent; saved: boolean; isRegistered: boolean;
  onSave: () => void; onRegister: () => void; onBack: () => void;
}) {
  const { theme } = useTheme(); const c = tok(theme);
  const [showRegModal, setShowRegModal] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showAddCal, setShowAddCal] = useState(false);
  const [reminderSet, setReminderSet] = useState(false);
  const [reminder, setReminder] = useState("1 hour before");
  const related = EVENTS.filter(e => e.id !== ev.id && (e.category === ev.category || e.organizer === ev.organizer)).slice(0, 3);

  const registered = isRegistered;

  // Group schedule by day
  const scheduleDays: Record<string, { time: string; title: string }[]> = {};
  (ev.schedule ?? []).forEach(s => {
    const key = s.day ?? "Schedule";
    if (!scheduleDays[key]) scheduleDays[key] = [];
    scheduleDays[key].push({ time: s.time, title: s.title });
  });

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: c.textMuted, cursor: "pointer", fontFamily: "Inter", fontSize: 12, fontWeight: 600, marginBottom: 20, padding: 0 }}>
          <Ic n="arrowL" size={14} color={c.textMuted} /> Back to Events
        </button>

        {/* Header */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, padding: "24px 28px", boxShadow: c.cardShadow, marginBottom: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: ev.color }} />

          {ev.status === "cancelled" && (
            <div style={{ marginBottom: 14, padding: "10px 14px", background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 10, display: "flex", gap: 8, alignItems: "center" }}>
              <Ic n="alert" size={14} color={c.textDim} />
              <span style={{ fontSize: 12, color: c.textMuted, fontWeight: 600 }}>Event Cancelled — Unfortunately, this event has been cancelled. Due to unforeseen circumstances.</span>
            </div>
          )}
          {ev.status === "postponed" && ev.postponedFrom && (
            <div style={{ marginBottom: 14, padding: "10px 14px", background: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 10 }}>
              <div style={{ fontSize: 12, color: "#8B5CF6", fontWeight: 700, marginBottom: 2 }}>Event Rescheduled</div>
              <div style={{ fontSize: 12, color: c.textMuted }}>Original: {ev.postponedFrom} · New: {ev.dateShort}</div>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap", alignItems: "center" }}>
                <CatBadge cat={ev.category} />
                <StatusPill status={ev.status} />
              </div>
              <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: ev.status === "cancelled" ? c.textDim : c.text, letterSpacing: "-0.01em", marginBottom: 6 }}>{ev.title}</h1>
              <div style={{ fontSize: 13, color: c.textMuted }}>{ev.organizer}</div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {ev.status !== "cancelled" && !registered && ev.regStatus === "open" && (
                <button onClick={() => setShowRegModal(true)} style={{ padding: "9px 22px", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Register Now</button>
              )}
              {registered && (
                <div style={{ padding: "9px 16px", borderRadius: 10, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)", display: "flex", alignItems: "center", gap: 6 }}>
                  <Ic n="check" size={14} color="#10B981" />
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#10B981" }}>Registered</span>
                </div>
              )}
              {ev.regStatus === "closed" && !registered && (
                <div style={{ padding: "9px 16px", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, fontSize: 13, fontWeight: 600, color: c.textDim }}>Registration Closed</div>
              )}
              <button onClick={onSave} style={{ padding: "9px 14px", borderRadius: 10, background: saved ? "rgba(37,99,235,0.08)" : c.surface2, border: `1px solid ${saved ? "rgba(37,99,235,0.25)" : c.border}`, color: saved ? "#2563EB" : c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <Ic n="bookmark" size={14} color={saved ? "#2563EB" : c.textMuted} /> {saved ? "Saved" : "Save Event"}
              </button>
              <button onClick={() => setShowShare(true)} style={{ padding: "9px 14px", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <Ic n="share" size={14} color={c.textMuted} /> Share
              </button>
            </div>
          </div>

          {/* Meta strip */}
          <div style={{ display: "flex", gap: 24, marginTop: 22, paddingTop: 18, borderTop: `1px solid ${c.border}`, flexWrap: "wrap" }}>
            {[
              { label: "Date", val: ev.date },
              { label: "Time", val: ev.time },
              { label: "Location", val: ev.location },
              { label: "Organizer", val: ev.organizer },
              { label: "Category", val: ev.category },
              ...(ev.capacity ? [{ label: "Capacity", val: `${ev.capacity} seats` }] : []),
              ...(ev.regDeadline ? [{ label: "Registration Deadline", val: ev.regDeadline }] : []),
            ].map(m => (
              <div key={m.label}>
                <div style={{ fontSize: 10, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>{m.label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, alignItems: "flex-start" }}>
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Description */}
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 12 }}>About This Event</div>
              <p style={{ fontSize: 14, color: c.textMuted, lineHeight: 1.75, margin: 0 }}>{ev.description}</p>
            </div>

            {/* Schedule */}
            {ev.schedule && (
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
                <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 16 }}>Event Schedule</div>
                {Object.entries(scheduleDays).map(([day, items]) => (
                  <div key={day} style={{ marginBottom: 18 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: ev.color, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12 }}>{day}</div>
                    <div style={{ position: "relative" }}>
                      <div style={{ position: "absolute", left: 13, top: 6, bottom: 0, width: 1, background: c.border }} />
                      {items.map((item, i) => (
                        <div key={i} style={{ display: "flex", gap: 14, marginBottom: 13 }}>
                          <div style={{ width: 28, height: 28, borderRadius: 9, background: `${ev.color}10`, border: `1px solid ${ev.color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1 }}>
                            <div style={{ width: 7, height: 7, borderRadius: "50%", background: ev.color }} />
                          </div>
                          <div style={{ paddingTop: 4 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: c.textDim, marginBottom: 2 }}>{item.time}</div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{item.title}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Eligibility */}
            {ev.eligibility && ev.eligibility.length > 0 && (
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
                <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 12 }}>Who Can Join?</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {ev.eligibility.map((e, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: ev.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: c.textMuted }}>{e}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related */}
            {related.length > 0 && (
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
                <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>You May Also Like</div>
                {related.map((r, i) => (
                  <div key={r.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: "11px 12px", background: c.surface2, borderRadius: 11, border: `1px solid ${c.border}`, marginBottom: i < related.length - 1 ? 8 : 0, cursor: "pointer" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = c.surface3)}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = c.surface2)}>
                    <div style={{ width: 4, height: 36, borderRadius: 2, background: r.color, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: c.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 2 }}>{r.title}</div>
                      <div style={{ fontSize: 11, color: c.textDim }}>{r.dateShort} · {r.location}</div>
                    </div>
                    <Ic n="chevR" size={14} color={c.textDim} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Registration card */}
            {ev.status !== "cancelled" && ev.regStatus !== "none" && (
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: c.cardShadow }}>
                <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 12 }}>Registration</div>
                {registered ? (
                  <div style={{ padding: "12px 14px", background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 10, marginBottom: 12 }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 3 }}>
                      <Ic n="check" size={13} color="#10B981" />
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#10B981" }}>You&apos;re Registered</span>
                    </div>
                    <div style={{ fontSize: 11, color: c.textDim }}>{ev.date}</div>
                  </div>
                ) : (
                  <>
                    <div style={{ fontSize: 12, fontWeight: 600, color: REG_CFG[ev.regStatus].color, marginBottom: 8 }}>{REG_CFG[ev.regStatus].label}</div>
                    {ev.regDeadline && <div style={{ fontSize: 11, color: c.textDim, marginBottom: 10 }}>Deadline: {ev.regDeadline}</div>}
                    {ev.capacity && ev.registeredCount !== undefined && (
                      <>
                        <div style={{ fontSize: 11, color: c.textDim, marginBottom: 6 }}>
                          {ev.capacity - ev.registeredCount} seats available · {ev.registeredCount}/{ev.capacity} filled
                        </div>
                        <div style={{ height: 5, borderRadius: 3, background: c.surface2, overflow: "hidden", marginBottom: 12 }}>
                          <div style={{ height: "100%", width: `${(ev.registeredCount / ev.capacity) * 100}%`, background: ev.color, borderRadius: 3 }} />
                        </div>
                      </>
                    )}
                  </>
                )}
                <div style={{ display: "flex", gap: 8 }}>
                  {!registered && ev.regStatus === "open" ? (
                    <button onClick={() => setShowRegModal(true)} style={{ flex: 1, padding: "9px 0", borderRadius: 10, background: ev.color, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Register Now</button>
                  ) : registered ? (
                    <>
                      <button style={{ flex: 1, padding: "9px 0", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>View Registration</button>
                    </>
                  ) : (
                    <button disabled style={{ flex: 1, padding: "9px 0", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textDim, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "not-allowed", opacity: 0.6 }}>Registration Closed</button>
                  )}
                </div>
                {registered && (
                  <button onClick={() => setShowAddCal(true)} style={{ width: "100%", marginTop: 8, padding: "8px 0", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    <Ic n="calendar" size={12} color={c.textMuted} /> Add to Calendar
                  </button>
                )}
              </div>
            )}

            {/* Reminder */}
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: c.cardShadow }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 12 }}>Event Reminder</div>
              {reminderSet ? (
                <div style={{ padding: "11px 13px", background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 10, display: "flex", gap: 7, alignItems: "center" }}>
                  <Ic n="check" size={13} color="#10B981" />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#10B981" }}>Reminder Set</div>
                    <div style={{ fontSize: 11, color: c.textDim }}>Notify {reminder}.</div>
                  </div>
                </div>
              ) : (
                <>
                  <select value={reminder} onChange={e => setReminder(e.target.value)}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 12, cursor: "pointer", outline: "none", marginBottom: 10 }}>
                    {["1 day before", "3 hours before", "1 hour before", "30 minutes before"].map(o => <option key={o}>{o}</option>)}
                  </select>
                  <button onClick={() => setReminderSet(true)} style={{ width: "100%", padding: "8px 0", borderRadius: 9, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    <Ic n="bell" size={13} color="#fff" /> Set Reminder
                  </button>
                </>
              )}
            </div>

            {/* Location */}
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: c.cardShadow }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 12 }}>Event Location</div>
              <div style={{ background: c.surface2, borderRadius: 12, padding: "16px", textAlign: "center", border: `1px solid ${c.border}`, marginBottom: 12 }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>🏛️</div>
                <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 14, color: c.text }}>{ev.location}</div>
                {ev.building && <div style={{ fontSize: 12, color: c.textDim }}>{ev.building}</div>}
              </div>
              <button style={{ width: "100%", padding: "7px 0", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                <Ic n="map" size={12} color={c.textMuted} /> View Campus Location
              </button>
            </div>

            {/* Organizer */}
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: c.cardShadow }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 12 }}>Organized By</div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 12, background: `${ev.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Ic n="users" size={17} color={ev.color} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: c.text }}>{ev.organizer}</div>
                  <div style={{ fontSize: 11, color: c.textDim, textTransform: "capitalize" }}>{ev.organizerType}</div>
                </div>
              </div>
              {ev.organizerType === "club" && (
                <button style={{ width: "100%", padding: "7px 0", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                  View Club <Ic n="chevR" size={12} color={c.textMuted} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showRegModal && (
        <RegistrationModal ev={ev} onClose={() => setShowRegModal(false)} onDone={onRegister} />
      )}
      {showShare && <ShareModal ev={ev} onClose={() => setShowShare(false)} />}
      {showAddCal && <AddToCalModal ev={ev} onClose={() => setShowAddCal(false)} />}
    </div>
  );
}

// ─── EVENTS LIST ───────────────────────────────────────────────────────────────
const CAT_FILTERS = ["All", "Academic", "Seminar", "Workshop", "Hackathon", "Competition", "Sports", "Cultural", "Career", "Research", "Club"] as const;

function EventsList({ savedIds, registeredIds, onToggleSave, onRegister, onOpenEvent, onCalendar, onSaved }: {
  savedIds: Set<string>; registeredIds: Set<string>;
  onToggleSave: (id: string) => void; onRegister: (id: string) => void;
  onOpenEvent: (ev: CampusEvent) => void; onCalendar: () => void; onSaved: () => void;
}) {
  const { theme } = useTheme(); const c = tok(theme);
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("Soonest");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const featured = EVENTS.find(e => e.featured)!;
  const rest = EVENTS.filter(e => !e.featured);

  const filtered = rest.filter(e => {
    const mq = !query || e.title.toLowerCase().includes(query.toLowerCase()) || e.organizer.toLowerCase().includes(query.toLowerCase());
    const mc = cat === "All" || e.category === cat;
    return mq && mc;
  });

  function handleSave(id: string) {
    const was = savedIds.has(id);
    onToggleSave(id);
    setToast(was ? "Removed from Saved" : "Event Saved");
  }

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 24, color: c.text, letterSpacing: "-0.02em", marginBottom: 4 }}>Events</h1>
            <p style={{ fontSize: 13, color: c.textMuted }}>Discover events, activities, and opportunities happening across your campus.</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onSaved} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
              <Ic n="bookmark" size={13} color={c.textMuted} /> Saved Events ({savedIds.size})
            </button>
            <button onClick={onCalendar} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
              <Ic n="calendar" size={13} color={c.textMuted} /> Campus Calendar
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
          <StatCard label="Upcoming Events" value="18" icon="zap" color="#2563EB" bg="rgba(37,99,235,0.08)" />
          <StatCard label="This Week" value="7" icon="calendar" color="#F59E0B" bg="rgba(245,158,11,0.08)" />
          <StatCard label="Today" value="2" icon="clock" color="#10B981" bg="rgba(16,185,129,0.08)" />
          <StatCard label="Saved Events" value={savedIds.size} icon="bookmark" color="#8B5CF6" bg="rgba(139,92,246,0.08)" />
        </div>

        {/* Featured */}
        <FeaturedBanner ev={featured} saved={savedIds.has(featured.id)}
          onSave={() => handleSave(featured.id)} onOpen={() => onOpenEvent(featured)} />

        {/* Search + filters */}
        <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: "1 1 220px", minWidth: 180 }}>
            <div style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}><Ic n="search" size={14} color={c.textDim} /></div>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search events..."
              style={{ width: "100%", padding: "8px 12px 8px 34px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
          </div>
          <select style={{ padding: "8px 12px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 12, cursor: "pointer", outline: "none" }}>
            <option>Any Date</option><option>Today</option><option>This Week</option><option>This Month</option><option>Custom Date</option>
          </select>
          <select style={{ padding: "8px 12px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 12, cursor: "pointer", outline: "none" }}>
            <option>All Organizers</option><option>University</option><option>Department</option><option>Club</option><option>Student Organization</option>
          </select>
          <select style={{ padding: "8px 12px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 12, cursor: "pointer", outline: "none" }}>
            <option>All Registrations</option><option>Registration Open</option><option>Registration Closed</option>
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 12, cursor: "pointer", outline: "none" }}>
            <option>Soonest</option><option>Newest</option><option>Popular</option>
          </select>
        </div>

        {/* Category chips */}
        <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
          {CAT_FILTERS.map(f => (
            <button key={f} onClick={() => setCat(f)}
              style={{ padding: "5px 14px", borderRadius: 999, fontSize: 12, fontWeight: cat === f ? 700 : 500, background: cat === f ? `${c.primary}10` : "transparent", color: cat === f ? c.primary : c.textMuted, border: `1px solid ${cat === f ? c.primary + "30" : c.border}`, cursor: "pointer", transition: "all 0.13s" }}>
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "60px 24px", textAlign: "center", boxShadow: c.cardShadow }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: c.surface2, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><Ic n="calendar" size={24} color={c.textDim} /></div>
            <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 6 }}>No Events Found</div>
            <div style={{ fontSize: 13, color: c.textDim, marginBottom: 20 }}>Try changing your filters or search for another event.</div>
            <button onClick={() => { setQuery(""); setCat("All"); }} style={{ padding: "9px 20px", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Clear Filters</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {filtered.map(ev => (
              <EventCard key={ev.id} ev={ev} saved={savedIds.has(ev.id)} registered={registeredIds.has(ev.id)}
                onSave={() => handleSave(ev.id)} onOpen={() => onOpenEvent(ev)} />
            ))}
          </div>
        )}
      </div>
      {toast && <Toast msg={toast} onDismiss={() => setToast(null)} />}
    </div>
  );
}

// ─── ROOT ──────────────────────────────────────────────────────────────────────
type EvView = "list" | "detail" | "calendar" | "saved";

export default function EventsPage() {
  const [view, setView] = useState<EvView>("list");
  const [selected, setSelected] = useState<CampusEvent | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      const s = localStorage.getItem("unilink_saved_events");
      if (s) { try { return new Set(JSON.parse(s)); } catch { } }
    }
    return new Set(["ev2", "ev4"]);
  });
  const [regIds, setRegIds] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      const s = localStorage.getItem("unilink_reg_events");
      if (s) { try { return new Set(JSON.parse(s)); } catch { } }
    }
    return new Set(["ev2"]);
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("unilink_saved_events", JSON.stringify(Array.from(savedIds)));
    }
  }, [savedIds]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("unilink_reg_events", JSON.stringify(Array.from(regIds)));
    }
  }, [regIds]);

  function toggleSave(id: string) {
    setSavedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }
  function register(id: string) {
    setRegIds(prev => new Set([...prev, id]));
  }
  function openEvent(ev: CampusEvent) { setSelected(ev); setView("detail"); }

  if (view === "calendar") return <CampusCalendar onOpenEvent={ev => openEvent(ev)} />;
  if (view === "saved") return <SavedEventsPage savedIds={savedIds} registeredIds={regIds} onToggleSave={toggleSave} onOpenEvent={ev => openEvent(ev)} onBrowse={() => setView("list")} />;
  if (view === "detail" && selected) return (
    <EventDetail ev={selected} saved={savedIds.has(selected.id)} isRegistered={regIds.has(selected.id)}
      onSave={() => toggleSave(selected.id)} onRegister={() => register(selected.id)} onBack={() => setView("list")} />
  );
  return <EventsList savedIds={savedIds} registeredIds={regIds} onToggleSave={toggleSave} onRegister={register} onOpenEvent={openEvent} onCalendar={() => setView("calendar")} onSaved={() => setView("saved")} />;
}
