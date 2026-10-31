"use client";
import { createContext, useContext, ReactNode, useState } from "react";

export type Theme = "light" | "dark";
export const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
    theme: "light",
    toggle: () => { },
});
export const useTheme = () => useContext(ThemeCtx);

export const LIGHT = {
    bg: "#F8FAFC",
    surface: "#FFFFFF",
    surface2: "#F1F5F9",
    surface3: "#E2E8F0",
    primary: "#2563EB",
    primaryDark: "#1D4ED8",
    primaryFg: "#FFFFFF",
    sky: "#38BDF8",
    navy: "#0F172A",
    text: "#0F172A",
    textMuted: "#64748B",
    textDim: "#94A3B8",
    border: "#E2E8F0",
    borderStrong: "#CBD5E1",
    cardShadow: "0 1px 4px rgba(15,23,42,0.07), 0 4px 16px rgba(15,23,42,0.04)",
    cardHoverShadow: "0 4px 24px rgba(37,99,235,0.12), 0 2px 8px rgba(15,23,42,0.08)",
    navBg: "rgba(248,250,252,0.88)",
    primaryGlow: "rgba(37,99,235,0.15)",
    badge: { bg: "rgba(37,99,235,0.08)", text: "#2563EB", border: "rgba(37,99,235,0.2)" },
    heroGrid: "rgba(37,99,235,0.04)",
    aiGlow: "0 0 40px rgba(56,189,248,0.15), 0 0 80px rgba(37,99,235,0.08)",
    btnGhost: { bg: "transparent", border: "#E2E8F0", text: "#64748B", hover: "#F1F5F9" },
};

export const DARK = {
    bg: "#080D1A",
    surface: "#0F172A",
    surface2: "#172033",
    surface3: "#1E293B",
    primary: "#3B82F6",
    primaryDark: "#2563EB",
    primaryFg: "#FFFFFF",
    sky: "#38BDF8",
    navy: "#F8FAFC",
    text: "#F8FAFC",
    textMuted: "#94A3B8",
    textDim: "#475569",
    border: "#1E293B",
    borderStrong: "#334155",
    cardShadow: "0 1px 4px rgba(0,0,0,0.3), 0 4px 20px rgba(0,0,0,0.2)",
    cardHoverShadow: "0 4px 28px rgba(59,130,246,0.18), 0 2px 8px rgba(0,0,0,0.3)",
    navBg: "rgba(8,13,26,0.88)",
    primaryGlow: "rgba(59,130,246,0.2)",
    badge: { bg: "rgba(59,130,246,0.15)", text: "#60A5FA", border: "rgba(59,130,246,0.25)" },
    heroGrid: "rgba(59,130,246,0.04)",
    aiGlow: "0 0 50px rgba(56,189,248,0.2), 0 0 100px rgba(59,130,246,0.12)",
    btnGhost: { bg: "transparent", border: "#1E293B", text: "#94A3B8", hover: "#172033" },
};

export function tok(t: Theme) { return t === "light" ? LIGHT : DARK; }

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");
    const toggle = () => setTheme(t => t === "light" ? "dark" : "light");
    return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
}
