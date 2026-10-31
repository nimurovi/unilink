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
  search:   ["M21 21l-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z"],
  arrowL:   ["M19 12H5M12 19l-7-7 7-7"],
  chevR:    ["M9 18l6-6-6-6"],
  bookmark: ["M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"],
  share:    ["M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8", "M16 6l-4-4-4 4", "M12 2v13"],
  pin:      ["M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"],
  bell:     ["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0"],
  download: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M7 10l5 5 5-5", "M12 15V3"],
  file:     ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6"],
  x:        ["M18 6L6 18M6 6l12 12"],
  check:    ["M20 6L9 17l-5-5"],
  filter:   ["M22 3H2l8 9.46V19l4 2v-8.54z"],
  mail:     ["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", "M22 6l-10 7L2 6"],
  user:     ["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  building: ["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9 22V12h6v10"],
  star:     ["M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"],
};
function Ic({ n, size = 16, color = "currentColor" }: { n: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      {(P[n] ?? []).map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

// ─── TYPES ─────────────────────────────────────────────────────────────────────
type AnnCategory = "Academic" | "Course" | "Campus" | "University" | "Department" | "CR" | "Club" | "Event" | "General";
type AnnPriority = "Normal" | "Important" | "Urgent";
type AnnSource   = "University" | "Department" | "Teacher" | "Course" | "CR" | "Club";

type Announcement = {
  id: string;
  title: string;
  body: string;
  category: AnnCategory;
  priority: AnnPriority;
  source: AnnSource;
  sourceLabel: string;
  sourceDetail?: string;
  timestamp: string;
  date: string;
  unread: boolean;
  pinned?: boolean;
  attachment?: { name: string; ext: string; size: string };
  link?: { label: string; icon: string };
  audience?: string[];
};

const PRIORITY_CFG: Record<AnnPriority, { color: string; bg: string; border: string }> = {
  Normal:    { color: "#64748B",  bg: "transparent",             border: "transparent" },
  Important: { color: "#D97706",  bg: "rgba(217,119,6,0.06)",    border: "rgba(217,119,6,0.18)" },
  Urgent:    { color: "#DC2626",  bg: "rgba(220,38,38,0.06)",    border: "rgba(220,38,38,0.18)" },
};

const CAT_CFG: Record<AnnCategory, { color: string; bg: string }> = {
  Academic:   { color: "#2563EB", bg: "rgba(37,99,235,0.08)"   },
  Course:     { color: "#10B981", bg: "rgba(16,185,129,0.08)"  },
  Campus:     { color: "#8B5CF6", bg: "rgba(139,92,246,0.08)"  },
  University: { color: "#0F172A", bg: "rgba(15,23,42,0.06)"    },
  Department: { color: "#2563EB", bg: "rgba(37,99,235,0.06)"   },
  CR:         { color: "#F59E0B", bg: "rgba(245,158,11,0.08)"  },
  Club:       { color: "#06B6D4", bg: "rgba(6,182,212,0.08)"   },
  Event:      { color: "#EC4899", bg: "rgba(236,72,153,0.08)"  },
  General:    { color: "#64748B", bg: "rgba(100,116,139,0.08)" },
};

const SOURCE_ICON: Record<AnnSource, string> = {
  University: "building", Department: "building", Teacher: "user",
  Course: "file", CR: "star", Club: "bell",
};

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "a1", title: "Midterm Examination Schedule Published",
    body: "The Spring 2026 midterm examination schedule has been published for CSE students. Students are requested to review the examination dates, times, and room assignments carefully before the exam week.",
    category: "Academic", priority: "Important", source: "Department", sourceLabel: "CSE Department", sourceDetail: "Department of Computer Science & Engineering",
    timestamp: "2 hours ago", date: "Aug 28, 2026", unread: true,
    attachment: { name: "Spring_2026_Midterm_Schedule.pdf", ext: "PDF", size: "1.8 MB" },
    link: { label: "View Exam Schedule", icon: "chevR" },
    audience: ["CSE", "Batch 52", "Section B"],
  },
  {
    id: "a2", title: "University Closed Tomorrow — Emergency Maintenance",
    body: "The university campus will be closed tomorrow due to emergency infrastructure maintenance. All in-person classes are cancelled. Online sessions remain unaffected.",
    category: "University", priority: "Urgent", source: "University", sourceLabel: "University Administration", sourceDetail: "Office of the Vice Chancellor",
    timestamp: "4 hours ago", date: "Aug 28, 2026", unread: true, pinned: true,
    audience: ["All Students"],
  },
  {
    id: "a3", title: "Classroom Changed for Tomorrow",
    body: "Database Management class will be held in Room 605 instead of Room 502 tomorrow, August 29. Please note the change and plan accordingly.",
    category: "Course", priority: "Important", source: "Teacher", sourceLabel: "Dr. Rahman", sourceDetail: "CSE 305 — Database Management",
    timestamp: "Yesterday", date: "Aug 27, 2026", unread: true,
    link: { label: "View Routine", icon: "chevR" },
    audience: ["CSE 305 Enrolled Students"],
  },
  {
    id: "a4", title: "New Class Material Available",
    body: "Lecture 05 — SQL Joins has been uploaded to the course materials section. Please review before the next class session.",
    category: "Course", priority: "Normal", source: "Teacher", sourceLabel: "Dr. Rahman", sourceDetail: "CSE 305 — Database Management",
    timestamp: "Yesterday", date: "Aug 27, 2026", unread: false,
    link: { label: "View Material", icon: "chevR" },
  },
  {
    id: "a5", title: "Section Meeting Tomorrow at 2:00 PM",
    body: "A section meeting will be held tomorrow at 2:00 PM in Room 301. Attendance is strongly encouraged. Agenda: routine updates, assignment discussion, and upcoming exam preparation.",
    category: "CR", priority: "Normal", source: "CR", sourceLabel: "Ovi — Class Representative", sourceDetail: "CSE • Batch 52 • Section B",
    timestamp: "2 days ago", date: "Aug 26, 2026", unread: false,
    audience: ["Section B", "Batch 52"],
  },
  {
    id: "a6", title: "Programming Club Recruitment Open",
    body: "Applications for new Programming Club members are now open for Spring 2026. Join us to participate in hackathons, competitive programming, and tech workshops.",
    category: "Club", priority: "Normal", source: "Club", sourceLabel: "Programming Club",
    timestamp: "3 days ago", date: "Aug 25, 2026", unread: false,
    link: { label: "View Event", icon: "chevR" },
  },
  {
    id: "a7", title: "Quiz 03 — Rescheduled to September 5",
    body: "Quiz 03 for CSE 310 Software Engineering has been rescheduled from September 2 to September 5. The time and room remain the same.",
    category: "Academic", priority: "Important", source: "Teacher", sourceLabel: "Ms. Sarah", sourceDetail: "CSE 310 — Software Engineering",
    timestamp: "3 days ago", date: "Aug 25, 2026", unread: false,
    audience: ["CSE 310 Enrolled Students"],
  },
  {
    id: "a8", title: "University Holiday — Independence Day",
    body: "The university will remain closed on August 30 in observance of Independence Day. All scheduled classes and activities are suspended for the day.",
    category: "University", priority: "Normal", source: "University", sourceLabel: "University Administration",
    timestamp: "4 days ago", date: "Aug 24, 2026", unread: false, pinned: true,
    audience: ["All Students"],
  },
  {
    id: "a9", title: "Assignment 02 Deadline Reminder",
    body: "This is a reminder that Database Management Assignment 02 is due on September 1. Please complete and submit your work on time through the student portal.",
    category: "Course", priority: "Normal", source: "Teacher", sourceLabel: "Dr. Rahman", sourceDetail: "CSE 305 — Database Management",
    timestamp: "5 days ago", date: "Aug 23, 2026", unread: false,
    link: { label: "View Assignment", icon: "chevR" },
  },
];

// ─── TOAST ─────────────────────────────────────────────────────────────────────
function Toast({ msg, onDismiss }: { msg: string; onDismiss: () => void }) {
  useEffect(() => { const t = setTimeout(onDismiss, 2800); return () => clearTimeout(t); }, [onDismiss]);
  return (
    <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 9999, background: "#1E293B", color: "#F8FAFC", borderRadius: 12, padding: "11px 20px", display: "flex", gap: 10, alignItems: "center", boxShadow: "0 8px 24px rgba(0,0,0,0.3)", fontFamily: "Inter", fontSize: 13, fontWeight: 500, whiteSpace: "nowrap" }}>
      <Ic n="check" size={13} color="#10B981" /> {msg}
      <button onClick={onDismiss} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, marginLeft: 6 }}><Ic n="x" size={13} color="#94A3B8" /></button>
    </div>
  );
}

