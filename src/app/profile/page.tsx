"use client";
import { useState, useContext } from "react";
import { ThemeCtx } from "@/components/ui/Theme";

type Theme = "light" | "dark";
const useTheme = () => useContext(ThemeCtx);

const LIGHT = {
  bg: "#F8FAFC", surface: "#FFFFFF", surface2: "#F1F5F9", surface3: "#E2E8F0",
  primary: "#2563EB", primaryDark: "#1D4ED8",
  text: "#0F172A", textMuted: "#64748B", textDim: "#94A3B8",
  border: "#E2E8F0", cardShadow: "0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)",
  success: "#10B981", successBg: "rgba(16,185,129,0.07)", successBorder: "rgba(16,185,129,0.2)",
  warn: "#F59E0B", warnBg: "rgba(245,158,11,0.07)", warnBorder: "rgba(245,158,11,0.2)",
};
const DARK = {
  bg: "#080D1A", surface: "#0F172A", surface2: "#172033", surface3: "#1E293B",
  primary: "#3B82F6", primaryDark: "#2563EB",
  text: "#F8FAFC", textMuted: "#94A3B8", textDim: "#475569",
  border: "#1E293B", cardShadow: "0 1px 4px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.18)",
  success: "#34D399", successBg: "rgba(52,211,153,0.07)", successBorder: "rgba(52,211,153,0.2)",
  warn: "#FBBF24", warnBg: "rgba(251,191,36,0.07)", warnBorder: "rgba(251,191,36,0.2)",
};
const tok = (t: Theme) => t === "light" ? LIGHT : DARK;

