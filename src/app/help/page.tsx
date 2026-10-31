"use client";
import { useState, useRef, useContext } from "react";
import { ThemeCtx } from "@/components/ui/Theme";

type Theme = "light" | "dark";
const useTheme = () => useContext(ThemeCtx);

const LIGHT = {
  bg: "#F8FAFC", surface: "#FFFFFF", surface2: "#F1F5F9", surface3: "#E2E8F0",
  primary: "#2563EB", primaryDark: "#1D4ED8",
  text: "#0F172A", textMuted: "#64748B", textDim: "#94A3B8",
  border: "#E2E8F0", cardShadow: "0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)",
  success: "#10B981", successBg: "rgba(16,185,129,0.07)", successBorder: "rgba(16,185,129,0.2)",
  warn: "#F59E0B", warnBg: "rgba(245,158,11,0.07)",
  danger: "#EF4444", dangerBg: "rgba(239,68,68,0.07)", dangerBorder: "rgba(239,68,68,0.18)",
};
const DARK = {
  bg: "#080D1A", surface: "#0F172A", surface2: "#172033", surface3: "#1E293B",
  primary: "#3B82F6", primaryDark: "#2563EB",
  text: "#F8FAFC", textMuted: "#94A3B8", textDim: "#475569",
  border: "#1E293B", cardShadow: "0 1px 4px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.18)",
  success: "#34D399", successBg: "rgba(52,211,153,0.07)", successBorder: "rgba(52,211,153,0.2)",
  warn: "#FBBF24", warnBg: "rgba(251,191,36,0.07)",
  danger: "#F87171", dangerBg: "rgba(248,113,113,0.07)", dangerBorder: "rgba(248,113,113,0.18)",
};
const tok = (t: Theme) => t === "light" ? LIGHT : DARK;

