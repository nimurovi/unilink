import type { ReactNode } from "react";
import ProtectedPage from "@/components/auth/ProtectedPage";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export default function Layout({ children }: { children: ReactNode }) {
  return <ProtectedPage>{children}</ProtectedPage>;
}
