import type { ReactNode } from "react";
import { requireUser } from "@/lib/server/session";
import PortalBoundary from "./PortalBoundary";
import SessionControls from "./SessionControls";
export default async function ProtectedPage({ children, crOnly = false, studentOnly = false }: { children: ReactNode; crOnly?: boolean; studentOnly?: boolean }) {
  const user = await requireUser(crOnly, studentOnly);
  return <PortalBoundary id={user.id} role={user.role} classId={user.class_id}>{children}<SessionControls name={user.full_name} /></PortalBoundary>;
}
