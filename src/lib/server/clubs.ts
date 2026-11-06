import "server-only";
import {getSessionUser,isCr} from "./session";
import {AuthError,json,checkOrigin} from "./auth-http";
import {boundedBody} from "./material-http";
import {CLUB_CATEGORIES,type ClubInput} from "@/lib/club-types";
export async function clubUser(write=false){const u=await getSessionUser();if(!u)throw new AuthError("Please sign in again.",401);if(write&&!isCr(u.role))throw new AuthError("Only a CR or admin can manage the club.",403);return u;}
export function clubFailure(e:unknown){return e instanceof AuthError?json({error:e.message},e.status):json({error:"Club is unavailable. Check MySQL and run sql/012-class-clubs.sql."},503);}
export async function clubJson(req:Request){checkOrigin(req);if(req.headers.get('content-type')?.split(';')[0].trim()!=='application/json')throw new AuthError("JSON is required.",415);const bytes=await boundedBody(req,40000);try{const b=JSON.parse(bytes.toString('utf8'));if(!b||typeof b!=='object'||Array.isArray(b))throw Error();return b as Record<string,unknown>;}catch{throw new AuthError("Invalid club request.");}}
export function clubVersion(v:unknown){if(typeof v!=='number'||!Number.isSafeInteger(v)||v<1||v>4294967295)throw new AuthError('Refresh the club before editing.');return v;}
export function validateClub(b:Record<string,unknown>):ClubInput{
 const text=(key:string,max:number)=>{const v=b[key];if(typeof v!=='string'||!v.trim()||v.trim().length>max)throw new AuthError(`Enter a valid ${key} (up to ${max} characters).`);return v.trim();};
 const category=text('category',30);if(!CLUB_CATEGORIES.includes(category))throw new AuthError('Choose a valid club category.');
 if(typeof b.closed!=='boolean')throw new AuthError('Choose a valid registration status.');
 return {title:text('title',200),description:text('description',8000),category,contact:text('contact',300),meetingInfo:text('meetingInfo',1000),closed:b.closed};
}
export function clubFields(v:ClubInput){return [v.title,v.description,v.category,v.contact,v.meetingInfo,v.closed?1:0];}
