const fs = require('fs');
const content = fs.readFileSync('src/app/page.tsx', 'utf-8');
const lines = content.split(/\r?\n/);

const imports = `
"use client";
import { useState, useEffect } from "react";
import LostFoundSection from "../LostFound";
import { ThemeCtx, Theme, tok, useTheme } from "@/components/ui/Theme";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { BtnPrimary, BtnGhost } from "@/components/ui/Button";
import { Card, FloatCard } from "@/components/ui/Card";
import { useSR } from "@/hooks/useSR";
import { LandingNavbar } from "@/components/layout/LandingNavbar";
`.trim();

const newApp = `
export default function LandingPage() {
  const { theme } = useTheme();
  const c = tok(theme);

  return (
    <div style={{ background: c.bg, color: c.text, minHeight: "100vh", transition: "background 0.3s ease, color 0.3s ease" }}>
      <LandingNavbar onLogin={() => { window.location.href = "/dashboard"; }} />
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
      <CTASection onLogin={() => { window.location.href = "/dashboard"; }} />
      <Footer />
    </div>
  );
}
`.trim();

const part1 = lines.slice(180, 267).join('\n');
const part2 = lines.slice(358, 1291).join('\n');

const res = imports + '\n\n' + part1 + '\n\n' + part2 + '\n\n' + newApp + '\n';
fs.writeFileSync('src/app/page.tsx', res);
console.log('Refactored page.tsx');