const P: Record<string, string[]> = {
  edit:     ["M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7","M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"],
  eye:      ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z","M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"],
  share:    ["M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8","M16 6l-4-4-4 4","M12 2v13"],
  check:    ["M20 6L9 17l-5-5"],
  x:        ["M18 6L6 18M6 6l12 12"],
  shield:   ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
  user:     ["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2","M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  camera:   ["M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z","M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  link:     ["M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71","M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"],
  github:   ["M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"],
  linkedin: ["M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z","M2 9h4v12H2z","M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"],
  award:    ["M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z","M8.21 13.89L7 23l5-3 5 3-1.21-9.12"],
  book:     ["M4 19.5A2.5 2.5 0 0 1 6.5 17H20","M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"],
  users:    ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2","M23 21v-2a4 4 0 0 0-3-3.87","M16 3.13a4 4 0 0 1 0 7.75","M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  plus:     ["M12 5v14M5 12h14"],
  activity: ["M22 12h-4l-3 9L9 3l-3 9H2"],
  map:      ["M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z","M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"],
  chevD:    ["M6 9l6 6 6-6"],
  chevR:    ["M9 18l6-6-6-6"],
  arrowL:   ["M19 12H5M12 19l-7-7 7-7"],
  copy:     ["M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2z","M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"],
  settings: ["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"],
  upload:   ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4","M17 8l-5-5-5 5","M12 3v12"],
  zap:      ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"],
  briefcase:["M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z","M1 10h22","M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"],
};
function Ic({ n, size = 16, color = "currentColor" }: { n: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      {(P[n] ?? []).map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

// ─── PROFILE DATA ──────────────────────────────────────────────────────────────

const INITIAL_SKILLS    = ["JavaScript", "React", "Python", "Node.js", "SQL", "UI/UX Design", "Database Design"];
const INITIAL_INTERESTS = ["Artificial Intelligence", "Web Development", "Hackathons", "Research", "Open Source", "Entrepreneurship"];
const ALL_SKILLS        = ["JavaScript","React","Python","Node.js","SQL","TypeScript","Java","C++","Docker","Machine Learning","Git","Figma","UI/UX Design","Database Design","AWS","Data Analysis","Linux","Networking","TensorFlow","Research"];
const ALL_INTERESTS     = ["Artificial Intelligence","Web Development","Hackathons","Research","Open Source","Entrepreneurship","Competitive Programming","Robotics","Cybersecurity","Photography","Debate","IoT","Cloud Computing","Data Science","Design"];

type ProfileLink = { github: string; linkedin: string; portfolio: string; website: string };
const INITIAL_LINKS: ProfileLink = { github: "github.com/arif", linkedin: "linkedin.com/in/arif", portfolio: "", website: "" };

const ACHIEVEMENTS_PREVIEW = [
  { title: "UniHack 2026 Finalist", org: "National University Hackathon", verified: true, emoji: "🏆" },
  { title: "ML Research Poster",     org: "University Research Symposium", verified: true, emoji: "🔬" },
  { title: "Python Specialization",  org: "Coursera",                     verified: true, emoji: "📜" },
];

const CLUBS_PREVIEW = [
  { name: "CSE Programming Club",   role: "Member",   emoji: "💻" },
  { name: "Robotics & AI Society",  role: "Member",   emoji: "🤖" },
  { name: "AI Research Community",  role: "Member",   emoji: "🧠" },
];

const ACTIVITIES = [
  { action: "Registered for",  target: "AI & ML Workshop",        time: "2 days ago" },
  { action: "Joined",          target: "CSE Programming Club",    time: "1 week ago" },
  { action: "Attended",        target: "University Hackathon",    time: "2 weeks ago" },
  { action: "Saved",           target: "Research Seminar on NLP", time: "3 weeks ago" },
  { action: "Applied to",      target: "Google Summer Internship",time: "1 month ago" },
];

const ACADEMIC_INFO = [
  { label: "University",        value: "Your University" },
  { label: "Faculty",           value: "Engineering" },
  { label: "Department",        value: "Computer Science & Engineering" },
  { label: "Program",           value: "BSc in Computer Science & Engineering" },
  { label: "Batch",             value: "52" },
  { label: "Section",           value: "B" },
  { label: "Student ID",        value: "2026-12345" },
  { label: "Current Semester",  value: "Spring 2026" },
  { label: "Academic Status",   value: "Active" },
];

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────

function Tag({ label, color, bg, onRemove }: { label: string; color: string; bg: string; onRemove?: () => void }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: onRemove ? 5 : 0, padding: onRemove ? "4px 8px 4px 11px" : "4px 11px", borderRadius: 7, background: bg, fontSize: 12, fontWeight: 600, color }}>
      {label}
      {onRemove && <button onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", marginLeft: 2 }}><Ic n="x" size={10} color={color} /></button>}
    </div>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  return (
    <button onClick={() => onChange(!on)} style={{ width: 40, height: 22, borderRadius: 11, background: on ? c.primary : c.surface3, border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
      <span style={{ position: "absolute", top: 2, left: on ? 20 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)", display: "block" }} />
    </button>
  );
}

function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [alive, setAlive] = useState(true);
  setTimeout(() => { setAlive(false); setTimeout(onDone, 300); }, 2800);
  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 500, background: c.surface, border: `1px solid ${c.successBorder}`, borderRadius: 12, padding: "12px 18px", boxShadow: "0 8px 32px rgba(0,0,0,0.18)", display: "flex", alignItems: "center", gap: 10, minWidth: 240, opacity: alive ? 1 : 0, transition: "opacity 0.3s" }}>
      <div style={{ width: 26, height: 26, borderRadius: "50%", background: c.successBg, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic n="check" size={12} color={c.success} /></div>
      <span style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{msg}</span>
    </div>
  );
}

function ManagedBadge() {
  const { theme } = useTheme(); const c = tok(theme);
  return <span style={{ fontSize: 10, fontWeight: 700, color: c.textDim, background: c.surface3, borderRadius: 4, padding: "2px 6px", whiteSpace: "nowrap" }}>Managed by University</span>;
}

function SectionCard({ title, action, actionLabel, children }: { title: string; action?: () => void; actionLabel?: string; children: React.ReactNode }) {
  const { theme } = useTheme(); const c = tok(theme);
  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text }}>{title}</div>
        {action && <button onClick={action} style={{ fontSize: 12, fontWeight: 700, color: c.primary, background: "none", border: "none", cursor: "pointer", padding: 0 }}>{actionLabel ?? "Edit"}</button>}
      </div>
      {children}
    </div>
  );
}

// ─── AVATAR ────────────────────────────────────────────────────────────────────

function ProfileAvatar({ size = 80, editable, onEdit }: { size?: number; editable?: boolean; onEdit?: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [hov, setHov] = useState(false);
  return (
    <div style={{ position: "relative", flexShrink: 0 }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ width: size, height: size, borderRadius: "50%", background: `linear-gradient(135deg, ${c.primary}, ${c.primaryDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Manrope", fontWeight: 800, fontSize: size * 0.33, color: "#fff", border: `3px solid ${c.surface}`, boxShadow: `0 0 0 2px ${c.border}`, letterSpacing: "-0.01em" }}>
        AH
      </div>
      {editable && hov && (
        <button onClick={onEdit} style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(0,0,0,0.5)", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3 }}>
          <Ic n="camera" size={18} color="#fff" />
          <span style={{ fontSize: 9, fontWeight: 700, color: "#fff", letterSpacing: "0.03em" }}>CHANGE</span>
        </button>
      )}
    </div>
  );
}

// ─── PROFILE HEADER ────────────────────────────────────────────────────────────

function ProfileHeader({ onEdit, onPreview, onShare }: { onEdit: () => void; onPreview: () => void; onShare: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [copied, setCopied] = useState(false);
  const doShare = () => { setCopied(true); onShare(); setTimeout(() => setCopied(false), 1800); };

  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, padding: "28px 32px", boxShadow: c.cardShadow, position: "relative", overflow: "hidden", marginBottom: 20 }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${c.primary}, ${c.primaryDark})` }} />
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
        <ProfileAvatar size={84} editable onEdit={onEdit} />
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
            <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 24, color: c.text, letterSpacing: "-0.02em", margin: 0 }}>Arif Hasan</h1>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 9px", borderRadius: 6, fontSize: 11, fontWeight: 700, color: c.success, background: c.successBg, border: `1px solid ${c.successBorder}` }}>
              <Ic n="check" size={10} color={c.success} /> Verified Student
            </span>
          </div>
          <div style={{ fontSize: 13, color: c.textMuted, marginBottom: 6 }}>BSc in Computer Science &amp; Engineering</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
            <span style={{ fontSize: 12, color: c.textDim }}>Batch 52</span>
            <span style={{ fontSize: 12, color: c.textDim }}>·</span>
            <span style={{ fontSize: 12, color: c.textDim }}>Section B</span>
            <span style={{ fontSize: 12, color: c.textDim }}>·</span>
            <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 12, color: c.textDim }}><Ic n="map" size={12} color={c.textDim} /> Dhaka, Bangladesh</span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={onEdit} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              <Ic n="edit" size={13} color="#fff" /> Edit Profile
            </button>
            <button onClick={onPreview} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              <Ic n="eye" size={13} color={c.textDim} /> Preview
            </button>
            <button onClick={doShare} style={{ padding: "8px 12px", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, color: copied ? c.success : c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, transition: "color 0.15s" }}>
              <Ic n={copied ? "check" : "share"} size={13} color={copied ? c.success : c.textDim} />{copied ? "Copied" : "Share"}
            </button>
          </div>
        </div>
        {/* Completion widget */}
        <div style={{ background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 14, padding: "14px 18px", minWidth: 160 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: c.textDim }}>PROFILE</span>
            <span style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 18, color: c.primary }}>78%</span>
          </div>
          <div style={{ height: 5, background: c.surface3, borderRadius: 999, overflow: "hidden", marginBottom: 10 }}>
            <div style={{ height: "100%", width: "78%", background: c.primary, borderRadius: 999, transition: "width 0.5s" }} />
          </div>
          <div style={{ fontSize: 11, color: c.textDim, lineHeight: 1.5 }}>
            {["Skills ✓", "About ✓", "Photo ✓"].map(s => <div key={s} style={{ color: c.success }}>{s}</div>)}
            {["Add interests", "Add achievements"].map(s => <div key={s} style={{ color: c.textDim }}>○ {s}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── INTERNAL TABS ─────────────────────────────────────────────────────────────

type ProfileTab = "Overview" | "About" | "Academic" | "Skills & Interests" | "Achievements" | "Activities";
const PROFILE_TABS: ProfileTab[] = ["Overview","About","Academic","Skills & Interests","Achievements","Activities"];

// ─── TAB CONTENT SECTIONS ──────────────────────────────────────────────────────

function AboutSection({ bio, setBio, onEdit }: { bio: string; setBio?: (v: string) => void; onEdit: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  if (!bio) return (
    <SectionCard title="About Me">
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div style={{ fontSize: 13, color: c.textDim, marginBottom: 14 }}>Tell other students a little about yourself.</div>
        <button onClick={onEdit} style={{ padding: "8px 20px", borderRadius: 9, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Add About</button>
      </div>
    </SectionCard>
  );
  return (
    <SectionCard title="About Me" action={onEdit} actionLabel="Edit">
      <p style={{ fontSize: 14, color: c.textMuted, lineHeight: 1.8, margin: 0 }}>{bio}</p>
    </SectionCard>
  );
}

function SkillsSection({ skills, interests, onEdit }: { skills: string[]; interests: string[]; onEdit: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <SectionCard title="Skills" action={onEdit} actionLabel="Edit Skills">
        {skills.length === 0 ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ fontSize: 13, color: c.textDim, marginBottom: 12 }}>Add skills to help other students understand what you work with.</div>
            <button onClick={onEdit} style={{ padding: "7px 18px", borderRadius: 9, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Add Skills</button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {skills.map(sk => <Tag key={sk} label={sk} color="#2563EB" bg="rgba(37,99,235,0.08)" />)}
          </div>
        )}
      </SectionCard>
      <SectionCard title="Interests" action={onEdit} actionLabel="Edit Interests">
        {interests.length === 0 ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div style={{ fontSize: 13, color: c.textDim, marginBottom: 12 }}>Add interests to discover relevant communities and opportunities.</div>
            <button onClick={onEdit} style={{ padding: "7px 18px", borderRadius: 9, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Add Interests</button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {interests.map(i => <Tag key={i} label={i} color="#8B5CF6" bg="rgba(139,92,246,0.08)" />)}
          </div>
        )}
      </SectionCard>
    </div>
  );
}

function AcademicSection() {
  const { theme } = useTheme(); const c = tok(theme);
  return (
    <SectionCard title="Academic Information">
      <div style={{ fontSize: 12, color: c.textDim, marginBottom: 14, padding: "8px 12px", background: c.surface2, borderRadius: 8, border: `1px solid ${c.border}` }}>
        Academic information is maintained by your university.
      </div>
      {ACADEMIC_INFO.map((row, i) => (
        <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < ACADEMIC_INFO.length - 1 ? `1px solid ${c.border}` : "none", gap: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: c.textDim, flexShrink: 0 }}>{row.label}</span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 13, color: c.text, textAlign: "right" }}>{row.value}</span>
            {["Department","Program","Batch","Section","Student ID","University","Faculty"].includes(row.label) && <ManagedBadge />}
            {row.label === "Academic Status" && <span style={{ fontSize: 11, fontWeight: 700, color: c.success, background: c.successBg, border: `1px solid ${c.successBorder}`, borderRadius: 5, padding: "2px 7px" }}>Active</span>}
          </div>
        </div>
      ))}
    </SectionCard>
  );
}

function AchievementsSection() {
  const { theme } = useTheme(); const c = tok(theme);
  return (
    <SectionCard title="Recent Achievements">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {ACHIEVEMENTS_PREVIEW.map(a => (
          <div key={a.title} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 12px", background: c.surface2, borderRadius: 11, border: `1px solid ${c.border}` }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(239,68,68,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{a.emoji}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: c.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.title}</div>
              <div style={{ fontSize: 11, color: c.textDim }}>{a.org}</div>
            </div>
            {a.verified && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "2px 8px", borderRadius: 5, fontSize: 10, fontWeight: 700, color: c.success, background: c.successBg, border: `1px solid ${c.successBorder}`, flexShrink: 0 }}>
                <Ic n="check" size={9} color={c.success} /> Verified
              </span>
            )}
          </div>
        ))}
      </div>
      <button style={{ marginTop: 14, width: "100%", padding: "9px 0", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
        View All Achievements →
      </button>
    </SectionCard>
  );
}

