import { randomUUID } from "node:crypto";
import type { RowDataPacket } from "mysql2/promise";
import { getDb } from "@/lib/server/db";
import { isCr } from "@/lib/server/session";
import { AuthError,checkOrigin,json } from "@/lib/server/auth-http";
import { materialUser,materialFailure,boundedBody } from "@/lib/server/material-http";
import { MAX_FILE,validateFile,safeFilename,storeFile,discardFile } from "@/lib/server/material-files";
import { MATERIAL_TYPES } from "@/lib/material-types";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function GET(){try{
 const u=await materialUser();
 const [rows]=await getDb().execute<RowDataPacket[]>(`SELECT m.id,m.title,m.course,m.code,m.type,m.description,m.file_name,m.file_size,m.file_ext,m.created_at,u.full_name,u.role,
 CASE WHEN s.user_id IS NULL THEN 0 ELSE 1 END AS saved
 FROM class_materials m JOIN users u ON u.id=m.author_id
 LEFT JOIN saved_materials s ON s.material_id=m.id AND s.user_id=?
 WHERE m.class_id=? AND m.deleted_at IS NULL ORDER BY m.created_at DESC,m.id DESC`,[u.id,u.class_id]);
 const materials=rows.map(m=>({id:m.id,title:m.title,course:m.course,code:m.code,type:m.type,description:m.description,fileName:m.file_name,
 size:(m.file_size/1024/1024).toFixed(2)+" MB",ext:m.file_ext,uploader:m.full_name,uploaderRole:m.role==="admin"?"admin":"cr",color:"#2563EB",
 createdAt:new Date(m.created_at).toISOString(),uploadedAgo:new Date(m.created_at).toISOString(),uploadedDate:new Date(m.created_at).toISOString().slice(0,10)}));
 return json({materials,savedIds:rows.filter(m=>m.saved).map(m=>m.id),canManage:isCr(u.role)});
 }catch(e){return materialFailure(e);}}
export async function POST(req:Request){try{
 checkOrigin(req);const u=await materialUser(true);
 const contentType=req.headers.get("content-type")||"";
 if(!contentType.startsWith("multipart/form-data;"))throw new AuthError("Choose a file using the upload form.",415);
 const raw=await boundedBody(req,MAX_FILE+65536);
 let form:FormData;try{form=await new Response(new Uint8Array(raw),{headers:{"Content-Type":contentType}}).formData();}catch{throw new AuthError("Invalid upload form.");}
 const text=(key:string,max:number,optional=false)=>{const v=form.get(key);if(typeof v!=="string"||v.length>max||(!optional&&!v.trim()))throw new AuthError(`Please check ${key} (maximum ${max} characters).`);return v.trim();};
 const title=text("title",200),course=text("course",100),code=text("code",100),type=text("type",30),description=text("description",2000,true);
 if(!MATERIAL_TYPES.some(t=>t===type))throw new AuthError("Choose a material category.");
 const file=form.get("file");if(!file||typeof file==='string')throw new AuthError("Choose a file.");
 const bytes=Buffer.from(await file.arrayBuffer());const name=safeFilename(file.name);const ext=validateFile(name,bytes);const id=randomUUID();
 await storeFile(id,bytes);
 try{await getDb().execute("INSERT INTO class_materials (id,class_id,author_id,title,course,code,type,description,file_name,file_size,file_ext,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,UTC_TIMESTAMP())",[id,u.class_id,u.id,title,course,code,type,description,name,bytes.length,ext]);}
 catch(e){await discardFile(id).catch(()=>{});throw e;}
 return json({id},201);
 }catch(e){return materialFailure(e);}}
