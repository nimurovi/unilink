import type { RowDataPacket } from "mysql2/promise";
import { getDb } from "@/lib/server/db";
import { verifyPassword } from "@/lib/server/password";
import { createSession, isCr } from "@/lib/server/session";
import { AuthError, checkOrigin, readJson, json, authFailure } from "@/lib/server/auth-http";
export const runtime = "nodejs";
// Local single-server protection. Replace with shared limits before public hosting.
const authGlobal = globalThis as typeof globalThis & { unilinkLoginLimit?: { start: number; count: number; active: number } };
const limit = authGlobal.unilinkLoginLimit ??= { start: Date.now(), count: 0, active: 0 };
interface LoginUser extends RowDataPacket { id: number; password_hash: string; role: string; is_active: number }
const dummyHash = "scrypt$32768$8$3$" + "0".repeat(32) + "$" + "0".repeat(128);
export async function POST(request: Request) {
  let acquired = false;
  try {
    checkOrigin(request);
    if (Date.now() - limit.start >= 60000) { limit.start = Date.now(); limit.count = 0; }
    if (limit.count >= 20 || limit.active >= 2) {
      const response = json({ error: "Too many login attempts. Try again in one minute." }, 429);
      response.headers.set("Retry-After", "60"); return response;
    }
    limit.count++; limit.active++; acquired = true;
    const body = await readJson(request);
    if (typeof body.identifier !== "string" || !body.identifier.trim() || body.identifier.length > 254 ||
        typeof body.password !== "string" || !body.password || body.password.length > 128 ||
        (body.portal !== "student" && body.portal !== "cr")) throw new AuthError("Enter your email or student ID and password.");
    const identifier = body.identifier.trim();
    const column = identifier.includes("@") ? "email" : "student_id";
    const [rows] = await getDb().execute<LoginUser[]>(
      `SELECT id, password_hash, role, is_active FROM users WHERE ${column} = ? LIMIT 1`,
      [column === "email" ? identifier.toLowerCase() : identifier]);
    const user = rows[0];
    const valid = await verifyPassword(body.password, user?.password_hash ?? dummyHash);
    if (!user || !valid || !user.is_active) throw new AuthError("Incorrect email, student ID, or password.", 401);
    if (body.portal === "cr" && !isCr(user.role)) throw new AuthError("This account does not have CR access. Choose Student Login.", 403);
    await createSession(user.id);
    return json({ redirect: body.portal === "cr" ? "/cr-portal" : "/dashboard" });
  } catch (error) { return authFailure(error); }
  finally { if (acquired) limit.active--; }
}
