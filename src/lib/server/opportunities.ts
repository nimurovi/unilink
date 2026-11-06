import "server-only";
import {getSessionUser,isCr} from "./session";
import {AuthError,json,checkOrigin} from "./auth-http";
import {boundedBody} from "./material-http";
import {OPPORTUNITY_CATEGORIES,type OpportunityInput} from "@/lib/opportunity-types";
export async function opportunityUser(write=false){const u=await getSessionUser();if(!u)throw new AuthError("Please sign in again.",401);if(write&&!isCr(u.role))throw new AuthError("Only a CR or admin can manage the opportunity.",403);return u;}
export function opportunityFailure(e:unknown){return e instanceof AuthError?json({error:e.message},e.status):json({error:"Opportunity is unavailable. Check MySQL and run sql/011-class-opportunities.sql."},503);}
export async function opportunityJson(req:Request){checkOrigin(req);if(req.headers.get('content-type')?.split(';')[0].trim()!=='application/json')throw new AuthError("JSON is required.",415);const bytes=await boundedBody(req,40000);try{const b=JSON.parse(bytes.toString('utf8'));if(!b||typeof b!=='object'||Array.isArray(b))throw Error();return b as Record<string,unknown>;}catch{throw new AuthError("Invalid opportunity request.");}}
export function validateOpportunity(b:Record<string,unknown>):OpportunityInput {
 const text=(key:string,max:number,required=true)=>{const v=b[key];if(typeof v!=='string'||v.trim().length>max||(required&&!v.trim()))throw new AuthError(`Enter a valid ${key} (up to ${max} characters).`);return v.trim();};
 const category=text('category',30);if(!OPPORTUNITY_CATEGORIES.includes(category))throw new AuthError('Choose a valid opportunity category.');
 if(typeof b.closed!=='boolean')throw new AuthError('Choose a valid closed status.');
 const applicationUrl=text('applicationUrl',2000);
 try {const url=new URL(applicationUrl);if(url.protocol!=='https:'||!url.hostname||url.username||url.password||/[\s\\]/.test(applicationUrl))throw Error();}catch {throw new AuthError('Enter a complete HTTPS application URL without credentials or spaces.');}
 const deadline=text('deadline',10,false);
 if(deadline){const date=new Date(deadline+'T00:00:00Z');if(!/^20[0-9]{2}-[0-9]{2}-[0-9]{2}$/.test(deadline)||!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==deadline)throw new AuthError('Enter a valid deadline date from 2000 to 2099.');}
 return {title:text('title',200),description:text('description',8000),category,organization:text('organization',150),location:text('location',200),applicationUrl,deadline,closed:b.closed};
}

export function opportunityVersion(v:unknown){if(typeof v!=='number'||!Number.isInteger(v)||v<1)throw new AuthError("Refresh the opportunity before editing.");return v;}
