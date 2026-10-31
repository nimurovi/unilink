"use client";
import { useState, useEffect, useContext } from "react";
import { ThemeCtx } from "@/components/ui/Theme";

type Theme = "light" | "dark";
const useTheme = () => useContext(ThemeCtx);

const LIGHT = {
  bg: "#F8FAFC", surface: "#FFFFFF", surface2: "#F1F5F9", surface3: "#E2E8F0",
  primary: "#2563EB", text: "#0F172A", textMuted: "#64748B", textDim: "#94A3B8",
  border: "#E2E8F0", cardShadow: "0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)",
  success: "#10B981", successBg: "rgba(16,185,129,0.07)", successBorder: "rgba(16,185,129,0.2)",
  warn: "#F59E0B", warnBg: "rgba(245,158,11,0.07)", warnBorder: "rgba(245,158,11,0.2)",
  danger: "#EF4444", dangerBg: "rgba(239,68,68,0.06)", dangerBorder: "rgba(239,68,68,0.18)",
  mutedBg: "rgba(100,116,139,0.07)", mutedBorder: "rgba(100,116,139,0.2)",
};
const DARK = {
  bg: "#080D1A", surface: "#0F172A", surface2: "#172033", surface3: "#1E293B",
  primary: "#3B82F6", text: "#F8FAFC", textMuted: "#94A3B8", textDim: "#475569",
  border: "#1E293B", cardShadow: "0 1px 4px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.18)",
  success: "#34D399", successBg: "rgba(52,211,153,0.07)", successBorder: "rgba(52,211,153,0.2)",
  warn: "#FBBF24", warnBg: "rgba(251,191,36,0.07)", warnBorder: "rgba(251,191,36,0.2)",
  danger: "#F87171", dangerBg: "rgba(248,113,113,0.07)", dangerBorder: "rgba(248,113,113,0.2)",
  mutedBg: "rgba(148,163,184,0.07)", mutedBorder: "rgba(148,163,184,0.15)",
};
const tok = (t: Theme) => t === "light" ? LIGHT : DARK;

const P: Record<string, string[]> = {
  arrowL:  ["M19 12H5M12 19l-7-7 7-7"],
  check:   ["M20 6L9 17l-5-5"],
  x:       ["M18 6L6 18M6 6l12 12"],
  edit:    ["M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7","M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"],
  trash:   ["M3 6h18","M19 6v14a2 2 0 0 0-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"],
  share:   ["M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8","M16 6l-4-4-4 4","M12 2v13"],
  plus:    ["M12 5v14M5 12h14"],
  search:  ["M21 21l-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z"],
  award:   ["M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z","M8.21 13.89L7 23l5-3 5 3-1.21-9.12"],
  star:    ["M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"],
  link:    ["M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71","M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"],
  upload:  ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4","M17 8l-5-5-5 5","M12 3v12"],
  file:    ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z","M14 2v6h6"],
  shield:  ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
  clock:   ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z","M12 6v6l4 2"],
  copy:    ["M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2z","M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"],
  chevD:   ["M6 9l6 6 6-6"],
  alert:   ["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z","M12 9v4","M12 17h.01"],
  eye:     ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z","M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"],
  linkedin:["M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z","M2 9h4v12H2z","M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"],
};