// ─── STAT CARD ─────────────────────────────────────────────────────────────────
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

// ─── SOURCE AVATAR ──────────────────────────────────────────────────────────────
const SOURCE_COLOR: Record<AnnSource, string> = {
  University: "#0F172A", Department: "#2563EB", Teacher: "#10B981",
  Course: "#8B5CF6", CR: "#F59E0B", Club: "#06B6D4",
};
function SourceAvatar({ source, size = 36 }: { source: AnnSource; size?: number }) {
  const col = SOURCE_COLOR[source];
  return (
    <div style={{ width: size, height: size, borderRadius: size / 3, background: `${col}12`, border: `1px solid ${col}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Ic n={SOURCE_ICON[source]} size={size * 0.44} color={col} />
    </div>
  );
}

// ─── CATEGORY BADGE ──────────────────────────────────────────────────────────────
function CatBadge({ cat }: { cat: AnnCategory }) {
  const cfg = CAT_CFG[cat];
  return <span style={{ padding: "2px 8px", borderRadius: 6, fontSize: 10, fontWeight: 700, color: cfg.color, background: cfg.bg, letterSpacing: "0.03em" }}>{cat}</span>;
}

// ─── PRIORITY LABEL ──────────────────────────────────────────────────────────────
function PriorityLabel({ p }: { p: AnnPriority }) {
  if (p === "Normal") return null;
  const cfg = PRIORITY_CFG[p];
  return (
    <span style={{ padding: "2px 8px", borderRadius: 6, fontSize: 10, fontWeight: 800, color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`, letterSpacing: "0.05em", textTransform: "uppercase" }}>{p}</span>
  );
}

