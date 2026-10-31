"use client";
import RoutineView,{RoutineEditor,TodayRoutine} from "@/components/ui/RoutineView";
import {useRoutine,useRoutineClock} from "@/lib/routine";
import AssignmentsView from "@/app/assignments/AssignmentsView";
import AssignmentEditor from "@/components/ui/AssignmentEditor";
import MaterialUpload from "@/components/ui/MaterialUpload";
import { useMaterials } from "@/lib/materials";
import MaterialsPage from "@/app/materials/page";
import { useState, useRef, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { useClassUpdates, useClassUpdatesState, postClassUpdate, editClassUpdate, deleteClassUpdate } from "@/lib/class-updates";
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
  highlight: "#EFF6FF",
  overlay: "rgba(15,23,42,0.4)",
  sidebar: "#FFFFFF",
};
const DARK = {
  bg: "#080D1A", surface: "#0F172A", surface2: "#172033", surface3: "#1E293B",
  primary: "#3B82F6", primaryDark: "#2563EB",
  text: "#F8FAFC", textMuted: "#94A3B8", textDim: "#475569",
  border: "#1E293B",
  cardShadow: "0 1px 4px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.18)",
  primaryGlow: "rgba(59,130,246,0.2)",
  activeNav: { bg: "rgba(59,130,246,0.14)", text: "#60A5FA", border: "rgba(59,130,246,0.22)" },
  highlight: "rgba(37,99,246,0.08)",
  overlay: "rgba(0,0,0,0.6)",
  sidebar: "#0F172A",
};
const tok = (t: Theme) => t === "light" ? LIGHT : DARK;

// ─── ICON PATHS ──────────────────────────────────────────────────────────────────
const P: Record<string, string[]> = {
  home: ["M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M9 22V12h6v10"],
  bell: ["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0"],
  book: ["M4 19.5A2.5 2.5 0 0 1 6.5 17H20", "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"],
  calendar: ["M8 2v4M16 2v4M3 10h18", "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"],
  clipboard: ["M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2", "M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2 2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2z"],
  folder: ["M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"],
  award: ["M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z", "M8.21 13.89L7 23l5-3 5 3-1.21-9.12"],
  megaphone: ["M3 11v2M5 9v6M19 10v4", "M18 8H7a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h11l4 4V4l-4 4z"],
  event: ["M12 2L2 7l10 5 10-5-10-5z", "M2 17l10 5 10-5", "M2 12l10 5 10-5"],
  users: ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75", "M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"],
  search: ["M21 21l-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z"],
  settings: ["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"],
  user: ["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  help: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", "M12 17h.01"],
  sun: ["M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42", "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"],
  moon: ["M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"],
  arrow: ["M5 12h14M12 5l7 7-7 7"],
  x: ["M18 6L6 18M6 6l12 12"],
  plus: ["M12 5v14M5 12h14"],
  check: ["M20 6L9 17l-5-5"],
  alert: ["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z", "M12 9v4M12 17h.01"],
  upload: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M17 8l-5-5-5 5", "M12 3v12"],
  edit: ["M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"],
  clock: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M12 6v6l4 2"],
  map: ["M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z", "M12 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"],
  shield: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
  menu: ["M3 6h18M3 12h18M3 18h18"],
  link: ["M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"],
  trash: ["M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"],
  download: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M7 10l5 5 5-5", "M12 15V3"],
  eye: ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"],
};

function Ic({ n, size = 16, color = "currentColor" }: { n: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      {(P[n] ?? []).map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

// ─── CR NAV ──────────────────────────────────────────────────────────────────────
type NavItem = { id: string; label: string; icon: string; badge?: number };
type NavGroup = { group: string; items: NavItem[] };
const CR_NAV: NavGroup[] = [
  { group: "OVERVIEW", items: [{ id: "dashboard", label: "Dashboard", icon: "home" }, { id: "notifications", label: "Notifications", icon: "bell", badge: 5 }] },
  { group: "ACADEMIC", items: [{ id: "routine", label: "Routine", icon: "calendar" }, { id: "materials", label: "Class Materials", icon: "folder" }, { id: "assignments", label: "Assignments", icon: "clipboard" }, { id: "exams", label: "Exams", icon: "award" }] },
  { group: "CLASS MANAGEMENT", items: [{ id: "classupdates", label: "Class Updates", icon: "alert" }] },
  { group: "CAMPUS", items: [{ id: "events", label: "Events", icon: "event" }] },
];

// ─── REUSABLE BUTTONS ─────────────────────────────────────────────────────────────
function PrimaryBtn({ children, onClick, small, icon }: { children: React.ReactNode; onClick?: () => void; small?: boolean; icon?: string }) {
  const { theme } = useTheme();
  const c = tok(theme);
  const [hov, setHov] = useState(false);
  return (
    <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onClick}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, background: hov ? c.primaryDark : c.primary, color: "#fff", border: "none", padding: small ? "6px 14px" : "9px 18px", borderRadius: 9, fontFamily: "Inter", fontSize: small ? 12 : 13, fontWeight: 600, cursor: "pointer", transition: "all 0.16s ease", boxShadow: hov ? `0 4px 14px ${c.primaryGlow}` : "none" }}>
      {icon && <Ic n={icon} size={13} color="#fff" />}{children}
    </button>
  );
}

function GhostBtn({ children, onClick, small, icon, active }: { children: React.ReactNode; onClick?: () => void; small?: boolean; icon?: string; active?: boolean }) {
  const { theme } = useTheme();
  const c = tok(theme);
  const [hov, setHov] = useState(false);
  return (
    <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onClick}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, background: active ? c.activeNav.bg : hov ? c.surface2 : "transparent", color: active ? c.primary : hov ? c.text : c.textMuted, border: `1px solid ${active ? "rgba(37,99,235,0.2)" : c.border}`, padding: small ? "5px 12px" : "8px 16px", borderRadius: 9, fontFamily: "Inter", fontSize: small ? 12 : 13, fontWeight: active ? 600 : 500, cursor: "pointer", transition: "all 0.16s ease" }}>
      {icon && <Ic n={icon} size={13} color="currentColor" />}{children}
    </button>
  );
}

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────────
type Status = "published" | "draft" | "pending" | "archived";
function StatusBadge({ status }: { status: Status }) {
  const cfg: Record<Status, { label: string; color: string; bg: string; border: string }> = {
    published: { label: "Published", color: "#10B981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)" },
    draft: { label: "Draft", color: "#94A3B8", bg: "rgba(148,163,184,0.08)", border: "rgba(148,163,184,0.2)" },
    pending: { label: "Pending Approval", color: "#F59E0B", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)" },
    archived: { label: "Archived", color: "#64748B", bg: "rgba(100,116,139,0.08)", border: "rgba(100,116,139,0.2)" },
  };
  const s = cfg[status];
  return (
    <span style={{ padding: "2px 9px", borderRadius: 999, fontSize: 10, fontWeight: 700, color: s.color, background: s.bg, border: `1px solid ${s.border}`, whiteSpace: "nowrap" }}>{s.label}</span>
  );
}

// ─── CR SIDEBAR ──────────────────────────────────────────────────────────────────
function CRSidebar({ active, setActive, onClose }: { active: string; setActive: (id: string) => void; onClose?: () => void }) {
  const { theme } = useTheme();
  const c = tok(theme);
  return (
    <div style={{ width: 236, height: "100%", background: c.sidebar, borderRight: `1px solid ${c.border}`, display: "flex", flexDirection: "column", overflowY: "auto" }}>
      {/* Brand */}
      <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${c.border}`, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: `linear-gradient(135deg, ${c.primary}, #38BDF8)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 14, color: c.text, lineHeight: 1 }}>UniLink</div>
          <div style={{ fontSize: 10, fontWeight: 600, color: c.primary, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}>
            <Ic n="shield" size={10} color={c.primary} /> CR Portal
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer" }}>
            <Ic n="x" size={16} color={c.textDim} />
          </button>
        )}
      </div>

      {/* Nav */}
      <div style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
        {CR_NAV.map((group) => (
          <div key={group.group} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: c.textDim, letterSpacing: "0.07em", padding: "0 10px", marginBottom: 6 }}>{group.group}</div>
            {group.items.map((item) => {
              const isActive = active === item.id;
              return (
                <button key={item.id} onClick={() => { setActive(item.id); onClose?.(); }}
                  style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "8px 10px", borderRadius: 9, border: `1px solid ${isActive ? c.activeNav.border : "transparent"}`, background: isActive ? c.activeNav.bg : "transparent", color: isActive ? c.activeNav.text : c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: isActive ? 600 : 500, cursor: "pointer", textAlign: "left", transition: "all 0.15s ease", marginBottom: 1 }}
                  onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = c.surface2; }}
                  onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <Ic n={item.icon} size={15} color={isActive ? c.activeNav.text : c.textDim} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && (
                    <span style={{ padding: "1px 6px", borderRadius: 999, fontSize: 10, fontWeight: 700, background: c.primary + "18", color: c.primary, border: `1px solid ${c.primary}22` }}>{item.badge}</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* CR profile */}
      <div style={{ padding: "14px 16px", borderTop: `1px solid ${c.border}`, display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${c.primary}, #38BDF8)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 15, fontWeight: 700, color: "#fff", fontFamily: "Manrope" }}>O</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Ovi</div>
          <div style={{ fontSize: 11, color: c.textDim }}>CR · CSE 52-B</div>
        </div>
        <Ic n="shield" size={14} color={c.primary} />
      </div>
    </div>
  );
}

// ─── CR HEADER ───────────────────────────────────────────────────────────────────
function CRHeader({ onMenuClick, onBack }: { onMenuClick: () => void; onBack: () => void }) {
  const { theme, toggle } = useTheme();
  const c = tok(theme);
  const [searchOpen, setSearchOpen] = useState(false);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div style={{ background: c.surface, borderBottom: `1px solid ${c.border}`, padding: "0 24px", height: 60, display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 30 }}>
      {/* Mobile menu */}
      <button className="mobile-menu-btn" onClick={onMenuClick} style={{ background: "none", border: "none", cursor: "pointer", display: "none" }}>
        <Ic n="menu" size={20} color={c.textMuted} />
      </button>

      {/* Greeting */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{greeting}, Ovi 👋</div>
        <div style={{ fontSize: 11, color: c.textDim, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Manage academic information and updates for your section.</div>
      </div>

      {/* Search */}
      {searchOpen ? (
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <Ic n="search" size={14} color={c.textDim} />
          <input autoFocus onBlur={() => setSearchOpen(false)} placeholder="Search..."
            style={{ marginLeft: 8, background: "none", border: "none", outline: "none", fontFamily: "Inter", fontSize: 13, color: c.text, width: 160 }} />
        </div>
      ) : (
        <button onClick={() => setSearchOpen(true)} style={{ background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 9, padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          <Ic n="search" size={14} color={c.textDim} />
          <span style={{ fontSize: 12, color: c.textDim, fontFamily: "Inter" }}>Search…</span>
        </button>
      )}

      {/* Bell */}
      <button style={{ position: "relative", background: "none", border: "none", cursor: "pointer", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 9, transition: "background 0.14s" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = c.surface2)}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "none")}
      >
        <Ic n="bell" size={18} color={c.textMuted} />
        <div style={{ position: "absolute", top: 7, right: 7, width: 8, height: 8, borderRadius: "50%", background: "#EF4444", border: `2px solid ${c.surface}` }} />
      </button>

      {/* Theme toggle */}
      <button onClick={toggle} style={{ background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 9, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.16s" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = c.surface3)}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = c.surface2)}
      >
        <Ic n={theme === "light" ? "moon" : "sun"} size={15} color={c.textMuted} />
      </button>

      {/* Avatar */}
      <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${c.primary}, #38BDF8)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: "#fff", cursor: "pointer" }}>O</div>

      {/* Back to student portal */}
      <button onClick={onBack} style={{ background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 9, padding: "6px 12px", fontSize: 12, fontWeight: 600, color: c.textMuted, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "Inter", whiteSpace: "nowrap" }}>
        ← Student Portal
      </button>
    </div>
  );
}

// ─── MODALS ───────────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children, wide }: { title: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  const { theme } = useTheme();
  const c = tok(theme);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: c.overlay, backdropFilter: "blur(6px)" }} />
      <div onClick={(e) => e.stopPropagation()}
        style={{ position: "relative", background: c.surface, border: `1px solid ${c.border}`, borderRadius: 22, padding: "28px 30px", width: "100%", maxWidth: wide ? 580 : 460, boxShadow: "0 20px 60px rgba(0,0,0,0.2)", animation: "fade-up 0.2s ease both", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 18, color: c.text, margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Ic n="x" size={14} color={c.textDim} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  const { theme } = useTheme();
  const c = tok(theme);
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: c.text, marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

function FieldInput({ placeholder, value, onChange, type }: { placeholder?: string; value?: string; onChange?: (v: string) => void; type?: string }) {
  const { theme } = useTheme();
  const c = tok(theme);
  return (
    <input type={type ?? "text"} placeholder={placeholder} value={value} onChange={(e) => onChange?.(e.target.value)}
      style={{ width: "100%", padding: "9px 12px", background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 9, fontFamily: "Inter", fontSize: 13, color: c.text, outline: "none", boxSizing: "border-box", transition: "border-color 0.14s" }}
      onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = c.primary)}
      onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = c.border)}
    />
  );
}

function FieldSelect({ children, value, onChange }: { children: React.ReactNode; value?: string; onChange?: (v: string) => void }) {
  const { theme } = useTheme();
  const c = tok(theme);
  return (
    <select value={value} onChange={(e) => onChange?.(e.target.value)}
      style={{ width: "100%", padding: "9px 12px", background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 9, fontFamily: "Inter", fontSize: 13, color: c.text, outline: "none", cursor: "pointer" }}>
      {children}
    </select>
  );
}

function FieldTextarea({ placeholder, rows }: { placeholder?: string; rows?: number }) {
  const { theme } = useTheme();
  const c = tok(theme);
  return (
    <textarea placeholder={placeholder} rows={rows ?? 3}
      style={{ width: "100%", padding: "9px 12px", background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 9, fontFamily: "Inter", fontSize: 13, color: c.text, outline: "none", resize: "vertical", boxSizing: "border-box", transition: "border-color 0.14s" }}
      onFocus={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = c.primary)}
      onBlur={(e) => ((e.target as HTMLTextAreaElement).style.borderColor = c.border)}
    />
  );
}

// Upload Material Modal
function UploadMaterialModal({ onClose }: { onClose: () => void }) {
  return <MaterialUpload onClose={onClose} />;
}

// Create Assignment Modal
function CreateAssignmentModal({onClose}:{onClose:()=>void}){return <AssignmentEditor onClose={onClose}/>;}

// Create Announcement Modal
function CreateAnnouncementModal({ onClose }: { onClose: () => void }) {
  const { theme } = useTheme();
  const c = tok(theme);
  const [category, setCategory] = useState("Academic");
  return (
    <Modal title="Post Announcement" onClose={onClose} wide>
      <FormField label="Title"><FieldInput placeholder="e.g. Midterm syllabus updated" /></FormField>
      <FormField label="Message"><FieldTextarea placeholder="Write your announcement…" rows={4} /></FormField>
      <FormField label="Category">
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["Academic", "Schedule", "Exam", "Important", "General"].map((cat) => {
            const active = category === cat;
            return (
              <button key={cat} onClick={() => setCategory(cat)} style={{ padding: "5px 13px", borderRadius: 999, fontSize: 12, fontWeight: active ? 700 : 500, background: active ? `${c.primary}12` : c.surface2, color: active ? c.primary : c.textMuted, border: `1px solid ${active ? c.primary + "30" : c.border}`, cursor: "pointer", transition: "all 0.14s" }}>
                {cat}
              </button>
            );
          })}
        </div>
      </FormField>
      <FormField label="Attachment (optional)"><FieldInput placeholder="Upload file or paste link…" /></FormField>
      <FormField label="Target Audience">
        <div style={{ display: "flex", gap: 8 }}>
          {["CSE", "Batch 52", "Section B"].map((t) => {
            return <span key={t} style={{ padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600, background: `${c.primary}12`, color: c.primary, border: `1px solid ${c.primary}25` }}>{t}</span>;
          })}
        </div>
      </FormField>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", paddingTop: 8 }}>
        <GhostBtn onClick={onClose}>Save Draft</GhostBtn>
        <PrimaryBtn icon="megaphone" onClick={onClose}>Publish Now</PrimaryBtn>
      </div>
    </Modal>
  );
}

// Update Routine Modal
function UpdateRoutineModal({onClose}:{onClose:()=>void}){return <RoutineEditor onClose={onClose}/>;}

// Add Exam Modal
function AddExamModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="Add Exam" onClose={onClose}>
      <FormField label="Course">
        <FieldSelect>
          {["Database Management", "Algorithms", "Software Engineering", "Computer Networks", "Artificial Intelligence", "Operating Systems"].map(n => <option key={n}>{n}</option>)}
        </FieldSelect>
      </FormField>
      <FormField label="Exam Type">
        <FieldSelect>
          {["Quiz", "Midterm", "Final", "Lab Exam"].map(t => <option key={t}>{t}</option>)}
        </FieldSelect>
      </FormField>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <FormField label="Date"><FieldInput type="date" /></FormField>
        <FormField label="Time"><FieldInput type="time" /></FormField>
        <FormField label="Room"><FieldInput placeholder="502" /></FormField>
        <FormField label="Duration"><FieldInput placeholder="1.5 hours" /></FormField>
      </div>
      <FormField label="Syllabus"><FieldTextarea placeholder="Topics covered in this exam…" rows={2} /></FormField>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", paddingTop: 8 }}>
        <GhostBtn onClick={onClose}>Save Draft</GhostBtn>
        <PrimaryBtn icon="award" onClick={onClose}>Publish Exam</PrimaryBtn>
      </div>
    </Modal>
  );
}

