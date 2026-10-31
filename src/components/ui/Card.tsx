"use client";

import { useState } from "react";
import { Theme, tok } from "./Theme";

export function Card({ children, t, style = {} }: { children: React.ReactNode; t: Theme; style?: React.CSSProperties }) {
    const c = tok(t);
    const [hov, setHov] = useState(false);
    return (
        <div
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{
                background: c.surface, border: `1px solid ${c.border}`,
                borderRadius: 18, boxShadow: hov ? c.cardHoverShadow : c.cardShadow,
                transform: hov ? "translateY(-3px)" : "none",
                transition: "all 0.22s ease",
                ...style,
            }}
        >{children}</div>
    );
}

export function FloatCard({ t, style, delay, children }: { t: Theme; style?: React.CSSProperties; delay?: string; children: React.ReactNode }) {
    const c = tok(t);
    return (
        <div className="animate-float" style={{
            position: "absolute", background: c.surface, border: `1px solid ${c.border}`,
            borderRadius: 14, padding: "12px 16px", maxWidth: 192,
            boxShadow: c.cardShadow, backdropFilter: "blur(12px)",
            animationDelay: delay, ...style,
        }}>{children}</div>
    );
}