function Ic({ n, size = 16, color = "currentColor" }: { n: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      {(P[n] ?? []).map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

// ─── TYPES ────────────────────────────────────────────────────────────────────

type AchievementCategory =
  | "Academic" | "Competition" | "Certification" | "Research"
  | "Leadership" | "Club & Community" | "Volunteer" | "Sports" | "Creative" | "Other";

type VerificationStatus = "verified" | "pending" | "unverified" | "failed";

type Evidence = { type: "file" | "link"; label: string; url?: string };

type Achievement = {
  id: string;
  title: string;
  category: AchievementCategory;
  organization: string;
  date: string;        // e.g. "March 2026"
  dateSort: number;    // yyyymm for sorting
  result?: string;
  description: string;
  skills: string[];
  evidence: Evidence[];
  verification: VerificationStatus;
  verifiedBy?: string;
  verifiedDate?: string;
  visibility: "public" | "department" | "batch" | "section" | "private";
  color: string;
  emoji: string;
};

const CAT_CFG: Record<AchievementCategory, { color: string; bg: string; emoji: string }> = {
  Academic:          { color: "#2563EB", bg: "rgba(37,99,235,0.08)",  emoji: "🎓" },
  Competition:       { color: "#EF4444", bg: "rgba(239,68,68,0.07)",  emoji: "🏆" },
  Certification:     { color: "#8B5CF6", bg: "rgba(139,92,246,0.08)", emoji: "📜" },
  Research:          { color: "#06B6D4", bg: "rgba(6,182,212,0.08)",  emoji: "🔬" },
  Leadership:        { color: "#F59E0B", bg: "rgba(245,158,11,0.08)", emoji: "🌟" },
  "Club & Community":{ color: "#10B981", bg: "rgba(16,185,129,0.08)", emoji: "🤝" },
  Volunteer:         { color: "#F97316", bg: "rgba(249,115,22,0.08)", emoji: "💙" },
  Sports:            { color: "#EC4899", bg: "rgba(236,72,153,0.08)", emoji: "⚡" },
  Creative:          { color: "#A855F7", bg: "rgba(168,85,247,0.08)", emoji: "🎨" },
  Other:             { color: "#64748B", bg: "rgba(100,116,139,0.08)",emoji: "📌" },
};

const SAMPLE_ACHIEVEMENTS: Achievement[] = [
  {
    id: "a1", title: "UniHack 2026 Finalist", category: "Competition",
    organization: "National University Hackathon", date: "March 2026", dateSort: 202603,
    result: "Finalist", description: "Reached the final round of the National University Hackathon 2026 by developing a campus-focused collaboration platform with a team of four.",
    skills: ["React", "Node.js", "Database Design", "Problem Solving"],
    evidence: [{ type: "file", label: "Certificate.pdf" }, { type: "link", label: "Project Repository" }],
    verification: "verified", verifiedBy: "University Student Affairs", verifiedDate: "April 2026",
    visibility: "public", color: "#EF4444", emoji: "🏆",
  },
  {
    id: "a2", title: "Machine Learning Research Poster", category: "Research",
    organization: "University Research Symposium", date: "February 2026", dateSort: 202602,
    result: "Presenter", description: "Presented original research on natural language processing applied to student feedback systems at the annual University Research Symposium.",
    skills: ["Python", "TensorFlow", "Research", "Data Analysis"],
    evidence: [{ type: "file", label: "Research Poster.pdf" }, { type: "link", label: "Symposium Program" }],
    verification: "verified", verifiedBy: "University Research Office", verifiedDate: "February 2026",
    visibility: "public", color: "#06B6D4", emoji: "🔬",
  },
  {
    id: "a3", title: "Python for Everybody Specialization", category: "Certification",
    organization: "Coursera / University of Michigan", date: "January 2026", dateSort: 202601,
    result: "Certificate of Completion", description: "Completed the five-course Python for Everybody Specialization covering data structures, web access, databases, and data visualization.",
    skills: ["Python", "SQL", "Data Structures", "APIs"],
    evidence: [{ type: "link", label: "Credential Link" }],
    verification: "verified", verifiedBy: "Coursera", verifiedDate: "January 2026",
    visibility: "public", color: "#8B5CF6", emoji: "📜",
  },
  {
    id: "a4", title: "CSE Programming Club Executive", category: "Leadership",
    organization: "CSE Programming Club", date: "2025–2026", dateSort: 202509,
    result: "Executive Member", description: "Served as an executive member of the CSE Programming Club, organizing workshops, competitions, and mentoring sessions for junior students.",
    skills: ["Leadership", "Event Management", "Mentoring", "Communication"],
    evidence: [{ type: "file", label: "Appointment Letter.pdf" }],
    verification: "verified", verifiedBy: "CSE Programming Club", verifiedDate: "September 2025",
    visibility: "public", color: "#F59E0B", emoji: "🌟",
  },
  {
    id: "a5", title: "ICPC Regional Contestant", category: "Competition",
    organization: "ICPC Asia Regional", date: "November 2025", dateSort: 202511,
    result: "Participant", description: "Participated in the ICPC Asia Regional Dhaka Site as part of a three-member team, tackling algorithmic problem sets under time constraints.",
    skills: ["Algorithms", "C++", "Problem Solving", "Competitive Programming"],
    evidence: [{ type: "file", label: "Participation Certificate.pdf" }],
    verification: "verified", verifiedBy: "ICPC", verifiedDate: "November 2025",
    visibility: "public", color: "#EF4444", emoji: "🏆",
  },
  {
    id: "a6", title: "AWS Cloud Practitioner", category: "Certification",
    organization: "Amazon Web Services", date: "October 2025", dateSort: 202510,
    result: "Certified", description: "Earned the AWS Certified Cloud Practitioner credential demonstrating foundational cloud knowledge and AWS services.",
    skills: ["AWS", "Cloud Computing", "Infrastructure", "Networking"],
    evidence: [{ type: "link", label: "AWS Credential Link" }],
    verification: "pending",
    visibility: "public", color: "#8B5CF6", emoji: "📜",
  },
  {
    id: "a7", title: "Dean's List — Spring 2025", category: "Academic",
    organization: "Department of CSE", date: "June 2025", dateSort: 202506,
    result: "Dean's List", description: "Achieved placement on the Dean's List for maintaining an outstanding CGPA during the Spring 2025 semester.",
    skills: ["Academic Excellence"],
    evidence: [{ type: "file", label: "Dean's List Letter.pdf" }],
    verification: "verified", verifiedBy: "Department of CSE", verifiedDate: "June 2025",
    visibility: "public", color: "#2563EB", emoji: "🎓",
  },
  {
    id: "a8", title: "Campus Blood Drive Volunteer", category: "Volunteer",
    organization: "UniLink Student Welfare", date: "April 2025", dateSort: 202504,
    result: "Volunteer", description: "Volunteered as an organizer for the annual campus blood drive, coordinating logistics and encouraging student participation.",
    skills: ["Community Service", "Organization", "Communication"],
    evidence: [],
    verification: "unverified",
    visibility: "public", color: "#F97316", emoji: "💙",
  },
];

const ALL_SKILLS = ["Python","JavaScript","React","Java","C++","Node.js","SQL","Git","Docker","TensorFlow","Research","Data Analysis","Leadership","Communication","Event Management","Problem Solving","Algorithms","Machine Learning","AWS","Cloud Computing","Academic Excellence","Mentoring"];
const CATEGORIES: AchievementCategory[] = ["Academic","Competition","Certification","Research","Leadership","Club & Community","Volunteer","Sports","Creative","Other"];
const FILTER_TABS = ["All", ...CATEGORIES.filter(c => ["Academic","Competition","Certification","Research","Leadership","Club & Community"].includes(c)), "Other"];

// ─── SMALL HELPERS ────────────────────────────────────────────────────────────

function Tag({ label, color, bg }: { label: string; color: string; bg: string }) {
  return <span style={{ padding: "2px 9px", borderRadius: 6, fontSize: 11, fontWeight: 600, color, background: bg, whiteSpace: "nowrap" }}>{label}</span>;
}

function VerBadge({ status }: { status: VerificationStatus }) {
  const { theme } = useTheme(); const c = tok(theme);
  if (status === "verified") return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 9px", borderRadius: 6, fontSize: 11, fontWeight: 700, color: c.success, background: c.successBg, border: `1px solid ${c.successBorder}` }}>
      <Ic n="check" size={10} color={c.success} /> Verified
    </span>
  );
  if (status === "pending") return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 9px", borderRadius: 6, fontSize: 11, fontWeight: 700, color: c.warn, background: c.warnBg, border: `1px solid ${c.warnBorder}` }}>
      <Ic n="clock" size={10} color={c.warn} /> Pending
    </span>
  );
  if (status === "failed") return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 9px", borderRadius: 6, fontSize: 11, fontWeight: 700, color: c.danger, background: c.dangerBg, border: `1px solid ${c.dangerBorder}` }}>
      <Ic n="alert" size={10} color={c.danger} /> Unavailable
    </span>
  );
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 9px", borderRadius: 6, fontSize: 11, fontWeight: 600, color: c.textDim, background: c.mutedBg, border: `1px solid ${c.mutedBorder}` }}>
      Not Verified
    </span>
  );
}

