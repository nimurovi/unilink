"use client";
import { useState, useEffect, useContext } from "react";
import { useAssignments, refreshAssignments } from "@/lib/assignments";
import AssignmentEditor from "@/components/ui/AssignmentEditor";
import { ThemeCtx } from "@/components/ui/Theme";

type Theme = "light" | "dark";
const useTheme = () => useContext(ThemeCtx);

// ─── TOKENS ──────────────────────────────────────────────────────────────────────
const LIGHT = {
  bg: "#F8FAFC", surface: "#FFFFFF", surface2: "#F1F5F9", surface3: "#E2E8F0",
  primary: "#2563EB", primaryDark: "#1D4ED8",
  text: "#0F172A", textMuted: "#64748B", textDim: "#94A3B8",
  border: "#E2E8F0",
  cardShadow: "0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)",
  primaryGlow: "rgba(37,99,235,0.14)",
  activeNav: { bg: "#EFF6FF", text: "#2563EB", border: "rgba(37,99,235,0.18)" },
};
const DARK = {
  bg: "#080D1A", surface: "#0F172A", surface2: "#172033", surface3: "#1E293B",
  primary: "#3B82F6", primaryDark: "#2563EB",
  text: "#F8FAFC", textMuted: "#94A3B8", textDim: "#475569",
  border: "#1E293B",
  cardShadow: "0 1px 4px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.18)",
  primaryGlow: "rgba(59,130,246,0.2)",
  activeNav: { bg: "rgba(59,130,246,0.14)", text: "#60A5FA", border: "rgba(59,130,246,0.22)" },
};
const tok = (t: Theme) => t === "light" ? LIGHT : DARK;

// ─── ICON PATHS ──────────────────────────────────────────────────────────────────
const P: Record<string, string[]> = {
  clipboard: ["M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2", "M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2 2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2z"],
  search: ["M21 21l-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z"],
  calendar: ["M8 2v4M16 2v4M3 10h18", "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"],
  check: ["M20 6L9 17l-5-5"],
  x: ["M18 6L6 18M6 6l12 12"],
  arrow: ["M5 12h14M12 5l7 7-7 7"],
  arrowLeft: ["M19 12H5M12 19l-7-7 7-7"],
  clock: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M12 6v6l4 2"],
  upload: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M17 8l-5-5-5 5", "M12 3v12"],
  download: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M7 10l5 5 5-5", "M12 15V3"],
  file: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6"],
  eye: ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"],
  trash: ["M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"],
  alert: ["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z", "M12 9v4M12 17h.01"],
  book: ["M4 19.5A2.5 2.5 0 0 1 6.5 17H20", "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"],
  chevronR: ["M9 18l6-6-6-6"],
  list: ["M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"],
  filter: ["M22 3H2l8 9.46V19l4 2v-8.54L22 3z"],
  plus: ["M12 5v14M5 12h14"],
};

