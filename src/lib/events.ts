"use client";
import {usePortalCanManage} from './portal-access';
import {useSyncExternalStore} from "react";
import {type EventEntry,type EventInput} from "./event-types";
type State={entries:EventEntry[];canManage:boolean;loading:boolean;error:string};
const initial:State={entries:[],canManage:false,loading:true,error:''};let state=initial,serial=0;const listeners=new Set<()=>void>();let timer:ReturnType<typeof setInterval>|undefined;
export async function refreshEvent(){const n=++serial;try{const res=await fetch('/api/events',{cache:'no-store'});const b=await res.json();if(!res.ok)throw new Error(b.error||'Could not load event.');if(n!==serial)return;state={...b,loading:false,error:''};}catch(e){if(n!==serial)return;state={...initial,loading:false,error:e instanceof Error?e.message:'Could not load event.'};}listeners.forEach(fn=>fn());}
function focus(){void refreshEvent();}
function subscribe(fn:()=>void){listeners.add(fn);if(listeners.size===1){focus();timer=setInterval(focus,15000);window.addEventListener('focus',focus);}return ()=>{listeners.delete(fn);if(!listeners.size){clearInterval(timer);window.removeEventListener('focus',focus);++serial;state=initial;}};}
export function useEvent(){const snapshot=useSyncExternalStore(subscribe,()=>state,()=>initial);const canManage=usePortalCanManage(snapshot.canManage);return {...snapshot,canManage};}
async function mutation(method:string,body:unknown){const res=await fetch('/api/events',{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});if(!res.ok){const b=await res.json().catch(()=>({}));throw new Error(b.error||'Could not save event.');}await refreshEvent();}
export function saveEvent(input:EventInput,entry?:EventEntry){return mutation(entry?'PATCH':'POST',{...input,id:entry?.id,version:entry?.version});}
export function deleteEvent(entry:EventEntry){return mutation('DELETE',{id:entry.id,version:entry.version});}

export async function respondEvent(entry:EventEntry,going:boolean){const res=await fetch('/api/events/rsvp',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:entry.id,version:entry.version,going})});if(!res.ok){const b=await res.json().catch(()=>({}));throw new Error(b.error||'Could not save your response.');}await refreshEvent();}