// ─── FILTER DRAWER ────────────────────────────────────────────────────────────────
const SOURCES_OPT  = ["University","Department","Teacher","Course","CR","Club"] as const;
const CATS_OPT     = ["Academic","Campus","Course","Event","General"] as const;
const PRIORITY_OPT = ["Normal","Important","Urgent"] as const;
const DATE_OPT     = ["Today","This Week","This Month","Custom"] as const;

type FilterState = {
  sources: string[]; cats: string[]; priorities: string[]; statuses: string[]; date: string;
};
const FILTER_INIT: FilterState = { sources: [], cats: [], priorities: [], statuses: [], date: "" };

function FilterDrawer({ state, onChange, onApply, onClose }: {
  state: FilterState; onChange: (s: FilterState) => void; onApply: () => void; onClose: () => void;
}) {
  const { theme } = useTheme(); const c = tok(theme);
  const [local, setLocal] = useState<FilterState>({ ...state });

  function toggleItem<K extends keyof FilterState>(key: K, val: string) {
    const arr = local[key] as string[];
    const next = arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val];
    setLocal({ ...local, [key]: next });
  }

  function ChipGroup({ title, items, field }: { title: string; items: readonly string[]; field: keyof FilterState }) {
    const arr = local[field] as string[];
    return (
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>{title}</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {items.map(it => {
            const on = arr.includes(it);
            return (
              <button key={it} onClick={() => toggleItem(field, it)}
                style={{ padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: on ? 700 : 500, background: on ? `${c.primary}10` : "transparent", color: on ? c.primary : c.textMuted, border: `1px solid ${on ? c.primary + "30" : c.border}`, cursor: "pointer", transition: "all 0.12s" }}>
                {it}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200 }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }} />
      <div onClick={e => e.stopPropagation()}
        style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 380, background: c.surface, borderLeft: `1px solid ${c.border}`, display: "flex", flexDirection: "column", boxShadow: "-8px 0 32px rgba(0,0,0,0.2)", overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: `1px solid ${c.border}` }}>
          <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 16, color: c.text }}>Filter Announcements</div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><Ic n="x" size={18} color={c.textDim} /></button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          <ChipGroup title="Source"   items={SOURCES_OPT}  field="sources" />
          <ChipGroup title="Category" items={CATS_OPT}     field="cats" />
          <ChipGroup title="Priority" items={PRIORITY_OPT} field="priorities" />
          <ChipGroup title="Status"   items={["Read","Unread"]} field="statuses" />

          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Date</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {DATE_OPT.map(d => {
                const on = local.date === d;
                return (
                  <button key={d} onClick={() => setLocal({ ...local, date: on ? "" : d })}
                    style={{ padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: on ? 700 : 500, background: on ? `${c.primary}10` : "transparent", color: on ? c.primary : c.textMuted, border: `1px solid ${on ? c.primary + "30" : c.border}`, cursor: "pointer" }}>
                    {d}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick selects */}
          {[{ label: "Course", val: "All Courses" }, { label: "Department", val: "CSE" }, { label: "Batch", val: "52" }, { label: "Section", val: "B" }].map(row => (
            <div key={row.label} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: c.textDim, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.07em" }}>{row.label}</div>
              <select defaultValue={row.val} style={{ width: "100%", padding: "8px 12px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 12, outline: "none" }}>
                <option>{row.val}</option>
              </select>
            </div>
          ))}
        </div>
        <div style={{ padding: "16px 24px", borderTop: `1px solid ${c.border}`, display: "flex", gap: 10 }}>
          <button onClick={() => setLocal(FILTER_INIT)} style={{ flex: 1, padding: "9px 0", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Clear All</button>
          <button onClick={() => { onChange(local); onApply(); onClose(); }} style={{ flex: 2, padding: "9px 0", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Apply Filters</button>
        </div>
      </div>
    </div>
  );
}

// ─── ANNOUNCEMENT ROW ─────────────────────────────────────────────────────────────
function AnnRow({ ann, saved, onOpen, onSave }: {
  ann: Announcement; saved: boolean; onOpen: () => void; onSave: () => void;
}) {
  const { theme } = useTheme(); const c = tok(theme);
  const [hov, setHov] = useState(false);
  const pri = PRIORITY_CFG[ann.priority];

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={onOpen}
      style={{ display: "flex", gap: 14, padding: "16px 20px", borderBottom: `1px solid ${c.border}`, background: ann.unread ? (theme === "light" ? "rgba(37,99,235,0.018)" : "rgba(59,130,246,0.04)") : hov ? c.surface2 : "transparent", cursor: "pointer", transition: "background 0.13s", position: "relative" }}>

      {/* Unread dot */}
      <div style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", width: 6, height: 6, borderRadius: "50%", background: ann.unread ? c.primary : "transparent", transition: "background 0.2s" }} />

      {/* Source avatar */}
      <div style={{ paddingLeft: 4 }}>
        <SourceAvatar source={ann.source} size={38} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
          {ann.pinned && (
            <span style={{ fontSize: 10, fontWeight: 700, color: c.textDim, display: "flex", alignItems: "center", gap: 3 }}>
              <Ic n="pin" size={9} color={c.textDim} /> PINNED
            </span>
          )}
          <PriorityLabel p={ann.priority} />
          <CatBadge cat={ann.category} />
        </div>
        <div style={{ fontFamily: "Manrope", fontWeight: ann.unread ? 800 : 600, fontSize: 14, color: c.text, marginBottom: 4, lineHeight: 1.4 }}>{ann.title}</div>
        <div style={{ fontSize: 12, color: c.textMuted, marginBottom: 6, lineHeight: 1.5, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{ann.body}</div>
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: c.textDim }}>{ann.sourceLabel}</span>
          {ann.sourceDetail && <span style={{ fontSize: 11, color: c.textDim }}>{ann.sourceDetail}</span>}
          <span style={{ fontSize: 11, color: c.textDim }}>{ann.timestamp}</span>
          {ann.attachment && <span style={{ fontSize: 11, color: c.textDim, display: "flex", alignItems: "center", gap: 3 }}><Ic n="file" size={10} color={c.textDim} /> Attachment</span>}
        </div>
      </div>

      {/* Actions */}
      <div onClick={e => e.stopPropagation()} style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end", flexShrink: 0, opacity: hov ? 1 : 0.4, transition: "opacity 0.13s" }}>
        <button onClick={e => { e.stopPropagation(); onSave(); }}
          style={{ padding: "5px 7px", borderRadius: 8, background: saved ? "rgba(37,99,235,0.08)" : c.surface3, border: `1px solid ${saved ? "rgba(37,99,235,0.25)" : c.border}`, cursor: "pointer" }}>
          <Ic n="bookmark" size={13} color={saved ? "#2563EB" : c.textDim} />
        </button>
        <span style={{ fontSize: 11, color: c.primary, fontWeight: 600, display: "flex", alignItems: "center", gap: 3, paddingRight: 2, whiteSpace: "nowrap" }}>
          Read More <Ic n="chevR" size={11} color={c.primary} />
        </span>
      </div>
    </div>
  );
}

// ─── SCREEN 2: ANNOUNCEMENT DETAIL ───────────────────────────────────────────────
function AnnDetail({ ann, saved, unread, onSave, onToggleRead, onBack }: {
  ann: Announcement; saved: boolean; unread: boolean;
  onSave: () => void; onToggleRead: () => void; onBack: () => void;
}) {
  const { theme } = useTheme(); const c = tok(theme);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: c.textMuted, cursor: "pointer", fontFamily: "Inter", fontSize: 12, fontWeight: 600, marginBottom: 20, padding: 0 }}>
          <Ic n="arrowL" size={14} color={c.textMuted} /> Back to Announcements
        </button>

        {/* Header card */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, padding: "24px 28px", boxShadow: c.cardShadow, marginBottom: 20 }}>
          {ann.priority !== "Normal" && (
            <div style={{ marginBottom: 14, padding: "10px 14px", background: PRIORITY_CFG[ann.priority].bg, border: `1px solid ${PRIORITY_CFG[ann.priority].border}`, borderRadius: 10, display: "flex", gap: 7, alignItems: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: PRIORITY_CFG[ann.priority].color, textTransform: "uppercase", letterSpacing: "0.08em" }}>{ann.priority}</span>
            </div>
          )}
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 18, flexWrap: "wrap" }}>
            <SourceAvatar source={ann.source} size={46} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                <CatBadge cat={ann.category} />
                {ann.pinned && <span style={{ fontSize: 10, fontWeight: 700, color: c.textDim, display: "flex", alignItems: "center", gap: 3 }}><Ic n="pin" size={9} color={c.textDim} /> Pinned</span>}
              </div>
              <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 20, color: c.text, letterSpacing: "-0.01em", marginBottom: 6, lineHeight: 1.35 }}>{ann.title}</h1>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: c.textMuted }}>{ann.sourceLabel}</span>
                {ann.sourceDetail && <span style={{ fontSize: 12, color: c.textDim }}>· {ann.sourceDetail}</span>}
                <span style={{ fontSize: 12, color: c.textDim }}>· Published {ann.date}</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={onToggleRead}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              <Ic n="mail" size={13} color={c.textMuted} /> {unread ? "Mark as Read" : "Mark as Unread"}
            </button>
            <button onClick={onSave}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 9, background: saved ? "rgba(37,99,235,0.08)" : c.surface2, border: `1px solid ${saved ? "rgba(37,99,235,0.25)" : c.border}`, color: saved ? "#2563EB" : c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              <Ic n="bookmark" size={13} color={saved ? "#2563EB" : c.textMuted} /> {saved ? "Saved" : "Save"}
            </button>
            <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              <Ic n="share" size={13} color={c.textMuted} /> Share
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20, alignItems: "flex-start" }}>
          {/* Left: content */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "22px 24px", boxShadow: c.cardShadow }}>
              <p style={{ fontSize: 14, color: c.textMuted, lineHeight: 1.75, margin: 0 }}>{ann.body}</p>
              {ann.link && (
                <button style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 5, color: c.primary, fontFamily: "Inter", fontSize: 13, fontWeight: 700, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  {ann.link.label} <Ic n="chevR" size={13} color={c.primary} />
                </button>
              )}
            </div>

            {/* Attachment */}
            {ann.attachment && (
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
                <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 12 }}>Attachments</div>
                <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 14px", background: c.surface2, borderRadius: 11, border: `1px solid ${c.border}` }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(239,68,68,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Ic n="file" size={18} color="#EF4444" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: c.text, marginBottom: 2 }}>{ann.attachment.name}</div>
                    <div style={{ fontSize: 11, color: c.textDim }}>{ann.attachment.ext} · {ann.attachment.size}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button style={{ padding: "6px 12px", borderRadius: 8, background: c.surface3, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Preview</button>
                    <button style={{ padding: "6px 10px", borderRadius: 8, background: c.surface3, border: `1px solid ${c.border}`, cursor: "pointer" }}>
                      <Ic n="download" size={13} color={c.textMuted} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Related content */}
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 12 }}>Related</div>
              {[
                { label: "Midterm Examination", detail: "September 10 · Database Management" },
                { label: "Exam Schedule", detail: "View all upcoming exams" },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: c.surface2, borderRadius: 10, border: `1px solid ${c.border}`, marginBottom: i === 0 ? 8 : 0, cursor: "pointer" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = c.surface3)}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = c.surface2)}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: c.text }}>{r.label}</div>
                    <div style={{ fontSize: 11, color: c.textDim }}>{r.detail}</div>
                  </div>
                  <Ic n="chevR" size={14} color={c.textDim} />
                </div>
              ))}
            </div>

            {/* Contact source */}
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "18px 22px", boxShadow: c.cardShadow, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <span style={{ fontSize: 13, color: c.textMuted }}>Questions about this announcement?</span>
              <button style={{ padding: "8px 18px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Contact Source</button>
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: c.cardShadow }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 14 }}>Published By</div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
                <SourceAvatar source={ann.source} size={40} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: c.text }}>{ann.sourceLabel}</div>
                  {ann.sourceDetail && <div style={{ fontSize: 11, color: c.textDim }}>{ann.sourceDetail}</div>}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, borderTop: `1px solid ${c.border}` }}>
                <span style={{ fontSize: 11, color: c.textDim }}>Published</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: c.textMuted }}>{ann.date}</span>
              </div>
            </div>

            {ann.audience && ann.audience.length > 0 && (
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: c.cardShadow }}>
                <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 12 }}>Audience</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {ann.audience.map(a => (
                    <span key={a} style={{ padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 600, color: c.textMuted, background: c.surface2, border: `1px solid ${c.border}` }}>{a}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN 1: ANNOUNCEMENTS LIST ─────────────────────────────────────────────────
const TAB_FILTERS = ["All","Unread","Important","Academic","Campus","Course","CR","Clubs","Saved"] as const;

export default function AnnouncementsPage() {
  const { theme } = useTheme(); const c = tok(theme);
  const [data, setData] = useState<Announcement[]>(ANNOUNCEMENTS);
  const [readIds, setReadIds]   = useState<Set<string>>(new Set());
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [tab, setTab] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<FilterState>(FILTER_INIT);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  function isUnread(ann: Announcement) { return ann.unread && !readIds.has(ann.id); }

  function openAnn(id: string) {
    setSelectedId(id);
    setReadIds(prev => new Set([...prev, id]));
  }

  function toggleSave(id: string) {
    setSavedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  function toggleRead(id: string) {
    if (readIds.has(id)) { setReadIds(prev => { const n = new Set(prev); n.delete(id); return n; }); }
    else { setReadIds(prev => new Set([...prev, id])); }
  }

  function markAllRead() {
    setReadIds(new Set(data.map(a => a.id)));
    setToast("All announcements marked as read.");
  }

  const unreadCount = data.filter(a => isUnread(a)).length;
  const todayCount  = data.filter(a => a.timestamp.includes("hour") || a.timestamp === "Today").length;
  const importantCount = data.filter(a => a.priority === "Important" || a.priority === "Urgent").length;

  const pinned   = data.filter(a => a.pinned);
  const unpinned = data.filter(a => !a.pinned);

  function applyTab(ann: Announcement): boolean {
    if (tab === "All")       return true;
    if (tab === "Unread")    return isUnread(ann);
    if (tab === "Important") return ann.priority === "Important" || ann.priority === "Urgent";
    if (tab === "Academic")  return ann.category === "Academic" || ann.category === "Department";
    if (tab === "Campus")    return ann.category === "Campus" || ann.category === "University";
    if (tab === "Course")    return ann.category === "Course";
    if (tab === "CR")        return ann.category === "CR";
    if (tab === "Clubs")     return ann.category === "Club";
    if (tab === "Saved")     return savedIds.has(ann.id);
    return true;
  }

  function applyQuery(ann: Announcement): boolean {
    if (!query) return true;
    const q = query.toLowerCase();
    return ann.title.toLowerCase().includes(q) || ann.body.toLowerCase().includes(q) || ann.sourceLabel.toLowerCase().includes(q);
  }

  const visible = [...pinned.filter(a => applyTab(a) && applyQuery(a)), ...unpinned.filter(a => applyTab(a) && applyQuery(a))];

  // Detail view
  if (selectedId) {
    const ann = data.find(a => a.id === selectedId)!;
    return (
      <AnnDetail ann={ann} saved={savedIds.has(selectedId)} unread={isUnread(ann)}
        onSave={() => toggleSave(selectedId)}
        onToggleRead={() => toggleRead(selectedId)}
        onBack={() => setSelectedId(null)}
      />
    );
  }

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 24, color: c.text, letterSpacing: "-0.02em", marginBottom: 4 }}>Announcements</h1>
            <p style={{ fontSize: 13, color: c.textMuted }}>Stay updated with important university, academic, course, and campus announcements.</p>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {unreadCount > 0 && (
              <button onClick={markAllRead} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                <Ic n="check" size={13} color={c.textMuted} /> Mark All as Read
              </button>
            )}
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
          <StatCard label="Unread"     value={unreadCount}   icon="mail"    color="#2563EB" bg="rgba(37,99,235,0.08)"  />
          <StatCard label="Today"      value={todayCount}    icon="bell"    color="#F59E0B" bg="rgba(245,158,11,0.08)" />
          <StatCard label="Important"  value={importantCount}icon="star"    color="#DC2626" bg="rgba(220,38,38,0.08)"  />
          <StatCard label="This Week"  value={data.length}   icon="filter"  color="#10B981" bg="rgba(16,185,129,0.08)" />
        </div>

        {/* Search + filter */}
        <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: "1 1 220px", minWidth: 180 }}>
            <div style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}><Ic n="search" size={14} color={c.textDim} /></div>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search announcements..."
              style={{ width: "100%", padding: "8px 12px 8px 34px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
          </div>
          <select style={{ padding: "8px 12px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 12, cursor: "pointer", outline: "none" }}>
            <option>All Sources</option>
            {SOURCES_OPT.map(s => <option key={s}>{s}</option>)}
          </select>
          <select style={{ padding: "8px 12px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 12, cursor: "pointer", outline: "none" }}>
            <option>All Courses</option>
            {["Database Management","Algorithms","Software Engineering","Computer Networks","Artificial Intelligence"].map(co => <option key={co}>{co}</option>)}
          </select>
          <button onClick={() => setShowFilter(true)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
            <Ic n="filter" size={13} color={c.textMuted} /> Filters
          </button>
        </div>

        {/* Tab chips */}
        <div style={{ display: "flex", gap: 5, marginBottom: 20, flexWrap: "wrap" }}>
          {TAB_FILTERS.map(f => (
            <button key={f} onClick={() => setTab(f)}
              style={{ padding: "5px 14px", borderRadius: 999, fontSize: 12, fontWeight: tab === f ? 700 : 500, background: tab === f ? `${c.primary}10` : "transparent", color: tab === f ? c.primary : c.textMuted, border: `1px solid ${tab === f ? c.primary + "30" : c.border}`, cursor: "pointer", transition: "all 0.13s", position: "relative" }}>
              {f}
              {f === "Unread" && unreadCount > 0 && (
                <span style={{ marginLeft: 5, fontSize: 10, fontWeight: 800, background: c.primary, color: "#fff", borderRadius: 999, padding: "1px 5px" }}>{unreadCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* List */}
        {visible.length === 0 ? (
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "60px 24px", textAlign: "center", boxShadow: c.cardShadow }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: c.surface2, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Ic n="bell" size={24} color={c.textDim} />
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 6 }}>
              {tab === "Saved" ? "No Saved Announcements" : query || tab !== "All" ? "No Announcements Found" : "No New Announcements"}
            </div>
            <div style={{ fontSize: 13, color: c.textDim, marginBottom: 20 }}>
              {tab === "Saved" ? "Save important announcements to find them quickly later." : query || tab !== "All" ? "No announcements match your filters." : "You're all caught up."}
            </div>
            {(query || tab !== "All") && tab !== "Saved" && (
              <button onClick={() => { setQuery(""); setTab("All"); }} style={{ padding: "9px 20px", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Clear Filters</button>
            )}
          </div>
        ) : (
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, overflow: "hidden", boxShadow: c.cardShadow }}>
            {visible.map((ann, i) => (
              <AnnRow key={ann.id} ann={{ ...ann, unread: isUnread(ann) }}
                saved={savedIds.has(ann.id)}
                onOpen={() => openAnn(ann.id)}
                onSave={() => toggleSave(ann.id)}
              />
            ))}
          </div>
        )}
      </div>

      {showFilter && (
        <FilterDrawer state={filters} onChange={setFilters} onApply={() => {}} onClose={() => setShowFilter(false)} />
      )}
      {toast && <Toast msg={toast} onDismiss={() => setToast(null)} />}
    </div>
  );
}