function Ic({ n, size = 16, color = "currentColor" }: { n: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      {(P[n] ?? []).map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

// ─── TYPES ───────────────────────────────────────────────────────────────────────
import { type AssignmentStatus, type Assignment, AssignmentDetail, StatusPill } from "./assignments-shared";



// ─── STAT CARD ────────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, color, bg }: { label: string; value: string; icon: string; color: string; bg: string }) {
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

// ─── DUE DATE LABEL ───────────────────────────────────────────────────────────────
function DueLabel({ label, status }: { label: string; status: AssignmentStatus }) {
  const { theme } = useTheme(); const c = tok(theme);
  const isOverdue = status === "overdue";
  const isDueSoon = status === "due-soon";
  return (
    <span style={{ fontSize: 11, fontWeight: isOverdue || isDueSoon ? 700 : 500, color: isOverdue ? "#EF4444" : isDueSoon ? "#F59E0B" : c.textMuted }}>
      {isOverdue ? "Overdue · " : ""}{label}
    </span>
  );
}

// ─── CALENDAR VIEW ───────────────────────────────────────────────────────────────
const CALENDAR_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function CalendarView({ onSelectAssignment }: { onSelectAssignment: (a: Assignment) => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const {assignments} = useAssignments();
  const [month,setMonth] = useState(()=>new Date(Date.now()+6*3600000).toISOString().slice(0,7));
  const [year,num]=month.split('-').map(Number);
  const start=new Date(Date.UTC(year,num-1,1)).getUTCDay();
  const count=new Date(Date.UTC(year,num,0)).getUTCDate();
  const days=Array.from({length:Math.ceil((start+count)/7)*7},(_,i)=>i>=start&&i<start+count?i-start+1:null);
  const DUE_DAY_MAP:Record<string,Assignment[]>={};
  assignments.forEach(a=>{const date=new Date(Date.parse(a.dueAt)+6*3600000).toISOString().slice(0,10);if(date.startsWith(month)){const key=String(Number(date.slice(8)));(DUE_DAY_MAP[key]??=[]).push(a);}});
  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "24px 26px", boxShadow: c.cardShadow }}>
      <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 16, color: c.text, marginBottom: 20 }}>Deadline Calendar (Bangladesh time) <input aria-label="Calendar month" type="month" value={month} onChange={e=>{if(e.target.value)setMonth(e.target.value);}} /></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
        {CALENDAR_DAYS.map(d => (
          <div key={d} style={{ textAlign: "center", fontSize: 10, fontWeight: 700, color: c.textDim, padding: "4px 0", textTransform: "uppercase", letterSpacing: "0.06em" }}>{d}</div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
        {days.map((day, i) => {
          const assignments = day ? DUE_DAY_MAP[String(day)] : [];
          const hasAssignment = assignments && assignments.length > 0;
          return (
            <div key={i} style={{ minHeight: 56, borderRadius: 10, border: `1px solid ${hasAssignment ? c.border : "transparent"}`, background: hasAssignment ? c.surface2 : "transparent", padding: 4, position: "relative", cursor: hasAssignment ? "pointer" : "default", transition: "all 0.14s" }}
              
              onMouseEnter={e => { if (hasAssignment) (e.currentTarget as HTMLElement).style.background = c.activeNav.bg; }}
              onMouseLeave={e => { if (hasAssignment) (e.currentTarget as HTMLElement).style.background = hasAssignment ? c.surface2 : "transparent"; }}>
              {day && (
                <>
                  <div style={{ fontSize: 11, fontWeight: hasAssignment ? 700 : 400, color: hasAssignment ? c.text : c.textDim, padding: "2px 4px" }}>{day}</div>
                  {hasAssignment && assignments.map((a, ai) => (
                    <div key={ai} role="button" tabIndex={0} onClick={()=>onSelectAssignment(a)} onKeyDown={e=>{if(e.key==="Enter")onSelectAssignment(a);}} style={{ marginTop: 2, padding: "2px 4px", borderRadius: 4, background: `${a.color}18`, borderLeft: `2px solid ${a.color}`, overflow: "hidden" }}>
                      <div style={{ fontSize: 9, fontWeight: 600, color: a.color, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.title.split(" ").slice(0, 2).join(" ")}</div>
                    </div>
                  ))}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── ASSIGNMENTS LIST ─────────────────────────────────────────────────────────────
const STATUS_FILTERS = ["All", "Upcoming", "Due Soon", "Submitted", "Overdue"] as const;
const SORT_OPTIONS = ["Due Date", "Newest", "Oldest"] as const;

function AssignmentsList({ onOpen }: { onOpen: (a: Assignment) => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [statusFilter, setStatusFilter] = useState("All");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  const [sort, setSort] = useState("Due Date");
  const [query, setQuery] = useState("");
  const [calView, setCalView] = useState(false);

  const filterMap: Record<string, AssignmentStatus | null> = {
    "All": null, "Upcoming": "upcoming", "Due Soon": "due-soon",
    "Submitted": "submitted", "Overdue": "overdue",
  };

  const {assignments:ASSIGNMENTS,canManage} = useAssignments();
  const courses = ["All Courses", ...Array.from(new Set(ASSIGNMENTS.map(a => a.course)))];

  const filtered = ASSIGNMENTS.filter(a => {
    const matchStatus = !filterMap[statusFilter] || a.status === filterMap[statusFilter];
    const matchCourse = courseFilter === "All Courses" || a.course === courseFilter;
    const matchQ = !query || a.title.toLowerCase().includes(query.toLowerCase()) || a.course.toLowerCase().includes(query.toLowerCase()) || a.code.toLowerCase().includes(query.toLowerCase());
    return matchStatus && matchCourse && matchQ;
  }).sort((a, b) => {
    if (sort === "Newest") return b.createdAt.localeCompare(a.createdAt);
    if (sort === "Oldest") return a.createdAt.localeCompare(b.createdAt);
    return a.dueAt.localeCompare(b.dueAt);
  });

  const getActionLabel = () => canManage ? "Manage →" : "View →";

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 24, color: c.text, letterSpacing: "-0.02em", marginBottom: 4 }}>Assignments</h1>
            <p style={{ fontSize: 13, color: c.textMuted }}>Track your assignments, deadlines, submissions, and academic progress.</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setCalView(v => !v)}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 9, border: `1px solid ${calView ? c.activeNav.border : c.border}`, background: calView ? c.activeNav.bg : c.surface, color: calView ? c.activeNav.text : c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}>
              <Ic n="calendar" size={13} color="currentColor" />{calView ? "List View" : "Calendar View"}
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
          <StatCard label="Total Assignments" value={String(ASSIGNMENTS.length)} icon="clipboard" color="#2563EB" bg="rgba(37,99,235,0.08)" />
          <StatCard label="Due Soon" value={String(ASSIGNMENTS.filter(a=>a.status==="due-soon").length)} icon="clock" color="#F59E0B" bg="rgba(245,158,11,0.08)" />
          <StatCard label="Submitted by You" value={String(ASSIGNMENTS.filter(a=>a.hasSubmission).length)} icon="check" color="#10B981" bg="rgba(16,185,129,0.08)" />
          <StatCard label="Overdue" value={String(ASSIGNMENTS.filter(a=>a.status==="overdue").length)} icon="alert" color="#EF4444" bg="rgba(239,68,68,0.08)" />
        </div>

        {calView ? (
          <CalendarView onSelectAssignment={onOpen} />
        ) : (
          <>
            {/* Search + filters */}
            <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
              {/* Search */}
              <div style={{ position: "relative", flex: "1 1 220px", minWidth: 180 }}>
                <div style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}>
                  <Ic n="search" size={14} color={c.textDim} />
                </div>
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search assignments..."
                  style={{ width: "100%", padding: "8px 12px 8px 34px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              </div>
              {/* Course filter */}
              <select value={courseFilter} onChange={e => setCourseFilter(e.target.value)}
                style={{ padding: "8px 12px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 12, cursor: "pointer", outline: "none" }}>
                {courses.map(c2 => <option key={c2}>{c2}</option>)}
              </select>
              {/* Sort */}
              <select value={sort} onChange={e => setSort(e.target.value)}
                style={{ padding: "8px 12px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 12, cursor: "pointer", outline: "none" }}>
                {SORT_OPTIONS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            {/* Status filter chips */}
            <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
              {STATUS_FILTERS.map(f => (
                <button key={f} onClick={() => setStatusFilter(f)}
                  style={{ padding: "5px 13px", borderRadius: 999, fontSize: 12, fontWeight: statusFilter === f ? 700 : 500, background: statusFilter === f ? `${c.primary}10` : "transparent", color: statusFilter === f ? c.primary : c.textMuted, border: `1px solid ${statusFilter === f ? c.primary + "30" : c.border}`, cursor: "pointer", transition: "all 0.13s", whiteSpace: "nowrap" }}>
                  {f}
                </button>
              ))}
            </div>

            {/* Assignment list */}
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, overflow: "hidden", boxShadow: c.cardShadow }}>
              {/* Table header */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 180px 140px 120px 100px", gap: 0, padding: "10px 20px", background: c.surface2, borderBottom: `1px solid ${c.border}` }}>
                {["Assignment", "Course", "Due Date", "Status", "Action"].map(h => (
                  <div key={h} style={{ fontSize: 10, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</div>
                ))}
              </div>

              {filtered.length === 0 ? (
                <div style={{ padding: "60px 24px", textAlign: "center" }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: c.surface2, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <Ic n="clipboard" size={22} color={c.textDim} />
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 6 }}>No assignments found</div>
                  <div style={{ fontSize: 13, color: c.textDim }}>
                    {statusFilter === "Due Soon" ? "No assignments due soon." : "Try adjusting your filters or search."}
                  </div>
                </div>
              ) : (
                filtered.map((a, i) => (
                  <div key={a.id}
                    style={{ display: "grid", gridTemplateColumns: "1fr 180px 140px 120px 100px", alignItems: "center", padding: "14px 20px", borderBottom: i < filtered.length - 1 ? `1px solid ${c.border}` : "none", cursor: "pointer", transition: "background 0.13s" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = c.surface2)}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                    onClick={() => onOpen(a)}
                  >
                    {/* Title + accent */}
                    <div style={{ display: "flex", gap: 12, alignItems: "center", minWidth: 0 }}>
                      <div style={{ width: 4, height: 36, borderRadius: 2, background: a.color, flexShrink: 0 }} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: c.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 2 }}>{a.title}</div>
                        <div style={{ fontSize: 11, color: c.textDim }}>{a.code}</div>
                      </div>
                    </div>

                    {/* Course */}
                    <div style={{ fontSize: 12, color: c.textMuted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.course}</div>

                    {/* Due date */}
                    <div>
                      <DueLabel label={a.dueLabel} status={a.status} />
                    </div>

                    {/* Status */}
                    <StatusPill status={a.status} />

                    {/* Action */}
                    <button onClick={e => { e.stopPropagation(); onOpen(a); }}
                      style={{ padding: "6px 12px", borderRadius: 8, background: (a.status === "due-soon" || a.status === "upcoming") ? c.primary : c.surface2, color: (a.status === "due-soon" || a.status === "upcoming") ? "#fff" : c.textMuted, border: `1px solid ${c.border}`, fontFamily: "Inter", fontSize: 11, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                      {getActionLabel()}
                    </button>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}


export default function AssignmentsPage({initialId}:{initialId?:string}={}) {
 const {theme}=useTheme(),c=tok(theme);const data=useAssignments();const [selected,setSelected]=useState<string|null>(initialId||null);const [create,setCreate]=useState(false);
 const a=data.assignments.find(a=>a.id===selected);
 const back=()=>setSelected(null);
 return <div style={{flex:1,minWidth:0,display:'flex',flexDirection:'column',overflowY:'auto',background:c.bg,color:c.text}}>
 <div style={{padding:'16px 28px 0',display:'flex',gap:12}}><button onClick={()=>void refreshAssignments()} style={{padding:'8px 14px',borderRadius:9,border:`1px solid ${c.border}`,background:c.surface,color:c.text}}>Refresh</button>{data.canManage&&<button onClick={()=>setCreate(true)} style={{padding:'8px 14px',borderRadius:9,border:0,background:c.primary,color:'white'}}>Create Assignment</button>}</div>
 {data.loading?<p style={{padding:28}}>Loading assignments…</p>:data.error?<p role="alert" style={{padding:28}}>{data.error}</p>:selected?a?<AssignmentDetail key={a.id} assignment={a} onBack={back}/>:<div style={{padding:28}}><p>Assignment not found or no longer available to your class.</p><button onClick={back}>Back to Assignments</button></div>:<AssignmentsList onOpen={a=>setSelected(a.id)}/>}
 {create&&<AssignmentEditor onClose={()=>setCreate(false)}/>}
 </div>;
}
