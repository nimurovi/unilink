"use client";
import {useRoutine,useRoutineClock} from "@/lib/routine";
import {TodayRoutine} from "@/components/ui/RoutineView";
import { useState, useRef, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { useClassUpdates } from "@/lib/class-updates";
import { ClassUpdatesFeed } from "@/components/ui/ClassUpdatesFeed";
import { ThemeCtx } from "@/components/ui/Theme";
import { MyCourses, CourseDetail } from "@/app/courses/CoursesView";
import RoutinePage from "@/app/routine/page";
import { useAssignments } from "@/lib/assignments";
import AssignmentsPage from "@/app/assignments/AssignmentsView";
import ExamsPage from "@/app/exams/page";
import { useMaterials, downloadMaterial } from "@/lib/materials";
import MaterialsPage from "@/app/materials/page";
import AnnouncementsPage from "@/app/announcements/page";
import EventsPage from "@/app/events/page";
import ClubsPage from "@/app/clubs/page";
import OpportunitiesPage from "@/app/opportunities/page";
import LostFoundPage from "@/app/lost-found/page";
import NotificationsPage, { INITIAL_UNREAD } from "@/app/notifications/NotificationsView";
import DirectoryPage from "@/app/directory/page";
import SettingsPage from "@/app/settings/page";
import AchievementsPage from "@/app/achievements/page";
import ProfilePage from "@/app/profile/page";
import HelpPage from "@/app/help/page";

type CourseItem = {
  id: string; code: string; name: string; instructor: string; section: string;
  semester: string; nextClass: string; assignmentDue: string; progress: number;
  color: string; icon: string; room: string;
};

type Theme = "light" | "dark";
const useTheme = () => useContext(ThemeCtx);

// ─── TOKENS ────────────────────────────────────────────────────────────────────
const LIGHT = {
  bg: "#F8FAFC", surface: "#FFFFFF", surface2: "#F1F5F9", surface3: "#E2E8F0",
  primary: "#2563EB", primaryDark: "#1D4ED8", primaryFg: "#FFFFFF",
  text: "#0F172A", textMuted: "#64748B", textDim: "#94A3B8",
  border: "#E2E8F0", borderStrong: "#CBD5E1",
  cardShadow: "0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)",
  primaryGlow: "rgba(37,99,235,0.14)",
  badge: { bg: "rgba(37,99,235,0.08)", text: "#2563EB", border: "rgba(37,99,235,0.18)" },
  sidebar: "#FFFFFF",
  sidebarBorder: "#E2E8F0",
  activeNav: { bg: "#EFF6FF", text: "#2563EB", border: "rgba(37,99,235,0.18)" },
  highlight: "#EFF6FF",
};
const DARK = {
  bg: "#080D1A", surface: "#0F172A", surface2: "#172033", surface3: "#1E293B",
  primary: "#3B82F6", primaryDark: "#2563EB", primaryFg: "#FFFFFF",
  text: "#F8FAFC", textMuted: "#94A3B8", textDim: "#475569",
  border: "#1E293B", borderStrong: "#334155",
  cardShadow: "0 1px 4px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2)",
  primaryGlow: "rgba(59,130,246,0.2)",
  badge: { bg: "rgba(59,130,246,0.14)", text: "#60A5FA", border: "rgba(59,130,246,0.24)" },
  sidebar: "#0F172A",
  sidebarBorder: "#1E293B",
  activeNav: { bg: "rgba(59,130,246,0.14)", text: "#60A5FA", border: "rgba(59,130,246,0.22)" },
  highlight: "rgba(37,99,235,0.08)",
};
const tok = (t: Theme) => t === "light" ? LIGHT : DARK;

// ─── ICON SYSTEM ───────────────────────────────────────────────────────────────
const IP: Record<string, string[]> = {
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
  briefcase: ["M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", "M2 7h20v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7z"],
  search: ["M21 21l-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z"],
  settings: ["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"],
  user: ["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  help: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", "M12 17h.01"],
  sun: ["M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42", "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"],
  moon: ["M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"],
  arrow: ["M5 12h14M12 5l7 7-7 7"],
  check: ["M20 6L9 17l-5-5"],
  x: ["M18 6L6 18M6 6l12 12"],
  more: ["M12 5h.01M12 12h.01M12 19h.01"],
  download: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M7 10l5 5 5-5", "M12 15V3"],
  map: ["M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z", "M12 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"],
  sparkle: ["M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z"],
  send: ["M22 2L11 13", "M22 2L15 22l-4-9-9-4 20-7z"],
  link: ["M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"],
  flag: ["M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z", "M4 22v-7"],
  save: ["M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z", "M17 21v-8H7v8M7 3v5h8"],
  menu: ["M3 6h18M3 12h18M3 18h18"],
  shield: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
};

function Ic({ n, size = 16, color = "currentColor" }: { n: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      {(IP[n] ?? []).map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

// ─── NAV DATA ─────────────────────────────────────────────────────────────────
type NavItem = { id: string; label: string; icon: string; badge?: number };
type NavGroup = { group: string; items: NavItem[] };
const NAV: NavGroup[] = [
  {
    group: "OVERVIEW", items: [
      { id: "dashboard", label: "Dashboard", icon: "home" },
      { id: "notifications", label: "Notifications", icon: "bell", badge: 8 },
    ]
  },
  {
    group: "ACADEMIC", items: [
      { id: "courses", label: "My Courses", icon: "book" },
      { id: "routine", label: "Routine", icon: "calendar" },
      { id: "assignments", label: "Assignments", icon: "clipboard" },
      { id: "materials", label: "Class Materials", icon: "folder" },
      { id: "exams", label: "Exams & Deadlines", icon: "award" },
    ]
  },
  {
    group: "CAMPUS", items: [
      { id: "announcements", label: "Announcements", icon: "megaphone", badge: 3 },
      { id: "events", label: "Events", icon: "event" },
      { id: "clubs", label: "Clubs & Communities", icon: "users" },
      { id: "opportunities", label: "Opportunities", icon: "briefcase" },
      { id: "lostfound", label: "Lost & Found", icon: "link" },
    ]
  },
  {
    group: "COMMUNITY", items: [
      { id: "directory", label: "Student Directory", icon: "users" },
      { id: "achievements", label: "Achievements", icon: "award" },
    ]
  },
  {
    group: "ACCOUNT", items: [
      { id: "profile", label: "Profile", icon: "user" },
      { id: "settings", label: "Settings", icon: "settings" },
      { id: "help", label: "Help & Support", icon: "help" },
    ]
  },
];

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
function Sidebar({ t, activeNav, setActiveNav, onClose, onCR }: {
  t: Theme; activeNav: string; setActiveNav: (id: string) => void; onClose?: () => void; onCR?: () => void;
}) {
  const c = tok(t);
  return (
    <div style={{
      width: 236, flexShrink: 0, background: c.sidebar,
      borderRight: `1px solid ${c.sidebarBorder}`,
      display: "flex", flexDirection: "column",
      height: "100%", overflowY: "auto",
    }}>
      {/* Logo */}
      <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${c.sidebarBorder}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, ${c.primary}, ${c.primaryDark})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 14, color: "#fff", fontWeight: 800, fontFamily: "Manrope" }}>U</span>
          </div>
          <span style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 16, color: c.text }}>UniLink</span>
        </div>
        {onClose && (
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
            <Ic n="x" size={16} color={c.textDim} />
          </button>
        )}
      </div>

      {/* Nav groups */}
      <div style={{ flex: 1, padding: "12px 12px 0", overflowY: "auto" }}>
        {NAV.map((group) => (
          <div key={group.group} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: c.textDim, letterSpacing: "0.08em", padding: "0 8px", marginBottom: 6 }}>{group.group}</div>
            {group.items.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button key={item.id} onClick={() => { setActiveNav(item.id); onClose?.(); }}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px 10px",
                    borderRadius: 9, marginBottom: 2, cursor: "pointer",
                    background: isActive ? c.activeNav.bg : "transparent",
                    border: `1px solid ${isActive ? c.activeNav.border : "transparent"}`,
                    color: isActive ? c.activeNav.text : c.textMuted,
                    fontFamily: "Inter", fontWeight: isActive ? 600 : 500, fontSize: 13,
                    transition: "all 0.16s ease", textAlign: "left",
                  }}
                  onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = c.surface2; }}
                  onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <Ic n={item.icon} size={15} color={isActive ? c.activeNav.text : c.textDim} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge != null && (
                    <span style={{ padding: "1px 6px", borderRadius: 999, fontSize: 10, fontWeight: 700, background: isActive ? `rgba(37,99,235,0.15)` : c.surface2, color: isActive ? c.primary : c.textDim }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}

        {/* CR MANAGEMENT — role-based section, visible only for CR users */}
        {onCR && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: c.textDim, letterSpacing: "0.08em", padding: "0 8px", marginBottom: 6 }}>CR MANAGEMENT</div>
            <button onClick={() => { onCR(); onClose?.(); }}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px 10px",
                borderRadius: 9, marginBottom: 2, cursor: "pointer",
                background: "transparent",
                border: `1px solid transparent`,
                color: c.textMuted,
                fontFamily: "Inter", fontWeight: 500, fontSize: 13,
                transition: "all 0.16s ease", textAlign: "left",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = `${c.primary}0D`;
                (e.currentTarget as HTMLElement).style.borderColor = `${c.primary}25`;
                (e.currentTarget as HTMLElement).style.color = c.primary;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                (e.currentTarget as HTMLElement).style.color = c.textMuted;
              }}
            >
              <Ic n="shield" size={15} color={c.primary} />
              <span style={{ flex: 1 }}>CR Portal</span>
              <span style={{ padding: "1px 7px", borderRadius: 999, fontSize: 9, fontWeight: 700, background: `${c.primary}14`, color: c.primary, border: `1px solid ${c.primary}25`, letterSpacing: "0.04em" }}>CR</span>
            </button>
          </div>
        )}
      </div>

      {/* Student profile */}
      <div style={{ padding: "14px 16px", borderTop: `1px solid ${c.sidebarBorder}`, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${c.primary}, ${c.primaryDark})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: "#fff", fontFamily: "Manrope" }}>O</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: c.text, fontFamily: "Manrope" }}>Ovi</div>
          <div style={{ fontSize: 11, color: c.textDim, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>CSE · Batch 52 · Section B</div>
        </div>
        {onCR && <Ic n="shield" size={13} color={c.primary} />}
      </div>
    </div>
  );
}

