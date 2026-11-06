"use client";
import {useAccount} from '@/lib/account';
import { useState } from "react";
import { useTheme, tok } from "@/components/ui/Theme";
export default function SessionControls({ name }: { name: string }) {
  const { theme } = useTheme();
  const {account,loading}=useAccount();
  const c = tok(theme);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function logout() {
    if (busy) return;
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to sign out.");
      window.location.replace("/login");
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to sign out."); setBusy(false); }
  }
  return <aside aria-label="Account session" style={{ position: "fixed", bottom: 12, right: 12, zIndex: 1000, maxWidth: "calc(100vw - 24px)", padding: "8px 12px", borderRadius: 12, border: `1px solid ${c.border}`, background: c.surface, color: c.text, boxShadow: c.cardShadow, fontSize: 12 }}>
    <span style={{ marginRight: 12 }}>{account?.fullName||(loading?name:'Account')}</span>
    <button type="button" disabled={busy} onClick={logout} style={{ background: c.primary, color: "white", border: 0, borderRadius: 8, padding: "8px 12px", cursor: "pointer" }}>{busy ? "Signing out…" : "Sign out"}</button>
    {error && <p role="alert">{error}</p>}
  </aside>;
}
