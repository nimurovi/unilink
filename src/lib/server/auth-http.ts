import "server-only";
export class AuthError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}
export function checkOrigin(request: Request) {
  const origin = process.env.APP_ORIGIN;
  if (!origin || request.headers.get("origin") !== origin) {
    throw new AuthError("Please use the UniLink address configured in APP_ORIGIN.", 403);
  }
}
export function json(body: object, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}
export async function readJson(request: Request): Promise<Record<string, unknown>> {
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json")
    throw new AuthError("A JSON request is required.", 415);
  if (!request.body) throw new AuthError("Please enter your login details.");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 4096) { await reader.cancel(); throw new AuthError("Request too large.", 413); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  try {
    const body: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error();
    return body as Record<string, unknown>;
  } catch { throw new AuthError("Invalid login request."); }
}
export function authFailure(error: unknown) {
  if (error instanceof AuthError) return json({ error: error.message }, error.status);
  console.error("Authentication unavailable");
  return json({ error: "Authentication is unavailable. Check that MySQL is running and try again." }, 503);
}
