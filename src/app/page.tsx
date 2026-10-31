"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LostFoundSection from "@/app/lost-found/page";
import { ThemeCtx, Theme, tok, useTheme } from "@/components/ui/Theme";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { BtnPrimary, BtnGhost } from "@/components/ui/Button";
import { Card, FloatCard } from "@/components/ui/Card";
import { useSR } from "@/hooks/useSR";
import { LandingNavbar } from "@/components/layout/LandingNavbar";

// ─── NETWORK VISUALIZATION ────────────────────────────────────────────────────
const NET_NODES = [
  { id: "students", label: "Students", icon: "👥", x: 50, y: 12 },
  { id: "courses", label: "Courses", icon: "📚", x: 82, y: 33 },
  { id: "teachers", label: "Teachers", icon: "🎓", x: 80, y: 67 },
  { id: "announcements", label: "Announcements", icon: "📢", x: 50, y: 88 },
  { id: "events", label: "Events", icon: "🎪", x: 20, y: 67 },
  { id: "clubs", label: "Clubs", icon: "🏆", x: 18, y: 33 },
  { id: "opportunities", label: "Opportunities", icon: "💼", x: 28, y: 10 },
  { id: "communities", label: "Communities", icon: "🌐", x: 72, y: 10 },
];

function NetworkViz({ t }: { t: Theme }) {
  const c = tok(t);
  const [hov, setHov] = useState<string | null>(null);
  const primary = t === "light" ? "#2563EB" : "#3B82F6";
  const faint = t === "light" ? "rgba(37,99,235,0.12)" : "rgba(59,130,246,0.12)";
  const active = t === "light" ? "rgba(37,99,235,0.35)" : "rgba(59,130,246,0.35)";

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", maxWidth: 440, margin: "0 auto", userSelect: "none" }}>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100" preserveAspectRatio="none">
        {NET_NODES.map((n) => (
          <line key={n.id} x1={50} y1={50} x2={n.x} y2={n.y}
            stroke={hov === n.id ? primary : (t === "light" ? "#CBD5E1" : "#1E293B")}
            strokeWidth={hov === n.id ? 0.6 : 0.3}
            strokeDasharray="2 2"
            opacity={hov === n.id ? 0.9 : 0.5}
            style={{ transition: "all 0.25s ease" }}
          />
        ))}
      </svg>

      {/* Center */}
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", zIndex: 10 }}>
        <div style={{
          width: 80, height: 80, borderRadius: 20,
          background: `linear-gradient(135deg, ${primary}, ${t === "light" ? "#1D4ED8" : "#2563EB"})`,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          border: `1px solid ${t === "light" ? "rgba(37,99,235,0.3)" : "rgba(59,130,246,0.4)"}`,
          boxShadow: `0 0 40px ${t === "light" ? "rgba(37,99,235,0.25)" : "rgba(59,130,246,0.3)"}`,
          color: "#fff",
        }}>
          <span style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 10, letterSpacing: "0.06em" }}>UNILINK</span>
          <span style={{ fontSize: 8, opacity: 0.7, marginTop: 2, fontWeight: 500 }}>One Campus</span>
        </div>
        <div style={{ position: "absolute", inset: 0, borderRadius: 20, animation: "ping-slow 3s ease-in-out infinite", background: `${primary}22` }} />
      </div>

      {/* Nodes */}
      {NET_NODES.map((n, i) => (
        <div key={n.id}
          className={i % 3 === 0 ? "animate-float" : i % 3 === 1 ? "animate-float-b" : "animate-float-c"}
          style={{ position: "absolute", left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-50%)", zIndex: 5, cursor: "pointer" }}
          onMouseEnter={() => setHov(n.id)} onMouseLeave={() => setHov(null)}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, transform: hov === n.id ? "scale(1.12)" : "scale(1)", transition: "transform 0.2s ease" }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: hov === n.id ? (t === "light" ? "rgba(37,99,235,0.12)" : "rgba(59,130,246,0.18)") : c.surface,
              border: `1px solid ${hov === n.id ? primary : c.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, backdropFilter: "blur(8px)",
              boxShadow: hov === n.id ? `0 4px 20px ${active}` : c.cardShadow,
              transition: "all 0.2s ease",
            }}>{n.icon}</div>
            <span style={{ fontSize: 10, fontWeight: 600, color: hov === n.id ? primary : c.textDim, whiteSpace: "nowrap", transition: "color 0.2s ease" }}>
              {n.label}
            </span>
          </div>
          {hov === n.id && (
            <div className="animate-fade-up" style={{
              position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)",
              background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12,
              padding: "10px 14px", minWidth: 140, zIndex: 20,
              boxShadow: c.cardShadow,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: c.text }}>{n.label}</div>
              <div style={{ fontSize: 10, color: c.textMuted, marginTop: 2 }}>Connected via UniLink</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}


// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { theme } = useTheme();
  const c = tok(theme);
  const router = useRouter();

  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 80, position: "relative", overflow: "hidden", background: c.bg }}>
      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 1px 1px, ${c.heroGrid} 1px, transparent 0)`, backgroundSize: "36px 36px", pointerEvents: "none" }} />
      {/* Glow */}
      <div style={{ position: "absolute", top: "15%", left: "55%", width: 600, height: 600, background: `radial-gradient(circle, ${c.primaryGlow} 0%, transparent 70%)`, pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 32px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        {/* Left */}
        <div>
          <div className="animate-fade-up" style={{ marginBottom: 24 }}>
            <Badge t={theme}>✦ Digital Campus Ecosystem</Badge>
          </div>
          <h1 className="animate-fade-up" style={{
            fontFamily: "Manrope", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.035em",
            fontSize: "clamp(42px, 5vw, 70px)", color: c.text, marginBottom: 24,
            animationDelay: "0.1s",
          }}>
            One Campus.<br /><span className="gradient-text">Everything</span><br />Connected.
          </h1>
          <p className="animate-fade-up" style={{ fontSize: 18, lineHeight: 1.72, color: c.textMuted, marginBottom: 40, maxWidth: 480, animationDelay: "0.25s" }}>
            Classes, announcements, events, clubs, opportunities, and campus communities — organized in one personalized digital campus.
          </p>
          <div className="animate-fade-up" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28, animationDelay: "0.38s" }}>
            <BtnPrimary large t={theme} onClick={() => router.push("/register")}>Get Started <Icon n="arrow" size={16} color="#fff" /></BtnPrimary>
            <BtnGhost large t={theme} onClick={() => router.push("/dashboard")}>Explore UniLink</BtnGhost>
          </div>
          <p className="animate-fade-up" style={{ fontSize: 13, color: c.textDim, animationDelay: "0.5s" }}>
            Built for students. Designed for connected campuses.
          </p>

          {/* Stats */}
          <div className="animate-fade-up" style={{ display: "flex", gap: 40, marginTop: 48, paddingTop: 32, borderTop: `1px solid ${c.border}`, animationDelay: "0.6s" }}>
            {[["50K+", "Students"], ["120+", "Universities"], ["98%", "Satisfaction"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 26, color: c.primary }}>{n}</div>
                <div style={{ fontSize: 13, color: c.textDim, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Network + floating cards */}
        <div style={{ position: "relative", minHeight: 500 }} className="hide-on-mobile">
          <NetworkViz t={theme} />
          <FloatCard t={theme} style={{ top: "2%", right: "0%" }} delay="0.5s">
            <div style={{ fontSize: 10, color: c.primary, fontWeight: 700, marginBottom: 4 }}>📢 Announcement</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.text }}>Database class postponed</div>
            <div style={{ fontSize: 11, color: c.textMuted, marginTop: 2 }}>CSE · Section 52-B</div>
          </FloatCard>
          <FloatCard t={theme} style={{ bottom: "10%", right: "-2%" }} delay="1s">
            <div style={{ fontSize: 10, color: c.primary, fontWeight: 700, marginBottom: 4 }}>🎪 Event</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.text }}>AI Workshop</div>
            <div style={{ fontSize: 11, color: c.textMuted, marginTop: 2 }}>Tomorrow · 3:00 PM</div>
          </FloatCard>
          <FloatCard t={theme} style={{ bottom: "22%", left: "-4%" }} delay="1.5s">
            <div style={{ fontSize: 10, color: c.primary, fontWeight: 700, marginBottom: 4 }}>💼 Opportunity</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.text }}>SWE Internship</div>
            <div style={{ fontSize: 11, color: c.textMuted, marginTop: 2 }}>Deadline: Sep 15</div>
          </FloatCard>
          <FloatCard t={theme} style={{ top: "28%", left: "-6%" }} delay="0.8s">
            <div style={{ fontSize: 10, color: c.primary, fontWeight: 700, marginBottom: 4 }}>📅 Class</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: c.text }}>Database Management</div>
            <div style={{ fontSize: 11, color: c.textMuted, marginTop: 2 }}>10:00 AM · Room 502</div>
          </FloatCard>
        </div>
      </div>
    </section>
  );
}

