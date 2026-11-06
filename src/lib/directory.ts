"use client";
import {useSyncExternalStore} from 'react';
import type {ClassDirectory} from './directory-types';
type State={directory:ClassDirectory|null;loading:boolean;error:string};
const initial:State={directory:null,loading:true,error:''};let state=initial,serial=0;const listeners=new Set<()=>void>();let timer:ReturnType<typeof setInterval>|undefined;
function emit(){listeners.forEach(fn=>fn());}
export async function refreshDirectory(){const n=++serial;try{const res=await fetch('/api/directory',{cache:'no-store'}),b=await res.json();if(!res.ok)throw new Error(b.error||'Could not load directory.');if(n!==serial)return;state={directory:b.directory,loading:false,error:''};}catch(e){if(n!==serial)return;state={...initial,loading:false,error:e instanceof Error?e.message:'Could not load directory.'};}emit();}
function focus(){void refreshDirectory();}
function subscribe(fn:()=>void){listeners.add(fn);if(listeners.size===1){focus();timer=setInterval(focus,15000);window.addEventListener('focus',focus);}return ()=>{listeners.delete(fn);if(!listeners.size){clearInterval(timer);window.removeEventListener('focus',focus);++serial;state=initial;}};}
export function useDirectory(){return useSyncExternalStore(subscribe,()=>state,()=>initial);}
