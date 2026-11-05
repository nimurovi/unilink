import {randomUUID} from "node:crypto";
import type {RowDataPacket,ResultSetHeader} from "mysql2/promise";
import {getDb} from "@/lib/server/db";
import {isCr} from "@/lib/server/session";
import {AuthError,json} from "@/lib/server/auth-http";
import {materialId} from "@/lib/server/material-files";
import {announcementUser,announcementFailure,announcementJson,validateAnnouncement,announcementVersion} from "@/lib/server/announcements";
export const runtime="nodejs";export const dynamic="force-dynamic";
export async function GET(){try{
 const u=await announcementUser();const [rows]=await getDb().execute<RowDataPacket[]>("SELECT a.id,a.title,a.message,a.category,a.pinned,a.version,a.created_at,a.updated_at,u.full_name AS author FROM class_announcements a JOIN users u ON u.id=a.author_id WHERE a.class_id=? ORDER BY a.pinned DESC,a.created_at DESC,a.id DESC",[u.class_id]);
 const [classes]=await getDb().execute<RowDataPacket[]>("SELECT department,batch,section FROM classes WHERE id=?",[u.class_id]);
 return json({entries:rows.map(r=>({id:r.id,title:r.title,message:r.message,category:r.category,pinned:!!r.pinned,version:r.version,author:r.author,createdAt:new Date(r.created_at).toISOString(),updatedAt:new Date(r.updated_at).toISOString()})),canManage:isCr(u.role),classLabel:classes[0]?[classes[0].department,classes[0].batch,classes[0].section].join(' · '):'Your class'});
 }catch(e){return announcementFailure(e);}}
export async function POST(req:Request){try{const b=await announcementJson(req),u=await announcementUser(true),v=validateAnnouncement(b),id=randomUUID();
 await getDb().execute("INSERT INTO class_announcements (id,class_id,author_id,title,message,category,pinned,created_at,updated_at) VALUES (?,?,?,?,?,?,?,UTC_TIMESTAMP(),UTC_TIMESTAMP())",[id,u.class_id,u.id,v.title,v.message,v.category,v.pinned?1:0]);return json({ok:true,id},201);
 }catch(e){return announcementFailure(e);}}
async function change(req:Request,remove=false){try{const b=await announcementJson(req),u=await announcementUser(true),id=materialId(String(b.id||'')),version=announcementVersion(b.version);
 let result:ResultSetHeader;
 if(remove){[result]=await getDb().execute<ResultSetHeader>("DELETE FROM class_announcements WHERE id=? AND class_id=? AND version=?",[id,u.class_id,version]);}
 else {const v=validateAnnouncement(b);[result]=await getDb().execute<ResultSetHeader>("UPDATE class_announcements SET title=?,message=?,category=?,pinned=?,version=version+1,updated_at=UTC_TIMESTAMP() WHERE id=? AND class_id=? AND version=?",[v.title,v.message,v.category,v.pinned?1:0,id,u.class_id,version]);}
 if(result.affectedRows!==1)throw new AuthError("This announcement changed or is no longer available. Refresh and reopen it.",409);
 return json({ok:true});}catch(e){return announcementFailure(e);}}
export async function PATCH(req:Request){return change(req);}
export async function DELETE(req:Request){return change(req,true);}
