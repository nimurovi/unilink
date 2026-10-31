"use client";
import { useState, useEffect, useContext } from "react";
import { ThemeCtx } from "@/components/ui/Theme";

type Theme = "light" | "dark";
const useTheme = () => useContext(ThemeCtx);

const LIGHT = {
  bg: "#F8FAFC", surface: "#FFFFFF", surface2: "#F1F5F9", surface3: "#E2E8F0",
  primary: "#2563EB", text: "#0F172A", textMuted: "#64748B", textDim: "#94A3B8",
  border: "#E2E8F0", cardShadow: "0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)",
  danger: "#EF4444", dangerBg: "rgba(239,68,68,0.06)", dangerBorder: "rgba(239,68,68,0.2)",
  success: "#10B981", successBg: "rgba(16,185,129,0.06)", successBorder: "rgba(16,185,129,0.2)",
};
const DARK = {
  bg: "#080D1A", surface: "#0F172A", surface2: "#172033", surface3: "#1E293B",
  primary: "#3B82F6", text: "#F8FAFC", textMuted: "#94A3B8", textDim: "#475569",
  border: "#1E293B", cardShadow: "0 1px 4px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.18)",
  danger: "#F87171", dangerBg: "rgba(248,113,113,0.07)", dangerBorder: "rgba(248,113,113,0.2)",
  success: "#34D399", successBg: "rgba(52,211,153,0.07)", successBorder: "rgba(52,211,153,0.2)",
};
const tok = (t: Theme) => t === "light" ? LIGHT : DARK;

const P: Record<string, string[]> = {
  chevR:    ["M9 18l6-6-6-6"],
  chevL:    ["M15 18l-6-6 6-6"],
  user:     ["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2","M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  settings: ["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"],
  bell:     ["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9","M13.73 21a2 2 0 0 1-3.46 0"],
  shield:   ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
  lock:     ["M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z","M7 11V7a5 5 0 0 1 10 0v4"],
  eye:      ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z","M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"],
  eyeOff:   ["M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24","M1 1l22 22"],
  check:    ["M20 6L9 17l-5-5"],
  x:        ["M18 6L6 18M6 6l12 12"],
  sun:      ["M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42","M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"],
  moon:     ["M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"],
  monitor:  ["M2 3h20a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z","M8 21h8M12 17v4"],
  book:     ["M4 19.5A2.5 2.5 0 0 1 6.5 17H20","M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"],
  database: ["M12 2a9 2 0 1 0 0 4 9 2 0 0 0 0-4z","M3 4v14c0 1.1 4 2 9 2s9-.9 9-2V4","M3 11c0 1.1 4 2 9 2s9-.9 9-2"],
  copy:     ["M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2z","M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"],
  link:     ["M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71","M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"],
  download: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4","M7 10l5 5 5-5","M12 15V3"],
  trash:    ["M3 6h18","M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"],
  alert:    ["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z","M12 9v4","M12 17h.01"],
  type:     ["M4 7V4h16v3","M9 20h6","M12 4v16"],
  zap:      ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"],
  activity: ["M22 12h-4l-3 9L9 3l-3 9H2"],
  phone:    ["M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.57-1.57a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"],
  mail:     ["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z","M22 6l-10 7L2 6"],
  key:      ["M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"],
  monitor2: ["M2 12a10 10 0 1 0 20 0 10 10 0 0 0-20 0z","M12 6v6l4 2"],
  cpu:      ["M9 9h6v6H9z","M5 9H3v6h2M19 9h2v6h-2M9 5V3h6v2M9 19v2h6v-2"],
  globe:    ["M2 12a10 10 0 1 0 20 0 10 10 0 0 0-20 0z","M2 12h20","M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"],
};

function Ic({ n, size = 16, color = "currentColor" }: { n: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      {(P[n] ?? []).map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

// ─── SHARED PRIMITIVES ────────────────────────────────────────────────────────

function Toggle({ on, onChange, locked }: { on: boolean; onChange: (v: boolean) => void; locked?: boolean }) {
  const { theme } = useTheme(); const c = tok(theme);
  return (
    <button onClick={() => !locked && onChange(!on)} title={locked ? "Cannot be disabled" : undefined}
      style={{ width: 40, height: 22, borderRadius: 11, background: on ? c.primary : c.surface3, border: "none", cursor: locked ? "not-allowed" : "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0, opacity: locked ? 0.7 : 1 }}>
      <span style={{ position: "absolute", top: 2, left: on ? 20 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)", display: "block" }} />
    </button>
  );
}

type ToastType = "success" | "error";
function Toast({ msg, type, onDone }: { msg: string; type: ToastType; onDone: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, [onDone]);
  const col = type === "success" ? c.success : c.danger;
  const bg  = type === "success" ? c.successBg : c.dangerBg;
  const bd  = type === "success" ? c.successBorder : c.dangerBorder;
  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 500, background: c.surface, border: `1px solid ${bd}`, borderRadius: 12, padding: "12px 18px", boxShadow: "0 8px 32px rgba(0,0,0,0.18)", display: "flex", alignItems: "center", gap: 10, minWidth: 240, animation: "slideUp 0.2s ease" }}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Ic n={type === "success" ? "check" : "x"} size={13} color={col} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{msg}</span>
    </div>
  );
}

function Overlay({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 400 }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(5px)" }} />
      <div onClick={e => e.stopPropagation()} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
        {children}
      </div>
    </div>
  );
}

function RowToggle({ label, desc, on, onChange, locked }: { label: string; desc?: string; on: boolean; onChange: (v: boolean) => void; locked?: boolean }) {
  const { theme } = useTheme(); const c = tok(theme);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{label}{locked && <span style={{ fontSize: 10, fontWeight: 700, color: c.primary, marginLeft: 7, background: `${c.primary}10`, borderRadius: 4, padding: "1px 5px" }}>Required</span>}</div>
        {desc && <div style={{ fontSize: 11, color: c.textDim, marginTop: 2 }}>{desc}</div>}
      </div>
      <Toggle on={on} onChange={onChange} locked={locked} />
    </div>
  );
}

function SettingsGroup({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  const { theme } = useTheme(); const c = tok(theme);
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text }}>{title}</div>
        {desc && <div style={{ fontSize: 12, color: c.textDim, marginTop: 2 }}>{desc}</div>}
      </div>
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: "hidden", boxShadow: c.cardShadow }}>
        {children}
      </div>
    </div>
  );
}

