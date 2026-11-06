"use client";
import {usePortalCanManage} from './portal-access';
import {useSyncExternalStore} from "react";
import {type AnnouncementEntry,type AnnouncementInput} from "./announcement-types";
type State={entries:AnnouncementEntry[];canManage:boolean;classLabel:string;loading:boolean;error:string};
const initial:State={entries:[],canManage:false,classLabel:'Your class',loading:true,error:''};let state=initial,serial=0;const listeners=new Set<()=>void>();let timer:ReturnType<typeof setInterval>|undefined;
export async function refreshAnnouncement(){const n=++serial;try{const res=await fetch('/api/announcements',{cache:'no-store'});const b=await res.json();if(!res.ok)throw new Error(b.error||'Could not load announcement.');if(n!==serial)return;state={...b,loading:false,error:''};}catch(e){if(n!==serial)return;state={...initial,loading:false,error:e instanceof Error?e.message:'Could not load announcement.'};}listeners.forEach(fn=>fn());}
function focus(){void refreshAnnouncement();}
function subscribe(fn:()=>void){listeners.add(fn);if(listeners.size===1){focus();timer=setInterval(focus,15000);window.addEventListener('focus',focus);}return ()=>{listeners.delete(fn);if(!listeners.size){clearInterval(timer);window.removeEventListener('focus',focus);++serial;state=initial;}};}
export function useAnnouncement(){const snapshot=useSyncExternalStore(subscribe,()=>state,()=>initial);const canManage=usePortalCanManage(snapshot.canManage);return {...snapshot,canManage};}
async function mutation(method:string,body:unknown){const res=await fetch('/api/announcements',{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});if(!res.ok){const b=await res.json().catch(()=>({}));throw new Error(b.error||'Could not save announcement.');}await refreshAnnouncement();}
export function saveAnnouncement(input:AnnouncementInput,entry?:AnnouncementEntry){return mutation(entry?'PATCH':'POST',{...input,id:entry?.id,version:entry?.version});}
export function deleteAnnouncement(entry:AnnouncementEntry){return mutation('DELETE',{id:entry.id,version:entry.version});}
