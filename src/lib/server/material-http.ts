import "server-only";
import { getSessionUser,isCr } from "./session";
import { AuthError,json } from "./auth-http";
export async function materialUser(write=false){const u=await getSessionUser();if(!u)throw new AuthError("Please sign in again.",401);if(write&&!isCr(u.role))throw new AuthError("Only CR or admin accounts can manage materials.",403);return u;}
export function materialFailure(e:unknown){if(e instanceof AuthError)return json({error:e.message},e.status);return json({error:"Materials are unavailable. Check MySQL, the materials tables, and server file storage."},503);}
export async function boundedBody(req:Request,limit:number){
 const reader=req.body?.getReader();if(!reader)throw new AuthError("Missing request body.");
 const chunks:Uint8Array[]=[];let size=0;
 try{while(true){const x=await reader.read();if(x.done)break;size+=x.value.length;if(size>limit){await reader.cancel();throw new AuthError("Upload exceeds the size limit.",413);}chunks.push(x.value);}}finally{reader.releaseLock();}
 return Buffer.concat(chunks);
}
