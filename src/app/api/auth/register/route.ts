import { RegistrationError, validateRegistration } from "@/lib/registration";
import { registerAccount } from "@/lib/server/register-account";

export const runtime = "nodejs";

// A bounded single-process limit for local development. Before public deployment,
// replace this with shared rate limiting at the application/proxy layer.
const registrationGlobal = globalThis as typeof globalThis & {
  unilinkRegistrationLimit?: { started: number; count: number; active: number };
};
const limit = registrationGlobal.unilinkRegistrationLimit ??= {
  started: Date.now(), count: 0, active: 0,
};

function json(body: object, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

async function readBody(request: Request): Promise<unknown> {
  if (!request.body) throw new RegistrationError("Registration details are missing.");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 8192) {
        await reader.cancel();
        throw new RegistrationError("Registration request is too large.", 413);
      }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8")); }
  catch { throw new RegistrationError("Invalid registration request."); }
}

export async function POST(request: Request) {
  const expectedOrigin = process.env.APP_ORIGIN || new URL(request.url).origin;
  if (request.headers.get("origin") !== expectedOrigin) {
    return json({ error: "Please submit registration from the UniLink website." }, 403);
  }
  const contentType = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (contentType !== "application/json") {
    return json({ error: "Registration requires a JSON request." }, 415);
  }
  const now = Date.now();
  if (now - limit.started >= 60000) { limit.started = now; limit.count = 0; }
  if (limit.count >= 20 || limit.active >= 2) {
    return Response.json({ error: "Too many registration attempts. Please try again in a minute." }, {
      status: 429, headers: { "Retry-After": "60", "Cache-Control": "no-store" },
    });
  }
  limit.count++;
  limit.active++;
  try {
    const input = validateRegistration(await readBody(request));
    await registerAccount(input);
    return json({ message: "Your account was created successfully." }, 201);
  } catch (error) {
    if (error instanceof RegistrationError) return json({ error: error.message }, error.status);
    // Do not log form fields, passwords, or SQL statements.
    console.error("Registration failed:", error && typeof error === "object" && "code" in error ? error.code : "INTERNAL_ERROR");
    return json({ error: "Registration is unavailable right now. Please try again shortly." }, 503);
  } finally {
    limit.active--;
  }
}
