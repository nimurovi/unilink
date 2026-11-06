"use client";
import ClubsView from '@/components/ui/ClubsView';
import OpportunitiesView from '@/components/ui/OpportunitiesView';
import DirectoryView from '@/components/ui/DirectoryView';
import AccountView from '@/components/ui/AccountView';
import {useAccount} from '@/lib/account';
import {accountClass,accountInitial} from '@/lib/account-types';
import EventsView,{EventEditor,UpcomingEvents,useEventClock} from '@/components/ui/EventsView';
import {useEvent} from '@/lib/events';
import NotificationsPage from "@/app/notifications/NotificationsView";
import {useNotifications} from "@/lib/notifications";
import AnnouncementsView,{AnnouncementEditor,AnnouncementsFeed} from "@/components/ui/AnnouncementsView";
import ExamsView,{ExamEditor,UpcomingExams} from "@/components/ui/ExamsView";
import RoutineView,{RoutineEditor,TodayRoutine} from "@/components/ui/RoutineView";
import {useRoutine,useRoutineClock} from "@/lib/routine";
import AssignmentsView from "@/app/assignments/AssignmentsView";
import AssignmentEditor from "@/components/ui/AssignmentEditor";
import MaterialUpload from "@/components/ui/MaterialUpload";
import { useMaterials } from "@/lib/materials";
import MaterialsPage from "@/app/materials/page";
import { useState, useRef, useEffect, useContext } from "react";
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
  { group: "OVERVIEW", items: [{ id: "dashboard", label: "Dashboard", icon: "home" }, { id: "notifications", label: "Notifications", icon: "bell" }] },
  { group: "ACADEMIC", items: [{ id: "routine", label: "Routine", icon: "calendar" }, { id: "materials", label: "Class Materials", icon: "folder" }, { id: "assignments", label: "Assignments", icon: "clipboard" }, { id: "exams", label: "Exams", icon: "award" }] },
  { group: "CLASS MANAGEMENT", items: [{ id: "classupdates", label: "Class Updates", icon: "alert" }, { id: "announcements", label: "Announcements", icon: "megaphone" }] },
  { group: "ACCOUNT", items: [{ id: "profile", label: "My Profile", icon: "user" }, { id: "settings", label: "Account Settings", icon: "settings" }] },
  { group: "CAMPUS", items: [{ id: "clubs", label: "Clubs & Communities", icon: "user" }, { id: "opportunities", label: "Opportunities", icon: "event" }, { id: "directory", label: "Class Directory", icon: "user" }, { id: "events", label: "Events", icon: "event" }] },
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
  const {account}=useAccount();
  const unread=useNotifications().entries.filter(e=>e.unread).length;
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
                  {(item.id === "notifications" ? unread > 0 : item.badge) && (
                    <span style={{ padding: "1px 6px", borderRadius: 999, fontSize: 10, fontWeight: 700, background: c.primary + "18", color: c.primary, border: `1px solid ${c.primary}22` }}>{item.id === "notifications" ? unread : item.badge}</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* CR profile */}
      <div style={{ padding: "14px 16px", borderTop: `1px solid ${c.border}`, display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${c.primary}, #38BDF8)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 15, fontWeight: 700, color: "#fff", fontFamily: "Manrope" }}>{accountInitial(account)}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{account?.fullName||'Account'}</div>
          <div style={{ fontSize: 11, color: c.textDim }}>{account?.role==='admin'?'Admin':'CR'} · {accountClass(account)}</div>
        </div>
        <Ic n="shield" size={14} color={c.primary} />
      </div>
    </div>
  );
}

// ─── CR HEADER ───────────────────────────────────────────────────────────────────
function CRHeader({ onMenuClick, onBack, onNotifications }: { onMenuClick: () => void; onBack: () => void; onNotifications: () => void }) {
  const { theme, toggle } = useTheme();
  const c = tok(theme);
  const {account}=useAccount();
  const unread=useNotifications().entries.filter(e=>e.unread).length;
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
        <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{greeting}, {account?.fullName||'there'} 👋</div>
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
      <button aria-label={`Notifications: ${unread} unread`} onClick={onNotifications} style={{ position: "relative", background: "none", border: "none", cursor: "pointer", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 9, transition: "background 0.14s" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = c.surface2)}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "none")}
      >
        <Ic n="bell" size={18} color={c.textMuted} />
        {unread > 0 && <div style={{ position: "absolute", top: 7, right: 7, width: 8, height: 8, borderRadius: "50%", background: "#EF4444", border: `2px solid ${c.surface}` }} />}
      </button>

      {/* Theme toggle */}
      <button onClick={toggle} style={{ background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 9, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.16s" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = c.surface3)}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = c.surface2)}
      >
        <Ic n={theme === "light" ? "moon" : "sun"} size={15} color={c.textMuted} />
      </button>

      {/* Avatar */}
      <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${c.primary}, #38BDF8)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: "#fff", cursor: "pointer" }}>{accountInitial(account)}</div>

      {/* Return to CR dashboard */}
      <button onClick={onBack} style={{ background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 9, padding: "6px 12px", fontSize: 12, fontWeight: 600, color: c.textMuted, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "Inter", whiteSpace: "nowrap" }}>
        CR Dashboard
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
function CreateAnnouncementModal({onClose}:{onClose:()=>void}){return <AnnouncementEditor onClose={onClose}/>;}

// Update Routine Modal
function UpdateRoutineModal({onClose}:{onClose:()=>void}){return <RoutineEditor onClose={onClose}/>;}

// Add Exam Modal
function AddExamModal({onClose}:{onClose:()=>void}){return <ExamEditor onClose={onClose}/>;}

// Create Event Modal
function CreateEventModal({onClose}:{onClose:()=>void}){return <EventEditor onClose={onClose}/>;}

// ─── CR DASHBOARD HOME ────────────────────────────────────────────────────────────

type UpdateType = "Class Delayed" | "Class Cancelled" | "Room Changed" | "Extra Class" | "Schedule Changed" | "General Class Information";

function PostClassUpdateModal({ onClose }: { onClose: () => void }) {
  const {account}=useAccount();
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
          <p style={{ fontSize: 12, color: c.textMuted }}>Published updates are shared with students in your registered class.</p>
          {/* Locked audience */}
          <div style={{ padding: "12px 14px", borderRadius: 12, background: `${c.primary}08`, border: `1px solid ${c.primary}20` }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
              <Ic n="shield" size={13} color={c.primary} />
              <span style={{ fontSize: 12, fontWeight: 700, color: c.primary }}>Target Audience · Automatically Assigned</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {(account?[account.department,account.batch,account.section]:[]).map(chip => (
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

function CRDashboardHome({ onNavigate }: { onNavigate: (id: string) => void }) {
  const {account}=useAccount();
  const routine=useRoutine(),routineClock=useRoutineClock();
  const allClassUpdates = useClassUpdates();
  const materialData = useMaterials();
  const liveMaterials = materialData.materials;
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);
  const { theme } = useTheme();
  const c = tok(theme);
  const [modal, setModal] = useState<string | null>(null);
  const eventData=useEvent(),eventClock=useEventClock();

  const quickActions = [
    { label: "Post Class Update", icon: "alert", modal: "postUpdate", primary: true },
    { label: "Add Weekly Class", icon: "calendar", modal: "routine" },
    { label: "Upload Class Note", icon: "upload", modal: "material" },
    { label: "Create Event", icon: "event", modal: "event" },
    { label: "Announcement", icon: "megaphone", modal: "announcement" },
  ];

  const stats = [
    { label: "Today's Classes", value: routine.loading||routine.error||!routineClock?"—":String(routine.entries.filter(e=>e.weekday===routineClock.day).length), sub: "Scheduled today", icon: "📚", color: c.primary, bg: `rgba(37,99,235,0.1)` },
    { label: "Active Updates", value: String(allClassUpdates.filter(update => update.status === "published").length), sub: "Posted by you", icon: "⚠️", color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
    { label: "Upcoming Events", value: eventData.loading||eventData.error||eventClock===null?"—":String(eventData.entries.filter(e=>!e.cancelled&&new Date(e.endsAt).getTime()>eventClock).length), sub: "In your class", icon: "🎪", color: "#8B5CF6", bg: "rgba(139,92,246,0.1)" },
    { label: "Materials Shared", value: String(liveMaterials.length), sub: "Class notes shared", icon: "📄", color: "#10B981", bg: "rgba(16,185,129,0.1)" },
    { label: "Material Courses", value: String(new Set(liveMaterials.map(m=>m.code)).size), sub: "Courses with files", icon: "⏳", color: "#64748B", bg: "rgba(100,116,139,0.1)" },
  ];


  const classUpdates = allClassUpdates.filter(update => update.status === "published");

  const materialStats = [
    {label:"Total Materials",value:liveMaterials.length,desc:"Shared with this class",color:"#2563EB",bg:"rgba(37,99,235,0.08)"},
    {label:"Class Notes",value:liveMaterials.filter(m=>m.type==="Notes").length,desc:"Published notes",color:"#8B5CF6",bg:"rgba(139,92,246,0.08)"},
    {label:"Saved",value:materialData.savedIds.length,desc:"Your bookmarks",color:"#10B981",bg:"rgba(16,185,129,0.08)"},
    {label:"Courses",value:new Set(liveMaterials.map(m=>m.code)).size,desc:"Courses with files",color:"#F59E0B",bg:"rgba(245,158,11,0.08)"},
  ];

  const recentActivity = [
    { verb: "You updated", detail: "CSE 305 Class Time", time: "Yesterday", icon: "calendar" },
    { verb: "You uploaded", detail: "Database Normalization Notes", time: "2 days ago", icon: "upload" },
    { verb: "You posted", detail: "Midterm syllabus announcement", time: "3 days ago", icon: "megaphone" },
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
                {(account?[account.department,account.batch,account.section]:[]).map((chip) => (
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
                    onClick={() => setModal(a.modal)}
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

              <UpcomingEvents onView={()=>onNavigate('events')} onAdd={()=>setModal('event')}/>

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

              <AnnouncementsFeed onView={()=>onNavigate("announcements")} onAdd={()=>setModal("announcement")}/>

              <UpcomingExams onView={()=>onNavigate("exams")} onAdd={()=>setModal("exam")}/>

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
  const {account}=useAccount();
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
                  <div style={{ fontSize: 11, color: c.textDim, paddingLeft: 24 }}>Published {upd.time} · {accountClass(account)}</div>
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

// ─── CR PORTAL ROOT ───────────────────────────────────────────────────────────────
export default function CRPortal() {

  const { theme } = useTheme();
  const c = tok(theme);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [mobSidebar, setMobSidebar] = useState(false);

  const handleSetActive = (id: string) => {
    setMobSidebar(false);
    setActiveNav(id);
  };

  const renderMain = () => {
    if (activeNav === "clubs") return <ClubsView/>;
    if (activeNav === "opportunities") return <OpportunitiesView/>;
    if (activeNav === "directory") return <DirectoryView/>;
    if (activeNav === "profile") return <AccountView/>;
    if (activeNav === "settings") return <AccountView settings/>;
    if (activeNav === "materials") return <MaterialsPage />;
    if (activeNav === "routine") return <RoutineView />;
    if (activeNav === "classupdates") return <CRClassUpdatesPage />;
    if (activeNav === "assignments") return <CRAssignmentsPage />;
    if (activeNav === "announcements") return <AnnouncementsView />;
    if (activeNav === "exams") return <ExamsView />;
    if (activeNav === "events") return <EventsView />;
    if (activeNav === "notifications") return <NotificationsPage onNavigate={id => handleSetActive(id === "class-updates" ? "classupdates" : id)} />;
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
          <CRHeader onNotifications={() => setActiveNav("notifications")} onMenuClick={() => setMobSidebar(true)} onBack={() => setActiveNav("dashboard")} />
          {renderMain()}
        </div>
      </div>
    </>
  );
}