function ClubsSection() {
  const { theme } = useTheme(); const c = tok(theme);
  return (
    <SectionCard title="My Clubs">
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {CLUBS_PREVIEW.map(club => (
          <div key={club.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: c.surface2, borderRadius: 11, border: `1px solid ${c.border}` }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(16,185,129,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{club.emoji}</div>
              <span style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{club.name}</span>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#10B981", background: "rgba(16,185,129,0.08)", borderRadius: 5, padding: "2px 8px" }}>{club.role}</span>
          </div>
        ))}
      </div>
      <button style={{ marginTop: 14, width: "100%", padding: "9px 0", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
        View All Clubs →
      </button>
    </SectionCard>
  );
}

function ActivitiesSection() {
  const { theme } = useTheme(); const c = tok(theme);
  return (
    <SectionCard title="Recent Activities">
      {ACTIVITIES.length === 0 ? (
        <div style={{ textAlign: "center", padding: "20px 0", fontSize: 13, color: c.textDim }}>Your campus activity will appear here.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {ACTIVITIES.map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "11px 0", borderBottom: i < ACTIVITIES.length - 1 ? `1px solid ${c.border}` : "none" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: c.primary, flexShrink: 0, marginTop: 6 }} />
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 13, color: c.textMuted }}>{a.action} </span>
                <span style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{a.target}</span>
              </div>
              <span style={{ fontSize: 11, color: c.textDim, flexShrink: 0 }}>{a.time}</span>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}

function LinksSection({ links }: { links: ProfileLink }) {
  const { theme } = useTheme(); const c = tok(theme);
  const entries = [
    { key: "github",    label: "GitHub",    icon: "github",   value: links.github },
    { key: "linkedin",  label: "LinkedIn",  icon: "linkedin", value: links.linkedin },
    { key: "portfolio", label: "Portfolio", icon: "link",     value: links.portfolio },
    { key: "website",   label: "Website",   icon: "link",     value: links.website },
  ].filter(e => e.value);
  if (!entries.length) return null;
  return (
    <SectionCard title="Links">
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {entries.map(e => (
          <div key={e.key} style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Ic n={e.icon} size={14} color={c.textDim} />
            <span style={{ fontSize: 13, color: c.textMuted }}>{e.value}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── OVERVIEW TAB ─────────────────────────────────────────────────────────────

function OverviewTab({ bio, skills, interests, links, onEdit }: { bio: string; skills: string[]; interests: string[]; links: ProfileLink; onEdit: () => void }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20, alignItems: "flex-start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <AboutSection bio={bio} onEdit={onEdit} />
        <SkillsSection skills={skills} interests={interests} onEdit={onEdit} />
        <AchievementsSection />
        <ActivitiesSection />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <ClubsSection />
        <LinksSection links={links} />
      </div>
    </div>
  );
}

// ─── EDIT PROFILE ─────────────────────────────────────────────────────────────

function EditProfile({ bio, skills, interests, links, onSave, onCancel }: {
  bio: string; skills: string[]; interests: string[]; links: ProfileLink;
  onSave: (d: { bio: string; skills: string[]; interests: string[]; links: ProfileLink }) => void;
  onCancel: () => void;
}) {
  const { theme } = useTheme(); const c = tok(theme);
  const [editBio,       setEditBio]       = useState(bio);
  const [editSkills,    setEditSkills]    = useState([...skills]);
  const [editInterests, setEditInterests] = useState([...interests]);
  const [editLinks,     setEditLinks]     = useState({ ...links });
  const [location,      setLocation]      = useState("Dhaka, Bangladesh");
  const [displayName,   setDisplayName]   = useState("Arif Hasan");

  const inputStyle: React.CSSProperties = { width: "100%", padding: "9px 12px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 13, outline: "none", boxSizing: "border-box" };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: 11, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <button onClick={onCancel} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: c.textMuted, cursor: "pointer", fontFamily: "Inter", fontSize: 12, fontWeight: 600, marginBottom: 24, padding: 0 }}>
          <Ic n="arrowL" size={14} color={c.textMuted} /> Back to Profile
        </button>
        <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: c.text, marginBottom: 4 }}>Edit Profile</h1>
        <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 28 }}>Update the information you choose to share with the UniLink community.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Photo */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>Profile Photo</div>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <ProfileAvatar size={60} />
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  <Ic n="upload" size={13} color={c.textDim} /> Upload Photo
                </button>
                <button style={{ padding: "8px 14px", borderRadius: 9, background: "transparent", border: `1px solid rgba(239,68,68,0.25)`, color: "#EF4444", fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Remove</button>
              </div>
            </div>
            <div style={{ fontSize: 11, color: c.textDim, marginTop: 10 }}>JPG, PNG, WEBP · Maximum 5 MB</div>
          </div>

          {/* Personal info */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 16 }}>Personal Information</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={labelStyle}>Display Name</label>
                <input value={displayName} onChange={e => setDisplayName(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Location</label>
                <input value={location} onChange={e => setLocation(e.target.value)} placeholder="City, Country" style={inputStyle} />
              </div>
            </div>
          </div>

          {/* Academic — read-only */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 8 }}>Academic Information</div>
            <div style={{ fontSize: 12, color: c.textDim, marginBottom: 12 }}>Academic information is maintained by your university.</div>
            {[["Department","Computer Science & Engineering"],["Program","BSc in CSE"],["Batch","52"],["Section","B"]].map(([label, val]) => (
              <div key={label} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <label style={{ ...labelStyle, marginBottom: 0 }}>{label}</label>
                  <ManagedBadge />
                </div>
                <input readOnly value={val} style={{ ...inputStyle, background: c.surface3, color: c.textDim, cursor: "not-allowed" }} />
              </div>
            ))}
          </div>

          {/* Bio */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>Bio</div>
            <textarea rows={4} value={editBio} onChange={e => setEditBio(e.target.value.slice(0, 500))}
              placeholder="Tell other students about yourself, your interests, or what you enjoy working on."
              style={{ ...inputStyle, resize: "vertical" }} />
            <div style={{ fontSize: 11, color: editBio.length > 450 ? c.warn : c.textDim, marginTop: 5, textAlign: "right" }}>{editBio.length}/500</div>
          </div>

          {/* Skills */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>Skills</div>
            {editSkills.length > 0 && (
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 12 }}>
                {editSkills.map(sk => <Tag key={sk} label={sk} color="#2563EB" bg="rgba(37,99,235,0.08)" onRemove={() => setEditSkills(s => s.filter(x => x !== sk))} />)}
              </div>
            )}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {ALL_SKILLS.filter(sk => !editSkills.includes(sk)).slice(0, 10).map(sk => (
                <button key={sk} onClick={() => setEditSkills(s => [...s, sk])}
                  style={{ padding: "4px 10px", borderRadius: 7, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                  + {sk}
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>Interests</div>
            {editInterests.length > 0 && (
              <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 12 }}>
                {editInterests.map(i => <Tag key={i} label={i} color="#8B5CF6" bg="rgba(139,92,246,0.08)" onRemove={() => setEditInterests(s => s.filter(x => x !== i))} />)}
              </div>
            )}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {ALL_INTERESTS.filter(i => !editInterests.includes(i)).slice(0, 10).map(i => (
                <button key={i} onClick={() => setEditInterests(s => [...s, i])}
                  style={{ padding: "4px 10px", borderRadius: 7, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                  + {i}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>Links <span style={{ fontFamily: "Inter", fontSize: 11, fontWeight: 400, color: c.textDim }}>(optional)</span></div>
            {[
              { key: "github",    label: "GitHub",           placeholder: "github.com/username" },
              { key: "linkedin",  label: "LinkedIn",         placeholder: "linkedin.com/in/username" },
              { key: "portfolio", label: "Portfolio",        placeholder: "yourportfolio.com" },
              { key: "website",   label: "Personal Website", placeholder: "yourwebsite.com" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 10 }}>
                <label style={labelStyle}>{f.label}</label>
                <input value={editLinks[f.key as keyof ProfileLink]} onChange={e => setEditLinks(l => ({ ...l, [f.key]: e.target.value }))}
                  placeholder={f.placeholder} style={inputStyle} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <button onClick={onCancel} style={{ flex: 1, padding: "11px 0", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
          <button onClick={() => onSave({ bio: editBio, skills: editSkills, interests: editInterests, links: editLinks })}
            style={{ flex: 2, padding: "11px 0", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE PREVIEW ──────────────────────────────────────────────────────────

function ProfilePreview({ bio, skills, interests, links, onBack }: {
  bio: string; skills: string[]; interests: string[]; links: ProfileLink; onBack: () => void;
}) {
  const { theme } = useTheme(); const c = tok(theme);
  const [audience, setAudience] = useState("University Student");
  const audiences = ["University Student","Department Student","Batch Student","Section Student"];

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: c.textMuted, cursor: "pointer", fontFamily: "Inter", fontSize: 12, fontWeight: 600, marginBottom: 20, padding: 0 }}>
          <Ic n="arrowL" size={14} color={c.textMuted} /> Back to Profile
        </button>

        {/* Viewing-as bar */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: "12px 20px", boxShadow: c.cardShadow, marginBottom: 20, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <Ic n="eye" size={15} color={c.primary} />
          <span style={{ fontSize: 13, fontWeight: 600, color: c.text }}>This is how other students see your profile.</span>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: c.textDim }}>Viewing as:</span>
            <div style={{ position: "relative" }}>
              <select value={audience} onChange={e => setAudience(e.target.value)}
                style={{ padding: "6px 32px 6px 12px", borderRadius: 8, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 12, cursor: "pointer", outline: "none", appearance: "none" }}>
                {audiences.map(a => <option key={a}>{a}</option>)}
              </select>
              <div style={{ position: "absolute", right: 9, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><Ic n="chevD" size={12} color={c.textDim} /></div>
            </div>
          </div>
        </div>

        {/* Public header */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, padding: "28px 32px", boxShadow: c.cardShadow, marginBottom: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${c.primary}, ${c.primaryDark})` }} />
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <ProfileAvatar size={72} />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5, flexWrap: "wrap" }}>
                <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 20, color: c.text, margin: 0 }}>Arif Hasan</h2>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 9px", borderRadius: 6, fontSize: 11, fontWeight: 700, color: c.success, background: c.successBg, border: `1px solid ${c.successBorder}` }}>
                  <Ic n="check" size={10} color={c.success} /> Verified Student
                </span>
              </div>
              <div style={{ fontSize: 13, color: c.textMuted, marginBottom: 5 }}>Computer Science &amp; Engineering</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, color: c.textDim }}>Batch 52 · Section B</span>
                <span style={{ fontSize: 12, color: c.textDim }}>·</span>
                <span style={{ fontSize: 12, color: c.textDim }}>Dhaka, Bangladesh</span>
              </div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <button style={{ padding: "8px 18px", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Connect</button>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <AboutSection bio={bio} onEdit={() => {}} />
          <SkillsSection skills={skills} interests={interests} onEdit={() => {}} />
          <AchievementsSection />
          <ClubsSection />
          <ActivitiesSection />
          <LinksSection links={links} />
        </div>

        <div style={{ marginTop: 20, padding: "12px 18px", background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 12, fontSize: 12, color: c.textDim, textAlign: "center" }}>
          Private contact information (email, phone) is not visible to other students.
        </div>
      </div>
    </div>
  );
}

// ─── VISIBILITY SETTINGS ──────────────────────────────────────────────────────

function VisibilitySettings({ onBack }: { onBack: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [globalVis, setGlobalVis] = useState("everyone");
  const [discovery, setDiscovery] = useState(true);
  const [searchBy,  setSearchBy]  = useState({ name: true, studentId: false, department: true, batch: true, section: true });
  const [fieldVis,  setFieldVis]  = useState({ photo: true, bio: true, department: true, program: true, batch: true, section: true, skills: true, interests: true, achievements: true, clubs: true, activities: true, links: false });

  const inputStyle: React.CSSProperties = { width: "100%", padding: "9px 12px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 13, outline: "none", boxSizing: "border-box" };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 660, margin: "0 auto" }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: c.textMuted, cursor: "pointer", fontFamily: "Inter", fontSize: 12, fontWeight: 600, marginBottom: 24, padding: 0 }}>
          <Ic n="arrowL" size={14} color={c.textMuted} /> Back to Profile
        </button>
        <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: c.text, marginBottom: 4 }}>Profile Visibility</h1>
        <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 28 }}>Control who can discover and view your profile.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Global */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: "hidden", boxShadow: c.cardShadow }}>
            <div style={{ padding: "14px 20px", borderBottom: `1px solid ${c.border}`, background: c.surface2 }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text }}>Who can view my profile</div>
            </div>
            {[
              { val: "everyone",   label: "Everyone in University", desc: "All students can view your profile" },
              { val: "department", label: "My Department",          desc: "Only CSE students" },
              { val: "batch",      label: "My Batch",               desc: "Only Batch 52 students" },
              { val: "section",    label: "My Section",             desc: "Only Section B students" },
              { val: "private",    label: "Only Me",                desc: "Profile is fully private" },
            ].map((opt, i) => (
              <label key={opt.val} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderTop: i > 0 ? `1px solid ${c.border}` : "none", cursor: "pointer" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{opt.label}</div>
                  <div style={{ fontSize: 11, color: c.textDim }}>{opt.desc}</div>
                </div>
                <input type="radio" name="globalvis" value={opt.val} checked={globalVis === opt.val} onChange={() => setGlobalVis(opt.val)} style={{ accentColor: c.primary }} />
              </label>
            ))}
          </div>

          {/* Discovery */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: "hidden", boxShadow: c.cardShadow }}>
            <div style={{ padding: "12px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>Appear in Student Directory</div>
                  <div style={{ fontSize: 11, color: c.textDim, marginTop: 2 }}>Allow students to discover your profile through the UniLink Student Directory.</div>
                </div>
                <Toggle on={discovery} onChange={setDiscovery} />
              </div>
            </div>
          </div>

          {/* Search by */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: "hidden", boxShadow: c.cardShadow }}>
            <div style={{ padding: "14px 20px", borderBottom: `1px solid ${c.border}`, background: c.surface2 }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text }}>Allow students to find me by</div>
            </div>
            {(Object.keys(searchBy) as (keyof typeof searchBy)[]).map((key, i) => (
              <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 20px", borderTop: i > 0 ? `1px solid ${c.border}` : "none" }}>
                <div>
                  <div style={{ fontSize: 13, color: c.text, textTransform: "capitalize" }}>{key === "studentId" ? "Student ID" : key}</div>
                  {key === "studentId" && <div style={{ fontSize: 11, color: c.textDim }}>Student ID will not be exposed publicly</div>}
                </div>
                <Toggle on={searchBy[key]} onChange={v => setSearchBy(p => ({ ...p, [key]: v }))} />
              </div>
            ))}
          </div>

          {/* Field visibility */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: "hidden", boxShadow: c.cardShadow }}>
            <div style={{ padding: "14px 20px", borderBottom: `1px solid ${c.border}`, background: c.surface2 }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text }}>Field Visibility</div>
            </div>
            {(Object.keys(fieldVis) as (keyof typeof fieldVis)[]).map((key, i) => (
              <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 20px", borderTop: i > 0 ? `1px solid ${c.border}` : "none" }}>
                <span style={{ fontSize: 13, color: c.text, textTransform: "capitalize" }}>{key === "links" ? "External Links" : key}</span>
                <Toggle on={fieldVis[key]} onChange={v => setFieldVis(p => ({ ...p, [key]: v }))} />
              </div>
            ))}
          </div>

          {/* Contact */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: "hidden", boxShadow: c.cardShadow }}>
            <div style={{ padding: "14px 20px", borderBottom: `1px solid ${c.border}`, background: c.surface2 }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text }}>Contact Information</div>
            </div>
            {[
              { label: "University Email", status: "Private" },
              { label: "Personal Email",   status: "Private" },
              { label: "Phone Number",     status: "Private" },
            ].map((r, i) => (
              <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 20px", borderTop: i > 0 ? `1px solid ${c.border}` : "none" }}>
                <span style={{ fontSize: 13, color: c.text }}>{r.label}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: c.textDim, background: c.surface3, borderRadius: 5, padding: "2px 7px" }}>{r.status}</span>
              </div>
            ))}
          </div>

          {/* Blocked */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: "hidden", boxShadow: c.cardShadow }}>
            <div style={{ padding: "14px 20px", borderBottom: `1px solid ${c.border}`, background: c.surface2 }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text }}>Blocked Students</div>
            </div>
            <div style={{ padding: "24px 20px", textAlign: "center", fontSize: 13, color: c.textDim }}>No blocked students.</div>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <button onClick={onBack} style={{ width: "100%", padding: "11px 0", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

// ─── PROFILE COMPLETION ───────────────────────────────────────────────────────

function ProfileCompletion({ bio, skills, interests, onBack, onEdit }: {
  bio: string; skills: string[]; interests: string[]; onBack: () => void; onEdit: () => void;
}) {
  const { theme } = useTheme(); const c = tok(theme);
  const completed = [
    { label: "Profile photo",        done: true },
    { label: "Academic information", done: true },
    { label: "Bio",                  done: !!bio },
    { label: "Skills",               done: skills.length > 0 },
  ];
  const recommended = [
    { label: "Add interests",        done: interests.length > 0, action: "Add", onClick: onEdit },
    { label: "Add achievements",     done: false, action: "Add", onClick: onBack },
    { label: "Add portfolio link",   done: false, action: "Add", onClick: onEdit },
    { label: "Add clubs",            done: false, action: "Discover", onClick: onBack },
  ];
  const totalItems = completed.length + recommended.length;
  const doneItems  = completed.filter(i => i.done).length + recommended.filter(i => i.done).length;
  const pct = Math.round((doneItems / totalItems) * 100);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: c.textMuted, cursor: "pointer", fontFamily: "Inter", fontSize: 12, fontWeight: 600, marginBottom: 24, padding: 0 }}>
          <Ic n="arrowL" size={14} color={c.textMuted} /> Back to Profile
        </button>
        <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: c.text, marginBottom: 4 }}>Complete Your Profile</h1>
        <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 24 }}>A complete profile helps other students discover and connect with you.</p>

        {/* Progress */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "22px 24px", boxShadow: c.cardShadow, marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text }}>Profile Completion</div>
            <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: c.primary }}>{pct}%</div>
          </div>
          <div style={{ height: 7, background: c.surface3, borderRadius: 999, overflow: "hidden", marginBottom: 8 }}>
            <div style={{ height: "100%", width: `${pct}%`, background: c.primary, borderRadius: 999, transition: "width 0.5s" }} />
          </div>
          <div style={{ fontSize: 11, color: c.textDim }}>{doneItems} of {totalItems} sections complete</div>
        </div>

        {/* Completed */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: "hidden", boxShadow: c.cardShadow, marginBottom: 14 }}>
          <div style={{ padding: "13px 20px", borderBottom: `1px solid ${c.border}`, background: c.surface2 }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text }}>Completed</div>
          </div>
          {completed.map((item, i) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderTop: i > 0 ? `1px solid ${c.border}` : "none" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: item.done ? c.successBg : c.surface3, border: `1.5px solid ${item.done ? c.successBorder : c.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {item.done ? <Ic n="check" size={11} color={c.success} /> : null}
              </div>
              <span style={{ fontSize: 13, color: item.done ? c.text : c.textDim, textDecoration: item.done ? "none" : "none" }}>{item.label}</span>
              {item.done && <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, color: c.success }}>Done</span>}
            </div>
          ))}
        </div>

        {/* Recommended */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: "hidden", boxShadow: c.cardShadow }}>
          <div style={{ padding: "13px 20px", borderBottom: `1px solid ${c.border}`, background: c.surface2 }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text }}>Recommended</div>
          </div>
          {recommended.map((item, i) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderTop: i > 0 ? `1px solid ${c.border}` : "none" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: item.done ? c.successBg : c.surface3, border: `1.5px solid ${item.done ? c.successBorder : c.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {item.done ? <Ic n="check" size={11} color={c.success} /> : null}
              </div>
              <span style={{ fontSize: 13, color: item.done ? c.textMuted : c.text }}>{item.label}</span>
              {!item.done && (
                <button onClick={item.onClick} style={{ marginLeft: "auto", padding: "5px 13px", borderRadius: 7, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                  {item.action}
                </button>
              )}
              {item.done && <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, color: c.success }}>Done</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────

type ProfileView = "overview" | "edit" | "preview" | "visibility" | "completion";

export default function ProfilePage() {
  const { theme } = useTheme(); const c = tok(theme);
  const [view,      setView]      = useState<ProfileView>("overview");
  const [activeTab, setActiveTab] = useState<ProfileTab>("Overview");
  const [bio,       setBio]       = useState("Computer Science student interested in software development, artificial intelligence, and building useful technology for students.");
  const [skills,    setSkills]    = useState(INITIAL_SKILLS);
  const [interests, setInterests] = useState(INITIAL_INTERESTS);
  const [links,     setLinks]     = useState(INITIAL_LINKS);
  const [toast,     setToast]     = useState<string | null>(null);

  const handleSave = (d: { bio: string; skills: string[]; interests: string[]; links: ProfileLink }) => {
    setBio(d.bio); setSkills(d.skills); setInterests(d.interests); setLinks(d.links);
    setView("overview");
    setToast("Profile updated successfully.");
  };

  if (view === "edit")       return <><EditProfile bio={bio} skills={skills} interests={interests} links={links} onSave={handleSave} onCancel={() => setView("overview")} />{toast && <Toast msg={toast} onDone={() => setToast(null)} />}</>;
  if (view === "preview")    return <><ProfilePreview bio={bio} skills={skills} interests={interests} links={links} onBack={() => setView("overview")} />{toast && <Toast msg={toast} onDone={() => setToast(null)} />}</>;
  if (view === "visibility") return <><VisibilitySettings onBack={() => setView("overview")} />{toast && <Toast msg={toast} onDone={() => setToast(null)} />}</>;
  if (view === "completion") return <><ProfileCompletion bio={bio} skills={skills} interests={interests} onBack={() => setView("overview")} onEdit={() => setView("edit")} />{toast && <Toast msg={toast} onDone={() => setToast(null)} />}</>;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 10 }}>
          <div>
            <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 24, color: c.text, letterSpacing: "-0.02em", marginBottom: 2 }}>My Profile</h1>
            <p style={{ fontSize: 13, color: c.textMuted }}>Your digital campus identity.</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setView("completion")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              <Ic n="zap" size={13} color={c.textDim} /> Complete Profile
            </button>
            <button onClick={() => setView("visibility")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              <Ic n="shield" size={13} color={c.textDim} /> Visibility
            </button>
          </div>
        </div>

        {/* Profile header card */}
        <ProfileHeader onEdit={() => setView("edit")} onPreview={() => setView("preview")} onShare={() => setToast("Profile link copied.")} />

        {/* Internal tab nav */}
        <div style={{ display: "flex", gap: 3, marginBottom: 24, overflowX: "auto", paddingBottom: 2 }}>
          {PROFILE_TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              style={{ padding: "7px 16px", borderRadius: 9, fontSize: 13, fontWeight: activeTab === tab ? 700 : 500, background: activeTab === tab ? `${c.primary}10` : "transparent", color: activeTab === tab ? c.primary : c.textMuted, border: `1px solid ${activeTab === tab ? c.primary + "30" : "transparent"}`, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.1s" }}>
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === "Overview" && <OverviewTab bio={bio} skills={skills} interests={interests} links={links} onEdit={() => setView("edit")} />}

        {activeTab === "About" && (
          <div style={{ maxWidth: 700 }}>
            <AboutSection bio={bio} onEdit={() => setView("edit")} />
          </div>
        )}

        {activeTab === "Academic" && (
          <div style={{ maxWidth: 700 }}>
            <AcademicSection />
          </div>
        )}

        {activeTab === "Skills & Interests" && (
          <div style={{ maxWidth: 700 }}>
            <SkillsSection skills={skills} interests={interests} onEdit={() => setView("edit")} />
          </div>
        )}

        {activeTab === "Achievements" && (
          <div style={{ maxWidth: 700 }}>
            <AchievementsSection />
          </div>
        )}

        {activeTab === "Activities" && (
          <div style={{ maxWidth: 700 }}>
            <ActivitiesSection />
          </div>
        )}
      </div>

      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
