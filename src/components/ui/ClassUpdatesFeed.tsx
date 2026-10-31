"use client";
import Link from "next/link";
import { useClassUpdatesState } from "@/lib/class-updates";
import { useTheme, tok } from "@/components/ui/Theme";

export function ClassUpdatesFeed({ limit }: { limit?: number }) {
  const { theme } = useTheme();
  const c = tok(theme);
  const { updates: all, loading, error } = useClassUpdatesState();
      const published = all.filter(update => update.status === "published");
  const updates = limit === undefined ? published : published.slice(0, limit);
  return (
    <section aria-label="Class updates" style={{ background: c.surface, color: c.text, border: `1px solid ${c.border}`, borderRadius: 18, padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <h2 style={{ fontSize: 18 }}>Class Updates ({published.length})</h2>
        {limit !== undefined && <Link href="/class-updates" style={{ color: c.primary }}>View All →</Link>}
      </div>
      <p style={{ color: c.textMuted, fontSize: 12 }}>Updates for your registered department, batch, and section. Refreshes every 15 seconds.</p>
      {loading && <p>Loading class updates…</p>}
          {error && <p role="alert">{error}</p>}
          {!loading && !error && updates.length === 0 && <p>No published class updates yet.</p>}
      <div style={{ display: "grid", gap: 12 }}>
        {updates.map(update => (
          <article key={update.id} id={update.id} style={{ padding: 16, background: c.surface2, borderRadius: 12, borderLeft: `3px solid ${update.color}`, overflowWrap: "anywhere" }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 14 }}>{update.emoji} {update.code} · {update.type}</h3>
            <p style={{ whiteSpace: "pre-wrap", margin: "8px 0", fontSize: 14 }}>{update.detail}</p>
            {update.note && <p style={{ whiteSpace: "pre-wrap", color: c.textMuted, fontSize: 13 }}>{update.note}</p>}
            <small style={{ color: c.textMuted }}>Posted by CR · {update.time}</small>
            {limit !== undefined && <div style={{ marginTop: 10 }}><Link href={`/class-updates#${encodeURIComponent(update.id)}`} style={{ color: c.primary, fontSize: 12 }}>View Update →</Link></div>}
          </article>
        ))}
      </div>
    </section>
  );
}
