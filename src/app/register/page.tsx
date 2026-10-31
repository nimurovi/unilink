"use client";
import { useRef, useState } from "react";
import { validateRegistration } from "@/lib/registration";
import Link from "next/link";
import { useTheme, tok } from "@/components/ui/Theme";

export default function RegisterPage() {
    const { theme, toggle } = useTheme();
    const c = tok(theme);

    const [fullName, setFullName] = useState("");
    const [studentId, setStudentId] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("CSE");
    const [batch, setBatch] = useState("Batch 52");
    const [section, setSection] = useState("Section B");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState("");
    const submitting = useRef(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (submitting.current || success) return;
        setError("");
        let input;
        try {
            input = validateRegistration({ fullName, studentId, email, department, batch, section, password });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Check your registration details.");
            return;
        }
        submitting.current = true;
        setLoading(true);
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(input),
            });
            const data = await response.json().catch(() => null);
            if (!response.ok) {
                throw new Error(typeof data?.error === "string" ? data.error : "Registration failed. Please try again.");
            }
            setPassword("");
            setSuccess("Your account was created successfully.");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to connect. Please try again.");
        } finally {
            submitting.current = false;
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", background: c.bg, color: c.text, display: "flex", flexDirection: "column", fontFamily: "Inter, sans-serif" }}>
            {/* Header */}
            <header style={{ height: 64, borderBottom: `1px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px" }}>
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${c.primary}, ${c.sky})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 18, color: c.text }}>UniLink</span>
                </Link>
                <button onClick={toggle} style={{ background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 9, padding: "7px 12px", cursor: "pointer", color: c.textMuted, fontSize: 12, fontWeight: 600 }}>
                    {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                </button>
            </header>

            {/* Main Container */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 24px" }}>
                <div style={{ width: "100%", maxWidth: 520, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 24, padding: "36px 32px", boxShadow: c.cardShadow }}>
                    <div style={{ textAlign: "center", marginBottom: 24 }}>
                        <h1 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 24, color: c.text, marginBottom: 8 }}>Create your account</h1>
                        <p style={{ fontSize: 13, color: c.textMuted }}>Join your class network on UniLink.</p>
                    </div>

                    {success && <div role="status" style={{ padding: "12px 14px", marginBottom: 16, borderRadius: 10, background: "rgba(16,185,129,0.1)", color: c.text }}>{success}</div>}

                    {error && (
                        <div role="alert" style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", color: "#EF4444", fontSize: 12, fontWeight: 600, marginBottom: 16 }}>
                            {error}
                        </div>
                    )}

                    <form aria-busy={loading} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <div>
                                <label htmlFor="full-name" style={{ display: "block", fontSize: 11, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 5 }}>Full Name *</label>
                                <input type="text" required minLength={2} maxLength={150} autoComplete="name" id="full-name" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Naimur Rahman" style={{ width: "100%", padding: "9px 12px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                            </div>
                            <div>
                                <label htmlFor="student-id" style={{ display: "block", fontSize: 11, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 5 }}>Student ID *</label>
                                <input type="text" required maxLength={50} id="student-id" value={studentId} onChange={e => setStudentId(e.target.value)} placeholder="0182220012101001" style={{ width: "100%", padding: "9px 12px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" style={{ display: "block", fontSize: 11, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 5 }}>University Email *</label>
                            <input type="email" required maxLength={254} autoComplete="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="naimur@unilink.edu" style={{ width: "100%", padding: "9px 12px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                            <div>
                                <label htmlFor="department" style={{ display: "block", fontSize: 11, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 5 }}>Dept</label>
                                <select id="department" value={department} onChange={e => setDepartment(e.target.value)} style={{ width: "100%", padding: "9px 8px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, fontSize: 12, outline: "none" }}>
                                    <option>CSE</option>
                                    <option>EEE</option>
                                    <option>BBA</option>
                                    <option>English</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="batch" style={{ display: "block", fontSize: 11, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 5 }}>Batch</label>
                                <select id="batch" value={batch} onChange={e => setBatch(e.target.value)} style={{ width: "100%", padding: "9px 8px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, fontSize: 12, outline: "none" }}>
                                    <option>Batch 52</option>
                                    <option>Batch 53</option>
                                    <option>Batch 51</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="section" style={{ display: "block", fontSize: 11, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 5 }}>Section</label>
                                <select id="section" value={section} onChange={e => setSection(e.target.value)} style={{ width: "100%", padding: "9px 8px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, fontSize: 12, outline: "none" }}>
                                    <option>Section B</option>
                                    <option>Section A</option>
                                    <option>Section C</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" style={{ display: "block", fontSize: 11, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 5 }}>Password *</label>
                            <input type="password" required minLength={12} maxLength={128} autoComplete="new-password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ width: "100%", padding: "9px 12px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                        </div>

                        <button type="submit" disabled={loading || Boolean(success)} style={{ width: "100%", padding: "11px 0", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer", opacity: loading ? 0.7 : 1, marginTop: 8 }}>
                            {loading ? "Creating Account..." : success ? "Account Created" : "Create Account →"}
                        </button>
                    </form>

                    <div style={{ marginTop: 20, textAlign: "center", fontSize: 13, color: c.textMuted }}>
                        Already have an account?{" "}
                        <Link href="/login" style={{ color: c.primary, fontWeight: 600, textDecoration: "none" }}>Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
