import { Theme, tok } from "./Theme";

export function Badge({ children, t }: { children: React.ReactNode; t: Theme }) {
    const c = tok(t);
    return (
        <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: c.badge.bg, color: c.badge.text,
            border: `1px solid ${c.badge.border}`,
            borderRadius: 999, padding: "5px 14px",
            fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase",
        }}>{children}</span>
    );
}