function SettingsRow({ label, desc, right, onClick, danger, borderTop }: { label: string; desc?: string; right?: React.ReactNode; onClick?: () => void; danger?: boolean; borderTop?: boolean }) {
  const { theme } = useTheme(); const c = tok(theme);
  return (
    <div onClick={onClick} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "13px 20px", borderTop: borderTop ? `1px solid ${c.border}` : undefined, cursor: onClick ? "pointer" : "default", transition: "background 0.1s" }}
      onMouseEnter={e => { if (onClick) (e.currentTarget as HTMLElement).style.background = c.surface2; }}
      onMouseLeave={e => { if (onClick) (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: danger ? c.danger : c.text }}>{label}</div>
        {desc && <div style={{ fontSize: 11, color: c.textDim, marginTop: 2, lineHeight: 1.45 }}>{desc}</div>}
      </div>
      {right ? right : onClick ? <Ic n="chevR" size={14} color={c.textDim} /> : null}
    </div>
  );
}

function ManagedBadge() {
  const { theme } = useTheme(); const c = tok(theme);
  return <span style={{ fontSize: 10, fontWeight: 700, color: c.textDim, background: c.surface3, borderRadius: 4, padding: "2px 6px", whiteSpace: "nowrap" }}>Managed by University</span>;
}

// ─── SECTION SCREENS ──────────────────────────────────────────────────────────

