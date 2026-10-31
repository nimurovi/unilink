"use client";

import { useState } from "react";
import { Theme, tok } from "./Theme";

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    large?: boolean;
    t: Theme;
};

export function BtnPrimary({ children, large, t, ...rest }: BtnProps) {
    const c = tok(t);
    const [hov, setHov] = useState(false);
    return (
        <button
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            {...rest}
            style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: hov ? c.primaryDark : c.primary, color: c.primaryFg,
                fontFamily: "Inter", fontWeight: 600, fontSize: large ? 16 : 14,
                padding: large ? "14px 28px" : "10px 20px",
                borderRadius: 10, border: "none", cursor: rest.disabled ? "not-allowed" : "pointer",
                transition: "all 0.18s ease",
                boxShadow: hov ? `0 4px 20px ${c.primaryGlow}` : "none",
                transform: hov ? "translateY(-1px)" : "none",
                opacity: rest.disabled ? 0.6 : 1,
                ...rest.style,
            }}
        >{children}</button>
    );
}

export function BtnGhost({ children, large, t, ...rest }: BtnProps) {
    const c = tok(t);
    const [hov, setHov] = useState(false);
    return (
        <button
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            {...rest}
            style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: hov ? c.btnGhost.hover : c.btnGhost.bg,
                color: hov ? c.text : c.textMuted,
                fontFamily: "Inter", fontWeight: 500, fontSize: large ? 16 : 14,
                padding: large ? "14px 28px" : "10px 20px",
                borderRadius: 10, border: `1px solid ${c.border}`,
                cursor: rest.disabled ? "not-allowed" : "pointer",
                transition: "all 0.18s ease",
                opacity: rest.disabled ? 0.6 : 1,
                ...rest.style,
            }}
        >{children}</button>
    );
}
