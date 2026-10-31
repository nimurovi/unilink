import type {RowDataPacket,ResultSetHeader} from "mysql2/promise";
import {getDb} from "@/lib/server/db";
import {isCr} from "@/lib/server/session";
import {json,AuthError} from "@/lib/server/auth-http";
import {materialId} from "@/lib/server/material-files";
import {assignmentUser,assignmentFailure,assignmentJson} from "@/lib/server/assignment-http";
import {selection,present,validateAssignment,checkMaterial,fields,assignmentVersion} from "@/lib/server/assignments";
export const runtime="nodejs";export const dynamic="force-dynamic";
type Ctx={params:Promise<{id:string}>};
export async function GET(req:Request,ctx:Ctx){try{const u=await assignmentUser();const id=materialId((await ctx.params).id);const [rows]=await getDb().execute<RowDataPacket[]>(selection+" WHERE a.id=? AND a.class_id=? AND a.deleted_at IS NULL",[u.id,id,u.class_id]);if(!rows.length)throw new AuthError("Assignment not found.",404);return json({assignment:present(rows[0]),canManage:isCr(u.role)});}catch(e){return assignmentFailure(e);}}
export async function PATCH(req:Request,ctx:Ctx){try{
 const b=await assignmentJson(req);const u=await assignmentUser(true);const id=materialId((await ctx.params).id),version=assignmentVersion(b.version),v=validateAssignment(b);const db=await getDb().getConnection();
 try{await db.beginTransaction();await checkMaterial(db,v.materialId,u.class_id);const [result]=await db.execute<ResultSetHeader>("UPDATE assignments SET title=?,course=?,code=?,instructor=?,description=?,due_at=?,total_marks=?,max_attempts=?,allow_late=?,material_id=?,version=version+1 WHERE id=? AND class_id=? AND version=? AND deleted_at IS NULL",[...fields(v),id,u.class_id,version]);if(!result.affectedRows)throw new AuthError("Assignment changed or was removed. Refresh before editing.",409);await db.commit();}catch(e){await db.rollback();throw e;}finally{db.release();}
 return json({ok:true});
 }catch(e){return assignmentFailure(e);}}
export async function DELETE(req:Request,ctx:Ctx){try{
 const b=await assignmentJson(req);const u=await assignmentUser(true);const id=materialId((await ctx.params).id);
 const [result]=await getDb().execute<ResultSetHeader>("UPDATE assignments SET deleted_at=UTC_TIMESTAMP(),version=version+1 WHERE id=? AND class_id=? AND version=? AND deleted_at IS NULL",[id,u.class_id,assignmentVersion(b.version)]);
 if(!result.affectedRows)throw new AuthError("Assignment changed or was removed. Refresh and retry.",409);return json({ok:true});
 }catch(e){return assignmentFailure(e);}}
