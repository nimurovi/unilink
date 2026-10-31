import {randomUUID} from "node:crypto";
import type {RowDataPacket} from "mysql2/promise";
import {getDb} from "@/lib/server/db";
import {AuthError,json,checkOrigin} from "@/lib/server/auth-http";
import {materialId} from "@/lib/server/material-files";
import {boundedBody} from "@/lib/server/material-http";
import {assignmentUser,assignmentFailure} from "@/lib/server/assignment-http";
import {storeSubmission,discardSubmission,validateFile,safeFilename,MAX_FILE} from "@/lib/server/assignment-files";
export const runtime="nodejs";export const dynamic="force-dynamic";
type Ctx={params:Promise<{id:string}>};
export async function GET(req:Request,ctx:Ctx){try{
 const u=await assignmentUser(true);const id=materialId((await ctx.params).id);
 const [assignments]=await getDb().execute<RowDataPacket[]>("SELECT id FROM assignments WHERE id=? AND class_id=? AND deleted_at IS NULL",[id,u.class_id]);if(!assignments.length)throw new AuthError("Assignment not found.",404);
 const [rows]=await getDb().execute<RowDataPacket[]>(`SELECT s.user_id,u.full_name,u.student_id,s.file_name,s.file_size,s.attempts,s.note,s.is_late,s.submitted_at FROM assignment_submissions s JOIN users u ON u.id=s.user_id JOIN assignments a ON a.id=s.assignment_id WHERE a.id=? AND a.class_id=? AND a.deleted_at IS NULL AND u.class_id=a.class_id ORDER BY s.submitted_at DESC`,[id,u.class_id]);
 return json({submissions:rows.map(s=>({...s,submitted_at:new Date(s.submitted_at).toISOString(),is_late:!!s.is_late}))});
 }catch(e){return assignmentFailure(e);}}
export async function POST(req:Request,ctx:Ctx){let staged:string|null=null;try{
 checkOrigin(req);const u=await assignmentUser();const id=materialId((await ctx.params).id);
 // Reject inaccessible assignments before reading file data.
 const [visible]=await getDb().execute<RowDataPacket[]>("SELECT id FROM assignments WHERE id=? AND class_id=? AND deleted_at IS NULL",[id,u.class_id]);if(!visible.length)throw new AuthError("Assignment not found.",404);
 const contentType=req.headers.get('content-type')||'';if(!contentType.startsWith('multipart/form-data;'))throw new AuthError("Choose a submission file.",415);
 const raw=await boundedBody(req,MAX_FILE+65536);let form:FormData;try{form=await new Response(new Uint8Array(raw),{headers:{'Content-Type':contentType}}).formData();}catch{throw new AuthError("Invalid submission form.");}
 const file=form.get('file'),note=form.get('note'),expected=Number(form.get('version'));
 if(!file||typeof file==='string')throw new AuthError("Choose a file.");if(typeof note!=='string'||note.length>2000)throw new AuthError("Keep your note below 2,000 characters.");
 if(!Number.isInteger(expected)||expected<1)throw new AuthError("Refresh the assignment first.");
 const bytes=Buffer.from(await file.arrayBuffer()),name=safeFilename(file.name);validateFile(name,bytes);const fileId=randomUUID();
 await storeSubmission(fileId,bytes);staged=fileId;const db=await getDb().getConnection();
 try{await db.beginTransaction();
 // Serializes submissions, edits and removal for this assignment.
 const [rows]=await db.execute<RowDataPacket[]>("SELECT *,due_at<=UTC_TIMESTAMP() AS past_due FROM assignments WHERE id=? AND class_id=? AND deleted_at IS NULL FOR UPDATE",[id,u.class_id]);
 const a=rows[0];if(!a)throw new AuthError("Assignment not found.",404);if(a.version!==expected)throw new AuthError("Assignment details changed. Refresh before submitting.",409);
 if(a.past_due&&!a.allow_late)throw new AuthError("The deadline has passed. Late submissions are not allowed.",409);
 const [previous]=await db.execute<RowDataPacket[]>("SELECT attempts FROM assignment_submissions WHERE assignment_id=? AND user_id=?",[id,u.id]);
 if((previous[0]?.attempts||0)>=a.max_attempts)throw new AuthError("You have reached the submission attempt limit.",409);
 await db.execute(`INSERT INTO assignment_submissions (assignment_id,user_id,file_id,file_name,file_size,note,attempts,submitted_at,is_late) VALUES (?,?,?,?,?,?,1,UTC_TIMESTAMP(),?) ON DUPLICATE KEY UPDATE file_id=VALUES(file_id),file_name=VALUES(file_name),file_size=VALUES(file_size),note=VALUES(note),attempts=attempts+1,submitted_at=UTC_TIMESTAMP(),is_late=VALUES(is_late)`,[id,u.id,fileId,name,bytes.length,note.trim(),a.past_due?1:0]);
 await db.commit();staged=null;
 }catch(e){await db.rollback();throw e;}finally{db.release();}
 return json({ok:true},201);
 }catch(e){if(staged)await discardSubmission(staged).catch(()=>{});return assignmentFailure(e);}}
