"use client";
import {usePortalCanManage} from './portal-access';
import {useEffect,useState,useSyncExternalStore} from "react";
import {dhakaClock,type RoutineEntry,type RoutineInput} from "./routine-types";
type State={entries:RoutineEntry[];canManage:boolean;classLabel:string;loading:boolean;error:string};
const initial:State={entries:[],canManage:false,classLabel:'Your class',loading:true,error:''};let state=initial,serial=0;const listeners=new Set<()=>void>();let timer:ReturnType<typeof setInterval>|undefined;
export async function refreshRoutine(){const n=++serial;try{const res=await fetch('/api/routine',{cache:'no-store'});const b=await res.json();if(!res.ok)throw new Error(b.error||'Could not load routine.');if(n!==serial)return;state={...b,loading:false,error:''};}catch(e){if(n!==serial)return;state={...initial,loading:false,error:e instanceof Error?e.message:'Could not load routine.'};}listeners.forEach(fn=>fn());}
function focus(){void refreshRoutine();}
function subscribe(fn:()=>void){listeners.add(fn);if(listeners.size===1){focus();timer=setInterval(focus,15000);window.addEventListener('focus',focus);}return ()=>{listeners.delete(fn);if(!listeners.size){clearInterval(timer);window.removeEventListener('focus',focus);++serial;state=initial;}};}
export function useRoutine(){const snapshot=useSyncExternalStore(subscribe,()=>state,()=>initial);const canManage=usePortalCanManage(snapshot.canManage);return {...snapshot,canManage};}
export function useRoutineClock(){const [clock,setClock]=useState<ReturnType<typeof dhakaClock>|null>(null);useEffect(()=>{const tick=()=>setClock(dhakaClock());tick();const t=setInterval(tick,15000);return ()=>clearInterval(t);},[]);return clock;}
async function mutation(method:string,body:unknown){const res=await fetch('/api/routine',{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});if(!res.ok){const b=await res.json().catch(()=>({}));throw new Error(b.error||'Could not save routine.');}await refreshRoutine();}
export function saveRoutine(input:RoutineInput,entry?:RoutineEntry){return mutation(entry?'PATCH':'POST',{...input,id:entry?.id,version:entry?.version});}
export function deleteRoutine(entry:RoutineEntry){return mutation('DELETE',{id:entry.id,version:entry.version});}
