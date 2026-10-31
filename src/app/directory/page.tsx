"use client";
import { useState, useContext } from "react";
import { ThemeCtx } from "@/components/ui/Theme";

type Theme = "light" | "dark";
const useTheme = () => useContext(ThemeCtx);

const LIGHT = {
  bg: "#F8FAFC", surface: "#FFFFFF", surface2: "#F1F5F9", surface3: "#E2E8F0",
  primary: "#2563EB", text: "#0F172A", textMuted: "#64748B", textDim: "#94A3B8",
  border: "#E2E8F0", cardShadow: "0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)",
};
const DARK = {
  bg: "#080D1A", surface: "#0F172A", surface2: "#172033", surface3: "#1E293B",
  primary: "#3B82F6", text: "#F8FAFC", textMuted: "#94A3B8", textDim: "#475569",
  border: "#1E293B", cardShadow: "0 1px 4px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.18)",
};
const tok = (t: Theme) => t === "light" ? LIGHT : DARK;

const P: Record<string, string[]> = {
  search:   ["M21 21l-4.35-4.35M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0z"],
  arrowL:   ["M19 12H5M12 19l-7-7 7-7"],
  chevR:    ["M9 18l6-6-6-6"],
  check:    ["M20 6L9 17l-5-5"],
  x:        ["M18 6L6 18M6 6l12 12"],
  edit:     ["M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7","M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"],
  shield:   ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"],
  share:    ["M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8","M16 6l-4-4-4 4","M12 2v13"],
  users:    ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2","M23 21v-2a4 4 0 0 0-3-3.87","M16 3.13a4 4 0 0 1 0 7.75","M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"],
  github:   ["M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"],
  link:     ["M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71","M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"],
  award:    ["M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z","M8.21 13.89L7 23l5-3 5 3-1.21-9.12"],
  flag:     ["M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z","M4 22v-7"],
  more:     ["M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z","M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z","M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"],
  book:     ["M4 19.5A2.5 2.5 0 0 1 6.5 17H20","M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"],
  lock:     ["M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z","M7 11V7a5 5 0 0 1 10 0v4"],
  upload:   ["M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4","M17 8l-5-5-5 5","M12 3v12"],
};
function Ic({ n, size = 16, color = "currentColor" }: { n: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      {(P[n] ?? []).map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

// ─── TYPES ───────────────────────────────────────────────────────────────────────
type ConnectState = "none" | "sent" | "connected" | "declined";
type DirTab = "All Students" | "My Batch" | "My Section" | "My Department" | "My Clubs";

type Student = {
  id: string; name: string; initials: string; avatar: string;
  dept: string; program: string; batch: string; section: string; semester: string;
  bio: string; skills: string[]; interests: string[]; clubs: string[];
  courses: { code: string; name: string }[];
  achievements: string[]; activity: string[];
  github?: string; linkedin?: string; portfolio?: string;
  visibility: "public" | "department" | "private";
  availableForNetworking?: boolean;
};

const AVATARS: Record<string, string> = {
  o:  "#2563EB", a: "#10B981", r: "#8B5CF6", s: "#F59E0B",
  f:  "#EF4444", t: "#06B6D4", n: "#EC4899", m: "#F97316",
};
function avatarBg(initials: string) { return AVATARS[initials[0].toLowerCase()] ?? "#64748B"; }

const ME: Student = {
  id: "me", name: "Naimur Hossen Ovi", initials: "NO", avatar: "",
  dept: "CSE", program: "BSc in CSE", batch: "52", section: "B", semester: "Spring 2026",
  bio: "Computer Science student interested in software development, artificial intelligence, and technology.",
  skills: ["Python","JavaScript","React","SQL","Git"],
  interests: ["Artificial Intelligence","Web Development","Competitive Programming","Research"],
  clubs: ["CSE Programming Club","Robotics & AI Society"],
  courses: [{ code:"CSE 305", name:"Database Management" },{ code:"CSE 301", name:"Algorithms" },{ code:"CSE 310", name:"Software Engineering" }],
  achievements: ["UniHack 2026 Finalist","ICPC Regional Participant","Research Poster Presenter"],
  activity: ["Attended AI & ML Workshop","Joined CSE Programming Club","Participated in UniHack 2026"],
  github: "github.com/ovi", linkedin: "linkedin.com/in/ovi", portfolio: "ovi.dev",
  visibility: "public", availableForNetworking: true,
};

const STUDENTS: Student[] = [
  ME,
  {
    id: "s2", name: "Rahim Ahmed", initials: "RA", avatar: "",
    dept: "CSE", program: "BSc in CSE", batch: "52", section: "B", semester: "Spring 2026",
    bio: "Passionate about backend development and system design.",
    skills: ["Java","Spring Boot","MySQL","Docker","Linux"],
    interests: ["Backend Development","Open Source","DevOps"],
    clubs: ["CSE Programming Club"],
    courses: [{ code:"CSE 305", name:"Database Management" },{ code:"CSE 301", name:"Algorithms" }],
    achievements: ["Dean's List — Spring 2025","Programming Contest Runner-up"],
    activity: ["Submitted project to CodeFest","Joined Robotics & AI Society"],
    github: "github.com/rahim", visibility: "public", availableForNetworking: true,
  },
  {
    id: "s3", name: "Tasnim Sultana", initials: "TS", avatar: "",
    dept: "CSE", program: "BSc in CSE", batch: "52", section: "A", semester: "Spring 2026",
    bio: "UI/UX designer and frontend developer with a love for clean interfaces.",
    skills: ["Figma","React","CSS","JavaScript","TypeScript"],
    interests: ["UI/UX Design","Human-Computer Interaction","Research"],
    clubs: ["Photography Club","CSE Programming Club"],
    courses: [{ code:"CSE 310", name:"Software Engineering" },{ code:"CSE 420", name:"Human-Computer Interaction" }],
    achievements: ["Best Design Award — TechFest 2025"],
    activity: ["Attended UX Design Workshop","Published personal portfolio"],
    portfolio: "tasnim.design", visibility: "public",
  },
  {
    id: "s4", name: "Farhan Hossain", initials: "FH", avatar: "",
    dept: "CSE", program: "BSc in CSE", batch: "51", section: "C", semester: "Spring 2026",
    bio: "Machine learning researcher focused on NLP and computer vision.",
    skills: ["Python","TensorFlow","PyTorch","Research","Data Analysis"],
    interests: ["Machine Learning","NLP","Computer Vision","Research"],
    clubs: ["Robotics & AI Society"],
    courses: [{ code:"CSE 450", name:"Machine Learning" },{ code:"CSE 460", name:"Computer Vision" }],
    achievements: ["Research Fellowship Recipient","Published Paper — IEEE"],
    activity: ["Presented at University Research Day","Joined AI Society"],
    github: "github.com/farhan", linkedin: "linkedin.com/in/farhan", visibility: "public", availableForNetworking: true,
  },
  {
    id: "s5", name: "Nusrat Jahan", initials: "NJ", avatar: "",
    dept: "EEE", program: "BSc in EEE", batch: "52", section: "B", semester: "Spring 2026",
    bio: "Embedded systems enthusiast working on IoT and robotics.",
    skills: ["C","Arduino","PCB Design","MATLAB","Python"],
    interests: ["Robotics","IoT","Embedded Systems","Entrepreneurship"],
    clubs: ["Robotics & AI Society","Entrepreneurship Club"],
    courses: [{ code:"EEE 305", name:"Microcontrollers" },{ code:"EEE 310", name:"Signal Processing" }],
    achievements: ["Robotics Competition 2nd Place","Startup Grant Recipient"],
    activity: ["Built IoT prototype","Joined Robotics Club"],
    visibility: "public",
  },
  {
    id: "s6", name: "Sabbir Rahman", initials: "SR", avatar: "",
    dept: "CSE", program: "BSc in CSE", batch: "53", section: "A", semester: "Spring 2026",
    bio: "Cybersecurity and network security enthusiast.",
    skills: ["Python","Networking","Linux","Kali","Wireshark"],
    interests: ["Cybersecurity","Ethical Hacking","Research"],
    clubs: ["CSE Programming Club"],
    courses: [{ code:"CSE 340", name:"Network Security" },{ code:"CSE 305", name:"Database Management" }],
    achievements: ["CTF Competition Winner"],
    activity: ["Won University CTF","Attended Security Workshop"],
    github: "github.com/sabbir", visibility: "public",
  },
  {
    id: "s7", name: "Maliha Chowdhury", initials: "MC", avatar: "",
    dept: "CSE", program: "BSc in CSE", batch: "52", section: "B", semester: "Spring 2026",
    bio: "Full-stack developer with a passion for open-source.",
    skills: ["React","Node.js","PostgreSQL","TypeScript","Docker"],
    interests: ["Web Development","Open Source","Startups"],
    clubs: ["CSE Programming Club","Entrepreneurship Club"],
    courses: [{ code:"CSE 310", name:"Software Engineering" },{ code:"CSE 301", name:"Algorithms" }],
    achievements: ["Hackathon Winner — Spring 2025","OSS Contributor"],
    activity: ["Launched personal project","Mentored junior students"],
    github: "github.com/maliha", portfolio: "maliha.dev", visibility: "public", availableForNetworking: true,
  },
  {
    id: "s8", name: "Tanvir Islam", initials: "TI", avatar: "",
    dept: "SWE", program: "BSc in SWE", batch: "52", section: "A", semester: "Spring 2026",
    bio: "Software engineer in training, interested in distributed systems.",
    skills: ["Java","Go","Kafka","Microservices","AWS"],
    interests: ["Distributed Systems","Cloud","Backend Engineering"],
    clubs: [],
    courses: [{ code:"SWE 305", name:"Software Architecture" },{ code:"SWE 310", name:"Cloud Computing" }],
    achievements: ["AWS Certified Cloud Practitioner"],
    activity: ["Completed AWS certification","Contributed to open source"],
    linkedin: "linkedin.com/in/tanvir", visibility: "public",
  },
  {
    id: "s9", name: "Afia Begum", initials: "AB", avatar: "",
    dept: "CSE", program: "BSc in CSE", batch: "54", section: "B", semester: "Spring 2026",
    bio: "First year student excited about programming and algorithms.",
    skills: ["Python","C","Problem Solving"],
    interests: ["Competitive Programming","AI","Robotics"],
    clubs: ["CSE Programming Club"],
    courses: [{ code:"CSE 101", name:"Intro to Programming" },{ code:"CSE 111", name:"Discrete Math" }],
    achievements: ["High School Programming Champion"],
    activity: ["Joined CSE Programming Club","Attended intro workshop"],
    visibility: "public",
  },
  {
    id: "s10", name: "Raihan Uddin", initials: "RU", avatar: "",
    dept: "BBA", program: "BBA", batch: "52", section: "C", semester: "Spring 2026",
    bio: "Business student with a strong interest in tech entrepreneurship.",
    skills: ["Business Analysis","Excel","Presentation","Research"],
    interests: ["Entrepreneurship","Marketing","Finance","Tech"],
    clubs: ["Entrepreneurship Club","Debate Society"],
    courses: [{ code:"BBA 305", name:"Business Strategy" },{ code:"BBA 310", name:"Marketing Management" }],
    achievements: ["Business Plan Competition Winner","Debate Society President"],
    activity: ["Won BizPlan 2025","Organized networking event"],
    linkedin: "linkedin.com/in/raihan", visibility: "department",
  },
];

const ALL_SKILLS = ["Python","JavaScript","React","Java","C++","Go","TypeScript","Node.js","SQL","Git","Docker","Figma","TensorFlow","PyTorch","Data Analysis","Linux","Networking","Machine Learning","UI/UX","Research","Arduino"];
const ALL_INTERESTS = ["Artificial Intelligence","Web Development","Competitive Programming","Research","Robotics","Machine Learning","Cybersecurity","Entrepreneurship","Design","Photography","Debate","IoT","Open Source","Cloud","Distributed Systems"];
const DEPTS = ["CSE","EEE","SWE","BBA","Physics","Math","English","Law"];
const BATCHES = ["50","51","52","53","54","55"];

// ─── OVERLAY & HELPERS ───────────────────────────────────────────────────────────
function Overlay({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 300 }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(5px)" }} />
      <div onClick={e => e.stopPropagation()} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
        {children}
      </div>
    </div>
  );
}

function Avatar({ s, size = 44 }: { s: Student; size?: number }) {
  const radius = size / 2;
  const fontSize = size * 0.36;
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: avatarBg(s.initials), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Manrope", fontWeight: 800, fontSize, color: "#fff", flexShrink: 0, letterSpacing: "-0.01em" }}>
      {s.initials}
    </div>
  );
}

function Tag({ label, color = "#2563EB", bg = "rgba(37,99,235,0.08)" }: { label: string; color?: string; bg?: string }) {
  return <span style={{ padding: "2px 9px", borderRadius: 6, fontSize: 11, fontWeight: 600, color, background: bg, whiteSpace: "nowrap" }}>{label}</span>;
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  return (
    <button onClick={() => onChange(!on)} style={{ width: 40, height: 22, borderRadius: 11, background: on ? c.primary : c.surface3, border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
      <span style={{ position: "absolute", top: 2, left: on ? 20 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)", display: "block" }} />
    </button>
  );
}

// ─── CONNECT MODAL ────────────────────────────────────────────────────────────────
function ConnectModal({ student, onClose, onSend }: { student: Student; onClose: () => void; onSend: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [msg, setMsg] = useState("");
  return (
    <Overlay onClose={onClose}>
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, padding: "28px 32px", minWidth: 420, maxWidth: 460, boxShadow: "0 24px 80px rgba(0,0,0,0.25)" }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 18 }}>
          <Avatar s={student} size={48} />
          <div>
            <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 16, color: c.text }}>Connect with {student.name.split(" ")[0]}?</div>
            <div style={{ fontSize: 12, color: c.textDim }}>{student.dept} · Batch {student.batch}</div>
          </div>
        </div>
        <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 16, lineHeight: 1.6 }}>Send a connection request through UniLink.</p>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 }}>Message (optional)</label>
          <textarea rows={3} value={msg} onChange={e => setMsg(e.target.value)}
            placeholder="Write a short message to introduce yourself..."
            style={{ width: "100%", padding: "9px 12px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 13, outline: "none", resize: "none", boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
          <button onClick={() => { onSend(); onClose(); }} style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Send Request</button>
        </div>
      </div>
    </Overlay>
  );
}

