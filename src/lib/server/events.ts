import "server-only";
import {getSessionUser,isCr} from "./session";
import {AuthError,json,checkOrigin} from "./auth-http";
import {boundedBody} from "./material-http";
import {EVENT_CATEGORIES,type EventInput} from "@/lib/event-types";
export async function eventUser(write=false){const u=await getSessionUser();if(!u)throw new AuthError("Please sign in again.",401);if(write&&!isCr(u.role))throw new AuthError("Only a CR or admin can manage the event.",403);return u;}
export function eventFailure(e:unknown){return e instanceof AuthError?json({error:e.message},e.status):json({error:"Event is unavailable. Check MySQL and run sql/010-class-events.sql."},503);}
export async function eventJson(req:Request){checkOrigin(req);if(req.headers.get('content-type')?.split(';')[0].trim()!=='application/json')throw new AuthError("JSON is required.",415);const bytes=await boundedBody(req,40000);try{const b=JSON.parse(bytes.toString('utf8'));if(!b||typeof b!=='object'||Array.isArray(b))throw Error();return b as Record<string,unknown>;}catch{throw new AuthError("Invalid event request.");}}
export function eventVersion(v:unknown){if(typeof v!=='number'||!Number.isSafeInteger(v)||v<1||v>4294967295)throw new AuthError('Refresh the event before editing.');return v;}
export function eventTimestamp(value:unknown){
 if(typeof value!=='string'||!/^20\d{2}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value))throw new AuthError('Enter a valid Bangladesh date and time.');
 const d=new Date(value+':00+06:00');if(!Number.isFinite(d.getTime())||new Date(d.getTime()+21600000).toISOString().slice(0,16)!==value)throw new AuthError('Enter a valid Bangladesh date and time.');return d;
}
export function validateEvent(b:Record<string,unknown>):EventInput{
 const text=(key:string,max:number)=>{const v=b[key];if(typeof v!=='string'||!v.trim()||v.trim().length>max)throw new AuthError(`Enter a valid ${key} (up to ${max} characters).`);return v.trim();};
 const category=text('category',30);if(!EVENT_CATEGORIES.includes(category))throw new AuthError('Choose a valid event category.');
 const start=eventTimestamp(b.startsAt),end=eventTimestamp(b.endsAt);if(end<=start)throw new AuthError('End time must be after start time.');
 if(typeof b.cancelled!=='boolean')throw new AuthError('Choose a valid cancellation status.');
 return {title:text('title',200),description:text('description',8000),category,organizer:text('organizer',150),location:text('location',200),startsAt:start.toISOString(),endsAt:end.toISOString(),cancelled:b.cancelled};
}
export function eventFields(v:EventInput){return [v.title,v.description,v.category,v.organizer,v.location,new Date(v.startsAt),new Date(v.endsAt),v.cancelled?1:0];}
