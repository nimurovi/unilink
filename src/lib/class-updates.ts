"use client";
import { useSyncExternalStore } from "react";
import type { ClassUpdate } from "./class-update-types";
export type { ClassUpdate, ClassUpdateType } from "./class-update-types";
const empty: ClassUpdate[]=[];
let state={updates:empty,loading:true,error:""};
const initial=state;
const listeners=new Set<()=>void>();
let timer: ReturnType<typeof setInterval>|undefined;
let serial=0;
function emit(){listeners.forEach(fn=>fn());}
export async function refreshClassUpdates() {
 const n=++serial;
 try {const res=await fetch("/api/class-updates",{cache:"no-store",credentials:"same-origin"});
 const data=await res.json(); if(!res.ok)throw new Error(data.error || "Could not load class updates.");
 if(n!==serial)return;
 state={updates:data.updates,loading:false,error:""};
 }catch(e){if(n!==serial)return;state={updates:empty,loading:false,error:e instanceof Error?e.message:"Could not load class updates."};}
 emit();
}
function focus(){void refreshClassUpdates();}
function subscribe(fn:()=>void){listeners.add(fn);
 if(listeners.size===1){focus();timer=setInterval(focus,15000);window.addEventListener("focus",focus);}
 return ()=>{listeners.delete(fn);if(!listeners.size){clearInterval(timer);window.removeEventListener("focus",focus);++serial;state=initial;}};
}
export function useClassUpdatesState(){return useSyncExternalStore(subscribe,()=>state,()=>initial);}
export function useClassUpdates(){return useClassUpdatesState().updates;}
async function mutate(method:string,body:object){
 const res=await fetch("/api/class-updates",{method,credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
 const data=await res.json();
 if(!res.ok){void refreshClassUpdates();throw new Error(data.error||"Could not save class update.");}
 await refreshClassUpdates();
}
export async function postClassUpdate(input:Pick<ClassUpdate,"code"|"type"|"detail"|"note">,id=crypto.randomUUID()){await mutate("POST",{...input,id});}
export async function editClassUpdate(id:string,detail:string,version:number){await mutate("PATCH",{id,detail,version});}
export async function deleteClassUpdate(id:string,version:number){await mutate("DELETE",{id,version});}
