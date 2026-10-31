import {randomUUID} from "node:crypto";
import type {RowDataPacket,ResultSetHeader} from "mysql2/promise";
import {getDb} from "@/lib/server/db";
import {isCr} from "@/lib/server/session";
import {AuthError,json} from "@/lib/server/auth-http";
import {materialId} from "@/lib/server/material-files";
import {routineUser,routineFailure,routineJson,validateRoutine,routineVersion} from "@/lib/server/routine";
export const runtime="nodejs";export const dynamic="force-dynamic";
export async function GET(){try{const u=await routineUser();const [rows]=await getDb().execute<RowDataPacket[]>("SELECT id,course,code,instructor,room,weekday,start_time,end_time,kind,notes,version FROM class_routine WHERE class_id=? ORDER BY weekday,start_time,id",[u.class_id]);
 const [classes]=await getDb().execute<RowDataPacket[]>("SELECT department,batch,section FROM classes WHERE id=?",[u.class_id]);
 return json({entries:rows.map(r=>({id:r.id,course:r.course,code:r.code,instructor:r.instructor,room:r.room,weekday:r.weekday,startTime:r.start_time.slice(0,5),endTime:r.end_time.slice(0,5),kind:r.kind,notes:r.notes,version:r.version})),canManage:isCr(u.role),classLabel:classes[0]?Object.values(classes[0]).join(' · '):'Your class'});
 }catch(e){return routineFailure(e);}}
async function mutate(req:Request,method:'POST'|'PATCH'|'DELETE'){try{
 const b=await routineJson(req),u=await routineUser(true);const id=method==='POST'?randomUUID():materialId(String(b.id||''));const version=method==='POST'?0:routineVersion(b.version);const v=method==='DELETE'?null:validateRoutine(b);
 const db=await getDb().getConnection();try{await db.beginTransaction();
 // Lock the parent class even when its routine is empty, serializing overlap checks.
 const [classes]=await db.execute<RowDataPacket[]>("SELECT id FROM classes WHERE id=? FOR UPDATE",[u.class_id]);if(!classes.length)throw new AuthError("Class not found.",404);
 if(method!=='POST'){const [rows]=await db.execute<RowDataPacket[]>("SELECT version FROM class_routine WHERE id=? AND class_id=?",[id,u.class_id]);if(!rows.length)throw new AuthError("Class entry not found.",404);if(rows[0].version!==version)throw new AuthError("This entry changed. Refresh and reopen it before saving.",409);}
 if(v){const [overlap]=await db.execute<RowDataPacket[]>("SELECT id FROM class_routine WHERE class_id=? AND weekday=? AND id<>? AND start_time<? AND end_time>? LIMIT 1",[u.class_id,v.weekday,id,v.endTime,v.startTime]);if(overlap.length)throw new AuthError("This time overlaps another class in your routine.",409);}
 if(method==='DELETE')await db.execute<ResultSetHeader>("DELETE FROM class_routine WHERE id=? AND class_id=? AND version=?",[id,u.class_id,version]);
 else if(v){const values=[v.course,v.code,v.instructor,v.room,v.weekday,v.startTime,v.endTime,v.kind,v.notes];
 if(method==='POST')await db.execute("INSERT INTO class_routine (course,code,instructor,room,weekday,start_time,end_time,kind,notes,id,class_id,author_id,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,UTC_TIMESTAMP(),UTC_TIMESTAMP())",[...values,id,u.class_id,u.id]);
 else await db.execute("UPDATE class_routine SET course=?,code=?,instructor=?,room=?,weekday=?,start_time=?,end_time=?,kind=?,notes=?,version=version+1,updated_at=UTC_TIMESTAMP() WHERE id=? AND class_id=? AND version=?",[...values,id,u.class_id,version]);}
 await db.commit();return json({ok:true,id},method==='POST'?201:200);
 }catch(e){await db.rollback();throw e;}finally{db.release();}
 }catch(e){return routineFailure(e);}}
export async function POST(req:Request){return mutate(req,'POST');}
export async function PATCH(req:Request){return mutate(req,'PATCH');}
export async function DELETE(req:Request){return mutate(req,'DELETE');}
