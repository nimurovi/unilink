import "server-only";
import { mkdir, writeFile, readFile, unlink } from "node:fs/promises";
import path from "node:path";
import { AuthError } from "./auth-http";
export const MAX_FILE = 10 * 1024 * 1024;
export function materialId(value:string) {
 if(!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)) throw new AuthError("Invalid material ID.",400);
 return value;
}
function filePath(id:string) {
 const root=path.resolve(process.env.MATERIALS_DIR || path.join(process.cwd(),"private-uploads","materials"));
 const publicRoot=path.resolve(process.cwd(),"public");
 if(root===publicRoot || root.startsWith(publicRoot+path.sep))throw new Error("Private storage required");
 return path.join(root,materialId(id));
}
export async function storeFile(id:string,data:Buffer) {const dest=filePath(id);await mkdir(path.dirname(dest),{recursive:true});await writeFile(dest,data,{flag:"wx",mode:0o600});}
export async function loadFile(id:string){return readFile(filePath(id));}
export async function discardFile(id:string){await unlink(filePath(id));}
export function validateFile(name:string,data:Buffer) {
 if(!data.length || data.length>MAX_FILE)throw new AuthError("Choose a non-empty file up to 10 MB.");
 const extension=name.split(".").pop()?.toLowerCase();
 const pdf=data.subarray(0,5).toString()==="%PDF-";
 const png=data.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
 const jpg=data[0]===255 && data[1]===216 && data[2]===255;
 const zip=data.subarray(0,4).equals(Buffer.from([80,75,3,4]));
 const ole=data.subarray(0,8).equals(Buffer.from([208,207,17,224,161,177,26,225]));
 const ok=(extension==='pdf'&&pdf)||(extension==='png'&&png)||(['jpg','jpeg'].includes(extension||'')&&jpg)||(['docx','pptx','xlsx','zip'].includes(extension||'')&&zip)||(['doc','ppt'].includes(extension||'')&&ole);
 if(!ok)throw new AuthError("Unsupported file or mismatched format. Use PDF, Office documents, ZIP, PNG or JPG.");
 return ['jpg','jpeg','png'].includes(extension!)?'Image':extension!.toUpperCase();
}
export function safeFilename(name:string) {return name.replace(/.*[\\/]/,'').replace(/[\x00-\x1f\x7f"<>:|?*]/g,'_').slice(-200)||'download';}
