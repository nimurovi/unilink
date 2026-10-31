"use client";
import { useState, useEffect, useContext, useRef } from "react";
import { useMaterials, refreshMaterials, saveMaterial, removeMaterial, downloadMaterial } from "@/lib/materials";
import MaterialUpload from "@/components/ui/MaterialUpload";
import type { Material, MatType, FileExt } from "@/lib/material-types";
import { ThemeCtx } from "@/components/ui/Theme";

type Theme = "light" | "dark";
const useTheme = () => useContext(ThemeCtx);

const LIGHT = {
  bg: "#F8FAFC", surface: "#FFFFFF", surface2: "#F1F5F9", surface3: "#E2E8F0",
  primary: "#2563EB", primaryDark: "#1D4ED8",
  text: "#0F172A", textMuted: "#64748B", textDim: "#94A3B8",
  border: "#E2E8F0", cardShadow: "0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)",
};
const DARK = {
  bg: "#080D1A", surface: "#0F172A", surface2: "#172033", surface3: "#1E293B",
  primary: "#3B82F6", primaryDark: "#2563EB",
  text: "#F8FAFC", textMuted: "#94A3B8", textDim: "#475569",
  border: "#1E293B", cardShadow: "0 1px 4px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.18)",
};
const tok = (t: Theme) => t === "light" ? LIGHT : DARK;