// ─── TOP HEADER ───────────────────────────────────────────────────────────────
function DashHeader({ t, onMenuClick, notifOpen, setNotifOpen, onCR, onNavigate }: {
  t: Theme; onMenuClick: () => void; notifOpen: boolean; setNotifOpen: (v: boolean) => void; onCR?: () => void; onNavigate?: (id: string) => void;
}) {
  const c = tok(t);
  const { toggle } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div style={{
      padding: "18px 28px", borderBottom: `1px solid ${c.border}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: c.surface, flexShrink: 0, position: "sticky", top: 0, zIndex: 20,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={onMenuClick} className="mobile-menu-btn" style={{ background: "none", border: "none", cursor: "pointer", display: "none", marginRight: 4 }}>
          <Ic n="menu" size={20} color={c.textMuted} />
        </button>
        <div>
          <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 20, color: c.text, letterSpacing: "-0.02em" }}>
            {greeting}, Ovi 👋
          </h1>
          <p style={{ fontSize: 13, color: c.textMuted, marginTop: 1 }}>Here&apos;s what&apos;s happening on your campus today.</p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Search */}
        <div style={{ position: "relative" }}>
          {searchOpen ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 10, padding: "7px 12px" }}>
              <Ic n="search" size={14} color={c.textDim} />
              <input autoFocus placeholder="Search UniLink…" style={{ background: "none", border: "none", outline: "none", fontSize: 13, color: c.text, width: 180, fontFamily: "Inter" }} onBlur={() => setSearchOpen(false)} />
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)} style={{ width: 36, height: 36, borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Ic n="search" size={15} color={c.textMuted} />
            </button>
          )}
        </div>

        {/* Notifications */}
        <button onClick={() => setNotifOpen(!notifOpen)} style={{ width: 36, height: 36, borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
          <Ic n="bell" size={15} color={c.textMuted} />
          {INITIAL_UNREAD > 0 && (
            <div style={{ position: "absolute", top: -5, right: -5, minWidth: 16, height: 16, borderRadius: 8, background: "#EF4444", border: `2px solid ${c.surface}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter", fontWeight: 700, fontSize: 9, color: "#fff", padding: "0 3px" }}>
              {INITIAL_UNREAD > 9 ? "9+" : INITIAL_UNREAD}
            </div>
          )}
        </button>

        {/* Theme toggle */}
        <button onClick={toggle} style={{ width: 36, height: 36, borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Ic n={t === "light" ? "moon" : "sun"} size={15} color={c.textMuted} />
        </button>

        {/* Avatar + profile dropdown */}
        <div ref={profileRef} style={{ position: "relative" }}>
          <button
            onClick={() => setProfileOpen((v) => !v)}
            style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${c.primary}, ${c.primaryDark})`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: profileOpen ? `2px solid ${c.primary}` : "2px solid transparent", transition: "border-color 0.15s", boxSizing: "border-box" }}
          >
            <span style={{ fontSize: 15, fontWeight: 800, color: "#fff", fontFamily: "Manrope" }}>O</span>
          </button>

          {profileOpen && (
            <div style={{
              position: "absolute", top: "calc(100% + 10px)", right: 0,
              width: 240, background: c.surface, border: `1px solid ${c.border}`,
              borderRadius: 16, boxShadow: "0 12px 40px rgba(0,0,0,0.14)",
              overflow: "hidden", zIndex: 60, animation: "fade-in 0.15s ease both",
            }}>
              {/* User info */}
              <div style={{ padding: "16px 16px 14px", borderBottom: `1px solid ${c.border}`, display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, background: `linear-gradient(135deg, ${c.primary}, ${c.primaryDark})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: "#fff", fontFamily: "Manrope" }}>O</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text }}>Ovi</div>
                  <div style={{ fontSize: 11, color: c.textDim, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>CSE · Batch 52 · Section B</div>
                  {onCR && (
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
                      <Ic n="shield" size={10} color={c.primary} />
                      <span style={{ fontSize: 10, fontWeight: 700, color: c.primary }}>Class Representative</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Standard items */}
              {[
                { icon: "user", label: "Profile", id: "profile" },
                { icon: "settings", label: "Settings", id: "settings" },
                { icon: "bell", label: "Notifications", id: "notifications" },
              ].map((item) => (
                <button key={item.label} onClick={() => { setProfileOpen(false); onNavigate?.(item.id); }}
                  style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 16px", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter", fontSize: 13, color: c.textMuted, textAlign: "left", transition: "background 0.12s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = c.surface2)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "none")}
                >
                  <Ic n={item.icon} size={14} color={c.textDim} />
                  {item.label}
                </button>
              ))}

              {/* CR Portal entry — visible for CR or quick access */}
              <div style={{ height: 1, background: c.border, margin: "4px 0" }} />
              <button onClick={() => { setProfileOpen(false); if (onCR) onCR(); else window.location.href = "/cr-portal"; }}
                style={{ display: "flex", alignItems: "flex-start", gap: 10, width: "100%", padding: "11px 16px", background: "none", border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.12s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = `${c.primary}0D`)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "none")}
              >
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `${c.primary}14`, border: `1px solid ${c.primary}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <Ic n="shield" size={14} color={c.primary} />
                </div>
                <div>
                  <div style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 13, color: c.primary }}>CR Portal</div>
                  <div style={{ fontFamily: "Inter", fontSize: 11, color: c.textDim, marginTop: 1 }}>Manage your section</div>
                </div>
              </button>

              {/* Log out */}
              <div style={{ height: 1, background: c.border, margin: "4px 0" }} />
              <button onClick={async () => {
  setProfileOpen(false);
  try {
    const response = await fetch("/api/auth/logout", { method: "POST" });
    if (!response.ok) { alert("Could not sign out. Please try the Sign out button at the bottom right."); return; }
    window.location.replace("/login");
  } catch { alert("Could not connect. Please try signing out again."); }
}}
                style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 16px 14px", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter", fontSize: 13, color: "#EF4444", textAlign: "left", transition: "background 0.12s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.06)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "none")}
              >
                <Ic n="x" size={14} color="#EF4444" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── NOTIFICATION PANEL ───────────────────────────────────────────────────────
function NotifPanel({ t, onClose, onViewAll }: { t: Theme; onClose: () => void; onViewAll: () => void }) {
  const c = tok(t);
  const notifs = [
    { icon: "📚", title: "Midterm Examination Updated", sub: "CSE 305 — Important", time: "10:24 AM", unread: true },
    { icon: "📝", title: "Database Assignment 02 due tomorrow", sub: "CSE 305", time: "9:15 AM", unread: true },
    { icon: "📚", title: "New lecture material uploaded", sub: "CSE 401 — Graph Traversal.pdf", time: "8:30 AM", unread: true },
    { icon: "🗓️", title: "AI Workshop starts tomorrow", sub: "September 2 · 3:00 PM", time: "Yesterday", unread: false },
    { icon: "🔍", title: "Possible Lost & Found match", sub: "Black Backpack", time: "Aug 28", unread: false },
  ];
  const unread = notifs.filter(n => n.unread).length;
  return (
    <div style={{ position: "absolute", top: "calc(100% + 10px)", right: 0, width: 360, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, boxShadow: "0 16px 48px rgba(0,0,0,0.18)", zIndex: 50, overflow: "hidden", animation: "fadeUp .22s ease both" }}>
      <div style={{ padding: "14px 18px", borderBottom: `1px solid ${c.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <span style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text }}>Notifications</span>
          {unread > 0 && <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 700, color: "#2563EB", background: "rgba(37,99,235,0.08)", borderRadius: 999, padding: "1px 7px" }}>{unread} unread</span>}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 12, color: c.primary, fontWeight: 600, cursor: "pointer" }}>Mark all read</span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}><Ic n="x" size={14} color={c.textDim} /></button>
        </div>
      </div>
      {notifs.map((n, i) => (
        <div key={i} style={{ padding: "12px 18px", display: "flex", gap: 12, alignItems: "flex-start", borderBottom: `1px solid ${c.border}`, background: n.unread ? (t === "light" ? "#F0F5FF" : "rgba(59,130,246,0.06)") : "transparent", cursor: "pointer", position: "relative" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = c.surface2)}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = n.unread ? (t === "light" ? "#F0F5FF" : "rgba(59,130,246,0.06)") : "transparent")}>
          {n.unread && <div style={{ position: "absolute", left: 7, top: "50%", transform: "translateY(-50%)", width: 5, height: 5, borderRadius: "50%", background: "#2563EB" }} />}
          <div style={{ width: 34, height: 34, borderRadius: 10, background: c.surface2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0, marginLeft: 4 }}>{n.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: n.unread ? 600 : 500, color: c.text, marginBottom: 2, lineHeight: 1.35, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{n.title}</div>
            <div style={{ fontSize: 11, color: c.textDim, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{n.sub}</div>
          </div>
          <span style={{ fontSize: 10, color: c.textDim, flexShrink: 0 }}>{n.time}</span>
        </div>
      ))}
      <div style={{ padding: "12px 18px", display: "flex", justifyContent: "center" }}>
        <button onClick={() => { onClose(); onViewAll(); }} style={{ fontSize: 13, color: c.primary, fontWeight: 600, cursor: "pointer", background: "none", border: "none" }}>View all notifications →</button>
      </div>
    </div>
  );
}