const P: Record<string, string[]> = {
  search:   ["M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"],
  chevR:    ["M9 18l6-6-6-6"],
  chevD:    ["M6 9l6 6 6-6"],
  arrowL:   ["M19 12H5M12 19l-7-7 7-7"],
  check:    ["M20 6L9 17l-5-5"],
  x:        ["M18 6L6 18M6 6l12 12"],
  book:     ["M4 19.5A2.5 2.5 0 0 1 6.5 17H20","M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"],
  zap:      ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"],
  helpCirc: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z","M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3","M12 17h.01"],
  msg:      ["M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 0 2 2z"],
  flag:     ["M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z","M4 22v-7"],
  plus:     ["M12 5v14M5 12h14"],
  upload:   ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4","M17 8l-5-5-5 5","M12 3v12"],
  file:     ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z","M14 2v6h6"],
  eye:      ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z","M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"],
  clock:    ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z","M12 6v6l4 2"],
  user:     ["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2","M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  settings: ["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"],
  bell:     ["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 0 1-3.46 0"],
  globe:    ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z","M2 12h20","M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"],
  thumbUp:  ["M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z","M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"],
  thumbDn:  ["M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z","M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"],
  paperclip:["M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"],
  send:     ["M22 2L11 13","M22 2L15 22 11 13 2 9l20-7z"],
  status:   ["M22 11.08V12a10 10 0 1 1-5.93-9.14","M22 4L12 14.01l-3-3"],
};
function Ic({ n, size = 16, color = "currentColor" }: { n: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      {(P[n] ?? []).map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "academic",   label: "Academic",         icon: "book",     desc: "Courses, assignments, exams, routine, and materials." },
  { id: "campus",     label: "Campus",            icon: "globe",    desc: "Events, clubs, communities, and campus activities." },
  { id: "opps",       label: "Opportunities",     icon: "zap",      desc: "Internships, competitions, scholarships, and research." },
  { id: "lostfound",  label: "Lost & Found",      icon: "flag",     desc: "Report lost items, found items, claims, and returns." },
  { id: "account",    label: "Account & Profile", icon: "user",     desc: "Profile, privacy, security, and account settings." },
  { id: "notifs",     label: "Notifications",     icon: "bell",     desc: "Notification preferences and campus alerts." },
  { id: "tech",       label: "Technical Support", icon: "settings", desc: "Login problems, errors, uploads, and technical issues." },
];

const POPULAR_QS = [
  { q: "How do I join a course?",                   article: "join-course" },
  { q: "How can I view my class routine?",           article: "view-routine" },
  { q: "How do I submit an assignment?",             article: "submit-assignment" },
  { q: "How can I access course materials?",         article: "access-materials" },
  { q: "How do I register for an event?",            article: "register-event" },
  { q: "How do I join a club?",                      article: "join-club" },
  { q: "How do I report a lost item?",               article: "report-lost" },
  { q: "How can I change my profile visibility?",    article: "profile-visibility" },
  { q: "How do I change notification settings?",     article: "notif-settings" },
];

const RECENT_ARTICLES = [
  { id: "submit-assignment",  title: "How to submit an assignment",    category: "Academic",         updated: "Aug 2026" },
  { id: "view-routine",       title: "How to manage your class routine",category: "Academic",         updated: "Aug 2026" },
  { id: "report-lost",        title: "How Lost & Found works",         category: "Campus",           updated: "Aug 2026" },
  { id: "dir-usage",          title: "How to use Student Directory",   category: "Account & Profile", updated: "Aug 2026" },
];

const ALL_ARTICLES: Record<string, { title: string; category: string; breadcrumb: string; steps: string[]; related: string[] }> = {
  "submit-assignment": {
    title: "How to Submit an Assignment",
    category: "Academic",
    breadcrumb: "Academic → Assignments",
    steps: [
      "Open My Courses from the left sidebar.",
      "Select the course containing the assignment.",
      "Open the Assignments section.",
      "Select the assignment you want to submit.",
      "Click Upload File and select your file (PDF, DOCX, ZIP supported).",
      "Review your submission details and uploaded file.",
      "Click Submit Assignment to confirm.",
    ],
    related: ["view-routine", "access-materials", "join-course"],
  },
  "join-course": {
    title: "How to Join a Course",
    category: "Academic",
    breadcrumb: "Academic → Courses",
    steps: [
      "Navigate to My Courses in the left sidebar.",
      "Click the + Add Course button in the top right.",
      "Enter your course code or search by name.",
      "Select the correct course and section.",
      "Confirm enrollment by clicking Join Course.",
    ],
    related: ["submit-assignment", "access-materials", "view-routine"],
  },
  "view-routine": {
    title: "How to Manage Your Class Routine",
    category: "Academic",
    breadcrumb: "Academic → Routine",
    steps: [
      "Click Routine in the left sidebar.",
      "Your weekly schedule is shown by default.",
      "Use the Day / Week toggle to switch views.",
      "Click any class entry to see full details.",
      "Tap the calendar icon to export your schedule.",
    ],
    related: ["join-course", "submit-assignment", "access-materials"],
  },
  "access-materials": {
    title: "How to Access Course Materials",
    category: "Academic",
    breadcrumb: "Academic → Materials",
    steps: [
      "Go to Materials in the left sidebar.",
      "Filter by course or semester using the dropdowns.",
      "Click any file to preview or download it.",
      "Use Search to find a specific document.",
    ],
    related: ["submit-assignment", "view-routine", "join-course"],
  },
  "register-event": {
    title: "How to Register for an Event",
    category: "Campus",
    breadcrumb: "Campus → Events",
    steps: [
      "Click Events in the left sidebar.",
      "Browse or search for the event.",
      "Open the event detail page.",
      "Click Register to confirm your spot.",
      "You will receive a confirmation notification.",
    ],
    related: ["join-club", "report-lost", "dir-usage"],
  },
  "join-club": {
    title: "How to Join a Club",
    category: "Campus",
    breadcrumb: "Campus → Clubs & Communities",
    steps: [
      "Navigate to Clubs & Communities in the sidebar.",
      "Browse clubs by category or search by name.",
      "Open a club and click Join Club.",
      "Some clubs may require approval — your request will be reviewed.",
    ],
    related: ["register-event", "dir-usage", "notif-settings"],
  },
  "report-lost": {
    title: "How Lost & Found Works",
    category: "Campus",
    breadcrumb: "Campus → Lost & Found",
    steps: [
      "Go to Lost & Found in the sidebar.",
      "To report a lost item: click Report Lost Item and fill in the details.",
      "To report a found item: click I Found Something and describe what you found.",
      "If you find your item listed: click Claim to contact the finder.",
      "The item is marked resolved once the return is confirmed.",
    ],
    related: ["register-event", "join-club", "dir-usage"],
  },
  "profile-visibility": {
    title: "How to Change Your Profile Visibility",
    category: "Account & Profile",
    breadcrumb: "Account & Profile → Profile",
    steps: [
      "Click Profile in the sidebar.",
      "Click the Visibility button in the top right of your profile.",
      "Choose who can view your profile: Everyone, My Department, My Batch, My Section, or Only Me.",
      "Toggle individual field visibility as needed.",
      "Click Save Changes.",
    ],
    related: ["notif-settings", "dir-usage", "join-course"],
  },
  "notif-settings": {
    title: "How to Change Notification Settings",
    category: "Account & Profile",
    breadcrumb: "Account & Profile → Notifications",
    steps: [
      "Go to Settings → Notifications in the sidebar.",
      "Enable or disable notification categories using the toggles.",
      "Security alerts cannot be disabled for your protection.",
      "Changes are saved automatically.",
    ],
    related: ["profile-visibility", "dir-usage", "join-course"],
  },
  "dir-usage": {
    title: "How to Use Student Directory",
    category: "Account & Profile",
    breadcrumb: "Account & Profile → Directory",
    steps: [
      "Click Student Directory in the sidebar.",
      "Browse all students or filter by Department, Batch, or Section.",
      "Click a student card to view their profile.",
      "Click Connect to send a connection request.",
    ],
    related: ["profile-visibility", "notif-settings", "join-club"],
  },
};

type SupportStatus = "Open" | "In Progress" | "Waiting for Student" | "Resolved" | "Closed";

type SupportRequest = {
  id: string; subject: string; category: string; priority: "Normal" | "Important" | "Urgent";
  submitted: string; status: SupportStatus; description: string;
  messages: { from: "support" | "student"; text: string; time: string }[];
};

const SAMPLE_REQUESTS: SupportRequest[] = [
  {
    id: "SUP-2026-00428", subject: "Unable to submit assignment", category: "Technical Issue",
    priority: "Important", submitted: "Aug 28, 2026", status: "In Progress",
    description: "I uploaded my assignment file but the Submit button remains disabled. The deadline is tomorrow.",
    messages: [
      { from: "support", text: "Thank you for reaching out. Could you please provide a screenshot of the submission page?", time: "Aug 28" },
      { from: "student", text: "Sure, I've attached the screenshot to this request.", time: "Aug 29" },
      { from: "support", text: "Thank you. We can see the issue — your browser cache may be causing this. Please clear your browser cache and try again. Let us know if the problem persists.", time: "Aug 29" },
    ],
  },
  {
    id: "SUP-2026-00412", subject: "Incorrect event information", category: "Events",
    priority: "Normal", submitted: "Aug 26, 2026", status: "Resolved",
    description: "The time listed for the AI & ML Workshop on the Events page appears to be incorrect.",
    messages: [
      { from: "support", text: "Thank you for letting us know. We have updated the event time. The workshop is scheduled for 2:00 PM, not 10:00 AM.", time: "Aug 26" },
      { from: "student", text: "Perfect, thank you!", time: "Aug 27" },
    ],
  },
];

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────

function Toast({ msg, onDone }: { msg: string; onDone: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  setTimeout(onDone, 2800);
  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 500, background: c.surface, border: `1px solid ${c.successBorder}`, borderRadius: 12, padding: "12px 18px", boxShadow: "0 8px 32px rgba(0,0,0,0.18)", display: "flex", alignItems: "center", gap: 10, minWidth: 240 }}>
      <div style={{ width: 26, height: 26, borderRadius: "50%", background: c.successBg, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic n="check" size={12} color={c.success} /></div>
      <span style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{msg}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: SupportStatus }) {
  const { theme } = useTheme(); const c = tok(theme);
  const cfg: Record<SupportStatus, { color: string; bg: string; border: string }> = {
    "Open":                { color: c.primary,  bg: `${c.primary}10`,      border: `${c.primary}30` },
    "In Progress":         { color: "#F59E0B",  bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.22)" },
    "Waiting for Student": { color: "#8B5CF6",  bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.22)" },
    "Resolved":            { color: c.success,  bg: c.successBg,            border: c.successBorder },
    "Closed":              { color: c.textDim,  bg: c.surface3,             border: c.border },
  };
  const s = cfg[status];
  return <span style={{ fontSize: 11, fontWeight: 700, color: s.color, background: s.bg, border: `1px solid ${s.border}`, borderRadius: 6, padding: "3px 9px", whiteSpace: "nowrap" }}>{status}</span>;
}

function BackBtn({ label, onClick }: { label?: string; onClick: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  return (
    <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: c.textMuted, cursor: "pointer", fontFamily: "Inter", fontSize: 12, fontWeight: 600, marginBottom: 24, padding: 0 }}>
      <Ic n="arrowL" size={14} color={c.textMuted} /> {label ?? "Back"}
    </button>
  );
}

const inputStyle = (c: ReturnType<typeof tok>): React.CSSProperties => ({
  width: "100%", padding: "9px 12px", borderRadius: 9, background: c.surface2,
  border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 13,
  outline: "none", boxSizing: "border-box",
});
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 11, fontWeight: 700, color: "#94A3B8",
  textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5,
};

