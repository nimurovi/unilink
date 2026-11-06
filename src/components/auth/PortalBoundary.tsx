"use client";
import {useEffect,type ReactNode} from 'react';
import {useAccount,refreshAccount} from '@/lib/account';
import {PortalAccess} from '@/lib/portal-access';
export default function PortalBoundary({id,role,classId,children}:{id:number;role:string;classId:number;children:ReactNode}){
 const {account,loading,error}=useAccount();
 const changed=!!account&&(account.id!==id||account.role!==role||account.classId!==classId);
 useEffect(()=>{if(changed&&account)window.location.replace(account.role==='student'?'/dashboard':'/cr-portal');},[changed,account]);
 if(loading||changed)return <main style={{padding:28}}>Checking your account…</main>;
 if(!account)return <main style={{padding:28}}><p role="alert">{error||'Please sign in again.'}</p><button onClick={()=>void refreshAccount()}>Retry</button> · <a href="/login">Sign in</a></main>;
 return <PortalAccess.Provider value={account.role==='student'?'student':'cr'}>{children}</PortalAccess.Provider>;
}
