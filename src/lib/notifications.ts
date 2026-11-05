"use client";
import {useSyncExternalStore} from "react";
import type {NotificationEntry} from "./notification-types";
type State={entries:NotificationEntry[];loading:boolean;error:string};
const initial:State={entries:[],loading:true,error:''};let state=initial,serial=0;const listeners=new Set<()=>void>();let timer:ReturnType<typeof setInterval>|undefined;
export async function refreshNotifications(){const n=++serial;try{const res=await fetch('/api/notifications',{cache:'no-store'});const b=await res.json();if(!res.ok)throw new Error(b.error||'Could not load notifications.');if(n!==serial)return;state={...b,loading:false,error:''};}catch(e){if(n!==serial)return;state={...initial,loading:false,error:e instanceof Error?e.message:'Could not load notifications.'};}listeners.forEach(fn=>fn());}
function focus(){void refreshNotifications();}
function subscribe(fn:()=>void){listeners.add(fn);if(listeners.size===1){focus();timer=setInterval(focus,15000);window.addEventListener('focus',focus);}return ()=>{listeners.delete(fn);if(!listeners.size){clearInterval(timer);window.removeEventListener('focus',focus);++serial;state=initial;}};}
export function useNotifications(){return useSyncExternalStore(subscribe,()=>state,()=>initial);}
async function mutation(method:string,body:unknown){const res=await fetch('/api/notifications',{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});if(!res.ok){const b=await res.json().catch(()=>({}));throw new Error(b.error||'Could not save notifications.');}await refreshNotifications();}
export function markNotifications(entries:NotificationEntry[],read:boolean){if(!entries.length)return Promise.resolve();return mutation('PATCH',{keys:entries.map(e=>e.key),read});}
