import {randomUUID} from "node:crypto";
import type {RowDataPacket} from "mysql2/promise";
import {getDb} from "@/lib/server/db";
import {isCr} from "@/lib/server/session";
import {json} from "@/lib/server/auth-http";
import {assignmentUser,assignmentFailure,assignmentJson} from "@/lib/server/assignment-http";
import {selection,present,validateAssignment,checkMaterial,fields} from "@/lib/server/assignments";
export const runtime="nodejs";export const dynamic="force-dynamic";
export async function GET(){try{const u=await assignmentUser();const [rows]=await getDb().execute<RowDataPacket[]>(selection+" WHERE a.class_id=? AND a.deleted_at IS NULL ORDER BY a.due_at,a.id",[u.id,u.class_id]);return json({assignments:rows.map(present),canManage:isCr(u.role)});}catch(e){return assignmentFailure(e);}}
export async function POST(req:Request){try{
 const b=await assignmentJson(req);const u=await assignmentUser(true);const v=validateAssignment(b);const id=randomUUID();const db=await getDb().getConnection();
 try{await db.beginTransaction();await checkMaterial(db,v.materialId,u.class_id);await db.execute("INSERT INTO assignments (id,class_id,author_id,title,course,code,instructor,description,due_at,total_marks,max_attempts,allow_late,material_id,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,UTC_TIMESTAMP())",[id,u.class_id,u.id,...fields(v)]);await db.commit();}catch(e){await db.rollback();throw e;}finally{db.release();}
 return json({id},201);
 }catch(e){return assignmentFailure(e);}}
