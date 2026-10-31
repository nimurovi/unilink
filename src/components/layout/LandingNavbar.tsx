"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme, tok } from "@/components/ui/Theme";
import { Icon } from "@/components/ui/Icon";

export function LandingNavbar({ onLogin }: { onLogin?: () => void }) {
    const { theme, toggle } = useTheme();
    const c = tok(theme);
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [mob, setMob] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    const handleLoginClick = () => {
        if (onLogin) {
            onLogin();
        } else {
            router.push("/login");
        }
    };

    const handleRegisterClick = () => {
        router.push("/register");
    };

    return (
        <nav style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
            background: scrolled ? c.navBg : "transparent",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            borderBottom: scrolled ? `1px solid ${c.border}` : "none",
            padding: scrolled ? "10px 0" : "18px 0",
            transition: "all 0.3s ease",
        }}>
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", gap: 40 }}>
                {/* Logo */}
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, textDecoration: "none" }}>
                    <div style={{
                        width: 32, height: 32, borderRadius: 9,
                        background: `linear-gradient(135deg, ${c.primary}, ${c.primaryDark})`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        <span style={{ fontSize: 15, color: "#fff", fontWeight: 800, fontFamily: "Manrope" }}>U</span>
                    </div>
                    <span style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 18, color: c.text, letterSpacing: "-0.02em" }}>UniLink</span>
                </Link>

                {/* Nav links */}
                <div style={{ flex: 1, display: "flex", justifyContent: "center", gap: 32 }} className="hidden-mobile">
                    {[
                        { label: "Features", href: "#features" },
                        { label: "How It Works", href: "#how-it-works" },
                        { label: "For Students", href: "/dashboard" },
                        { label: "For CRs", href: "/cr-portal" },
                        { label: "About", href: "#about" },
                    ].map((l) => (
                        <Link key={l.label} href={l.href} style={{ fontSize: 14, fontWeight: 500, color: c.textMuted, cursor: "pointer", textDecoration: "none", transition: "color 0.18s ease" }}
                            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = c.text)}
                            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = c.textMuted)}
                        >{l.label}</Link>
                    ))}
                </div>

                {/* Right actions */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                    {/* Theme toggle */}
                    <button onClick={toggle} style={{
                        width: 36, height: 36, borderRadius: 9, border: `1px solid ${c.border}`,
                        background: c.surface2, display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", color: c.textMuted, transition: "all 0.18s ease",
                    }}>
                        <Icon n={theme === "light" ? "moon" : "sun"} size={15} color={c.textMuted} />
                    </button>
                    <button onClick={handleLoginClick} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, color: c.textMuted, padding: "8px 16px", borderRadius: 10, fontFamily: "Inter" }}>Log In</button>
                    <button onClick={handleRegisterClick} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: c.primary, color: "#fff", fontFamily: "Inter", fontWeight: 600, fontSize: 14, padding: "8px 18px", borderRadius: 10, border: "none", cursor: "pointer" }}>Get Started</button>
                    <button style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: c.textMuted }} className="show-mobile" onClick={() => setMob(!mob)}>
                        <Icon n={mob ? "x" : "menu"} size={22} color={c.textMuted} />
                    </button>
                </div>
            </div>

            {mob && (
                <div style={{ background: c.surface, borderTop: `1px solid ${c.border}`, padding: "16px 32px 24px" }}>
                    {[
                        { label: "Features", href: "#features" },
                        { label: "How It Works", href: "#how-it-works" },
                        { label: "For Students", href: "/dashboard" },
                        { label: "For CRs", href: "/cr-portal" },
                        { label: "About", href: "#about" },
                    ].map((l) => (
                        <Link key={l.label} href={l.href} onClick={() => setMob(false)} style={{ display: "block", padding: "10px 0", borderBottom: `1px solid ${c.border}`, fontSize: 15, color: c.textMuted, textDecoration: "none" }}>{l.label}</Link>
                    ))}
                    <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                        <button onClick={() => { setMob(false); handleLoginClick(); }} style={{ flex: 1, padding: "10px", borderRadius: 10, border: `1px solid ${c.border}`, background: "none", color: c.textMuted, fontFamily: "Inter", fontWeight: 500, fontSize: 14, cursor: "pointer" }}>Log In</button>
                        <button onClick={() => { setMob(false); handleRegisterClick(); }} style={{ flex: 1, padding: "10px", borderRadius: 10, background: c.primary, color: "#fff", fontFamily: "Inter", fontWeight: 600, fontSize: 14, border: "none", cursor: "pointer" }}>Get Started</button>
                    </div>
                </div>
            )}
        </nav>
    );
}
