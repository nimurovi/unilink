import "server-only";
import {mkdir,writeFile,readFile,unlink} from "node:fs/promises";
import path from "node:path";
import {materialId} from "./material-files";
export {MAX_FILE,validateFile,safeFilename} from "./material-files";
function location(id:string){
 const root=path.resolve(process.env.ASSIGNMENTS_DIR||path.join(process.cwd(),"private-uploads","assignments"));
 const pub=path.resolve(process.cwd(),"public");if(root===pub||root.startsWith(pub+path.sep))throw new Error("Private storage required");
 return path.join(root,materialId(id));
}
export async function storeSubmission(id:string,bytes:Buffer){const dest=location(id);await mkdir(path.dirname(dest),{recursive:true});await writeFile(dest,bytes,{flag:"wx",mode:0o600});}
export async function readSubmission(id:string){return readFile(location(id));}
export async function discardSubmission(id:string){await unlink(location(id));}