// ─── ICONS ───────────────────────────────────────────────────────────────────────
const P: Record<string, string[]> = {
  search: ["M21 21l-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z"],
  download: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M7 10l5 5 5-5", "M12 15V3"],
  bookmark: ["M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"],
  eye: ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", "M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
  share: ["M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8", "M16 6l-4-4-4 4", "M12 2v13"],
  arrowL: ["M19 12H5M12 19l-7-7 7-7"],
  chevR: ["M9 18l6-6-6-6"],
  chevL: ["M15 18l-6-6 6-6"],
  zoomIn: ["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z", "M21 21l-4.35-4.35", "M11 8v6M8 11h6"],
  zoomOut: ["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z", "M21 21l-4.35-4.35", "M8 11h6"],
  maximize: ["M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"],
  file: ["M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z", "M14 2v6h6"],
  folder: ["M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"],
  upload: ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", "M17 8l-5-5-5 5", "M12 3v12"],
  x: ["M18 6L6 18M6 6l12 12"],
  check: ["M20 6L9 17l-5-5"],
  alert: ["M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z", "M12 9v4M12 17h.01"],
  book: ["M4 19.5A2.5 2.5 0 0 1 6.5 17H20", "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"],
  trash: ["M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6M10 6V4h4v2"],
};
function Ic({ n, size = 16, color = "currentColor" }: { n: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      {(P[n] ?? []).map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

// ─── TYPES ────────────────────────────────────────────────────────────────────────
const EXT_COLOR: Record<FileExt, { color: string; bg: string }> = {
  PDF: { color: "#EF4444", bg: "rgba(239,68,68,0.1)" },
  PPTX: { color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
  PPT: { color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
  DOCX: { color: "#2563EB", bg: "rgba(37,99,235,0.1)" },
  DOC: { color: "#2563EB", bg: "rgba(37,99,235,0.1)" },
  XLSX: { color: "#10B981", bg: "rgba(16,185,129,0.1)" },
  ZIP: { color: "#8B5CF6", bg: "rgba(139,92,246,0.1)" },
  Image: { color: "#06B6D4", bg: "rgba(6,182,212,0.1)" },
};

function ExtBadge({ ext }: { ext: FileExt }) {
  const e = EXT_COLOR[ext];
  return <span style={{ padding: "2px 7px", borderRadius: 5, fontSize: 10, fontWeight: 700, color: e.color, background: e.bg, letterSpacing: "0.04em" }}>{ext}</span>;
}

// ─── TOAST ────────────────────────────────────────────────────────────────────────
function Toast({ msg, onUndo, onDismiss }: { msg: string; onUndo?: () => void; onDismiss: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  useEffect(() => { const t = setTimeout(onDismiss, 3200); return () => clearTimeout(t); }, [onDismiss]);
  return (
    <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 9999, background: theme === "dark" ? "#1E293B" : "#1E293B", color: "#F8FAFC", borderRadius: 12, padding: "11px 20px", display: "flex", gap: 14, alignItems: "center", boxShadow: "0 8px 24px rgba(0,0,0,0.3)", fontFamily: "Inter", fontSize: 13, fontWeight: 500, whiteSpace: "nowrap" }}>
      <Ic n="check" size={14} color="#10B981" />
      {msg}
      {onUndo && <button onClick={onUndo} style={{ color: "#60A5FA", fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontSize: 13, padding: 0 }}>Undo</button>}
      <button onClick={onDismiss} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, marginLeft: 4 }}><Ic n="x" size={13} color="#94A3B8" /></button>
    </div>
  );
}

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

// ─── MATERIAL ROW ─────────────────────────────────────────────────────────────────
function MatRow({ mat, saved, onSave, onPreview, onDownload }: {
  mat: Material; saved: boolean;
  onSave: () => void; onPreview: () => void; onDownload: () => void;
}) {
  const { theme } = useTheme(); const c = tok(theme);
  const [hov, setHov] = useState(false);

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "flex", gap: 14, alignItems: "center", padding: "13px 20px", borderBottom: `1px solid ${c.border}`, background: hov ? c.surface2 : "transparent", transition: "background 0.13s", cursor: "default" }}>
      {/* File icon */}
      <div style={{ width: 38, height: 38, borderRadius: 10, background: EXT_COLOR[mat.ext].bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Ic n="file" size={17} color={EXT_COLOR[mat.ext].color} />
      </div>
      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 3, flexWrap: "wrap" }}>
          <span onClick={onPreview} style={{ fontSize: 13, fontWeight: 700, color: mat.archived ? c.textDim : c.text, cursor: "pointer", textDecoration: hov ? "underline" : "none" }}>{mat.title}</span>
          {mat.version && mat.version > 1 && <span style={{ fontSize: 9, fontWeight: 700, background: "rgba(37,99,235,0.08)", color: "#2563EB", border: "1px solid rgba(37,99,235,0.2)", borderRadius: 5, padding: "1px 5px" }}>v{mat.version} Updated</span>}
          {mat.archived && <span style={{ fontSize: 9, fontWeight: 700, background: c.surface3, color: c.textDim, border: `1px solid ${c.border}`, borderRadius: 5, padding: "1px 5px" }}>Archived</span>}
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: c.textMuted }}>{mat.course} · {mat.code}</span>
          <ExtBadge ext={mat.ext} />
          <span style={{ fontSize: 11, color: c.textDim }}>{mat.size}</span>
          <span style={{ fontSize: 11, color: c.textDim }}>{mat.uploaderRole === "cr" ? "📌" : "👤"} {mat.uploader}</span>
          <span style={{ fontSize: 11, color: c.textDim }}>{new Date(mat.createdAt).toLocaleString()}</span>
        </div>
      </div>
      {/* Actions */}
      <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0, opacity: hov ? 1 : 0.5, transition: "opacity 0.13s" }}>
        <button onClick={onPreview} title="Details" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 11px", borderRadius: 8, background: c.surface3, border: `1px solid ${c.border}`, color: c.textMuted, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "Inter", whiteSpace: "nowrap" }}>
          <Ic n="eye" size={12} color={c.textMuted} /> Details
        </button>
        {!mat.archived && (
          <button onClick={onDownload} title="Download" style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 11px", borderRadius: 8, background: c.surface3, border: `1px solid ${c.border}`, color: c.textMuted, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "Inter", whiteSpace: "nowrap" }}>
            <Ic n="download" size={12} color={c.textMuted} /> Download
          </button>
        )}
        <button onClick={onSave} title={saved ? "Saved" : "Save"} style={{ padding: "6px 8px", borderRadius: 8, background: saved ? "rgba(37,99,235,0.08)" : c.surface3, border: `1px solid ${saved ? "rgba(37,99,235,0.25)" : c.border}`, cursor: "pointer" }}>
          <Ic n="bookmark" size={14} color={saved ? "#2563EB" : c.textDim} />
        </button>
      </div>
    </div>
  );
}