function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, [onDone]);
  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 500, background: c.surface, border: `1px solid ${c.successBorder}`, borderRadius: 12, padding: "12px 18px", boxShadow: "0 8px 32px rgba(0,0,0,0.18)", display: "flex", alignItems: "center", gap: 10, minWidth: 240 }}>
      <div style={{ width: 26, height: 26, borderRadius: "50%", background: c.successBg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Ic n="check" size={12} color={c.success} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{msg}</span>
    </div>
  );
}

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

// ─── DELETE MODAL ─────────────────────────────────────────────────────────────

function DeleteModal({ achievement, onClose, onConfirm }: { achievement: Achievement; onClose: () => void; onConfirm: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  return (
    <Overlay onClose={onClose}>
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, padding: "28px 32px", minWidth: 400, maxWidth: 440, boxShadow: "0 24px 80px rgba(0,0,0,0.25)" }}>
        <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 16, color: c.text, marginBottom: 6 }}>Delete Achievement?</div>
        <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 6, lineHeight: 1.65 }}>
          <strong style={{ color: c.text }}>{achievement.title}</strong> will be removed from your UniLink profile.
        </p>
        {achievement.verification === "verified" && (
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "10px 14px", background: c.warnBg, border: `1px solid ${c.warnBorder}`, borderRadius: 10, marginBottom: 16, marginTop: 10 }}>
            <Ic n="alert" size={14} color={c.warn} />
            <p style={{ fontSize: 12, color: c.warn, lineHeight: 1.5, margin: 0 }}>Deleting this achievement will also remove its verification status.</p>
          </div>
        )}
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
          <button onClick={() => { onConfirm(); onClose(); }} style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: c.danger, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Delete Achievement</button>
        </div>
      </div>
    </Overlay>
  );
}

// ─── SHARE MODAL ──────────────────────────────────────────────────────────────

