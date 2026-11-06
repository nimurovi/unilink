import {randomUUID} from "node:crypto";
import type {RowDataPacket,ResultSetHeader} from "mysql2/promise";
import {getDb} from "@/lib/server/db";
import {isCr} from "@/lib/server/session";
import {AuthError,json} from "@/lib/server/auth-http";
import {materialId} from "@/lib/server/material-files";
import {opportunityUser,opportunityFailure,opportunityJson,validateOpportunity,opportunityVersion} from "@/lib/server/opportunities";
export const runtime="nodejs";export const dynamic="force-dynamic";
export async function GET(){try{
 const u=await opportunityUser();const [rows]=await getDb().execute<RowDataPacket[]>("SELECT a.id,a.title,a.description,a.category,a.organization,a.location,a.application_url,DATE_FORMAT(a.deadline,'%Y-%m-%d') AS deadline,a.closed,a.version,a.created_at,a.updated_at,u.full_name AS author FROM class_opportunities a JOIN users u ON u.id=a.author_id WHERE a.class_id=? ORDER BY a.created_at DESC,a.id DESC",[u.class_id]);
 const [classes]=await getDb().execute<RowDataPacket[]>("SELECT department,batch,section FROM classes WHERE id=?",[u.class_id]);
 return json({entries:rows.map(r=>({id:r.id,title:r.title,description:r.description,category:r.category,organization:r.organization,location:r.location,applicationUrl:r.application_url,deadline:r.deadline||'',closed:!!r.closed,version:r.version,author:r.author,createdAt:new Date(r.created_at).toISOString(),updatedAt:new Date(r.updated_at).toISOString()})),canManage:isCr(u.role),classLabel:classes[0]?[classes[0].department,classes[0].batch,classes[0].section].join(' · '):'Your class'});
 }catch(e){return opportunityFailure(e);}}
export async function POST(req:Request){try{const b=await opportunityJson(req),u=await opportunityUser(true),v=validateOpportunity(b),id=randomUUID();
 await getDb().execute("INSERT INTO class_opportunities (id,class_id,author_id,title,description,category,organization,location,application_url,deadline,closed,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,UTC_TIMESTAMP(),UTC_TIMESTAMP())",[id,u.class_id,u.id,v.title,v.description,v.category,v.organization,v.location,v.applicationUrl,v.deadline||null,v.closed?1:0]);return json({ok:true,id},201);
 }catch(e){return opportunityFailure(e);}}
async function change(req:Request,remove=false){try{const b=await opportunityJson(req),u=await opportunityUser(true),id=materialId(String(b.id||'')),version=opportunityVersion(b.version);
 let result:ResultSetHeader;
 if(remove){[result]=await getDb().execute<ResultSetHeader>("DELETE FROM class_opportunities WHERE id=? AND class_id=? AND version=?",[id,u.class_id,version]);}
 else {const v=validateOpportunity(b);[result]=await getDb().execute<ResultSetHeader>("UPDATE class_opportunities SET title=?,description=?,category=?,organization=?,location=?,application_url=?,deadline=?,closed=?,version=version+1,updated_at=UTC_TIMESTAMP() WHERE id=? AND class_id=? AND version=?",[v.title,v.description,v.category,v.organization,v.location,v.applicationUrl,v.deadline||null,v.closed?1:0,id,u.class_id,version]);}
 if(result.affectedRows!==1)throw new AuthError("This opportunity changed or is no longer available. Refresh and reopen it.",409);
 return json({ok:true});}catch(e){return opportunityFailure(e);}}
export async function PATCH(req:Request){return change(req);}
export async function DELETE(req:Request){return change(req,true);}
