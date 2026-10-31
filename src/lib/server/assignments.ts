import "server-only";
import type {RowDataPacket,PoolConnection} from "mysql2/promise";
import {AuthError} from "./auth-http";
import {materialId} from "./material-files";
import {assignmentStatus,dueText,type AssignmentInput,type Assignment} from "../assignment-types";
export function validateAssignment(b:Record<string,unknown>):AssignmentInput {
 const str=(key:string,max:number,optional=false)=>{const v=b[key];if(typeof v!=="string"||v.length>max||(!optional&&!v.trim()))throw new AuthError(`Please check ${key} (maximum ${max} characters).`);return v.trim();};
 const title=str('title',200),course=str('course',100),code=str('code',100),instructor=str('instructor',150),description=str('description',10000);
 const dueAt=str('dueAt',40);const date=new Date(dueAt);
 if(!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:\d{2})$/.test(dueAt)||!Number.isFinite(date.getTime())||date.getUTCFullYear()<2000||date.getUTCFullYear()>2100)throw new AuthError("Enter a valid deadline with timezone.");
 if(!Number.isInteger(b.totalMarks)||Number(b.totalMarks)<0||Number(b.totalMarks)>1000)throw new AuthError("Marks must be between 0 and 1000.");
 if(!Number.isInteger(b.maxAttempts)||Number(b.maxAttempts)<1||Number(b.maxAttempts)>10)throw new AuthError("Attempts must be between 1 and 10.");
 if(typeof b.allowLate!=="boolean")throw new AuthError("Specify whether late submissions are allowed.");
 const attached=b.materialId==null||b.materialId===''?null:materialId(String(b.materialId));
 return {title,course,code,instructor,description,dueAt:date.toISOString(),totalMarks:Number(b.totalMarks),maxAttempts:Number(b.maxAttempts),allowLate:b.allowLate,materialId:attached};
}
export function assignmentVersion(v:unknown){if(!Number.isInteger(v)||Number(v)<1)throw new AuthError("Refresh the assignment before changing it.");return Number(v);}
export async function checkMaterial(db:PoolConnection,id:string|null,classId:number){if(!id)return;const [rows]=await db.execute<RowDataPacket[]>("SELECT id FROM class_materials WHERE id=? AND class_id=? AND deleted_at IS NULL",[id,classId]);if(!rows.length)throw new AuthError("The attached material is unavailable for this class.",400);}
export const selection=`SELECT a.*,s.file_name,s.submitted_at,s.note,s.is_late,s.attempts FROM assignments a
 LEFT JOIN assignment_submissions s ON s.assignment_id=a.id AND s.user_id=?`;
export function present(row:RowDataPacket):Assignment {
 const dueAt=new Date(row.due_at).toISOString();const hasSubmission=!!row.submitted_at;
 return {id:row.id,title:row.title,course:row.course,code:row.code,instructor:row.instructor,description:row.description,color:"#2563EB",dueAt,createdAt:new Date(row.created_at).toISOString(),dueLabel:dueText(dueAt),dueDate:dueText(dueAt),dueTime:"Bangladesh time",dueCalDate:new Date(dueAt).toLocaleDateString('en-CA',{timeZone:'Asia/Dhaka'}),status:assignmentStatus(dueAt,hasSubmission),totalMarks:row.total_marks,maxAttempts:row.max_attempts,allowLate:!!row.allow_late,version:row.version,materialId:row.material_id,attempts:row.attempts||0,hasSubmission,submission:hasSubmission?{fileName:row.file_name,submittedAt:new Date(row.submitted_at).toISOString(),note:row.note,isLate:!!row.is_late}:null};
}
export function fields(b:AssignmentInput){return [b.title,b.course,b.code,b.instructor,b.description,new Date(b.dueAt).toISOString().slice(0,19).replace('T',' '),b.totalMarks,b.maxAttempts,b.allowLate?1:0,b.materialId];}
