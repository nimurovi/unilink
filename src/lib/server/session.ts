import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { RowDataPacket } from "mysql2/promise";
import { getDb } from "./db";

export const COOKIE_NAME = "unilink_session";
const LIFETIME = 60 * 60 * 24 * 7;
export interface SessionUser extends RowDataPacket {
  id: number; class_id: number; full_name: string; role: "student" | "cr" | "admin";
}
export function tokenHash(token: string) { return createHash("sha256").update(token).digest("hex"); }
export function isCr(role: string) { return role === "cr" || role === "admin"; }
export function cookieOptions() {
  return { httpOnly: true, secure: process.env.APP_ORIGIN?.startsWith("https://") ?? false,
    sameSite: "lax" as const, path: "/", maxAge: LIFETIME };
}
export async function createSession(userId: number) {
  const jar = await cookies();
  const oldToken = jar.get(COOKIE_NAME)?.value;
  const token = randomBytes(32).toString("hex");
  const connection = await getDb().getConnection();
  try {
    await connection.beginTransaction();
    if (oldToken && /^[a-f0-9]{64}$/.test(oldToken))
      await connection.execute("DELETE FROM sessions WHERE token_hash = ?", [tokenHash(oldToken)]);
    await connection.execute("DELETE FROM sessions WHERE user_id = ? AND expires_at <= UTC_TIMESTAMP()", [userId]);
    await connection.execute("INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, DATE_ADD(UTC_TIMESTAMP(), INTERVAL 7 DAY))", [tokenHash(token), userId]);
    await connection.commit();
  } catch (error) { await connection.rollback(); throw error; }
  finally { connection.release(); }
  jar.set(COOKIE_NAME, token, cookieOptions());
}
export async function getSessionUser(): Promise<SessionUser | null> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const [rows] = await getDb().execute<SessionUser[]>(
    `SELECT u.id, u.class_id, u.full_name, u.role FROM sessions s
     JOIN users u ON u.id = s.user_id
     WHERE s.token_hash = ? AND s.expires_at > UTC_TIMESTAMP() AND u.is_active = 1 LIMIT 1`,
    [tokenHash(token)]);
  return rows[0] ?? null;
}
export async function requireUser(crOnly = false) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (crOnly && !isCr(user.role)) redirect("/dashboard?access=cr-required");
  return user;
}
export async function destroySession() {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (token && /^[a-f0-9]{64}$/.test(token))
    await getDb().execute("DELETE FROM sessions WHERE token_hash = ?", [tokenHash(token)]);
  jar.set(COOKIE_NAME, "", { ...cookieOptions(), maxAge: 0 });
}
