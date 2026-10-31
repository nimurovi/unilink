"use client";
import { useState, useEffect, useContext } from "react";
import { ThemeCtx } from "@/components/ui/Theme";

type Theme = "light" | "dark";
const useTheme = () => useContext(ThemeCtx);

const LIGHT = {
  bg: "#F8FAFC", surface: "#FFFFFF", surface2: "#F1F5F9", surface3: "#E2E8F0",
  primary: "#2563EB", text: "#0F172A", textMuted: "#64748B", textDim: "#94A3B8",
  border: "#E2E8F0", cardShadow: "0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)",
  unreadBg: "#F0F5FF",
};
const DARK = {
  bg: "#080D1A", surface: "#0F172A", surface2: "#172033", surface3: "#1E293B",
  primary: "#3B82F6", text: "#F8FAFC", textMuted: "#94A3B8", textDim: "#475569",
  border: "#1E293B", cardShadow: "0 1px 4px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.18)",
  unreadBg: "rgba(59,130,246,0.06)",
};
const tok = (t: Theme) => t === "light" ? LIGHT : DARK;

const P: Record<string, string[]> = {
  bell:     ["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 0 1-3.46 0"],
  book:     ["M4 19.5A2.5 2.5 0 0 1 6.5 17H20","M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"],
  clipboard:["M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2","M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2 2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2z"],
  calendar: ["M8 2v4M16 2v4M3 10h18","M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"],
  megaphone:["M3 11v2M5 9v6M19 10v4","M18 8H7a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h11l4 4V4l-4 4z"],
  folder:   ["M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"],
  star:     ["M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"],
  briefcase:["M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16","M2 7h20v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7z"],
  search2:  ["M21 21l-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z"],
  package:  ["M16.5 9.4L7.55 4.24","M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z","M3.27 6.96L12 12.01l8.73-5.05","M12 22.08V12"],
  check:    ["M20 6L9 17l-5-5"],
  x:        ["M18 6L6 18M6 6l12 12"],
  settings: ["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"],
  arrowL:   ["M19 12H5M12 19l-7-7 7-7"],
  chevR:    ["M9 18l6-6-6-6"],
  alert:    ["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z","M12 9v4M12 17h.01"],
  users:    ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2","M23 21v-2a4 4 0 0 0-3-3.87","M16 3.13a4 4 0 0 1 0 7.75","M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  flag:     ["M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z","M4 22v-7"],
  clock:    ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z","M12 6v6l4 2"],
};
function Ic({ n, size = 16, color = "currentColor" }: { n: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      {(P[n] ?? []).map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

// ─── TYPES ────────────────────────────────────────────────────────────────────────
type NotifCat = "academic" | "events" | "clubs" | "opportunities" | "lostfound" | "system";
type Priority = "normal" | "important" | "urgent";
type NotifAction = { label: string; target: string };

type Notif = {
  id: string; cat: NotifCat; priority: Priority;
  title: string; body: string; time: string; timeRaw: number;
  unread: boolean; action?: NotifAction;
  meta?: Record<string, string>;
  group?: string;
};

const CAT_CFG: Record<NotifCat, { label: string; icon: string; color: string; bg: string; emoji: string }> = {
  academic:     { label: "Academic",     icon: "book",      color: "#2563EB", bg: "rgba(37,99,235,0.08)",  emoji: "📚" },
  events:       { label: "Events",       icon: "calendar",  color: "#8B5CF6", bg: "rgba(139,92,246,0.08)", emoji: "🗓️" },
  clubs:        { label: "Clubs",        icon: "users",     color: "#10B981", bg: "rgba(16,185,129,0.08)", emoji: "🏛️" },
  opportunities:{ label: "Opportunities",icon: "briefcase", color: "#F59E0B", bg: "rgba(245,158,11,0.08)", emoji: "💼" },
  lostfound:    { label: "Lost & Found", icon: "flag",      color: "#EF4444", bg: "rgba(239,68,68,0.08)",  emoji: "🔍" },
  system:       { label: "System",       icon: "settings",  color: "#94A3B8", bg: "rgba(148,163,184,0.08)",emoji: "⚙️" },
};

const PRIORITY_CFG: Record<Priority, { label: string; color: string; bg: string }> = {
  normal:    { label: "",          color: "transparent",  bg: "transparent"             },
  important: { label: "Important", color: "#F59E0B",      bg: "rgba(245,158,11,0.08)"  },
  urgent:    { label: "Urgent",    color: "#EF4444",      bg: "rgba(239,68,68,0.08)"   },
};

const ALL_NOTIFS: Notif[] = [
  {
    id: "n1", cat: "academic", priority: "important",
    title: "Midterm Examination Updated",
    body: "Your CSE 305 midterm examination schedule has been updated. Previous: September 8, 10:00 AM → Updated: September 10, 10:00 AM, Room 502.",
    time: "Today · 10:24 AM", timeRaw: 1, unread: true,
    action: { label: "View Exam", target: "exams" },
    meta: { Course: "CSE 305 — Database Management", "Updated by": "Department Administration", "Previous Date": "September 8, 10:00 AM", "New Date": "September 10, 10:00 AM", Room: "502" },
  },
  {
    id: "n2", cat: "academic", priority: "normal",
    title: "Database Assignment 02 is due tomorrow",
    body: "Database Assignment 02 is due tomorrow, September 1, 2026 at 11:59 PM. Status: Not Submitted.",
    time: "Today · 9:15 AM", timeRaw: 2, unread: true,
    action: { label: "View Assignment", target: "assignments" },
    meta: { Course: "CSE 305", Due: "September 1, 2026 · 11:59 PM", Status: "Not Submitted" },
  },
  {
    id: "n3", cat: "academic", priority: "normal",
    title: "New lecture material uploaded",
    body: "Graph Traversal Slides.pdf has been uploaded to CSE 401 — Algorithms. 15 pages.",
    time: "Today · 8:30 AM", timeRaw: 3, unread: true,
    action: { label: "View Material", target: "materials" },
    meta: { Course: "CSE 401 — Algorithms", File: "Graph Traversal Slides.pdf", Pages: "15" },
    group: "CSE 401",
  },
  {
    id: "n4", cat: "academic", priority: "normal",
    title: "Routine change: Thursday classes moved",
    body: "Thursday's schedule has been updated for next week. CSE 305 moved to Room 302.",
    time: "Today · 8:00 AM", timeRaw: 4, unread: false,
    action: { label: "View Routine", target: "routine" },
    meta: { "Affected Course": "CSE 305", "Change": "Room 302, same time", "Week": "Sep 4–8" },
    group: "CSE 401",
  },
  {
    id: "n5", cat: "events", priority: "normal",
    title: "AI Workshop starts tomorrow",
    body: "The AI & Machine Learning Workshop hosted by Google Developer Groups starts tomorrow, September 2 at 3:00 PM in Seminar Hall.",
    time: "Yesterday · 6:42 PM", timeRaw: 5, unread: true,
    action: { label: "View Event", target: "events" },
    meta: { Event: "AI & Machine Learning Workshop", Date: "September 2", Time: "3:00 PM", Location: "Seminar Hall", Organizer: "Google Developer Groups" },
  },
  {
    id: "n6", cat: "clubs", priority: "normal",
    title: "CSE Programming Club posted 3 new updates",
    body: "New event announced: UniHack 2026. Recruitment opened for Batch 52–54. New announcement posted by the club president.",
    time: "Yesterday · 4:20 PM", timeRaw: 6, unread: false,
    action: { label: "View Club", target: "clubs" },
    meta: { Club: "CSE Programming Club" },
    group: "CSE Programming Club",
  },
  {
    id: "n7", cat: "opportunities", priority: "normal",
    title: "New opportunity matching your interests",
    body: "AI Research Internship at University Research Center matches your profile (88% match). Deadline: September 30.",
    time: "Yesterday · 11:05 AM", timeRaw: 7, unread: false,
    action: { label: "View Opportunity", target: "opportunities" },
    meta: { Opportunity: "AI Research Internship", Organization: "University Research Center", Deadline: "September 30", Match: "88%" },
  },
  {
    id: "n8", cat: "opportunities", priority: "important",
    title: "Application deadline approaching",
    body: "National Programming Contest deadline is in 6 days (Sep 20). You haven't applied yet.",
    time: "Yesterday · 9:00 AM", timeRaw: 8, unread: false,
    action: { label: "View Opportunity", target: "opportunities" },
    meta: { Opportunity: "National Programming Contest", Deadline: "September 20", "Days Left": "6" },
  },
  {
    id: "n9", cat: "lostfound", priority: "important",
    title: "A possible match found for your lost item",
    body: "A found item (Black Backpack) reported at Building 3 may match your lost item report. Review the details and submit a claim if it's yours.",
    time: "Aug 28 · 9:40 AM", timeRaw: 9, unread: false,
    action: { label: "View Item", target: "lostfound" },
    meta: { "Your Report": "Black Backpack (lf1)", "Possible Match": "Black Backpack", "Found At": "Building 3, Ground Floor", "Reported": "Aug 28, 2026" },
  },
  {
    id: "n10", cat: "clubs", priority: "normal",
    title: "Your club membership was approved",
    body: "Your membership request for the Robotics & AI Society has been approved. Welcome!",
    time: "Aug 27 · 3:15 PM", timeRaw: 10, unread: false,
    action: { label: "View Club", target: "clubs" },
    meta: { Club: "Robotics & AI Society", Status: "Member" },
  },
  {
    id: "n11", cat: "academic", priority: "urgent",
    title: "Emergency: Exam Hall B is unavailable",
    body: "Due to maintenance, Exam Hall B is temporarily unavailable. All exams scheduled there on Sep 5 have been moved to Hall A. Please check updated room assignments.",
    time: "Aug 27 · 7:00 AM", timeRaw: 11, unread: false,
    action: { label: "View Exam", target: "exams" },
    meta: { "Affected Date": "September 5", "Original Hall": "Exam Hall B", "New Hall": "Hall A", "Action Required": "Check updated room assignments" },
  },
  {
    id: "n12", cat: "system", priority: "normal",
    title: "UniLink system maintenance tonight",
    body: "Scheduled maintenance tonight from 2:00 AM – 4:00 AM. Some features may be temporarily unavailable.",
    time: "Aug 26 · 12:00 PM", timeRaw: 12, unread: false,
    action: { label: "View", target: "dashboard" },
    meta: { Window: "Aug 27 · 2:00 AM – 4:00 AM", "Affected Services": "File uploads, notifications" },
  },
];

const FILTER_TABS = ["All","Unread","Academic","Campus","Opportunities","Clubs","Lost & Found","System"] as const;
type FilterTab = typeof FILTER_TABS[number];

function matchFilter(n: Notif, tab: FilterTab): boolean {
  if (tab === "All") return true;
  if (tab === "Unread") return n.unread;
  if (tab === "Academic") return n.cat === "academic";
  if (tab === "Campus") return n.cat === "events";
  if (tab === "Opportunities") return n.cat === "opportunities";
  if (tab === "Clubs") return n.cat === "clubs";
  if (tab === "Lost & Found") return n.cat === "lostfound";
  if (tab === "System") return n.cat === "system";
  return true;
}

// ─── TOGGLE ───────────────────────────────────────────────────────────────────────
function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  return (
    <button onClick={() => onChange(!on)}
      style={{ width: 40, height: 22, borderRadius: 11, background: on ? c.primary : c.surface3, border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
      <span style={{ position: "absolute", top: 2, left: on ? 20 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)", display: "block" }} />
    </button>
  );
}

// ─── NOTIFICATION SETTINGS ────────────────────────────────────────────────────────
type SettingGroup = { title: string; items: { key: string; label: string; locked?: boolean }[] };
const SETTING_GROUPS: SettingGroup[] = [
  { title: "Academic", items: [
    { key: "assign_remind", label: "Assignment reminders" },
    { key: "exam_remind",   label: "Exam reminders" },
    { key: "routine_chg",   label: "Routine changes" },
    { key: "new_material",  label: "New course materials" },
    { key: "course_ann",    label: "Course announcements" },
  ]},
  { title: "Events", items: [
    { key: "new_event",   label: "New events" },
    { key: "event_remind",label: "Event reminders" },
    { key: "event_chg",   label: "Event changes" },
    { key: "event_cancel",label: "Event cancellations" },
  ]},
  { title: "Clubs & Communities", items: [
    { key: "club_ann",      label: "Club announcements" },
    { key: "club_events",   label: "Club events" },
    { key: "membership_upd",label: "Membership updates" },
    { key: "recruitment",   label: "Recruitment" },
  ]},
  { title: "Opportunities", items: [
    { key: "opp_new",     label: "Recommended opportunities" },
    { key: "opp_deadline",label: "Deadline reminders" },
    { key: "opp_status",  label: "Application status" },
  ]},
  { title: "Lost & Found", items: [
    { key: "lf_match",  label: "Possible matches" },
    { key: "lf_claim",  label: "Claim updates" },
    { key: "lf_return", label: "Return updates" },
  ]},
  { title: "System", items: [
    { key: "sys_ann",      label: "System announcements" },
    { key: "sec_alerts",   label: "Security alerts", locked: true },
    { key: "acct_updates", label: "Account updates" },
  ]},
];

function NotificationSettings({ onBack }: { onBack: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const allKeys = SETTING_GROUPS.flatMap(g => g.items.map(i => i.key));
  const [toggles, setToggles] = useState<Record<string, boolean>>(Object.fromEntries(allKeys.map(k => [k, true])));
  const [delivery, setDelivery] = useState({ inApp: true, email: true, push: true });
  const [quietHours, setQuietHours] = useState(false);

  function setToggle(key: string, val: boolean) {
    setToggles(prev => ({ ...prev, [key]: val }));
  }

  const SGroup = ({ group }: { group: SettingGroup }) => (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: "hidden", boxShadow: c.cardShadow, marginBottom: 14 }}>
      <div style={{ padding: "14px 20px", borderBottom: `1px solid ${c.border}`, background: c.surface2 }}>
        <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text }}>{group.title}</div>
      </div>
      {group.items.map((item, i) => (
        <div key={item.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 20px", borderBottom: i < group.items.length - 1 ? `1px solid ${c.border}` : "none" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{item.label}</div>
            {item.locked && <div style={{ fontSize: 11, color: c.textDim, marginTop: 1 }}>Always enabled for your security</div>}
          </div>
          <Toggle on={item.locked ? true : toggles[item.key]} onChange={v => !item.locked && setToggle(item.key, v)} />
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: c.textMuted, cursor: "pointer", fontFamily: "Inter", fontSize: 12, fontWeight: 600, marginBottom: 24, padding: 0 }}>
          <Ic n="arrowL" size={14} color={c.textMuted} /> Back to Notifications
        </button>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: c.text, letterSpacing: "-0.01em", marginBottom: 5 }}>Notification Settings</h1>
          <p style={{ fontSize: 13, color: c.textMuted }}>Choose which updates you want to receive.</p>
        </div>

        {SETTING_GROUPS.map(g => <SGroup key={g.title} group={g} />)}

        {/* Delivery preferences */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: "hidden", boxShadow: c.cardShadow, marginBottom: 14 }}>
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${c.border}`, background: c.surface2 }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text }}>Delivery Preferences</div>
            <div style={{ fontSize: 11, color: c.textDim, marginTop: 2 }}>Configure how you receive non-critical notifications.</div>
          </div>
          {[
            { key: "inApp", label: "In-App",       desc: "Notifications inside UniLink" },
            { key: "email", label: "Email",         desc: "Delivered to your university email" },
            { key: "push",  label: "Push",          desc: "Browser or device push notifications" },
          ].map((d, i) => (
            <div key={d.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 20px", borderBottom: i < 2 ? `1px solid ${c.border}` : "none" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{d.label}</div>
                <div style={{ fontSize: 11, color: c.textDim, marginTop: 1 }}>{d.desc}</div>
              </div>
              <Toggle on={delivery[d.key as keyof typeof delivery]} onChange={v => setDelivery(prev => ({ ...prev, [d.key]: v }))} />
            </div>
          ))}
        </div>

        {/* Quiet Hours */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: "hidden", boxShadow: c.cardShadow }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: quietHours ? `1px solid ${c.border}` : "none" }}>
            <div>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text }}>Quiet Hours</div>
              <div style={{ fontSize: 12, color: c.textMuted, marginTop: 3, lineHeight: 1.5 }}>Non-critical notifications will be delivered after quiet hours.</div>
            </div>
            <Toggle on={quietHours} onChange={setQuietHours} />
          </div>
          {quietHours && (
            <div style={{ padding: "16px 20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 }}>Start</label>
                  <input type="time" defaultValue="23:00" style={{ width: "100%", padding: "8px 12px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 13, outline: "none" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 }}>End</label>
                  <input type="time" defaultValue="07:00" style={{ width: "100%", padding: "8px 12px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 13, outline: "none" }} />
                </div>
              </div>
              <div style={{ fontSize: 12, color: c.textDim, lineHeight: 1.55 }}>Important and urgent notifications may still be delivered during quiet hours.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── NOTIFICATION DETAIL ──────────────────────────────────────────────────────────
function NotifDetail({ notif, onBack, onMarkUnread, onNavigate }: {
  notif: Notif; onBack: () => void; onMarkUnread: (id: string) => void; onNavigate?: (target: string) => void;
}) {
  const { theme } = useTheme(); const c = tok(theme);
  const catCfg = CAT_CFG[notif.cat];
  const priCfg = PRIORITY_CFG[notif.priority];

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: c.textMuted, cursor: "pointer", fontFamily: "Inter", fontSize: 12, fontWeight: 600, marginBottom: 24, padding: 0 }}>
          <Ic n="arrowL" size={14} color={c.textMuted} /> Back to Notifications
        </button>

        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, padding: "28px 32px", boxShadow: c.cardShadow }}>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 20 }}>
            <div style={{ width: 46, height: 46, borderRadius: 13, background: catCfg.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{catCfg.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 7, marginBottom: 7, flexWrap: "wrap", alignItems: "center" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: catCfg.color, background: catCfg.bg, borderRadius: 5, padding: "1px 7px" }}>{catCfg.label}</span>
                {notif.priority !== "normal" && (
                  <span style={{ fontSize: 10, fontWeight: 700, color: priCfg.color, background: priCfg.bg, borderRadius: 5, padding: "1px 7px", display: "flex", alignItems: "center", gap: 4 }}>
                    <Ic n="alert" size={9} color={priCfg.color} /> {priCfg.label}
                  </span>
                )}
              </div>
              <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 18, color: c.text, lineHeight: 1.3, marginBottom: 5 }}>{notif.title}</h2>
              <div style={{ fontSize: 12, color: c.textDim }}>{notif.time}</div>
            </div>
          </div>

          <p style={{ fontSize: 14, color: c.textMuted, lineHeight: 1.75, marginBottom: 22 }}>{notif.body}</p>

          {notif.meta && Object.keys(notif.meta).length > 0 && (
            <div style={{ background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 12, padding: "14px 18px", marginBottom: 22 }}>
              {Object.entries(notif.meta).map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 7 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: c.textDim, flexShrink: 0 }}>{k}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: c.text, textAlign: "right" }}>{v}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            {notif.action && (
              <button onClick={() => onNavigate?.(notif.action!.target)}
                style={{ flex: 1, padding: "11px 0", borderRadius: 10, background: catCfg.color, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                {notif.action.label}
              </button>
            )}
            <button onClick={() => { onMarkUnread(notif.id); onBack(); }}
              style={{ padding: "11px 18px", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
              Mark as Unread
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── NOTIFICATION ITEM ────────────────────────────────────────────────────────────
function NotifItem({ notif, onOpen, onMarkRead }: { notif: Notif; onOpen: () => void; onMarkRead: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [hov, setHov] = useState(false);
  const catCfg = CAT_CFG[notif.cat];
  const priCfg = PRIORITY_CFG[notif.priority];

  const urgentBorder = notif.priority === "urgent" ? "1px solid rgba(239,68,68,0.25)" : `1px solid ${c.border}`;
  const bg = notif.unread ? c.unreadBg : c.surface;
  const hovBg = notif.unread ? (theme === "light" ? "#E8F0FE" : "rgba(59,130,246,0.1)") : c.surface2;

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={() => { onMarkRead(); onOpen(); }}
      style={{ display: "flex", gap: 13, alignItems: "flex-start", padding: "15px 20px", background: hov ? hovBg : bg, borderBottom: `1px solid ${c.border}`, cursor: "pointer", transition: "background 0.13s", border: notif.priority === "urgent" ? urgentBorder : undefined, position: "relative" }}>
      {notif.unread && (
        <div style={{ position: "absolute", top: "50%", left: 6, transform: "translateY(-50%)", width: 6, height: 6, borderRadius: "50%", background: c.primary }} />
      )}
      <div style={{ width: 38, height: 38, borderRadius: 11, background: catCfg.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0, marginLeft: 6 }}>{catCfg.emoji}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 4, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: catCfg.color, textTransform: "uppercase", letterSpacing: "0.08em" }}>{catCfg.label}</span>
          {notif.priority !== "normal" && (
            <span style={{ fontSize: 9, fontWeight: 700, color: priCfg.color, display: "flex", alignItems: "center", gap: 3 }}>
              <Ic n="alert" size={8} color={priCfg.color} /> {priCfg.label}
            </span>
          )}
          {notif.group && <span style={{ fontSize: 9, color: c.textDim }}>{notif.group}</span>}
        </div>
        <div style={{ fontSize: 13, fontWeight: notif.unread ? 700 : 500, color: c.text, lineHeight: 1.4, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{notif.title}</div>
        <div style={{ fontSize: 12, color: c.textDim, lineHeight: 1.5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{notif.body}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
          <span style={{ fontSize: 11, color: c.textDim }}>{notif.time}</span>
          {notif.action && (
            <span style={{ fontSize: 11, fontWeight: 700, color: catCfg.color }}>{notif.action.label} →</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN NOTIFICATIONS PAGE ──────────────────────────────────────────────────────
type NView = "list" | "detail" | "settings";

export default function NotificationsPage({ onNavigate }: { onNavigate?: (target: string) => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [view, setView] = useState<NView>("list");
  const [selected, setSelected] = useState<Notif | null>(null);
  const [filter, setFilter] = useState<FilterTab>("All");
  const [notifs, setNotifs] = useState<Notif[]>(ALL_NOTIFS);
  const [newBanner, setNewBanner] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setNewBanner(true), 5000);
    return () => clearTimeout(t);
  }, []);

  const unreadCount = notifs.filter(n => n.unread).length;
  const filtered = notifs.filter(n => matchFilter(n, filter));
  const catCounts: Partial<Record<FilterTab, number>> = {
    All:    notifs.length,
    Unread: unreadCount,
    Academic: notifs.filter(n => n.cat === "academic").length,
    Campus:   notifs.filter(n => n.cat === "events").length,
    Opportunities: notifs.filter(n => n.cat === "opportunities").length,
    Clubs:         notifs.filter(n => n.cat === "clubs").length,
    "Lost & Found":notifs.filter(n => n.cat === "lostfound").length,
    System:        notifs.filter(n => n.cat === "system").length,
  };

  function markRead(id: string) {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  }
  function markUnread(id: string) {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, unread: true } : n));
  }
  function markAllRead() {
    setNotifs(prev => prev.map(n => ({ ...n, unread: false })));
  }

  if (view === "settings") return <NotificationSettings onBack={() => setView("list")} />;
  if (view === "detail" && selected) return (
    <NotifDetail notif={selected} onBack={() => setView("list")} onMarkUnread={markUnread} onNavigate={onNavigate} />
  );

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* New notif banner */}
        {newBanner && (
          <div style={{ background: c.primary, color: "#fff", borderRadius: 12, padding: "10px 18px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
              <Ic n="bell" size={13} color="#fff" />
              <span style={{ fontSize: 13, fontWeight: 600 }}>3 new notifications</span>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.8)", background: "none", border: "none", cursor: "pointer" }}>View</button>
              <button onClick={() => setNewBanner(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><Ic n="x" size={14} color="rgba(255,255,255,0.7)" /></button>
            </div>
          </div>
        )}

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22, gap: 12, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 24, color: c.text, letterSpacing: "-0.02em", marginBottom: 4 }}>Notifications</h1>
            <p style={{ fontSize: 13, color: c.textMuted }}>Stay up to date with important academic and campus activity.</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {unreadCount > 0 && (
              <button onClick={markAllRead} style={{ padding: "8px 16px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}>
                <Ic n="check" size={13} color={c.textDim} /> Mark all as read
              </button>
            )}
            <button onClick={() => setView("settings")} style={{ padding: "8px 12px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600 }}>
              <Ic n="settings" size={13} color={c.textDim} /> Settings
            </button>
          </div>
        </div>

        {/* Summary chips */}
        <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
          {(["All","Unread","Academic","Campus","Opportunities","Clubs","Lost & Found","System"] as FilterTab[]).map(f => {
            const cnt = catCounts[f] ?? 0;
            const active = filter === f;
            return (
              <button key={f} onClick={() => setFilter(f)}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: active ? 700 : 500, background: active ? `${c.primary}10` : "transparent", color: active ? c.primary : c.textMuted, border: `1px solid ${active ? c.primary + "30" : c.border}`, cursor: "pointer", whiteSpace: "nowrap" }}>
                {f}
                {cnt > 0 && <span style={{ fontSize: 10, fontWeight: 700, background: active ? c.primary : c.surface3, color: active ? "#fff" : c.textDim, borderRadius: 999, padding: "0 6px", lineHeight: "17px" }}>{cnt}</span>}
              </button>
            );
          })}
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "64px 24px", textAlign: "center", boxShadow: c.cardShadow }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🔔</div>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 16, color: c.text, marginBottom: 6 }}>
              {filter === "Unread" ? "All caught up" : `No ${filter} Notifications`}
            </div>
            <div style={{ fontSize: 13, color: c.textDim, marginBottom: 20 }}>
              {filter === "Unread" ? "You don't have any new notifications." : `You don't have any ${filter.toLowerCase()} notifications right now.`}
            </div>
            {filter !== "All" && (
              <button onClick={() => setFilter("All")} style={{ padding: "9px 22px", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>View All</button>
            )}
          </div>
        ) : (
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, overflow: "hidden", boxShadow: c.cardShadow }}>
            {filtered.map(n => (
              <NotifItem key={n.id} notif={n}
                onOpen={() => { setSelected(n); setView("detail"); }}
                onMarkRead={() => markRead(n.id)} />
            ))}
            <div style={{ padding: "14px 20px", textAlign: "center" }}>
              <button style={{ fontSize: 13, fontWeight: 600, color: c.textMuted, background: "none", border: "none", cursor: "pointer" }}>Load More</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── EXPORTED UNREAD COUNT (for bell badge) ───────────────────────────────────────
export const INITIAL_UNREAD = ALL_NOTIFS.filter(n => n.unread).length;