// Create Event Modal
function CreateEventModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal title="Create Event" onClose={onClose}>
      <FormField label="Event Title"><FieldInput placeholder="e.g. AI Workshop" /></FormField>
      <FormField label="Description"><FieldTextarea placeholder="Event details…" rows={3} /></FormField>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <FormField label="Date"><FieldInput type="date" /></FormField>
        <FormField label="Time"><FieldInput type="time" /></FormField>
        <FormField label="Venue"><FieldInput placeholder="CSE Auditorium" /></FormField>
        <FormField label="Organizer"><FieldInput placeholder="CSE 52-B" /></FormField>
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", paddingTop: 8 }}>
        <GhostBtn onClick={onClose}>Save Draft</GhostBtn>
        <PrimaryBtn icon="event" onClick={onClose}>Publish Event</PrimaryBtn>
      </div>
    </Modal>
  );
}

// ─── CR DASHBOARD HOME ────────────────────────────────────────────────────────────

type UpdateType = "Class Delayed" | "Class Cancelled" | "Room Changed" | "Extra Class" | "Schedule Changed" | "General Class Information";

function PostClassUpdateModal({ onClose }: { onClose: () => void }) {
  const { theme } = useTheme();
  const c = tok(theme);
  const [updateType, setUpdateType] = useState<UpdateType>("Class Delayed");
  const [course, setCourse] = useState("CSE 305");
  const [prevTime, setPrevTime] = useState("10:00 AM");
  const [newTime, setNewTime] = useState("11:00 AM");
  const [prevRoom, setPrevRoom] = useState("402");
  const [newRoom, setNewRoom] = useState("405");
  const [extraDay, setExtraDay] = useState("Thursday");
  const [extraTime, setExtraTime] = useState("2:00 PM");
  const [note, setNote] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [posting, setPosting] = useState(false);
  const postingRef = useRef(false);
  const [requestId] = useState(() => crypto.randomUUID());
  async function handlePost() {
    if (postingRef.current) return;
    const detail = updateType === "Class Delayed" ? `${prevTime.trim()} → ${newTime.trim()}`
      : updateType === "Room Changed" ? `Room ${prevRoom.trim()} → ${newRoom.trim()}`
      : updateType === "Extra Class" ? `${extraDay.trim()} · ${extraTime.trim()}`
      : updateType === "Class Cancelled" ? "Class cancelled" : note.trim();
    if ((updateType === "Class Delayed" && (!prevTime.trim() || !newTime.trim())) ||
        (updateType === "Room Changed" && (!prevRoom.trim() || !newRoom.trim())) ||
        (updateType === "Extra Class" && (!extraDay.trim() || !extraTime.trim())) || !detail) {
      setError("Please fill in the update details. For schedule changes, describe the new schedule in the note.");
      return;
    }
    try {
      postingRef.current = true;
      setPosting(true);
      await postClassUpdate({ code: course, type: updateType, detail,
        note: detail === note.trim() ? "" : note.trim() }, requestId);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save the update.");
    } finally { postingRef.current = false; setPosting(false); }
  }

  const courses = ["CSE 305", "CSE 307", "CSE 301", "CSE 310", "CSE 303"];
  const updateTypes: UpdateType[] = ["Class Delayed", "Class Cancelled", "Room Changed", "Extra Class", "Schedule Changed", "General Class Information"];

  const inp: React.CSSProperties = { width: "100%", padding: "9px 12px", borderRadius: 9, border: `1px solid ${c.border}`, background: c.surface2, color: c.text, fontSize: 13, fontFamily: "Inter", outline: "none", boxSizing: "border-box" };
  const sel: React.CSSProperties = { ...inp, cursor: "pointer" };

  if (done) return (
    <div style={{ position: "fixed", inset: 0, background: c.overlay, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: c.surface, borderRadius: 20, padding: "40px 36px", maxWidth: 400, width: "90%", textAlign: "center", boxShadow: c.cardShadow }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(16,185,129,0.1)", border: "2px solid rgba(16,185,129,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <Ic n="check" size={24} color="#10B981" />
        </div>
        <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 18, color: c.text, marginBottom: 8 }}>Update Published</div>
        <div style={{ fontSize: 13, color: c.textDim, marginBottom: 6 }}>{course} — {updateType}</div>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", alignItems: "center", marginBottom: 24 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#8B5CF6", background: "rgba(139,92,246,0.08)", padding: "2px 9px", borderRadius: 999, border: "1px solid rgba(139,92,246,0.2)" }}>Posted by CR</span>
          <span style={{ fontSize: 11, color: c.textDim }}>→ Your registered class</span>
        </div>
        <button onClick={onClose} style={{ padding: "9px 28px", borderRadius: 10, background: c.primary, color: "#fff", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Done</button>
      </div>
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: c.overlay, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: c.surface, borderRadius: 20, padding: "28px 30px", maxWidth: 520, width: "95%", boxShadow: c.cardShadow, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <div>
            <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 17, color: c.text }}>Post Class Update</div>
            <div style={{ fontSize: 12, color: c.textDim, marginTop: 2 }}>Inform your section about a class change</div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${c.border}`, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ic n="x" size={15} color={c.textDim} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, marginBottom: 6 }}>Update Type</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {updateTypes.map((t) => (
                <button key={t} onClick={() => setUpdateType(t)} style={{ padding: "8px 12px", borderRadius: 9, border: `1px solid ${updateType === t ? c.primary + "50" : c.border}`, background: updateType === t ? `${c.primary}10` : c.surface2, color: updateType === t ? c.primary : c.textMuted, fontSize: 12, fontWeight: updateType === t ? 700 : 500, cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>{t}</button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, marginBottom: 6 }}>Course</div>
            <select value={course} onChange={e => setCourse(e.target.value)} style={sel}>
              {courses.map(co => <option key={co}>{co}</option>)}
            </select>
          </div>

          {updateType === "Class Delayed" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, marginBottom: 6 }}>Previous Time</div>
                <input value={prevTime} onChange={e => setPrevTime(e.target.value)} style={inp} placeholder="e.g. 10:00 AM" />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, marginBottom: 6 }}>New Time</div>
                <input value={newTime} onChange={e => setNewTime(e.target.value)} style={inp} placeholder="e.g. 11:00 AM" />
              </div>
            </div>
          )}

          {updateType === "Room Changed" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, marginBottom: 6 }}>Previous Room</div>
                <input value={prevRoom} onChange={e => setPrevRoom(e.target.value)} style={inp} placeholder="e.g. 402" />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, marginBottom: 6 }}>New Room</div>
                <input value={newRoom} onChange={e => setNewRoom(e.target.value)} style={inp} placeholder="e.g. 405" />
              </div>
            </div>
          )}

          {updateType === "Extra Class" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, marginBottom: 6 }}>Day</div>
                <input value={extraDay} onChange={e => setExtraDay(e.target.value)} style={inp} placeholder="e.g. Thursday" />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, marginBottom: 6 }}>Time</div>
                <input value={extraTime} onChange={e => setExtraTime(e.target.value)} style={inp} placeholder="e.g. 2:00 PM" />
              </div>
            </div>
          )}

          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, marginBottom: 6 }}>Additional Note <span style={{ fontWeight: 400, color: c.textDim }}>(optional)</span></div>
            <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} style={{ ...inp, resize: "vertical" }} placeholder="Any extra information for your section..." />
          </div>

          {error && <p role="alert" style={{ color: "#EF4444" }}>{error}</p>}
          <p style={{ fontSize: 12, color: c.textMuted }}>Demo: saves in this browser only. Other users will not receive this update yet.</p>
          {/* Locked audience */}
          <div style={{ padding: "12px 14px", borderRadius: 12, background: `${c.primary}08`, border: `1px solid ${c.primary}20` }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
              <Ic n="shield" size={13} color={c.primary} />
              <span style={{ fontSize: 12, fontWeight: 700, color: c.primary }}>Target Audience · Automatically Assigned</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["CSE", "Batch 52", "Section B"].map(chip => (
                <span key={chip} style={{ padding: "2px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, background: `${c.primary}12`, color: c.primary, border: `1px solid ${c.primary}25` }}>{chip}</span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 4 }}>
            <GhostBtn onClick={onClose}>Cancel</GhostBtn>
            <PrimaryBtn icon="megaphone" onClick={handlePost}>{posting ? "Saving…" : "Post Update"}</PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShareEventModal({ eventTitle, onClose }: { eventTitle: string; onClose: () => void }) {
  const { theme } = useTheme();
  const c = tok(theme);
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);

  const inp: React.CSSProperties = { width: "100%", padding: "9px 12px", borderRadius: 9, border: `1px solid ${c.border}`, background: c.surface2, color: c.text, fontSize: 13, fontFamily: "Inter", outline: "none", boxSizing: "border-box", resize: "vertical" };

  if (done) return (
    <div style={{ position: "fixed", inset: 0, background: c.overlay, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: c.surface, borderRadius: 20, padding: "40px 36px", maxWidth: 380, width: "90%", textAlign: "center", boxShadow: c.cardShadow }}>
        <div style={{ fontSize: 36, marginBottom: 14 }}>🎉</div>
        <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 18, color: c.text, marginBottom: 8 }}>Event Shared!</div>
        <div style={{ fontSize: 13, color: c.textDim, marginBottom: 20 }}><strong>{eventTitle}</strong> has been shared with your section.</div>
        <div style={{ fontSize: 11, color: c.textDim, marginBottom: 24 }}>Students will see &quot;Shared by CR&quot; on this event in their dashboard.</div>
        <button onClick={onClose} style={{ padding: "9px 28px", borderRadius: 10, background: c.primary, color: "#fff", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Done</button>
      </div>
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: c.overlay, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: c.surface, borderRadius: 20, padding: "28px 30px", maxWidth: 460, width: "95%", boxShadow: c.cardShadow }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 17, color: c.text }}>Share with Section</div>
            <div style={{ fontSize: 12, color: c.textDim, marginTop: 2 }}>{eventTitle}</div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${c.border}`, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ic n="x" size={15} color={c.textDim} />
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, marginBottom: 6 }}>Optional Message</div>
            <textarea value={msg} onChange={e => setMsg(e.target.value)} rows={3} style={inp} placeholder="e.g. Registration is now open. Interested students can register before Sep 10." />
          </div>
          <div style={{ padding: "11px 14px", borderRadius: 11, background: `${c.primary}08`, border: `1px solid ${c.primary}20` }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 5 }}>
              <Ic n="shield" size={13} color={c.primary} />
              <span style={{ fontSize: 12, fontWeight: 700, color: c.primary }}>Sharing to your Assigned Section</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["CSE", "Batch 52", "Section B"].map(chip => (
                <span key={chip} style={{ padding: "2px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, background: `${c.primary}12`, color: c.primary, border: `1px solid ${c.primary}25` }}>{chip}</span>
              ))}
            </div>
            <div style={{ fontSize: 11, color: c.textDim, marginTop: 6 }}>Students will see this as &quot;Shared by CR&quot; in their events feed.</div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <GhostBtn onClick={onClose}>Cancel</GhostBtn>
            <PrimaryBtn icon="event" onClick={() => setDone(true)}>Share Event</PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

function CRDashboardHome({ onNavigate }: { onNavigate: (id: string) => void }) {
  const routine=useRoutine(),routineClock=useRoutineClock();
  const allClassUpdates = useClassUpdates();
  const materialData = useMaterials();
  const liveMaterials = materialData.materials;
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);
  const { theme } = useTheme();
  const c = tok(theme);
  const [modal, setModal] = useState<string | null>(null);
  const [shareEventTitle, setShareEventTitle] = useState("");

  const quickActions = [
    { label: "Post Class Update", icon: "alert", modal: "postUpdate", primary: true },
    { label: "Add Weekly Class", icon: "calendar", modal: "routine" },
    { label: "Upload Class Note", icon: "upload", modal: "material" },
    { label: "Share Event", icon: "event", modal: "shareEventPick" },
    { label: "Announcement", icon: "megaphone", modal: "announcement" },
  ];

  const stats = [
    { label: "Today's Classes", value: routine.loading||routine.error||!routineClock?"—":String(routine.entries.filter(e=>e.weekday===routineClock.day).length), sub: "Scheduled today", icon: "📚", color: c.primary, bg: `rgba(37,99,235,0.1)` },
    { label: "Active Updates", value: String(allClassUpdates.filter(update => update.status === "published").length), sub: "Posted by you", icon: "⚠️", color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
    { label: "Upcoming Events", value: "3", sub: "Available to share", icon: "🎪", color: "#8B5CF6", bg: "rgba(139,92,246,0.1)" },
    { label: "Materials Shared", value: String(liveMaterials.length), sub: "Class notes shared", icon: "📄", color: "#10B981", bg: "rgba(16,185,129,0.1)" },
    { label: "Material Courses", value: String(new Set(liveMaterials.map(m=>m.code)).size), sub: "Courses with files", icon: "⏳", color: "#64748B", bg: "rgba(100,116,139,0.1)" },
  ];


  const classUpdates = allClassUpdates.filter(update => update.status === "published");

  const eventsToShare = [
    { id: "ev1", title: "Hackathon 2026", date: "September 15", venue: "Auditorium", regStatus: "Registration Open", emoji: "🏆" },
    { id: "ev2", title: "AI Workshop", date: "September 18", venue: "Innovation Lab", regStatus: "Registration Link Available", emoji: "🤖" },
    { id: "ev3", title: "Career Fair", date: "September 22", venue: "CSE Building", regStatus: "Open for All", emoji: "💼" },
  ];

  const materialStats = [
    {label:"Total Materials",value:liveMaterials.length,desc:"Shared with this class",color:"#2563EB",bg:"rgba(37,99,235,0.08)"},
    {label:"Class Notes",value:liveMaterials.filter(m=>m.type==="Notes").length,desc:"Published notes",color:"#8B5CF6",bg:"rgba(139,92,246,0.08)"},
    {label:"Saved",value:materialData.savedIds.length,desc:"Your bookmarks",color:"#10B981",bg:"rgba(16,185,129,0.08)"},
    {label:"Courses",value:new Set(liveMaterials.map(m=>m.code)).size,desc:"Courses with files",color:"#F59E0B",bg:"rgba(245,158,11,0.08)"},
  ];

  const recentActivity = [
    { verb: "You shared", detail: "Hackathon 2026", time: "20 minutes ago", icon: "event" },
    { verb: "You updated", detail: "CSE 305 Class Time", time: "Yesterday", icon: "calendar" },
    { verb: "You uploaded", detail: "Database Normalization Notes", time: "2 days ago", icon: "upload" },
    { verb: "You posted", detail: "Midterm syllabus announcement", time: "3 days ago", icon: "megaphone" },
  ];

  const announcements = [
    { title: "Database class moved to Room 605", time: "30 minutes ago", status: "published" as Status },
    { title: "Midterm syllabus updated", time: "Yesterday", status: "published" as Status },
    { title: "Lab session cancelled Thursday", time: "2 hours ago", status: "pending" as Status },
  ];

  const exams = [
    { title: "Midterm Examination", course: "Database Management", date: "Sep 10", time: "10:00 AM", room: "502", status: "published" as Status },
    { title: "Quiz 03", course: "Algorithms", date: "Sep 5", time: "12:00 PM", room: "405", status: "pending" as Status },
  ];

  const lostFound = [
    { type: "Lost", item: "AirPods", location: "Central Library", when: "Today", color: "#EF4444" },
    { type: "Found", item: "Student ID Card", location: "Building 3", when: "Yesterday", color: "#10B981" },
  ];

  return (
    <>
      {/* Modals */}
      {modal === "postUpdate" && <PostClassUpdateModal onClose={() => setModal(null)} />}
      {modal === "material" && <UploadMaterialModal onClose={() => setModal(null)} />}
      {modal === "assignment" && <CreateAssignmentModal onClose={() => setModal(null)} />}
      {modal === "announcement" && <CreateAnnouncementModal onClose={() => setModal(null)} />}
      {modal === "routine" && <UpdateRoutineModal onClose={() => setModal(null)} />}
      {modal === "exam" && <AddExamModal onClose={() => setModal(null)} />}
      {modal === "event" && <CreateEventModal onClose={() => setModal(null)} />}
      {modal === "shareEvent" && <ShareEventModal eventTitle={shareEventTitle} onClose={() => setModal(null)} />}

      <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px 80px", background: c.bg }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* CR Identity / Context */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "18px 22px", display: "flex", gap: 18, alignItems: "center", boxShadow: c.cardShadow }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${c.primary}12`, border: `1px solid ${c.primary}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Ic n="shield" size={22} color={c.primary} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 15, color: c.text, marginBottom: 4 }}>Class Representative</div>
              <div style={{ fontSize: 12, color: c.textDim, marginBottom: 8 }}>Manage updates and information for your class.</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["CSE", "Batch 52", "Section B", "Spring 2026"].map((chip) => (
                  <span key={chip} style={{ padding: "3px 11px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: `${c.primary}10`, color: c.primary, border: `1px solid ${c.primary}22` }}>{chip}</span>
                ))}
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 11, color: c.textDim, display: "flex", alignItems: "center", gap: 5, justifyContent: "flex-end" }}>
                <Ic n="shield" size={12} color={c.textDim} />
                Section-scoped
              </div>
              <div style={{ fontSize: 11, color: c.textDim, marginTop: 3 }}>42 students</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 12 }}>Quick Actions</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
              {quickActions.map((a) => {
                const hov = hoveredAction === a.label;
                return (
                  <button key={a.label}
                    onClick={() => { if (a.modal === "shareEventPick") { setShareEventTitle(eventsToShare[0].title); setModal("shareEvent"); } else setModal(a.modal); }}
                    onMouseEnter={() => setHoveredAction(a.label)} onMouseLeave={() => setHoveredAction(null)}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "16px 8px",
                      borderRadius: 14, border: `1px solid ${a.primary ? c.primary + "50" : hov ? c.primary + "30" : c.border}`,
                      background: a.primary ? (hov ? c.primaryDark : c.primary) : hov ? c.highlight : c.surface,
                      cursor: "pointer", transition: "all 0.18s ease",
                      boxShadow: hov || a.primary ? c.cardShadow : "none",
                      transform: hov ? "translateY(-2px)" : "none",
                    }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: a.primary ? "rgba(255,255,255,0.2)" : `${c.primary}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Ic n={a.icon} size={20} color={a.primary ? "#fff" : c.primary} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: a.primary ? "#fff" : c.text, textAlign: "center", lineHeight: 1.3 }}>{a.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12 }}>
            {stats.map((s) => (
              <div key={s.label} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: "14px 16px", boxShadow: c.cardShadow }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{s.icon}</div>
                  <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 24, color: s.color, lineHeight: 1 }}>{s.value}</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: c.text }}>{s.label}</div>
                <div style={{ fontSize: 11, color: c.textDim, marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Main 2-col grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20, alignItems: "flex-start" }}>

            {/* Left column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

              <TodayRoutine onView={()=>onNavigate("routine")}/>

              {/* Recent Class Updates */}
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "22px 24px", boxShadow: c.cardShadow }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text }}>Recent Class Updates</div>
                  <PrimaryBtn small icon="alert" onClick={() => setModal("postUpdate")}>Post Update</PrimaryBtn>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {classUpdates.map((upd, i) => (
                    <div key={i} style={{ padding: "12px 16px", background: c.surface2, borderRadius: 13, border: `1px solid ${c.border}`, borderLeft: `3px solid ${upd.color}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <span style={{ fontSize: 14 }}>{upd.emoji}</span>
                          <span style={{ fontSize: 12, fontWeight: 800, color: c.text }}>{upd.code}</span>
                          <span style={{ padding: "2px 9px", borderRadius: 999, fontSize: 10, fontWeight: 700, color: upd.color, background: `${upd.color}12`, border: `1px solid ${upd.color}25` }}>{upd.type}</span>
                          <span style={{ padding: "2px 8px", borderRadius: 999, fontSize: 10, fontWeight: 700, color: "#8B5CF6", background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}>Posted by CR</span>
                        </div>
                      </div>
                      <div style={{ fontSize: 12, color: c.textMuted, fontWeight: 600, marginBottom: 3, paddingLeft: 22 }}>{upd.detail}</div>
                      <div style={{ fontSize: 10, color: c.textDim, paddingLeft: 22 }}>Published {upd.time}</div>
                    </div>
                  ))}
                </div>
                <button onClick={() => onNavigate("classupdates")} style={{ fontSize: 12, fontWeight: 600, color: c.primary, background: "none", border: "none", cursor: "pointer", marginTop: 12, padding: 0 }}>View All Updates →</button>
              </div>

              {/* Events to Share */}
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "22px 24px", boxShadow: c.cardShadow }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div>
                    <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text }}>Events to Share</div>
                    <div style={{ fontSize: 11, color: c.textDim, marginTop: 2 }}>Share relevant events with your section</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {eventsToShare.map((ev) => (
                    <div key={ev.id} style={{ padding: "14px 16px", background: c.surface2, borderRadius: 13, border: `1px solid ${c.border}` }}>
                      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: `${c.primary}10`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18 }}>{ev.emoji}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: c.text, marginBottom: 3 }}>{ev.title}</div>
                          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                              <Ic n="calendar" size={11} color={c.textDim} />
                              <span style={{ fontSize: 11, color: c.textDim }}>{ev.date}</span>
                            </div>
                            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                              <Ic n="map" size={11} color={c.textDim} />
                              <span style={{ fontSize: 11, color: c.textDim }}>{ev.venue}</span>
                            </div>
                          </div>
                          <div style={{ fontSize: 11, color: "#10B981", fontWeight: 600, marginTop: 4 }}>{ev.regStatus}</div>
                        </div>
                        <button onClick={() => { setShareEventTitle(ev.title); setModal("shareEvent"); }}
                          style={{ padding: "6px 14px", borderRadius: 9, border: `1px solid ${c.primary}30`, background: `${c.primary}08`, color: c.primary, fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.15s", flexShrink: 0 }}>
                          Share with Section
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Class Materials Summary */}
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "22px 24px", boxShadow: c.cardShadow }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text }}>Class Materials</div>
                  <div style={{ display: "flex", gap: 7 }}>
                    <PrimaryBtn small icon="upload" onClick={() => setModal("material")}>Upload Note</PrimaryBtn>
                    <GhostBtn small onClick={() => onNavigate("materials")}>View All →</GhostBtn>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                  {materialStats.map((ms) => (
                    <div key={ms.label} style={{ padding: "14px 14px", borderRadius: 12, background: ms.bg, border: `1px solid ${ms.color}20`, textAlign: "center" }}>
                      <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: ms.color, lineHeight: 1, marginBottom: 6 }}>{ms.value}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: ms.color, marginBottom: 3 }}>{ms.label}</div>
                      <div style={{ fontSize: 10, color: c.textDim }}>{ms.desc}</div>
                    </div>
                  ))}
                </div>
                {materialData.error && <p role="alert">{materialData.error}</p>}
              </div>

            </div>

            {/* Right column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Recent Activity */}
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "20px 22px", boxShadow: c.cardShadow }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text }}>Recent Activity</div>
                </div>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: 15, top: 8, bottom: 8, width: 1, background: c.border }} />
                  {recentActivity.map((a, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: `${c.primary}10`, border: `1px solid ${c.primary}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1 }}>
                        <Ic n={a.icon} size={12} color={c.primary} />
                      </div>
                      <div style={{ flex: 1, paddingTop: 3 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: c.text }}>{a.verb}: </span>
                        <span style={{ fontSize: 12, color: c.textMuted }}>{a.detail}</span>
                        <div style={{ fontSize: 10, color: c.textDim, marginTop: 3 }}>{a.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button style={{ fontSize: 12, fontWeight: 600, color: c.primary, background: "none", border: "none", cursor: "pointer", padding: 0 }}>View Activity History →</button>
              </div>

              {/* Announcements */}
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "20px 22px", boxShadow: c.cardShadow }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text }}>Announcements</div>
                  <PrimaryBtn small icon="megaphone" onClick={() => setModal("announcement")}>Post</PrimaryBtn>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {announcements.map((a, i) => (
                    <div key={i} style={{ padding: "10px 12px", background: c.surface2, borderRadius: 10, border: `1px solid ${c.border}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 5 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: c.text, lineHeight: 1.4 }}>{a.title}</div>
                        <StatusBadge status={a.status} />
                      </div>
                      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: "#8B5CF6", background: "rgba(139,92,246,0.08)", padding: "1px 7px", borderRadius: 999, border: "1px solid rgba(139,92,246,0.18)" }}>Posted by CR</span>
                        <span style={{ fontSize: 10, color: c.textDim }}>{a.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button style={{ fontSize: 12, fontWeight: 600, color: c.primary, background: "none", border: "none", cursor: "pointer", marginTop: 10, padding: 0 }}>View All →</button>
              </div>

              {/* Upcoming Exams */}
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "20px 22px", boxShadow: c.cardShadow }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text }}>Upcoming Exams</div>
                  <GhostBtn small icon="plus" onClick={() => setModal("exam")}>Add Exam</GhostBtn>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {exams.map((ex, i) => (
                    <div key={i} style={{ padding: "12px 14px", background: c.surface2, borderRadius: 11, border: `1px solid ${c.border}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: c.text }}>{ex.title}</div>
                        <StatusBadge status={ex.status} />
                      </div>
                      <div style={{ fontSize: 11, color: c.textMuted }}>{ex.course}</div>
                      <div style={{ display: "flex", gap: 12, marginTop: 7 }}>
                        {[{ icon: "calendar", val: ex.date }, { icon: "clock", val: ex.time }, { icon: "map", val: `Rm ${ex.room}` }].map(m => (
                          <div key={m.val} style={{ display: "flex", gap: 4, alignItems: "center" }}>
                            <Ic n={m.icon} size={11} color={c.textDim} />
                            <span style={{ fontSize: 11, color: c.textDim }}>{m.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lost & Found */}
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "20px 22px", boxShadow: c.cardShadow }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text }}>Lost & Found</div>
                  <button style={{ fontSize: 12, fontWeight: 600, color: c.primary, background: "none", border: "none", cursor: "pointer" }}>View All →</button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                  {lostFound.map((lf, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, padding: "10px 12px", background: c.surface2, borderRadius: 10, border: `1px solid ${c.border}`, borderLeft: `3px solid ${lf.color}` }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 3 }}>
                          <span style={{ fontSize: 10, fontWeight: 700, color: lf.color, background: `${lf.color}10`, padding: "1px 7px", borderRadius: 999, border: `1px solid ${lf.color}25` }}>{lf.type}</span>
                          <span style={{ fontSize: 12, fontWeight: 600, color: c.text }}>{lf.item}</span>
                        </div>
                        <div style={{ fontSize: 11, color: c.textDim }}>{lf.location} · {lf.when}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 7 }}>
                  <GhostBtn small icon="plus">Report Lost</GhostBtn>
                  <GhostBtn small icon="check">Report Found</GhostBtn>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── MY SECTION PAGE ──────────────────────────────────────────────────────────────
function MySectionPage() {
  const { theme } = useTheme();
  const c = tok(theme);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"All" | "Active" | "Inactive">("All");

  const STUDENTS = [
    { id: "2201001", name: "Alam, Rakib", status: "Active" as const, avg: "3.72" },
    { id: "2201002", name: "Hossain, Nadia", status: "Active" as const, avg: "3.85" },
    { id: "2201003", name: "Islam, Farhan", status: "Active" as const, avg: "3.41" },
    { id: "2201004", name: "Karim, Sadia", status: "Active" as const, avg: "3.90" },
    { id: "2201005", name: "Khan, Mehedi", status: "Active" as const, avg: "3.55" },
    { id: "2201006", name: "Miah, Tanjila", status: "Inactive" as const, avg: "—" },
    { id: "2201007", name: "Mondol, Arif", status: "Active" as const, avg: "3.68" },
    { id: "2201008", name: "Noor, Tasnia", status: "Active" as const, avg: "3.77" },
    { id: "2201009", name: "Ovi, Rishad", status: "Active" as const, avg: "3.82" },
    { id: "2201010", name: "Rahman, Priya", status: "Active" as const, avg: "3.60" },
    { id: "2201011", name: "Sarker, Fahim", status: "Active" as const, avg: "3.45" },
    { id: "2201012", name: "Uddin, Rumana", status: "Inactive" as const, avg: "—" },
  ];

  const filtered = STUDENTS.filter((s) => {
    const matchQ = !query || s.name.toLowerCase().includes(query.toLowerCase()) || s.id.includes(query);
    const matchF = filter === "All" || s.status === filter;
    return matchQ && matchF;
  });

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px 80px", background: c.bg }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 24, color: c.text, letterSpacing: "-0.02em", marginBottom: 5 }}>My Section</h1>
          <p style={{ fontSize: 14, color: c.textMuted }}>CSE · Batch 52 · Section B · 42 Students</p>
        </div>

        {/* Search + filter */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}><Ic n="search" size={14} color={c.textDim} /></div>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search students..."
              style={{ width: "100%", padding: "9px 14px 9px 38px", borderRadius: 10, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 13, outline: "none" }} />
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {(["All", "Active", "Inactive"] as const).map((f) => (
              <GhostBtn key={f} active={filter === f} onClick={() => setFilter(f)} small>{f}</GhostBtn>
            ))}
          </div>
          <span style={{ fontSize: 12, color: c.textDim, alignSelf: "center" }}>{filtered.length} students</span>
        </div>

        {/* Student table */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, overflow: "hidden", boxShadow: c.cardShadow }}>
          <div style={{ display: "grid", gridTemplateColumns: "44px 1fr 120px 80px 100px", padding: "11px 20px", background: c.surface2, borderBottom: `1px solid ${c.border}` }}>
            {["#", "Name", "Student ID", "GPA", "Status"].map((h) => (
              <div key={h} style={{ fontSize: 11, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</div>
            ))}
          </div>
          {filtered.map((s, i) => (
            <div key={s.id} style={{ display: "grid", gridTemplateColumns: "44px 1fr 120px 80px 100px", alignItems: "center", padding: "12px 20px", borderBottom: i < filtered.length - 1 ? `1px solid ${c.border}` : "none", transition: "background 0.13s", cursor: "default" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = c.surface2)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
            >
              <div style={{ width: 28, height: 28, borderRadius: 8, background: `${c.primary}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: c.primary }}>{i + 1}</div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: `linear-gradient(135deg, ${c.primary}22, #38BDF820)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Manrope", fontWeight: 700, fontSize: 12, color: c.primary }}>
                  {s.name.split(",")[0][0]}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{s.name}</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: c.textMuted, fontFamily: "monospace" }}>{s.id}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: s.avg !== "—" ? c.text : c.textDim }}>{s.avg}</div>
              <span style={{ padding: "2px 9px", borderRadius: 999, fontSize: 10, fontWeight: 700, background: s.status === "Active" ? "rgba(16,185,129,0.08)" : "rgba(148,163,184,0.08)", color: s.status === "Active" ? "#10B981" : "#94A3B8", border: `1px solid ${s.status === "Active" ? "rgba(16,185,129,0.2)" : "rgba(148,163,184,0.2)"}`, display: "inline-block" }}>
                {s.status}
              </span>
            </div>
          ))}
        </div>

        {/* Permission note */}
        <div style={{ marginTop: 16, padding: "11px 16px", background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, display: "flex", gap: 8, alignItems: "center" }}>
          <Ic n="shield" size={14} color={c.textDim} />
          <span style={{ fontSize: 12, color: c.textDim }}>You can view student information. Editing sensitive data is restricted to department administrators.</span>
        </div>
      </div>
    </div>
  );
}

// ─── CR CLASS UPDATES PAGE ────────────────────────────────────────────────────────
function CRClassUpdatesPage() {
  const { theme } = useTheme();
  const c = tok(theme);
  const [modal, setModal] = useState<string | null>(null);

  const { updates, loading, error: loadError } = useClassUpdatesState();
  const [error, setError] = useState("");
  async function changeUpdate(id: string, detail: string) {
    const next = window.prompt("Update details:", detail);
    if (next === null) return;
    try { await editClassUpdate(id, next, updates.find(u => u.id === id)!.version); setError(""); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not edit update."); }
  }
  async function removeUpdate(id: string) {
    if (!window.confirm("Delete this class update for everyone in your class?")) return;
    try { await deleteClassUpdate(id, updates.find(u => u.id === id)!.version); setError(""); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not delete update."); }
  }

  const typeColors: Record<string, string> = {
    "Class Delayed": "#F59E0B",
    "Class Cancelled": "#EF4444",
    "Room Changed": "#3B82F6",
    "Extra Class": "#10B981",
    "Schedule Changed": "#8B5CF6",
    "General Class Information": "#64748B",
  };

  return (
    <>
      {modal === "postUpdate" && <PostClassUpdateModal onClose={() => setModal(null)} />}
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px 80px", background: c.bg }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: c.text, marginBottom: 4 }}>Class Updates</div>
              <div style={{ fontSize: 13, color: c.textDim }}>Coordinate and share important changes with your registered class</div>
            </div>
            <PrimaryBtn icon="alert" onClick={() => setModal("postUpdate")}>Post Class Update</PrimaryBtn>
          </div>

          {/* Info callout */}
          <div style={{ padding: "12px 16px", borderRadius: 12, background: `${c.primary}08`, border: `1px solid ${c.primary}20`, display: "flex", gap: 10, alignItems: "center" }}>
            <Ic n="shield" size={15} color={c.primary} />
            <div style={{ fontSize: 12, color: c.textMuted }}>
              <strong style={{ color: c.text }}>Audience:</strong> Updates are saved to MySQL and shared only with students in your registered department, batch, and section.
            </div>
          </div>

          {/* Update types reference */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "18px 22px", boxShadow: c.cardShadow }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 12 }}>Update Types</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {Object.entries(typeColors).map(([type, color]) => (
                <span key={type} style={{ padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700, color, background: `${color}10`, border: `1px solid ${color}25` }}>{type}</span>
              ))}
            </div>
          </div>

          {error && <p role="alert" style={{ color: "#EF4444" }}>{error}</p>}
          {/* Updates list */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "22px 24px", boxShadow: c.cardShadow }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text }}>Posted Updates</div>
              <span style={{ fontSize: 12, color: c.textDim }}>{updates.length} total</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {loading && <p>Loading class updates…</p>}
              {loadError && <p role="alert">{loadError}</p>}
              {!loading && !loadError && updates.length === 0 && <p>No class updates yet. Post an update to get started.</p>}
              {updates.map((upd) => (
                <div key={upd.id} style={{ padding: "16px 18px", background: c.surface2, borderRadius: 14, border: `1px solid ${c.border}`, borderLeft: `3px solid ${upd.color}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ fontSize: 16 }}>{upd.emoji}</span>
                      <span style={{ fontFamily: "Manrope", fontSize: 13, fontWeight: 800, color: c.text }}>{upd.code}</span>
                      <span style={{ padding: "2px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, color: upd.color, background: `${upd.color}12`, border: `1px solid ${upd.color}25` }}>{upd.type}</span>
                      <span style={{ padding: "2px 8px", borderRadius: 999, fontSize: 10, fontWeight: 700, color: "#8B5CF6", background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}>Posted by CR</span>
                    </div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
                      <StatusBadge status={upd.status} />
                      <button aria-label="Edit update" onClick={() => changeUpdate(upd.id, upd.detail)} style={{ width: 26, height: 26, borderRadius: 7, border: `1px solid ${c.border}`, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Ic n="edit" size={12} color={c.textDim} />
                      </button>
                      <button aria-label="Delete update" onClick={() => removeUpdate(upd.id)} style={{ width: 26, height: 26, borderRadius: 7, border: `1px solid ${c.border}`, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Ic n="trash" size={12} color={c.textDim} />
                      </button>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.textMuted, marginBottom: 4, paddingLeft: 24 }}>{upd.detail}{upd.note && <p style={{ fontWeight: 400, marginBottom: 0 }}>{upd.note}</p>}</div>
                  <div style={{ fontSize: 11, color: c.textDim, paddingLeft: 24 }}>Published {upd.time} · CSE · Batch 52 · Section B</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── CR ASSIGNMENTS PAGE ──────────────────────────────────────────────────────────

function CRAssignmentsPage(){return <AssignmentsView/>;}

// ─── CR EXAMS PAGE ────────────────────────────────────────────────────────────────

type ExamStatus = "Upcoming" | "This Week" | "Completed";
type ExamType = "Midterm" | "Final" | "Quiz" | "Viva" | "Practical";

const EXAMS_DATA = [
  { id: "e1", title: "Midterm Examination", course: "Database Management", code: "CSE 305", type: "Midterm" as ExamType, date: "Sep 10", time: "10:00 AM – 12:00 PM", room: "502", duration: "2 hours", source: "Department", status: "This Week" as ExamStatus, instructions: "Bring your student ID and approved calculator. No electronic devices permitted. Closed book examination." },
  { id: "e2", title: "Algorithms Midterm", course: "Algorithms", code: "CSE 301", type: "Midterm" as ExamType, date: "Sep 12", time: "2:00 PM – 4:00 PM", room: "405", duration: "2 hours", source: "Department", status: "Upcoming" as ExamStatus, instructions: "Open book allowed. Bring your textbook and class notes. No electronic devices." },
  { id: "e3", title: "Software Engineering Quiz", course: "Software Engineering", code: "CSE 310", type: "Quiz" as ExamType, date: "Sep 15", time: "11:00 AM – 12:00 PM", room: "302", duration: "1 hour", source: "Teacher", status: "Upcoming" as ExamStatus, instructions: "Covers chapters 1–5. Short answer and MCQ format." },
  { id: "e4", title: "Network Lab Practical", course: "Computer Networks", code: "CSE 307", type: "Practical" as ExamType, date: "Sep 18", time: "10:00 AM – 1:00 PM", room: "Lab 3", duration: "3 hours", source: "Teacher", status: "Upcoming" as ExamStatus, instructions: "Bring your lab manual. Equipment will be provided. Individual assessment." },
  { id: "e5", title: "DB Quiz 01", course: "Database Management", code: "CSE 305", type: "Quiz" as ExamType, date: "Aug 20", time: "10:00 AM – 11:00 AM", room: "502", duration: "1 hour", source: "Department", status: "Completed" as ExamStatus, instructions: "Covered SQL basics and ER diagrams." },
  { id: "e6", title: "Algorithms Quiz 02", course: "Algorithms", code: "CSE 301", type: "Quiz" as ExamType, date: "Aug 24", time: "2:00 PM – 3:00 PM", room: "405", duration: "1 hour", source: "Teacher", status: "Completed" as ExamStatus, instructions: "Sorting algorithms and complexity analysis." },
];

const EXAM_ACTIVITY = [
  { verb: "You shared a reminder", detail: "Database Management Midterm", time: "2 hours ago" },
  { verb: "You shared a verified update", detail: "Algorithms Exam Room Changed", time: "Yesterday" },
  { verb: "You viewed", detail: "Software Engineering Quiz", time: "2 days ago" },
];

function ShareExamReminderModal({ exam, onClose }: { exam: typeof EXAMS_DATA[0]; onClose: () => void }) {
  const { theme } = useTheme();
  const c = tok(theme);
  const [screen, setScreen] = useState<"form" | "preview" | "success">("form");
  const [msg, setMsg] = useState("");

  const ta: React.CSSProperties = { width: "100%", padding: "9px 12px", borderRadius: 9, border: `1px solid ${c.border}`, background: c.surface2, color: c.text, fontSize: 13, fontFamily: "Inter", outline: "none", boxSizing: "border-box", resize: "vertical" };

  if (screen === "success") return (
    <div style={{ position: "fixed", inset: 0, background: c.overlay, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: c.surface, borderRadius: 20, padding: "44px 36px", maxWidth: 400, width: "90%", textAlign: "center", boxShadow: c.cardShadow }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(16,185,129,0.1)", border: "2px solid rgba(16,185,129,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <Ic n="check" size={24} color="#10B981" />
        </div>
        <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 18, color: c.text, marginBottom: 8 }}>Reminder Shared</div>
        <div style={{ fontSize: 13, color: c.textDim, marginBottom: 6 }}>{exam.title}</div>
        <div style={{ fontSize: 12, color: c.textDim, marginBottom: 24 }}>Your class has been notified.</div>
        <PrimaryBtn onClick={onClose}>Done</PrimaryBtn>
      </div>
    </div>
  );

  if (screen === "preview") return (
    <div style={{ position: "fixed", inset: 0, background: c.overlay, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: c.surface, borderRadius: 20, padding: "28px 30px", maxWidth: 480, width: "95%", boxShadow: c.cardShadow }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 17, color: c.text }}>Preview</div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${c.border}`, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ic n="x" size={15} color={c.textDim} />
          </button>
        </div>
        <div style={{ padding: "18px 20px", background: c.surface2, borderRadius: 14, border: `1px solid ${c.border}`, marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 18 }}>🎖</span>
            <span style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text }}>Exam Reminder</span>
            <span style={{ padding: "2px 8px", borderRadius: 999, fontSize: 10, fontWeight: 700, color: "#8B5CF6", background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}>Shared by CR</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: c.text, marginBottom: 8 }}>{exam.title}</div>
          {[{ icon: "calendar", val: exam.date }, { icon: "clock", val: exam.time }, { icon: "map", val: `Room ${exam.room}` }].map(f => (
            <div key={f.val} style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}>
              <Ic n={f.icon} size={12} color={c.textDim} />
              <span style={{ fontSize: 12, color: c.textMuted, fontWeight: 600 }}>{f.val}</span>
            </div>
          ))}
          {msg && <div style={{ fontSize: 12, color: c.textMuted, fontStyle: "italic", marginTop: 8, padding: "8px 10px", background: c.surface, borderRadius: 8, border: `1px solid ${c.border}` }}>&quot;{msg}&quot;</div>}
          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            {["CSE", "Batch 52", "Section B"].map(chip => (
              <span key={chip} style={{ padding: "2px 8px", borderRadius: 999, fontSize: 10, fontWeight: 600, background: `${c.primary}10`, color: c.primary, border: `1px solid ${c.primary}20` }}>{chip}</span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <GhostBtn onClick={() => setScreen("form")}>Back</GhostBtn>
          <PrimaryBtn icon="megaphone" onClick={() => setScreen("success")}>Publish Reminder</PrimaryBtn>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: c.overlay, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: c.surface, borderRadius: 20, padding: "28px 30px", maxWidth: 500, width: "95%", boxShadow: c.cardShadow, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 17, color: c.text }}>Share Exam Reminder</div>
            <div style={{ fontSize: 12, color: c.textDim, marginTop: 2 }}>Notify your class about this exam</div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${c.border}`, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ic n="x" size={15} color={c.textDim} />
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ padding: "12px 14px", background: c.surface2, borderRadius: 12, border: `1px solid ${c.border}` }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
              <span style={{ padding: "2px 8px", borderRadius: 999, fontSize: 10, fontWeight: 700, color: "#2563EB", background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)" }}>Official Exam Schedule</span>
              <span style={{ fontSize: 11, color: c.textDim }}>by {exam.source}</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: c.text, marginBottom: 6 }}>{exam.title}</div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {[{ icon: "calendar", val: exam.date }, { icon: "clock", val: exam.time }, { icon: "map", val: `Room ${exam.room}` }].map(f => (
                <div key={f.val} style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  <Ic n={f.icon} size={11} color={c.textDim} />
                  <span style={{ fontSize: 11, color: c.textDim }}>{f.val}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, marginBottom: 6 }}>Optional Message <span style={{ fontWeight: 400, color: c.textDim }}>(shown to students)</span></div>
            <textarea value={msg} onChange={e => setMsg(e.target.value)} rows={3} style={ta} placeholder={`"Please arrive at least 15 minutes before the exam."`} />
          </div>
          <div style={{ padding: "12px 14px", borderRadius: 12, background: `${c.primary}08`, border: `1px solid ${c.primary}20` }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
              <Ic n="shield" size={13} color={c.primary} />
              <span style={{ fontSize: 12, fontWeight: 700, color: c.primary }}>Target Audience · Automatically Assigned</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["CSE", "Batch 52", "Section B"].map(chip => (
                <span key={chip} style={{ padding: "2px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, background: `${c.primary}12`, color: c.primary, border: `1px solid ${c.primary}25` }}>{chip}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <GhostBtn onClick={onClose}>Cancel</GhostBtn>
            <PrimaryBtn icon="eye" onClick={() => setScreen("preview")}>Preview</PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExamDetailModal({ exam, onClose, onRemind }: { exam: typeof EXAMS_DATA[0]; onClose: () => void; onRemind: () => void }) {
  const { theme } = useTheme();
  const c = tok(theme);
  const typeColor: Record<ExamType, string> = { Midterm: "#8B5CF6", Final: "#EF4444", Quiz: "#F59E0B", Viva: "#06B6D4", Practical: "#10B981" };
  const statusColor: Record<ExamStatus, string> = { "This Week": "#EF4444", Upcoming: "#2563EB", Completed: "#10B981" };

  return (
    <div style={{ position: "fixed", inset: 0, background: c.overlay, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: c.surface, borderRadius: 20, padding: "28px 30px", maxWidth: 520, width: "95%", boxShadow: c.cardShadow, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
              <span style={{ padding: "2px 9px", borderRadius: 999, fontSize: 10, fontWeight: 700, color: "#2563EB", background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)" }}>Official Exam Schedule</span>
              <span style={{ padding: "2px 9px", borderRadius: 999, fontSize: 10, fontWeight: 700, color: typeColor[exam.type], background: `${typeColor[exam.type]}10`, border: `1px solid ${typeColor[exam.type]}25` }}>{exam.type}</span>
              <span style={{ padding: "2px 9px", borderRadius: 999, fontSize: 10, fontWeight: 700, color: statusColor[exam.status], background: `${statusColor[exam.status]}10`, border: `1px solid ${statusColor[exam.status]}25` }}>{exam.status}</span>
            </div>
            <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 18, color: c.text, marginBottom: 4 }}>{exam.title}</div>
            <div style={{ fontSize: 13, color: c.textDim }}>{exam.course} · {exam.code}</div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${c.border}`, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: 12 }}>
            <Ic n="x" size={15} color={c.textDim} />
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "Date", value: exam.date },
              { label: "Time", value: exam.time },
              { label: "Room", value: exam.room },
              { label: "Duration", value: exam.duration },
              { label: "Source", value: exam.source },
              { label: "Type", value: exam.type },
            ].map(f => (
              <div key={f.label} style={{ padding: "10px 12px", background: c.surface2, borderRadius: 10, border: `1px solid ${c.border}` }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>{f.label}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: c.text }}>{f.value}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "12px 14px", background: c.surface2, borderRadius: 11, border: `1px solid ${c.border}` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Instructions</div>
            <div style={{ fontSize: 13, color: c.text, lineHeight: 1.6 }}>{exam.instructions}</div>
          </div>
          {exam.status !== "Completed" && (
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <GhostBtn onClick={onClose}>Close</GhostBtn>
              <PrimaryBtn icon="megaphone" onClick={() => { onClose(); onRemind(); }}>Share Reminder</PrimaryBtn>
            </div>
          )}
          {exam.status === "Completed" && (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <GhostBtn onClick={onClose}>Close</GhostBtn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CRExamsPage() {
  const { theme } = useTheme();
  const c = tok(theme);
  const [filter, setFilter] = useState<"All" | "Upcoming" | "This Week" | "This Month" | "Completed">("All");
  const [search, setSearch] = useState("");
  const [reminderFor, setReminderFor] = useState<typeof EXAMS_DATA[0] | null>(null);
  const [detailFor, setDetailFor] = useState<typeof EXAMS_DATA[0] | null>(null);

  const typeColor: Record<ExamType, string> = { Midterm: "#8B5CF6", Final: "#EF4444", Quiz: "#F59E0B", Viva: "#06B6D4", Practical: "#10B981" };
  const statusColor: Record<ExamStatus, string> = { "This Week": "#EF4444", Upcoming: "#2563EB", Completed: "#10B981" };
  const statusBg: Record<ExamStatus, string> = { "This Week": "rgba(239,68,68,0.08)", Upcoming: "rgba(37,99,235,0.08)", Completed: "rgba(16,185,129,0.08)" };

  const filters = ["All", "Upcoming", "This Week", "This Month", "Completed"] as const;

  const visible = EXAMS_DATA.filter(e => {
    const matchF = filter === "All" || (filter === "This Month" ? e.status !== "Completed" : e.status === filter);
    const matchS = !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.course.toLowerCase().includes(search.toLowerCase()) || e.code.toLowerCase().includes(search.toLowerCase()) || e.type.toLowerCase().includes(search.toLowerCase());
    return matchF && matchS;
  });

  const upcoming = EXAMS_DATA.filter(e => e.status !== "Completed");
  const thisWeek = EXAMS_DATA.filter(e => e.status === "This Week");
  const completed = EXAMS_DATA.filter(e => e.status === "Completed");
  const nextExam = upcoming[0];
  const timeline = upcoming.slice(0, 4);

  const summaryStats = [
    { label: "Upcoming Exams", value: String(upcoming.length), icon: "🎖", color: c.primary, bg: `rgba(37,99,235,0.1)` },
    { label: "Next Exam", value: nextExam ? nextExam.date : "—", icon: "📅", color: "#8B5CF6", bg: "rgba(139,92,246,0.1)" },
    { label: "This Month", value: String(upcoming.length), icon: "📋", color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
    { label: "Completed", value: String(completed.length), icon: "✅", color: "#10B981", bg: "rgba(16,185,129,0.1)" },
  ];

  return (
    <>
      {reminderFor && <ShareExamReminderModal exam={reminderFor} onClose={() => setReminderFor(null)} />}
      {detailFor && <ExamDetailModal exam={detailFor} onClose={() => setDetailFor(null)} onRemind={() => setReminderFor(detailFor)} />}

      <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 80px", background: c.bg }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
            <div>
              <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 24, color: c.text, letterSpacing: "-0.02em", marginBottom: 4 }}>Exams</h1>
              <p style={{ fontSize: 13, color: c.textMuted }}>Stay updated with upcoming examinations and help your class stay informed.</p>
              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                {["CSE", "Batch 52", "Section B"].map(chip => (
                  <span key={chip} style={{ padding: "3px 11px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: `${c.primary}10`, color: c.primary, border: `1px solid ${c.primary}22` }}>{chip}</span>
                ))}
              </div>
            </div>
            <PrimaryBtn icon="megaphone" onClick={() => setReminderFor(EXAMS_DATA[0])}>Share Exam Reminder</PrimaryBtn>
          </div>

          {/* Summary cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
            {summaryStats.map(s => (
              <div key={s.label} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: "14px 18px", boxShadow: c.cardShadow, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: s.color, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: c.text, marginTop: 2 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Main 2-col */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, alignItems: "flex-start" }}>

            {/* Left: search + filters + list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Search + filter bar */}
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "16px 20px", boxShadow: c.cardShadow }}>
                <div style={{ position: "relative", marginBottom: 12 }}>
                  <div style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}>
                    <Ic n="search" size={14} color={c.textDim} />
                  </div>
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search exams..." style={{ width: "100%", padding: "9px 12px 9px 34px", borderRadius: 10, border: `1px solid ${c.border}`, background: c.surface2, color: c.text, fontSize: 13, fontFamily: "Inter", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {filters.map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                      style={{ padding: "5px 14px", borderRadius: 999, fontSize: 12, fontWeight: filter === f ? 700 : 500, background: filter === f ? `${c.primary}12` : "transparent", color: filter === f ? c.primary : c.textDim, border: `1px solid ${filter === f ? c.primary + "30" : c.border}`, cursor: "pointer", transition: "all 0.14s" }}>
                      {f === "All" ? "All Exams" : f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Exam cards */}
              {visible.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: c.textDim, background: c.surface, borderRadius: 16, border: `1px solid ${c.border}` }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>🎖</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>No exams found</div>
                </div>
              ) : visible.map(e => (
                <div key={e.id} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: c.cardShadow }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                        <span style={{ padding: "2px 9px", borderRadius: 999, fontSize: 10, fontWeight: 700, color: "#2563EB", background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)" }}>Official Exam Schedule</span>
                        <span style={{ padding: "2px 9px", borderRadius: 999, fontSize: 10, fontWeight: 700, color: typeColor[e.type], background: `${typeColor[e.type]}10`, border: `1px solid ${typeColor[e.type]}25` }}>{e.type}</span>
                        <span style={{ fontSize: 11, color: c.textDim }}>by {e.source}</span>
                      </div>
                      <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text, marginBottom: 3 }}>{e.title}</div>
                      <div style={{ fontSize: 12, color: c.textDim }}>{e.course} · {e.code}</div>
                    </div>
                    <span style={{ padding: "3px 11px", borderRadius: 999, fontSize: 11, fontWeight: 700, color: statusColor[e.status], background: statusBg[e.status], border: `1px solid ${statusColor[e.status]}25`, flexShrink: 0 }}>{e.status}</span>
                  </div>
                  <div style={{ display: "flex", gap: 14, padding: "10px 12px", background: c.surface2, borderRadius: 10, border: `1px solid ${c.border}`, marginBottom: 12, flexWrap: "wrap" }}>
                    {[{ icon: "calendar", val: e.date }, { icon: "clock", val: e.time }, { icon: "map", val: `Room ${e.room}` }, { icon: "clock", val: e.duration }].map((f, i) => (
                      <div key={i} style={{ display: "flex", gap: 5, alignItems: "center" }}>
                        <Ic n={f.icon} size={12} color={e.status === "This Week" && f.icon === "calendar" ? "#EF4444" : c.textDim} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: e.status === "This Week" && f.icon === "calendar" ? "#EF4444" : c.text }}>{f.val}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <GhostBtn small icon="eye" onClick={() => setDetailFor(e)}>View Details</GhostBtn>
                    {e.status !== "Completed" && (
                      <PrimaryBtn small icon="megaphone" onClick={() => setReminderFor(e)}>Share Reminder</PrimaryBtn>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right: timeline + activity */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Exam Timeline */}
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "20px 22px", boxShadow: c.cardShadow }}>
                <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>Exam Timeline</div>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: 15, top: 8, bottom: 8, width: 1, background: c.border }} />
                  {timeline.map((e, i) => (
                    <div key={e.id} style={{ display: "flex", gap: 12, marginBottom: 18 }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: i === 0 ? "rgba(239,68,68,0.1)" : `${c.primary}10`, border: `2px solid ${i === 0 ? "#EF4444" : c.primary}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1, fontSize: 12 }}>
                        🎖
                      </div>
                      <div style={{ flex: 1, paddingTop: 3 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: i === 0 ? "#EF4444" : c.textMuted, marginBottom: 1 }}>{e.date}</div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: c.text, marginBottom: 1 }}>{e.title}</div>
                        <div style={{ fontSize: 10, color: c.textDim }}>{e.time.split("–")[0].trim()} · Room {e.room}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Exam Activity */}
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "20px 22px", boxShadow: c.cardShadow }}>
                <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>Recent Exam Activity</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {EXAM_ACTIVITY.map((a, i) => (
                    <div key={i} style={{ padding: "10px 12px", background: c.surface2, borderRadius: 10, border: `1px solid ${c.border}` }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: c.primary, marginBottom: 2 }}>{a.verb}:</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: c.text }}>{a.detail}</div>
                      <div style={{ fontSize: 10, color: c.textDim, marginTop: 3 }}>{a.time}</div>
                    </div>
                  ))}
                </div>
                <button style={{ fontSize: 12, fontWeight: 600, color: c.primary, background: "none", border: "none", cursor: "pointer", marginTop: 12, padding: 0 }}>View Activity History →</button>
              </div>

              {/* Source legend */}
              <div style={{ padding: "14px 16px", background: `${c.primary}06`, border: `1px solid ${c.primary}18`, borderRadius: 12 }}>
                <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 12, color: c.text, marginBottom: 8 }}>Exam Information Sources</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    { label: "Official Exam Schedule", color: "#2563EB", desc: "Published by University / Dept" },
                    { label: "Reminder Shared by CR", color: "#8B5CF6", desc: "Shared by you" },
                  ].map(src => (
                    <div key={src.label} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ padding: "2px 8px", borderRadius: 999, fontSize: 10, fontWeight: 700, color: src.color, background: `${src.color}10`, border: `1px solid ${src.color}22`, whiteSpace: "nowrap" }}>{src.label}</span>
                      <span style={{ fontSize: 11, color: c.textDim }}>{src.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

// ─── CR EVENTS PAGE ───────────────────────────────────────────────────────────────

type EventCategory = "University" | "Department" | "Club" | "External" | "Workshop" | "Competition" | "Seminar" | "Hackathon" | "Career";
type RegStatus = "Open" | "Closing Soon" | "Closed" | "N/A";

const EVENTS_DATA = [
  { id: "ev1", title: "AI & Machine Learning Workshop", type: "Workshop" as EventCategory, organizer: "Tech Organization", organizerType: "External Organization", date: "Sep 20", time: "10:00 AM – 4:00 PM", location: "University Auditorium", regStatus: "Open" as RegStatus, regDeadline: "Sep 15", about: "Learn practical AI and Machine Learning concepts through hands-on sessions.", sharedByYou: true, sharedTime: "2 hours ago", source: "Official Event Information" },
  { id: "ev2", title: "Hackathon 2026", type: "Hackathon" as EventCategory, organizer: "CSE Department", organizerType: "University Department", date: "Sep 15", time: "9:00 AM – 9:00 PM", location: "Computer Lab Block", regStatus: "Open" as RegStatus, regDeadline: "Sep 10", about: "24-hour hackathon open to all CSE students. Build something amazing.", sharedByYou: true, sharedTime: "Yesterday", source: "University" },
  { id: "ev3", title: "Career Development Seminar", type: "Seminar" as EventCategory, organizer: "Career Club", organizerType: "Student Club", date: "Sep 18", time: "2:00 PM – 5:00 PM", location: "Seminar Hall 3", regStatus: "Open" as RegStatus, regDeadline: "Sep 17", about: "Tips on CV writing, LinkedIn, and interview skills from industry experts.", sharedByYou: false, sharedTime: "", source: "Career Club" },
  { id: "ev4", title: "Open Source Contribution Drive", type: "Workshop" as EventCategory, organizer: "Developer Society", organizerType: "External Organization", date: "Sep 22", time: "11:00 AM – 3:00 PM", location: "Room 201", regStatus: "Closing Soon" as RegStatus, regDeadline: "Sep 14", about: "Learn to contribute to real open-source projects with guidance from mentors.", sharedByYou: false, sharedTime: "", source: "Developer Society" },
  { id: "ev5", title: "Annual Sports Fest", type: "University" as EventCategory, organizer: "University Student Union", organizerType: "University", date: "Sep 25", time: "8:00 AM – 6:00 PM", location: "Sports Ground", regStatus: "Open" as RegStatus, regDeadline: "Sep 20", about: "Annual sports competition across all departments.", sharedByYou: false, sharedTime: "", source: "University" },
  { id: "ev6", title: "Startup Pitch Competition", type: "Competition" as EventCategory, organizer: "Startup Bangladesh", organizerType: "External Organization", date: "Oct 1", time: "10:00 AM – 6:00 PM", location: "Innovation Hub", regStatus: "Closing Soon" as RegStatus, regDeadline: "Sep 18", about: "Pitch your startup idea to industry investors and mentors.", sharedByYou: false, sharedTime: "", source: "Official Organizer" },
];

const EVENTS_ACTIVITY = [
  { verb: "You shared", detail: "AI & Machine Learning Workshop", time: "2 hours ago" },
  { verb: "You shared", detail: "Hackathon 2026", time: "Yesterday" },
  { verb: "You added", detail: "Career Development Seminar", time: "3 days ago" },
];

const EVENT_TYPE_COLOR: Record<string, string> = {
  University: "#2563EB", Department: "#8B5CF6", Club: "#06B6D4", External: "#F59E0B",
  Workshop: "#10B981", Competition: "#EF4444", Seminar: "#6366F1", Hackathon: "#F97316", Career: "#EC4899",
};

function ShareEventWithSectionModal({ event, onClose }: { event: typeof EVENTS_DATA[0]; onClose: () => void }) {
  const { theme } = useTheme();
  const c = tok(theme);
  const [screen, setScreen] = useState<"form" | "preview" | "success">("form");
  const [msg, setMsg] = useState("");

  const ta: React.CSSProperties = { width: "100%", padding: "9px 12px", borderRadius: 9, border: `1px solid ${c.border}`, background: c.surface2, color: c.text, fontSize: 13, fontFamily: "Inter", outline: "none", boxSizing: "border-box", resize: "vertical" };

  if (screen === "success") return (
    <div style={{ position: "fixed", inset: 0, background: c.overlay, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: c.surface, borderRadius: 20, padding: "44px 36px", maxWidth: 400, width: "90%", textAlign: "center", boxShadow: c.cardShadow }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🎉</div>
        <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 18, color: c.text, marginBottom: 8 }}>Event Shared Successfully</div>
        <div style={{ fontSize: 13, color: c.textDim, marginBottom: 6 }}>{event.title}</div>
        <div style={{ fontSize: 12, color: c.textDim, marginBottom: 24 }}>Your class can now view this event.</div>
        <PrimaryBtn onClick={onClose}>Done</PrimaryBtn>
      </div>
    </div>
  );

  if (screen === "preview") return (
    <div style={{ position: "fixed", inset: 0, background: c.overlay, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: c.surface, borderRadius: 20, padding: "28px 30px", maxWidth: 480, width: "95%", boxShadow: c.cardShadow, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 17, color: c.text }}>Event Preview</div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${c.border}`, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ic n="x" size={15} color={c.textDim} />
          </button>
        </div>
        <div style={{ padding: "18px 20px", background: c.surface2, borderRadius: 14, border: `1px solid ${c.border}`, marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 18 }}>🎉</span>
            <span style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text }}>New Event Shared</span>
            <span style={{ padding: "2px 8px", borderRadius: 999, fontSize: 10, fontWeight: 700, color: "#8B5CF6", background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}>Shared by CR</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: c.text, marginBottom: 4 }}>{event.title}</div>
          <div style={{ fontSize: 11, color: c.textDim, marginBottom: 8 }}>Organized by: {event.organizer}</div>
          {[{ icon: "calendar", val: event.date }, { icon: "clock", val: event.time }, { icon: "map", val: event.location }].map(f => (
            <div key={f.val} style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 3 }}>
              <Ic n={f.icon} size={11} color={c.textDim} />
              <span style={{ fontSize: 12, color: c.textMuted }}>{f.val}</span>
            </div>
          ))}
          {msg && <div style={{ fontSize: 12, color: c.textMuted, fontStyle: "italic", marginTop: 10, padding: "8px 10px", background: c.surface, borderRadius: 8, border: `1px solid ${c.border}` }}>&quot;{msg}&quot;</div>}
          <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
            {["CSE", "Batch 52", "Section B"].map(chip => (
              <span key={chip} style={{ padding: "2px 8px", borderRadius: 999, fontSize: 10, fontWeight: 600, background: `${c.primary}10`, color: c.primary, border: `1px solid ${c.primary}20` }}>{chip}</span>
            ))}
          </div>
        </div>
        <div style={{ padding: "10px 12px", borderRadius: 10, background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)", fontSize: 11, color: "#92400E", marginBottom: 16 }}>
          ℹ️ Students will see this as an external event shared by their CR, not an official university event.
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <GhostBtn onClick={() => setScreen("form")}>Back</GhostBtn>
          <PrimaryBtn icon="megaphone" onClick={() => setScreen("success")}>Share Event</PrimaryBtn>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: c.overlay, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: c.surface, borderRadius: 20, padding: "28px 30px", maxWidth: 500, width: "95%", boxShadow: c.cardShadow, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 17, color: c.text }}>Share with Section</div>
            <div style={{ fontSize: 12, color: c.textDim, marginTop: 2 }}>Share this event with your assigned students</div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${c.border}`, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ic n="x" size={15} color={c.textDim} />
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ padding: "12px 14px", background: c.surface2, borderRadius: 12, border: `1px solid ${c.border}` }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
              <span style={{ padding: "2px 8px", borderRadius: 999, fontSize: 10, fontWeight: 700, color: EVENT_TYPE_COLOR[event.type] ?? c.primary, background: `${EVENT_TYPE_COLOR[event.type] ?? c.primary}10`, border: `1px solid ${EVENT_TYPE_COLOR[event.type] ?? c.primary}25` }}>{event.type}</span>
              <span style={{ fontSize: 11, color: c.textDim }}>by {event.organizer}</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: c.text, marginBottom: 6 }}>{event.title}</div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[{ icon: "calendar", val: event.date }, { icon: "clock", val: event.time }, { icon: "map", val: event.location }].map(f => (
                <div key={f.val} style={{ display: "flex", gap: 4, alignItems: "center" }}>
                  <Ic n={f.icon} size={11} color={c.textDim} />
                  <span style={{ fontSize: 11, color: c.textDim }}>{f.val}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, marginBottom: 6 }}>Optional Message <span style={{ fontWeight: 400, color: c.textDim }}>(your note to students)</span></div>
            <textarea value={msg} onChange={e => setMsg(e.target.value)} rows={3} style={ta} placeholder={`"This workshop may be useful for students interested in AI. Registration closes ${event.regDeadline}."`} />
          </div>
          <div style={{ padding: "12px 14px", borderRadius: 12, background: `${c.primary}08`, border: `1px solid ${c.primary}20` }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
              <Ic n="shield" size={13} color={c.primary} />
              <span style={{ fontSize: 12, fontWeight: 700, color: c.primary }}>Target Audience · Automatically Assigned</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["CSE", "Batch 52", "Section B"].map(chip => (
                <span key={chip} style={{ padding: "2px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, background: `${c.primary}12`, color: c.primary, border: `1px solid ${c.primary}25` }}>{chip}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <GhostBtn onClick={onClose}>Cancel</GhostBtn>
            <PrimaryBtn icon="eye" onClick={() => setScreen("preview")}>Preview</PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

type AddEventField = { title: string; eventType: string; organizer: string; organizerType: string; description: string; date: string; startTime: string; endTime: string; location: string; regDeadline: string; regLink: string; sourceLink: string };

function AddExternalEventModal({ onClose }: { onClose: () => void }) {
  const { theme } = useTheme();
  const c = tok(theme);
  const [screen, setScreen] = useState<"form" | "success">("form");
  const [f, setF] = useState<AddEventField>({ title: "", eventType: "External Workshop", organizer: "", organizerType: "", description: "", date: "", startTime: "", endTime: "", location: "", regDeadline: "", regLink: "", sourceLink: "" });
  const inp: React.CSSProperties = { width: "100%", padding: "9px 12px", borderRadius: 9, border: `1px solid ${c.border}`, background: c.surface2, color: c.text, fontSize: 13, fontFamily: "Inter", outline: "none", boxSizing: "border-box" };
  const sel: React.CSSProperties = { ...inp, cursor: "pointer" };
  const ta: React.CSSProperties = { ...inp, resize: "vertical" };
  const lbl = (t: string) => <div style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, marginBottom: 5 }}>{t}</div>;
  const up = (k: keyof AddEventField) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF(p => ({ ...p, [k]: e.target.value }));

  if (screen === "success") return (
    <div style={{ position: "fixed", inset: 0, background: c.overlay, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: c.surface, borderRadius: 20, padding: "44px 36px", maxWidth: 400, width: "90%", textAlign: "center", boxShadow: c.cardShadow }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(16,185,129,0.1)", border: "2px solid rgba(16,185,129,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <Ic n="check" size={24} color="#10B981" />
        </div>
        <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 18, color: c.text, marginBottom: 8 }}>Event Added</div>
        <div style={{ fontSize: 13, color: c.textDim, marginBottom: 6 }}>{f.title || "External Event"}</div>
        <div style={{ fontSize: 12, color: c.textDim, marginBottom: 24 }}>You can now share it with your class.</div>
        <PrimaryBtn onClick={onClose}>Done</PrimaryBtn>
      </div>
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: c.overlay, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: c.surface, borderRadius: 20, padding: "28px 30px", maxWidth: 540, width: "95%", boxShadow: c.cardShadow, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 17, color: c.text }}>Add External Event</div>
            <div style={{ fontSize: 12, color: c.textDim, marginTop: 2 }}>Add an external event to share with your class</div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${c.border}`, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ic n="x" size={15} color={c.textDim} />
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          <div>{lbl("Event Title *")}<input value={f.title} onChange={up("title")} style={inp} placeholder="e.g. AI & Machine Learning Workshop" /></div>
          <div>{lbl("Event Type *")}<select value={f.eventType} onChange={up("eventType")} style={sel}>{["External Workshop", "External Event", "Seminar", "Competition", "Hackathon", "Career Event", "Other"].map(t => <option key={t}>{t}</option>)}</select></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>{lbl("Organizer Name *")}<input value={f.organizer} onChange={up("organizer")} style={inp} placeholder="e.g. Tech Organization" /></div>
            <div>{lbl("Organizer Type")}<input value={f.organizerType} onChange={up("organizerType")} style={inp} placeholder="e.g. External Organization" /></div>
          </div>
          <div>{lbl("Description")}<textarea value={f.description} onChange={up("description")} rows={3} style={ta} placeholder="What is this event about?" /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div>{lbl("Date *")}<input value={f.date} onChange={up("date")} style={inp} placeholder="Sep 20" /></div>
            <div>{lbl("Start Time")}<input value={f.startTime} onChange={up("startTime")} style={inp} placeholder="10:00 AM" /></div>
            <div>{lbl("End Time")}<input value={f.endTime} onChange={up("endTime")} style={inp} placeholder="4:00 PM" /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>{lbl("Location")}<input value={f.location} onChange={up("location")} style={inp} placeholder="University Auditorium" /></div>
            <div>{lbl("Registration Deadline")}<input value={f.regDeadline} onChange={up("regDeadline")} style={inp} placeholder="Sep 15" /></div>
          </div>
          <div>{lbl("Registration Link")}<input value={f.regLink} onChange={up("regLink")} style={inp} placeholder="https://..." /></div>
          <div>{lbl("Source Link")}<input value={f.sourceLink} onChange={up("sourceLink")} style={inp} placeholder="Event page or announcement link" /></div>
          <div style={{ padding: "10px 12px", borderRadius: 10, background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)", fontSize: 11, color: "#92400E" }}>
            ℹ️ This event will be clearly labeled as an external event shared by you as CR — not an official university event.
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <GhostBtn onClick={onClose}>Cancel</GhostBtn>
            <PrimaryBtn icon="check" onClick={() => { if (f.title && f.organizer) setScreen("success"); }}>Add Event</PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventDetailModal({ event, onClose, onShare }: { event: typeof EVENTS_DATA[0]; onClose: () => void; onShare: () => void }) {
  const { theme } = useTheme();
  const c = tok(theme);
  const col = EVENT_TYPE_COLOR[event.type] ?? c.primary;
  const regColor = event.regStatus === "Open" ? "#10B981" : event.regStatus === "Closing Soon" ? "#F59E0B" : "#EF4444";

  return (
    <div style={{ position: "fixed", inset: 0, background: c.overlay, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: c.surface, borderRadius: 20, padding: "28px 30px", maxWidth: 540, width: "95%", boxShadow: c.cardShadow, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
              <span style={{ padding: "2px 9px", borderRadius: 999, fontSize: 10, fontWeight: 700, color: col, background: `${col}10`, border: `1px solid ${col}25` }}>{event.type}</span>
              {event.sharedByYou && <span style={{ padding: "2px 9px", borderRadius: 999, fontSize: 10, fontWeight: 700, color: "#8B5CF6", background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}>Shared by CR</span>}
            </div>
            <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 18, color: c.text, marginBottom: 4 }}>{event.title}</div>
            <div style={{ fontSize: 13, color: c.textDim }}>Organized by: {event.organizer} · {event.organizerType}</div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${c.border}`, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: 12 }}>
            <Ic n="x" size={15} color={c.textDim} />
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ padding: "13px 15px", background: c.surface2, borderRadius: 12, border: `1px solid ${c.border}`, fontSize: 13, color: c.text, lineHeight: 1.6 }}>{event.about}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "Date", value: event.date },
              { label: "Time", value: event.time },
              { label: "Location", value: event.location },
              { label: "Registration Deadline", value: event.regDeadline },
              { label: "Source", value: event.source },
              { label: "Organizer Type", value: event.organizerType },
            ].map(row => (
              <div key={row.label} style={{ padding: "10px 12px", background: c.surface2, borderRadius: 10, border: `1px solid ${c.border}` }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>{row.label}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: c.text }}>{row.value}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: `${regColor}08`, border: `1px solid ${regColor}30`, borderRadius: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: regColor, flexShrink: 0 }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: regColor }}>Registration {event.regStatus}</span>
            {event.regStatus !== "Closed" && <span style={{ fontSize: 11, color: c.textDim }}>→ You may be redirected to the organizer&apos;s registration page.</span>}
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <GhostBtn onClick={onClose}>Close</GhostBtn>
            {!event.sharedByYou && <PrimaryBtn icon="megaphone" onClick={() => { onClose(); onShare(); }}>Share with Section</PrimaryBtn>}
          </div>
        </div>
      </div>
    </div>
  );
}