// ─── SCREEN: HOME ─────────────────────────────────────────────────────────────

function HelpHome({ onSearch, onCategory, onArticle, onContact, onReport, onRequests }:
  { onSearch: (q: string) => void; onCategory: (id: string) => void; onArticle: (id: string) => void; onContact: () => void; onReport: () => void; onRequests: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [q, setQ] = useState("");
  const submit = () => { if (q.trim()) onSearch(q.trim()); };

  return (
    <div style={{ maxWidth: 860, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 26, color: c.text, letterSpacing: "-0.02em", marginBottom: 6 }}>Help & Support</h1>
        <p style={{ fontSize: 14, color: c.textMuted }}>Find answers, get help, and report problems with UniLink.</p>
      </div>

      {/* Search */}
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "22px 24px", boxShadow: c.cardShadow, marginBottom: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${c.primary}, ${c.primaryDark})` }} />
        <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text, marginBottom: 14 }}>How can we help you?</div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1, position: "relative" }}>
            <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><Ic n="search" size={15} color={c.textDim} /></div>
            <input value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()}
              placeholder="Search for help... e.g. How do I submit an assignment?"
              style={{ ...inputStyle(c), paddingLeft: 38 }} />
          </div>
          <button onClick={submit} style={{ padding: "9px 20px", borderRadius: 9, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>Search</button>
        </div>
      </div>

      {/* Categories */}
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow, marginBottom: 20 }}>
        <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 16 }}>Browse by Category</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => onCategory(cat.id)}
              style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 14px", borderRadius: 11, background: c.surface2, border: `1px solid ${c.border}`, cursor: "pointer", textAlign: "left", transition: "border-color 0.12s" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${c.primary}10`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <Ic n={cat.icon} size={15} color={c.primary} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: c.text, marginBottom: 3 }}>{cat.label}</div>
                <div style={{ fontSize: 11, color: c.textDim, lineHeight: 1.5 }}>{cat.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20, alignItems: "flex-start" }}>
        {/* Popular Qs */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: "hidden", boxShadow: c.cardShadow }}>
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${c.border}`, background: c.surface2 }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text }}>Popular Questions</div>
          </div>
          {POPULAR_QS.map((item, i) => (
            <button key={item.q} onClick={() => onArticle(item.article)}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "12px 20px", borderTop: i > 0 ? `1px solid ${c.border}` : "none", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 10 }}>
              <span style={{ fontSize: 13, color: c.text }}>{item.q}</span>
              <Ic n="chevR" size={14} color={c.textDim} />
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Recently updated */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: "hidden", boxShadow: c.cardShadow }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${c.border}`, background: c.surface2 }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text }}>Recently Updated</div>
            </div>
            {RECENT_ARTICLES.map((a, i) => (
              <button key={a.id} onClick={() => onArticle(a.id)}
                style={{ display: "flex", flexDirection: "column", width: "100%", padding: "11px 18px", borderTop: i > 0 ? `1px solid ${c.border}` : "none", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: c.text, marginBottom: 3 }}>{a.title}</span>
                <div style={{ display: "flex", gap: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: c.primary, background: `${c.primary}10`, borderRadius: 4, padding: "1px 6px" }}>{a.category}</span>
                  <span style={{ fontSize: 10, color: c.textDim }}>{a.updated}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Still need help */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "16px 18px", boxShadow: c.cardShadow }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 5 }}>Still need help?</div>
            <div style={{ fontSize: 12, color: c.textDim, marginBottom: 14, lineHeight: 1.6 }}>Our support team can help with technical issues and UniLink account problems.</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <button onClick={onContact} style={{ padding: "8px 0", borderRadius: 9, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <Ic n="msg" size={13} color="#fff" /> Contact Support
              </button>
              <button onClick={onReport} style={{ padding: "8px 0", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <Ic n="flag" size={13} color={c.textDim} /> Report a Problem
              </button>
              <button onClick={onRequests} style={{ padding: "7px 0", borderRadius: 9, background: "transparent", border: "none", color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                View My Requests →
              </button>
            </div>
          </div>

          {/* Status */}
          <div style={{ background: c.surface, border: `1px solid ${c.successBorder}`, borderRadius: 12, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: c.cardShadow }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Ic n="status" size={14} color={c.success} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: c.text }}>UniLink Status</div>
                <div style={{ fontSize: 11, color: c.success }}>All systems operational</div>
              </div>
            </div>
            <button style={{ fontSize: 11, fontWeight: 600, color: c.primary, background: "none", border: "none", cursor: "pointer", padding: 0 }}>View →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: SEARCH RESULTS ───────────────────────────────────────────────────

function SearchResults({ query, onArticle, onBack, onContact }: { query: string; onArticle: (id: string) => void; onBack: () => void; onContact: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [q, setQ] = useState(query);
  const [filter, setFilter] = useState("All");

  const results = Object.entries(ALL_ARTICLES).filter(([, a]) =>
    a.title.toLowerCase().includes(q.toLowerCase()) ||
    a.category.toLowerCase().includes(q.toLowerCase()) ||
    a.steps.some(s => s.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <BackBtn label="Help & Support" onClick={onBack} />
      <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: c.text, marginBottom: 16 }}>Search Results</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <div style={{ flex: 1, position: "relative" }}>
          <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><Ic n="search" size={15} color={c.textDim} /></div>
          <input value={q} onChange={e => setQ(e.target.value)} style={{ ...inputStyle(c), paddingLeft: 38 }} />
        </div>
        <button style={{ padding: "9px 16px", borderRadius: 9, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Search</button>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {["All","Articles","FAQs"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: filter === f ? 700 : 500, background: filter === f ? `${c.primary}10` : c.surface2, border: `1px solid ${filter === f ? `${c.primary}30` : c.border}`, color: filter === f ? c.primary : c.textMuted, cursor: "pointer" }}>
            {f}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "40px 24px", textAlign: "center", boxShadow: c.cardShadow }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
          <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 16, color: c.text, marginBottom: 8 }}>No results found</div>
          <div style={{ fontSize: 13, color: c.textMuted, marginBottom: 16 }}>We couldn&apos;t find anything matching your search.</div>
          <div style={{ fontSize: 12, color: c.textDim, marginBottom: 20 }}>
            Try: checking your spelling · using different keywords · browsing help categories
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            <button onClick={onBack} style={{ padding: "8px 18px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Browse Help</button>
            <button onClick={onContact} style={{ padding: "8px 18px", borderRadius: 9, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Contact Support</button>
          </div>
        </div>
      ) : (
        <>
          <div style={{ fontSize: 12, color: c.textDim, marginBottom: 14 }}>{results.length} result{results.length !== 1 ? "s" : ""}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {results.map(([id, a]) => (
              <div key={id} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: "16px 20px", boxShadow: c.cardShadow }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: c.primary, background: `${c.primary}10`, borderRadius: 4, padding: "2px 7px", marginBottom: 7, display: "inline-block" }}>{a.category}</span>
                    <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 5 }}>{a.title}</div>
                    <div style={{ fontSize: 12, color: c.textMuted }}>{a.steps[0]}</div>
                  </div>
                  <button onClick={() => onArticle(id)}
                    style={{ padding: "7px 14px", borderRadius: 8, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
                    Read →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── SCREEN: ARTICLE ─────────────────────────────────────────────────────────

function ArticleDetail({ id, onBack, onArticle }: { id: string; onBack: () => void; onArticle: (id: string) => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [feedback, setFeedback] = useState<"yes" | "no" | null>(null);
  const article = ALL_ARTICLES[id];

  if (!article) return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <BackBtn onClick={onBack} />
      <div style={{ background: c.surface, border: `1px solid ${c.dangerBorder}`, borderRadius: 16, padding: "32px 24px", textAlign: "center", boxShadow: c.cardShadow }}>
        <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 16, color: c.text, marginBottom: 8 }}>Unable to load article.</div>
        <button onClick={onBack} style={{ padding: "8px 20px", borderRadius: 9, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Try Again</button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <BackBtn label="Help & Support" onClick={onBack} />

      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, overflow: "hidden", boxShadow: c.cardShadow, marginBottom: 18 }}>
        <div style={{ padding: "24px 28px", borderBottom: `1px solid ${c.border}`, background: c.surface2 }}>
          <div style={{ fontSize: 11, color: c.textDim, marginBottom: 8 }}>{article.breadcrumb}</div>
          <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 20, color: c.text, marginBottom: 8, letterSpacing: "-0.01em" }}>{article.title}</h1>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: c.primary, background: `${c.primary}10`, borderRadius: 4, padding: "2px 8px" }}>{article.category}</span>
            <span style={{ fontSize: 11, color: c.textDim }}>Updated August 28, 2026</span>
          </div>
        </div>

        <div style={{ padding: "28px 28px" }}>
          <div style={{ fontSize: 14, color: c.textMuted, lineHeight: 1.8, marginBottom: 24 }}>
            UniLink allows students to complete this action directly from the relevant module page.
          </div>

          <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 14 }}>Steps</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
            {article.steps.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: `${c.primary}10`, border: `1.5px solid ${c.primary}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "Manrope", fontWeight: 700, fontSize: 11, color: c.primary }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1, fontSize: 14, color: c.text, paddingTop: 3, lineHeight: 1.6 }}>{step}</div>
              </div>
            ))}
          </div>

          {/* Feedback */}
          <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 20 }}>
            {feedback === null ? (
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, color: c.textMuted }}>Was this article helpful?</span>
                <div style={{ display: "flex", gap: 7 }}>
                  <button onClick={() => setFeedback("yes")} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 14px", borderRadius: 8, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                    <Ic n="thumbUp" size={13} color={c.textDim} /> Yes
                  </button>
                  <button onClick={() => setFeedback("no")} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 14px", borderRadius: 8, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                    <Ic n="thumbDn" size={13} color={c.textDim} /> No
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ fontSize: 13, color: c.success }}>{feedback === "yes" ? "Thanks for the feedback!" : "Thanks — we'll work on improving this article."}</div>
            )}
          </div>
        </div>
      </div>

      {/* Related */}
      {article.related.length > 0 && (
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: "hidden", boxShadow: c.cardShadow }}>
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${c.border}`, background: c.surface2 }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text }}>Related Articles</div>
          </div>
          {article.related.map((rid, i) => {
            const r = ALL_ARTICLES[rid];
            if (!r) return null;
            return (
              <button key={rid} onClick={() => onArticle(rid)}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", padding: "12px 20px", borderTop: i > 0 ? `1px solid ${c.border}` : "none", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 10 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 2 }}>{r.title}</div>
                  <div style={{ fontSize: 11, color: c.textDim }}>{r.category}</div>
                </div>
                <Ic n="chevR" size={14} color={c.textDim} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── SCREEN: CONTACT SUPPORT ──────────────────────────────────────────────────

function ContactSupport({ onBack, onSubmit }: { onBack: () => void; onSubmit: (id: string) => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Technical Issue");
  const [priority, setPriority] = useState<"Normal" | "Important" | "Urgent">("Normal");
  const [desc, setDesc] = useState("");
  const [relatedTo, setRelatedTo] = useState("Other");

  const selectStyle: React.CSSProperties = { ...inputStyle(c), appearance: "none", cursor: "pointer" };

  const submit = () => {
    if (subject.trim() && desc.trim()) {
      const id = `SUP-2026-00${Math.floor(400 + Math.random() * 99)}`;
      onSubmit(id);
    }
  };

  return (
    <div style={{ maxWidth: 660, margin: "0 auto" }}>
      <BackBtn label="Help & Support" onClick={onBack} />
      <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: c.text, marginBottom: 4 }}>Contact Support</h1>
      <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 26 }}>Tell us what you need help with.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
          <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 16 }}>Request Details</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <label style={labelStyle}>Subject</label>
              <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Briefly describe your issue" style={inputStyle(c)} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <label style={labelStyle}>Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} style={selectStyle}>
                  {["Account","Academic","Courses","Assignments","Exams","Routine","Materials","Events","Clubs","Opportunities","Lost & Found","Notifications","Technical Issue","Other"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Priority</label>
                <div style={{ display: "flex", gap: 6 }}>
                  {(["Normal","Important","Urgent"] as const).map(p => (
                    <button key={p} onClick={() => setPriority(p)}
                      style={{ flex: 1, padding: "8px 4px", borderRadius: 8, fontSize: 11, fontWeight: priority === p ? 700 : 500, background: priority === p ? (p === "Urgent" ? c.dangerBg : p === "Important" ? c.warnBg : `${c.primary}10`) : c.surface2, border: `1px solid ${priority === p ? (p === "Urgent" ? c.dangerBorder : p === "Important" ? "rgba(245,158,11,0.25)" : `${c.primary}30`) : c.border}`, color: priority === p ? (p === "Urgent" ? c.danger : p === "Important" ? c.warn : c.primary) : c.textMuted, cursor: "pointer" }}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Description</label>
              <textarea rows={5} value={desc} onChange={e => setDesc(e.target.value)} placeholder="Describe the problem in detail..."
                style={{ ...inputStyle(c), resize: "vertical" }} />
              <div style={{ fontSize: 11, color: c.textDim, marginTop: 4, textAlign: "right" }}>{desc.length}/2000</div>
            </div>
          </div>
        </div>

        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
          <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 16 }}>Additional Information <span style={{ fontFamily: "Inter", fontSize: 11, fontWeight: 400, color: c.textDim }}>(optional)</span></div>
          <div>
            <label style={labelStyle}>Related to</label>
            <select value={relatedTo} onChange={e => setRelatedTo(e.target.value)} style={selectStyle}>
              {["Course","Assignment","Exam","Event","Club","Opportunity","Lost & Found Item","Announcement","Other"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div style={{ marginTop: 12 }}>
            <label style={labelStyle}>Attachments</label>
            <div style={{ border: `2px dashed ${c.border}`, borderRadius: 10, padding: "18px 0", textAlign: "center", background: c.surface2, cursor: "pointer" }}>
              <Ic n="upload" size={20} color={c.textDim} />
              <div style={{ fontSize: 12, color: c.textDim, marginTop: 8 }}>Upload File</div>
              <div style={{ fontSize: 11, color: c.textDim, marginTop: 3 }}>PDF, JPG, PNG · Maximum 10 MB</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button onClick={onBack} style={{ flex: 1, padding: "11px 0", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
        <button onClick={submit} disabled={!subject.trim() || !desc.trim()}
          style={{ flex: 2, padding: "11px 0", borderRadius: 10, background: (!subject.trim() || !desc.trim()) ? c.surface3 : c.primary, color: (!subject.trim() || !desc.trim()) ? c.textDim : "#fff", border: "none", fontFamily: "Inter", fontSize: 14, fontWeight: 700, cursor: (!subject.trim() || !desc.trim()) ? "not-allowed" : "pointer", transition: "background 0.15s" }}>
          Submit Support Request
        </button>
      </div>
    </div>
  );
}

// ─── SCREEN: REPORT A PROBLEM ─────────────────────────────────────────────────

function ReportProblem({ onBack, onSubmit }: { onBack: () => void; onSubmit: (id: string) => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [type, setType] = useState("Bug / Technical Issue");
  const [where, setWhere] = useState("Student Dashboard");
  const [desc, setDesc] = useState("");
  const [currentInfo, setCurrentInfo] = useState("");
  const [correctInfo, setCorrectInfo] = useState("");
  const [explanation, setExplanation] = useState("");

  const isIncorrectInfo = type === "Incorrect Information";
  const submit = () => {
    const id = `REP-2026-00${Math.floor(100 + Math.random() * 99)}`;
    onSubmit(id);
  };

  return (
    <div style={{ maxWidth: 660, margin: "0 auto" }}>
      <BackBtn label="Help & Support" onClick={onBack} />
      <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: c.text, marginBottom: 4 }}>Report a Problem</h1>
      <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 26 }}>Help us improve UniLink by reporting a technical or information issue.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: "hidden", boxShadow: c.cardShadow }}>
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${c.border}`, background: c.surface2 }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text }}>Problem Type</div>
          </div>
          {["Bug / Technical Issue","Incorrect Information","Broken Link","Missing Content","Inappropriate Content","Other"].map((t, i) => (
            <label key={t} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 20px", borderTop: i > 0 ? `1px solid ${c.border}` : "none", cursor: "pointer" }}>
              <input type="radio" name="ptype" value={t} checked={type === t} onChange={() => setType(t)} style={{ accentColor: c.primary }} />
              <span style={{ fontSize: 13, color: c.text }}>{t}</span>
            </label>
          ))}
        </div>

        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
          <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>Where did this happen?</div>
          <select value={where} onChange={e => setWhere(e.target.value)} style={{ ...inputStyle(c), appearance: "none", cursor: "pointer" }}>
            {["Student Dashboard","Course","Assignment","Exam","Routine","Materials","Announcement","Event","Club","Opportunity","Lost & Found","Student Directory","Notifications","Other"].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>

        {isIncorrectInfo && (
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 4 }}>Incorrect Information</div>
            <div style={{ fontSize: 12, color: c.textDim, marginBottom: 16, padding: "8px 12px", background: c.surface2, borderRadius: 8, border: `1px solid ${c.border}` }}>
              You are reporting information to be reviewed. You cannot directly edit official university data.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div>
                <label style={labelStyle}>Current Information</label>
                <input value={currentInfo} onChange={e => setCurrentInfo(e.target.value)} placeholder="e.g. Room 502" style={inputStyle(c)} />
              </div>
              <div>
                <label style={labelStyle}>Correct Information</label>
                <input value={correctInfo} onChange={e => setCorrectInfo(e.target.value)} placeholder="e.g. Room 504" style={inputStyle(c)} />
              </div>
              <div>
                <label style={labelStyle}>Explanation</label>
                <textarea rows={3} value={explanation} onChange={e => setExplanation(e.target.value)} placeholder="Tell us why this information is incorrect."
                  style={{ ...inputStyle(c), resize: "vertical" }} />
              </div>
            </div>
          </div>
        )}

        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
          <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>Problem Description</div>
          <textarea rows={4} value={desc} onChange={e => setDesc(e.target.value)}
            placeholder="Describe what you expected to happen and what actually happened."
            style={{ ...inputStyle(c), resize: "vertical" }} />
          <div style={{ marginTop: 12 }}>
            <label style={labelStyle}>Screenshot / Attachment <span style={{ fontFamily: "Inter", fontSize: 10, fontWeight: 400, textTransform: "none" }}>(optional)</span></label>
            <div style={{ border: `2px dashed ${c.border}`, borderRadius: 10, padding: "16px 0", textAlign: "center", background: c.surface2, cursor: "pointer" }}>
              <Ic n="upload" size={18} color={c.textDim} />
              <div style={{ fontSize: 12, color: c.textDim, marginTop: 7 }}>Upload File</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button onClick={onBack} style={{ flex: 1, padding: "11px 0", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
        <button onClick={submit} style={{ flex: 2, padding: "11px 0", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Submit Report</button>
      </div>
    </div>
  );
}

// ─── SCREEN: MY REQUESTS ──────────────────────────────────────────────────────

function MyRequests({ requests, onView, onBack, onNew }: {
  requests: SupportRequest[]; onView: (id: string) => void; onBack: () => void; onNew: () => void;
}) {
  const { theme } = useTheme(); const c = tok(theme);
  const [filter, setFilter] = useState<"All" | SupportStatus>("All");
  const tabs: ("All" | SupportStatus)[] = ["All","Open","In Progress","Waiting for Student","Resolved","Closed"];
  const shown = filter === "All" ? requests : requests.filter(r => r.status === filter);

  return (
    <div style={{ maxWidth: 740, margin: "0 auto" }}>
      <BackBtn label="Help & Support" onClick={onBack} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: c.text, marginBottom: 4 }}>My Support Requests</h1>
          <p style={{ fontSize: 13, color: c.textMuted }}>View and track your support requests.</p>
        </div>
        <button onClick={onNew} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
          <Ic n="plus" size={14} color="#fff" /> New Request
        </button>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 20, overflowX: "auto", paddingBottom: 2 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setFilter(t)}
            style={{ padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: filter === t ? 700 : 500, background: filter === t ? `${c.primary}10` : c.surface2, border: `1px solid ${filter === t ? `${c.primary}30` : c.border}`, color: filter === t ? c.primary : c.textMuted, cursor: "pointer", whiteSpace: "nowrap" }}>
            {t}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "48px 24px", textAlign: "center", boxShadow: c.cardShadow }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
          <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 16, color: c.text, marginBottom: 8 }}>No support requests yet.</div>
          <div style={{ fontSize: 13, color: c.textDim, marginBottom: 20 }}>You haven&apos;t submitted any support requests.</div>
          <button onClick={onNew} style={{ padding: "9px 22px", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Contact Support</button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {shown.map(req => (
            <div key={req.id} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: "16px 20px", boxShadow: c.cardShadow }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, fontFamily: "Manrope", fontWeight: 700, color: c.textDim }}>{req.id}</span>
                    <StatusBadge status={req.status} />
                  </div>
                  <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 4 }}>{req.subject}</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: c.primary, background: `${c.primary}10`, borderRadius: 4, padding: "1px 7px" }}>{req.category}</span>
                    <span style={{ fontSize: 11, color: c.textDim }}>Submitted: {req.submitted}</span>
                  </div>
                </div>
                <button onClick={() => onView(req.id)}
                  style={{ padding: "7px 14px", borderRadius: 8, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  View →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── SCREEN: REQUEST DETAIL ───────────────────────────────────────────────────

function RequestDetail({ req, onBack }: { req: SupportRequest; onBack: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [reply, setReply] = useState("");
  const [sent, setSent] = useState(false);

  const timeline = [
    { date: "Aug 28", label: "Request submitted" },
    { date: "Aug 28", label: "Support team reviewed request" },
    { date: "Aug 29", label: "Support team requested additional information" },
    ...(req.messages.some(m => m.from === "student") ? [{ date: "Aug 29", label: "Student responded" }] : []),
  ];

  return (
    <div style={{ maxWidth: 740, margin: "0 auto" }}>
      <BackBtn label="My Requests" onClick={onBack} />

      {/* Header */}
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 24px", boxShadow: c.cardShadow, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 12, color: c.textDim }}>Support Request</span>
              <span style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 12, color: c.textDim }}>·</span>
              <span style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 12, color: c.textDim }}>{req.id}</span>
              <StatusBadge status={req.status} />
            </div>
            <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 18, color: c.text, marginBottom: 8 }}>{req.subject}</h2>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {[["Category", req.category], ["Priority", req.priority], ["Submitted", req.submitted]].map(([k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{k}</div>
                  <div style={{ fontSize: 13, color: c.text, fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${c.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Description</div>
          <div style={{ fontSize: 13, color: c.textMuted, lineHeight: 1.7 }}>{req.description}</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 220px", gap: 16, alignItems: "flex-start" }}>
        {/* Conversation */}
        <div>
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: "hidden", boxShadow: c.cardShadow, marginBottom: 12 }}>
            <div style={{ padding: "13px 20px", borderBottom: `1px solid ${c.border}`, background: c.surface2 }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text }}>Conversation</div>
            </div>
            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
              {req.messages.map((msg, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: msg.from === "support" ? `${c.primary}15` : c.surface3, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 11, fontWeight: 700, color: msg.from === "support" ? c.primary : c.textMuted }}>
                    {msg.from === "support" ? "US" : "AH"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: c.text }}>{msg.from === "support" ? "UniLink Support" : "You"}</span>
                      <span style={{ fontSize: 11, color: c.textDim }}>{msg.time}</span>
                    </div>
                    <div style={{ fontSize: 13, color: c.textMuted, lineHeight: 1.6, background: c.surface2, borderRadius: 10, padding: "10px 12px", border: `1px solid ${c.border}` }}>{msg.text}</div>
                  </div>
                </div>
              ))}
              {sent && <div style={{ fontSize: 12, color: c.success, textAlign: "center" }}>Reply sent.</div>}
            </div>
          </div>

          {req.status !== "Resolved" && req.status !== "Closed" && (
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: "14px 16px", boxShadow: c.cardShadow }}>
              <textarea rows={3} value={reply} onChange={e => setReply(e.target.value)} placeholder="Write a reply..."
                style={{ ...inputStyle(c), resize: "none", marginBottom: 10 }} />
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ padding: "7px 12px", borderRadius: 8, background: c.surface2, border: `1px solid ${c.border}`, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600 }}>
                  <Ic n="paperclip" size={13} color={c.textDim} /> Attach
                </button>
                <button onClick={() => { if (reply.trim()) { setSent(true); setReply(""); setTimeout(() => setSent(false), 2500); } }}
                  style={{ flex: 1, padding: "7px 0", borderRadius: 8, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <Ic n="send" size={13} color="#fff" /> Send Reply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: "hidden", boxShadow: c.cardShadow }}>
          <div style={{ padding: "13px 16px", borderBottom: `1px solid ${c.border}`, background: c.surface2 }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 12, color: c.text }}>Timeline</div>
          </div>
          <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 0 }}>
            {timeline.map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 10, paddingBottom: i < timeline.length - 1 ? 14 : 0, position: "relative" }}>
                {i < timeline.length - 1 && (
                  <div style={{ position: "absolute", left: 5, top: 14, bottom: 0, width: 1, background: c.border }} />
                )}
                <div style={{ width: 11, height: 11, borderRadius: "50%", background: i === timeline.length - 1 ? c.primary : c.surface3, border: `2px solid ${i === timeline.length - 1 ? c.primary : c.border}`, flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: c.textDim, marginBottom: 2 }}>{t.date}</div>
                  <div style={{ fontSize: 12, color: c.text, lineHeight: 1.4 }}>{t.label}</div>
                </div>
              </div>
            ))}
          </div>

          {req.status === "Resolved" && (
            <div style={{ padding: "12px 16px", borderTop: `1px solid ${c.border}` }}>
              <button style={{ width: "100%", padding: "8px 0", borderRadius: 8, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Reopen Request</button>
            </div>
          )}
          {req.status !== "Resolved" && req.status !== "Closed" && (
            <div style={{ padding: "12px 16px", borderTop: `1px solid ${c.border}` }}>
              <button style={{ width: "100%", padding: "8px 0", borderRadius: 8, background: c.successBg, border: `1px solid ${c.successBorder}`, color: c.success, fontFamily: "Inter", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Mark as Resolved</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN: SUCCESS ──────────────────────────────────────────────────────────

function SuccessScreen({ type, id, onViewRequest, onBack }: {
  type: "support" | "report"; id: string; onViewRequest: () => void; onBack: () => void;
}) {
  const { theme } = useTheme(); const c = tok(theme);
  const isSupport = type === "support";
  return (
    <div style={{ maxWidth: 480, margin: "40px auto 0" }}>
      <div style={{ background: c.surface, border: `1px solid ${c.successBorder}`, borderRadius: 20, padding: "40px 36px", textAlign: "center", boxShadow: c.cardShadow }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: c.successBg, border: `2px solid ${c.successBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <Ic n="check" size={22} color={c.success} />
        </div>
        <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 20, color: c.text, marginBottom: 8 }}>
          {isSupport ? "Support Request Submitted" : "Problem Reported"}
        </h2>
        <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 14, lineHeight: 1.7 }}>
          {isSupport
            ? "Your support request has been submitted. We'll get back to you shortly."
            : "Thank you for helping improve UniLink. Your report has been received."}
        </p>
        <div style={{ display: "inline-flex", padding: "7px 16px", borderRadius: 8, background: c.surface2, border: `1px solid ${c.border}`, marginBottom: 22 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: c.textDim, marginRight: 8 }}>
            {isSupport ? "Request ID" : "Report ID"}:
          </span>
          <span style={{ fontSize: 12, fontFamily: "Manrope", fontWeight: 700, color: c.text }}>{id}</span>
        </div>
        <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
          <button onClick={onViewRequest} style={{ padding: "10px 0", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            {isSupport ? "View Request" : "View Report"}
          </button>
          <button onClick={onBack} style={{ padding: "10px 0", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Back to Help & Support
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────

type HelpView =
  | { type: "home" }
  | { type: "search"; query: string }
  | { type: "article"; id: string }
  | { type: "category"; id: string }
  | { type: "contact" }
  | { type: "report" }
  | { type: "requests" }
  | { type: "request-detail"; id: string }
  | { type: "success-support"; id: string }
  | { type: "success-report"; id: string };

export default function HelpPage() {
  const { theme } = useTheme(); const c = tok(theme);
  const [view, setView] = useState<HelpView>({ type: "home" });
  const [requests, setRequests] = useState<SupportRequest[]>(SAMPLE_REQUESTS);
  const [toast, setToast] = useState<string | null>(null);

  const handleContactSubmit = (id: string) => {
    const newReq: SupportRequest = {
      id, subject: "New support request", category: "Technical Issue", priority: "Normal",
      submitted: "Aug 29, 2026", status: "Open", description: "",
      messages: [],
    };
    setRequests(r => [newReq, ...r]);
    setView({ type: "success-support", id });
  };

  const handleReportSubmit = (id: string) => {
    setView({ type: "success-report", id });
  };

  const go = (v: HelpView) => setView(v);

  const wrapper: React.CSSProperties = { flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg };

  if (view.type === "home") return (
    <div style={wrapper}>
      <HelpHome
        onSearch={q => go({ type: "search", query: q })}
        onCategory={id => go({ type: "category", id })}
        onArticle={id => go({ type: "article", id })}
        onContact={() => go({ type: "contact" })}
        onReport={() => go({ type: "report" })}
        onRequests={() => go({ type: "requests" })}
      />
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </div>
  );

  if (view.type === "search") return (
    <div style={wrapper}>
      <SearchResults query={view.query} onArticle={id => go({ type: "article", id })} onBack={() => go({ type: "home" })} onContact={() => go({ type: "contact" })} />
    </div>
  );

  if (view.type === "article") return (
    <div style={wrapper}>
      <ArticleDetail id={view.id} onBack={() => go({ type: "home" })} onArticle={id => go({ type: "article", id })} />
    </div>
  );

  if (view.type === "category") {
    const cat = CATEGORIES.find(c => c.id === view.id);
    const catArticles = Object.entries(ALL_ARTICLES).filter(([,a]) =>
      cat && a.category.toLowerCase().includes(cat.label.split(" ")[0].toLowerCase())
    );
    return (
      <div style={wrapper}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <BackBtn label="Help & Support" onClick={() => go({ type: "home" })} />
          <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: c.text, marginBottom: 4 }}>{cat?.label}</h1>
          <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 24 }}>{cat?.desc}</p>
          {catArticles.length === 0 ? (
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: "32px 24px", textAlign: "center", boxShadow: c.cardShadow }}>
              <div style={{ fontSize: 13, color: c.textDim }}>No articles in this category yet.</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {catArticles.map(([id, a]) => (
                <button key={id} onClick={() => go({ type: "article", id })}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: "16px 20px", cursor: "pointer", textAlign: "left", gap: 12, boxShadow: c.cardShadow }}>
                  <div>
                    <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 3 }}>{a.title}</div>
                    <div style={{ fontSize: 11, color: c.textDim }}>{a.breadcrumb}</div>
                  </div>
                  <Ic n="chevR" size={14} color={c.textDim} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (view.type === "contact") return (
    <div style={wrapper}>
      <ContactSupport onBack={() => go({ type: "home" })} onSubmit={handleContactSubmit} />
    </div>
  );

  if (view.type === "report") return (
    <div style={wrapper}>
      <ReportProblem onBack={() => go({ type: "home" })} onSubmit={handleReportSubmit} />
    </div>
  );

  if (view.type === "requests") return (
    <div style={wrapper}>
      <MyRequests
        requests={requests}
        onView={id => go({ type: "request-detail", id })}
        onBack={() => go({ type: "home" })}
        onNew={() => go({ type: "contact" })}
      />
    </div>
  );

  if (view.type === "request-detail") {
    const req = requests.find(r => r.id === view.id);
    if (!req) return <div style={wrapper}><BackBtn onClick={() => go({ type: "requests" })} /></div>;
    return (
      <div style={wrapper}>
        <RequestDetail req={req} onBack={() => go({ type: "requests" })} />
      </div>
    );
  }

  if (view.type === "success-support") return (
    <div style={wrapper}>
      <SuccessScreen type="support" id={view.id}
        onViewRequest={() => go({ type: "request-detail", id: view.id })}
        onBack={() => go({ type: "home" })} />
    </div>
  );

  if (view.type === "success-report") return (
    <div style={wrapper}>
      <SuccessScreen type="report" id={view.id}
        onViewRequest={() => go({ type: "home" })}
        onBack={() => go({ type: "home" })} />
    </div>
  );

  return null;
}
