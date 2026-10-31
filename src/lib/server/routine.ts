import "server-only";
import {getSessionUser,isCr} from "./session";
import {AuthError,json,checkOrigin} from "./auth-http";
import {boundedBody} from "./material-http";
import type {RoutineInput} from "@/lib/routine-types";
export async function routineUser(write=false){const u=await getSessionUser();if(!u)throw new AuthError("Please sign in again.",401);if(write&&!isCr(u.role))throw new AuthError("Only a CR or admin can manage the routine.",403);return u;}
export function routineFailure(e:unknown){return e instanceof AuthError?json({error:e.message},e.status):json({error:"Routine is unavailable. Check MySQL and run sql/006-class-routine.sql."},503);}
export async function routineJson(req:Request){checkOrigin(req);if(req.headers.get('content-type')?.split(';')[0].trim()!=='application/json')throw new AuthError("JSON is required.",415);const bytes=await boundedBody(req,16000);try{const b=JSON.parse(bytes.toString('utf8'));if(!b||typeof b!=='object'||Array.isArray(b))throw Error();return b as Record<string,unknown>;}catch{throw new AuthError("Invalid routine request.");}}
export function validateRoutine(b:Record<string,unknown>):RoutineInput{
 const text=(key:string,max:number,required=true)=>{const v=b[key];if(typeof v!=='string'||v.trim().length>max||(required&&!v.trim()))throw new AuthError(`Enter a valid ${key} (up to ${max} characters).`);return v.trim();};
 const weekday=b.weekday;if(typeof weekday!=='number'||!Number.isInteger(weekday)||weekday<0||weekday>6)throw new AuthError("Choose a valid weekday.");
 const startTime=text('startTime',5),endTime=text('endTime',5);const time=/^(?:[01]\d|2[0-3]):[0-5]\d$/;
 if(!time.test(startTime)||!time.test(endTime)||startTime>=endTime)throw new AuthError("End time must be after start time on the same day.");
 const kind=text('kind',20);if(!['Lecture','Lab','Tutorial'].includes(kind))throw new AuthError("Choose Lecture, Lab or Tutorial.");
 return {course:text('course',150),code:text('code',50),instructor:text('instructor',150),room:text('room',100),weekday,startTime,endTime,kind,notes:text('notes',2000,false)};
}
export function routineVersion(v:unknown){if(typeof v!=='number'||!Number.isInteger(v)||v<1)throw new AuthError("Refresh the routine before editing.");return v;}
