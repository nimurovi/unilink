import "server-only";
import {getSessionUser,isCr} from "./session";
import {AuthError,json,checkOrigin} from "./auth-http";
import {boundedBody} from "./material-http";
import {ANNOUNCEMENT_CATEGORIES,type AnnouncementInput} from "@/lib/announcement-types";
export async function announcementUser(write=false){const u=await getSessionUser();if(!u)throw new AuthError("Please sign in again.",401);if(write&&!isCr(u.role))throw new AuthError("Only a CR or admin can manage the announcement.",403);return u;}
export function announcementFailure(e:unknown){return e instanceof AuthError?json({error:e.message},e.status):json({error:"Announcement is unavailable. Check MySQL and run sql/008-class-announcements.sql."},503);}
export async function announcementJson(req:Request){checkOrigin(req);if(req.headers.get('content-type')?.split(';')[0].trim()!=='application/json')throw new AuthError("JSON is required.",415);const bytes=await boundedBody(req,40000);try{const b=JSON.parse(bytes.toString('utf8'));if(!b||typeof b!=='object'||Array.isArray(b))throw Error();return b as Record<string,unknown>;}catch{throw new AuthError("Invalid announcement request.");}}
export function validateAnnouncement(b:Record<string,unknown>):AnnouncementInput{
 const text=(key:string,max:number,required=true)=>{const v=b[key];if(typeof v!=='string'||v.trim().length>max||(required&&!v.trim()))throw new AuthError(`Enter a valid ${key} (up to ${max} characters).`);return v.trim();};
 const category=text('category',30);if(!ANNOUNCEMENT_CATEGORIES.includes(category))throw new AuthError("Choose a valid announcement category.");
 if(typeof b.pinned!=='boolean')throw new AuthError("Choose a valid pin status.");
 return {title:text('title',200),message:text('message',8000),category,pinned:b.pinned};
}

export function announcementVersion(v:unknown){if(typeof v!=='number'||!Number.isInteger(v)||v<1)throw new AuthError("Refresh the announcement before editing.");return v;}
