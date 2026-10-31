"use client";
import {useState,useRef} from "react";
import {useTheme,tok} from "./Theme";
import {uploadMaterial} from "@/lib/materials";
import {MATERIAL_TYPES} from "@/lib/material-types";
export default function MaterialUpload({onClose}:{onClose:()=>void}){
 const {theme}=useTheme();const c=tok(theme);const [busy,setBusy]=useState(false);const [error,setError]=useState("");const [done,setDone]=useState(false);const lock=useRef(false);
 const input:React.CSSProperties={width:"100%",padding:10,marginTop:5,borderRadius:9,border:`1px solid ${c.border}`,background:c.surface2,color:c.text,boxSizing:"border-box"};
 async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();if(lock.current)return;lock.current=true;setBusy(true);setError("");const form=new FormData(e.currentTarget);
 try{await uploadMaterial(form);setDone(true);}catch(e){setError(e instanceof Error?e.message:"Upload failed.");}finally{lock.current=false;setBusy(false);}}
 return <div style={{position:"fixed",inset:0,zIndex:1000,background:"#0009",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
 <section role="dialog" aria-modal="true" aria-labelledby="upload-title" style={{background:c.surface,color:c.text,padding:28,borderRadius:18,maxWidth:520,width:"100%",maxHeight:"90vh",overflowY:"auto"}}>
 <h2 id="upload-title" style={{marginTop:0}}>Upload Class Material</h2>
 {done?<><p role="status">Material published to your registered class.</p><button onClick={onClose} style={input}>Done</button></>:<form onSubmit={submit}>
 <fieldset disabled={busy} style={{border:0,padding:0,margin:0,display:"grid",gap:12}}>
 <label>Title<input name="title" required maxLength={200} style={input}/></label>
 <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
 <label>Course name<input name="course" required maxLength={100} placeholder="Database Management" style={input}/></label>
 <label>Course code<input name="code" required maxLength={100} placeholder="CSE 305" style={input}/></label></div>
 <label>Category<select name="type" defaultValue="Notes" style={input}>{MATERIAL_TYPES.map(t=><option key={t}>{t}</option>)}</select></label>
 <label>Description<textarea name="description" maxLength={2000} rows={3} style={input}/></label>
 <label>File<input name="file" type="file" required accept=".pdf,.doc,.docx,.ppt,.pptx,.xlsx,.zip,.png,.jpg,.jpeg" style={input}/></label>
 <small style={{color:c.textMuted}}>Up to 10 MB. PDF, Office documents, ZIP, PNG or JPG. Shared only with your registered class.</small>
 </fieldset>
 {error&&<p role="alert" style={{color:"#EF4444"}}>{error}</p>}
 <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:20}}><button type="button" disabled={busy} onClick={onClose} style={{...input,width:"auto"}}>Cancel</button><button disabled={busy} style={{...input,width:"auto",background:c.primary,color:"white"}}>{busy?"Uploading…":"Upload & Publish"}</button></div>
 </form>}
 </section></div>;
}
