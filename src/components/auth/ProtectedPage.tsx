import type { ReactNode } from "react";
import { requireUser } from "@/lib/server/session";
import SessionControls from "./SessionControls";
export default async function ProtectedPage({ children, crOnly = false }: { children: ReactNode; crOnly?: boolean }) {
  const user = await requireUser(crOnly);
  return <>{children}<SessionControls name={user.full_name} /></>;
}
