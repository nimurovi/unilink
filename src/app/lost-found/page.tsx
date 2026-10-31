"use client";
import { useState, useRef, useEffect, useContext, useCallback, useSyncExternalStore } from "react";
import { ThemeCtx } from "@/components/ui/Theme";

// ─── THEME TOKENS ─────────────────────────────────────────────────────────────
type Theme = "light" | "dark";
const useTheme = () => useContext(ThemeCtx);

const LIGHT = {
  bg: "#F8FAFC", surface: "#FFFFFF", surface2: "#F1F5F9", surface3: "#E2E8F0",
  primary: "#2563EB", primaryDark: "#1D4ED8", primaryFg: "#FFFFFF", sky: "#38BDF8",
  text: "#0F172A", textMuted: "#64748B", textDim: "#94A3B8",
  border: "#E2E8F0", borderStrong: "#CBD5E1",
  cardShadow: "0 1px 4px rgba(15,23,42,0.07), 0 4px 16px rgba(15,23,42,0.04)",
  cardHoverShadow: "0 4px 24px rgba(37,99,235,0.12), 0 2px 8px rgba(15,23,42,0.08)",
  primaryGlow: "rgba(37,99,235,0.15)",
  badge: { bg: "rgba(37,99,235,0.08)", text: "#2563EB", border: "rgba(37,99,235,0.2)" },
  btnGhost: { bg: "transparent", border: "#E2E8F0", text: "#64748B", hover: "#F1F5F9" },
  highlight: "#EFF6FF",
};
const DARK = {
  bg: "#080D1A", surface: "#0F172A", surface2: "#172033", surface3: "#1E293B",
  primary: "#3B82F6", primaryDark: "#2563EB", primaryFg: "#FFFFFF", sky: "#38BDF8",
  text: "#F8FAFC", textMuted: "#94A3B8", textDim: "#475569",
  border: "#1E293B", borderStrong: "#334155",
  cardShadow: "0 1px 4px rgba(0,0,0,0.3), 0 4px 20px rgba(0,0,0,0.2)",
  cardHoverShadow: "0 4px 28px rgba(59,130,246,0.18), 0 2px 8px rgba(0,0,0,0.3)",
  primaryGlow: "rgba(59,130,246,0.2)",
  badge: { bg: "rgba(59,130,246,0.15)", text: "#60A5FA", border: "rgba(59,130,246,0.25)" },
  btnGhost: { bg: "transparent", border: "#1E293B", text: "#94A3B8", hover: "#172033" },
  highlight: "rgba(37,99,235,0.1)",
};
const tok = (t: Theme) => t === "light" ? LIGHT : DARK;

// ─── TYPES ────────────────────────────────────────────────────────────────────
type ItemStatus = "Searching" | "Looking for Owner" | "Possible Match" | "Returned";
type ItemKind = "lost" | "found";
type Category = "Electronics" | "Wallet" | "ID Card" | "Books" | "Keys" | "Bags" | "Clothing" | "Accessories" | "Documents" | "Other";

interface LFItem {
  id: string;
  kind: ItemKind;
  name: string;
  category: Category;
  location: string;
  date: string;
  description: string;
  status: ItemStatus;
  postedBy: string;
  avatar: string;
  icon: string;
  bg: string;
  matchId?: string;
}

