import "server-only";
import {getSessionUser,isCr} from "./session";
import {AuthError,json,checkOrigin} from "./auth-http";
import {boundedBody} from "./material-http";
import {EXAM_KINDS,type ExamInput} from "@/lib/exam-types";
export async function examUser(write=false){const u=await getSessionUser();if(!u)throw new AuthError("Please sign in again.",401);if(write&&!isCr(u.role))throw new AuthError("Only a CR or admin can manage the exam.",403);return u;}
export function examFailure(e:unknown){return e instanceof AuthError?json({error:e.message},e.status):json({error:"Exam is unavailable. Check MySQL and run sql/007-class-exams.sql."},503);}
export async function examJson(req:Request){checkOrigin(req);if(req.headers.get('content-type')?.split(';')[0].trim()!=='application/json')throw new AuthError("JSON is required.",415);const bytes=await boundedBody(req,32000);try{const b=JSON.parse(bytes.toString('utf8'));if(!b||typeof b!=='object'||Array.isArray(b))throw Error();return b as Record<string,unknown>;}catch{throw new AuthError("Invalid exam request.");}}
export function validateExam(b:Record<string,unknown>):ExamInput{
 const text=(key:string,max:number,required=true)=>{const v=b[key];if(typeof v!=='string'||v.trim().length>max||(required&&!v.trim()))throw new AuthError(`Enter a valid ${key} (up to ${max} characters).`);return v.trim();};
 const examDate=text('examDate',10);
 if(!/^20\d{2}-\d{2}-\d{2}$/.test(examDate)||!Number.isFinite(Date.parse(examDate+'T00:00:00Z'))||new Date(examDate+'T00:00:00Z').toISOString().slice(0,10)!==examDate)throw new AuthError("Choose a valid exam date between 2000 and 2099.");
 const startTime=text('startTime',5),endTime=text('endTime',5),time=/^(?:[01]\d|2[0-3]):[0-5]\d$/;
 if(!time.test(startTime)||!time.test(endTime)||startTime>=endTime)throw new AuthError("End time must be after start time on the same day.");
 const kind=text('kind',20);if(!EXAM_KINDS.includes(kind))throw new AuthError("Choose a valid exam type.");
 if(typeof b.cancelled!=='boolean')throw new AuthError("Choose a valid cancellation status.");
 return {title:text('title',200),course:text('course',150),code:text('code',50),instructor:text('instructor',150),room:text('room',100),examDate,startTime,endTime,kind,syllabus:text('syllabus',3000,false),instructions:text('instructions',3000,false),cancelled:b.cancelled};
}

export function examVersion(v:unknown){if(typeof v!=='number'||!Number.isInteger(v)||v<1)throw new AuthError("Refresh the exam before editing.");return v;}
