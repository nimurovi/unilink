"use client";
import { useRouter } from "next/navigation";
import NotificationsPage from "./NotificationsView";
const routes: Record<string, string> = {
  exams: "/exams", assignments: "/assignments", materials: "/materials", routine: "/routine",
  events: "/events", clubs: "/clubs", opportunities: "/opportunities", lostfound: "/lost-found",
  dashboard: "/dashboard", announcements: "/announcements", courses: "/courses",
};
export default function Page() {
  const router = useRouter();
  return <NotificationsPage onNavigate={target => router.push(routes[target] ?? "/dashboard")} />;
}
