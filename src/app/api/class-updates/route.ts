import { getDb } from "@/lib/server/db";
import { getSessionUser, isCr } from "@/lib/server/session";
import { AuthError, checkOrigin, json } from "@/lib/server/auth-http";
import { appearance, type ClassUpdateType } from "@/lib/class-update-types";
import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
async function user(write = false) {
 const u = await getSessionUser();
 if (!u) throw new AuthError("Please sign in again.", 401);
 if (write && !isCr(u.role)) throw new AuthError("Only a CR or admin can change class updates.", 403);
 return u;
}
function failure(e: unknown) {
 if (e instanceof AuthError) return json({ error: e.message }, e.status);
 return json({ error: "Class updates are unavailable. Check MySQL and the class_updates table, then retry." }, 503);
}
async function body(req: Request) {
 checkOrigin(req);
 if (req.headers.get("content-type")?.split(";")[0].trim() !== "application/json") throw new AuthError("JSON is required.",415);
 const reader=req.body?.getReader(); if(!reader) throw new AuthError("Missing request.");
 const chunks: Uint8Array[]=[]; let size=0;
 try { while(true) { const x=await reader.read(); if(x.done) break; size+=x.value.byteLength;
 if(size>20000) {await reader.cancel();throw new AuthError("Request too large.",413);} chunks.push(x.value); } }
 finally {reader.releaseLock();}
 try {const b=JSON.parse(Buffer.concat(chunks).toString("utf8")); if(!b || typeof b!=="object" || Array.isArray(b)) throw new Error(); return b as Record<string,unknown>;}
 catch {throw new AuthError("Invalid JSON.");}
}
function field(b:Record<string,unknown>, key:string,max:number,optional=false) {
 const v=b[key]; if(typeof v!=="string" || v.length>max || (!optional && !v.trim())) throw new AuthError(`Invalid ${key}. Maximum ${max} characters.`);
 return v.trim();
}
function id(b:Record<string,unknown>) {const v=field(b,"id",36);if(!/^[a-f0-9-]{36}$/i.test(v))throw new AuthError("Invalid update ID.");return v;}
function version(b:Record<string,unknown>) {if(!Number.isSafeInteger(b.version) || Number(b.version)<1)throw new AuthError("Refresh before editing.");return Number(b.version);}
export async function GET() {try {
 const u=await user();
 const [rows]=await getDb().execute<RowDataPacket[]>("SELECT id, code, type, detail, note, status, version, created_at FROM class_updates WHERE class_id = ? ORDER BY created_at DESC, id DESC",[u.class_id]);
 const updates=rows.map(r=>({id:r.id,code:r.code,type:r.type,detail:r.detail,note:r.note,status:r.status,version:r.version,time:new Date(r.created_at).toISOString(),...appearance[r.type as ClassUpdateType]}));
 return json({updates});
 }catch(e){return failure(e);} }
export async function POST(req:Request) {try {
 const b=await body(req);const u=await user(true);const key=id(b);
 const code=field(b,"code",100), type=field(b,"type",50), detail=field(b,"detail",2000), note=field(b,"note",2000,true);
 if(!Object.prototype.hasOwnProperty.call(appearance,type))throw new AuthError("Invalid update type.");
 try {await getDb().execute("INSERT INTO class_updates (id,class_id,author_id,code,type,detail,note,created_at) VALUES (?,?,?,?,?,?,?,UTC_TIMESTAMP())",[key,u.class_id,u.id,code,type,detail,note]);}
 catch(e) {if((e as {code?:string}).code!=="ER_DUP_ENTRY")throw e;
 const [rows]=await getDb().execute<RowDataPacket[]>("SELECT id FROM class_updates WHERE id=? AND class_id=? AND author_id=? AND code=? AND type=? AND detail=? AND note=?",[key,u.class_id,u.id,code,type,detail,note]);
 if(!rows.length)throw new AuthError("This request conflicts with an existing update.",409);}
 return json({ok:true},201);
 }catch(e){return failure(e);} }
export async function PATCH(req:Request) {try {
 const b=await body(req);const u=await user(true);
 const [result]=await getDb().execute<ResultSetHeader>("UPDATE class_updates SET detail=?, version=version+1 WHERE id=? AND class_id=? AND version=?",[field(b,"detail",2000),id(b),u.class_id,version(b)]);
 if(!result.affectedRows)throw new AuthError("Update changed or was deleted. Refresh and try again.",409);
 return json({ok:true});
 }catch(e){return failure(e);} }
export async function DELETE(req:Request) {try {
 const b=await body(req);const u=await user(true);
 const [result]=await getDb().execute<ResultSetHeader>("DELETE FROM class_updates WHERE id=? AND class_id=? AND version=?",[id(b),u.class_id,version(b)]);
 if(!result.affectedRows)throw new AuthError("Update changed or was deleted. Refresh and try again.",409);
 return json({ok:true});
 }catch(e){return failure(e);} }