// ─── REPORT MODAL ─────────────────────────────────────────────────────────────────
function ReportModal({ student, onClose }: { student: Student; onClose: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [reason, setReason] = useState("");
  const reasons = ["Inappropriate Content","Impersonation","Harassment","False Information","Other"];
  return (
    <Overlay onClose={onClose}>
      <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, padding: "28px 32px", minWidth: 400, maxWidth: 440, boxShadow: "0 24px 80px rgba(0,0,0,0.25)" }}>
        <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 16, color: c.text, marginBottom: 5 }}>Report Student</div>
        <div style={{ fontSize: 12, color: c.textDim, marginBottom: 18 }}>{student.name}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {reasons.map(r => (
            <label key={r} style={{ display: "flex", gap: 9, alignItems: "center", cursor: "pointer" }}>
              <input type="radio" name="reason" checked={reason === r} onChange={() => setReason(r)} style={{ accentColor: c.primary }} />
              <span style={{ fontSize: 13, color: c.text }}>{r}</span>
            </label>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
          <button onClick={onClose} style={{ flex: 1, padding: "10px 0", borderRadius: 10, background: "#EF4444", color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Submit Report</button>
        </div>
      </div>
    </Overlay>
  );
}

// ─── STUDENT CARD ─────────────────────────────────────────────────────────────────
function StudentCard({ student, connectState, onConnect, onOpen, isMe }: {
  student: Student; connectState: ConnectState; onConnect: () => void; onOpen: () => void; isMe?: boolean;
}) {
  const { theme } = useTheme(); const c = tok(theme);
  const [hov, setHov] = useState(false);
  const bg = avatarBg(student.initials);

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: c.surface, border: `1px solid ${hov ? bg + "55" : c.border}`, borderRadius: 16, padding: "20px", boxShadow: hov ? `0 6px 24px ${bg}12, ${c.cardShadow}` : c.cardShadow, transition: "all 0.15s", display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{ position: "relative" }}>
          <Avatar s={student} size={46} />
          {student.availableForNetworking && (
            <div style={{ position: "absolute", bottom: 1, right: 1, width: 11, height: 11, borderRadius: "50%", background: "#10B981", border: `2px solid ${c.surface}` }} />
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div onClick={onOpen} style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 14, color: c.text, cursor: "pointer", marginBottom: 2, lineHeight: 1.2 }}>{student.name} {isMe && <span style={{ fontSize: 10, fontWeight: 700, color: c.primary, background: `${c.primary}10`, borderRadius: 4, padding: "1px 5px" }}>Me</span>}</div>
          <div style={{ fontSize: 11, color: c.textMuted }}>{student.dept} · Batch {student.batch} · §{student.section}</div>
          <div style={{ fontSize: 11, color: c.textDim, marginTop: 2 }}>{student.program}</div>
        </div>
      </div>

      {/* Skills */}
      {student.skills.length > 0 && (
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Skills</div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {student.skills.slice(0, 4).map(sk => <Tag key={sk} label={sk} color="#2563EB" bg="rgba(37,99,235,0.07)" />)}
            {student.skills.length > 4 && <Tag label={`+${student.skills.length - 4}`} color={c.textDim} bg={c.surface2} />}
          </div>
        </div>
      )}

      {/* Interests */}
      {student.interests.length > 0 && (
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Interests</div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {student.interests.slice(0, 3).map(i => <Tag key={i} label={i} color="#8B5CF6" bg="rgba(139,92,246,0.07)" />)}
            {student.interests.length > 3 && <Tag label={`+${student.interests.length - 3}`} color={c.textDim} bg={c.surface2} />}
          </div>
        </div>
      )}

      {/* Clubs */}
      {student.clubs.length > 0 && (
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {student.clubs.slice(0, 2).map(club => (
            <Tag key={club} label={club} color="#10B981" bg="rgba(16,185,129,0.07)" />
          ))}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
        <button onClick={onOpen} style={{ flex: 1, padding: "7px 0", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>View Profile</button>
        {!isMe && (
          <button onClick={onConnect}
            style={{ padding: "7px 14px", borderRadius: 9, background: connectState === "connected" ? "rgba(16,185,129,0.08)" : connectState === "sent" ? c.surface2 : c.primary, color: connectState === "connected" ? "#10B981" : connectState === "sent" ? c.textDim : "#fff", border: `1px solid ${connectState === "connected" ? "rgba(16,185,129,0.2)" : connectState === "sent" ? c.border : "transparent"}`, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
            {connectState === "connected" ? "Connected" : connectState === "sent" ? "Sent" : "Connect"}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── STUDENT PROFILE ──────────────────────────────────────────────────────────────
function StudentProfile({ student, isMe, connectState, onConnect, onBack }: {
  student: Student; isMe: boolean; connectState: ConnectState; onConnect: () => void; onBack: () => void;
}) {
  const { theme } = useTheme(); const c = tok(theme);
  const [showConnect, setShowConnect] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const bg = avatarBg(student.initials);

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
      <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>{title}</div>
      {children}
    </div>
  );

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: c.textMuted, cursor: "pointer", fontFamily: "Inter", fontSize: 12, fontWeight: 600, marginBottom: 20, padding: 0 }}>
          <Ic n="arrowL" size={14} color={c.textMuted} /> Back to Directory
        </button>

        {/* Private state */}
        {student.visibility === "private" && !isMe && (
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, padding: "56px 32px", textAlign: "center", boxShadow: c.cardShadow, marginBottom: 20 }}>
            <Ic n="lock" size={36} color={c.textDim} />
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 16, color: c.text, marginTop: 14, marginBottom: 6 }}>This profile is private.</div>
            <div style={{ fontSize: 13, color: c.textDim }}>The student has limited their profile visibility.</div>
          </div>
        )}

        {/* Header */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 20, padding: "28px 32px", boxShadow: c.cardShadow, marginBottom: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: bg }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
              <div style={{ position: "relative" }}>
                <Avatar s={student} size={72} />
                {student.availableForNetworking && !isMe && (
                  <div style={{ position: "absolute", bottom: 2, right: 2, width: 14, height: 14, borderRadius: "50%", background: "#10B981", border: `2px solid ${c.surface}` }} />
                )}
              </div>
              <div>
                <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: c.text, letterSpacing: "-0.01em", marginBottom: 4 }}>{student.name} {isMe && <span style={{ fontSize: 12, fontWeight: 700, color: c.primary, background: `${c.primary}10`, borderRadius: 5, padding: "1px 6px" }}>You</span>}</h1>
                <div style={{ fontSize: 14, color: c.textMuted, marginBottom: 6 }}>{student.program} · {student.dept}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Tag label={`Batch ${student.batch}`} color={c.textMuted} bg={c.surface2} />
                  <Tag label={`Section ${student.section}`} color={c.textMuted} bg={c.surface2} />
                  <Tag label={student.semester} color={c.textMuted} bg={c.surface2} />
                  {student.availableForNetworking && <Tag label="Available for Networking" color="#10B981" bg="rgba(16,185,129,0.08)" />}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", flexShrink: 0 }}>
              {isMe ? (
                <><button onClick={onBack} style={{ padding: "8px 16px", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Edit Profile</button>
                <button style={{ padding: "8px 12px", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, cursor: "pointer" }}><Ic n="shield" size={15} color={c.textDim} /></button></>
              ) : (
                <>
                  {connectState === "none" && <button onClick={() => setShowConnect(true)} style={{ padding: "8px 20px", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Connect</button>}
                  {connectState === "sent" && <button style={{ padding: "8px 20px", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textDim, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Request Sent · Cancel</button>}
                  {connectState === "connected" && <div style={{ padding: "8px 16px", borderRadius: 10, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", display: "flex", gap: 6, alignItems: "center" }}><Ic n="check" size={14} color="#10B981" /><span style={{ fontSize: 13, fontWeight: 700, color: "#10B981" }}>Connected</span></div>}
                  <button style={{ padding: "8px 12px", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, cursor: "pointer" }}><Ic n="share" size={15} color={c.textDim} /></button>
                  <div style={{ position: "relative" }}>
                    <button onClick={() => setShowMore(v => !v)} style={{ padding: "8px 12px", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, cursor: "pointer" }}><Ic n="more" size={15} color={c.textDim} /></button>
                    {showMore && (
                      <div style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, background: c.surface, border: `1px solid ${c.border}`, borderRadius: 12, boxShadow: c.cardShadow, zIndex: 10, overflow: "hidden", minWidth: 150 }}>
                        {["Block Student","Report Profile"].map(opt => (
                          <button key={opt} onClick={() => { setShowMore(false); opt === "Report Profile" ? setShowReport(true) : undefined; }}
                            style={{ display: "block", width: "100%", padding: "10px 16px", background: "none", border: "none", textAlign: "left", fontSize: 13, color: opt.includes("Report") || opt.includes("Block") ? "#EF4444" : c.text, cursor: "pointer", fontFamily: "Inter" }}
                            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = c.surface2)}
                            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20, alignItems: "flex-start" }}>
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {student.bio && (
              <Section title="About">
                <p style={{ fontSize: 14, color: c.textMuted, lineHeight: 1.75, margin: 0 }}>{student.bio}</p>
              </Section>
            )}

            <Section title="Skills">
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {student.skills.map(sk => <Tag key={sk} label={sk} color="#2563EB" bg="rgba(37,99,235,0.08)" />)}
              </div>
            </Section>

            <Section title="Interests">
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {student.interests.map(i => <Tag key={i} label={i} color="#8B5CF6" bg="rgba(139,92,246,0.08)" />)}
              </div>
            </Section>

            {student.clubs.length > 0 && (
              <Section title="Clubs & Communities">
                {student.clubs.map(club => (
                  <div key={club} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: c.surface2, borderRadius: 10, border: `1px solid ${c.border}`, marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{club}</span>
                    <Tag label="Member" color="#10B981" bg="rgba(16,185,129,0.08)" />
                  </div>
                ))}
              </Section>
            )}

            <Section title="Current Courses">
              {student.courses.map(course => (
                <div key={course.code} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 12px", background: c.surface2, borderRadius: 10, border: `1px solid ${c.border}`, marginBottom: 8 }}>
                  <Ic n="book" size={14} color={c.textDim} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: c.text }}>{course.code}</div>
                    <div style={{ fontSize: 11, color: c.textDim }}>{course.name}</div>
                  </div>
                </div>
              ))}
            </Section>

            {student.achievements.length > 0 && (
              <Section title="Achievements">
                {student.achievements.map((a, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: i < student.achievements.length - 1 ? 10 : 0 }}>
                    <Ic n="award" size={14} color="#F59E0B" />
                    <span style={{ fontSize: 13, color: c.text }}>{a}</span>
                  </div>
                ))}
              </Section>
            )}

            {student.activity.length > 0 && (
              <Section title="Campus Activity">
                {student.activity.map((a, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: i < student.activity.length - 1 ? 10 : 0 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: c.primary, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: c.textMuted }}>{a}</span>
                  </div>
                ))}
              </Section>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: c.cardShadow }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 12 }}>Academic Information</div>
              {[
                { label: "Department", val: student.dept },
                { label: "Program",    val: student.program },
                { label: "Batch",      val: student.batch },
                { label: "Section",    val: student.section },
                { label: "Semester",   val: student.semester },
              ].map(r => (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, gap: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: c.textDim }}>{r.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: c.text, textAlign: "right" }}>{r.val}</span>
                </div>
              ))}
            </div>

            {(student.github || student.linkedin || student.portfolio) && (
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: c.cardShadow }}>
                <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 12 }}>Links</div>
                {student.github    && <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}><Ic n="github" size={14} color={c.textDim} /><span style={{ fontSize: 12, color: c.textMuted }}>{student.github}</span></div>}
                {student.linkedin  && <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}><Ic n="link" size={14} color={c.textDim} /><span style={{ fontSize: 12, color: c.textMuted }}>{student.linkedin}</span></div>}
                {student.portfolio && <div style={{ display: "flex", gap: 8, alignItems: "center" }}><Ic n="link" size={14} color={c.textDim} /><span style={{ fontSize: 12, color: c.textMuted }}>{student.portfolio}</span></div>}
              </div>
            )}

            {!isMe && (
              <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: c.cardShadow }}>
                <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text, marginBottom: 10 }}>Contact</div>
                <div style={{ fontSize: 12, color: c.textDim, lineHeight: 1.55, marginBottom: 12 }}>Personal contact information is kept private. Use UniLink secure messaging.</div>
                <button style={{ width: "100%", padding: "9px 0", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Message through UniLink</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showConnect && <ConnectModal student={student} onClose={() => setShowConnect(false)} onSend={onConnect} />}
      {showReport && <ReportModal student={student} onClose={() => setShowReport(false)} />}
    </div>
  );
}