// ─── DOCUMENT VIEWER ──────────────────────────────────────────────────────────────
// ─── SCREEN 2: MATERIAL DETAIL / PREVIEW ─────────────────────────────────────────
function MaterialDetail({ mat, saved, onSave, onBack, onOpenRelated }: {
  mat: Material; saved: boolean; onSave: () => void; onBack: () => void; onOpenRelated: (id: string) => void;
}) {
  const { theme } = useTheme(); const c = tok(theme);
  const [downloading, setDownloading] = useState(false);

  const [downloadError, setDownloadError] = useState("");
  async function handleDownload() {
    if(downloading)return;
    setDownloading(true);setDownloadError("");
    try {await downloadMaterial(mat);} catch(e) {setDownloadError(e instanceof Error?e.message:"Download failed.");}
    finally {setDownloading(false);}
  }

  const { materials: MATERIALS } = useMaterials();
  const related = MATERIALS.filter(m => m.course === mat.course && m.id !== mat.id).slice(0, 3);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>

        {/* Back */}
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: c.textMuted, cursor: "pointer", fontFamily: "Inter", fontSize: 12, fontWeight: 600, marginBottom: 20, padding: 0 }}>
          <Ic n="arrowL" size={14} color={c.textMuted} /> Back to Class Materials
        </button>

        {/* Header */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "22px 26px", boxShadow: c.cardShadow, marginBottom: 20 }}>
          {mat.archived && (
            <div style={{ marginBottom: 14, padding: "10px 14px", background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 10, display: "flex", gap: 8, alignItems: "center" }}>
              <Ic n="alert" size={14} color={c.textDim} />
              <span style={{ fontSize: 12, color: c.textMuted, fontWeight: 600 }}>Material Archived — This resource is no longer available.</span>
            </div>
          )}
          {mat.version && mat.version > 1 && mat.updated && (
            <div style={{ marginBottom: 14, padding: "10px 14px", background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.2)", borderRadius: 10, display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Ic n="check" size={14} color="#2563EB" />
                <span style={{ fontSize: 12, color: "#2563EB", fontWeight: 600 }}>Updated material available — v{mat.version} · {mat.updated}</span>
              </div>

            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <div style={{ width: 50, height: 50, borderRadius: 14, background: EXT_COLOR[mat.ext].bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Ic n="file" size={22} color={EXT_COLOR[mat.ext].color} />
              </div>
              <div>
                <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 20, color: c.text, letterSpacing: "-0.01em", marginBottom: 5 }}>{mat.title}</h1>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, color: c.textMuted }}>{mat.course} · {mat.code}</span>
                  <ExtBadge ext={mat.ext} />
                  <span style={{ fontSize: 12, color: c.textDim }}>{mat.size}</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {!mat.archived && (
                <button onClick={handleDownload} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                  <Ic n="download" size={14} color="#fff" /> {downloading ? "Downloading..." : "Download"}
                </button>
              )}
              <button onClick={onSave} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 10, background: saved ? "rgba(37,99,235,0.08)" : c.surface2, border: `1px solid ${saved ? "rgba(37,99,235,0.25)" : c.border}`, color: saved ? "#2563EB" : c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                <Ic n="bookmark" size={14} color={saved ? "#2563EB" : c.textMuted} /> {saved ? "Saved" : "Save"}
              </button>
              <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 14px", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                <Ic n="share" size={14} color={c.textMuted} /> Share
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, alignItems: "flex-start" }}>
          {/* Left: preview + description */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {mat.archived ? (
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "60px 24px", textAlign: "center", boxShadow: c.cardShadow }}>
                <div style={{ width: 52, height: 52, borderRadius: 16, background: c.surface2, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <Ic n="folder" size={24} color={c.textDim} />
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: c.textMuted, marginBottom: 8 }}>Material Archived</div>
                <div style={{ fontSize: 13, color: c.textDim, marginBottom: 20 }}>This resource is no longer available.</div>
                <button onClick={onBack} style={{ padding: "9px 20px", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Back to Materials</button>
              </div>
            ) : (
              <div style={{padding:28,background:c.surface,borderRadius:14,border:`1px solid ${c.border}`}}><strong>{mat.fileName}</strong><p>Download the original file to view its contents.</p>{downloadError && <p role="alert" style={{color:"#EF4444"}}>{downloadError}</p>}</div>
            )}

            {mat.description && (
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
                <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 10 }}>Description</div>
                <p style={{ fontSize: 13, color: c.textMuted, lineHeight: 1.7, margin: 0 }}>{mat.description}</p>
              </div>
            )}

            {/* Related materials */}
            {related.length > 0 && (
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
                <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>Related Materials</div>
                {related.map((r, i) => (
                  <div key={r.id} onClick={() => onOpenRelated(r.id)}
                    style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 12px", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, marginBottom: i < related.length - 1 ? 8 : 0, cursor: "pointer", transition: "background 0.12s" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = c.surface3)}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = c.surface2)}>
                    <div style={{ width: 32, height: 32, borderRadius: 9, background: EXT_COLOR[r.ext].bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Ic n="file" size={14} color={EXT_COLOR[r.ext].color} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: c.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.title}</div>
                      <div style={{ fontSize: 11, color: c.textDim }}>{r.ext} · {r.size}</div>
                    </div>
                    <Ic n="chevR" size={14} color={c.textDim} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Material info */}
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: c.cardShadow }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 14 }}>Material Information</div>
              {[
                { label: "Course", val: mat.course },
                { label: "Course Code", val: mat.code },
                { label: "Type", val: mat.type },
                { label: "Uploaded By", val: mat.uploader },
                { label: "Uploaded", val: mat.uploadedDate },
                { label: "File Size", val: mat.size },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 9, marginBottom: 9, borderBottom: `1px solid ${c.border}`, gap: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: c.textDim, flexShrink: 0 }}>{row.label}</span>
                  <span style={{ fontSize: 12, color: c.text, fontWeight: 500, textAlign: "right" }}>{row.val}</span>
                </div>
              ))}
            </div>

            {/* Course link */}
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: c.cardShadow }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: `${mat.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Ic n="book" size={16} color={mat.color} />
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: c.text }}>{mat.course}</div>
                  <div style={{ fontSize: 11, color: c.textDim }}>{mat.code}</div>
                </div>
              </div>
              <button onClick={onBack} style={{ width: "100%", padding: "7px 0", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                All Materials <Ic n="chevR" size={12} color={c.textMuted} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN 3: SAVED MATERIALS ────────────────────────────────────────────────────
function SavedMaterialsPage({ savedIds, onToggleSave, onOpenMat }: {
  savedIds: Set<string>; onToggleSave: (id: string) => Promise<void>; onOpenMat: (id: string) => void;
}) {
  const { theme } = useTheme(); const c = tok(theme);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [toast, setToast] = useState<{ msg: string; undoId?: string } | null>(null);

  const { materials: MATERIALS } = useMaterials();
  const savedMats = MATERIALS.filter(m => savedIds.has(m.id));
  const TYPE_OPTS = ["All", "PDF", "Slides", "Notes", "Lab", "Question Papers"];

  const filtered = savedMats.filter(m => {
    const matchQ = !query || m.title.toLowerCase().includes(query.toLowerCase()) || m.course.toLowerCase().includes(query.toLowerCase());
    const matchType = typeFilter === "All" || m.ext === typeFilter || m.type === typeFilter ||
      (typeFilter === "Slides" && (m.type === "Slides" || m.ext === "PPTX" || m.ext === "PPT")) ||
      (typeFilter === "Notes" && m.type === "Notes") ||
      (typeFilter === "Lab" && m.type === "Lab") ||
      (typeFilter === "Question Papers" && m.type === "Question Paper");
    return matchQ && matchType;
  });

  async function handleRemove(id: string) {
    try {await onToggleSave(id);setToast({msg:"Removed from Saved",undoId:id});}
    catch(e){setToast({msg:e instanceof Error?e.message:"Could not save bookmark."});}
  }

  async function handleUndo() {
    try {if(toast?.undoId){await onToggleSave(toast.undoId);}setToast(null);}
    catch(e){setToast({msg:e instanceof Error?e.message:"Could not save bookmark."});}
  }

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 24, color: c.text, letterSpacing: "-0.02em", marginBottom: 4 }}>Saved Materials</h1>
          <p style={{ fontSize: 13, color: c.textMuted }}>Quickly access the resources you&apos;ve bookmarked.</p>
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: "1 1 220px", minWidth: 180 }}>
            <div style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}><Ic n="search" size={14} color={c.textDim} /></div>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search saved materials..."
              style={{ width: "100%", padding: "8px 12px 8px 34px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ display: "flex", gap: 5 }}>
            {TYPE_OPTS.map(f => (
              <button key={f} onClick={() => setTypeFilter(f)}
                style={{ padding: "6px 12px", borderRadius: 999, fontSize: 11, fontWeight: typeFilter === f ? 700 : 500, background: typeFilter === f ? `${c.primary}10` : "transparent", color: typeFilter === f ? c.primary : c.textMuted, border: `1px solid ${typeFilter === f ? c.primary + "30" : c.border}`, cursor: "pointer", whiteSpace: "nowrap" }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div style={{ fontSize: 12, fontWeight: 600, color: c.textDim, marginBottom: 14 }}>{savedIds.size} saved {savedIds.size === 1 ? "material" : "materials"}</div>

        {filtered.length === 0 ? (
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "60px 24px", textAlign: "center", boxShadow: c.cardShadow }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: c.surface2, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Ic n="bookmark" size={24} color={c.textDim} />
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 6 }}>
              {savedMats.length === 0 ? "No Saved Materials" : "No Materials Found"}
            </div>
            <div style={{ fontSize: 13, color: c.textDim }}>
              {savedMats.length === 0 ? "You haven't saved any materials yet." : "No saved materials match your search."}
            </div>
          </div>
        ) : (
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, overflow: "hidden", boxShadow: c.cardShadow }}>
            {filtered.map((m, i) => (
              <div key={m.id} style={{ display: "flex", gap: 14, alignItems: "center", padding: "14px 20px", borderBottom: i < filtered.length - 1 ? `1px solid ${c.border}` : "none", transition: "background 0.13s" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = c.surface2)}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: EXT_COLOR[m.ext].bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Ic n="file" size={16} color={EXT_COLOR[m.ext].color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: c.text, marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.title}</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, color: c.textMuted }}>{m.course}</span>
                    <ExtBadge ext={m.ext} />
                    <span style={{ fontSize: 11, color: c.textDim }}>Uploaded {new Date(m.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <button onClick={() => onOpenMat(m.id)} style={{ padding: "6px 14px", borderRadius: 8, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Open</button>
                  <button onClick={() => { void downloadMaterial(m).catch(e=>setToast({msg:e.message})); }} style={{ padding: "6px 10px", borderRadius: 8, background: c.surface2, border: `1px solid ${c.border}`, cursor: "pointer" }}>
                    <Ic n="download" size={13} color={c.textMuted} />
                  </button>
                  <button onClick={() => handleRemove(m.id)} style={{ padding: "6px 10px", borderRadius: 8, background: c.surface2, border: `1px solid ${c.border}`, cursor: "pointer" }} title="Remove from Saved">
                    <Ic n="trash" size={13} color={c.textDim} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {toast && <Toast msg={toast.msg} onUndo={toast.undoId ? handleUndo : undefined} onDismiss={() => setToast(null)} />}
    </div>
  );
}

// ─── SCREEN 1: CLASS MATERIALS LIST ──────────────────────────────────────────────
const CAT_FILTERS = ["All", "Lectures", "Slides", "Notes", "Lab", "Question Papers", "Other"] as const;


function MaterialsList({ savedIds, onToggleSave, onOpenMat, onGoSaved }: {
  savedIds: Set<string>; onToggleSave: (id: string) => Promise<void>;
  onOpenMat: (id: string) => void; onGoSaved: () => void;
}) {
  const { theme } = useTheme(); const c = tok(theme);
  const [cat, setCat] = useState<string>("All");
  const [course, setCourse] = useState("All Courses");
  const [sort, setSort] = useState("Newest");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<{ msg: string } | null>(null);

  const TYPE_MAP: Record<string, MatType[]> = {
    "All": [], "Lectures": ["Lecture"], "Slides": ["Slides"],
    "Notes": ["Notes"], "Lab": ["Lab"], "Question Papers": ["Question Paper"], "Other": ["Other"],
  };

  const { materials: MATERIALS } = useMaterials();
  const COURSES_LIST = ["All Courses", ...Array.from(new Set(MATERIALS.map(m=>m.course)))];
  const filtered = MATERIALS.filter(m => {
    const matchCat = cat === "All" || TYPE_MAP[cat]?.includes(m.type);
    const matchCourse = course === "All Courses" || m.course === course;
    const matchQ = !query || m.title.toLowerCase().includes(query.toLowerCase()) || m.course.toLowerCase().includes(query.toLowerCase()) || m.code.toLowerCase().includes(query.toLowerCase()) || m.uploader.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchCourse && matchQ;
  }).sort((a, b) => sort === "A–Z" ? a.title.localeCompare(b.title) : sort === "Oldest" ? a.createdAt.localeCompare(b.createdAt) : b.createdAt.localeCompare(a.createdAt));

  async function handleSave(id: string) {
    const wasSaved = savedIds.has(id);
    try{await onToggleSave(id);setToast({msg:wasSaved?"Removed from Saved":"Material saved"});}
    catch(e){setToast({msg:e instanceof Error?e.message:"Could not save bookmark."});}
  }

  async function handleDownload(mat:Material) {
    try{await downloadMaterial(mat);setToast({msg:"File sent to your browser for download"});}
    catch(e){setToast({msg:e instanceof Error?e.message:"Download failed."});}
  }

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 24, color: c.text, letterSpacing: "-0.02em", marginBottom: 4 }}>Class Materials</h1>
            <p style={{ fontSize: 13, color: c.textMuted }}>Find lecture notes, slides, lab files, and other course resources in one place.</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onGoSaved} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              <Ic n="bookmark" size={13} color={c.textMuted} /> Saved ({savedIds.size})
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
          <StatCard label="Total Materials" value={String(MATERIALS.length)} icon="file" color="#2563EB" bg="rgba(37,99,235,0.08)" />
          <StatCard label="Uploads This Week" value={String(MATERIALS.filter(m=>Date.now()-Date.parse(m.createdAt)<7*86400000).length)} icon="upload" color="#10B981" bg="rgba(16,185,129,0.08)" />
          <StatCard label="Saved Materials" value={String(savedIds.size)} icon="bookmark" color="#8B5CF6" bg="rgba(139,92,246,0.08)" />
          <StatCard label="Courses with Files" value={String(new Set(MATERIALS.map(m=>m.code)).size)} icon="book" color="#F59E0B" bg="rgba(245,158,11,0.08)" />
        </div>

        {/* Search + filters row */}
        <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: "1 1 220px", minWidth: 180 }}>
            <div style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}><Ic n="search" size={14} color={c.textDim} /></div>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search materials..."
              style={{ width: "100%", padding: "8px 12px 8px 34px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
          </div>
          <select value={course} onChange={e => setCourse(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 12, cursor: "pointer", outline: "none" }}>
            {COURSES_LIST.map(co => <option key={co}>{co}</option>)}
          </select>

          <select value={sort} onChange={e => setSort(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 12, cursor: "pointer", outline: "none" }}>
            <option>Newest</option><option>Oldest</option><option>A–Z</option>
          </select>
        </div>

        {/* Category chips */}
        <div style={{ display: "flex", gap: 6, marginBottom: 18, flexWrap: "wrap" }}>
          {CAT_FILTERS.map(f => (
            <button key={f} onClick={() => setCat(f)}
              style={{ padding: "5px 14px", borderRadius: 999, fontSize: 12, fontWeight: cat === f ? 700 : 500, background: cat === f ? `${c.primary}10` : "transparent", color: cat === f ? c.primary : c.textMuted, border: `1px solid ${cat === f ? c.primary + "30" : c.border}`, cursor: "pointer", transition: "all 0.13s" }}>
              {f}
            </button>
          ))}
        </div>

        {/* Materials list */}
        {filtered.length === 0 ? (
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "60px 24px", textAlign: "center", boxShadow: c.cardShadow }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: c.surface2, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Ic n="folder" size={24} color={c.textDim} />
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 6 }}>No Materials Found</div>
            <div style={{ fontSize: 13, color: c.textDim, marginBottom: 20 }}>No materials match your search or filters.</div>
            <button onClick={() => { setQuery(""); setCat("All"); setCourse("All Courses"); }} style={{ padding: "9px 20px", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Clear Filters</button>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.textDim, marginBottom: 10 }}>{filtered.length} materials</div>
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, overflow: "hidden", boxShadow: c.cardShadow }}>
              {filtered.map((mat, i) => (
                <MatRow key={mat.id} mat={mat} saved={savedIds.has(mat.id)}
                  onSave={() => handleSave(mat.id)}
                  onPreview={() => onOpenMat(mat.id)}
                  onDownload={() => { void handleDownload(mat); }}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {toast && <Toast msg={toast.msg} onDismiss={() => setToast(null)} />}
    </div>
  );
}

// ─── ROOT EXPORT ──────────────────────────────────────────────────────────────────
type MatView = "list" | "detail" | "saved";

export default function MaterialsPage() {
 const {theme}=useTheme();const c=tok(theme);
 const data=useMaterials();const [view,setView]=useState<MatView>("list");
 const [selectedId,setSelectedId]=useState<string|null>(null);
 const [upload,setUpload]=useState(false);const [error,setError]=useState("");const busy=useRef(new Set<string>());
 const savedIds=new Set(data.savedIds);
 async function toggleSave(id:string){if(busy.current.has(id))throw new Error("Please wait for the previous change.");busy.current.add(id);try{await saveMaterial(id,!savedIds.has(id));}finally{busy.current.delete(id);}}
 function openMat(id:string){setSelectedId(id);setView("detail");setError("");}
 const mat=data.materials.find(m=>m.id===selectedId);
 async function remove(){if(!mat||busy.current.has(mat.id)||!window.confirm("Remove this material for everyone in your class?"))return;busy.current.add(mat.id);try{await removeMaterial(mat.id);setView("list");setError("");}catch(e){setError(e instanceof Error?e.message:"Could not remove material.");}finally{busy.current.delete(mat.id);}}
 const button:React.CSSProperties={padding:"9px 14px",borderRadius:9,border:`1px solid ${c.border}`,background:c.surface,color:c.text,cursor:"pointer"};
 return <div style={{flex:1,minWidth:0,display:"flex",flexDirection:"column",overflowY:"auto",background:c.bg,color:c.text}}>
 <div style={{padding:"16px 28px 0",display:"flex",gap:10,flexWrap:"wrap"}}>
 {view!=="list"&&<button style={button} onClick={()=>setView("list")}>← All Materials</button>}
 <button style={button} onClick={()=>void refreshMaterials()}>Refresh</button>
 {data.canManage&&<button style={{...button,background:c.primary,color:"white"}} onClick={()=>setUpload(true)}>Upload Material</button>}
 {data.canManage&&view==="detail"&&mat&&<button style={button} onClick={()=>void remove()}>Remove Material</button>}
 </div>
 {data.loading?<p style={{padding:28}}>Loading materials…</p>:data.error?<p role="alert" style={{padding:28,color:"#EF4444"}}>{data.error}</p>:<>
 {error&&<p role="alert" style={{padding:"0 28px",color:"#EF4444"}}>{error}</p>}
 {view==="saved"?<SavedMaterialsPage savedIds={savedIds} onToggleSave={toggleSave} onOpenMat={openMat}/>:view==="detail"?mat?<MaterialDetail mat={mat} saved={savedIds.has(mat.id)} onSave={()=>{void toggleSave(mat.id).catch(e=>setError(e.message));}} onBack={()=>setView("list")} onOpenRelated={openMat}/>:<p style={{padding:28}}>This material is no longer available.</p>:<MaterialsList savedIds={savedIds} onToggleSave={toggleSave} onOpenMat={openMat} onGoSaved={()=>setView("saved")}/>}
 </>}
 {upload&&data.canManage&&<MaterialUpload onClose={()=>setUpload(false)}/>}
 </div>;
}