// ─── STAT CARDS ────────────────────────────────────────────────────────────────
function StatCards({ t }: { t: Theme }) {
  const assignmentData=useAssignments();
  const routine=useRoutine(),routineClock=useRoutineClock();
  const c = tok(t);
  const stats = [
    { label: "Today's Classes", value: routine.loading||routine.error||!routineClock?"—":String(routine.entries.filter(e=>e.weekday===routineClock.day).length), sub: "Weekly routine", icon: "📚", color: c.primary, iconBg: `rgba(37,99,235,0.1)` },
    { label: "Assignments", value: String(assignmentData.assignments.filter(a=>a.status==="due-soon").length), sub: "Due soon", icon: "📝", color: "#F59E0B", iconBg: "rgba(245,158,11,0.1)" },
    { label: "Events", value: "5", sub: "This week", icon: "🎪", color: "#8B5CF6", iconBg: "rgba(139,92,246,0.1)" },
    { label: "Announcements", value: "8", sub: "New today", icon: "📢", color: "#10B981", iconBg: "rgba(16,185,129,0.1)" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
      {stats.map((s) => (
        <div key={s.label} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: c.cardShadow, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: s.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{s.icon}</div>
          <div>
            <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.text, marginTop: 3 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: c.textDim, marginTop: 1 }}>{s.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── TODAY'S SCHEDULE ─────────────────────────────────────────────────────────
function TodaySchedule({onNavigate}:{t:Theme;onNavigate?:(id:string)=>void}){return <TodayRoutine onView={()=>onNavigate?.("routine")}/>;}

// ─── ANNOUNCEMENTS ────────────────────────────────────────────────────────────
// ─── SOURCE BADGE ─────────────────────────────────────────────────────────────
type SourceType = "Teacher" | "CR" | "University" | "Department" | "Club" | "System";
function SourceBadge({ source, t }: { source: SourceType; t: Theme }) {
  const c = tok(t);
  const cfg: Record<SourceType, { color: string; bg: string; border: string }> = {
    Teacher: { color: "#2563EB", bg: "rgba(37,99,235,0.08)", border: "rgba(37,99,235,0.2)" },
    CR: { color: "#8B5CF6", bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.2)" },
    University: { color: "#0F172A", bg: "rgba(15,23,42,0.06)", border: "rgba(15,23,42,0.15)" },
    Department: { color: "#0891B2", bg: "rgba(8,145,178,0.08)", border: "rgba(8,145,178,0.2)" },
    Club: { color: "#10B981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)" },
    System: { color: "#64748B", bg: "rgba(100,116,139,0.08)", border: "rgba(100,116,139,0.18)" },
  };
  const s = cfg[source] ?? cfg.System;
  return (
    <span style={{ fontSize: 10, fontWeight: 700, color: s.color, background: s.bg, border: `1px solid ${s.border}`, borderRadius: 5, padding: "1px 6px", letterSpacing: "0.02em" }}>
      {source}
    </span>
  );
}

// ─── CLASS UPDATES ────────────────────────────────────────────────────────────
function ClassUpdatesWidget() {
  return <ClassUpdatesFeed limit={3} />;
}

function AnnouncementsWidget({ t, onNavigate }: { t: Theme; onNavigate?: (id: string) => void }) {
  const c = tok(t);
  const items = [
    { emoji: "📚", title: "Midterm syllabus updated", from: "Dr. Rahman", sourceType: "Teacher" as SourceType, time: "2 hours ago", priority: "high" },
    { emoji: "⚠️", title: "CSE 305 class delayed to 11:00 AM", from: "CR · Section B", sourceType: "CR" as SourceType, time: "10 min ago", priority: "high" },
    { emoji: "📢", title: "University seminar registration is now open.", from: "University Administration", sourceType: "University" as SourceType, time: "Yesterday", priority: "medium" },
    { emoji: "📋", title: "Assignment submission deadline extended", from: "Database Management", sourceType: "Teacher" as SourceType, time: "Yesterday", priority: "low" },
  ];
  const priorityDot: Record<string, string> = { high: "#EF4444", medium: "#F59E0B", low: "#10B981" };
  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "22px 24px", boxShadow: c.cardShadow }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text }}>Important Announcements</h3>
        <span onClick={() => onNavigate?.("announcements")} style={{ fontSize: 12, color: c.primary, fontWeight: 600, cursor: "pointer" }}>View All →</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((a, i) => (
          <div key={i} style={{ padding: "13px 14px", background: c.surface2, borderRadius: 12, border: `1px solid ${c.border}`, cursor: "pointer", transition: "all 0.16s ease" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = c.primary; (e.currentTarget as HTMLElement).style.background = t === "light" ? "#FAFBFF" : "rgba(59,130,246,0.06)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = c.border; (e.currentTarget as HTMLElement).style.background = c.surface2; }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: c.surface3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>{a.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 5, lineHeight: 1.4 }}>{a.title}</div>
                <div style={{ display: "flex", gap: 7, alignItems: "center", flexWrap: "wrap" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: priorityDot[a.priority], flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: c.textMuted }}>{a.from}</span>
                  <SourceBadge source={a.sourceType} t={t} />
                </div>
              </div>
              <span style={{ fontSize: 11, color: c.textDim, flexShrink: 0 }}>{a.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ASSIGNMENTS ──────────────────────────────────────────────────────────────
function AssignmentsWidget({ t, onNavigate }: { t: Theme; onNavigate?: (id: string) => void }) {
  const c = tok(t);
  const data=useAssignments();
  const items=data.assignments.filter(a=>!a.hasSubmission).slice().sort((a,b)=>a.dueAt.localeCompare(b.dueAt)).slice(0,4).map(a=>({title:a.title,course:a.course,due:a.dueLabel,urgency:a.status==='overdue'?'high':a.status==='due-soon'?'medium':'low'}));
  const urgencyStyle: Record<string, { text: string; bg: string }> = {
    high: { text: "#EF4444", bg: "rgba(239,68,68,0.08)" },
    medium: { text: "#F59E0B", bg: "rgba(245,158,11,0.08)" },
    low: { text: "#10B981", bg: "rgba(16,185,129,0.08)" },
  };
  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "22px 24px", boxShadow: c.cardShadow }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text }}>Pending Assignments</h3>
        <span onClick={() => onNavigate?.("assignments")} style={{ fontSize: 12, color: c.primary, fontWeight: 600, cursor: "pointer" }}>View All →</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.loading&&<p>Loading assignments…</p>}{data.error&&<p role="alert">{data.error}</p>}{!data.loading&&!data.error&&!items.length&&<p>No pending assignments.</p>}
        {items.map((a, i) => (
          <div key={i} onClick={()=>onNavigate?.("assignments")} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: c.surface2, borderRadius: 11, border: `1px solid ${c.border}`, cursor: "pointer", transition: "all 0.16s ease" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = c.primary; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = c.border; }}
          >
            <div style={{ width: 34, height: 34, borderRadius: 9, background: urgencyStyle[a.urgency].bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Ic n="clipboard" size={14} color={urgencyStyle[a.urgency].text} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{a.title}</div>
              <div style={{ fontSize: 11, color: c.textDim }}>{a.course}</div>
            </div>
            <span style={{ padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, background: urgencyStyle[a.urgency].bg, color: urgencyStyle[a.urgency].text, whiteSpace: "nowrap" }}>
              {a.due}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── EVENTS (horizontal scroll) ───────────────────────────────────────────────
function EventsWidget({ t, onNavigate }: { t: Theme; onNavigate?: (id: string) => void }) {
  const c = tok(t);
  const events = [
    { title: "Hackathon 2026", cat: "Competition", date: "Sep 15", time: "9:00 AM – 6:00 PM", loc: "University Auditorium", emoji: "🏆", gradient: "linear-gradient(135deg,#DBEAFE,#EFF6FF)", organizer: "CSE Club", sharedByCR: true, regDeadline: "Sep 10", saved: false },
    { title: "AI Workshop", cat: "Workshop", date: "Sep 18", time: "3:00 PM", loc: "Seminar Hall", emoji: "🤖", gradient: "linear-gradient(135deg,#F5F3FF,#EDE9FE)", organizer: "CSE Department", sharedByCR: false, regDeadline: "", saved: false },
    { title: "Programming Contest", cat: "Competition", date: "Saturday", time: "10:00 AM", loc: "Lab Floor", emoji: "💻", gradient: "linear-gradient(135deg,#F0FDF4,#DCFCE7)", organizer: "ICPC Chapter", sharedByCR: true, regDeadline: "", saved: true },
    { title: "Career Seminar", cat: "Career", date: "Sep 5", time: "2:00 PM", loc: "Auditorium", emoji: "🎓", gradient: "linear-gradient(135deg,#FEF3C7,#FFFBEB)", organizer: "Career Office", sharedByCR: false, regDeadline: "", saved: false },
  ];
  const [saved, setSaved] = useState<Record<number, boolean>>(() => Object.fromEntries(events.map((e, i) => [i, e.saved])));

  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "22px 24px", boxShadow: c.cardShadow }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text }}>Upcoming Events</h3>
        <span onClick={() => onNavigate?.("events")} style={{ fontSize: 12, color: c.primary, fontWeight: 600, cursor: "pointer" }}>View All →</span>
      </div>
      <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 4 }}>
        {events.map((ev, i) => (
          <div key={i} style={{ flexShrink: 0, width: 210, background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 14, overflow: "hidden", cursor: "pointer", transition: "all 0.18s ease" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(37,99,235,0.1)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
          >
            <div style={{ height: 76, background: ev.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, position: "relative" }}>
              {ev.emoji}
              <span style={{ position: "absolute", top: 8, left: 10, padding: "3px 8px", borderRadius: 999, fontSize: 9, fontWeight: 700, background: "rgba(255,255,255,0.85)", color: "#64748B" }}>{ev.cat}</span>
              <button onClick={(e) => { e.stopPropagation(); setSaved(s => ({ ...s, [i]: !s[i] })); }}
                style={{ position: "absolute", top: 7, right: 8, width: 24, height: 24, borderRadius: 7, background: saved[i] ? c.primary : "rgba(255,255,255,0.85)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Ic n="save" size={12} color={saved[i] ? "#fff" : "#64748B"} />
              </button>
              {ev.sharedByCR && (
                <span style={{ position: "absolute", bottom: 8, right: 8, fontSize: 9, fontWeight: 700, color: "#8B5CF6", background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)", borderRadius: 4, padding: "1px 5px" }}>Shared by CR</span>
              )}
            </div>
            <div style={{ padding: "11px 13px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: c.text, marginBottom: 5, fontFamily: "Manrope", lineHeight: 1.3 }}>{ev.title}</div>
              <div style={{ fontSize: 11, color: c.textMuted, marginBottom: 2 }}>{ev.date} · {ev.time}</div>
              <div style={{ fontSize: 11, color: c.textDim, marginBottom: 5 }}>{ev.loc}</div>
              <div style={{ fontSize: 10, color: c.textDim }}>Organized by <span style={{ color: c.text, fontWeight: 600 }}>{ev.organizer}</span></div>
              {ev.regDeadline && (
                <div style={{ marginTop: 8, padding: "5px 8px", background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.18)", borderRadius: 7 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: "#F59E0B", marginBottom: 1 }}>REGISTRATION CLOSES</div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: c.text }}>{ev.regDeadline}</div>
                  <button style={{ width: "100%", marginTop: 5, padding: "4px 0", borderRadius: 5, background: "#F59E0B", border: "none", color: "#fff", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>
                    Register Now ↗
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── OPPORTUNITIES ────────────────────────────────────────────────────────────
function OpportunitiesWidget({ t, onNavigate }: { t: Theme; onNavigate?: (id: string) => void }) {
  const c = tok(t);
  const opps = [
    { title: "Software Engineering Internship", org: "TechCorp BD", type: "Internship", match: 98, emoji: "💼" },
    { title: "AI Hackathon 2024", org: "BASIS", type: "Competition", match: 94, emoji: "🏆" },
    { title: "Competitive Programming Contest", org: "ICPC Regional", type: "Competition", match: 88, emoji: "💻" },
  ];
  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "22px 24px", boxShadow: c.cardShadow }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text }}>Recommended for You</h3>
        <span onClick={() => onNavigate?.("opportunities")} style={{ fontSize: 12, color: c.primary, fontWeight: 600, cursor: "pointer" }}>View All →</span>
      </div>
      <div style={{ fontSize: 12, color: c.textDim, marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
        <Ic n="sparkle" size={12} color={c.primary} />
        Because you&apos;re interested in Programming
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {opps.map((o, i) => (
          <div key={i} style={{ display: "flex", gap: 12, padding: "12px 14px", background: c.surface2, borderRadius: 12, border: `1px solid ${c.border}`, alignItems: "center", cursor: "pointer", transition: "border-color 0.16s ease" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = c.primary)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = c.border)}
          >
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `rgba(37,99,235,0.08)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{o.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{o.title}</div>
              <div style={{ fontSize: 11, color: c.textDim }}>{o.org} · {o.type}</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#10B981", background: "rgba(16,185,129,0.08)", padding: "3px 8px", borderRadius: 6, flexShrink: 0 }}>{o.match}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MATERIALS ────────────────────────────────────────────────────────────────
type MaterialType = "Official Material" | "Class Note" | "Student Note";
function MaterialTypeBadge({ kind, t }: { kind: MaterialType; t: Theme }) {
  const cfg: Record<MaterialType, { color: string; bg: string; border: string }> = {
    "Official Material": { color: "#2563EB", bg: "rgba(37,99,235,0.07)", border: "rgba(37,99,235,0.18)" },
    "Class Note": { color: "#8B5CF6", bg: "rgba(139,92,246,0.07)", border: "rgba(139,92,246,0.18)" },
    "Student Note": { color: "#10B981", bg: "rgba(16,185,129,0.07)", border: "rgba(16,185,129,0.18)" },
  };
  const s = cfg[kind];
  return <span style={{ fontSize: 10, fontWeight: 700, color: s.color, background: s.bg, border: `1px solid ${s.border}`, borderRadius: 5, padding: "1px 6px", whiteSpace: "nowrap" }}>{kind}</span>;
}

function MaterialsWidget({ t, onNavigate }: { t: Theme; onNavigate?: (id: string) => void }) {
  const c = tok(t);
  const data = useMaterials();
  const [downloadError,setDownloadError] = useState("");
  const files = data.materials.slice(0,4).map(m=>({material:m,course:m.course,name:m.title,time:new Date(m.createdAt).toLocaleString(),by:m.uploader,icon:"📄",color:m.color,kind:"Class Note" as MaterialType,uploaderType:"CR" as SourceType}));
  return (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "22px 24px", boxShadow: c.cardShadow }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text }}>Recent Class Materials</h3>
        <span onClick={() => onNavigate?.("materials")} style={{ fontSize: 12, color: c.primary, fontWeight: 600, cursor: "pointer" }}>View All →</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.loading&&<p>Loading materials…</p>}
        {data.error&&<p role="alert">{data.error}</p>}
        {downloadError&&<p role="alert">{downloadError}</p>}
        {!data.loading&&!data.error&&!files.length&&<p>No class materials yet.</p>}
        {files.map((f, i) => (
          <div key={i} style={{ display: "flex", gap: 12, padding: "12px 14px", background: c.surface2, borderRadius: 11, border: `1px solid ${c.border}`, alignItems: "center", cursor: "pointer", transition: "border-color 0.16s ease" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = c.primary)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = c.border)}
          >
            <div style={{ width: 36, height: 36, borderRadius: 9, background: `${f.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{f.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: c.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 3 }}>{f.name}</div>
              <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                <MaterialTypeBadge kind={f.kind} t={t} />
                <span style={{ fontSize: 11, color: c.textDim }}>
                  Uploaded by <span style={{ fontWeight: 600, color: f.uploaderType === "CR" ? "#8B5CF6" : c.textMuted }}>{f.by}</span> · {f.time}
                </span>
              </div>
              <div style={{ fontSize: 11, color: c.textDim, marginTop: 2 }}>{f.course}</div>
            </div>
            <button aria-label={`Download ${f.name}`} onClick={() => {setDownloadError("");void downloadMaterial(f.material).catch(e=>setDownloadError(e.message));}} style={{ width: 30, height: 30, borderRadius: 8, background: "none", border: `1px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
              <Ic n="download" size={13} color={c.textDim} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LOST & FOUND WIDGET ──────────────────────────────────────────────────────
function LostFoundWidget({ t, onNavigate }: { t: Theme; onNavigate?: (id: string) => void }) {
  const c = tok(t);
  return (
    <div style={{ background: c.surface, border: `1px solid rgba(139,92,246,0.25)`, borderRadius: 18, padding: "22px 24px", boxShadow: c.cardShadow }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text }}>Lost & Found</h3>
        <span onClick={() => onNavigate?.("lostfound")} style={{ fontSize: 11, fontWeight: 700, color: "#8B5CF6", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", padding: "2px 9px", borderRadius: 999, cursor: "pointer" }}>1 Match</span>
      </div>

      {/* Match alert */}
      <div style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 13, padding: "14px 16px", marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
          <span style={{ fontSize: 22 }}>🎧</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#8B5CF6", marginBottom: 3 }}>✦ Possible Match Found</div>
            <div style={{ fontSize: 13, color: c.text, lineHeight: 1.5 }}>Your lost AirPods Pro may match a recently reported found item near the Central Library.</div>
          </div>
        </div>
        <button onClick={() => onNavigate?.("lostfound")} style={{ width: "100%", padding: "8px", borderRadius: 9, background: "#8B5CF6", color: "#fff", fontFamily: "Inter", fontWeight: 600, fontSize: 13, border: "none", cursor: "pointer", transition: "background 0.16s ease" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#7C3AED")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#8B5CF6")}
        >Review Match</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <button onClick={() => onNavigate?.("lostfound")} style={{ padding: "8px", borderRadius: 9, background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.18)", color: "#EF4444", fontFamily: "Inter", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>
          Report Lost
        </button>
        <button onClick={() => onNavigate?.("lostfound")} style={{ padding: "8px", borderRadius: 9, background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.18)", color: "#10B981", fontFamily: "Inter", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>
          Report Found
        </button>
      </div>
    </div>
  );
}

// ─── CAMPUS AI FLOATING PANEL ─────────────────────────────────────────────────
function AIFloat({ t }: { t: Theme }) {
  const c = tok(t);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([
    { from: "ai", text: "Hi Ovi! I'm UniLink AI. Ask me anything about your campus." },
  ]);
  const [typing, setTyping] = useState(false);
  const suggestions = ["What do I have tomorrow?", "Show my upcoming deadlines.", "Find programming opportunities."];

  const aiResponses: Record<string, string> = {
    "What do I have tomorrow?": "Tomorrow you have 3 classes (9AM, 12PM, 2PM), 1 assignment due (Database Assignment 02), and 1 saved event (AI Workshop at 3PM). 📅",
    "Show my upcoming deadlines.": "Here are your next 3 deadlines:\n1. Database Assignment 02 — Tomorrow\n2. Algorithms Problem Set — Friday\n3. SE Presentation — Sep 2",
    "Find programming opportunities.": "Found 3 great matches for you:\n• AI Hackathon (98% match)\n• SWE Internship at TechCorp\n• ICPC Regional (Competitive Programming)",
  };

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "ai", text: aiResponses[text] ?? "Let me look that up for you… 🔍" }]);
      setTyping(false);
    }, 900);
  };

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 40 }}>
      {/* Chat panel */}
      {open && (
        <div style={{
          position: "absolute", bottom: "calc(100% + 12px)", right: 0,
          width: 340, background: c.surface, border: `1px solid ${c.border}`,
          borderRadius: 20, overflow: "hidden",
          boxShadow: t === "light" ? "0 16px 48px rgba(37,99,235,0.15), 0 4px 16px rgba(0,0,0,0.08)" : "0 16px 48px rgba(59,130,246,0.2)",
          animation: "fade-up 0.22s ease both",
        }}>
          {/* Header */}
          <div style={{ padding: "14px 18px", borderBottom: `1px solid ${c.border}`, display: "flex", alignItems: "center", gap: 10, background: c.surface2 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: `linear-gradient(135deg, ${c.primary}, #38BDF8)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>✨</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: c.text, fontFamily: "Manrope" }}>UniLink AI</div>
              <div style={{ fontSize: 10, color: c.primary }}>Your campus assistant</div>
            </div>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 6px rgba(16,185,129,0.6)" }} />
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}><Ic n="x" size={14} color={c.textDim} /></button>
          </div>

          {/* Messages */}
          <div style={{ padding: "16px", height: 220, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "82%", padding: "9px 13px", borderRadius: 12, fontSize: 12, lineHeight: 1.55, whiteSpace: "pre-line",
                  background: m.from === "user" ? c.primary : c.surface2,
                  color: m.from === "user" ? "#fff" : c.text,
                  border: m.from === "ai" ? `1px solid ${c.border}` : "none",
                  borderBottomRightRadius: m.from === "user" ? 4 : 12,
                  borderBottomLeftRadius: m.from === "ai" ? 4 : 12,
                }}>{m.text}</div>
              </div>
            ))}
            {typing && (
              <div style={{ display: "flex", gap: 4, padding: "8px 13px", background: c.surface2, borderRadius: 12, width: 52, border: `1px solid ${c.border}` }}>
                {[0, 1, 2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: c.textDim, animation: `ping-slow 1s ease infinite ${i * 0.2}s` }} />)}
              </div>
            )}
          </div>

          {/* Suggestions */}
          <div style={{ padding: "0 14px 10px", display: "flex", gap: 6, overflowX: "auto" }}>
            {suggestions.map((s) => (
              <button key={s} onClick={() => send(s)} style={{ padding: "5px 11px", borderRadius: 999, fontSize: 11, fontWeight: 500, background: "none", border: `1px solid ${c.border}`, color: c.textMuted, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.16s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = c.primary; (e.currentTarget as HTMLElement).style.color = c.primary; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = c.border; (e.currentTarget as HTMLElement).style.color = c.textMuted; }}
              >{s}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: "10px 14px 14px", borderTop: `1px solid ${c.border}`, display: "flex", gap: 8 }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Ask anything…"
              style={{ flex: 1, padding: "9px 12px", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, fontSize: 12, color: c.text, fontFamily: "Inter", outline: "none" }}
            />
            <button onClick={() => send(input)} style={{ width: 34, height: 34, borderRadius: 10, background: c.primary, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Ic n="send" size={14} color="#fff" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "center", gap: 8, padding: "11px 18px",
        background: `linear-gradient(135deg, ${c.primary}, #38BDF8)`,
        color: "#fff", fontFamily: "Inter", fontWeight: 700, fontSize: 14,
        borderRadius: 14, border: "none", cursor: "pointer",
        boxShadow: `0 4px 20px ${c.primaryGlow}, 0 2px 8px rgba(0,0,0,0.15)`,
        transition: "all 0.18s ease",
      }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; }}
      >
        <span style={{ fontSize: 15 }}>✦</span> UniLink AI
      </button>
    </div>
  );
}

// ─── MOBILE BOTTOM NAV ────────────────────────────────────────────────────────
function MobileBottomNav({ t, active, setActive }: { t: Theme; active: string; setActive: (id: string) => void }) {
  const c = tok(t);
  const items = [
    { id: "dashboard", label: "Home", icon: "home" },
    { id: "courses", label: "Courses", icon: "book" },
    { id: "events", label: "Events", icon: "event" },
    { id: "notifications", label: "Notifs", icon: "bell" },
    { id: "more", label: "More", icon: "more" },
  ];
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, height: 62,
      background: c.surface, borderTop: `1px solid ${c.border}`,
      display: "flex", alignItems: "center",
      zIndex: 30, paddingBottom: "env(safe-area-inset-bottom)",
    }} className="mobile-bottom-nav">
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <button key={item.id} onClick={() => setActive(item.id)} style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
            background: "none", border: "none", cursor: "pointer",
            color: isActive ? c.primary : c.textDim, fontFamily: "Inter", fontSize: 10, fontWeight: isActive ? 700 : 500,
            transition: "color 0.16s ease",
          }}>
            <Ic n={item.icon} size={20} color={isActive ? c.primary : c.textDim} />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── MAIN DASHBOARD ──────────────────────────────────────────────────────────
export default function Dashboard({ onBack, onCR }: { onBack?: () => void; onCR?: () => void } = {}) {
  const router = useRouter();
  const assignmentData=useAssignments();
  const routine=useRoutine(),routineClock=useRoutineClock();
  const submitted=assignmentData.assignments.filter(a=>a.hasSubmission).length;
  const assignmentTotal=assignmentData.assignments.length;
  const updateCount = useClassUpdates().filter(update => update.status === "published").length;
  const goHome = onBack ?? (() => router.push("/"));
  const goToCR = onCR ?? (() => router.push("/cr-portal"));
  const { theme } = useTheme();
  const c = tok(theme);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [notifOpen, setNotifOpen] = useState(false);
  const [mobSidebar, setMobSidebar] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);

  const handleSetActiveNav = (id: string) => {
    setActiveNav(id);
    setMobSidebar(false);
    if (id !== "courses") setSelectedCourse(null);
  };

  return (
    <>
      <style>{`
        @keyframes fade-up { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes ping-slow { 0%,100% { opacity:0.4; } 50% { opacity:1; } }
        .mobile-bottom-nav { display: none !important; }
        .mobile-menu-btn { display: none !important; }
        @media (max-width: 900px) {
          .mobile-bottom-nav { display: flex !important; }
          .mobile-menu-btn { display: flex !important; }
          .dash-sidebar { position: fixed; left: -260px; top: 0; bottom: 0; z-index: 45; transition: left 0.28s ease; }
          .dash-sidebar.open { left: 0; box-shadow: 4px 0 24px rgba(0,0,0,0.18); }
          .dash-grid { grid-template-columns: 1fr !important; }
          .dash-stats { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* Mobile sidebar overlay */}
      {mobSidebar && (
        <div onClick={() => setMobSidebar(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 44, backdropFilter: "blur(4px)" }} />
      )}

      <div style={{ display: "flex", height: "100dvh", background: c.bg, overflow: "hidden" }}>
        {/* Sidebar */}
        <div className={`dash-sidebar${mobSidebar ? " open" : ""}`} style={{ height: "100vh", zIndex: 45, background: c.sidebar }}>
          <Sidebar t={theme} activeNav={activeNav} setActiveNav={handleSetActiveNav} onClose={() => setMobSidebar(false)} onCR={goToCR} />
        </div>

        {/* Main */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0, minWidth: 0 }}>
          {/* Header */}
          <div style={{ position: "relative" }}>
            <DashHeader t={theme} onMenuClick={() => setMobSidebar(true)} notifOpen={notifOpen} setNotifOpen={setNotifOpen} onCR={goToCR} onNavigate={handleSetActiveNav} />
            {notifOpen && <NotifPanel t={theme} onClose={() => setNotifOpen(false)} onViewAll={() => { setNotifOpen(false); handleSetActiveNav("notifications"); }} />}
            {/* Back to landing */}
            <button onClick={goHome} style={{ position: "absolute", top: "50%", left: 16, transform: "translateY(-50%)", background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 9, padding: "6px 12px", fontSize: 12, fontWeight: 600, color: c.textMuted, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              ← Landing
            </button>
          </div>

          {/* Scrollable content */}
          {activeNav === "courses" && !selectedCourse && (
            <MyCourses onOpenCourse={(course) => setSelectedCourse(course as CourseItem)} />
          )}
          {activeNav === "courses" && selectedCourse && (
            <CourseDetail course={selectedCourse as CourseItem} onBack={() => setSelectedCourse(null)} />
          )}
          {activeNav === "routine" && <RoutinePage />}
          {activeNav === "assignments" && <AssignmentsPage />}
          {activeNav === "exams" && <ExamsPage />}
          {activeNav === "materials" && <MaterialsPage />}
          {activeNav === "announcements" && <AnnouncementsPage />}
          {activeNav === "events" && <EventsPage />}
          {activeNav === "clubs" && <ClubsPage />}
          {activeNav === "opportunities" && <OpportunitiesPage />}
          {activeNav === "lostfound" && <div data-testid="lost-found-scroll" style={{ flex: 1, minHeight: 0, overflowY: "auto" }}><LostFoundPage /></div>}
          {activeNav === "notifications" && <NotificationsPage onNavigate={id => handleSetActiveNav(id)} />}
          {activeNav === "directory" && <DirectoryPage />}
          {activeNav === "settings" && <SettingsPage />}
          {activeNav === "achievements" && <AchievementsPage />}
          {activeNav === "profile" && <ProfilePage />}
          {activeNav === "help" && <HelpPage />}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px 100px", display: (activeNav === "courses" || activeNav === "routine" || activeNav === "assignments" || activeNav === "exams" || activeNav === "materials" || activeNav === "announcements" || activeNav === "events" || activeNav === "clubs" || activeNav === "opportunities" || activeNav === "lostfound" || activeNav === "notifications" || activeNav === "directory" || activeNav === "settings" || activeNav === "achievements" || activeNav === "profile" || activeNav === "help") ? "none" : undefined }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Stat cards */}
              <div className="dash-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
                {[
                  { label: "Today's Classes", value: routine.loading||routine.error||!routineClock?"—":String(routine.entries.filter(e=>e.weekday===routineClock.day).length), sub: "Weekly routine", icon: "📚", color: c.primary, iconBg: `rgba(37,99,235,0.1)` },
                  { label: "Class Updates", value: String(updateCount), sub: "From your CR", icon: "⚠️", color: "#8B5CF6", iconBg: "rgba(139,92,246,0.1)" },
                  { label: "Events", value: "5", sub: "This week", icon: "🎪", color: "#F59E0B", iconBg: "rgba(245,158,11,0.1)" },
                  { label: "Announcements", value: "8", sub: "New today", icon: "📢", color: "#10B981", iconBg: "rgba(16,185,129,0.1)" },
                ].map((s) => (
                  <div key={s.label} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "16px 18px", boxShadow: c.cardShadow, display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: s.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{s.icon}</div>
                    <div>
                      <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: s.color, lineHeight: 1 }}>{s.value}</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: c.text, marginTop: 2 }}>{s.label}</div>
                      <div style={{ fontSize: 11, color: c.textDim }}>{s.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Main 2-col grid */}
              <div className="dash-grid" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20 }}>
                {/* Left column */}
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <TodaySchedule t={theme} onNavigate={handleSetActiveNav} />
                  <AnnouncementsWidget t={theme} onNavigate={handleSetActiveNav} />
                  <ClassUpdatesWidget />
                  <EventsWidget t={theme} onNavigate={handleSetActiveNav} />
                  <MaterialsWidget t={theme} onNavigate={handleSetActiveNav} />
                </div>

                {/* Right column */}
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <AssignmentsWidget t={theme} onNavigate={handleSetActiveNav} />
                  <LostFoundWidget t={theme} onNavigate={handleSetActiveNav} />
                  <OpportunitiesWidget t={theme} onNavigate={handleSetActiveNav} />

                  {/* Quick stats mini card */}
                  <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "22px 24px", boxShadow: c.cardShadow }}>
                    <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text, marginBottom: 16 }}>Your Progress</h3>
                    {[
                      { label: "Courses Enrolled", val: "5", pct: 100 },
                      { label: "Assignments Submitted", val: `${submitted}/${assignmentTotal}`, pct: assignmentTotal ? Math.round(100*submitted/assignmentTotal) : 0 },
                      { label: "Attendance", val: "92%", pct: 92 },
                    ].map((p) => (
                      <div key={p.label} style={{ marginBottom: 14 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                          <span style={{ fontSize: 12, color: c.textMuted }}>{p.label}</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: c.text }}>{p.val}</span>
                        </div>
                        <div style={{ height: 5, background: c.surface2, borderRadius: 3, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${p.pct}%`, background: `linear-gradient(90deg, ${c.primary}, #38BDF8)`, borderRadius: 3, transition: "width 0.6s ease" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI float */}
      <AIFloat t={theme} />

      {/* Mobile bottom nav */}
      <MobileBottomNav t={theme} active={activeNav} setActive={handleSetActiveNav} />
    </>
  );
}
