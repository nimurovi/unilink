import "server-only";
import {getSessionUser,isCr} from "./session";
import {AuthError,json,checkOrigin} from "./auth-http";
import {boundedBody} from "./material-http";
export async function assignmentUser(write=false){const u=await getSessionUser();if(!u)throw new AuthError("Please sign in again.",401);if(write&&!isCr(u.role))throw new AuthError("Only a CR or admin can manage assignments.",403);return u;}
export function assignmentFailure(e:unknown){if(e instanceof AuthError)return json({error:e.message},e.status);return json({error:"Assignments are unavailable. Check MySQL, assignment tables and private file storage."},503);}
export async function assignmentJson(req:Request){checkOrigin(req);if(req.headers.get("content-type")?.split(';')[0].trim()!=="application/json")throw new AuthError("JSON is required.",415);const raw=await boundedBody(req,40000);try{const b=JSON.parse(raw.toString('utf8'));if(!b||typeof b!=="object"||Array.isArray(b))throw new Error();return b as Record<string,unknown>;}catch{throw new AuthError("Invalid assignment request.");}}
