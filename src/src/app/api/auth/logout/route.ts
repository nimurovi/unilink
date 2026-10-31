import { destroySession } from "@/lib/server/session";
import { checkOrigin, json, authFailure } from "@/lib/server/auth-http";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try { checkOrigin(request); await destroySession(); return json({ message: "Signed out." }); }
  catch (error) { return authFailure(error); }
}