function AccountSettings({ onToast }: { onToast: (msg: string, t: ToastType) => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [copied, setCopied] = useState(false);
  const [showDeactivate, setShowDeactivate] = useState(false);

  const copy = () => { setCopied(true); setTimeout(() => setCopied(false), 1800); };

  return (
    <div>
      {/* Profile Information */}
      <SettingsGroup title="Profile Information" desc="Your public-facing academic identity.">
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${c.border}`, display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Manrope", fontWeight: 800, fontSize: 18, color: "#fff", flexShrink: 0 }}>NO</div>
          <div>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text }}>Naimur Hossen Ovi</div>
            <div style={{ fontSize: 12, color: c.textDim }}>BSc in CSE · Batch 52 · Section B</div>
          </div>
          <button onClick={() => onToast("Redirecting to Edit Profile…", "success")} style={{ marginLeft: "auto", padding: "7px 14px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Edit Profile</button>
        </div>
        {[
          { label: "Display Name",    value: "Naimur Hossen Ovi",    editable: true },
          { label: "Department",       value: "Computer Science & Engineering", editable: false },
          { label: "Program",          value: "BSc in CSE",          editable: false },
          { label: "Batch",            value: "52",                   editable: false },
          { label: "Section",          value: "B",                    editable: false },
        ].map((row, i) => (
          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderTop: i === 0 ? undefined : `1px solid ${c.border}` }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{row.label}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 13, color: c.textMuted }}>{row.value}</span>
              {row.editable ? <button onClick={() => onToast("Redirecting to Edit Profile…", "success")} style={{ fontSize: 11, fontWeight: 700, color: c.primary, background: "none", border: "none", cursor: "pointer" }}>Edit</button> : <ManagedBadge />}
            </div>
          </div>
        ))}
      </SettingsGroup>

      {/* Email */}
      <SettingsGroup title="Email Addresses">
        <div style={{ padding: "12px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: c.text }}>University Email</div>
              <div style={{ fontSize: 12, color: c.textDim, marginTop: 2 }}>naimur.ovi@university.edu</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: c.success, background: c.successBg, border: `1px solid ${c.successBorder}`, borderRadius: 5, padding: "2px 7px" }}>✓ Verified</span>
              <ManagedBadge />
            </div>
          </div>
        </div>
        <div style={{ padding: "12px 20px", borderTop: `1px solid ${c.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: c.text }}>Personal Email</div>
            <div style={{ fontSize: 12, color: c.textDim, marginTop: 2 }}>Optional · Not publicly visible</div>
          </div>
          <button onClick={() => onToast("Feature available soon.", "success")} style={{ padding: "6px 14px", borderRadius: 8, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ Add Email</button>
        </div>
      </SettingsGroup>

      {/* Phone */}
      <SettingsGroup title="Phone Number">
        <div style={{ padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: c.text }}>+880 1XX XXX XXXX</div>
            <div style={{ fontSize: 11, color: c.textDim, marginTop: 2 }}>Private · Not visible in Student Directory</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: c.textDim, background: c.surface3, borderRadius: 5, padding: "2px 7px" }}>Private</span>
            <button onClick={() => onToast("Phone number updated.", "success")} style={{ padding: "6px 12px", borderRadius: 8, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Edit</button>
          </div>
        </div>
      </SettingsGroup>

      {/* UniLink Account ID */}
      <SettingsGroup title="UniLink Account">
        <div style={{ padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Account ID</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: c.text, fontFamily: "monospace" }}>UL-482916</div>
            <div style={{ fontSize: 11, color: c.textDim }}>For account reference only</div>
          </div>
          <button onClick={copy} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 8, background: copied ? c.successBg : c.surface2, border: `1px solid ${copied ? c.successBorder : c.border}`, color: copied ? c.success : c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}>
            <Ic n={copied ? "check" : "copy"} size={13} color={copied ? c.success : c.textDim} /> {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </SettingsGroup>

      {/* Danger zone */}
      <div style={{ background: c.dangerBg, border: `1px solid ${c.dangerBorder}`, borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${c.dangerBorder}` }}>
          <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.danger }}>Danger Zone</div>
        </div>
        <SettingsRow label="Deactivate Account" desc="Temporarily disable your UniLink account. You can reactivate it anytime." danger onClick={() => setShowDeactivate(true)} />
      </div>

      {showDeactivate && (
        <Overlay onClose={() => setShowDeactivate(false)}>
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, padding: "28px 32px", minWidth: 400, maxWidth: 440, boxShadow: "0 24px 80px rgba(0,0,0,0.25)" }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 16, color: c.text, marginBottom: 6 }}>Deactivate Account?</div>
            <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 24, lineHeight: 1.65 }}>Temporarily disable your UniLink account. Other students will not be able to find or contact you until you reactivate.</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowDeactivate(false)} style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
              <button onClick={() => { setShowDeactivate(false); onToast("Account deactivated.", "error"); }} style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: c.danger, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Deactivate</button>
            </div>
          </div>
        </Overlay>
      )}
    </div>
  );
}

function AppearanceSettings({ onToast }: { onToast: (msg: string, t: ToastType) => void }) {
  const { theme, toggle } = useTheme(); const c = tok(theme);
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "system">(theme);
  const [motion, setMotion] = useState<"full" | "reduced">("full");
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");

  const applyTheme = (mode: "light" | "dark" | "system") => {
    setThemeMode(mode);
    const target = mode === "system" ? "light" : mode;
    if (target !== theme) toggle();
    onToast("Appearance updated.", "success");
  };

  const ThemeCard = ({ mode, icon, label }: { mode: "light" | "dark" | "system"; icon: string; label: string }) => {
    const active = themeMode === mode;
    return (
      <button onClick={() => applyTheme(mode)} style={{ flex: 1, padding: "16px 12px", borderRadius: 12, background: active ? `${c.primary}08` : c.surface2, border: `2px solid ${active ? c.primary : c.border}`, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, transition: "all 0.15s" }}>
        <Ic n={icon} size={20} color={active ? c.primary : c.textDim} />
        <span style={{ fontSize: 12, fontWeight: active ? 700 : 500, color: active ? c.primary : c.textMuted }}>{label}</span>
        {active && <div style={{ width: 6, height: 6, borderRadius: "50%", background: c.primary }} />}
      </button>
    );
  };

  return (
    <div>
      <SettingsGroup title="Theme" desc="Choose how UniLink appears to you.">
        <div style={{ padding: "16px 20px", display: "flex", gap: 10 }}>
          <ThemeCard mode="light"  icon="sun"     label="Light" />
          <ThemeCard mode="dark"   icon="moon"    label="Dark" />
          <ThemeCard mode="system" icon="monitor" label="System" />
        </div>
      </SettingsGroup>

      <SettingsGroup title="Motion" desc="Control interface animations and transitions.">
        <div style={{ padding: "12px 20px" }}>
          {[
            { val: "full",    label: "Full Motion",    desc: "All animations and transitions enabled" },
            { val: "reduced", label: "Reduced Motion", desc: "Minimize animations for a calmer experience" },
          ].map((opt, i) => (
            <label key={opt.val} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, paddingTop: i === 0 ? 0 : 12, paddingBottom: i === 0 ? 12 : 0, borderBottom: i === 0 ? `1px solid ${c.border}` : "none", cursor: "pointer" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{opt.label}</div>
                <div style={{ fontSize: 11, color: c.textDim }}>{opt.desc}</div>
              </div>
              <input type="radio" name="motion" checked={motion === opt.val} onChange={() => { setMotion(opt.val as "full" | "reduced"); onToast("Motion preference updated.", "success"); }} style={{ accentColor: c.primary }} />
            </label>
          ))}
        </div>
      </SettingsGroup>

      <SettingsGroup title="Interface Density">
        <div style={{ padding: "12px 20px", display: "flex", gap: 8 }}>
          {["comfortable", "compact"].map(d => (
            <button key={d} onClick={() => { setDensity(d as "comfortable" | "compact"); onToast("Density updated.", "success"); }}
              style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: density === d ? `${c.primary}08` : c.surface2, border: `1.5px solid ${density === d ? c.primary : c.border}`, color: density === d ? c.primary : c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: density === d ? 700 : 500, cursor: "pointer", textTransform: "capitalize" }}>
              {d}
            </button>
          ))}
        </div>
      </SettingsGroup>
    </div>
  );
}

function NotificationSettings({ onToast }: { onToast: (msg: string, t: ToastType) => void }) {
  const { theme } = useTheme(); const c = tok(theme);

  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    academic_assignments: true, academic_exams: true, academic_routine: true, academic_announcements: true, academic_materials: true,
    events_new: true, events_reminders: true, events_changes: true, events_cancelled: true,
    clubs_announcements: true, clubs_events: true, clubs_membership: true, clubs_recruitment: true,
    opps_recommended: true, opps_deadlines: true, opps_status: true,
    lf_matches: true, lf_claims: true, lf_returns: true,
    sys_announcements: true, sys_account: true, sys_security: true,
  });
  const [quietHours, setQuietHours] = useState(false);
  const [qhStart, setQhStart] = useState("23:00");
  const [qhEnd, setQhEnd]   = useState("07:00");

  const set = (key: string, val: boolean) => {
    setPrefs(p => ({ ...p, [key]: val }));
    onToast("Notification preferences updated.", "success");
  };

  const GROUPS = [
    { title: "Academic", prefix: "academic", items: [
      { key: "assignments", label: "Assignment reminders" },
      { key: "exams",       label: "Exam reminders" },
      { key: "routine",     label: "Routine changes" },
      { key: "announcements", label: "Course announcements" },
      { key: "materials",  label: "New materials" },
    ]},
    { title: "Events", prefix: "events", items: [
      { key: "new",        label: "New events" },
      { key: "reminders",  label: "Event reminders" },
      { key: "changes",    label: "Event changes" },
      { key: "cancelled",  label: "Event cancellations" },
    ]},
    { title: "Clubs", prefix: "clubs", items: [
      { key: "announcements", label: "Club announcements" },
      { key: "events",        label: "Club events" },
      { key: "membership",    label: "Membership updates" },
      { key: "recruitment",   label: "Recruitment" },
    ]},
    { title: "Opportunities", prefix: "opps", items: [
      { key: "recommended", label: "Recommended opportunities" },
      { key: "deadlines",   label: "Deadline reminders" },
      { key: "status",      label: "Application status" },
    ]},
    { title: "Lost & Found", prefix: "lf", items: [
      { key: "matches",  label: "Possible matches" },
      { key: "claims",   label: "Claim updates" },
      { key: "returns",  label: "Return updates" },
    ]},
    { title: "System", prefix: "sys", items: [
      { key: "announcements", label: "System announcements" },
      { key: "account",       label: "Account updates" },
      { key: "security",      label: "Security alerts", locked: true },
    ]},
  ];

  return (
    <div>
      {GROUPS.map(group => (
        <SettingsGroup key={group.prefix} title={group.title}>
          {group.items.map((item, i) => {
            const key = `${group.prefix}_${item.key}`;
            return (
              <div key={key} style={{ padding: "12px 20px", borderTop: i > 0 ? `1px solid ${c.border}` : undefined }}>
                <RowToggle label={item.label} on={prefs[key] ?? true} onChange={v => set(key, v)} locked={(item as { locked?: boolean }).locked} />
              </div>
            );
          })}
        </SettingsGroup>
      ))}

      <SettingsGroup title="Quiet Hours" desc="Non-critical notifications will be delivered outside your quiet hours.">
        <div style={{ padding: "12px 20px", borderBottom: quietHours ? `1px solid ${c.border}` : undefined }}>
          <RowToggle label="Enable Quiet Hours" on={quietHours} onChange={v => { setQuietHours(v); onToast(v ? "Quiet hours enabled." : "Quiet hours disabled.", "success"); }} />
        </div>
        {quietHours && (
          <div style={{ padding: "14px 20px", display: "flex", gap: 20 }}>
            {[
              { label: "Start", value: qhStart, set: setQhStart },
              { label: "End",   value: qhEnd,   set: setQhEnd },
            ].map(f => (
              <div key={f.label}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{f.label}</label>
                <input type="time" value={f.value} onChange={e => f.set(e.target.value)}
                  style={{ padding: "8px 12px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 13, outline: "none" }} />
              </div>
            ))}
          </div>
        )}
      </SettingsGroup>
    </div>
  );
}

function PrivacySettings({ onToast }: { onToast: (msg: string, t: ToastType) => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [visibility, setVisibility] = useState("public");
  const [discovery, setDiscovery] = useState(true);
  const [connReq, setConnReq] = useState("everyone");
  const [fieldVis, setFieldVis] = useState({ bio: true, skills: true, interests: true, clubs: true, achievements: true, links: false, academic: true });
  const [actVis, setActVis] = useState({ clubs: true, achievements: true, activity: true });

  const save = () => onToast("Privacy preferences updated.", "success");

  const VIS_OPTIONS = [
    { val: "public",     label: "University Students", desc: "All students can see your profile" },
    { val: "department", label: "My Department",       desc: "Only CSE students can see your profile" },
    { val: "batch",      label: "My Batch",            desc: "Only Batch 52 students can see your profile" },
    { val: "section",    label: "My Section",          desc: "Only Section B students" },
    { val: "private",    label: "Private",             desc: "Your profile is hidden from the directory" },
  ];

  return (
    <div>
      <SettingsGroup title="Profile Visibility" desc="Students outside your selected group will not see your profile details.">
        {VIS_OPTIONS.map((opt, i) => (
          <label key={opt.val} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderTop: i > 0 ? `1px solid ${c.border}` : undefined, cursor: "pointer" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{opt.label}</div>
              <div style={{ fontSize: 11, color: c.textDim }}>{opt.desc}</div>
            </div>
            <input type="radio" name="visibility" value={opt.val} checked={visibility === opt.val} onChange={() => { setVisibility(opt.val); save(); }} style={{ accentColor: c.primary }} />
          </label>
        ))}
      </SettingsGroup>

      <SettingsGroup title="Directory Discovery">
        <div style={{ padding: "12px 20px" }}>
          <RowToggle label="Appear in Student Directory" desc="Allow other students within your visibility range to find your profile." on={discovery} onChange={v => { setDiscovery(v); save(); }} />
        </div>
      </SettingsGroup>

      <SettingsGroup title="Field Visibility" desc="Choose which profile sections are visible to others.">
        {(Object.keys(fieldVis) as (keyof typeof fieldVis)[]).map((key, i) => (
          <div key={key} style={{ padding: "12px 20px", borderTop: i > 0 ? `1px solid ${c.border}` : undefined }}>
            <RowToggle label={key === "links" ? "Professional Links" : key === "academic" ? "Academic Information" : key.charAt(0).toUpperCase() + key.slice(1)}
              on={fieldVis[key]} onChange={v => { setFieldVis(p => ({ ...p, [key]: v })); save(); }} />
          </div>
        ))}
      </SettingsGroup>

      <SettingsGroup title="Contact Privacy" desc="Contact information is never publicly visible by default.">
        {[
          { label: "Phone Number",      status: "Private" },
          { label: "Personal Email",    status: "Private" },
          { label: "University Email",  status: "Private" },
        ].map((row, i) => (
          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderTop: i > 0 ? `1px solid ${c.border}` : undefined }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{row.label}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: c.textDim, background: c.surface3, borderRadius: 5, padding: "2px 7px" }}>{row.status}</span>
          </div>
        ))}
      </SettingsGroup>

      <SettingsGroup title="Connection Requests" desc="Choose who can send you connection requests.">
        {["Everyone within visibility range","My Department","My Batch","Nobody"].map((opt, i) => (
          <label key={opt} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderTop: i > 0 ? `1px solid ${c.border}` : undefined, cursor: "pointer" }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{opt}</span>
            <input type="radio" name="connreq" value={opt} checked={connReq === opt} onChange={() => { setConnReq(opt); save(); }} style={{ accentColor: c.primary }} />
          </label>
        ))}
      </SettingsGroup>

      <SettingsGroup title="Activity Visibility">
        {(Object.keys(actVis) as (keyof typeof actVis)[]).map((key, i) => (
          <div key={key} style={{ padding: "12px 20px", borderTop: i > 0 ? `1px solid ${c.border}` : undefined }}>
            <RowToggle label={`Show my ${key === "activity" ? "campus activity" : key}`} on={actVis[key]} onChange={v => { setActVis(p => ({ ...p, [key]: v })); save(); }} />
          </div>
        ))}
      </SettingsGroup>

      <SettingsGroup title="Blocked Students">
        <div style={{ padding: "24px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 13, color: c.textDim }}>No blocked students.</div>
        </div>
      </SettingsGroup>
    </div>
  );
}

function SecuritySettings({ onToast }: { onToast: (msg: string, t: ToastType) => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [showPwdForm, setShowPwdForm] = useState(false);
  const [showSignOut, setShowSignOut] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [showPwd, setShowPwd] = useState<Record<string, boolean>>({});
  const [pwd, setPwd] = useState({ current: "", newPwd: "", confirm: "" });

  const strength = (p: string) => {
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };

  const pwdStrength = strength(pwd.newPwd);
  const strengthColors = ["", "#EF4444", "#F59E0B", "#10B981", "#10B981"];
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];

  const SESSIONS = [
    { browser: "Chrome", os: "Windows 11", location: "Dhaka, Bangladesh", time: "Active now", current: true },
    { browser: "Safari", os: "iPhone 15",  location: "Dhaka, Bangladesh", time: "2 hours ago", current: false },
    { browser: "Firefox", os: "MacBook Pro", location: "Dhaka, Bangladesh", time: "3 days ago", current: false },
  ];

  const SECURITY_EVENTS = [
    { label: "Password changed",       time: "Today" },
    { label: "New login detected",     time: "Yesterday" },
    { label: "2FA setting changed",    time: "Aug 20" },
    { label: "Profile privacy updated",time: "Aug 18" },
  ];

  return (
    <div>
      {/* Password */}
      <SettingsGroup title="Password" desc="Keep your account secure with a strong password.">
        {!showPwdForm ? (
          <SettingsRow label="Change Password" desc="Last changed 30 days ago" onClick={() => setShowPwdForm(true)} />
        ) : (
          <div style={{ padding: "20px" }}>
            {[
              { key: "current", label: "Current Password" },
              { key: "newPwd",  label: "New Password" },
              { key: "confirm", label: "Confirm New Password" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: c.textDim, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>{f.label}</label>
                <div style={{ position: "relative" }}>
                  <input type={showPwd[f.key] ? "text" : "password"} value={pwd[f.key as keyof typeof pwd]} onChange={e => setPwd(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{ width: "100%", padding: "9px 36px 9px 12px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                  <button onClick={() => setShowPwd(p => ({ ...p, [f.key]: !p[f.key] }))} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                    <Ic n={showPwd[f.key] ? "eyeOff" : "eye"} size={14} color={c.textDim} />
                  </button>
                </div>
                {f.key === "newPwd" && pwd.newPwd && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                      {[1,2,3,4].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 999, background: i <= pwdStrength ? strengthColors[pwdStrength] : c.surface3, transition: "background 0.2s" }} />)}
                    </div>
                    <div style={{ fontSize: 11, color: strengthColors[pwdStrength] }}>{strengthLabels[pwdStrength]}</div>
                  </div>
                )}
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
              <button onClick={() => setShowPwdForm(false)} style={{ padding: "9px 16px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
              <button onClick={() => { setShowPwdForm(false); setPwd({ current: "", newPwd: "", confirm: "" }); onToast("Password updated.", "success"); }} style={{ padding: "9px 20px", borderRadius: 9, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Update Password</button>
            </div>
          </div>
        )}
      </SettingsGroup>

      {/* 2FA */}
      <SettingsGroup title="Two-Factor Authentication" desc="Add an extra layer of protection to your account.">
        <div style={{ padding: "12px 20px" }}>
          <RowToggle label="Two-Factor Authentication" desc={twoFA ? "Your account is protected with 2FA." : "Enable for extra security."} on={twoFA} onChange={v => { setTwoFA(v); onToast(v ? "2FA enabled." : "2FA disabled.", v ? "success" : "error"); }} />
          {twoFA && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${c.border}` }}>
              <button onClick={() => onToast("2FA management available soon.", "success")} style={{ padding: "7px 14px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Manage 2FA</button>
            </div>
          )}
        </div>
      </SettingsGroup>

      {/* Sessions */}
      <SettingsGroup title="Active Sessions" desc="Devices currently signed in to your account.">
        {SESSIONS.map((s, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 20px", borderTop: i > 0 ? `1px solid ${c.border}` : undefined }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Ic n="monitor2" size={16} color={c.textDim} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{s.browser} · {s.os}</div>
                <div style={{ fontSize: 11, color: c.textDim }}>{s.location} · {s.time}</div>
              </div>
            </div>
            {s.current ? (
              <span style={{ fontSize: 11, fontWeight: 700, color: c.success, background: c.successBg, border: `1px solid ${c.successBorder}`, borderRadius: 5, padding: "2px 7px" }}>Current</span>
            ) : (
              <button onClick={() => onToast("Session terminated.", "success")} style={{ padding: "5px 12px", borderRadius: 7, background: c.dangerBg, border: `1px solid ${c.dangerBorder}`, color: c.danger, fontFamily: "Inter", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Sign Out</button>
            )}
          </div>
        ))}
        <div style={{ padding: "12px 20px", borderTop: `1px solid ${c.border}` }}>
          <button onClick={() => setShowSignOut(true)} style={{ padding: "8px 16px", borderRadius: 9, background: c.dangerBg, border: `1px solid ${c.dangerBorder}`, color: c.danger, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Sign Out of All Devices</button>
        </div>
      </SettingsGroup>

      {/* Recent security activity */}
      <SettingsGroup title="Recent Security Activity">
        {SECURITY_EVENTS.map((e, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 20px", borderTop: i > 0 ? `1px solid ${c.border}` : undefined }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Ic n="activity" size={13} color={c.textDim} />
              <span style={{ fontSize: 13, color: c.text }}>{e.label}</span>
            </div>
            <span style={{ fontSize: 11, color: c.textDim }}>{e.time}</span>
          </div>
        ))}
      </SettingsGroup>

      {showSignOut && (
        <Overlay onClose={() => setShowSignOut(false)}>
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, padding: "28px 32px", minWidth: 400, maxWidth: 440, boxShadow: "0 24px 80px rgba(0,0,0,0.25)" }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 16, color: c.text, marginBottom: 6 }}>Sign out of all devices?</div>
            <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 24, lineHeight: 1.65 }}>You will be signed out of UniLink on every device except this one. You will need to sign in again on those devices.</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowSignOut(false)} style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
              <button onClick={() => { setShowSignOut(false); onToast("Signed out of all other devices.", "success"); }} style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: c.danger, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Sign Out All</button>
            </div>
          </div>
        </Overlay>
      )}
    </div>
  );
}

