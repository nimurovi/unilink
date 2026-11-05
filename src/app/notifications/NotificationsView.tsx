"use client";
import {useContext,useRef,useState} from 'react';
import {ThemeCtx} from '@/components/ui/Theme';
import {useNotifications,markNotifications,refreshNotifications} from '@/lib/notifications';
import {NOTIFICATION_LABELS,type NotificationEntry} from '@/lib/notification-types';
export default function NotificationsPage({onNavigate}:{onNavigate?:(target:string)=>void}){
 const {theme}=useContext(ThemeCtx),dark=theme==='dark';
 const c={bg:dark?'#080D1A':'#F8FAFC',surface:dark?'#0F172A':'#fff',text:dark?'#F8FAFC':'#0F172A',muted:dark?'#94A3B8':'#64748B',border:dark?'#1E293B':'#E2E8F0',blue:dark?'#60A5FA':'#2563EB'};
 const {entries,loading,error}=useNotifications(),[filter,setFilter]=useState('All'),[query,setQuery]=useState(''),[busy,setBusy]=useState(false),[actionError,setActionError]=useState('');const lock=useRef(false);
 const unread=entries.filter(e=>e.unread),visible=entries.filter(e=>(filter==='All'||filter==='Unread'&&e.unread||filter===e.kind)&&`${e.title} ${e.body}`.toLowerCase().includes(query.toLowerCase()));
 async function mark(items:NotificationEntry[],read:boolean,open?:NotificationEntry){if(lock.current)return;lock.current=true;setBusy(true);setActionError('');try{await markNotifications(items,read);if(open){if(onNavigate)onNavigate(open.kind);else window.location.assign('/'+open.kind);}}catch(e){setActionError(e instanceof Error?e.message:'Could not save read status.');}finally{lock.current=false;setBusy(false);}}
 const button={padding:'8px 12px',border:`1px solid ${c.border}`,borderRadius:9,background:c.surface,color:c.blue,cursor:'pointer'};
 return <main style={{flex:1,minHeight:0,minWidth:0,overflowY:'auto',overflowX:'hidden',padding:'24px 24px 90px',background:c.bg,color:c.text,boxSizing:'border-box'}}><div style={{maxWidth:900,margin:'0 auto'}}>
 <header style={{display:'flex',justifyContent:'space-between',gap:16,flexWrap:'wrap'}}><div><h1 style={{fontSize:26,fontWeight:800}}>Notifications</h1><p style={{color:c.muted}}>{unread.length} unread · Latest 200 class items · Refreshes every 15 seconds</p></div><div style={{display:'flex',gap:8,alignItems:'center'}}><button style={button} disabled={busy||loading} onClick={()=>void refreshNotifications()}>Refresh</button><button style={button} disabled={busy||!unread.length} onClick={()=>void mark(unread,true)}>Mark all shown as read</button></div></header>
 <p style={{fontSize:13,color:c.muted,marginTop:12}}>Updates for your department, batch and section. Edits appear as unread again; removed items leave this feed.</p>
 <div style={{display:'flex',gap:10,flexWrap:'wrap',margin:'18px 0'}}><input aria-label="Search notifications" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search notifications…" style={{...button,color:c.text,flex:1,minWidth:160}}/><select aria-label="Filter notifications" value={filter} onChange={e=>setFilter(e.target.value)} style={button}><option>All</option><option>Unread</option>{Object.entries(NOTIFICATION_LABELS).map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></div>
 {(error||actionError)&&<p role="alert" style={{color:dark?'#FCA5A5':'#B91C1C',marginBottom:16}}>{actionError||error}</p>}
 {loading?<p>Loading notifications…</p>:!error&&!visible.length?<p style={{color:c.muted}}>No notifications match this view.</p>:visible.map(e=><article key={e.key} style={{padding:20,border:`1px solid ${e.unread?c.blue:c.border}`,borderRadius:14,background:c.surface,marginBottom:12,overflowWrap:'anywhere'}}>
 <div style={{fontSize:12,color:c.muted}}>{NOTIFICATION_LABELS[e.kind]} · {new Date(e.time).toLocaleString('en-GB',{timeZone:'Asia/Dhaka'})} (BD){e.version>1?' · Updated':''}{e.unread?' · Unread':''}</div><h2 style={{fontSize:17,fontWeight:700,margin:'8px 0'}}>{e.title}</h2><p style={{whiteSpace:'pre-wrap',color:c.muted}}>{e.body.length>500?e.body.slice(0,500)+'…':e.body}</p>
 <div style={{display:'flex',gap:8,marginTop:14}}><button style={button} disabled={busy} onClick={()=>void mark([e],true,e)}>Open {NOTIFICATION_LABELS[e.kind]}</button><button style={button} disabled={busy} onClick={()=>void mark([e],e.unread)}>{e.unread?'Mark read':'Mark unread'}</button></div></article>)}
 </div></main>;
}
