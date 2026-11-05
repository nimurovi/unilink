import {randomUUID} from "node:crypto";
import type {RowDataPacket,ResultSetHeader} from "mysql2/promise";
import {getDb} from "@/lib/server/db";
import {isCr} from "@/lib/server/session";
import {AuthError,json} from "@/lib/server/auth-http";
import {materialId} from "@/lib/server/material-files";
import {examUser,examFailure,examJson,validateExam,examVersion} from "@/lib/server/exams";
export const runtime="nodejs";export const dynamic="force-dynamic";
export async function GET(){try{const u=await examUser();const [rows]=await getDb().execute<RowDataPacket[]>("SELECT id,title,course,code,instructor,room,DATE_FORMAT(exam_date,'%Y-%m-%d') AS exam_date,start_time,end_time,kind,syllabus,instructions,cancelled,version FROM class_exams WHERE class_id=? ORDER BY exam_date,start_time,id",[u.class_id]);
 const [classes]=await getDb().execute<RowDataPacket[]>("SELECT department,batch,section FROM classes WHERE id=?",[u.class_id]);
 return json({entries:rows.map(r=>({id:r.id,title:r.title,course:r.course,code:r.code,instructor:r.instructor,room:r.room,examDate:r.exam_date,startTime:r.start_time.slice(0,5),endTime:r.end_time.slice(0,5),kind:r.kind,syllabus:r.syllabus,instructions:r.instructions,cancelled:!!r.cancelled,version:r.version})),canManage:isCr(u.role),classLabel:classes[0]?[classes[0].department,classes[0].batch,classes[0].section].join(' · '):'Your class'});
 }catch(e){return examFailure(e);}}
async function mutate(req:Request,method:'POST'|'PATCH'|'DELETE'){try{
 const b=await examJson(req),u=await examUser(true);const id=method==='POST'?randomUUID():materialId(String(b.id||''));const version=method==='POST'?0:examVersion(b.version);const v=method==='DELETE'?null:validateExam(b);
 const db=await getDb().getConnection();try{await db.beginTransaction();
 // Lock the parent class even when its exam is empty, serializing overlap checks.
 const [classes]=await db.execute<RowDataPacket[]>("SELECT id FROM classes WHERE id=? FOR UPDATE",[u.class_id]);if(!classes.length)throw new AuthError("Class not found.",404);
 if(method!=='POST'){const [rows]=await db.execute<RowDataPacket[]>("SELECT version FROM class_exams WHERE id=? AND class_id=?",[id,u.class_id]);if(!rows.length)throw new AuthError("Exam not found.",404);if(rows[0].version!==version)throw new AuthError("This entry changed. Refresh and reopen it before saving.",409);}
 if(v&&!v.cancelled){const [overlap]=await db.execute<RowDataPacket[]>("SELECT id FROM class_exams WHERE class_id=? AND exam_date=? AND cancelled=0 AND id<>? AND start_time<? AND end_time>? LIMIT 1",[u.class_id,v.examDate,id,v.endTime,v.startTime]);if(overlap.length)throw new AuthError("This time overlaps another exam for your class.",409);}
 if(method==='DELETE')await db.execute<ResultSetHeader>("DELETE FROM class_exams WHERE id=? AND class_id=? AND version=?",[id,u.class_id,version]);
 else if(v){const values=[v.title,v.course,v.code,v.instructor,v.room,v.examDate,v.startTime,v.endTime,v.kind,v.syllabus,v.instructions,v.cancelled?1:0];
 if(method==='POST')await db.execute("INSERT INTO class_exams (title,course,code,instructor,room,exam_date,start_time,end_time,kind,syllabus,instructions,cancelled,id,class_id,author_id,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,UTC_TIMESTAMP(),UTC_TIMESTAMP())",[...values,id,u.class_id,u.id]);
 else await db.execute("UPDATE class_exams SET title=?,course=?,code=?,instructor=?,room=?,exam_date=?,start_time=?,end_time=?,kind=?,syllabus=?,instructions=?,cancelled=?,version=version+1,updated_at=UTC_TIMESTAMP() WHERE id=? AND class_id=? AND version=?",[...values,id,u.class_id,version]);}
 await db.commit();return json({ok:true,id},method==='POST'?201:200);
 }catch(e){await db.rollback();throw e;}finally{db.release();}
 }catch(e){return examFailure(e);}}
export async function POST(req:Request){return mutate(req,'POST');}
export async function PATCH(req:Request){return mutate(req,'PATCH');}
export async function DELETE(req:Request){return mutate(req,'DELETE');}