function AcademicPreferences({ onToast }: { onToast: (msg: string, t: ToastType) => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [calView, setCalView] = useState("week");
  const [firstDay, setFirstDay] = useState("sunday");
  const [timeFormat, setTimeFormat] = useState("12h");
  const [assignReminder, setAssignReminder] = useState("1 day before");
  const [examReminder, setExamReminder] = useState("1 week before");
  const [dashboard, setDashboard] = useState({ classes: true, assignments: true, exams: true, announcements: true, materials: true });

  const save = () => onToast("Academic preferences updated.", "success");

  return (
    <div>
      {/* Academic context */}
      <SettingsGroup title="Academic Context" desc="Your current verified academic information.">
        {[
          { label: "University",  value: "Your University" },
          { label: "Faculty",     value: "Engineering" },
          { label: "Department",  value: "CSE" },
          { label: "Program",     value: "BSc in CSE" },
          { label: "Batch",       value: "52" },
          { label: "Section",     value: "B" },
          { label: "Semester",    value: "Spring 2026" },
        ].map((row, i) => (
          <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 20px", borderTop: i > 0 ? `1px solid ${c.border}` : undefined }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{row.label}</span>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 12, color: c.textMuted }}>{row.value}</span>
              <ManagedBadge />
            </div>
          </div>
        ))}
      </SettingsGroup>

      {/* Dashboard preferences */}
      <SettingsGroup title="Dashboard Preferences" desc="Choose what appears on your academic dashboard.">
        {[
          { key: "classes",       label: "Show Upcoming Classes" },
          { key: "assignments",   label: "Show Assignment Deadlines" },
          { key: "exams",         label: "Show Exam Deadlines" },
          { key: "announcements", label: "Show Course Announcements" },
          { key: "materials",     label: "Show Course Materials" },
        ].map((item, i) => (
          <div key={item.key} style={{ padding: "12px 20px", borderTop: i > 0 ? `1px solid ${c.border}` : undefined }}>
            <RowToggle label={item.label} on={dashboard[item.key as keyof typeof dashboard]} onChange={v => { setDashboard(p => ({ ...p, [item.key]: v })); save(); }} />
          </div>
        ))}
      </SettingsGroup>

      {/* Calendar */}
      <SettingsGroup title="Calendar Preferences">
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${c.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Default View</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["month","week","agenda"].map(v => (
              <button key={v} onClick={() => { setCalView(v); save(); }}
                style={{ flex: 1, padding: "8px 0", borderRadius: 9, background: calView === v ? `${c.primary}08` : c.surface2, border: `1.5px solid ${calView === v ? c.primary : c.border}`, color: calView === v ? c.primary : c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: calView === v ? 700 : 500, cursor: "pointer", textTransform: "capitalize" }}>
                {v}
              </button>
            ))}
          </div>
        </div>
        <div style={{ padding: "14px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: c.text }}>First Day of Week</span>
            <select value={firstDay} onChange={e => { setFirstDay(e.target.value); save(); }}
              style={{ padding: "7px 12px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 12, cursor: "pointer", outline: "none" }}>
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="saturday">Saturday</option>
            </select>
          </div>
        </div>
      </SettingsGroup>

      {/* Time format */}
      <SettingsGroup title="Time Format">
        <div style={{ padding: "12px 20px", display: "flex", gap: 8 }}>
          {[{ val: "12h", label: "12-hour" },{ val: "24h", label: "24-hour" }].map(f => (
            <button key={f.val} onClick={() => { setTimeFormat(f.val); save(); }}
              style={{ flex: 1, padding: "9px 0", borderRadius: 9, background: timeFormat === f.val ? `${c.primary}08` : c.surface2, border: `1.5px solid ${timeFormat === f.val ? c.primary : c.border}`, color: timeFormat === f.val ? c.primary : c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: timeFormat === f.val ? 700 : 500, cursor: "pointer" }}>
              {f.label}
            </button>
          ))}
        </div>
      </SettingsGroup>

      {/* Reminder preferences */}
      <SettingsGroup title="Reminder Preferences">
        {[
          { label: "Assignment Reminder", val: assignReminder, set: setAssignReminder, options: ["1 hour before","1 day before","2 days before","1 week before"] },
          { label: "Exam Reminder",       val: examReminder,   set: setExamReminder,   options: ["1 day before","3 days before","1 week before","2 weeks before"] },
        ].map((item, i) => (
          <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderTop: i > 0 ? `1px solid ${c.border}` : undefined }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{item.label}</span>
            <select value={item.val} onChange={e => { item.set(e.target.value); save(); }}
              style={{ padding: "7px 12px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 12, cursor: "pointer", outline: "none" }}>
              {item.options.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        ))}
      </SettingsGroup>
    </div>
  );
}

function AccessibilitySettings({ onToast }: { onToast: (msg: string, t: ToastType) => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [reduceMotion, setReduceMotion]       = useState(false);
  const [textSize, setTextSize]               = useState("default");
  const [highContrast, setHighContrast]       = useState(false);
  const [focusIndicators, setFocusIndicators] = useState(true);

  const save = () => onToast("Accessibility settings updated.", "success");

  return (
    <div>
      <SettingsGroup title="Motion">
        <div style={{ padding: "12px 20px" }}>
          <RowToggle label="Reduce Motion" desc="Minimize animations for a calmer experience." on={reduceMotion} onChange={v => { setReduceMotion(v); save(); }} />
        </div>
      </SettingsGroup>

      <SettingsGroup title="Text Size">
        <div style={{ padding: "14px 20px", display: "flex", gap: 8 }}>
          {[{ val: "default", label: "Default" },{ val: "large", label: "Large" },{ val: "xl", label: "Extra Large" }].map(s => (
            <button key={s.val} onClick={() => { setTextSize(s.val); save(); }}
              style={{ flex: 1, padding: "9px 0", borderRadius: 9, background: textSize === s.val ? `${c.primary}08` : c.surface2, border: `1.5px solid ${textSize === s.val ? c.primary : c.border}`, color: textSize === s.val ? c.primary : c.textMuted, fontFamily: "Inter", fontSize: s.val === "xl" ? 15 : s.val === "large" ? 14 : 13, fontWeight: textSize === s.val ? 700 : 500, cursor: "pointer" }}>
              {s.label}
            </button>
          ))}
        </div>
      </SettingsGroup>

      <SettingsGroup title="Display">
        <div style={{ padding: "12px 20px", borderBottom: `1px solid ${c.border}` }}>
          <RowToggle label="High Contrast" desc="Increase contrast for improved readability." on={highContrast} onChange={v => { setHighContrast(v); save(); }} />
        </div>
        <div style={{ padding: "12px 20px" }}>
          <RowToggle label="Enhanced Focus Indicators" desc="Show more visible focus outlines for keyboard navigation." on={focusIndicators} onChange={v => { setFocusIndicators(v); save(); }} />
        </div>
      </SettingsGroup>

      <SettingsGroup title="Screen Reader">
        <div style={{ padding: "14px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: c.successBg, border: `1px solid ${c.successBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Ic n="check" size={15} color={c.success} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>Screen Reader Support</div>
            <div style={{ fontSize: 12, color: c.textDim, marginTop: 3, lineHeight: 1.55 }}>UniLink is built with semantic HTML and ARIA labels to support screen readers. Enable your system screen reader to use it with UniLink.</div>
          </div>
        </div>
      </SettingsGroup>
    </div>
  );
}

function DataSettings({ onToast }: { onToast: (msg: string, t: ToastType) => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [dataReqStatus, setDataReqStatus]  = useState<"idle" | "submitted" | "ready">("idle");
  const [showDelete, setShowDelete]        = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");

  const ACTIVITY_LOG = [
    { label: "Login",                   time: "Today, 9:04 AM",     icon: "key" },
    { label: "Profile privacy updated", time: "Aug 27",             icon: "shield" },
    { label: "Password changed",        time: "Aug 27",             icon: "lock" },
    { label: "Notification prefs saved",time: "Aug 25",             icon: "bell" },
    { label: "Account created",         time: "Aug 1",              icon: "user" },
  ];

  const CONNECTED = [
    { name: "University Account", desc: "Your primary university credentials", connected: true },
    { name: "Google",             desc: "Connect for single sign-on",          connected: false },
    { name: "Microsoft",          desc: "Connect for Office 365 integration",  connected: false },
  ];

  return (
    <div>
      {/* Download data */}
      <SettingsGroup title="Download My Data" desc="Request a copy of your UniLink account information.">
        <div style={{ padding: "16px 20px" }}>
          {dataReqStatus === "idle" && (
            <button onClick={() => setDataReqStatus("submitted")} style={{ padding: "9px 20px", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              <Ic n="download" size={14} color={c.textDim} /> Request Data
            </button>
          )}
          {dataReqStatus === "submitted" && (
            <div style={{ display: "flex", gap: 10, alignItems: "center", padding: "10px 14px", background: c.surface2, borderRadius: 10, border: `1px solid ${c.border}` }}>
              <Ic n="activity" size={14} color={c.primary} />
              <span style={{ fontSize: 13, color: c.textMuted }}>Request submitted. You will be notified when your data is ready.</span>
            </div>
          )}
          {dataReqStatus === "ready" && (
            <button style={{ padding: "9px 20px", borderRadius: 10, background: c.successBg, border: `1px solid ${c.successBorder}`, color: c.success, fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              <Ic n="download" size={14} color={c.success} /> Download Ready
            </button>
          )}
        </div>
      </SettingsGroup>

      {/* Activity log */}
      <SettingsGroup title="Account Activity">
        {ACTIVITY_LOG.map((e, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 20px", borderTop: i > 0 ? `1px solid ${c.border}` : undefined }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Ic n={e.icon} size={13} color={c.textDim} />
              <span style={{ fontSize: 13, color: c.text }}>{e.label}</span>
            </div>
            <span style={{ fontSize: 11, color: c.textDim }}>{e.time}</span>
          </div>
        ))}
      </SettingsGroup>

      {/* Connected accounts */}
      <SettingsGroup title="Connected Accounts" desc="Manage external service connections.">
        {CONNECTED.map((acct, i) => (
          <div key={acct.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 20px", borderTop: i > 0 ? `1px solid ${c.border}` : undefined }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{acct.name}</div>
              <div style={{ fontSize: 11, color: c.textDim, marginTop: 2 }}>{acct.desc}</div>
            </div>
            {acct.connected ? (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: c.success, background: c.successBg, border: `1px solid ${c.successBorder}`, borderRadius: 5, padding: "2px 7px" }}>✓ Connected</span>
                <button onClick={() => onToast("Account disconnected.", "success")} style={{ padding: "5px 12px", borderRadius: 7, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Disconnect</button>
              </div>
            ) : (
              <button onClick={() => onToast(`${acct.name} integration coming soon.`, "success")} style={{ padding: "6px 14px", borderRadius: 8, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Connect</button>
            )}
          </div>
        ))}
      </SettingsGroup>

      {/* Danger zone */}
      <div style={{ background: c.dangerBg, border: `1px solid ${c.dangerBorder}`, borderRadius: 16, overflow: "hidden", marginBottom: 12 }}>
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${c.dangerBorder}` }}>
          <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.danger }}>Danger Zone</div>
        </div>
        <SettingsRow label="Deactivate Account" desc="Temporarily disable your UniLink account." danger onClick={() => onToast("Account deactivated.", "error")} />
        <SettingsRow label="Delete Account" desc="Permanently delete your account and all associated data." danger borderTop onClick={() => setShowDelete(true)} />
      </div>

      {showDelete && (
        <Overlay onClose={() => setShowDelete(false)}>
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, padding: "28px 32px", minWidth: 420, maxWidth: 460, boxShadow: "0 24px 80px rgba(0,0,0,0.25)" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: c.dangerBg, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic n="alert" size={18} color={c.danger} /></div>
              <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 16, color: c.text }}>Delete your UniLink account?</div>
            </div>
            <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 18, lineHeight: 1.65 }}>This action may permanently remove your account and all associated personal data. This cannot be undone.</p>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: c.textDim, marginBottom: 6 }}>Type <strong style={{ color: c.danger }}>DELETE</strong> to confirm</label>
              <input value={deleteConfirm} onChange={e => setDeleteConfirm(e.target.value)} placeholder="DELETE"
                style={{ width: "100%", padding: "9px 12px", borderRadius: 9, background: c.surface2, border: `1.5px solid ${deleteConfirm === "DELETE" ? c.danger : c.border}`, color: c.text, fontFamily: "Inter", fontSize: 13, outline: "none", boxSizing: "border-box", transition: "border-color 0.15s" }} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => { setShowDelete(false); setDeleteConfirm(""); }} style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
              <button disabled={deleteConfirm !== "DELETE"} onClick={() => { setShowDelete(false); onToast("Account deleted.", "error"); }}
                style={{ flex: 2, padding: "10px 0", borderRadius: 10, background: deleteConfirm === "DELETE" ? c.danger : c.surface3, color: deleteConfirm === "DELETE" ? "#fff" : c.textDim, border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: deleteConfirm === "DELETE" ? "pointer" : "not-allowed", transition: "all 0.15s" }}>
                Delete Account Permanently
              </button>
            </div>
          </div>
        </Overlay>
      )}
    </div>
  );
}

// ─── MAIN SETTINGS ────────────────────────────────────────────────────────────

type SettingsSection = "overview" | "account" | "appearance" | "notifications" | "privacy" | "security" | "academic" | "accessibility" | "data";

const SECTIONS: { id: SettingsSection; label: string; icon: string; desc: string }[] = [
  { id: "account",       label: "Account",              icon: "user",     desc: "Manage your personal account information." },
  { id: "appearance",    label: "Appearance",           icon: "sun",      desc: "Customize Light Mode, Dark Mode, and interface." },
  { id: "notifications", label: "Notifications",        icon: "bell",     desc: "Control the updates and alerts you receive." },
  { id: "privacy",       label: "Privacy",              icon: "eye",      desc: "Manage your profile visibility and information." },
  { id: "security",      label: "Security",             icon: "shield",   desc: "Manage password, sessions, and account security." },
  { id: "academic",      label: "Academic Preferences", icon: "book",     desc: "Customize your academic and campus preferences." },
  { id: "accessibility", label: "Accessibility",        icon: "zap",      desc: "Customize accessibility options." },
  { id: "data",          label: "Data & Account",       icon: "database", desc: "Manage your UniLink data and account." },
];

export default function SettingsPage() {
  const { theme } = useTheme(); const c = tok(theme);
  const [section, setSection] = useState<SettingsSection>("overview");
  const [toast, setToast]     = useState<{ msg: string; type: ToastType } | null>(null);

  const showToast = (msg: string, type: ToastType) => setToast({ msg, type });
  const clearToast = () => setToast(null);

  const current = SECTIONS.find(s => s.id === section);

  function renderSection() {
    switch (section) {
      case "account":       return <AccountSettings onToast={showToast} />;
      case "appearance":    return <AppearanceSettings onToast={showToast} />;
      case "notifications": return <NotificationSettings onToast={showToast} />;
      case "privacy":       return <PrivacySettings onToast={showToast} />;
      case "security":      return <SecuritySettings onToast={showToast} />;
      case "academic":      return <AcademicPreferences onToast={showToast} />;
      case "accessibility": return <AccessibilitySettings onToast={showToast} />;
      case "data":          return <DataSettings onToast={showToast} />;
      default:              return null;
    }
  }

  return (
    <div style={{ flex: 1, display: "flex", background: c.bg, overflowY: "auto" }}>
      <style>{`@keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      {section === "overview" ? (
        /* Overview */
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 26, color: c.text, letterSpacing: "-0.02em", marginBottom: 4 }}>Settings</h1>
            <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 28 }}>Manage your account, preferences, privacy, and UniLink experience.</p>

            {/* Quick profile preview */}
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "18px 22px", boxShadow: c.cardShadow, marginBottom: 28, display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Manrope", fontWeight: 800, fontSize: 17, color: "#fff", flexShrink: 0 }}>NO</div>
              <div>
                <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text }}>Naimur Hossen Ovi</div>
                <div style={{ fontSize: 12, color: c.textDim }}>naimur.ovi@university.edu · Batch 52 · CSE</div>
              </div>
              <button onClick={() => setSection("account")} style={{ marginLeft: "auto", padding: "7px 14px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Manage</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 2, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: "hidden", boxShadow: c.cardShadow }}>
              {SECTIONS.map((s, i) => (
                <button key={s.id} onClick={() => setSection(s.id)}
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "15px 20px", background: "none", border: "none", borderTop: i > 0 ? `1px solid ${c.border}` : "none", cursor: "pointer", textAlign: "left", transition: "background 0.1s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = c.surface2)}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Ic n={s.icon} size={16} color={c.textDim} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: c.textDim, marginTop: 2 }}>{s.desc}</div>
                  </div>
                  <Ic n="chevR" size={14} color={c.textDim} />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Two-column layout */
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* Left nav */}
          <div style={{ width: 220, borderRight: `1px solid ${c.border}`, background: c.surface, flexShrink: 0, overflowY: "auto", padding: "24px 12px" }}>
            <button onClick={() => setSection("overview")} style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 10px", background: "none", border: "none", color: c.textDim, cursor: "pointer", fontFamily: "Inter", fontSize: 12, fontWeight: 600, marginBottom: 16, width: "100%", borderRadius: 8 }}
              onMouseEnter={e => (e.currentTarget.style.background = c.surface2)}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              <Ic n="chevL" size={13} color={c.textDim} /> Settings
            </button>
            <div style={{ fontSize: 10, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.08em", paddingLeft: 10, marginBottom: 6 }}>Preferences</div>
            {SECTIONS.map(s => (
              <button key={s.id} onClick={() => setSection(s.id)}
                style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "9px 10px", borderRadius: 9, background: section === s.id ? `${c.primary}10` : "none", color: section === s.id ? c.primary : c.textMuted, border: "none", cursor: "pointer", fontFamily: "Inter", fontSize: 13, fontWeight: section === s.id ? 700 : 500, textAlign: "left", transition: "all 0.1s", marginBottom: 2 }}
                onMouseEnter={e => { if (section !== s.id) e.currentTarget.style.background = c.surface2; }}
                onMouseLeave={e => { if (section !== s.id) e.currentTarget.style.background = "transparent"; }}>
                <Ic n={s.icon} size={14} color={section === s.id ? c.primary : c.textDim} />
                {s.label}
              </button>
            ))}
          </div>

          {/* Right content */}
          <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px 100px" }}>
            <div style={{ maxWidth: 680, margin: "0 auto" }}>
              <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: c.text, letterSpacing: "-0.01em", marginBottom: 4 }}>{current?.label}</h2>
                <p style={{ fontSize: 13, color: c.textMuted }}>{current?.desc}</p>
              </div>
              {renderSection()}
            </div>
          </div>
        </div>
      )}

      {toast && <Toast msg={toast.msg} type={toast.type} onDone={clearToast} />}
    </div>
  );
}
