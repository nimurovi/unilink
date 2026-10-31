"use client";
import {useSyncExternalStore} from "react";
import type {Material} from "./material-types";
type State={materials:Material[];savedIds:string[];canManage:boolean;loading:boolean;error:string};
const initial:State={materials:[],savedIds:[],canManage:false,loading:true,error:""};
let state=initial,serial=0;const listeners=new Set<()=>void>();let timer:ReturnType<typeof setInterval>|undefined;
function emit(){listeners.forEach(fn=>fn());}
export async function refreshMaterials(){const n=++serial;try{
 const res=await fetch('/api/materials',{cache:'no-store'});const b=await res.json();if(!res.ok)throw new Error(b.error||'Could not load materials.');
 if(n!==serial)return;state={...b,loading:false,error:""};
 }catch(e){if(n!==serial)return;state={...initial,loading:false,error:e instanceof Error?e.message:'Could not load materials.'};}emit();}
function focus(){void refreshMaterials();}
function subscribe(fn:()=>void){listeners.add(fn);if(listeners.size===1){focus();timer=setInterval(focus,15000);window.addEventListener('focus',focus);}return ()=>{listeners.delete(fn);if(!listeners.size){clearInterval(timer);window.removeEventListener('focus',focus);++serial;state=initial;}};}
export function useMaterials(){return useSyncExternalStore(subscribe,()=>state,()=>initial);}
async function check(res:Response){if(!res.ok){const b=await res.json().catch(()=>({}));throw new Error(b.error||'Request failed. Please try again.');}}
export async function uploadMaterial(form:FormData){const res=await fetch('/api/materials',{method:'POST',body:form});await check(res);await refreshMaterials();}
export async function saveMaterial(id:string,saved:boolean){await check(await fetch(`/api/materials/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({saved})}));await refreshMaterials();}
export async function removeMaterial(id:string){await check(await fetch(`/api/materials/${id}`,{method:'DELETE'}));await refreshMaterials();}
export async function downloadMaterial(mat:Material){const res=await fetch(`/api/materials/${mat.id}/download`,{cache:'no-store'});await check(res);const url=URL.createObjectURL(await res.blob());const a=document.createElement('a');a.href=url;a.download=mat.fileName;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);}
