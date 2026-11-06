"use client";
import {useSyncExternalStore} from 'react';
import type {Account} from './account-types';
type State={account:Account|null;loading:boolean;error:string};
const initial:State={account:null,loading:true,error:''};let state=initial,serial=0;const listeners=new Set<()=>void>();let timer:ReturnType<typeof setInterval>|undefined;
function emit(){listeners.forEach(fn=>fn());}
export async function refreshAccount(){const n=++serial;try{const res=await fetch('/api/account',{cache:'no-store'}),b=await res.json();if(!res.ok)throw new Error(b.error||'Could not load account.');if(n!==serial)return;state={account:b.account,loading:false,error:''};}catch(e){if(n!==serial)return;state={...initial,loading:false,error:e instanceof Error?e.message:'Could not load account.'};}emit();}
function focus(){void refreshAccount();}
function subscribe(fn:()=>void){listeners.add(fn);if(listeners.size===1){focus();timer=setInterval(focus,15000);window.addEventListener('focus',focus);}return ()=>{listeners.delete(fn);if(!listeners.size){clearInterval(timer);window.removeEventListener('focus',focus);++serial;state=initial;}};}
export function useAccount(){return useSyncExternalStore(subscribe,()=>state,()=>initial);}
async function send(url:string,method:string,body:unknown){const res=await fetch(url,{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});const b=await res.json().catch(()=>({}));if(!res.ok)throw new Error(b.error||'Could not update account.');return b;}
export async function saveAccount(fullName:string,expectedName:string){await send('/api/account','PATCH',{fullName,expectedName});await refreshAccount();}
export async function changePassword(currentPassword:string,newPassword:string,confirmPassword:string){await send('/api/account/password','POST',{currentPassword,newPassword,confirmPassword});++serial;state={...initial,loading:false};emit();}
