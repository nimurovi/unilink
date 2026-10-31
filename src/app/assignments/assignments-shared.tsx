"use client";
import {useState,useEffect,useRef} from "react";
import {useTheme,tok} from "@/components/ui/Theme";
import AssignmentEditor from "@/components/ui/AssignmentEditor";
import {useAssignments,refreshAssignments,removeAssignment,submitAssignment,downloadAssignmentFile,checkAssignmentResponse} from "@/lib/assignments";
import {dueText,type Assignment,type AssignmentStatus} from "@/lib/assignment-types";
export type {Assignment,AssignmentStatus} from "@/lib/assignment-types";
const STATUS={upcoming:{label:'Upcoming',color:'#64748B'},'due-soon':{label:'Due Soon',color:'#F59E0B'},submitted:{label:'Submitted',color:'#10B981'},overdue:{label:'Overdue',color:'#EF4444'}};
export function StatusPill({status}:{status:AssignmentStatus}){const s=STATUS[status];return <span style={{padding:'3px 9px',borderRadius:999,fontSize:11,fontWeight:700,color:s.color,background:s.color+'15',border:'1px solid '+s.color+'30'}}>{s.label}</span>;}
type SubmissionRow={user_id:number;full_name:string;student_id:string;file_name:string;file_size:number;attempts:number;note:string;is_late:boolean;submitted_at:string};
function SubmissionReview({id}:{id:string}){
 const {theme}=useTheme(),c=tok(theme);const [rows,setRows]=useState<SubmissionRow[]>([]),[error,setError]=useState(''),[loading,setLoading]=useState(true),[revision,setRevision]=useState(0);
 useEffect(()=>{let active=true;setRows([]);setError('');setLoading(true);(async()=>{try{const res=await fetch(`/api/assignments/${id}/submissions`,{cache:'no-store'});await checkAssignmentResponse(res);const b=await res.json();if(active)setRows(b.submissions);}catch(e){if(active)setError(e instanceof Error?e.message:'Could not load submissions.');}finally{if(active)setLoading(false);}})();return ()=>{active=false;};},[id,revision]);
 return <section style={{background:c.surface,border:`1px solid ${c.border}`,borderRadius:18,padding:24}}><div style={{display:'flex',justifyContent:'space-between'}}><h3>Class Submissions ({rows.length})</h3><button onClick={()=>setRevision(n=>n+1)}>Refresh submissions</button></div>
 {loading&&<p>Loading submissions…</p>}{error&&<p role="alert">{error}</p>}{!loading&&!error&&!rows.length&&<p>No submissions yet.</p>}
 {rows.map(s=><article key={s.user_id} style={{padding:14,marginTop:10,border:`1px solid ${c.border}`,borderRadius:10,overflowWrap:'anywhere'}}><strong>{s.full_name} · {s.student_id}</strong><p>{s.file_name} · Attempt {s.attempts} · {dueText(s.submitted_at)}{s.is_late?' · Late':''}</p>{s.note&&<p style={{whiteSpace:'pre-wrap'}}>{s.note}</p>}<button onClick={()=>{void downloadAssignmentFile(`/api/assignments/${id}/submission?userId=${s.user_id}`,s.file_name).catch(e=>setError(e.message));}}>Download latest submission</button></article>)}
 <small style={{display:'block',marginTop:14,color:c.textMuted}}>This list shows each student’s latest submission. No grades are assigned here.</small></section>;
}
export function AssignmentDetail({assignment:a,onBack}:{assignment:Assignment;onBack:()=>void}){
 const {theme}=useTheme(),c=tok(theme);const {canManage}=useAssignments();const [edit,setEdit]=useState(false),[error,setError]=useState(''),[busy,setBusy]=useState(false),[success,setSuccess]=useState('');const lock=useRef(false);
 const panel:React.CSSProperties={background:c.surface,border:`1px solid ${c.border}`,borderRadius:18,padding:24,boxShadow:c.cardShadow};
 const button:React.CSSProperties={padding:'9px 15px',borderRadius:9,border:`1px solid ${c.border}`,background:c.surface2,color:c.text,cursor:'pointer'};
 const closed=Date.parse(a.dueAt)<=Date.now()&&!a.allowLate;const exhausted=a.attempts>=a.maxAttempts;
 async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();if(lock.current)return;lock.current=true;setBusy(true);setError('');setSuccess('');const form=e.currentTarget;try{await submitAssignment(a,new FormData(form));setSuccess('Your file was submitted successfully.');form.reset();}catch(e){setError(e instanceof Error?e.message:'Submission failed.');}finally{lock.current=false;setBusy(false);}}
 async function remove(){if(lock.current||!window.confirm('Remove this assignment for everyone in your class?'))return;lock.current=true;setBusy(true);try{await removeAssignment(a);onBack();}catch(e){setError(e instanceof Error?e.message:'Could not remove assignment.');}finally{lock.current=false;setBusy(false);}}
 return <div style={{flex:1,overflowY:'auto',padding:'24px 28px 90px',background:c.bg,color:c.text}}><div style={{maxWidth:1000,margin:'auto',display:'grid',gap:20}}>
 <button onClick={onBack} style={{...button,justifySelf:'start'}}>← Back to Assignments</button>
 <section style={panel}><div style={{display:'flex',gap:12,justifyContent:'space-between',flexWrap:'wrap'}}><div><h1 style={{fontFamily:'Manrope',fontSize:24,marginTop:0}}>{a.title}</h1><p>{a.course} · {a.code}</p></div><StatusPill status={a.status}/></div>
 <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))',gap:12}}><p><strong>Deadline</strong><br/>{a.dueLabel}</p><p><strong>Instructor</strong><br/>{a.instructor}</p><p><strong>Total marks</strong><br/>{a.totalMarks}</p><p><strong>Attempts</strong><br/>{a.attempts} / {a.maxAttempts}</p></div><p>Late submissions: {a.allowLate?'Allowed and labelled late':'Not allowed'}</p>
 {canManage&&<div style={{display:'flex',gap:10}}><button disabled={busy} style={button} onClick={()=>setEdit(true)}>Edit Assignment</button><button disabled={busy} style={button} onClick={()=>void remove()}>Remove Assignment</button></div>}
 </section>
 {error&&<p role="alert" style={{color:'#EF4444'}}>{error}</p>}{success&&<p role="status" style={{color:'#10B981'}}>{success}</p>}
 <section style={panel}><h2 style={{fontSize:18}}>Instructions</h2><p style={{whiteSpace:'pre-wrap',overflowWrap:'anywhere'}}>{a.description}</p>{a.materialId&&<button style={button} onClick={()=>{void downloadAssignmentFile(`/api/materials/${a.materialId}/download`,'assignment-material').catch(e=>setError(e.message));}}>Download supporting material</button>}</section>
 <section style={panel}><h2 style={{fontSize:18}}>Your Submission</h2>{a.submission?<><p>{a.submission.fileName} · {dueText(a.submission.submittedAt)}{a.submission.isLate?' · Late':''}</p>{a.submission.note&&<p style={{whiteSpace:'pre-wrap'}}>{a.submission.note}</p>}<button style={button} onClick={()=>{void downloadAssignmentFile(`/api/assignments/${a.id}/submission`,a.submission!.fileName).catch(e=>setError(e.message));}}>Download your submission</button></>:<p>You have not submitted a file yet.</p>}
 {closed?<p>The deadline has passed. Submissions are closed.</p>:exhausted?<p>You have reached the attempt limit.</p>:<form onSubmit={submit} style={{display:'grid',gap:12,marginTop:20}}><label>Submission file<input name="file" type="file" required disabled={busy} accept=".pdf,.doc,.docx,.ppt,.pptx,.xlsx,.zip,.png,.jpg,.jpeg" style={{display:'block',marginTop:8}}/></label><small>Up to 10 MB. PDF, Office documents, ZIP, PNG or JPG. A new attempt replaces your latest submission.</small><label>Note (optional)<textarea name="note" maxLength={2000} disabled={busy} rows={3} style={{display:'block',width:'100%',background:c.surface2,color:c.text,border:`1px solid ${c.border}`,borderRadius:9,padding:10,boxSizing:'border-box'}}/></label><button disabled={busy} style={{...button,background:c.primary,color:'white',justifySelf:'start'}}>{busy?'Submitting…':a.hasSubmission?'Submit New Attempt':'Submit Assignment'}</button></form>}
 </section>
 {canManage&&<SubmissionReview id={a.id}/>}
 </div>{edit&&<AssignmentEditor assignment={a} onClose={()=>{setEdit(false);void refreshAssignments();}}/>}</div>;
}