function ShareModal({ achievement, onClose }: { achievement: Achievement; onClose: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [copied, setCopied] = useState(false);
  const copy = () => { setCopied(true); setTimeout(() => setCopied(false), 1800); };
  return (
    <Overlay onClose={onClose}>
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, padding: "28px 32px", minWidth: 400, maxWidth: 440, boxShadow: "0 24px 80px rgba(0,0,0,0.25)" }}>
        <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 16, color: c.text, marginBottom: 18 }}>Share Achievement</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button onClick={copy} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, background: c.surface2, border: `1px solid ${c.border}`, cursor: "pointer", textAlign: "left" }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: `${c.primary}10`, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic n="copy" size={16} color={c.primary} /></div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{copied ? "Copied!" : "Copy Profile Link"}</div>
              <div style={{ fontSize: 11, color: c.textDim }}>Share a link to your achievement</div>
            </div>
          </button>
          <button onClick={onClose} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, background: c.surface2, border: `1px solid ${c.border}`, cursor: "pointer", textAlign: "left" }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(37,99,235,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic n="award" size={16} color={c.primary} /></div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>Share to UniLink Profile</div>
              <div style={{ fontSize: 11, color: c.textDim }}>Pin this achievement to your profile</div>
            </div>
          </button>
          <button onClick={onClose} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12, background: c.surface2, border: `1px solid ${c.border}`, cursor: "pointer", textAlign: "left" }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(10,102,194,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic n="linkedin" size={16} color="#0A66C2" /></div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>Share to LinkedIn</div>
              <div style={{ fontSize: 11, color: c.textDim }}>Coming soon</div>
            </div>
          </button>
        </div>
        <button onClick={onClose} style={{ marginTop: 16, width: "100%", padding: "10px 0", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Close</button>
      </div>
    </Overlay>
  );
}

// ─── ACHIEVEMENT FORM ─────────────────────────────────────────────────────────

function AchievementForm({
  initial, onSave, onCancel, mode,
}: {
  initial?: Achievement;
  onSave: (a: Partial<Achievement>) => void;
  onCancel: () => void;
  mode: "add" | "edit";
}) {
  const { theme } = useTheme(); const c = tok(theme);
  const [title,      setTitle]      = useState(initial?.title ?? "");
  const [category,   setCategory]   = useState<AchievementCategory>(initial?.category ?? "Competition");
  const [org,        setOrg]        = useState(initial?.organization ?? "");
  const [date,       setDate]       = useState(initial?.date ?? "");
  const [result,     setResult]     = useState(initial?.result ?? "");
  const [desc,       setDesc]       = useState(initial?.description ?? "");
  const [skills,     setSkills]     = useState<string[]>(initial?.skills ?? []);
  const [visibility, setVisibility] = useState<Achievement["visibility"]>(initial?.visibility ?? "public");
  const [reqVerify,  setReqVerify]  = useState(true);
  const [evidenceLinks, setEvidenceLinks] = useState(initial?.evidence.filter(e => e.type === "link").map(e => e.label).join("\n") ?? "");

  const inputStyle: React.CSSProperties = { width: "100%", padding: "9px 12px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 13, outline: "none", boxSizing: "border-box" };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: 11, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 };

  const catCfg = CAT_CFG[category];

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 660, margin: "0 auto" }}>
        <button onClick={onCancel} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: c.textMuted, cursor: "pointer", fontFamily: "Inter", fontSize: 12, fontWeight: 600, marginBottom: 24, padding: 0 }}>
          <Ic n="arrowL" size={14} color={c.textMuted} /> Back
        </button>
        <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: c.text, marginBottom: 4 }}>{mode === "add" ? "Add Achievement" : "Edit Achievement"}</h1>
        <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 28 }}>{mode === "add" ? "Add an accomplishment to your UniLink profile." : "Update your achievement details."}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Basic info */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 16 }}>Basic Information</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={labelStyle}>Achievement Title *</label>
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Hackathon Finalist" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Category *</label>
                <div style={{ position: "relative" }}>
                  <select value={category} onChange={e => setCategory(e.target.value as AchievementCategory)}
                    style={{ ...inputStyle, cursor: "pointer", appearance: "none", paddingRight: 36 }}>
                    {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                  </select>
                  <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><Ic n="chevD" size={14} color={c.textDim} /></div>
                </div>
                {category && (
                  <div style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 6, background: catCfg.bg, fontSize: 12, fontWeight: 600, color: catCfg.color }}>
                    <span>{catCfg.emoji}</span> {category}
                  </div>
                )}
              </div>
              <div>
                <label style={labelStyle}>Organization / Institution *</label>
                <input value={org} onChange={e => setOrg(e.target.value)} placeholder="e.g. National University Hackathon" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Date (Month / Year) *</label>
                <input value={date} onChange={e => setDate(e.target.value)} placeholder="e.g. March 2026" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Result / Position <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
                <input value={result} onChange={e => setResult(e.target.value)} placeholder="e.g. Winner, Finalist, Certificate of Completion" style={inputStyle} />
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>Description</div>
            <textarea rows={4} value={desc} onChange={e => setDesc(e.target.value.slice(0, 500))}
              placeholder="Briefly describe what you achieved..."
              style={{ ...inputStyle, resize: "vertical" }} />
            <div style={{ fontSize: 11, color: desc.length > 450 ? c.warn : c.textDim, marginTop: 6, textAlign: "right" }}>{desc.length}/500</div>
          </div>

          {/* Skills */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>Related Skills</div>
            {skills.length > 0 && (
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 12 }}>
                {skills.map(sk => (
                  <div key={sk} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 7, background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.15)" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#2563EB" }}>{sk}</span>
                    <button onClick={() => setSkills(s => s.filter(x => x !== sk))} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}><Ic n="x" size={10} color="#2563EB" /></button>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {ALL_SKILLS.filter(sk => !skills.includes(sk)).slice(0, 10).map(sk => (
                <button key={sk} onClick={() => setSkills(s => [...s, sk])}
                  style={{ padding: "4px 10px", borderRadius: 7, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                  + {sk}
                </button>
              ))}
            </div>
          </div>

          {/* Evidence */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>Add Evidence <span style={{ fontSize: 11, fontWeight: 400, color: c.textDim }}>(optional)</span></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              {[
                { icon: "upload", label: "Upload Certificate", desc: "PDF, JPG, PNG" },
                { icon: "link",   label: "Add Credential Link", desc: "External URL" },
                { icon: "link",   label: "Add Project Link",    desc: "Repository or live URL" },
                { icon: "upload", label: "Upload Image",        desc: "JPG, PNG" },
              ].map(ev => (
                <button key={ev.label} style={{ display: "flex", gap: 10, alignItems: "center", padding: "12px 14px", borderRadius: 11, background: c.surface2, border: `1px solid ${c.border}`, cursor: "pointer", textAlign: "left" }}>
                  <Ic n={ev.icon} size={15} color={c.textDim} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: c.text }}>{ev.label}</div>
                    <div style={{ fontSize: 10, color: c.textDim }}>{ev.desc}</div>
                  </div>
                </button>
              ))}
            </div>
            <div>
              <label style={labelStyle}>Credential / Project Links</label>
              <textarea rows={2} value={evidenceLinks} onChange={e => setEvidenceLinks(e.target.value)} placeholder="https://..." style={{ ...inputStyle, resize: "none" }} />
            </div>
          </div>

          {/* Privacy */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>Who can see this achievement?</div>
            {[
              { val: "public",     label: "University Students" },
              { val: "department", label: "My Department" },
              { val: "batch",      label: "My Batch" },
              { val: "section",    label: "My Section" },
              { val: "private",    label: "Only Me" },
            ].map(opt => (
              <label key={opt.val} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10, cursor: "pointer" }}>
                <input type="radio" name="visibility" value={opt.val} checked={visibility === opt.val} onChange={() => setVisibility(opt.val as Achievement["visibility"])} style={{ accentColor: c.primary }} />
                <span style={{ fontSize: 13, color: c.text }}>{opt.label}</span>
              </label>
            ))}
          </div>

          {/* Verification */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1, paddingRight: 16 }}>
                <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 4 }}>Request Verification</div>
                <div style={{ fontSize: 12, color: c.textDim, lineHeight: 1.55 }}>Verification helps other students understand that this achievement has been reviewed by an authorized source. Not all achievements can be automatically verified.</div>
              </div>
              <button onClick={() => setReqVerify(v => !v)} style={{ width: 40, height: 22, borderRadius: 11, background: reqVerify ? c.primary : c.surface3, border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
                <span style={{ position: "absolute", top: 2, left: reqVerify ? 20 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)", display: "block" }} />
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <button onClick={onCancel} style={{ flex: 1, padding: "11px 0", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
          <button onClick={() => onSave({ title, category, organization: org, date, result, description: desc, skills, visibility, verification: reqVerify ? "pending" : "unverified", evidence: [], color: catCfg.color, emoji: catCfg.emoji })}
            style={{ flex: 2, padding: "11px 0", borderRadius: 10, background: !title || !org || !date ? c.surface3 : c.primary, color: !title || !org || !date ? c.textDim : "#fff", border: "none", fontFamily: "Inter", fontSize: 14, fontWeight: 700, cursor: !title || !org || !date ? "not-allowed" : "pointer", transition: "all 0.15s" }}>
            {mode === "add" ? "Add Achievement" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ACHIEVEMENT DETAIL ───────────────────────────────────────────────────────

function AchievementDetail({ achievement, onBack, onEdit, onDelete }: {
  achievement: Achievement; onBack: () => void; onEdit: () => void; onDelete: () => void;
}) {
  const { theme } = useTheme(); const c = tok(theme);
  const [showDelete, setShowDelete] = useState(false);
  const [showShare,  setShowShare]  = useState(false);
  const cfg = CAT_CFG[achievement.category];

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 840, margin: "0 auto" }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: c.textMuted, cursor: "pointer", fontFamily: "Inter", fontSize: 12, fontWeight: 600, marginBottom: 24, padding: 0 }}>
          <Ic n="arrowL" size={14} color={c.textMuted} /> Back to Achievements
        </button>

        {/* Header card */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, padding: "28px 32px", boxShadow: c.cardShadow, marginBottom: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: achievement.color }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0, border: `1px solid ${achievement.color}20` }}>
                {achievement.emoji}
              </div>
              <div>
                <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: c.text, letterSpacing: "-0.01em", marginBottom: 6 }}>{achievement.title}</h1>
                <div style={{ fontSize: 14, color: c.textMuted, marginBottom: 8 }}>{achievement.organization}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                  <Tag label={achievement.category} color={cfg.color} bg={cfg.bg} />
                  <VerBadge status={achievement.verification} />
                  <span style={{ fontSize: 12, color: c.textDim }}>{achievement.date}</span>
                  {achievement.result && <span style={{ fontSize: 12, color: c.textMuted }}>· {achievement.result}</span>}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0, flexWrap: "wrap" }}>
              <button onClick={() => setShowShare(true)} style={{ padding: "8px 14px", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "Inter", fontSize: 12, fontWeight: 600, color: c.textMuted }}>
                <Ic n="share" size={13} color={c.textDim} /> Share
              </button>
              <button onClick={onEdit} style={{ padding: "8px 16px", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <Ic n="edit" size={13} color="#fff" /> Edit
              </button>
              <button onClick={() => setShowDelete(true)} style={{ padding: "8px 12px", borderRadius: 10, background: c.dangerBg, border: `1px solid ${c.dangerBorder}`, cursor: "pointer" }}>
                <Ic n="trash" size={14} color={c.danger} />
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 20 }}>
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 12 }}>Description</div>
              <p style={{ fontSize: 14, color: c.textMuted, lineHeight: 1.75, margin: 0 }}>{achievement.description}</p>
            </div>

            {achievement.skills.length > 0 && (
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
                <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 12 }}>Related Skills</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {achievement.skills.map(sk => <Tag key={sk} label={sk} color="#2563EB" bg="rgba(37,99,235,0.08)" />)}
                </div>
              </div>
            )}

            {achievement.evidence.length > 0 && (
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
                <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 12 }}>Evidence</div>
                {achievement.evidence.map((ev, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "10px 12px", background: c.surface2, borderRadius: 10, border: `1px solid ${c.border}`, marginBottom: 8 }}>
                    <Ic n={ev.type === "file" ? "file" : "link"} size={14} color={c.textDim} />
                    <span style={{ fontSize: 13, color: c.text, flex: 1 }}>{ev.label}</span>
                    <button style={{ padding: "4px 10px", borderRadius: 7, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                      {ev.type === "file" ? "View" : "Open"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: c.cardShadow }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 12 }}>Achievement Information</div>
              {[
                { label: "Category",     value: achievement.category },
                { label: "Organization", value: achievement.organization },
                { label: "Date",         value: achievement.date },
                ...(achievement.result ? [{ label: "Result", value: achievement.result }] : []),
                { label: "Visibility",   value: achievement.visibility === "public" ? "University Students" : achievement.visibility },
              ].map(r => (
                <div key={r.label} style={{ display: "flex", flexDirection: "column", marginBottom: 10 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>{r.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: c.text }}>{r.value}</span>
                </div>
              ))}
            </div>

            {/* Verification */}
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: c.cardShadow }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 12 }}>Verification</div>
              <VerBadge status={achievement.verification} />
              {achievement.verification === "verified" && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 11, color: c.textDim, marginBottom: 4 }}>Verified by</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: c.text }}>{achievement.verifiedBy}</div>
                  {achievement.verifiedDate && <div style={{ fontSize: 11, color: c.textDim, marginTop: 2 }}>{achievement.verifiedDate}</div>}
                </div>
              )}
              {achievement.verification === "pending" && (
                <p style={{ fontSize: 12, color: c.textMuted, marginTop: 10, lineHeight: 1.5 }}>Your achievement has been submitted for verification.</p>
              )}
              {achievement.verification === "unverified" && (
                <div style={{ marginTop: 10 }}>
                  <p style={{ fontSize: 12, color: c.textMuted, marginBottom: 10, lineHeight: 1.5 }}>You can optionally request verification for this achievement.</p>
                  <button style={{ width: "100%", padding: "8px 0", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Request Verification</button>
                </div>
              )}
              {achievement.verification === "failed" && (
                <div style={{ marginTop: 10 }}>
                  <p style={{ fontSize: 12, color: c.textMuted, marginBottom: 10, lineHeight: 1.5 }}>Verification could not be completed. You may update the evidence and try again.</p>
                  <button style={{ width: "100%", padding: "8px 0", borderRadius: 9, background: c.warnBg, border: `1px solid ${c.warnBorder}`, color: c.warn, fontFamily: "Inter", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Update Evidence</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showDelete && <DeleteModal achievement={achievement} onClose={() => setShowDelete(false)} onConfirm={onDelete} />}
      {showShare  && <ShareModal  achievement={achievement} onClose={() => setShowShare(false)} />}
    </div>
  );
}

// ─── ACHIEVEMENT CARD ─────────────────────────────────────────────────────────

function AchievementCard({ achievement, onOpen }: { achievement: Achievement; onOpen: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [hov, setHov] = useState(false);
  const cfg = CAT_CFG[achievement.category];

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: c.surface, border: `1px solid ${hov ? achievement.color + "40" : c.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: hov ? `0 6px 20px ${achievement.color}12, ${c.cardShadow}` : c.cardShadow, transition: "all 0.15s", display: "flex", flexDirection: "column", gap: 12, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: achievement.color, borderRadius: "16px 0 0 16px" }} />
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start", paddingLeft: 8 }}>
        <div style={{ width: 40, height: 40, borderRadius: 11, background: cfg.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
          {achievement.emoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 14, color: c.text, marginBottom: 2, lineHeight: 1.3 }}>{achievement.title}</div>
          <div style={{ fontSize: 12, color: c.textMuted, marginBottom: 6, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{achievement.organization}</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
            <Tag label={achievement.category} color={cfg.color} bg={cfg.bg} />
            <VerBadge status={achievement.verification} />
          </div>
        </div>
      </div>

      {achievement.description && (
        <p style={{ fontSize: 12, color: c.textMuted, lineHeight: 1.6, margin: "0 0 0 8px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {achievement.description}
        </p>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingLeft: 8 }}>
        <div>
          <span style={{ fontSize: 11, color: c.textDim }}>{achievement.date}</span>
          {achievement.result && <span style={{ fontSize: 11, color: c.textDim }}> · {achievement.result}</span>}
        </div>
        <button onClick={onOpen} style={{ padding: "6px 14px", borderRadius: 8, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all 0.1s" }}>View</button>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

type AchView = "list" | "detail" | "add" | "edit";

export default function AchievementsPage() {
  const { theme } = useTheme(); const c = tok(theme);
  const [achievements, setAchievements] = useState<Achievement[]>(SAMPLE_ACHIEVEMENTS);
  const [view,       setView]        = useState<AchView>("list");
  const [selected,   setSelected]    = useState<Achievement | null>(null);
  const [filter,     setFilter]      = useState("All");
  const [verFilter,  setVerFilter]   = useState<"all" | "verified" | "unverified">("all");
  const [query,      setQuery]       = useState("");
  const [sort,       setSort]        = useState<"newest" | "oldest" | "title">("newest");
  const [toast,      setToast]       = useState<string | null>(null);

  const showToast = (msg: string) => setToast(msg);

  const sorted = [...achievements].sort((a, b) => {
    if (sort === "newest") return b.dateSort - a.dateSort;
    if (sort === "oldest") return a.dateSort - b.dateSort;
    return a.title.localeCompare(b.title);
  });

  const filtered = sorted.filter(a => {
    const matchCat = filter === "All" || a.category === filter;
    const matchVer = verFilter === "all" || (verFilter === "verified" ? a.verification === "verified" : a.verification !== "verified");
    const matchQ   = !query || [a.title, a.organization, a.category, a.date].some(s => s.toLowerCase().includes(query.toLowerCase()));
    return matchCat && matchVer && matchQ;
  });

  const stats = {
    total:         achievements.length,
    verified:      achievements.filter(a => a.verification === "verified").length,
    certifications:achievements.filter(a => a.category === "Certification").length,
    competitions:  achievements.filter(a => a.category === "Competition").length,
  };

  function handleAdd(data: Partial<Achievement>) {
    const newA: Achievement = { id: `a${Date.now()}`, ...data, dateSort: Date.now() } as Achievement;
    setAchievements(prev => [newA, ...prev]);
    setView("list");
    showToast(data.verification === "pending" ? "Achievement added · Verification request submitted." : "Achievement added.");
  }

  function handleEdit(data: Partial<Achievement>) {
    if (!selected) return;
    setAchievements(prev => prev.map(a => a.id === selected.id ? { ...a, ...data } : a));
    setSelected(prev => prev ? { ...prev, ...data } as Achievement : null);
    setView("detail");
    showToast("Achievement updated.");
  }

  function handleDelete() {
    if (!selected) return;
    setAchievements(prev => prev.filter(a => a.id !== selected.id));
    setView("list");
    showToast("Achievement deleted.");
  }

  // Render sub-views
  if (view === "add") return <><AchievementForm mode="add" onSave={handleAdd} onCancel={() => setView("list")} />{toast && <Toast msg={toast} onDone={() => setToast(null)} />}</>;
  if (view === "edit" && selected) return <><AchievementForm mode="edit" initial={selected} onSave={handleEdit} onCancel={() => setView("detail")} />{toast && <Toast msg={toast} onDone={() => setToast(null)} />}</>;
  if (view === "detail" && selected) return (
    <>
      <AchievementDetail achievement={selected} onBack={() => setView("list")} onEdit={() => setView("edit")} onDelete={handleDelete} />
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </>
  );

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 24, color: c.text, letterSpacing: "-0.02em", marginBottom: 4 }}>Achievements</h1>
            <p style={{ fontSize: 13, color: c.textMuted }}>Showcase your academic, technical, extracurricular, and professional accomplishments.</p>
          </div>
          <button onClick={() => setView("add")} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer", flexShrink: 0 }}>
            <Ic n="plus" size={14} color="#fff" /> Add Achievement
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
          {[
            { label: "Total",        value: stats.total,         color: "#2563EB", bg: "rgba(37,99,235,0.08)",  emoji: "🏅" },
            { label: "Verified",     value: stats.verified,      color: "#10B981", bg: "rgba(16,185,129,0.08)", emoji: "✅" },
            { label: "Certifications",value: stats.certifications,color: "#8B5CF6", bg: "rgba(139,92,246,0.08)",emoji: "📜" },
            { label: "Competitions", value: stats.competitions,  color: "#EF4444", bg: "rgba(239,68,68,0.08)",  emoji: "🏆" },
          ].map(s => (
            <div key={s.label} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "16px 18px", boxShadow: c.cardShadow, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{s.emoji}</div>
              <div>
                <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: c.text, marginTop: 3 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Search + sort */}
        <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: "1 1 260px" }}>
            <div style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}><Ic n="search" size={14} color={c.textDim} /></div>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search achievements..."
              style={{ width: "100%", padding: "9px 12px 9px 35px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
          </div>
          <select value={verFilter} onChange={e => setVerFilter(e.target.value as typeof verFilter)}
            style={{ padding: "8px 12px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 12, cursor: "pointer", outline: "none" }}>
            <option value="all">All Statuses</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>
          <select value={sort} onChange={e => setSort(e.target.value as typeof sort)}
            style={{ padding: "8px 12px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 12, cursor: "pointer", outline: "none" }}>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="title">Title</option>
          </select>
        </div>

        {/* Category filter tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24, overflowX: "auto", paddingBottom: 2, flexWrap: "wrap" }}>
          {FILTER_TABS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: "6px 14px", borderRadius: 9, fontSize: 12, fontWeight: filter === f ? 700 : 500, background: filter === f ? `${c.primary}10` : "transparent", color: filter === f ? c.primary : c.textMuted, border: `1px solid ${filter === f ? c.primary + "30" : "transparent"}`, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.1s" }}>
              {f}
              {f !== "All" && <span style={{ marginLeft: 5, fontSize: 10, fontWeight: 700, color: filter === f ? c.primary : c.textDim, background: filter === f ? `${c.primary}15` : c.surface3, borderRadius: 4, padding: "1px 5px" }}>
                {achievements.filter(a => a.category === f).length}
              </span>}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "64px 24px", textAlign: "center", boxShadow: c.cardShadow }}>
            {achievements.length === 0 ? (
              <>
                <div style={{ fontSize: 40, marginBottom: 14 }}>🏅</div>
                <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 16, color: c.text, marginBottom: 6 }}>No Achievements Yet</div>
                <p style={{ fontSize: 13, color: c.textDim, marginBottom: 22 }}>Showcase your accomplishments by adding your first achievement.</p>
                <button onClick={() => setView("add")} style={{ padding: "10px 24px", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>+ Add Achievement</button>
              </>
            ) : (
              <>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
                <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text, marginBottom: 6 }}>No achievements found</div>
                <p style={{ fontSize: 13, color: c.textDim, marginBottom: 20 }}>No achievements match your current filters.</p>
                <button onClick={() => { setFilter("All"); setQuery(""); setVerFilter("all"); }} style={{ padding: "9px 22px", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Clear Filters</button>
              </>
            )}
          </div>
        ) : (
          <>
            <div style={{ fontSize: 13, fontWeight: 600, color: c.textDim, marginBottom: 14 }}>{filtered.length} achievement{filtered.length !== 1 ? "s" : ""}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
              {filtered.map(a => (
                <AchievementCard key={a.id} achievement={a} onOpen={() => { setSelected(a); setView("detail"); }} />
              ))}
            </div>
          </>
        )}
      </div>

      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
