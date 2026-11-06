"use client";
import {usePortalCanManage} from './portal-access';
import {useSyncExternalStore} from "react";
import {type ClubEntry,type ClubInput} from "./club-types";
type State={entries:ClubEntry[];canManage:boolean;loading:boolean;error:string};
const initial:State={entries:[],canManage:false,loading:true,error:''};let state=initial,serial=0;const listeners=new Set<()=>void>();let timer:ReturnType<typeof setInterval>|undefined;
export async function refreshClub(){const n=++serial;try{const res=await fetch('/api/clubs',{cache:'no-store'});const b=await res.json();if(!res.ok)throw new Error(b.error||'Could not load club.');if(n!==serial)return;state={...b,loading:false,error:''};}catch(e){if(n!==serial)return;state={...initial,loading:false,error:e instanceof Error?e.message:'Could not load club.'};}listeners.forEach(fn=>fn());}
function focus(){void refreshClub();}
function subscribe(fn:()=>void){listeners.add(fn);if(listeners.size===1){focus();timer=setInterval(focus,15000);window.addEventListener('focus',focus);}return ()=>{listeners.delete(fn);if(!listeners.size){clearInterval(timer);window.removeEventListener('focus',focus);++serial;state=initial;}};}
export function useClub(){const snapshot=useSyncExternalStore(subscribe,()=>state,()=>initial);const canManage=usePortalCanManage(snapshot.canManage);return {...snapshot,canManage};}
async function mutation(method:string,body:unknown){const res=await fetch('/api/clubs',{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});if(!res.ok){const b=await res.json().catch(()=>({}));throw new Error(b.error||'Could not save club.');}await refreshClub();}
export function saveClub(input:ClubInput,entry?:ClubEntry){return mutation(entry?'PATCH':'POST',{...input,id:entry?.id,version:entry?.version});}
export function deleteClub(entry:ClubEntry){return mutation('DELETE',{id:entry.id,version:entry.version});}

export async function respondClub(entry:ClubEntry,joined:boolean){const res=await fetch('/api/clubs/membership',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:entry.id,version:entry.version,joined})});if(!res.ok){const b=await res.json().catch(()=>({}));throw new Error(b.error||'Could not save your response.');}await refreshClub();}
