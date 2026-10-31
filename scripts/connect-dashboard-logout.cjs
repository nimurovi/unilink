const fs = require("node:fs");
const path = require("node:path");
const file = path.resolve("src/app/dashboard/DashboardView.tsx");
const text = fs.readFileSync(file, "utf8");
const before = 'onClick={() => { setProfileOpen(false); window.location.href = "/login"; }}';
const after = `onClick={async () => {
  setProfileOpen(false);
  try {
    const response = await fetch("/api/auth/logout", { method: "POST" });
    if (!response.ok) { alert("Could not sign out. Please try the Sign out button at the bottom right."); return; }
    window.location.replace("/login");
  } catch { alert("Could not connect. Please try signing out again."); }
}}`;
if (text.includes(after)) { console.log("Dashboard logout is already connected."); }
else if (text.split(before).length === 2) {
  const backup = file + ".backup-" + Date.now();
  fs.copyFileSync(file, backup);
  fs.writeFileSync(file, text.replace(before, after));
  console.log("Dashboard logout connected. Backup: " + backup);
} else {
  console.error("Dashboard has changed; no edits made. Use the new bottom-right Sign out button and send DashboardView.tsx for integration.");
  process.exitCode = 1;
}