// ─── MY PROFILE / EDIT / PRIVACY ─────────────────────────────────────────────────
type MyProfileView = "view" | "edit" | "privacy";

function MyProfilePage({ onBack }: { onBack: () => void }) {
  const { theme } = useTheme(); const c = tok(theme);
  const [view, setView] = useState<MyProfileView>("view");
  const [skills, setSkills] = useState([...ME.skills]);
  const [interests, setInterests] = useState([...ME.interests]);
  const [bio, setBio] = useState(ME.bio);
  const [saved, setSaved] = useState(false);
  const [visibility, setVisibility] = useState<"public" | "department" | "batch" | "section" | "private">("public");
  const [allowDiscovery, setAllowDiscovery] = useState(true);
  const [fieldVis, setFieldVis] = useState({ bio: true, skills: true, interests: true, clubs: true, achievements: true, links: false, academic: true });
  const [skillInput, setSkillInput] = useState("");

  const completion = Math.round(([bio, skills.length >= 3, interests.length >= 2, ME.clubs.length > 0, ME.achievements.length > 0].filter(Boolean).length / 5) * 100);

  if (view === "privacy") return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <button onClick={() => setView("view")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: c.textMuted, cursor: "pointer", fontFamily: "Inter", fontSize: 12, fontWeight: 600, marginBottom: 24, padding: 0 }}>
          <Ic n="arrowL" size={14} color={c.textMuted} /> Back to My Profile
        </button>
        <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: c.text, marginBottom: 4 }}>Profile Visibility</h1>
        <p style={{ fontSize: 13, color: c.textMuted, marginBottom: 24 }}>Control what other students can see about you.</p>

        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: "hidden", boxShadow: c.cardShadow, marginBottom: 14 }}>
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${c.border}`, background: c.surface2 }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text }}>Profile Visibility</div>
            <div style={{ fontSize: 11, color: c.textDim, marginTop: 2 }}>Students outside your selected group will not see your profile details.</div>
          </div>
          {[
            { val: "public",     label: "University Students", desc: "All students can see your profile" },
            { val: "department", label: "My Department",       desc: "Only CSE students can see your profile" },
            { val: "batch",      label: "My Batch",            desc: "Only Batch 52 students can see your profile" },
            { val: "section",    label: "My Section",          desc: "Only Section B students can see your profile" },
            { val: "private",    label: "Private",             desc: "Your profile is hidden from the directory" },
          ].map((opt, i, arr) => (
            <label key={opt.val} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 20px", borderBottom: i < arr.length - 1 ? `1px solid ${c.border}` : "none", cursor: "pointer" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: c.text }}>{opt.label}</div>
                <div style={{ fontSize: 11, color: c.textDim }}>{opt.desc}</div>
              </div>
              <input type="radio" name="visibility" value={opt.val} checked={visibility === opt.val} onChange={() => setVisibility(opt.val as typeof visibility)} style={{ accentColor: c.primary }} />
            </label>
          ))}
        </div>

        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: "hidden", boxShadow: c.cardShadow, marginBottom: 14 }}>
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${c.border}`, background: c.surface2 }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text }}>Field Visibility</div>
          </div>
          {(Object.entries(fieldVis) as [keyof typeof fieldVis, boolean][]).map(([key, val], i, arr) => (
            <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderBottom: i < arr.length - 1 ? `1px solid ${c.border}` : "none" }}>
              <span style={{ fontSize: 13, color: c.text, textTransform: "capitalize" }}>{key === "links" ? "Professional Links" : key === "academic" ? "Academic Information" : key}</span>
              <Toggle on={val} onChange={v => setFieldVis(prev => ({ ...prev, [key]: v }))} />
            </div>
          ))}
        </div>

        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: "hidden", boxShadow: c.cardShadow, marginBottom: 14 }}>
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${c.border}`, background: c.surface2 }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text }}>Profile Discovery</div>
          </div>
          <div style={{ padding: "13px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, color: c.text }}>Allow students to find me in Student Directory</div>
                {!allowDiscovery && <div style={{ fontSize: 11, color: c.textDim, marginTop: 2 }}>Your profile is hidden from directory search.</div>}
              </div>
              <Toggle on={allowDiscovery} onChange={setAllowDiscovery} />
            </div>
          </div>
        </div>

        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, overflow: "hidden", boxShadow: c.cardShadow, marginBottom: 14 }}>
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${c.border}`, background: c.surface2 }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text }}>Connection Requests</div>
          </div>
          {["Everyone within visibility range","My Department","My Batch","Nobody"].map((opt, i, arr) => (
            <label key={opt} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderBottom: i < arr.length - 1 ? `1px solid ${c.border}` : "none", cursor: "pointer" }}>
              <span style={{ fontSize: 13, color: c.text }}>{opt}</span>
              <input type="radio" name="conn_pref" defaultChecked={i === 0} style={{ accentColor: c.primary }} />
            </label>
          ))}
        </div>

        <button onClick={() => setView("view")} style={{ width: "100%", padding: "11px 0", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Save Changes</button>
      </div>
    </div>
  );

  if (view === "edit") return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <button onClick={() => setView("view")} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: c.textMuted, cursor: "pointer", fontFamily: "Inter", fontSize: 12, fontWeight: 600, marginBottom: 24, padding: 0 }}>
          <Ic n="arrowL" size={14} color={c.textMuted} /> Back to My Profile
        </button>
        <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: c.text, marginBottom: 24 }}>Edit Profile</h1>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Avatar */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>Profile Photo</div>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <Avatar s={ME} size={64} />
              <button style={{ padding: "8px 18px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <Ic n="upload" size={13} color={c.textDim} /> Upload Photo
              </button>
            </div>
          </div>

          {/* Basic info */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>Basic Information</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: c.textDim, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>Display Name</label>
                <input defaultValue={ME.name} style={{ width: "100%", padding: "9px 12px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: c.textDim, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>Bio</label>
                <textarea rows={3} value={bio} onChange={e => setBio(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
              </div>
              {/* Managed fields */}
              {[["Department","CSE"],["Program","BSc in CSE"],["Batch","52"],["Section","B"]].map(([label,val]) => (
                <div key={label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: c.textDim, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</label>
                    <span style={{ fontSize: 10, fontWeight: 600, color: c.textDim }}>Managed by University</span>
                  </div>
                  <input readOnly value={val} style={{ width: "100%", padding: "9px 12px", borderRadius: 9, background: c.surface3, border: `1px solid ${c.border}`, color: c.textDim, fontFamily: "Inter", fontSize: 13, outline: "none", boxSizing: "border-box", cursor: "not-allowed" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>Skills</div>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 12 }}>
              {skills.map(sk => (
                <div key={sk} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 7, background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.15)" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#2563EB" }}>{sk}</span>
                  <button onClick={() => setSkills(s => s.filter(x => x !== sk))} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}><Ic n="x" size={10} color="#2563EB" /></button>
                </div>
              ))}
            </div>
            <div style={{ position: "relative" }}>
              <Ic n="search" size={13} color={c.textDim} />
              <div style={{ display: "flex", gap: 7, marginTop: 8, flexWrap: "wrap" }}>
                {ALL_SKILLS.filter(sk => !skills.includes(sk)).slice(0, 8).map(sk => (
                  <button key={sk} onClick={() => setSkills(s => [...s, sk])}
                    style={{ padding: "4px 10px", borderRadius: 7, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                    + {sk}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interests */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>Interests</div>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 12 }}>
              {interests.map(i => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 7, background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#8B5CF6" }}>{i}</span>
                  <button onClick={() => setInterests(s => s.filter(x => x !== i))} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}><Ic n="x" size={10} color="#8B5CF6" /></button>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
              {ALL_INTERESTS.filter(i => !interests.includes(i)).slice(0, 6).map(i => (
                <button key={i} onClick={() => setInterests(s => [...s, i])}
                  style={{ padding: "4px 10px", borderRadius: 7, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                  + {i}
                </button>
              ))}
            </div>
          </div>

          {/* Clubs - read only */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text }}>My Clubs</div>
              <button style={{ fontSize: 12, fontWeight: 600, color: c.primary, background: "none", border: "none", cursor: "pointer" }}>Manage Clubs</button>
            </div>
            {ME.clubs.map(club => <div key={club} style={{ fontSize: 13, color: c.text, padding: "9px 12px", background: c.surface2, borderRadius: 9, marginBottom: 7 }}>{club}</div>)}
          </div>

          {/* Achievements */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>Achievements</div>
            {ME.achievements.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                <Ic n="award" size={13} color="#F59E0B" />
                <span style={{ fontSize: 13, color: c.text, flex: 1 }}>{a}</span>
                <button style={{ background: "none", border: "none", cursor: "pointer" }}><Ic n="x" size={12} color={c.textDim} /></button>
              </div>
            ))}
            <button style={{ marginTop: 8, padding: "7px 14px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ Add Achievement</button>
          </div>

          {/* Links */}
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "20px 22px", boxShadow: c.cardShadow }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 14 }}>Professional Links <span style={{ fontSize: 11, fontWeight: 400, color: c.textDim }}>(optional)</span></div>
            {[["GitHub","github.com/ovi"],["LinkedIn","linkedin.com/in/ovi"],["Portfolio","ovi.dev"],["Personal Website",""]].map(([label,val]) => (
              <div key={label} style={{ marginBottom: 10 }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: c.textDim, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</label>
                <input defaultValue={val} placeholder={`Your ${label} URL`}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 9, background: c.surface2, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          <button onClick={() => setView("view")} style={{ flex: 1, padding: "11px 0", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
          <button onClick={() => { setSaved(true); setView("view"); }} style={{ flex: 2, padding: "11px 0", borderRadius: 10, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Save Changes</button>
        </div>
      </div>
    </div>
  );

  // My Profile view
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: c.textMuted, cursor: "pointer", fontFamily: "Inter", fontSize: 12, fontWeight: 600, marginBottom: 24, padding: 0 }}>
          <Ic n="arrowL" size={14} color={c.textMuted} /> Back to Directory
        </button>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 24, color: c.text, letterSpacing: "-0.02em", marginBottom: 4 }}>My Profile</h1>
            <p style={{ fontSize: 13, color: c.textMuted }}>Manage the information students can see about you.</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setView("privacy")} style={{ padding: "8px 14px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <Ic n="shield" size={13} color={c.textDim} /> Privacy Settings
            </button>
            <button onClick={() => setView("edit")} style={{ padding: "8px 16px", borderRadius: 9, background: c.primary, color: "#fff", border: "none", fontFamily: "Inter", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <Ic n="edit" size={13} color="#fff" /> Edit Profile
            </button>
          </div>
        </div>

        {saved && (
          <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 12, padding: "12px 18px", marginBottom: 20, display: "flex", gap: 10, alignItems: "center" }}>
            <Ic n="check" size={14} color="#10B981" />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#10B981" }}>Profile Updated</span>
            <button onClick={() => setSaved(false)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer" }}><Ic n="x" size={13} color="#10B981" /></button>
          </div>
        )}

        {/* Completion widget */}
        <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "18px 22px", boxShadow: c.cardShadow, marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text }}>Profile Completion</div>
            <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 20, color: c.primary }}>{completion}%</div>
          </div>
          <div style={{ height: 6, background: c.surface3, borderRadius: 999, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${completion}%`, background: c.primary, borderRadius: 999, transition: "width 0.4s" }} />
          </div>
          {completion < 100 && (
            <div style={{ fontSize: 12, color: c.textDim, marginTop: 8 }}>
              Add a few more details to complete your profile.
              <button onClick={() => setView("edit")} style={{ marginLeft: 8, color: c.primary, fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontSize: 12 }}>Complete Profile →</button>
            </div>
          )}
        </div>

        {/* Profile preview */}
        <StudentProfile student={ME} isMe connectState="none" onConnect={() => {}} onBack={onBack} />
      </div>
    </div>
  );
}

// ─── DIRECTORY MAIN ───────────────────────────────────────────────────────────────
type DirView = "list" | "profile" | "myprofile";
const DIR_TABS: DirTab[] = ["All Students","My Batch","My Section","My Department","My Clubs"];

export default function DirectoryPage() {
  const { theme } = useTheme(); const c = tok(theme);
  const [view, setView]          = useState<DirView>("list");
  const [selected, setSelected]  = useState<Student | null>(null);
  const [tab, setTab]            = useState<DirTab>("All Students");
  const [query, setQuery]        = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [batchFilter, setBatchFilter] = useState("All");
  const [skillFilter, setSkillFilter] = useState("");
  const [connectStates, setConnectStates] = useState<Record<string, ConnectState>>({ s2: "connected", s4: "sent" });
  const [showConnect, setShowConnect] = useState<Student | null>(null);

  function openProfile(s: Student) { setSelected(s); setView("profile"); }
  function getConnect(id: string): ConnectState { return connectStates[id] ?? "none"; }
  function sendRequest(id: string) { setConnectStates(prev => ({ ...prev, [id]: "sent" })); }

  function filterStudents(students: Student[]) {
    return students.filter(s => {
      if (s.id === "me") return false;
      const mq = !query || s.name.toLowerCase().includes(query.toLowerCase()) || s.skills.some(sk => sk.toLowerCase().includes(query.toLowerCase())) || s.interests.some(i => i.toLowerCase().includes(query.toLowerCase()));
      const md = deptFilter === "All" || s.dept === deptFilter;
      const mb = batchFilter === "All" || s.batch === batchFilter;
      const msk = !skillFilter || s.skills.some(sk => sk.toLowerCase().includes(skillFilter.toLowerCase()));
      return mq && md && mb && msk;
    });
  }

  const tabStudents = (() => {
    if (tab === "My Batch")      return STUDENTS.filter(s => s.batch === ME.batch && s.id !== "me");
    if (tab === "My Section")    return STUDENTS.filter(s => s.batch === ME.batch && s.section === ME.section && s.id !== "me");
    if (tab === "My Department") return STUDENTS.filter(s => s.dept === ME.dept && s.id !== "me");
    if (tab === "My Clubs")      return STUDENTS.filter(s => s.clubs.some(c => ME.clubs.includes(c)) && s.id !== "me");
    return STUDENTS.filter(s => s.id !== "me");
  })();

  const displayed = filterStudents(tabStudents);

  if (view === "myprofile") return <MyProfilePage onBack={() => setView("list")} />;
  if (view === "profile" && selected) {
    if (selected.id === "me") return <MyProfilePage onBack={() => setView("list")} />;
    return (
      <StudentProfile student={selected} isMe={false}
        connectState={getConnect(selected.id)}
        onConnect={() => {
          if (getConnect(selected.id) === "none") setShowConnect(selected);
          else sendRequest(selected.id);
        }}
        onBack={() => setView("list")} />
    );
  }

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 28px 100px", background: c.bg }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 24, color: c.text, letterSpacing: "-0.02em", marginBottom: 4 }}>Student Directory</h1>
            <p style={{ fontSize: 13, color: c.textMuted }}>Find classmates, discover shared interests, and connect with students across campus.</p>
          </div>
          <button onClick={() => setView("myprofile")}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 10, background: c.surface, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            <Avatar s={ME} size={22} /> My Profile
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
          {[
            { label: "Students",           value: "2,480", color: "#2563EB", bg: "rgba(37,99,235,0.08)",  icon: "👥" },
            { label: "Departments",        value: "8",     color: "#8B5CF6", bg: "rgba(139,92,246,0.08)", icon: "🏛️" },
            { label: "Batches",            value: "12",    color: "#F59E0B", bg: "rgba(245,158,11,0.08)", icon: "📅" },
            { label: "Active Communities", value: "24",    color: "#10B981", bg: "rgba(16,185,129,0.08)", icon: "🤝" },
          ].map(s => (
            <div key={s.label} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: "16px 18px", boxShadow: c.cardShadow, display: "flex", alignItems: "center", gap: 13 }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{s.icon}</div>
              <div>
                <div style={{ fontFamily: "Manrope", fontWeight: 800, fontSize: 22, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: c.text, marginTop: 3 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Search + Filters */}
        <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: "1 1 260px" }}>
            <div style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }}><Ic n="search" size={14} color={c.textDim} /></div>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search students by name, skill, interest..."
              style={{ width: "100%", padding: "9px 12px 9px 35px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
          </div>
          <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 12, cursor: "pointer", outline: "none" }}>
            <option>All</option>{DEPTS.map(d => <option key={d}>{d}</option>)}
          </select>
          <select value={batchFilter} onChange={e => setBatchFilter(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 12, cursor: "pointer", outline: "none" }}>
            <option>All</option>{BATCHES.map(b => <option key={b}>Batch {b}</option>)}
          </select>
          <select style={{ padding: "8px 12px", borderRadius: 9, background: c.surface, border: `1px solid ${c.border}`, color: c.text, fontFamily: "Inter", fontSize: 12, cursor: "pointer", outline: "none" }}>
            <option>All Sections</option><option>Section A</option><option>Section B</option><option>Section C</option>
          </select>
        </div>

        {/* Skill quick filter */}
        <div style={{ display: "flex", gap: 6, marginBottom: 6, overflowX: "auto", paddingBottom: 2 }}>
          {ALL_SKILLS.slice(0, 10).map(sk => (
            <button key={sk} onClick={() => setSkillFilter(skillFilter === sk ? "" : sk)}
              style={{ padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: skillFilter === sk ? 700 : 500, background: skillFilter === sk ? `${c.primary}10` : "transparent", color: skillFilter === sk ? c.primary : c.textDim, border: `1px solid ${skillFilter === sk ? c.primary + "30" : c.border}`, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>
              {sk}
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 3, marginBottom: 22 }}>
          {DIR_TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding: "7px 14px", borderRadius: 9, fontSize: 12, fontWeight: tab === t ? 700 : 500, background: tab === t ? `${c.primary}10` : "transparent", color: tab === t ? c.primary : c.textMuted, border: `1px solid ${tab === t ? c.primary + "30" : "transparent"}`, cursor: "pointer", whiteSpace: "nowrap" }}>
              {t}
            </button>
          ))}
        </div>

        {/* Tab header */}
        {tab !== "All Students" && (
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 14, padding: "14px 20px", marginBottom: 18, display: "flex", gap: 12, alignItems: "center", boxShadow: c.cardShadow }}>
            <Ic n="users" size={16} color={c.primary} />
            <div>
              <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 13, color: c.text }}>{tab}</div>
              <div style={{ fontSize: 11, color: c.textDim }}>
                {tab === "My Batch"      && `Batch ${ME.batch} · ${tabStudents.length} students`}
                {tab === "My Section"    && `Batch ${ME.batch}, Section ${ME.section} · ${tabStudents.length} classmates`}
                {tab === "My Department" && `${ME.dept} — Computer Science & Engineering · ${tabStudents.length} students`}
                {tab === "My Clubs"      && `Students from your clubs · ${tabStudents.length} students`}
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        {displayed.length === 0 ? (
          <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18, padding: "64px 24px", textAlign: "center", boxShadow: c.cardShadow }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text, marginBottom: 6 }}>No Students Found</div>
            <div style={{ fontSize: 13, color: c.textDim, marginBottom: 20 }}>No students match your current search or filters.</div>
            <button onClick={() => { setQuery(""); setDeptFilter("All"); setBatchFilter("All"); setSkillFilter(""); }} style={{ padding: "9px 22px", borderRadius: 10, background: c.surface2, border: `1px solid ${c.border}`, color: c.textMuted, fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Clear Filters</button>
          </div>
        ) : (
          <>
            <div style={{ fontFamily: "Manrope", fontWeight: 600, fontSize: 13, color: c.textDim, marginBottom: 14 }}>{displayed.length} students</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 16 }}>
              {displayed.map(s => (
                <StudentCard key={s.id} student={s} connectState={getConnect(s.id)} isMe={s.id === "me"}
                  onConnect={() => {
                    if (getConnect(s.id) === "none") setShowConnect(s);
                    else sendRequest(s.id);
                  }}
                  onOpen={() => openProfile(s)} />
              ))}
            </div>
          </>
        )}

        {/* Skill discovery section */}
        {!query && tab === "All Students" && (
          <div style={{ marginTop: 32 }}>
            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text, marginBottom: 12 }}>Find Students by Skill</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {ALL_SKILLS.map(sk => (
                <button key={sk} onClick={() => setSkillFilter(sk)}
                  style={{ padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 500, background: c.surface, border: `1px solid ${c.border}`, color: c.textMuted, cursor: "pointer" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = c.primary + "40"; (e.currentTarget as HTMLElement).style.color = c.primary; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = c.border; (e.currentTarget as HTMLElement).style.color = c.textMuted; }}>
                  {sk}
                </button>
              ))}
            </div>

            <div style={{ fontFamily: "Manrope", fontWeight: 700, fontSize: 15, color: c.text, marginTop: 24, marginBottom: 12 }}>Find Students by Interest</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {ALL_INTERESTS.map(i => (
                <button key={i} onClick={() => setQuery(i)}
                  style={{ padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 500, background: c.surface, border: `1px solid rgba(139,92,246,0.2)`, color: "#8B5CF6", cursor: "pointer" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,0.08)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = c.surface; }}>
                  {i}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {showConnect && (
        <ConnectModal student={showConnect} onClose={() => setShowConnect(null)} onSend={() => sendRequest(showConnect.id)} />
      )}
    </div>
  );
}
