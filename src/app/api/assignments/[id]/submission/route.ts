import type {RowDataPacket} from "mysql2/promise";
import {getDb} from "@/lib/server/db";
import {AuthError} from "@/lib/server/auth-http";
import {isCr} from "@/lib/server/session";
import {materialId} from "@/lib/server/material-files";
import {assignmentUser,assignmentFailure} from "@/lib/server/assignment-http";
import {readSubmission} from "@/lib/server/assignment-files";
export const runtime="nodejs";export const dynamic="force-dynamic";
export async function GET(req:Request,ctx:{params:Promise<{id:string}>}){try{
 const u=await assignmentUser();const id=materialId((await ctx.params).id);const target=new URL(req.url).searchParams.get('userId');
 const userId=target===null?u.id:Number(target);if(!Number.isSafeInteger(userId)||userId<1)throw new AuthError("Invalid student ID.");
 if(userId!==u.id&&!isCr(u.role))throw new AuthError("You can only download your own submission.",403);
 const [rows]=await getDb().execute<RowDataPacket[]>(`SELECT s.file_id,s.file_name FROM assignment_submissions s JOIN assignments a ON a.id=s.assignment_id JOIN users owner ON owner.id=s.user_id WHERE a.id=? AND a.class_id=? AND a.deleted_at IS NULL AND s.user_id=? AND owner.class_id=a.class_id`,[id,u.class_id,userId]);
 if(!rows.length)throw new AuthError("Submission not found.",404);let bytes:Buffer;try{bytes=await readSubmission(rows[0].file_id);}catch{throw new AuthError("Submission file is missing from server storage.",404);}
 const name=encodeURIComponent(rows[0].file_name).replace(/['()*]/g,c=>'%'+c.charCodeAt(0).toString(16));
 return new Response(new Uint8Array(bytes),{headers:{'Content-Type':'application/octet-stream','Content-Disposition':`attachment; filename="submission"; filename*=UTF-8''${name}`,'Content-Length':String(bytes.length),'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':"sandbox; default-src 'none'"}});
 }catch(e){return assignmentFailure(e);}}
