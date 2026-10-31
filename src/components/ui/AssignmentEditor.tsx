"use client";
import {useRef,useState} from "react";
import {useTheme,tok} from "./Theme";
import {useMaterials} from "@/lib/materials";
import {writeAssignment} from "@/lib/assignments";
import type {Assignment,AssignmentInput} from "@/lib/assignment-types";
export default function AssignmentEditor({assignment:a,onClose}:{assignment?:Assignment;onClose:()=>void}){
 const {theme}=useTheme(),c=tok(theme);const materials=useMaterials();const [error,setError]=useState("");const [busy,setBusy]=useState(false);const lock=useRef(false);
 const input:React.CSSProperties={width:"100%",padding:10,marginTop:5,borderRadius:9,border:`1px solid ${c.border}`,background:c.surface2,color:c.text,boxSizing:"border-box"};
 const deadline=a?new Date(Date.parse(a.dueAt)+6*3600000).toISOString().slice(0,16):"";
 async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();if(lock.current)return;lock.current=true;setBusy(true);setError("");const f=new FormData(e.currentTarget);const text=(k:string)=>String(f.get(k)||'');
 const data:AssignmentInput={title:text('title'),course:text('course'),code:text('code'),instructor:text('instructor'),description:text('description'),dueAt:text('dueAt')+':00+06:00',totalMarks:Number(f.get('marks')),maxAttempts:Number(f.get('attempts')),allowLate:f.get('late')==='on',materialId:text('material')||null};
 try{await writeAssignment(data,a?.id,a?.version);onClose();}catch(e){setError(e instanceof Error?e.message:'Could not save assignment.');}finally{lock.current=false;setBusy(false);}}
 return <div style={{position:"fixed",inset:0,zIndex:1000,background:"#0009",display:"flex",justifyContent:"center",alignItems:"center",padding:16}}><section role="dialog" aria-modal="true" aria-labelledby="assignment-editor-title" style={{width:"100%",maxWidth:620,maxHeight:"90vh",overflowY:"auto",background:c.surface,color:c.text,padding:28,borderRadius:18}}>
 <h2 id="assignment-editor-title">{a?'Edit Assignment':'Create Assignment'}</h2><form onSubmit={submit}>
 <fieldset disabled={busy} style={{border:0,padding:0,display:"grid",gap:12}}>
 <label>Title<input required name="title" maxLength={200} defaultValue={a?.title} style={input}/></label>
 <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12}}>
 <label>Course<input required name="course" maxLength={100} defaultValue={a?.course} style={input}/></label>
 <label>Course code<input required name="code" maxLength={100} defaultValue={a?.code} style={input}/></label>
 <label>Instructor<input required name="instructor" maxLength={150} defaultValue={a?.instructor} style={input}/></label>
 <label>Deadline (Bangladesh time)<input required type="datetime-local" name="dueAt" defaultValue={deadline} style={input}/></label>
 <label>Total marks<input required type="number" min={0} max={1000} name="marks" defaultValue={a?.totalMarks??100} style={input}/></label>
 <label>Maximum attempts<input required type="number" min={1} max={10} name="attempts" defaultValue={a?.maxAttempts??3} style={input}/></label>
 </div>
 <label>Instructions<textarea required name="description" maxLength={10000} rows={5} defaultValue={a?.description} style={input}/></label>
 <label>Supporting class material (optional)<select name="material" defaultValue={a?.materialId||''} style={input}><option value="">No attachment</option>{a?.materialId&&!materials.materials.some(m=>m.id===a.materialId)&&<option value={a.materialId}>Current attachment</option>}{materials.materials.map(m=><option key={m.id} value={m.id}>{m.title}</option>)}</select></label>
 {materials.error&&<small role="alert">Could not load attachments. Refresh before selecting a material.</small>}
 <label><input type="checkbox" name="late" defaultChecked={a?.allowLate??false}/> Allow late submissions (labelled late)</label>
 <small>Published only to your registered department, batch and section. Students upload one file per attempt, up to 10 MB.</small>
 </fieldset>{error&&<p role="alert" style={{color:"#EF4444"}}>{error}</p>}
 <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:20}}><button type="button" disabled={busy} onClick={onClose} style={{...input,width:"auto"}}>Cancel</button><button disabled={busy} style={{...input,width:"auto",background:c.primary,color:'white'}}>{busy?'Saving…':a?'Save Changes':'Publish Assignment'}</button></div>
 </form></section></div>;
}