function CREventsPage() {
  const { theme } = useTheme();
  const c = tok(theme);
  const ALL_FILTERS = ["All", "University", "Department", "Club", "External", "Workshop", "Competition", "Seminar", "Hackathon", "Career"] as const;
  const [filter, setFilter] = useState<typeof ALL_FILTERS[number]>("All");
  const [search, setSearch] = useState("");
  const [shareFor, setShareFor] = useState<typeof EVENTS_DATA[0] | null>(null);
  const [detailFor, setDetailFor] = useState<typeof EVENTS_DATA[0] | null>(null);
  const [showAddExt, setShowAddExt] = useState(false);

  const regColor = (s: RegStatus) => s === "Open" ? "#10B981" : s === "Closing Soon" ? "#F59E0B" : "#EF4444";

  const visible = EVENTS_DATA.filter(e => {
    const matchF = filter === "All" || e.type === filter;
    const matchS = !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.organizer.toLowerCase().includes(search.toLowerCase()) || e.type.toLowerCase().includes(search.toLowerCase());
    return matchF && matchS;
  });

  const sharedByYou = EVENTS_DATA.filter(e => e.sharedByYou);
  const closingSoon = EVENTS_DATA.filter(e => e.regStatus === "Closing Soon");
  const thisWeek = EVENTS_DATA.filter((_, i) => i < 3);

  const summaryStats = [
    { label: "Upcoming Events", value: String(EVENTS_DATA.length), icon: "🎉", color: c.primary, bg: `${c.primary}15` },
    { label: "Shared by You", value: String(sharedByYou.length), icon: "📢", color: "#8B5CF6", bg: "rgba(139,92,246,0.12)" },
    { label: "Registration Closing Soon", value: String(closingSoon.length), icon: "⏰", color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
    { label: "This Week", value: String(thisWeek.length), icon: "📅", color: "#10B981", bg: "rgba(16,185,129,0.12)" },
  ];

  return (
    <>
      {shareFor && <ShareEventWithSectionModal event={shareFor} onClose={() => setShareFor(null)} />}
      {detailFor && <EventDetailModal event={detailFor} onClose={() => setDetailFor(null)} onShare={() => setShareFor(detailFor)} />}
      {showAddExt && <AddExternalEventModal onClose={() => setShowAddExt(false)} />}

      <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 80px", background: c.bg }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
            <div>
              <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 24, color: c.text, letterSpacing: "-0.02em", marginBottom: 4 }}>Events</h1>
              <p style={{ fontSize: 13, color: c.textMuted }}>Discover and share relevant events, workshops, and opportunities with your class.</p>
              <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                {["CSE", "Batch 52", "Section B"].map(chip => (
                  <span key={chip} style={{ padding: "3px 11px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: `${c.primary}10`, color: c.primary, border: `1px solid ${c.primary}22` }}>{chip}</span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <GhostBtn icon="plus" onClick={() => setShowAddExt(true)}>Add External Event</GhostBtn>
              <PrimaryBtn icon="megaphone" onClick={() => setShareFor(EVENTS_DATA[0])}>Share Event</PrimaryBtn>
            </div>
          </div>

          {/* Summary cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
            {summaryStats.map(s => (
              <div key={s.label} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: "14px 18px", boxShadow: c.cardShadow, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: s.color, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: c.text, marginTop: 2 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 2-col layout */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 310px", gap: 20, alignItems: "flex-start" }}>

            {/* Left: search + filters + events */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Search + filter bar */}
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "16px 20px", boxShadow: c.cardShadow }}>
                <div style={{ position: "relative", marginBottom: 12 }}>
                  <div style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}><Ic n="search" size={14} color={c.textDim} /></div>
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events..." style={{ width: "100%", padding: "9px 12px 9px 34px", borderRadius: 10, border: `1px solid ${c.border}`, background: c.surface2, color: c.text, fontSize: 13, fontFamily: "Inter", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {ALL_FILTERS.map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                      style={{ padding: "5px 13px", borderRadius: 999, fontSize: 12, fontWeight: filter === f ? 700 : 500, background: filter === f ? `${c.primary}12` : "transparent", color: filter === f ? c.primary : c.textDim, border: `1px solid ${filter === f ? c.primary + "30" : c.border}`, cursor: "pointer", transition: "all 0.14s" }}>
                      {f === "All" ? "All Events" : f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Event cards */}
              {visible.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: c.textDim, background: c.surface, borderRadius: 16, border: `1px solid ${c.border}` }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>🎉</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>No events found</div>
                </div>
              ) : visible.map(ev => {
                const col = EVENT_TYPE_COLOR[ev.type] ?? c.primary;
                return (
                  <div key={ev.id} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: c.cardShadow }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                          <span style={{ padding: "2px 9px", borderRadius: 999, fontSize: 10, fontWeight: 700, color: col, background: `${col}10`, border: `1px solid ${col}25` }}>{ev.type}</span>
                          {ev.sharedByYou && <span style={{ padding: "2px 9px", borderRadius: 999, fontSize: 10, fontWeight: 700, color: "#8B5CF6", background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)" }}>Shared by CR</span>}
                          <span style={{ fontSize: 11, color: c.textDim }}>by {ev.organizer}</span>
                        </div>
                        <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text, marginBottom: 3 }}>{ev.title}</div>
                        <div style={{ fontSize: 11, color: c.textDim }}>Organized by: {ev.organizer} · {ev.organizerType}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 999, background: `${regColor(ev.regStatus)}10`, border: `1px solid ${regColor(ev.regStatus)}30`, flexShrink: 0 }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: regColor(ev.regStatus) }} />
                        <span style={{ fontSize: 10, fontWeight: 700, color: regColor(ev.regStatus) }}>Reg. {ev.regStatus}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 14, padding: "9px 12px", background: c.surface2, borderRadius: 10, border: `1px solid ${c.border}`, marginBottom: 12, flexWrap: "wrap" }}>
                      {[{ icon: "calendar", val: ev.date }, { icon: "clock", val: ev.time }, { icon: "map", val: ev.location }].map((f, i) => (
                        <div key={i} style={{ display: "flex", gap: 5, alignItems: "center" }}>
                          <Ic n={f.icon} size={12} color={c.textDim} />
                          <span style={{ fontSize: 12, fontWeight: 600, color: c.text }}>{f.val}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <GhostBtn small icon="eye" onClick={() => setDetailFor(ev)}>View Details</GhostBtn>
                      {!ev.sharedByYou
                        ? <PrimaryBtn small icon="megaphone" onClick={() => setShareFor(ev)}>Share with Section</PrimaryBtn>
                        : <div style={{ padding: "5px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600, color: "#8B5CF6", background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.2)" }}>✓ Shared {ev.sharedTime}</div>
                      }
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* My Shared Events */}
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "20px 22px", boxShadow: c.cardShadow }}>
                <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>My Shared Events</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {sharedByYou.map(ev => (
                    <div key={ev.id} style={{ padding: "10px 12px", background: c.surface2, borderRadius: 10, border: `1px solid ${c.border}` }}>
                      <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 12, color: c.text, marginBottom: 3 }}>{ev.title}</div>
                      <div style={{ fontSize: 10, color: c.textDim, marginBottom: 6 }}>Shared: {ev.sharedTime}</div>
                      <div style={{ fontSize: 10, color: c.textDim, marginBottom: 8 }}>CSE · Batch 52 · Section B</div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => setDetailFor(ev)} style={{ fontSize: 10, fontWeight: 600, color: c.primary, background: `${c.primary}10`, border: `1px solid ${c.primary}20`, padding: "3px 8px", borderRadius: 6, cursor: "pointer" }}>View</button>
                        <button style={{ fontSize: 10, fontWeight: 600, color: c.textDim, background: c.surface, border: `1px solid ${c.border}`, padding: "3px 8px", borderRadius: 6, cursor: "pointer" }}>Edit Message</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "20px 22px", boxShadow: c.cardShadow }}>
                <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>Recent Event Activity</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {EVENTS_ACTIVITY.map((a, i) => (
                    <div key={i} style={{ padding: "10px 12px", background: c.surface2, borderRadius: 10, border: `1px solid ${c.border}` }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: c.primary, marginBottom: 2 }}>{a.verb}:</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: c.text }}>{a.detail}</div>
                      <div style={{ fontSize: 10, color: c.textDim, marginTop: 3 }}>{a.time}</div>
                    </div>
                  ))}
                </div>
                <button style={{ fontSize: 12, fontWeight: 600, color: c.primary, background: "none", border: "none", cursor: "pointer", marginTop: 12, padding: 0 }}>View Activity History →</button>
              </div>

              {/* Role reminder */}
              <div style={{ padding: "14px 16px", background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.18)", borderRadius: 12 }}>
                <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 12, color: "#92400E", marginBottom: 6 }}>Role Reminder</div>
                <div style={{ fontSize: 11, color: "#78350F", lineHeight: 1.5 }}>
                  You are sharing events as CR — not as the organizer. Always show who organized the event clearly.
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── CR NOTIFICATIONS PAGE ────────────────────────────────────────────────────────