const REPORTS_KEY = "unilink.demo.lost-found.v1";
const REPORTS_EVENT = "unilink:lost-found-changed";
function reportsSnapshot() {
  try { return localStorage.getItem(REPORTS_KEY) ?? "[]"; } catch { return "[]"; }
}
function subscribeReports(listener: () => void) {
  const storage = (event: StorageEvent) => { if (event.key === REPORTS_KEY || event.key === null) listener(); };
  window.addEventListener(REPORTS_EVENT, listener);
  window.addEventListener("storage", storage);
  return () => { window.removeEventListener(REPORTS_EVENT, listener); window.removeEventListener("storage", storage); };
}
function parseReports(raw: string): LFItem[] {
  const data: unknown = JSON.parse(raw);
  if (!Array.isArray(data) || !data.every(item => item &&
    ["id", "name", "category", "location", "date", "description", "status", "postedBy", "avatar", "icon", "bg"].every(key => typeof item[key] === "string") &&
    (item.kind === "lost" || item.kind === "found"))) throw new Error("Saved reports could not be read.");
  return data as LFItem[];
}
function useLocalReports() {
  const raw = useSyncExternalStore(subscribeReports, reportsSnapshot, () => "[]");
  try { return parseReports(raw); } catch { return []; }
}
function saveReport(item: LFItem) {
  try {
    const current = parseReports(localStorage.getItem(REPORTS_KEY) ?? "[]");
    localStorage.setItem(REPORTS_KEY, JSON.stringify([item, ...current]));
    window.dispatchEvent(new Event(REPORTS_EVENT));
  } catch {
    throw new Error("Could not save the report. Check browser storage permissions and available space. Existing reports have not been overwritten.");
  }
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const ITEMS: LFItem[] = [
  {
    id: "l1", kind: "lost", name: "AirPods Pro", category: "Electronics",
    location: "Central Library — 2nd Floor", date: "Aug 24",
    description: "White AirPods Pro in a white charging case. Has a small scratch on the lid. Very important to me.",
    status: "Searching", postedBy: "Fahim R.", avatar: "F",
    icon: "🎧", bg: "linear-gradient(135deg,#DBEAFE,#EFF6FF)",
  },
  {
    id: "l2", kind: "lost", name: "Student ID Card", category: "ID Card",
    location: "CSE Building — Main Entrance", date: "Aug 25",
    description: "AIUB Student ID. Name: Ayesha Siddiqua. Batch 52. Please hand to the guard room.",
    status: "Searching", postedBy: "Ayesha S.", avatar: "A",
    icon: "🪪", bg: "linear-gradient(135deg,#FEE2E2,#FFF1F2)",
  },
  {
    id: "l3", kind: "lost", name: "Black Backpack", category: "Bags",
    location: "Cafeteria — Near Window Seats", date: "Aug 23",
    description: "Black Nike backpack, medium size. Contains laptop charger and two notebooks. Left behind accidentally.",
    status: "Possible Match", postedBy: "Tanvir H.", avatar: "T",
    icon: "🎒", bg: "linear-gradient(135deg,#1F2937,#374151)",
    matchId: "f3",
  },
  {
    id: "l4", kind: "lost", name: "Physics Textbook", category: "Books",
    location: "Room 301 — Lecture Hall", date: "Aug 26",
    description: "Halliday Resnick Physics Vol. 1. Name written inside: Rafi Ul Islam. Semester 4.",
    status: "Searching", postedBy: "Rafi I.", avatar: "R",
    icon: "📖", bg: "linear-gradient(135deg,#FEF3C7,#FFFBEB)",
  },
  {
    id: "l5", kind: "lost", name: "Silver Car Keys", category: "Keys",
    location: "Parking Lot B", date: "Aug 22",
    description: "Toyota key fob with a small green keychain. If found, please contact via UniLink.",
    status: "Returned", postedBy: "Samira K.", avatar: "S",
    icon: "🔑", bg: "linear-gradient(135deg,#D1FAE5,#ECFDF5)",
  },

  {
    id: "f1", kind: "found", name: "Black Wallet", category: "Wallet",
    location: "Cafeteria — Main Counter", date: "Aug 25",
    description: "Black leather wallet containing some cards and cash. Handed to Security Office. Contact to verify ownership.",
    status: "Looking for Owner", postedBy: "Mehnaz A.", avatar: "M",
    icon: "👜", bg: "linear-gradient(135deg,#1F2937,#374151)",
  },
  {
    id: "f2", kind: "found", name: "Blue Umbrella", category: "Accessories",
    location: "Main Gate — Security Desk", date: "Aug 24",
    description: "Compact blue umbrella with floral pattern. Left near the main gate security post after rain.",
    status: "Looking for Owner", postedBy: "Security Office", avatar: "SO",
    icon: "☂️", bg: "linear-gradient(135deg,#DBEAFE,#EFF6FF)",
  },
  {
    id: "f3", kind: "found", name: "Black Backpack", category: "Bags",
    location: "Cafeteria — Window Area", date: "Aug 24",
    description: "Black Nike backpack found under window seat. Contains laptop charger and notebooks. In good condition.",
    status: "Possible Match", postedBy: "Nadia C.", avatar: "N",
    icon: "🎒", bg: "linear-gradient(135deg,#1F2937,#374151)",
    matchId: "l3",
  },
  {
    id: "f4", kind: "found", name: "Stainless Water Bottle", category: "Other",
    location: "Sports Complex — Lobby", date: "Aug 26",
    description: "Grey and black steel water bottle, 750ml. Has stickers on the side. Currently at the sports complex front desk.",
    status: "Looking for Owner", postedBy: "Sports Dept.", avatar: "SP",
    icon: "🫙", bg: "linear-gradient(135deg,#F1F5F9,#E2E8F0)",
  },
  {
    id: "f5", kind: "found", name: "Reading Glasses", category: "Accessories",
    location: "Library Reading Room", date: "Aug 25",
    description: "Black square-framed reading glasses. Left on table in the reading room, 3rd floor.",
    status: "Looking for Owner", postedBy: "Library Desk", avatar: "L",
    icon: "👓", bg: "linear-gradient(135deg,#F5F3FF,#EDE9FE)",
  },
];

const MY_REPORTS = ITEMS.filter((x) => ["l1", "l3"].includes(x.id));

// ─── STATUS CONFIG ────────────────────────────────────────────────────────────
function statusCfg(s: ItemStatus) {
  return {
    "Searching":          { color: "#F59E0B", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.2)",  dot: "#F59E0B", label: "Searching" },
    "Looking for Owner":  { color: "#3B82F6", bg: "rgba(59,130,246,0.1)",  border: "rgba(59,130,246,0.2)",  dot: "#3B82F6", label: "Looking for Owner" },
    "Possible Match":     { color: "#8B5CF6", bg: "rgba(139,92,246,0.1)",  border: "rgba(139,92,246,0.2)",  dot: "#8B5CF6", label: "Possible Match" },
    "Returned":           { color: "#10B981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.18)", dot: "#10B981", label: "Returned ✓" },
  }[s];
}

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
function useSR(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

// ─── ICON ─────────────────────────────────────────────────────────────────────
const PATHS: Record<string, string[]> = {
  search:  ["M21 21l-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z"],
  x:       ["M18 6L6 18M6 6l12 12"],
  filter:  ["M22 3H2l8 9.46V19l4 2v-8.54L22 3z"],
  check:   ["M20 6L9 17l-5-5"],
  arrow:   ["M5 12h14M12 5l7 7-7 7"],
  eye:     ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"],
  message: ["M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"],
  shield:  ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
  flag:    ["M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z", "M4 22v-7"],
  plus:    ["M12 5v14M5 12h14"],
  map:     ["M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z", "M12 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"],
  user:    ["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  link:    ["M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"],
  upload:  ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M17 8l-5-5-5 5M12 3v12"],
  zap:     ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"],
  sparkle: ["M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z"],
};

function Ic({ n, size = 16, color = "currentColor" }: { n: string; size?: number; color?: string }) {
  const d = PATHS[n] ?? [];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      {d.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}

// ─── SMALL SHARED BUTTONS ─────────────────────────────────────────────────────
function Btn({ children, primary, small, danger, t, onClick, full, disabled }:
  { children: React.ReactNode; primary?: boolean; small?: boolean; danger?: boolean; t: Theme; onClick?: () => void; full?: boolean; disabled?: boolean }) {
  const c = tok(t);
  const [hov, setHov] = useState(false);
  const bg = danger
    ? (hov ? "#DC2626" : "#EF4444")
    : primary
      ? (hov ? c.primaryDark : c.primary)
      : (hov ? c.btnGhost.hover : c.btnGhost.bg);
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6, cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        background: bg,
        color: (primary || danger) ? "#fff" : c.textMuted,
        fontFamily: "Inter", fontWeight: 600, fontSize: small ? 12 : 13,
        padding: small ? "6px 14px" : "9px 18px",
        borderRadius: 9, border: (primary || danger) ? "none" : `1px solid ${c.border}`,
        transition: "all 0.16s ease",
        width: full ? "100%" : undefined, justifyContent: full ? "center" : undefined,
        boxShadow: primary && hov ? `0 3px 14px ${c.primaryGlow}` : "none",
        transform: (primary || danger) && hov ? "translateY(-1px)" : "none",
      }}
    >{children}</button>
  );
}

// ─── ITEM CARD ────────────────────────────────────────────────────────────────
function ItemCard({ item, t, onView, onMatch }: { item: LFItem; t: Theme; onView: (item: LFItem) => void; onMatch?: (item: LFItem) => void }) {
  const c = tok(t);
  const [hov, setHov] = useState(false);
  const st = statusCfg(item.status);
  const isReturned = item.status === "Returned";
  const isMatch = item.status === "Possible Match";

  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: c.surface, border: `1px solid ${isMatch ? "rgba(139,92,246,0.3)" : c.border}`,
        borderRadius: 18, overflow: "hidden",
        boxShadow: hov ? c.cardHoverShadow : c.cardShadow,
        transform: hov ? "translateY(-3px)" : "none",
        transition: "all 0.22s ease",
        opacity: isReturned ? 0.65 : 1,
        position: "relative",
      }}
    >
      {/* Match ribbon */}
      {isMatch && (
        <div style={{ position: "absolute", top: 0, right: 0, background: "rgba(139,92,246,0.9)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: "0 18px 0 10px", zIndex: 2, letterSpacing: "0.04em" }}>
          ✦ MATCH FOUND
        </div>
      )}

      {/* Image area */}
      <div style={{
        height: 120, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 48, position: "relative", overflow: "hidden",
        filter: isReturned ? "grayscale(0.5)" : "none",
        transform: hov ? "scale(1.03)" : "scale(1)", transition: "transform 0.3s ease",
      }}>
        {item.icon}
        {/* Kind tag */}
        <div style={{
          position: "absolute", top: 10, left: 12,
          padding: "3px 10px", borderRadius: 999, fontSize: 10, fontWeight: 700, letterSpacing: "0.04em",
          background: item.kind === "lost" ? "rgba(239,68,68,0.85)" : "rgba(16,185,129,0.85)",
          color: "#fff", backdropFilter: "blur(4px)",
        }}>
          {item.kind === "lost" ? "LOST" : "FOUND"}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "16px 18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text, marginBottom: 2 }}>{item.name}</div>
            <div style={{ fontSize: 11, color: c.primary, fontWeight: 600 }}>{item.category}</div>
          </div>
          <span style={{ padding: "3px 9px", borderRadius: 999, fontSize: 10, fontWeight: 700, background: st.bg, color: st.color, border: `1px solid ${st.border}`, whiteSpace: "nowrap", flexShrink: 0, marginLeft: 8 }}>
            {isReturned ? "✓ Returned" : st.label}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
            <Ic n="map" size={12} color={c.textDim} />
            <span style={{ fontSize: 12, color: c.textMuted, lineHeight: 1.4 }}>{item.location}</span>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <Ic n="zap" size={12} color={c.textDim} />
            <span style={{ fontSize: 12, color: c.textMuted }}>{item.kind === "lost" ? "Lost" : "Found"}: {item.date}</span>
          </div>
        </div>

        <p style={{ fontSize: 12, color: c.textMuted, lineHeight: 1.55, marginBottom: 14, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {item.description}
        </p>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: `1px solid ${c.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ width: 24, height: 24, borderRadius: 8, background: c.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#fff", fontFamily: "Manrope" }}>
              {item.avatar.charAt(0)}
            </div>
            <span style={{ fontSize: 12, color: c.textDim }}>{item.postedBy}</span>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {isMatch && onMatch && (
              <Btn t={t} small onClick={() => onMatch(item)} primary>
                <Ic n="link" size={11} color="#fff" /> Match
              </Btn>
            )}
            <Btn t={t} small onClick={() => onView(item)}>
              <Ic n="eye" size={11} color={c.textMuted} /> Details
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ITEM DETAIL MODAL ────────────────────────────────────────────────────────
function DetailModal({ item, t, onClose, onMatchView }: { item: LFItem; t: Theme; onClose: () => void; onMatchView?: (item: LFItem) => void }) {
  const c = tok(t);
  const st = statusCfg(item.status);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [marked, setMarked] = useState<string | null>(null);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}
      onClick={onClose}
    >
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }} />
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative", zIndex: 1, width: "100%", maxWidth: 580, maxHeight: "90vh",
          background: c.surface, borderRadius: 24, border: `1px solid ${c.border}`,
          overflow: "hidden", display: "flex", flexDirection: "column",
          boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
          animation: "fade-up 0.25s ease both",
        }}
      >
        {/* Header image */}
        <div style={{ height: 180, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, flexShrink: 0, position: "relative" }}>
          {item.icon}
          <div style={{ position: "absolute", top: 14, left: 16, padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: item.kind === "lost" ? "rgba(239,68,68,0.85)" : "rgba(16,185,129,0.85)", color: "#fff", backdropFilter: "blur(4px)" }}>
            {item.kind === "lost" ? "LOST" : "FOUND"}
          </div>
          <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, width: 32, height: 32, borderRadius: 9, background: "rgba(0,0,0,0.35)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
            <Ic n="x" size={16} color="#fff" />
          </button>
        </div>

        {/* Content */}
        <div style={{ overflowY: "auto", flex: 1, padding: "24px 28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
            <div>
              <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: c.text, marginBottom: 4 }}>{item.name}</h2>
              <div style={{ fontSize: 13, color: c.primary, fontWeight: 600 }}>{item.category}</div>
            </div>
            <span style={{ padding: "5px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: st.bg, color: st.color, border: `1px solid ${st.border}` }}>
              {item.status === "Returned" ? "✓ Returned" : st.label}
            </span>
          </div>

          <p style={{ fontSize: 14, color: c.textMuted, lineHeight: 1.65, marginBottom: 22 }}>{item.description}</p>

          {/* Meta */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 22 }}>
            {[
              { label: item.kind === "lost" ? "Lost At" : "Found At", val: item.location, icon: "map" },
              { label: "Date", val: item.date, icon: "zap" },
              { label: "Category", val: item.category, icon: "filter" },
              { label: "Posted by", val: item.postedBy, icon: "user" },
            ].map((m) => (
              <div key={m.label} style={{ background: c.surface2, borderRadius: 12, padding: "12px 14px", border: `1px solid ${c.border}` }}>
                <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 4 }}>
                  <Ic n={m.icon} size={12} color={c.textDim} />
                  <span style={{ fontSize: 11, color: c.textDim, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{m.label}</span>
                </div>
                <div style={{ fontSize: 13, color: c.text, fontWeight: 500 }}>{m.val}</div>
              </div>
            ))}
          </div>

          {/* Match hint */}
          {item.status === "Possible Match" && onMatchView && (
            <div style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 14, padding: "14px 16px", marginBottom: 20, display: "flex", gap: 12, alignItems: "center" }}>
              <Ic n="sparkle" size={18} color="#8B5CF6" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#8B5CF6", marginBottom: 2 }}>Possible match found</div>
                <div style={{ fontSize: 12, color: c.textMuted }}>UniLink identified a likely matching item. Review to confirm.</div>
              </div>
              <Btn t={t} primary small onClick={() => { onClose(); const match = ITEMS.find((i) => i.id === item.matchId); if (match) onMatchView(match); }}>
                Review
              </Btn>
            </div>
          )}

          {/* Privacy shield */}
          {item.kind === "found" && !verified && (
            <div style={{ background: t === "light" ? "#F0FDF4" : "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 14, padding: "14px 16px", marginBottom: 20, display: "flex", gap: 12, alignItems: "flex-start" }}>
              <Ic n="shield" size={18} color="#10B981" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#10B981", marginBottom: 3 }}>Verify ownership first</div>
                <div style={{ fontSize: 12, color: c.textMuted, lineHeight: 1.5 }}>To protect the finder, please verify you&apos;re the owner before contacting. Describe the item&apos;s distinctive details.</div>
              </div>
            </div>
          )}

          {/* Actions */}
          {item.status !== "Returned" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {item.kind === "found" && !verified && (
                <Btn t={t} primary full onClick={() => { setVerifying(true); setTimeout(() => { setVerifying(false); setVerified(true); }, 1400); }}>
                  <Ic n="shield" size={14} color="#fff" />
                  {verifying ? "Verifying…" : "Verify Ownership"}
                </Btn>
              )}
              {(item.kind === "lost" || verified) && (
                <Btn t={t} primary full>
                  <Ic n="check" size={14} color="#fff" />
                  {item.kind === "lost" ? "I Found This" : "This is Mine"}
                </Btn>
              )}
              <Btn t={t} full>
                <Ic n="message" size={14} color={c.textMuted} />
                Contact via UniLink
              </Btn>
              {item.kind === "lost" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  {["Returned", "Still Searching", "No Longer Needed"].map((opt) => (
                    <button key={opt} onClick={() => setMarked(opt)} style={{
                      padding: "7px 6px", borderRadius: 9, fontSize: 11, fontWeight: 600, cursor: "pointer",
                      background: marked === opt ? c.primary : c.surface2,
                      color: marked === opt ? "#fff" : c.textMuted,
                      border: `1px solid ${marked === opt ? c.primary : c.border}`,
                      transition: "all 0.18s ease",
                    }}>{opt}</button>
                  ))}
                </div>
              )}
              <Btn t={t} danger full small>
                <Ic n="flag" size={12} color="#fff" /> Report this post
              </Btn>
            </div>
          )}
          {item.status === "Returned" && (
            <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 14, padding: "16px", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>🎉</div>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: "#10B981", marginBottom: 4 }}>Item Successfully Returned</div>
              <div style={{ fontSize: 13, color: c.textMuted }}>This item has been reunited with its owner. Thanks to the campus community!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MATCH VIEW MODAL ─────────────────────────────────────────────────────────
function MatchModal({ lostItem, foundItem, t, onClose }: { lostItem: LFItem; foundItem: LFItem; t: Theme; onClose: () => void }) {
  const c = tok(t);
  const checks = ["Same category", "Similar description", "Same location", "Similar date"];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }} />
      <div onClick={(e) => e.stopPropagation()} style={{
        position: "relative", zIndex: 1, width: "100%", maxWidth: 520, maxHeight: "calc(100dvh - 40px)",
        background: c.surface, borderRadius: 24, border: `1px solid rgba(139,92,246,0.35)`,
        boxShadow: "0 32px 80px rgba(139,92,246,0.15)",
        overflowY: "auto", animation: "fade-up 0.25s ease both",
      }}>
        {/* Header */}
        <div style={{ padding: "22px 26px 18px", borderBottom: `1px solid ${c.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#8B5CF6", letterSpacing: "0.06em", marginBottom: 4 }}>✦ POSSIBLE MATCH</div>
            <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 18, color: c.text }}>UniLink found a likely match</div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ic n="x" size={15} color={c.textMuted} />
          </button>
        </div>

        <div style={{ padding: "22px 26px" }}>
          {/* Items */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 40px 1fr", gap: 10, alignItems: "center", marginBottom: 24 }}>
            {[lostItem, foundItem].map((item, idx) => (
              <>
                <div key={item.id} style={{ background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 14, padding: "16px", textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: item.kind === "lost" ? "#EF4444" : "#10B981", marginBottom: 4 }}>{item.kind === "lost" ? "LOST" : "FOUND"}</div>
                  <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 2 }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: c.textDim }}>{item.location}</div>
                </div>
                {idx === 0 && (
                  <div key="arrow" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 1, height: 16, background: "rgba(139,92,246,0.4)" }} />
                    <div style={{ width: 24, height: 24, borderRadius: 8, background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Ic n="link" size={12} color="#8B5CF6" />
                    </div>
                    <div style={{ width: 1, height: 16, background: "rgba(139,92,246,0.4)" }} />
                  </div>
                )}
              </>
            ))}
          </div>

          {/* Match signals */}
          <div style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: 14, padding: "14px 16px", marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#8B5CF6", marginBottom: 12 }}>Match signals</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {checks.map((ch) => (
                <div key={ch} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ width: 18, height: 18, borderRadius: 6, background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Ic n="check" size={10} color="#10B981" />
                  </div>
                  <span style={{ fontSize: 13, color: c.textMuted }}>{ch}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <Btn t={t} primary full>
              <Ic n="check" size={14} color="#fff" /> Confirm Match
            </Btn>
            <Btn t={t} full onClick={onClose}>Dismiss</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── REPORT MODAL ─────────────────────────────────────────────────────────────
const CATEGORIES: Category[] = ["Electronics","Wallet","ID Card","Books","Keys","Bags","Clothing","Accessories","Documents","Other"];
const LOCATIONS = ["Central Library", "CSE Building", "Cafeteria", "Main Gate", "Room 301", "Parking Lot B", "Sports Complex", "Admin Building", "Lab Floor", "Other"];

function ReportModal({ kind, t, onClose, onSaved }: { kind: ItemKind; t: Theme; onClose: () => void; onSaved: () => void }) {
  const c = tok(t);
  const [step, setStep] = useState(1);
  const [cat, setCat] = useState<Category | "">("");
  const [name, setName] = useState("");
  const [loc, setLoc] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  });
  const [error, setError] = useState("");
  function submitReport() {
    if (!name.trim() || !cat || !loc || !date || !desc.trim()) {
      setError("Complete the item name, category, location, date, and description."); return;
    }
    if (name.length > 120 || desc.length > 2000) {
      setError("Use at most 120 characters for the name and 2,000 for the description."); return;
    }
    try {
      saveReport({ id: crypto.randomUUID(), kind, name: name.trim(), category: cat,
        location: loc, date, description: desc.trim(), status: kind === "lost" ? "Searching" : "Looking for Owner",
        postedBy: "You (local demo)", avatar: "Y", icon: kind === "lost" ? "🔍" : "📦", bg: "linear-gradient(135deg,#DBEAFE,#EFF6FF)" });
      onSaved();
    } catch (err) { setError(err instanceof Error ? err.message : "Could not save report."); }
  }
  const isLost = kind === "lost";
  const accent = isLost ? "#EF4444" : "#10B981";
  const accentBg = isLost ? "rgba(239,68,68,0.08)" : "rgba(16,185,129,0.08)";
  const accentBorder = isLost ? "rgba(239,68,68,0.2)" : "rgba(16,185,129,0.2)";

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 14px", borderRadius: 10,
    background: c.surface2, border: `1px solid ${c.border}`,
    color: c.text, fontFamily: "Inter", fontSize: 14,
    outline: "none", transition: "border-color 0.16s ease",
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }} />
      <div onClick={(e) => e.stopPropagation()} style={{
        position: "relative", zIndex: 1, width: "100%", maxWidth: 520, maxHeight: "calc(100dvh - 40px)",
        background: c.surface, borderRadius: 24, border: `1px solid ${c.border}`,
        boxShadow: "0 32px 80px rgba(0,0,0,0.2)", overflowY: "auto",
        animation: "fade-up 0.25s ease both",
      }}>
        {/* Header */}
        <div style={{ padding: "22px 26px 18px", borderBottom: `1px solid ${c.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 999, background: accentBg, border: `1px solid ${accentBorder}`, marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: accent, letterSpacing: "0.06em" }}>{isLost ? "LOST ITEM" : "FOUND ITEM"}</span>
            </div>
            <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 18, color: c.text }}>
              {isLost ? "Report a Lost Item" : "Report a Found Item"}
            </div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ic n="x" size={15} color={c.textMuted} />
          </button>
        </div>

        {/* Step indicator */}
        <div style={{ padding: "14px 26px", borderBottom: `1px solid ${c.border}`, display: "flex", gap: 6 }}>
          {[1, 2, 3].map((s) => (
            <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: s <= step ? accent : c.surface3, transition: "background 0.3s ease" }} />
          ))}
        </div>

        <div style={{ padding: "24px 26px" }}>
          {step === 1 && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: c.textDim, marginBottom: 16 }}>Step 1 — Item details</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, display: "block", marginBottom: 6 }}>Item name *</label>
                  <input style={inputStyle} placeholder="e.g. AirPods Pro" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, display: "block", marginBottom: 8 }}>Category *</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7 }}>
                    {CATEGORIES.map((ct) => (
                      <button key={ct} onClick={() => setCat(ct)} style={{
                        padding: "7px 6px", borderRadius: 9, fontSize: 11, fontWeight: 600, cursor: "pointer",
                        background: cat === ct ? accentBg : c.surface2,
                        color: cat === ct ? accent : c.textMuted,
                        border: `1px solid ${cat === ct ? accentBorder : c.border}`,
                        transition: "all 0.15s ease",
                      }}>{ct}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: c.textDim, marginBottom: 16 }}>Step 2 — Location & date</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, display: "block", marginBottom: 6 }}>{isLost ? "Where did you lose it?" : "Where did you find it?"} *</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
                    {LOCATIONS.map((l) => (
                      <button key={l} onClick={() => setLoc(l)} style={{
                        padding: "7px 10px", borderRadius: 9, fontSize: 11, fontWeight: 600, cursor: "pointer", textAlign: "left",
                        background: loc === l ? accentBg : c.surface2,
                        color: loc === l ? accent : c.textMuted,
                        border: `1px solid ${loc === l ? accentBorder : c.border}`,
                        transition: "all 0.15s ease",
                      }}>{l}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, display: "block", marginBottom: 6 }}>Date *</label>
                  <input type="date" style={inputStyle} value={date} onChange={e => setDate(e.target.value)} />
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: c.textDim, marginBottom: 16 }}>Step 3 — Description</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, display: "block", marginBottom: 6 }}>Description *</label>
                  <textarea style={{ ...inputStyle, height: 90, resize: "vertical" }} placeholder={isLost ? "Describe the item in detail…" : "Describe where and when you found it…"} value={desc} onChange={(e) => setDesc(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, display: "block", marginBottom: 6 }}>Photo (optional)</label>
                  <div style={{ border: `2px dashed ${c.border}`, borderRadius: 12, padding: "24px", textAlign: "center", background: c.surface2 }}>
                    <Ic n="upload" size={20} color={c.textDim} />
                    <div style={{ fontSize: 13, color: c.textMuted, marginTop: 8 }}>Photo upload is not connected yet</div>
                    <div style={{ fontSize: 11, color: c.textDim, marginTop: 4 }}>You can save a text report in this browser.</div>
                  </div>
                </div>
                {/* Privacy note */}
                <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: 12, padding: "12px 14px", display: "flex", gap: 10 }}>
                  <Ic n="shield" size={14} color="#10B981" />
                  <div style={{ fontSize: 12, color: c.textMuted, lineHeight: 1.5 }}>Demo: this report is saved only in this browser. Messaging and ownership verification are not connected yet.</div>
                </div>
              </div>
            </div>
          )}

          {error && <p role="alert" style={{ color: "#EF4444" }}>{error}</p>}
          {/* Nav */}
          <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
            {step > 1 && <Btn t={t} onClick={() => setStep(s => s - 1)}>← Back</Btn>}
            {step < 3
              ? <Btn t={t} primary full onClick={() => setStep(s => s + 1)} disabled={(step === 1 && (!name.trim() || !cat)) || (step === 2 && (!loc || !date))}>
                  Continue →
                </Btn>
              : <Btn t={t} primary full onClick={submitReport} disabled={!desc.trim()}>
                  <Ic n="check" size={14} color="#fff" /> Submit Report
                </Btn>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN LOST & FOUND SECTION ────────────────────────────────────────────────
type LFTab = "lost" | "found" | "mine" | "matches";

export default function LostFoundSection() {
  const localReports = useLocalReports();
  const allItems = [...localReports, ...ITEMS];
  const myReports = [...localReports, ...MY_REPORTS];
  const [notice, setNotice] = useState("");
  const { theme } = useTheme();
  const c = tok(theme);
  const { ref, vis } = useSR(0.05);

  const [tab, setTab] = useState<LFTab>("lost");
  const [query, setQuery] = useState("");
  const [catFilter, setCatFilter] = useState<Category | "All">("All");
  const [detail, setDetail] = useState<LFItem | null>(null);
  const [matchPair, setMatchPair] = useState<{ lost: LFItem; found: LFItem } | null>(null);
  const [reportKind, setReportKind] = useState<ItemKind | null>(null);
  const [statusFilter, setStatusFilter] = useState<ItemStatus | "All">("All");

  const openMatch = useCallback((item: LFItem) => {
    const otherId = item.matchId;
    if (!otherId) return;
    const other = ITEMS.find((i) => i.id === otherId);
    if (!other) return;
    setDetail(null);
    setMatchPair(item.kind === "lost" ? { lost: item, found: other } : { lost: other, found: item });
  }, []);

  const baseItems = tab === "lost" ? allItems.filter(i => i.kind === "lost")
    : tab === "found" ? allItems.filter(i => i.kind === "found")
    : tab === "mine" ? myReports
    : ITEMS.filter(i => i.status === "Possible Match");

  const filtered = baseItems.filter((item) => {
    const matchQ = query === "" || item.name.toLowerCase().includes(query.toLowerCase()) || item.location.toLowerCase().includes(query.toLowerCase()) || item.description.toLowerCase().includes(query.toLowerCase());
    const matchCat = catFilter === "All" || item.category === catFilter;
    const matchSt = statusFilter === "All" || item.status === statusFilter;
    return matchQ && matchCat && matchSt;
  });

  const tabs: { id: LFTab; label: string; count: number; icon: string }[] = [
    { id: "lost", label: "Lost Items", count: allItems.filter(i => i.kind === "lost").length, icon: "🔍" },
    { id: "found", label: "Found Items", count: allItems.filter(i => i.kind === "found").length, icon: "✅" },
    { id: "mine", label: "My Reports", count: myReports.length, icon: "📋" },
    { id: "matches", label: "Possible Matches", count: allItems.filter(i => i.status === "Possible Match").length, icon: "✨" },
  ];

  return (
    <>
      <section ref={ref} className={`sr ${vis ? "visible" : ""}`} style={{ padding: "100px 0", background: c.surface2 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>

          {/* Section header */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "flex-end", marginBottom: 56 }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 999, background: c.badge.bg, border: `1px solid ${c.badge.border}`, marginBottom: 20 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: c.badge.text, letterSpacing: "0.04em", textTransform: "uppercase" }}>Lost & Found</span>
              </div>
              <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: "clamp(26px, 3.5vw, 48px)", letterSpacing: "-0.028em", color: c.text, marginBottom: 14, lineHeight: 1.1 }}>
                Lost something? Found something?<br />
                <span style={{ background: "linear-gradient(120deg, #2563EB 0%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Help it get home.
                </span>
              </h2>
              <p style={{ fontSize: 17, color: c.textMuted, maxWidth: 540, lineHeight: 1.65 }}>
                A trusted campus community service. Report items you&apos;ve lost or found, and UniLink will help match them with their owners.
              </p>
            </div>

            {/* CTA buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
              <button onClick={() => setReportKind("lost")} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "12px 22px", borderRadius: 12,
                background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
                color: "#EF4444", fontFamily: "Inter", fontWeight: 700, fontSize: 14, cursor: "pointer",
                transition: "all 0.18s ease",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.14)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)"; }}
              >
                <Ic n="flag" size={16} color="#EF4444" /> Report Lost Item
              </button>
              <button onClick={() => setReportKind("found")} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "12px 22px", borderRadius: 12,
                background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)",
                color: "#10B981", fontFamily: "Inter", fontWeight: 700, fontSize: 14, cursor: "pointer",
                transition: "all 0.18s ease",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(16,185,129,0.14)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(16,185,129,0.08)"; }}
              >
                <Ic n="check" size={16} color="#10B981" /> Report Found Item
              </button>
            </div>
          </div>

          {/* Search + filters */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "20px 22px", marginBottom: 28, boxShadow: c.cardShadow }}>
            {/* Search bar */}
            <div style={{ position: "relative", marginBottom: 16 }}>
              <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}>
                <Ic n="search" size={16} color={c.textDim} />
              </div>
              <input
                value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="What did you lose? Search by item name or location…"
                style={{
                  width: "100%", padding: "12px 14px 12px 44px", borderRadius: 12,
                  background: c.surface2, border: `1px solid ${c.border}`,
                  color: c.text, fontFamily: "Inter", fontSize: 14, outline: "none",
                }}
              />
              {query && (
                <button onClick={() => setQuery("")} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", display: "flex" }}>
                  <Ic n="x" size={14} color={c.textDim} />
                </button>
              )}
            </div>

            {/* Filter row */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginRight: 4 }}>
                <Ic n="filter" size={13} color={c.textDim} />
                <span style={{ fontSize: 12, fontWeight: 600, color: c.textDim }}>Filter:</span>
              </div>

              {/* Category filter */}
              <select onChange={(e) => setCatFilter(e.target.value as Category | "All")} value={catFilter} style={{
                padding: "5px 10px", borderRadius: 8, background: c.surface2, border: `1px solid ${c.border}`,
                color: c.textMuted, fontSize: 12, fontWeight: 600, cursor: "pointer", outline: "none",
              }}>
                <option value="All">All Categories</option>
                {CATEGORIES.map((ct) => <option key={ct} value={ct}>{ct}</option>)}
              </select>

              {/* Status filter */}
              <select onChange={(e) => setStatusFilter(e.target.value as ItemStatus | "All")} value={statusFilter} style={{
                padding: "5px 10px", borderRadius: 8, background: c.surface2, border: `1px solid ${c.border}`,
                color: c.textMuted, fontSize: 12, fontWeight: 600, cursor: "pointer", outline: "none",
              }}>
                <option value="All">All Statuses</option>
                {(["Searching","Looking for Owner","Possible Match","Returned"] as ItemStatus[]).map((s) => <option key={s} value={s}>{s}</option>)}
              </select>

              {(catFilter !== "All" || statusFilter !== "All" || query) && (
                <button onClick={() => { setCatFilter("All"); setStatusFilter("All"); setQuery(""); }} style={{ padding: "5px 12px", borderRadius: 8, background: "none", border: `1px solid ${c.border}`, color: c.textDim, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                  Clear
                </button>
              )}

              <span style={{ marginLeft: "auto", fontSize: 12, color: c.textDim }}>{filtered.length} item{filtered.length !== 1 ? "s" : ""}</span>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 6, marginBottom: 28, overflowX: "auto", paddingBottom: 2 }}>
            {tabs.map((tb) => (
              <button key={tb.id} onClick={() => setTab(tb.id)} style={{
                display: "flex", alignItems: "center", gap: 8, padding: "9px 18px",
                borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
                background: tab === tb.id ? c.primary : c.surface,
                color: tab === tb.id ? "#fff" : c.textMuted,
                border: `1px solid ${tab === tb.id ? c.primary : c.border}`,
                transition: "all 0.18s ease",
              }}>
                <span>{tb.icon}</span>
                <span>{tb.label}</span>
                <span style={{
                  padding: "1px 7px", borderRadius: 999, fontSize: 11, fontWeight: 700,
                  background: tab === tb.id ? "rgba(255,255,255,0.2)" : c.surface2,
                  color: tab === tb.id ? "#fff" : c.textDim,
                }}>{tb.count}</span>
              </button>
            ))}
          </div>

          {/* Possible Matches — special layout */}
          {tab === "matches" && filtered.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <div style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 18, padding: "24px 28px", marginBottom: 24 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 20 }}>
                  <Ic n="sparkle" size={20} color="#8B5CF6" />
                  <div>
                    <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 16, color: c.text, marginBottom: 4 }}>UniLink found a possible match</div>
                    <div style={{ fontSize: 14, color: c.textMuted }}>Based on category, description, location, and date, these items may belong together.</div>
                  </div>
                </div>
                {/* Mini match display */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 1fr", gap: 12, alignItems: "center" }}>
                  {(() => {
                    const lostMatch = ITEMS.find(i => i.id === "l3")!;
                    const foundMatch = ITEMS.find(i => i.id === "f3")!;
                    return <>
                      {[lostMatch, foundMatch].map((item, idx) => (
                        <>
                          <div key={item.id} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: "14px 16px", display: "flex", gap: 12, alignItems: "center" }}>
                            <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
                            <div>
                              <div style={{ fontSize: 10, fontWeight: 700, color: item.kind === "lost" ? "#EF4444" : "#10B981", marginBottom: 3 }}>{item.kind === "lost" ? "LOST" : "FOUND"}</div>
                              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text }}>{item.name}</div>
                              <div style={{ fontSize: 11, color: c.textDim }}>{item.location}</div>
                            </div>
                          </div>
                          {idx === 0 && (
                            <div key="center" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                              {["Same category", "Similar description", "Same location", "Similar date"].map((sig) => (
                                <div key={sig} style={{ display: "flex", gap: 5, alignItems: "center" }}>
                                  <Ic n="check" size={10} color="#10B981" />
                                  <span style={{ fontSize: 9, color: c.textDim, whiteSpace: "nowrap" }}>{sig}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      ))}
                    </>;
                  })()}
                </div>
                <div style={{ marginTop: 16 }}>
                  <Btn t={theme} primary onClick={() => openMatch(ITEMS.find(i => i.id === "l3")!)}>
                    <Ic n="link" size={14} color="#fff" /> Review Match
                  </Btn>
                </div>
              </div>
            </div>
          )}

          {notice && <p role="status" style={{ padding: 16, color: c.primary }}>{notice}</p>}
          {/* Item grid */}
          {filtered.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 18 }}>
              {filtered.map((item) => (
                <ItemCard key={item.id} item={item} t={theme} onView={setDetail} onMatch={openMatch} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "64px 32px", background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 18, color: c.text, marginBottom: 8 }}>No items found</div>
              <div style={{ fontSize: 14, color: c.textMuted, marginBottom: 24 }}>Try adjusting your search or filters.</div>
              <Btn t={theme} onClick={() => { setQuery(""); setCatFilter("All"); setStatusFilter("All"); }}>Clear filters</Btn>
            </div>
          )}

          {/* Privacy note footer */}
          <div style={{ marginTop: 32, display: "flex", gap: 12, alignItems: "flex-start", background: c.highlight, border: `1px solid ${c.border}`, borderRadius: 14, padding: "16px 20px" }}>
            <Ic n="shield" size={16} color={c.primary} />
            <div style={{ fontSize: 13, color: c.textMuted, lineHeight: 1.6 }}>
              <strong style={{ color: c.text }}>Frontend demo.</strong> Reports are stored in this browser. Contact, photo uploads, matching, and ownership verification still need backend integration.
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      {detail && <DetailModal item={detail} t={theme} onClose={() => setDetail(null)} onMatchView={openMatch} />}
      {matchPair && <MatchModal lostItem={matchPair.lost} foundItem={matchPair.found} t={theme} onClose={() => setMatchPair(null)} />}
      {reportKind && <ReportModal kind={reportKind} t={theme} onClose={() => setReportKind(null)} onSaved={() => { setReportKind(null); setTab("mine"); setQuery(""); setCatFilter("All"); setStatusFilter("All"); setNotice("Report saved in this browser. You can find it in My Reports."); }} />}
    </>
  );
}
