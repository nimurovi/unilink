import type { ResultSetHeader,RowDataPacket } from "mysql2/promise";
import { getDb } from "@/lib/server/db";
import { AuthError,checkOrigin,json,readJson } from "@/lib/server/auth-http";
import { materialUser,materialFailure } from "@/lib/server/material-http";
import { materialId } from "@/lib/server/material-files";
export const runtime="nodejs";
export const dynamic="force-dynamic";
type Context={params:Promise<{id:string}>};
export async function DELETE(req:Request,ctx:Context){try{
 checkOrigin(req);const u=await materialUser(true);const id=materialId((await ctx.params).id);
 const [result]=await getDb().execute<ResultSetHeader>("UPDATE class_materials SET deleted_at=UTC_TIMESTAMP() WHERE id=? AND class_id=? AND deleted_at IS NULL",[id,u.class_id]);
 if(!result.affectedRows)throw new AuthError("Material not found.",404);
 return json({ok:true});
 }catch(e){return materialFailure(e);}}
export async function PATCH(req:Request,ctx:Context){try{
 checkOrigin(req);const u=await materialUser();const id=materialId((await ctx.params).id);const b=await readJson(req);
 if(typeof b.saved!=="boolean")throw new AuthError("Choose save or unsave.");
 const [rows]=await getDb().execute<RowDataPacket[]>("SELECT id FROM class_materials WHERE id=? AND class_id=? AND deleted_at IS NULL",[id,u.class_id]);
 if(!rows.length)throw new AuthError("Material not found.",404);
 if(b.saved)await getDb().execute("INSERT IGNORE INTO saved_materials (user_id,material_id) VALUES (?,?)",[u.id,id]);
 else await getDb().execute("DELETE FROM saved_materials WHERE user_id=? AND material_id=?",[u.id,id]);
 return json({ok:true});
 }catch(e){return materialFailure(e);}}