type NotifCategory = "Class" | "Routine" | "Events" | "Assignments" | "Exams" | "System";
type NotifGroup = "Today" | "Yesterday" | "Earlier";

interface CRNotif {
  id: string;
  icon: string;
  title: string;
  desc: string;
  source: string;
  time: string;
  group: NotifGroup;
  category: NotifCategory;
  unread: boolean;
  actionRequired?: boolean;
  actions?: { label: string; primary?: boolean }[];
  successColor?: string;
}

const NOTIFS: CRNotif[] = [
  { id: "n1", icon: "⚠️", title: "CSE 305 Class Update", desc: "Today's Database Management class has been delayed to 11:00 AM.", source: "CR Activity", time: "10 min ago", group: "Today", category: "Class", unread: true, actions: [{ label: "View Update", primary: true }] },
  { id: "n2", icon: "📢", title: "Department Notice", desc: "The CSE department has published an updated examination schedule.", source: "Department", time: "2 hours ago", group: "Today", category: "Exams", unread: true, actions: [{ label: "View Notice", primary: true }] },
  { id: "n3", icon: "✅", title: "Event Approved", desc: "AI & Machine Learning Workshop has been approved and added to Global Events.", source: "System", time: "3 hours ago", group: "Today", category: "Events", unread: true, actions: [{ label: "View Event", primary: true }], successColor: "#10B981" },
  { id: "n4", icon: "❗", title: "Event Submission Needs Attention", desc: "AI & Machine Learning Workshop was not approved. Reason: Event information could not be verified.", source: "System", time: "4 hours ago", group: "Today", category: "Events", unread: true, actionRequired: true, actions: [{ label: "View Reason" }, { label: "Edit Submission", primary: true }] },
  { id: "n5", icon: "📚", title: "Class Note Approved", desc: "Database Design Notes are now available to your class.", source: "System", time: "5 hours ago", group: "Today", category: "Class", unread: true, actions: [{ label: "View Material", primary: true }], successColor: "#10B981" },
  { id: "n6", icon: "📢", title: "Event Shared Successfully", desc: "Hackathon 2026 was shared with CSE · Batch 52 · Section B. 42 students notified.", source: "CR Activity", time: "Yesterday", group: "Yesterday", category: "Events", unread: false, actions: [{ label: "View Event", primary: true }] },
  { id: "n7", icon: "📝", title: "Assignment Reminder Sent", desc: "Database Assignment 02 reminder was sent to your section. 42 students notified.", source: "CR Activity", time: "Yesterday", group: "Yesterday", category: "Assignments", unread: false, actions: [{ label: "View Assignment", primary: true }] },
  { id: "n8", icon: "🎓", title: "Exam Reminder Sent", desc: "Midterm Examination reminder was sent to your section. 42 students notified.", source: "CR Activity", time: "Yesterday", group: "Yesterday", category: "Exams", unread: false, actions: [{ label: "View Exam", primary: true }] },
  { id: "n9", icon: "❗", title: "Class Note Needs Attention", desc: "Physics Lab Notes could not be approved. Please review the reason and resubmit.", source: "System", time: "Yesterday", group: "Yesterday", category: "Class", unread: false, actionRequired: true, actions: [{ label: "View Reason" }, { label: "Resubmit", primary: true }] },
  { id: "n10", icon: "📅", title: "Routine Updated", desc: "Your CSE 305 class schedule has been updated. Sunday: 10:00 AM → 11:00 AM.", source: "Department", time: "Yesterday", group: "Yesterday", category: "Routine", unread: false, actions: [{ label: "View Routine", primary: true }] },
  { id: "n11", icon: "🎓", title: "Event Submitted", desc: "AI & Machine Learning Workshop has been submitted for review. Status: Pending Review.", source: "CR Activity", time: "3 days ago", group: "Earlier", category: "Events", unread: false, actions: [{ label: "View Submission", primary: true }] },
  { id: "n12", icon: "📢", title: "University Notice", desc: "New academic calendar has been published by the university.", source: "University", time: "3 days ago", group: "Earlier", category: "System", unread: false, actions: [{ label: "View Notice", primary: true }] },
];

