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
  primaryGlow: "rgba(37,99,235,0.14)",
  activeNav: { bg: "#EFF6FF", text: "#2563EB", border: "rgba(37,99,235,0.18)" },
};
const DARK = {
  bg: "#080D1A", surface: "#0F172A", surface2: "#172033", surface3: "#1E293B",
  primary: "#3B82F6", primaryDark: "#2563EB",
  text: "#F8FAFC", textMuted: "#94A3B8", textDim: "#475569",
  border: "#1E293B", cardShadow: "0 1px 4px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.18)",
  primaryGlow: "rgba(59,130,246,0.2)",
  activeNav: { bg: "rgba(59,130,246,0.14)", text: "#60A5FA", border: "rgba(59,130,246,0.22)" },
};
const tok = (t: Theme) => t === "light" ? LIGHT : DARK;

const P: Record<string, string[]> = {
  calendar: ["M8 2v4M16 2v4M3 10h18", "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"],
  search:   ["M21 21l-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z"],
  clock:    ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M12 6v6l4 2"],
  award:    ["M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z", "M8.21 13.89L7 23l5-3 5 3-1.21-9.12"],
  bell:     ["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0"],
  check:    ["M20 6L9 17l-5-5"],
  alert:    ["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z", "M12 9v4M12 17h.01"],
  arrowL:   ["M19 12H5M12 19l-7-7 7-7"],
  chevR:    ["M9 18l6-6-6-6"],
  map:      ["M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z", "M12 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"],
  book:     ["M4 19.5A2.5 2.5 0 0 1 6.5 17H20", "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"],
  file:     ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6"],
  list:     ["M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"],
  x:        ["M18 6L6 18M6 6l12 12"],
};
function Ic({ n, size = 16, color = "currentColor" }: { n: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      {(P[n] ?? []).map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

// ─── TYPES ───────────────────────────────────────────────────────────────────────
type ExamType   = "midterm" | "final" | "quiz" | "class-test" | "lab" | "presentation" | "viva";
type ExamStatus = "upcoming" | "today" | "completed" | "rescheduled" | "cancelled";

type Exam = {
  id: string; title: string; course: string; code: string; instructor: string;
  type: ExamType; date: string; dateShort: string; time: string; timeStart: string;
  room: string; building: string; status: ExamStatus; daysLeft: number; color: string;
  syllabus?: string[]; rescheduledFrom?: string;
};

type Deadline = {
  id: string; title: string; course: string; code: string;
  date: string; type: string; color: string;
};

const TYPE_LABEL: Record<ExamType, string> = {
  midterm: "Midterm", final: "Final", quiz: "Quiz",
  "class-test": "Class Test", lab: "Lab Exam", presentation: "Presentation", viva: "Viva",
};

const STATUS_CFG: Record<ExamStatus, { label: string; color: string; bg: string; border: string }> = {
  upcoming:    { label: "Upcoming",    color: "#2563EB", bg: "rgba(37,99,235,0.08)",   border: "rgba(37,99,235,0.2)"   },
  today:       { label: "Today",       color: "#F59E0B", bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.2)"  },
  completed:   { label: "Completed",   color: "#10B981", bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.2)"  },
  rescheduled: { label: "Rescheduled", color: "#8B5CF6", bg: "rgba(139,92,246,0.08)",  border: "rgba(139,92,246,0.2)"  },
  cancelled:   { label: "Cancelled",   color: "#94A3B8", bg: "rgba(148,163,184,0.08)", border: "rgba(148,163,184,0.2)" },
};

function StatusPill({ status }: { status: ExamStatus }) {
  const s = STATUS_CFG[status];
  return <span style={{ padding: "2px 9px", borderRadius: 999, fontSize: 10, fontWeight: 700, color: s.color, background: s.bg, border: `1px solid ${s.border}`, whiteSpace: "nowrap" }}>{s.label}</span>;
}

function TypeBadge({ type }: { type: ExamType }) {
  const { theme } = useTheme(); const c = tok(theme);
  return <span style={{ padding: "2px 8px", borderRadius: 6, fontSize: 10, fontWeight: 700, color: c.textMuted, background: c.surface2, border: `1px solid ${c.border}`, whiteSpace: "nowrap" }}>{TYPE_LABEL[type]}</span>;
}

const EXAMS: Exam[] = [
  { id:"e1", title:"Midterm Examination", course:"Database Management",    code:"CSE 305", instructor:"Dr. Rahman", type:"midterm",      date:"September 10, 2026", dateShort:"Sep 10", time:"10:00 AM – 12:00 PM", timeStart:"10:00 AM", room:"502", building:"Building 3", status:"upcoming",    daysLeft:5,  color:"#2563EB", syllabus:["Relational Database Model","ER Diagrams","SQL","Normalization","Transactions"] },
  { id:"e2", title:"Final Examination",   course:"Algorithms",             code:"CSE 301", instructor:"Dr. Karim",  type:"final",        date:"November 20, 2026",  dateShort:"Nov 20", time:"10:00 AM – 12:00 PM", timeStart:"10:00 AM", room:"405", building:"Building 2", status:"upcoming",    daysLeft:86, color:"#8B5CF6", syllabus:["Sorting & Searching","Graph Algorithms","Dynamic Programming","NP-Completeness","Complexity Analysis"] },
  { id:"e3", title:"Quiz 03",             course:"Software Engineering",   code:"CSE 310", instructor:"Ms. Sarah",  type:"quiz",         date:"September 2, 2026",  dateShort:"Sep 2",  time:"2:00 PM – 3:00 PM",  timeStart:"2:00 PM",  room:"301", building:"Building 1", status:"upcoming",    daysLeft:3,  color:"#10B981", syllabus:["Agile Methodology","UML Diagrams","Design Patterns"] },
  { id:"e4", title:"Lab Exam 02",         course:"Computer Networks",      code:"CSE 307", instructor:"Dr. Ahmed",  type:"lab",          date:"September 8, 2026",  dateShort:"Sep 8",  time:"11:00 AM – 1:00 PM", timeStart:"11:00 AM", room:"307", building:"Lab Block",  status:"upcoming",    daysLeft:9,  color:"#F59E0B", syllabus:["TCP/IP","Routing Protocols","Network Security","Socket Programming"] },
  { id:"e5", title:"Class Test 01",       course:"Artificial Intelligence",code:"CSE 401", instructor:"Dr. Hasan",  type:"class-test",   date:"September 5, 2026",  dateShort:"Sep 5",  time:"10:00 AM – 11:00 AM",timeStart:"10:00 AM", room:"401", building:"Building 3", status:"upcoming",    daysLeft:6,  color:"#06B6D4", syllabus:["Search Algorithms","Propositional Logic","Bayesian Networks"] },
  { id:"e6", title:"Quiz 02",             course:"Software Engineering",   code:"CSE 310", instructor:"Ms. Sarah",  type:"quiz",         date:"August 20, 2026",    dateShort:"Aug 20", time:"2:00 PM – 3:00 PM",  timeStart:"2:00 PM",  room:"301", building:"Building 1", status:"completed",   daysLeft:0,  color:"#10B981" },
  { id:"e7", title:"Midterm — Rescheduled",course:"Computer Networks",     code:"CSE 307", instructor:"Dr. Ahmed",  type:"midterm",      date:"September 12, 2026", dateShort:"Sep 12", time:"10:00 AM – 12:00 PM",timeStart:"10:00 AM", room:"502", building:"Building 3", status:"rescheduled", daysLeft:13, color:"#F59E0B", rescheduledFrom:"September 9, 2026" },
];

const DEADLINES: Deadline[] = [
  { id:"d1", title:"Database Assignment 02",           course:"Database Management",  code:"CSE 305", date:"Sep 1",  type:"Assignment", color:"#2563EB" },
  { id:"d2", title:"Software Engineering Presentation",course:"Software Engineering", code:"CSE 310", date:"Sep 5",  type:"Presentation",color:"#10B981" },
  { id:"d3", title:"Computer Networks Lab Report",     course:"Computer Networks",    code:"CSE 307", date:"Sep 8",  type:"Lab Report", color:"#F59E0B" },
  { id:"d4", title:"Research Proposal",                course:"Research Methodology", code:"RES 201", date:"Sep 15", type:"Proposal",   color:"#8B5CF6" },
];

const TIMELINE = [
  { date:"AUG 30", label:"Assignment Submission", course:"Database Management",  color:"#2563EB", type:"assignment" },
  { date:"SEP 2",  label:"Quiz 03",               course:"Software Engineering", color:"#10B981", type:"quiz" },
  { date:"SEP 5",  label:"Class Test 01",          course:"Artificial Intelligence",color:"#06B6D4",type:"exam" },
  { date:"SEP 8",  label:"Lab Exam 02",            course:"Computer Networks",   color:"#F59E0B", type:"exam" },
  { date:"SEP 10", label:"Midterm Examination",    course:"Database Management", color:"#2563EB", type:"exam" },
  { date:"SEP 15", label:"Research Proposal",      course:"Research Methodology",color:"#8B5CF6", type:"deadline" },
];

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

// ─── NEXT EXAM HIGHLIGHT ─────────────────────────────────────────────────────────
function NextExamBanner({ exam, onView }: { exam: Exam; onView: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "22px 26px", boxShadow: c.cardShadow, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
      <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: `${exam.color}12`, border: `1px solid ${exam.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Ic n="award" size={24} color={exam.color} />
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Next Exam</div>
          <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 17, color: c.text, marginBottom: 3 }}>{exam.title}</div>
          <div style={{ fontSize: 12, color: c.textMuted }}>{exam.course} · {exam.code}</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: c.textDim, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>Date</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: c.text }}>{exam.date}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: c.textDim, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>Time</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: c.text }}>{exam.time}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: c.textDim, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>Room</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: c.text }}>{exam.room}</div>
        </div>
        <div style={{ padding: "6px 14px", background: `${exam.color}10`, border: `1px solid ${exam.color}30`, borderRadius: 10, textAlign: "center" }}>
          <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 20, color: exam.color, lineHeight: 1 }}>{exam.daysLeft}</div>
          <div style={{ fontSize: 10, fontWeight: 600, color: exam.color, marginTop: 2 }}>Days Left</div>
        </div>
        <button onClick={onView} style={{ padding: "9px 20px", borderRadius: 10, background: exam.color, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
          View Details
        </button>
      </div>
    </div>
  );
}

// ─── CALENDAR (MONTH VIEW) ────────────────────────────────────────────────────────
const CAL_DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const CAL_DATES = [
  [null,null,null,null,null,null,1],
  [2,3,4,5,6,7,8],
  [9,10,11,12,13,14,15],
  [16,17,18,19,20,21,22],
  [23,24,25,26,27,28,29],
  [30,null,null,null,null,null,null],
];
const EXAM_BY_DAY: Record<number, Exam[]> = {};
EXAMS.forEach(e => {
  if (e.dateShort.startsWith("Sep ")) {
    const d = parseInt(e.dateShort.replace("Sep ", ""));
    if (!EXAM_BY_DAY[d]) EXAM_BY_DAY[d] = [];
    EXAM_BY_DAY[d].push(e);
  }
});
const DEADLINE_BY_DAY: Record<number, Deadline[]> = {};
DEADLINES.forEach(d2 => {
  if (d2.date.startsWith("Sep ")) {
    const d = parseInt(d2.date.replace("Sep ",""));
    if (!DEADLINE_BY_DAY[d]) DEADLINE_BY_DAY[d] = [];
    DEADLINE_BY_DAY[d].push(d2);
  }
});

type CalEvent = { label: string; course: string; color: string; type: "exam" | "deadline" };
function getCalDay(day: number): CalEvent[] {
  const res: CalEvent[] = [];
  (EXAM_BY_DAY[day] ?? []).forEach(e => res.push({ label: e.title, course: e.course, color: e.color, type: "exam" }));
  (DEADLINE_BY_DAY[day] ?? []).forEach(d2 => res.push({ label: d2.title, course: d2.course, color: d2.color, type: "deadline" }));
  return res;
}

type CalView = "month" | "week" | "list";

function ExamCalendar({ onSelectExam }: { onSelectExam: (e: Exam) => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [calView, setCalView] = useState<CalView>("month");
  const [popover, setPopover] = useState<CalEvent[] | null>(null);

  const listItems = [...EXAMS.filter(e => e.status !== "completed"), ...DEADLINES.map(d2 => ({
    id: d2.id, title: d2.title, course: d2.course, dateShort: d2.date, time: "", color: d2.color, type: "deadline",
  }))].sort((a, b) => a.dateShort.localeCompare(b.dateShort));

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 22 }}>
          <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 24, color: c.text, letterSpacing: "-0.02em", marginBottom: 4 }}>Academic Calendar</h1>
          <p style={{ fontSize: 13, color: c.textMuted }}>View exams, quizzes, presentations, and academic deadlines.</p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button style={{ padding: "7px 12px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>‹</button>
            <span style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 16, color: c.text, minWidth: 160, textAlign: "center" }}>September 2026</span>
            <button style={{ padding: "7px 12px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>›</button>
            <button style={{ padding: "7px 12px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Today</button>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {(["month","week","list"] as CalView[]).map(v => (
              <button key={v} onClick={() => setCalView(v)}
                style={{ padding: "7px 14px", borderRadius: 9, background: calView === v ? `${c.primary}10` : "transparent", color: calView === v ? c.primary : c.textMuted, border: `1px solid ${calView === v ? c.primary + "30" : c.border}`, fontFamily: "Inter", fontSize: 12, fontWeight: calView === v ? 700 : 500, cursor: "pointer", textTransform: "capitalize" }}>
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: 14, marginBottom: 16, flexWrap: "wrap" }}>
          {[{ label: "Exam / Quiz", dot: c.primary }, { label: "Assignment / Deadline", dot: "#F59E0B" }].map(l => (
            <div key={l.label} style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: l.dot }} />
              <span style={{ fontSize: 11, color: c.textDim }}>{l.label}</span>
            </div>
          ))}
        </div>

        {calView === "month" && (
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, overflow: "hidden", boxShadow: c.cardShadow }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", borderBottom: `1px solid ${c.border}`, background: c.surface2 }}>
              {CAL_DAYS.map(d => (
                <div key={d} style={{ padding: "10px 0", textAlign: "center", fontSize: 10, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.06em" }}>{d}</div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)" }}>
              {CAL_DATES.flat().map((day, i) => {
                const events = day ? getCalDay(day) : [];
                const hasEvents = events.length > 0;
                return (
                  <div key={i} onClick={() => hasEvents && setPopover(events)}
                    style={{ minHeight: 80, borderRight: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}`, padding: 6, cursor: hasEvents ? "pointer" : "default", transition: "background 0.13s", position: "relative" }}
                    onMouseEnter={e => { if (hasEvents) (e.currentTarget as HTMLElement).style.background = c.surface2; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                    {day && (
                      <>
                        <div style={{ fontSize: 12, fontWeight: hasEvents ? 700 : 400, color: hasEvents ? c.text : c.textDim, marginBottom: 4 }}>{day}</div>
                        {events.slice(0, 2).map((ev, ei) => (
                          <div key={ei} style={{ marginBottom: 3, padding: "2px 5px", borderRadius: 4, background: `${ev.color}16`, borderLeft: `2px solid ${ev.color}` }}>
                            <div style={{ fontSize: 9, fontWeight: 600, color: ev.color, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ev.label.split(" ").slice(0, 2).join(" ")}</div>
                          </div>
                        ))}
                        {events.length > 2 && (
                          <div style={{ fontSize: 9, color: c.textDim, fontWeight: 600 }}>+{events.length - 2} more</div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {calView === "week" && (
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "20px 22px", boxShadow: c.cardShadow }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 16 }}>Sep 7 – Sep 13, 2026</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 8 }}>
              {["Mon 7","Tue 8","Wed 9","Thu 10","Fri 11","Sat 12","Sun 13"].map((day, di) => {
                const events: {label:string;color:string;time:string}[] = [];
                if (di === 1) events.push({ label: "Lab Exam 02", color: "#F59E0B", time: "11:00 AM" });
                if (di === 3) events.push({ label: "Midterm Exam", color: "#2563EB", time: "10:00 AM" });
                return (
                  <div key={day} style={{ minHeight: 120 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: di === 3 ? c.primary : c.textDim, marginBottom: 8, textAlign: "center" }}>{day}</div>
                    {events.map((ev, ei) => (
                      <div key={ei} style={{ padding: "6px 8px", borderRadius: 8, background: `${ev.color}12`, border: `1px solid ${ev.color}30`, borderLeft: `3px solid ${ev.color}`, marginBottom: 6, cursor: "pointer" }}>
                        <div style={{ fontSize: 9, color: ev.color, fontWeight: 700, marginBottom: 2 }}>{ev.time}</div>
                        <div style={{ fontSize: 10, fontWeight: 600, color: c.text }}>{ev.label}</div>
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
            <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 180px 100px 80px", padding: "10px 20px", background: c.surface2, borderBottom: `1px solid ${c.border}` }}>
              {["Date","Event","Course","Type","Status"].map(h => (
                <div key={h} style={{ fontSize: 10, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</div>
              ))}
            </div>
            {listItems.map((item, i) => {
              const exam = EXAMS.find(e => e.id === item.id);
              return (
                <div key={item.id} onClick={() => exam && onSelectExam(exam)}
                  style={{ display: "grid", gridTemplateColumns: "100px 1fr 180px 100px 80px", alignItems: "center", padding: "13px 20px", borderBottom: i < listItems.length - 1 ? `1px solid ${c.border}` : "none", cursor: exam ? "pointer" : "default", transition: "background 0.13s" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = c.surface2)}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                >
                  <div style={{ fontSize: 11, fontWeight: 700, color: c.textDim }}>{item.dateShort}</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", minWidth: 0 }}>
                    <div style={{ width: 3, height: 30, borderRadius: 2, background: item.color, flexShrink: 0 }} />
                    <div style={{ fontSize: 13, fontWeight: 600, color: c.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.title}</div>
                  </div>
                  <div style={{ fontSize: 12, color: c.textMuted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.course}</div>
                  <div style={{ fontSize: 11, color: c.textDim }}>{"time" in item && item.time ? "Exam" : "Deadline"}</div>
                  {exam ? <StatusPill status={exam.status} /> : <span style={{ fontSize: 10, color: c.textDim }}>—</span>}
                </div>
              );
            })}
          </div>
        )}

        {/* Popover */}
        {popover && (
          <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setPopover(null)}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }} />
            <div onClick={e => e.stopPropagation()} style={{ position: "relative", background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "22px 24px", minWidth: 300, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text }}>Events</div>
                <button onClick={() => setPopover(null)} style={{ background: "none", border: "none", cursor: "pointer" }}><Ic n="x" size={16} color={c.textDim} /></button>
              </div>
              {popover.map((ev, i) => (
                <div key={i} style={{ padding: "10px 12px", background: c.surface2, borderRadius: 10, border: `1px solid ${c.border}`, borderLeft: `3px solid ${ev.color}`, marginBottom: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: c.text, marginBottom: 2 }}>{ev.label}</div>
                  <div style={{ fontSize: 11, color: c.textDim }}>{ev.course}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── EXAM LIST PAGE ───────────────────────────────────────────────────────────────
const TYPE_FILTERS = ["All", "Exams", "Quizzes", "Presentations", "Lab Exams", "Deadlines"] as const;
const TIME_FILTERS = ["All Upcoming", "This Week", "This Month"] as const;

function ExamsList({ onOpenExam, onCalendar }: { onOpenExam: (e: Exam) => void; onCalendar: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [typeFilter, setTypeFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("All Upcoming");
  const [courseFilter, setCourseFilter] = useState("All Courses");
  const [sort, setSort] = useState("Date");
  const [query, setQuery] = useState("");

  const courses = ["All Courses", ...Array.from(new Set(EXAMS.map(e => e.course)))];

  const typeMap: Record<string, ExamType[]> = {
    "All": [], "Exams": ["midterm","final","class-test","viva"],
    "Quizzes": ["quiz"], "Presentations": ["presentation"], "Lab Exams": ["lab"], "Deadlines": [],
  };

  const filtered = EXAMS.filter(e => {
    const matchType = typeFilter === "All" || typeFilter === "Deadlines" ? true : typeMap[typeFilter]?.includes(e.type);
    const matchCourse = courseFilter === "All Courses" || e.course === courseFilter;
    const matchQ = !query || e.title.toLowerCase().includes(query.toLowerCase()) || e.course.toLowerCase().includes(query.toLowerCase()) || e.code.toLowerCase().includes(query.toLowerCase());
    const matchTime = timeFilter === "This Week" ? e.daysLeft <= 7 : timeFilter === "This Month" ? e.daysLeft <= 30 : true;
    return matchType && matchCourse && matchQ && matchTime;
  }).sort((a, b) => sort === "Date" ? a.daysLeft - b.daysLeft : b.id.localeCompare(a.id));

  const nextExam = EXAMS.filter(e => e.status !== "completed" && e.status !== "cancelled").sort((a, b) => a.daysLeft - b.daysLeft)[0];

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 24, color: c.text, letterSpacing: "-0.02em", marginBottom: 4 }}>Exams & Deadlines</h1>
            <p style={{ fontSize: 13, color: c.textMuted }}>Keep track of your upcoming exams, quizzes, presentations, and important academic dates.</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onCalendar} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 9, border: `1px solid ${c.border}`, background: c.surface, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              <Ic n="calendar" size={13} color="currentColor" /> Calendar View
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
          <StatCard label="Upcoming Exams"    value="4" icon="award"    color="#2563EB" bg="rgba(37,99,235,0.08)" />
          <StatCard label="This Week"         value="2" icon="clock"    color="#F59E0B" bg="rgba(245,158,11,0.08)" />
          <StatCard label="Next Exam"         value="3d" icon="calendar" color="#10B981" bg="rgba(16,185,129,0.08)" />
          <StatCard label="Academic Deadlines"value="7" icon="list"     color="#8B5CF6" bg="rgba(139,92,246,0.08)" />
        </div>

        {/* Next exam highlight */}
        {nextExam && (
          <div style={{ marginBottom: 24 }}>
            <NextExamBanner exam={nextExam} onView={() => onOpenExam(nextExam)} />
          </div>
        )}

        {/* Search + filters */}
        <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: "1 1 220px", minWidth: 180 }}>
            <div style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}><Ic n="search" size={14} color={c.textDim} /></div>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search exams..."
              style={{ width: "100%", padding: "8px 12px 8px 34px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
          </div>
          <select value={courseFilter} onChange={e => setCourseFilter(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 12, cursor: "pointer", outline: "none" }}>
            {courses.map(c2 => <option key={c2}>{c2}</option>)}
          </select>
          <select value={timeFilter} onChange={e => setTimeFilter(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 12, cursor: "pointer", outline: "none" }}>
            {TIME_FILTERS.map(f => <option key={f}>{f}</option>)}
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 12, cursor: "pointer", outline: "none" }}>
            <option>Date</option><option>Newest Added</option>
          </select>
        </div>

        {/* Type filter chips */}
        <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
          {TYPE_FILTERS.map(f => (
            <button key={f} onClick={() => setTypeFilter(f)}
              style={{ padding: "5px 13px", borderRadius: 999, fontSize: 12, fontWeight: typeFilter === f ? 700 : 500, background: typeFilter === f ? `${c.primary}10` : "transparent", color: typeFilter === f ? c.primary : c.textMuted, border: `1px solid ${typeFilter === f ? c.primary + "30" : c.border}`, cursor: "pointer", transition: "all 0.13s" }}>
              {f}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, alignItems: "flex-start" }}>
          {/* Exam list */}
          <div>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 12 }}>Upcoming Exams</div>
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, overflow: "hidden", boxShadow: c.cardShadow, marginBottom: 20 }}>
              {filtered.length === 0 ? (
                <div style={{ padding: "52px 24px", textAlign: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: c.surface2, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}><Ic n="award" size={20} color={c.textDim} /></div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: c.text, marginBottom: 5 }}>No upcoming exams</div>
                  <div style={{ fontSize: 12, color: c.textDim }}>You don&apos;t have any upcoming exams matching this filter.</div>
                </div>
              ) : (
                filtered.map((exam, i) => (
                  <div key={exam.id} onClick={() => onOpenExam(exam)}
                    style={{ display: "flex", gap: 16, alignItems: "center", padding: "16px 20px", borderBottom: i < filtered.length - 1 ? `1px solid ${c.border}` : "none", cursor: "pointer", transition: "background 0.13s" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = c.surface2)}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                  >
                    <div style={{ width: 4, height: 48, borderRadius: 2, background: exam.color, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: exam.status === "cancelled" ? c.textDim : c.text }}>{exam.title}</span>
                        <TypeBadge type={exam.type} />
                        <StatusPill status={exam.status} />
                      </div>
                      <div style={{ fontSize: 12, color: c.textMuted, marginBottom: 2 }}>{exam.course} · {exam.code} · {exam.instructor}</div>
                      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 11, color: c.textDim, display: "flex", alignItems: "center", gap: 4 }}>
                          <Ic n="calendar" size={10} color={c.textDim} /> {exam.date}
                        </span>
                        <span style={{ fontSize: 11, color: c.textDim, display: "flex", alignItems: "center", gap: 4 }}>
                          <Ic n="clock" size={10} color={c.textDim} /> {exam.time}
                        </span>
                        <span style={{ fontSize: 11, color: c.textDim, display: "flex", alignItems: "center", gap: 4 }}>
                          <Ic n="map" size={10} color={c.textDim} /> Room {exam.room}
                        </span>
                        {exam.rescheduledFrom && (
                          <span style={{ fontSize: 11, color: "#8B5CF6", fontWeight: 600 }}>Moved from {exam.rescheduledFrom}</span>
                        )}
                      </div>
                    </div>
                    {exam.status !== "completed" && exam.status !== "cancelled" && (
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 18, color: exam.color, lineHeight: 1 }}>{exam.daysLeft}</div>
                        <div style={{ fontSize: 10, color: c.textDim }}>days</div>
                      </div>
                    )}
                    <Ic n="chevR" size={16} color={c.textDim} />
                  </div>
                ))
              )}
            </div>

            {/* Academic Deadlines */}
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 12 }}>Academic Deadlines</div>
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, overflow: "hidden", boxShadow: c.cardShadow }}>
              {DEADLINES.map((dl, i) => (
                <div key={dl.id} style={{ display: "flex", gap: 14, alignItems: "center", padding: "13px 20px", borderBottom: i < DEADLINES.length - 1 ? `1px solid ${c.border}` : "none", cursor: "pointer", transition: "background 0.13s" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = c.surface2)}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}
                >
                  <div style={{ width: 3, height: 32, borderRadius: 2, background: dl.color, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{dl.title}</div>
                    <div style={{ fontSize: 11, color: c.textDim }}>{dl.course} · {dl.code}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: c.textMuted, flexShrink: 0 }}>{dl.date}</span>
                  <span style={{ padding: "2px 8px", borderRadius: 6, fontSize: 10, fontWeight: 700, color: c.textDim, background: c.surface2, border: `1px solid ${c.border}`, flexShrink: 0, whiteSpace: "nowrap" }}>{dl.type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Timeline */}
          <div>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 12 }}>Upcoming Timeline</div>
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "20px 22px", boxShadow: c.cardShadow }}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 13, top: 8, bottom: 0, width: 1, background: c.border }} />
                {TIMELINE.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, marginBottom: 18 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 9, background: `${item.color}14`, border: `1px solid ${item.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color }} />
                    </div>
                    <div style={{ paddingTop: 4, flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>{item.date}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: c.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: c.textDim, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.course}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── EXAM DETAIL PAGE ─────────────────────────────────────────────────────────────
function ExamDetail({ exam, onBack }: { exam: Exam; onBack: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [reminderSet, setReminderSet] = useState(false);
  const [reminderTime, setReminderTime] = useState("1 hour before");

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>

        {/* Back */}
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: c.textMuted, cursor: "pointer", fontFamily: "Inter", fontSize: 12, fontWeight: 600, marginBottom: 20, padding: 0 }}>
          <Ic n="arrowL" size={14} color={c.textMuted} /> Back to Exams & Deadlines
        </button>

        {/* Header card */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, padding: "24px 28px", boxShadow: c.cardShadow, marginBottom: 20 }}>
          {exam.status === "rescheduled" && (
            <div style={{ marginBottom: 14, padding: "10px 14px", background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.25)", borderRadius: 10, display: "flex", gap: 8, alignItems: "center" }}>
              <Ic n="alert" size={14} color="#8B5CF6" />
              <span style={{ fontSize: 12, color: "#8B5CF6", fontWeight: 600 }}>Exam Rescheduled — Originally: {exam.rescheduledFrom} · New: {exam.date}</span>
            </div>
          )}
          {exam.status === "cancelled" && (
            <div style={{ marginBottom: 14, padding: "12px 16px", background: "rgba(148,163,184,0.06)", border: "1px solid rgba(148,163,184,0.25)", borderRadius: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: c.textMuted, marginBottom: 3 }}>Exam Cancelled</div>
              <div style={{ fontSize: 12, color: c.textDim }}>Exam postponed due to university closure. New exam date will be announced.</div>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                <span style={{ padding: "2px 9px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: `${exam.color}12`, color: exam.color, border: `1px solid ${exam.color}30` }}>{exam.code}</span>
                <TypeBadge type={exam.type} />
                <StatusPill status={exam.status} />
              </div>
              <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: c.text, letterSpacing: "-0.01em", marginBottom: 6 }}>{exam.title}</h1>
              <div style={{ fontSize: 13, color: c.textMuted }}>{exam.course} · {exam.instructor}</div>
            </div>
            {exam.status !== "cancelled" && (
              <button onClick={() => setReminderSet(false)}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                <Ic n="bell" size={14} color={c.textMuted} /> Add Reminder
              </button>
            )}
          </div>

          {/* Meta strip */}
          <div style={{ display: "flex", gap: 24, marginTop: 22, paddingTop: 18, borderTop: `1px solid ${c.border}`, flexWrap: "wrap" }}>
            {[
              { label: "Date",       val: exam.date },
              { label: "Time",       val: exam.time },
              { label: "Room",       val: exam.room },
              { label: "Building",   val: exam.building },
              { label: "Instructor", val: exam.instructor },
              { label: "Section",    val: "B" },
              { label: "Semester",   val: "Spring 2026" },
              ...(exam.status === "upcoming" && exam.daysLeft > 0 ? [{ label: "Days Left", val: `${exam.daysLeft} Days` }] : []),
            ].map(m => (
              <div key={m.label}>
                <div style={{ fontSize: 10, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>{m.label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: m.label === "Days Left" ? exam.color : c.text }}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, alignItems: "flex-start" }}>
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Syllabus */}
            {exam.syllabus && (
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
                <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>Exam Syllabus</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {exam.syllabus.map((topic, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ width: 22, height: 22, borderRadius: 7, background: `${exam.color}12`, border: `1px solid ${exam.color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 10, fontWeight: 700, color: exam.color }}>{i + 1}</div>
                      <span style={{ fontSize: 13, color: c.textMuted }}>{topic}</span>
                    </div>
                  ))}
                </div>
                <button style={{ marginTop: 16, fontSize: 12, fontWeight: 600, color: c.primary, background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 4 }}>
                  View Course Materials <Ic n="chevR" size={12} color={c.primary} />
                </button>
              </div>
            )}

            {/* Instructions */}
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>Exam Instructions</div>
              {[
                "Arrive 15 minutes before the exam begins.",
                "Bring your university student ID card.",
                "Bring necessary stationery (pens, pencils, calculator if allowed).",
                "Electronic devices are not allowed unless explicitly permitted by the instructor.",
              ].map((inst, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: c.textDim, flexShrink: 0, marginTop: 6 }} />
                  <span style={{ fontSize: 13, color: c.textMuted, lineHeight: 1.6 }}>{inst}</span>
                </div>
              ))}
            </div>

            {/* Related materials */}
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>Related Materials</div>
              {[
                { name: "Lecture Notes",       ext: "PDF",  icon: "#EF4444" },
                { name: "Revision Slides",     ext: "PPTX", icon: "#F59E0B" },
                { name: "Practice Questions",  ext: "PDF",  icon: "#EF4444" },
              ].map((mat, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "11px 14px", background: c.surface2, borderRadius: 11, border: `1px solid ${c.border}`, marginBottom: 8 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${mat.icon}10`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Ic n="file" size={16} color={mat.icon} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 2 }}>{mat.name}</div>
                    <div style={{ fontSize: 11, color: c.textDim }}>{mat.ext}</div>
                  </div>
                  <button style={{ fontSize: 12, fontWeight: 600, color: c.primary, background: "none", border: "none", cursor: "pointer" }}>View</button>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Countdown */}
            {exam.status === "upcoming" && exam.daysLeft > 0 && (
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: c.cardShadow, textAlign: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Time Remaining</div>
                <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 36, color: exam.color, lineHeight: 1, marginBottom: 4 }}>{exam.daysLeft}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: c.textMuted, marginBottom: 16 }}>Days</div>
                <div style={{ height: 6, borderRadius: 3, background: c.surface2, overflow: "hidden", marginBottom: 12 }}>
                  <div style={{ height: "100%", width: `${Math.max(5, 100 - exam.daysLeft * 2)}%`, background: exam.color, borderRadius: 3, transition: "width 0.3s" }} />
                </div>
                <div style={{ fontSize: 11, color: c.textDim }}>{exam.date} · {exam.timeStart}</div>
              </div>
            )}

            {/* Reminder */}
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: c.cardShadow }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 12 }}>Exam Reminder</div>
              {reminderSet ? (
                <div style={{ padding: "12px 14px", background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 10, display: "flex", gap: 8, alignItems: "center" }}>
                  <Ic n="check" size={14} color="#10B981" />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#10B981" }}>Reminder Set</div>
                    <div style={{ fontSize: 11, color: c.textDim }}>You&apos;ll be notified {reminderTime}.</div>
                  </div>
                </div>
              ) : (
                <>
                  <select value={reminderTime} onChange={e => setReminderTime(e.target.value)}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 12, cursor: "pointer", outline: "none", marginBottom: 12 }}>
                    {["1 day before","12 hours before","1 hour before","30 minutes before"].map(o => <option key={o}>{o}</option>)}
                  </select>
                  <button onClick={() => setReminderSet(true)} style={{ width: "100%", padding: "8px 0", borderRadius: 9, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    <Ic n="bell" size={13} color="#fff" /> Set Reminder
                  </button>
                </>
              )}
            </div>

            {/* Location */}
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: c.cardShadow }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 12 }}>Exam Location</div>
              <div style={{ background: c.surface2, borderRadius: 12, padding: "16px", textAlign: "center", marginBottom: 12, border: `1px solid ${c.border}` }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>🏫</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: c.text, fontFamily: "Manrope" }}>Room {exam.room}</div>
                <div style={{ fontSize: 12, color: c.textDim }}>{exam.building}</div>
              </div>
              <button style={{ width: "100%", padding: "7px 0", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <Ic n="map" size={12} color={c.textMuted} /> View Campus Location
              </button>
            </div>

            {/* Course link */}
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: c.cardShadow }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 12 }}>Course</div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${exam.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Ic n="book" size={17} color={exam.color} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: c.text }}>{exam.course}</div>
                  <div style={{ fontSize: 11, color: c.textDim }}>{exam.code} · {exam.instructor}</div>
                </div>
              </div>
              <button style={{ width: "100%", padding: "7px 0", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                View Course <Ic n="chevR" size={12} color={c.textMuted} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT EXPORT ──────────────────────────────────────────────────────────────────
type ExamsView = "list" | "detail" | "calendar";

export default function ExamsPage() {
  const [view, setView] = useState<ExamsView>("list");
  const [selected, setSelected] = useState<Exam | null>(null);

  if (view === "calendar") return <ExamCalendar onSelectExam={e => { setSelected(e); setView("detail"); }} />;
  if (view === "detail" && selected) return <ExamDetail exam={selected} onBack={() => setView("list")} />;
  return (
    <ExamsList
      onOpenExam={e => { setSelected(e); setView("detail"); }}
      onCalendar={() => setView("calendar")}
    />
  );
}