// ─── PROBLEM SECTION ──────────────────────────────────────────────────────────
function ProblemSection() {
  const { theme } = useTheme();
  const c = tok(theme);
  const { ref, vis } = useSR();
  const sources = [
    { icon: "💬", label: "Messaging Groups" },
    { icon: "📱", label: "Social Media" },
    { icon: "🌐", label: "University Website" },
    { icon: "📋", label: "Notice Boards" },
    { icon: "🎯", label: "Club Pages" },
    { icon: "📧", label: "Email" },
  ];

  return (
    <section ref={ref} className={`sr ${vis ? "visible" : ""}`} style={{ padding: "100px 0", background: c.surface2 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
        <Badge t={theme}>The Problem</Badge>
        <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.025em", color: c.text, margin: "20px 0 12px" }}>
          Campus information is <span className="gradient-text">everywhere.</span>
        </h2>
        <p style={{ fontSize: 17, color: c.textMuted, maxWidth: 520, margin: "0 auto 56px" }}>
          Students waste hours searching across scattered, disconnected sources just to stay informed.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14, marginBottom: 48 }}>
          {sources.map((s, i) => (
            <Card key={s.label} t={theme} style={{ padding: "24px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: c.textMuted }}>{s.label}</div>
            </Card>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <div style={{ height: 1, flex: 1, maxWidth: 180, background: `linear-gradient(to right, transparent, ${c.border})` }} />
          <div style={{
            background: `linear-gradient(135deg, ${c.primary}, ${c.primaryDark})`,
            color: "#fff", fontFamily: "Manrope", fontWeight: 700, fontSize: 16,
            padding: "12px 28px", borderRadius: 12,
            boxShadow: `0 4px 20px ${c.primaryGlow}`,
          }}>UniLink brings it together.</div>
          <div style={{ height: 1, flex: 1, maxWidth: 180, background: `linear-gradient(to left, transparent, ${c.border})` }} />
        </div>
      </div>
    </section>
  );
}

// ─── SOLUTION ─────────────────────────────────────────────────────────────────
function SolutionSection() {
  const { theme } = useTheme();
  const c = tok(theme);
  const { ref, vis } = useSR();
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Dashboard", "Announcements", "Classes", "Events", "Clubs"];

  type TabContent = { [key: string]: React.ReactElement };
  const content: TabContent = {
    Dashboard: (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { label: "Today's Classes", v: "3 Sessions", icon: "📚", col: c.primary },
          { label: "Assignments Due", v: "2 Pending", icon: "📝", col: "#F59E0B" },
          { label: "Announcements", v: "5 Unread", icon: "📢", col: "#3B82F6" },
          { label: "Upcoming Events", v: "3 This Week", icon: "🎪", col: "#8B5CF6" },
        ].map((x) => (
          <div key={x.label} style={{ background: c.surface2, borderRadius: 12, padding: "16px", border: `1px solid ${c.border}` }}>
            <div style={{ fontSize: 20, marginBottom: 8 }}>{x.icon}</div>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 18, color: x.col }}>{x.v}</div>
            <div style={{ fontSize: 11, color: c.textDim, marginTop: 2 }}>{x.label}</div>
          </div>
        ))}
      </div>
    ),
    Announcements: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { t: "Midterm Schedule Updated", d: "CSE → Batch 52 → Section B", time: "2h ago" },
          { t: "AI Workshop Registration Open", d: "All Students", time: "5h ago" },
          { t: "Database class postponed", d: "CSE · Section 52-B", time: "Yesterday" },
        ].map((a) => (
          <div key={a.t} style={{ display: "flex", gap: 12, padding: "12px 14px", background: c.surface2, borderRadius: 12, border: `1px solid ${c.border}` }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.primary, marginTop: 5, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{a.t}</div>
              <div style={{ fontSize: 11, color: c.textDim, marginTop: 2 }}>{a.d}</div>
            </div>
            <div style={{ fontSize: 11, color: c.textDim, flexShrink: 0 }}>{a.time}</div>
          </div>
        ))}
      </div>
    ),
    Classes: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { time: "9:00 AM", sub: "Data Structures", room: "Room 301", prof: "Prof. Hasan" },
          { time: "11:00 AM", sub: "Database Management", room: "Room 502", prof: "Prof. Rahman" },
          { time: "2:00 PM", sub: "Software Engineering", room: "Lab 105", prof: "Prof. Islam" },
        ].map((x) => (
          <div key={x.sub} style={{ display: "flex", gap: 14, padding: "12px 14px", background: c.surface2, borderRadius: 12, border: `1px solid ${c.border}`, alignItems: "center" }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.primary, width: 68, flexShrink: 0 }}>{x.time}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{x.sub}</div>
              <div style={{ fontSize: 11, color: c.textDim }}>{x.room} · {x.prof}</div>
            </div>
          </div>
        ))}
      </div>
    ),
    Events: (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { t: "AI Hackathon", d: "Aug 28", type: "Hackathon", col: "#8B5CF6" },
          { t: "Career Fair 2024", d: "Sep 5", type: "Career", col: "#2563EB" },
          { t: "Cultural Fest", d: "Sep 12", type: "Cultural", col: "#EC4899" },
          { t: "Tech Summit", d: "Sep 20", type: "Seminar", col: "#10B981" },
        ].map((x) => (
          <div key={x.t} style={{ background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 12, padding: "14px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: x.col, marginBottom: 6 }}>{x.type}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 4 }}>{x.t}</div>
            <div style={{ fontSize: 11, color: c.textDim }}>{x.d}</div>
          </div>
        ))}
      </div>
    ),
    Clubs: (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        {[
          { name: "Programming", e: "💻", m: 312 },
          { name: "Robotics", e: "🤖", m: 84 },
          { name: "Photography", e: "📷", m: 156 },
          { name: "Debate", e: "🗣️", m: 94 },
          { name: "Cultural", e: "🎭", m: 220 },
          { name: "Sports", e: "⚽", m: 408 },
        ].map((x) => (
          <div key={x.name} style={{ background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 12, padding: "14px", textAlign: "center" }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{x.e}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: c.text }}>{x.name}</div>
            <div style={{ fontSize: 10, color: c.textDim }}>{x.m} members</div>
          </div>
        ))}
      </div>
    ),
  };

  return (
    <section ref={ref} className={`sr ${vis ? "visible" : ""}`} style={{ padding: "100px 0", background: c.bg }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1.25fr", gap: 72, alignItems: "center" }}>
        <div>
          <Badge t={theme}>The Solution</Badge>
          <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: "clamp(26px, 3.5vw, 46px)", letterSpacing: "-0.025em", color: c.text, margin: "20px 0 16px" }}>
            Your campus, finally <span className="gradient-text">in one place.</span>
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.72, color: c.textMuted, marginBottom: 32 }}>
            Everything your campus does — classes, announcements, events, clubs, materials — organized into one intelligent, personalized platform.
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {["Real-time announcements targeted to you", "Smart academic calendar and routine", "Discover clubs, events, and opportunities", "AI-powered campus assistant"].map((f) => (
              <li key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ width: 20, height: 20, borderRadius: 6, background: `rgba(37,99,235,0.1)`, border: `1px solid rgba(37,99,235,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <Icon n="check" size={11} color={c.primary} />
                </div>
                <span style={{ fontSize: 14, color: c.textMuted, lineHeight: 1.5 }}>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* App preview */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, overflow: "hidden", boxShadow: `0 24px 80px rgba(15,23,42,0.1)` }}>
          <div style={{ background: c.surface2, padding: "12px 16px", borderBottom: `1px solid ${c.border}`, display: "flex", alignItems: "center", gap: 8 }}>
            {["#FF5F56", "#FFBD2E", "#27C93F"].map((col) => <div key={col} style={{ width: 10, height: 10, borderRadius: "50%", background: col }} />)}
            <div style={{ flex: 1, background: c.surface, borderRadius: 6, padding: "3px 12px", fontSize: 11, color: c.textDim, textAlign: "center" }}>app.unilink.io/dashboard</div>
          </div>
          <div style={{ padding: "14px 18px", borderBottom: `1px solid ${c.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text }}>Good morning, Ovi 👋</span>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: c.surface2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon n="bell" size={13} color={c.primary} />
              </div>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: c.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", fontFamily: "Manrope" }}>O</div>
            </div>
          </div>
          <div style={{ padding: "10px 16px 0", display: "flex", gap: 4, overflowX: "auto" }}>
            {tabs.map((t, i) => (
              <button key={t} onClick={() => setActiveTab(i)} style={{
                padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer",
                background: activeTab === i ? c.primary : "transparent",
                color: activeTab === i ? "#fff" : c.textDim,
                border: "none", transition: "all 0.18s ease", whiteSpace: "nowrap",
              }}>{t}</button>
            ))}
          </div>
          <div style={{ padding: "16px 18px 18px" }}>
            {content[tabs[activeTab]]}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const { theme } = useTheme();
  const c = tok(theme);
  const { ref, vis } = useSR();

  const steps = [
    { n: "01", title: "Join", desc: "Create your university account in seconds.", icon: "👤" },
    { n: "02", title: "Personalize", desc: "Select department, program, batch, section, and interests.", icon: "⚙️" },
    { n: "03", title: "Discover", desc: "Find relevant classes, announcements, events, and clubs.", icon: "🔍" },
    { n: "04", title: "Connect", desc: "Participate in your campus community.", icon: "🔗" },
  ];

  return (
    <section ref={ref} className={`sr ${vis ? "visible" : ""}`} style={{ padding: "100px 0", background: c.surface2 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <Badge t={theme}>How It Works</Badge>
          <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: "clamp(26px, 3.5vw, 46px)", letterSpacing: "-0.025em", color: c.text, margin: "20px 0 0" }}>
            Up and running in minutes
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, position: "relative" }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{ position: "relative" }}>
              <Card t={theme} style={{ padding: "32px 26px", height: "100%" }}>
                <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 11, color: c.primary, letterSpacing: "0.1em", marginBottom: 16 }}>{s.n}</div>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 20, color: c.text, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: c.textMuted }}>{s.desc}</p>
              </Card>
              {i < steps.length - 1 && (
                <div style={{ position: "absolute", right: -14, top: "48%", zIndex: 5 }} className="hide-on-mobile">
                  <Icon n="arrow" size={16} color={c.border} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ACADEMIC ECOSYSTEM ───────────────────────────────────────────────────────
function AcademicSection() {
  const { theme } = useTheme();
  const c = tok(theme);
  const { ref, vis } = useSR();

  return (
    <section ref={ref} className={`sr ${vis ? "visible" : ""}`} style={{ padding: "100px 0", background: c.bg }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <Badge t={theme}>Academic Ecosystem</Badge>
          <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: "clamp(26px, 3.5vw, 46px)", letterSpacing: "-0.025em", color: c.text, margin: "20px 0 12px" }}>
            Your academic life, <span className="gradient-text">organized.</span>
          </h2>
          <p style={{ fontSize: 16, color: c.textMuted, maxWidth: 500, margin: "0 auto" }}>
            From class schedules to exam deadlines — everything in one structured view.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {[
            { icon: "📅", title: "Weekly Routine", desc: "Your full class schedule, always updated.", col: c.primary },
            { icon: "📝", title: "Assignments", desc: "Track deadlines and submission status.", col: "#F59E0B" },
            { icon: "📖", title: "Course Materials", desc: "Lecture slides, notes, and resources.", col: "#3B82F6" },
            { icon: "📊", title: "Exam Schedule", desc: "Midterms, finals, and quiz alerts.", col: "#8B5CF6" },
            { icon: "⏰", title: "Deadlines", desc: "Never miss an important deadline.", col: "#EC4899" },
          ].map((f) => (
            <Card key={f.title} t={theme} style={{ padding: "28px 22px" }}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 16, color: c.text, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: c.textMuted, lineHeight: 1.6 }}>{f.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ANNOUNCEMENTS ────────────────────────────────────────────────────────────
function AnnouncementSection() {
  const { theme } = useTheme();
  const c = tok(theme);
  const { ref, vis } = useSR();
  const levels = ["University", "Faculty", "Department", "Program", "Batch", "Section"];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!vis) return;
    const id = setInterval(() => setActive((l) => (l + 1) % levels.length), 1100);
    return () => clearInterval(id);
  }, [vis]);

  return (
    <section ref={ref} className={`sr ${vis ? "visible" : ""}`} style={{ padding: "100px 0", background: c.surface2 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
        <div>
          <Badge t={theme}>Announcements</Badge>
          <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: "clamp(24px, 3.5vw, 44px)", letterSpacing: "-0.025em", color: c.text, margin: "20px 0 16px" }}>
            The right information.<br /><span className="gradient-text">To the right students.</span>
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.72, color: c.textMuted }}>
            UniLink&apos;s targeting system ensures every announcement reaches exactly the students it&apos;s meant for — no noise, no missed updates.
          </p>
        </div>

        <Card t={theme} style={{ padding: "32px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: c.textDim, marginBottom: 14 }}>Targeting hierarchy</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
            {levels.map((l, i) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{
                  padding: "5px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                  background: i <= active ? `rgba(37,99,235,0.1)` : c.surface2,
                  color: i <= active ? c.primary : c.textDim,
                  border: `1px solid ${i <= active ? `rgba(37,99,235,0.2)` : c.border}`,
                  transition: "all 0.4s ease",
                }}>{l}</div>
                {i < levels.length - 1 && <span style={{ color: c.border, fontSize: 12 }}>→</span>}
              </div>
            ))}
          </div>
          <div style={{ background: theme === "light" ? "#EFF6FF" : "rgba(37,99,235,0.08)", borderLeft: `3px solid ${c.primary}`, borderRadius: "0 12px 12px 0", padding: "16px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: c.primary, marginBottom: 6 }}>📢 Live Announcement</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 6 }}>Midterm schedule updated</div>
            <div style={{ fontSize: 12, color: c.textMuted, marginBottom: 10 }}>CSE → Batch 52 → Section B only</div>
            <div style={{ display: "flex", gap: 6 }}>
              {["Academic", "Targeted"].map((t) => (
                <span key={t} style={{ padding: "3px 10px", borderRadius: 999, fontSize: 10, fontWeight: 600, background: c.badge.bg, color: c.badge.text, border: `1px solid ${c.badge.border}` }}>{t}</span>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

// ─── CLUBS ────────────────────────────────────────────────────────────────────
function ClubsSection() {
  const { theme } = useTheme();
  const c = tok(theme);
  const { ref, vis } = useSR();

  const clubs = [
    { e: "💻", name: "Programming Club", m: 312, status: "Active" },
    { e: "🤖", name: "Robotics Society", m: 84, status: "Recruiting" },
    { e: "🎭", name: "Cultural Club", m: 220, status: "Active" },
    { e: "⚽", name: "Sports Federation", m: 408, status: "Active" },
    { e: "📷", name: "Photography Club", m: 156, status: "Recruiting" },
    { e: "🗣️", name: "Debate Society", m: 94, status: "Active" },
  ];

  return (
    <section ref={ref} className={`sr ${vis ? "visible" : ""}`} style={{ padding: "100px 0", background: c.bg }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <Badge t={theme}>Clubs & Communities</Badge>
          <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: "clamp(26px, 3.5vw, 46px)", letterSpacing: "-0.025em", color: c.text, margin: "20px 0 12px" }}>
            Find your <span className="gradient-text">people.</span>
          </h2>
          <p style={{ fontSize: 16, color: c.textMuted }}>Discover → Join → Participate</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {clubs.map((cl) => (
            <Card key={cl.name} t={theme} style={{ padding: "28px 22px" }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{cl.e}</div>
              <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text, marginBottom: 6 }}>{cl.name}</h3>
              <div style={{ fontSize: 12, color: c.textDim, marginBottom: 14 }}>{cl.m} members</div>
              <span style={{
                padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600,
                background: cl.status === "Recruiting" ? "rgba(245,158,11,0.1)" : "rgba(37,99,235,0.08)",
                color: cl.status === "Recruiting" ? "#F59E0B" : c.primary,
                border: `1px solid ${cl.status === "Recruiting" ? "rgba(245,158,11,0.2)" : "rgba(37,99,235,0.15)"}`,
              }}>{cl.status}</span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EVENTS ───────────────────────────────────────────────────────────────────
function EventsSection() {
  const { theme } = useTheme();
  const c = tok(theme);
  const { ref, vis } = useSR();
  const cats = ["All", "Seminar", "Workshop", "Hackathon", "Competition", "Sports", "Cultural", "Career"];
  const [cat, setCat] = useState("All");

  const events = [
    { title: "AI Hackathon 2024", org: "BASIS", date: "Aug 28", time: "9:00 AM", type: "Hackathon", col: "#8B5CF6" },
    { title: "Career Fair 2024", org: "University Career Center", date: "Sep 5", time: "10:00 AM", type: "Career", col: "#2563EB" },
    { title: "Cultural Fest", org: "Cultural Club", date: "Sep 12", time: "3:00 PM", type: "Cultural", col: "#EC4899" },
    { title: "Machine Learning Workshop", org: "Programming Club", date: "Sep 15", time: "2:00 PM", type: "Workshop", col: "#F59E0B" },
    { title: "Debate Championship", org: "Debate Society", date: "Sep 20", time: "11:00 AM", type: "Competition", col: "#10B981" },
    { title: "Tech Summit 2024", org: "CSE Department", date: "Sep 25", time: "9:00 AM", type: "Seminar", col: "#3B82F6" },
  ];

  const filtered = cat === "All" ? events : events.filter((e) => e.type === cat);

  return (
    <section ref={ref} className={`sr ${vis ? "visible" : ""}`} style={{ padding: "100px 0", background: c.surface2 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Badge t={theme}>Events</Badge>
          <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: "clamp(26px, 3.5vw, 46px)", letterSpacing: "-0.025em", color: c.text, margin: "20px 0 12px" }}>
            Never miss what&apos;s <span className="gradient-text">happening.</span>
          </h2>
          <p style={{ fontSize: 16, color: c.textMuted }}>Every event on campus, in one place.</p>
        </div>

        {/* Category filters */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
          {cats.map((ct) => (
            <button key={ct} onClick={() => setCat(ct)} style={{
              padding: "7px 16px", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer",
              background: cat === ct ? c.primary : c.surface,
              color: cat === ct ? "#fff" : c.textMuted,
              border: `1px solid ${cat === ct ? c.primary : c.border}`,
              transition: "all 0.18s ease",
            }}>{ct}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {filtered.map((ev) => (
            <Card key={ev.title} t={theme} style={{ padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <span style={{ padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, background: `${ev.col}18`, color: ev.col, border: `1px solid ${ev.col}30` }}>{ev.type}</span>
              </div>
              <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 16, color: c.text, marginBottom: 6 }}>{ev.title}</h3>
              <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 4 }}>{ev.org}</p>
              <p style={{ fontSize: 12, color: c.textDim, marginBottom: 18 }}>{ev.date} · {ev.time}</p>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ flex: 1, padding: "8px", borderRadius: 9, background: c.primary, color: "#fff", fontWeight: 600, fontSize: 12, border: "none", cursor: "pointer" }}>Register</button>
                <button style={{ padding: "8px 12px", borderRadius: 9, background: c.surface2, color: c.textMuted, fontWeight: 500, fontSize: 12, border: `1px solid ${c.border}`, cursor: "pointer" }}>Save</button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── OPPORTUNITIES ────────────────────────────────────────────────────────────
function OpportunitiesSection() {
  const { theme } = useTheme();
  const c = tok(theme);
  const { ref, vis } = useSR();

  const opps = [
    { type: "Internship", title: "Software Engineering Intern", org: "TechCorp Bangladesh", deadline: "Sep 15", match: 98 },
    { type: "Competition", title: "AI Hackathon 2024", org: "BASIS", deadline: "Aug 28", match: 94 },
    { type: "Scholarship", title: "Tech Scholarship Program", org: "ICT Ministry", deadline: "Sep 1", match: 87 },
  ];

  return (
    <section ref={ref} className={`sr ${vis ? "visible" : ""}`} style={{ padding: "100px 0", background: c.bg }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <Badge t={theme}>Opportunities</Badge>
          <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: "clamp(26px, 3.5vw, 46px)", letterSpacing: "-0.025em", color: c.text, margin: "20px 0 12px" }}>
            Opportunities that <span className="gradient-text">match you.</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginBottom: 40 }}>
          {opps.map((o) => (
            <Card key={o.title} t={theme} style={{ padding: "26px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600, background: c.badge.bg, color: c.badge.text, border: `1px solid ${c.badge.border}` }}>{o.type}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#10B981", background: "rgba(16,185,129,0.08)", padding: "3px 8px", borderRadius: 6 }}>{o.match}% match</span>
              </div>
              <h3 style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 16, color: c.text, marginBottom: 6 }}>{o.title}</h3>
              <div style={{ fontSize: 13, color: c.textMuted, marginBottom: 4 }}>{o.org}</div>
              <div style={{ fontSize: 12, color: c.textDim, marginBottom: 18 }}>Deadline: {o.deadline}</div>
              <BtnGhost t={theme}>View Details</BtnGhost>
            </Card>
          ))}
        </div>

        <Card t={theme} style={{ padding: "28px 32px" }}>
          <div style={{ fontSize: 14, color: c.primary, fontWeight: 600, marginBottom: 12 }}>✨ Recommended for you — because you&apos;re interested in Programming</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["AI Hackathon", "SWE Internship", "Competitive Programming Contest", "Google Developer Program"].map((r) => (
              <span key={r} style={{
                padding: "7px 16px", background: c.surface2, border: `1px solid ${c.border}`,
                borderRadius: 9, fontSize: 13, color: c.textMuted, cursor: "pointer",
                transition: "all 0.18s ease",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = c.primary; (e.currentTarget as HTMLElement).style.color = c.primary; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = c.border; (e.currentTarget as HTMLElement).style.color = c.textMuted; }}
              >{r} →</span>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

// ─── CR ECOSYSTEM ─────────────────────────────────────────────────────────────
function CRSection() {
  const { theme } = useTheme();
  const c = tok(theme);
  const { ref, vis } = useSR();

  const steps = [
    { icon: "📁", label: "CR uploads material" },
    { icon: "🔔", label: "Students receive notification" },
    { icon: "✅", label: "Material appears in the course" },
  ];

  return (
    <section ref={ref} className={`sr ${vis ? "visible" : ""}`} style={{ padding: "100px 0", background: c.surface2 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
        <div>
          <Badge t={theme}>CR Ecosystem</Badge>
          <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: "clamp(24px, 3.5vw, 44px)", letterSpacing: "-0.025em", color: c.text, margin: "20px 0 16px" }}>
            Every section has <span className="gradient-text">a voice.</span>
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.72, color: c.textMuted, marginBottom: 32 }}>
            Class Representatives manage their section&apos;s entire communication — announcements, materials, schedules — from a dedicated dashboard.
          </p>
          <div>
            {steps.map((s, i) => (
              <div key={s.label}>
                <div style={{ display: "flex", gap: 16, alignItems: "center", padding: "14px 0" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `rgba(37,99,235,0.08)`, border: `1px solid rgba(37,99,235,0.15)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{s.icon}</div>
                  <span style={{ fontSize: 15, fontWeight: 600, color: c.text }}>{s.label}</span>
                </div>
                {i < steps.length - 1 && <div style={{ width: 1, height: 14, background: c.border, marginLeft: 20 }} />}
              </div>
            ))}
          </div>
        </div>

        <Card t={theme} style={{ padding: "28px" }}>
          <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 20 }}>CR Dashboard — Section 52-B</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            {[
              { icon: "📢", label: "Announcements", val: "3 Active" },
              { icon: "📅", label: "Class Schedule", val: "Today: 4" },
              { icon: "📝", label: "Assignments", val: "2 Due" },
              { icon: "📊", label: "Exam Schedule", val: "Next: Aug 30" },
            ].map((x) => (
              <div key={x.label} style={{ background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 12, padding: "14px" }}>
                <div style={{ fontSize: 18, marginBottom: 6 }}>{x.icon}</div>
                <div style={{ fontFamily: "Manrope", fontSize: 14, fontWeight: 700, color: c.text }}>{x.val}</div>
                <div style={{ fontSize: 11, color: c.textDim }}>{x.label}</div>
              </div>
            ))}
          </div>
          <BtnPrimary t={theme}>Upload Course Material</BtnPrimary>
        </Card>
      </div>
    </section>
  );
}

// ─── CAMPUS AI ────────────────────────────────────────────────────────────────
function AISection() {
  const { theme } = useTheme();
  const c = tok(theme);
  const { ref, vis } = useSR();
  const [msgs, setMsgs] = useState([
    { from: "ai", text: "Hi! I'm your UniLink AI assistant. Ask me anything about campus." },
  ]);
  const [step, setStep] = useState(0);

  const convos = [
    { q: "What do I have tomorrow?", a: "You have 3 classes, 1 assignment deadline, and 2 campus events tomorrow 📅" },
    { q: "Show me programming events this week.", a: "Found 3 events: AI Workshop (Aug 27), Hackathon (Aug 28), Code Sprint (Aug 30) 🎯" },
  ];

  useEffect(() => {
    if (!vis || step >= convos.length * 2) return;
    const delay = step === 0 ? 1600 : 2400;
    const id = setTimeout(() => {
      const pair = convos[Math.floor(step / 2)];
      setMsgs((m) => [...m, step % 2 === 0 ? { from: "user", text: pair.q } : { from: "ai", text: pair.a }]);
      setStep((s) => s + 1);
    }, delay);
    return () => clearTimeout(id);
  }, [vis, step]);

  return (
    <section ref={ref} className={`sr ${vis ? "visible" : ""}`} style={{ padding: "100px 0", background: c.bg }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
        {/* Chat UI */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, overflow: "hidden", boxShadow: c.aiGlow }}>
          <div style={{ background: c.surface2, padding: "16px 20px", borderBottom: `1px solid ${c.border}`, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${c.primary}, ${c.sky})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>✨</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: c.text, fontFamily: "Manrope" }}>UniLink AI</div>
              <div style={{ fontSize: 11, color: c.primary }}>Your campus assistant</div>
            </div>
            <div style={{ marginLeft: "auto", width: 8, height: 8, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px rgba(16,185,129,0.6)" }} />
          </div>
          <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 12, minHeight: 260 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "80%", padding: "10px 14px", borderRadius: 12, fontSize: 13, lineHeight: 1.55,
                  background: m.from === "user" ? c.primary : c.surface2,
                  color: m.from === "user" ? "#fff" : c.text,
                  border: m.from === "ai" ? `1px solid ${c.border}` : "none",
                  borderBottomRightRadius: m.from === "user" ? 4 : 12,
                  borderBottomLeftRadius: m.from === "ai" ? 4 : 12,
                }}>{m.text}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "12px 16px", borderTop: `1px solid ${c.border}`, display: "flex", gap: 10 }}>
            <div style={{ flex: 1, background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: c.textDim }}>
              Ask anything about campus...
            </div>
            <BtnPrimary t={theme}><Icon n="arrow" size={14} color="#fff" /></BtnPrimary>
          </div>
        </div>

        <div>
          <Badge t={theme}>Campus AI</Badge>
          <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: "clamp(24px, 3.5vw, 44px)", letterSpacing: "-0.025em", color: c.text, margin: "20px 0 16px" }}>
            Meet your <span className="gradient-text">campus assistant.</span>
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.72, color: c.textMuted, marginBottom: 32 }}>
            Ask about your schedule, upcoming deadlines, events near you, or find opportunities matched to your profile.
          </p>
          {["Schedule-aware — knows your classes and deadlines", "Event discovery — surfaces what matters to you", "Opportunity matching — aligned to your interests"].map((f) => (
            <div key={f} style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "flex-start" }}>
              <Icon n="sparkle" size={16} color={c.primary} />
              <span style={{ fontSize: 14, color: c.textMuted }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PERSONALIZATION ──────────────────────────────────────────────────────────
function PersonalizationSection() {
  const { theme } = useTheme();
  const c = tok(theme);
  const { ref, vis } = useSR();

  const items = [
    { icon: "📚", label: "Today's Classes", val: "3 Sessions", col: c.primary },
    { icon: "📝", label: "Upcoming Assignments", val: "2 Due", col: "#F59E0B" },
    { icon: "🎪", label: "Recommended Events", val: "4 This Week", col: "#8B5CF6" },
    { icon: "💼", label: "Recommended Opportunities", val: "3 New", col: "#10B981" },
    { icon: "📢", label: "New Announcements", val: "5 Unread", col: "#3B82F6" },
    { icon: "📖", label: "Recent Materials", val: "2 Added", col: "#EC4899" },
  ];

  const tags = ["CSE", "Batch 52", "Section B", "Programming", "Robotics"];

  return (
    <section ref={ref} className={`sr ${vis ? "visible" : ""}`} style={{ padding: "100px 0", background: c.surface2 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 72, alignItems: "center" }}>
        <div>
          <Badge t={theme}>Personalization</Badge>
          <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: "clamp(24px, 3.5vw, 44px)", letterSpacing: "-0.025em", color: c.text, margin: "20px 0 16px" }}>
            UniLink knows what <span className="gradient-text">matters to you.</span>
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.72, color: c.textMuted, marginBottom: 28 }}>
            Every student gets a different experience based on their university, department, program, section, interests, and clubs.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {tags.map((t) => (
              <span key={t} style={{ padding: "5px 14px", borderRadius: 999, fontSize: 12, fontWeight: 600, background: c.badge.bg, color: c.badge.text, border: `1px solid ${c.badge.border}` }}>{t}</span>
            ))}
          </div>
        </div>

        <Card t={theme} style={{ padding: "24px" }}>
          <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 16, color: c.text, marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${c.border}` }}>
            Good morning, Ovi 👋
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {items.map((x) => (
              <div key={x.label} style={{ background: c.surface2, border: `1px solid ${c.border}`, borderRadius: 12, padding: "14px" }}>
                <div style={{ fontSize: 20, marginBottom: 8 }}>{x.icon}</div>
                <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: x.col }}>{x.val}</div>
                <div style={{ fontSize: 11, color: c.textDim, marginTop: 2 }}>{x.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

// ─── ROLE-BASED ───────────────────────────────────────────────────────────────
const ROLES: Record<string, string[]> = {
  Student: ["My Routine & Classes", "Announcements", "Event Discovery", "Opportunities", "My Clubs"],
  CR: ["Section Announcements", "Class Schedule", "Materials Upload", "Exam Schedule", "Section Events"],
  Teacher: ["My Courses", "Assignments", "Exams", "Student Materials", "Course Analytics"],
  Club: ["Club Events", "Member List", "Recruitment", "Announcements", "Club Analytics"],
  Department: ["Student Overview", "Teacher Management", "Courses", "Batch Announcements", "Reports"],
  University: ["Faculty Management", "Department Overview", "Analytics", "Policy Announcements", "System Settings"],
};

function RoleSection() {
  const { theme } = useTheme();
  const c = tok(theme);
  const { ref, vis } = useSR();
  const [active, setActive] = useState("Student");

  return (
    <section ref={ref} className={`sr ${vis ? "visible" : ""}`} style={{ padding: "100px 0", background: c.bg }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <Badge t={theme}>Role-Based Platform</Badge>
          <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: "clamp(26px, 3.5vw, 46px)", letterSpacing: "-0.025em", color: c.text, margin: "20px 0" }}>
            Built for <span className="gradient-text">every campus role.</span>
          </h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
            {Object.keys(ROLES).map((r) => (
              <button key={r} onClick={() => setActive(r)} style={{
                padding: "8px 18px", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer",
                background: active === r ? c.primary : c.surface,
                color: active === r ? "#fff" : c.textMuted,
                border: `1px solid ${active === r ? c.primary : c.border}`,
                transition: "all 0.18s ease",
              }}>{r}</button>
            ))}
          </div>
        </div>

        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <Card t={theme} style={{ overflow: "hidden" }}>
            <div style={{ background: c.surface2, padding: "16px 20px", borderBottom: `1px solid ${c.border}` }}>
              <span style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text }}>{active} Dashboard</span>
            </div>
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 10 }}>
              {ROLES[active].map((item, i) => (
                <div key={item} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "12px 16px", background: c.surface2, borderRadius: 12, border: `1px solid ${c.border}`,
                  animation: `fade-up 0.3s ease ${i * 0.07}s both`,
                }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: `rgba(37,99,235,0.08)`, border: `1px solid rgba(37,99,235,0.15)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon n="check" size={12} color={c.primary} />
                  </div>
                  <span style={{ fontSize: 14, color: c.text }}>{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

// ─── FINAL CTA ────────────────────────────────────────────────────────────────
function CTASection({ onLogin }: { onLogin?: () => void }) {
  const { theme } = useTheme();
  const c = tok(theme);
  const { ref, vis } = useSR();

  return (
    <section ref={ref} className={`sr ${vis ? "visible" : ""}`} style={{ padding: "120px 32px", position: "relative", overflow: "hidden", background: c.surface2 }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 350, background: `radial-gradient(ellipse, ${c.primaryGlow} 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 1px 1px, ${c.heroGrid} 1px, transparent 0)`, backgroundSize: "32px 32px", pointerEvents: "none" }} />

      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <Badge t={theme}>Get Started</Badge>
        <h2 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: "clamp(34px, 5vw, 60px)", letterSpacing: "-0.03em", color: c.text, margin: "24px 0 14px" }}>
          Your campus is already <span className="gradient-text">connected.</span>
        </h2>
        <p style={{ fontSize: 19, color: c.textMuted, marginBottom: 44 }}>Now give it a place to connect.</p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={onLogin} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: c.primary, color: "#fff", fontFamily: "Inter", fontWeight: 600, fontSize: 16, padding: "14px 28px", borderRadius: 10, border: "none", cursor: "pointer" }}>Get Started with UniLink <Icon n="arrow" size={18} color="#fff" /></button>
          <BtnGhost large t={theme}>Explore the Platform</BtnGhost>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const { theme } = useTheme();
  const c = tok(theme);

  const cols = [
    { heading: "Product", links: ["Features", "Dashboard", "Events", "Clubs", "Opportunities", "Campus AI"] },
    { heading: "Platform", links: ["For Students", "For Teachers", "For CRs", "For Clubs", "For Universities"] },
    { heading: "Company", links: ["About", "Contact", "Privacy", "Terms"] },
  ];

  return (
    <footer style={{ background: theme === "light" ? "#F1F5F9" : "#080D1A", borderTop: `1px solid ${c.border}`, padding: "64px 32px 36px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: `linear-gradient(135deg, ${c.primary}, ${c.primaryDark})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 14, color: "#fff", fontWeight: 800, fontFamily: "Manrope" }}>U</span>
              </div>
              <span style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 18, color: c.text }}>UniLink</span>
            </div>
            <p style={{ fontSize: 14, color: c.textMuted, lineHeight: 1.7, maxWidth: 260, marginBottom: 22 }}>
              One Campus. One Network. The digital ecosystem for modern universities.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {["twitter", "github", "linkedin"].map((s) => (
                <div key={s}
                  style={{ width: 34, height: 34, borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "border-color 0.18s ease" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = c.primary)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = c.border)}
                >
                  <Icon n={s} size={14} color={c.textMuted} />
                </div>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.heading}>
              <div style={{ fontSize: 12, fontWeight: 700, color: c.textDim, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 16 }}>{col.heading}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((l) => (
                  <a key={l} style={{ fontSize: 14, color: c.textMuted, cursor: "pointer", textDecoration: "none", transition: "color 0.18s ease" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = c.text)}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = c.textMuted)}
                  >{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 13, color: c.textDim }}>© 2024 UniLink — One Campus. One Network.</span>
          <span style={{ fontSize: 13, color: c.textDim }}>Made for students everywhere</span>
        </div>
      </div>
    </footer>
  );
}


export default function LandingPage() {
  const { theme } = useTheme();
  const c = tok(theme);
  const router = useRouter();

  return (
    <div style={{ background: c.bg, color: c.text, minHeight: "100vh", transition: "background 0.3s ease, color 0.3s ease" }}>
      <LandingNavbar onLogin={() => { router.push("/login"); }} />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <AcademicSection />
      <AnnouncementSection />
      <ClubsSection />
      <EventsSection />
      <OpportunitiesSection />
      <LostFoundSection />
      <CRSection />
      <AISection />
      <PersonalizationSection />
      <RoleSection />
      <CTASection onLogin={() => { router.push("/login"); }} />
      <Footer />
    </div>
  );
}
