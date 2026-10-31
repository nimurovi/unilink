import type { RowDataPacket } from "mysql2/promise";
import { getDb } from "@/lib/server/db";
import { AuthError } from "@/lib/server/auth-http";
import { materialUser,materialFailure } from "@/lib/server/material-http";
import { materialId,loadFile } from "@/lib/server/material-files";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function GET(req:Request,ctx:{params:Promise<{id:string}>}){try{
 const u=await materialUser();const id=materialId((await ctx.params).id);
 const [rows]=await getDb().execute<RowDataPacket[]>("SELECT file_name FROM class_materials WHERE id=? AND class_id=? AND deleted_at IS NULL",[id,u.class_id]);
 if(!rows.length)throw new AuthError("Material not found.",404);
 let bytes:Buffer;try{bytes=await loadFile(id);}catch{throw new AuthError("The file is missing from server storage. Ask your CR to upload it again.",404);}
 const filename=encodeURIComponent(rows[0].file_name).replace(/['()*]/g,c=>'%'+c.charCodeAt(0).toString(16));
 return new Response(new Uint8Array(bytes),{headers:{"Content-Type":"application/octet-stream","Content-Length":String(bytes.length),"Content-Disposition":`attachment; filename="material"; filename*=UTF-8''${filename}`,"Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff","Content-Security-Policy":"sandbox; default-src 'none'"}});
 }catch(e){return materialFailure(e);}}
