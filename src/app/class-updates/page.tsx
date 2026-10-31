"use client";
import Link from "next/link";
import { ClassUpdatesFeed } from "@/components/ui/ClassUpdatesFeed";
import { useTheme, tok } from "@/components/ui/Theme";

export default function ClassUpdatesPage() {
  const { theme } = useTheme();
  const c = tok(theme);
  return <main style={{ minHeight: "100dvh", background: c.bg, color: c.text, padding: "24px 16px" }}>
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <Link href="/dashboard" style={{ display: "inline-block", marginBottom: 20, color: c.primary }}>← Student Portal</Link>
      <ClassUpdatesFeed />
    </div>
  </main>;
}