const NOTIF_FILTERS = ["All", "Unread", "Action Required", "Class", "Routine", "Events", "Assignments", "Exams", "System"] as const;

function CRNotificationsPage() {
  const { theme } = useTheme();
  const c = tok(theme);

  const [filter, setFilter] = useState<typeof NOTIF_FILTERS[number]>("All");
  const [readIds, setReadIds] = useState<Set<string>>(new Set(NOTIFS.filter(n => !n.unread).map(n => n.id)));
  const [allReadToast, setAllReadToast] = useState(false);

  const isRead = (id: string) => readIds.has(id);
  const markRead = (id: string) => setReadIds(p => new Set([...p, id]));
  const markAllRead = () => {
    setReadIds(new Set(NOTIFS.map(n => n.id)));
    setAllReadToast(true);
    setTimeout(() => setAllReadToast(false), 3000);
  };

  const unreadCount = NOTIFS.filter(n => !isRead(n.id)).length;
  const actionCount = NOTIFS.filter(n => n.actionRequired).length;
  const totalCount = NOTIFS.length;

  const visible = NOTIFS.filter(n => {
    if (filter === "Unread") return !isRead(n.id);
    if (filter === "Action Required") return !!n.actionRequired;
    if (filter === "All") return true;
    return n.category === filter;
  });

  const groups: NotifGroup[] = ["Today", "Yesterday", "Earlier"];

  const sourceColor: Record<string, string> = {
    "CR Activity": "#8B5CF6", "Department": "#2563EB", "University": "#2563EB",
    "Teacher": "#06B6D4", "Club": "#10B981", "System": "#6B7280",
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 80px", background: c.bg }}>
      {/* Toast */}
      {allReadToast && (
        <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", padding: "10px 20px", background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, boxShadow: c.cardShadow, fontSize: 13, fontWeight: 600, color: c.text, zIndex: 900, whiteSpace: "nowrap" }}>
          ✓ All notifications marked as read.
        </div>
      )}

      <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 24, color: c.text, letterSpacing: "-0.02em", marginBottom: 4 }}>Notifications</h1>
            <p style={{ fontSize: 13, color: c.textMuted }}>Stay updated on your class coordination and important activities.</p>
          </div>
          <button onClick={markAllRead}
            style={{ padding: "8px 16px", borderRadius: 10, border: `1px solid ${c.border}`, background: c.surface, color: c.textMuted, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "Inter", whiteSpace: "nowrap" }}>
            Mark all as read
          </button>
        </div>

        {/* Summary row */}
        <div style={{ display: "flex", gap: 10, padding: "14px 18px", background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, boxShadow: c.cardShadow }}>
          {[
            { label: "All", value: totalCount, color: c.textDim, active: filter === "All" },
            { label: "Unread", value: unreadCount, color: c.primary, active: filter === "Unread" },
            { label: "Action Required", value: actionCount, color: "#EF4444", active: filter === "Action Required" },
          ].map(s => (
            <button key={s.label} onClick={() => setFilter(s.label as typeof NOTIF_FILTERS[number])}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 20, border: `1px solid ${s.active ? s.color + "40" : c.border}`, background: s.active ? `${s.color}08` : "transparent", cursor: "pointer", transition: "all 0.14s" }}>
              <span style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 18, color: s.color, lineHeight: 1 }}>{s.value}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: s.active ? s.color : c.textDim }}>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Category filter strip */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {NOTIF_FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: "5px 13px", borderRadius: 999, fontSize: 12, fontWeight: filter === f ? 700 : 500, background: filter === f ? `${c.primary}12` : c.surface, color: filter === f ? c.primary : c.textDim, border: `1px solid ${filter === f ? c.primary + "30" : c.border}`, cursor: "pointer", transition: "all 0.12s" }}>
              {f}
            </button>
          ))}
        </div>

        {/* Empty state */}
        {visible.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18 }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🔔</div>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 16, color: c.text, marginBottom: 6 }}>
              {filter === "Unread" ? "You're all caught up." : filter === "Action Required" ? "No actions required." : "No notifications."}
            </div>
            <div style={{ fontSize: 13, color: c.textDim }}>
              {filter === "Unread" ? "You don't have any unread notifications." : filter === "Action Required" ? "No actions are currently required." : "Nothing here yet."}
            </div>
          </div>
        )}

        {/* Grouped notification list */}
        {groups.map(group => {
          const items = visible.filter(n => n.group === group);
          if (!items.length) return null;
          return (
            <div key={group}>
              <div style={{ fontSize: 11, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>{group}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {items.map(n => {
                  const read = isRead(n.id);
                  const accentColor = n.actionRequired ? "#EF4444" : (n.successColor ?? c.primary);
                  return (
                    <div key={n.id}
                      onClick={() => markRead(n.id)}
                      style={{ position: "relative", background: read ? c.surface : (theme === "dark" ? "rgba(37,99,235,0.05)" : "rgba(37,99,235,0.03)"), border: `1px solid ${n.actionRequired ? "rgba(239,68,68,0.2)" : read ? c.border : `${c.primary}20`}`, borderRadius: 14, padding: "14px 16px 14px 20px", cursor: "pointer", transition: "background 0.12s" }}>

                      {/* Unread dot */}
                      {!read && (
                        <div style={{ position: "absolute", left: 7, top: "50%", transform: "translateY(-50%)", width: 7, height: 7, borderRadius: "50%", background: c.primary }} />
                      )}

                      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        {/* Icon */}
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: `${accentColor}10`, border: `1px solid ${accentColor}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>
                          {n.icon}
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 3 }}>
                            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                              <span style={{ fontFamily: "Manrope", fontWeight: read ? 600 : 800, fontSize: 13, color: read ? c.textMuted : c.text }}>{n.title}</span>
                              {n.actionRequired && (
                                <span style={{ padding: "1px 7px", borderRadius: 999, fontSize: 10, fontWeight: 700, color: "#EF4444", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>Action Required</span>
                              )}
                            </div>
                            <span style={{ fontSize: 11, color: c.textDim, whiteSpace: "nowrap", flexShrink: 0 }}>{n.time}</span>
                          </div>

                          <div style={{ fontSize: 12, color: read ? c.textDim : c.textMuted, lineHeight: 1.5, marginBottom: 8 }}>{n.desc}</div>

                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                            <span style={{ padding: "2px 8px", borderRadius: 999, fontSize: 10, fontWeight: 600, color: sourceColor[n.source] ?? c.textDim, background: `${sourceColor[n.source] ?? c.textDim}10`, border: `1px solid ${sourceColor[n.source] ?? c.textDim}20` }}>
                              {n.source}
                            </span>
                            {n.actions && (
                              <div style={{ display: "flex", gap: 7 }} onClick={e => e.stopPropagation()}>
                                {n.actions.map(a => (
                                  <button key={a.label}
                                    style={{
                                      padding: "4px 11px", borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all 0.12s",
                                      background: a.primary ? `${accentColor}12` : "transparent",
                                      color: a.primary ? accentColor : c.textDim,
                                      border: `1px solid ${a.primary ? accentColor + "30" : c.border}`
                                    }}>
                                    {a.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}

// ─── CR PORTAL ROOT ───────────────────────────────────────────────────────────────
export default function CRPortal({ onBack }: { onBack?: () => void } = {}) {
  const router = useRouter();
  const goToStudentPortal = onBack ?? (() => router.push("/dashboard"));
  const { theme } = useTheme();
  const c = tok(theme);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [mobSidebar, setMobSidebar] = useState(false);

  const handleSetActive = (id: string) => {
    setMobSidebar(false);
    setActiveNav(id);
  };

  const renderMain = () => {
    if (activeNav === "materials") return <MaterialsPage />;
    if (activeNav === "routine") return <RoutineView />;
    if (activeNav === "classupdates") return <CRClassUpdatesPage />;
    if (activeNav === "assignments") return <CRAssignmentsPage />;
    if (activeNav === "exams") return <CRExamsPage />;
    if (activeNav === "events") return <CREventsPage />;
    if (activeNav === "notifications") return <CRNotificationsPage />;
    return <CRDashboardHome onNavigate={handleSetActive} />;
  };

  return (
    <>
      <style>{`
        .cr-mobile-menu-btn { display: none !important; }
        @media (max-width: 900px) {
          .cr-mobile-menu-btn { display: flex !important; }
          .cr-sidebar { position: fixed; left: -260px; top: 0; bottom: 0; z-index: 45; transition: left 0.28s ease; }
          .cr-sidebar.open { left: 0; box-shadow: 4px 0 24px rgba(0,0,0,0.18); }
        }
      `}</style>

      {mobSidebar && (
        <div onClick={() => setMobSidebar(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 44, backdropFilter: "blur(4px)" }} />
      )}

      <div style={{ display: "flex", height: "100dvh", background: c.bg, overflow: "hidden" }}>
        {/* Sidebar */}
        <div className={`cr-sidebar${mobSidebar ? " open" : ""}`} style={{ height: "100vh", zIndex: 45, flexShrink: 0 }}>
          <CRSidebar active={activeNav} setActive={handleSetActive} onClose={() => setMobSidebar(false)} />
        </div>

        {/* Main */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0, minWidth: 0 }}>
          <CRHeader onMenuClick={() => setMobSidebar(true)} onBack={goToStudentPortal} />
          {renderMain()}
        </div>
      </div>
    </>
  );
}
