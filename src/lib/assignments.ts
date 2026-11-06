"use client";
import {usePortalCanManage} from './portal-access';
import {useSyncExternalStore} from "react";
import {assignmentStatus,type Assignment,type AssignmentInput} from "./assignment-types";
type State={assignments:Assignment[];canManage:boolean;loading:boolean;error:string};
const initial:State={assignments:[],canManage:false,loading:true,error:""};
let state=initial,serial=0;const listeners=new Set<()=>void>();let timer:ReturnType<typeof setInterval>|undefined;
function emit(){listeners.forEach(fn=>fn());}
export async function refreshAssignments(){const n=++serial;try{const res=await fetch('/api/assignments',{cache:'no-store'});const b=await res.json();if(!res.ok)throw new Error(b.error||'Could not load assignments.');if(n!==serial)return;state={...b,assignments:b.assignments.map((a:Assignment)=>({...a,status:assignmentStatus(a.dueAt,a.hasSubmission)})),loading:false,error:""};}catch(e){if(n!==serial)return;state={...initial,loading:false,error:e instanceof Error?e.message:'Could not load assignments.'};}emit();}
function focus(){void refreshAssignments();}
function subscribe(fn:()=>void){listeners.add(fn);if(listeners.size===1){focus();timer=setInterval(focus,15000);window.addEventListener('focus',focus);}return ()=>{listeners.delete(fn);if(!listeners.size){clearInterval(timer);window.removeEventListener('focus',focus);++serial;state=initial;}};}
export function useAssignments(){const snapshot=useSyncExternalStore(subscribe,()=>state,()=>initial);const canManage=usePortalCanManage(snapshot.canManage);return {...snapshot,canManage};}
export async function checkAssignmentResponse(res:Response){if(!res.ok){const b=await res.json().catch(()=>({}));throw new Error(b.error||'Assignment request failed.');}}
export async function writeAssignment(input:AssignmentInput,id?:string,version?:number){const res=await fetch('/api/assignments'+(id?'/'+id:''),{method:id?'PATCH':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...input,version})});await checkAssignmentResponse(res);await refreshAssignments();}
export async function removeAssignment(a:Assignment){const res=await fetch('/api/assignments/'+a.id,{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({version:a.version})});await checkAssignmentResponse(res);await refreshAssignments();}
export async function submitAssignment(a:Assignment,form:FormData){form.set('version',String(a.version));const res=await fetch(`/api/assignments/${a.id}/submissions`,{method:'POST',body:form});await checkAssignmentResponse(res);await refreshAssignments();}
export async function downloadAssignmentFile(url:string,name:string){const res=await fetch(url,{cache:'no-store'});await checkAssignmentResponse(res);const disposition=res.headers.get('content-disposition');const encoded=disposition?.match(/filename\*=UTF-8''([^;]+)/i)?.[1];if(encoded){try{name=decodeURIComponent(encoded);}catch{}}const object=URL.createObjectURL(await res.blob());const a=document.createElement('a');a.href=object;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(object),60000);}
