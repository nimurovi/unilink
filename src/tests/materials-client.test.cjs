const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');const vm=require('node:vm');const ts=require('typescript');
function setup(fetcher){let snapshot,subscribe;const mod={exports:{}};
 const code=ts.transpileModule(fs.readFileSync('src/lib/materials.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
 vm.runInNewContext(code,{module:mod,exports:mod.exports,require:n=>{if(n==='./portal-access')return {usePortalCanManage:v=>v};if(n==='react')return {useSyncExternalStore:(sub,get)=>{subscribe=sub;snapshot=get;return get();}};throw Error(n);},fetch:fetcher,window:{addEventListener(){},removeEventListener(){}},setInterval(){return 1;},clearInterval(){},setTimeout(){},URL,console});
 const api=mod.exports;api.useMaterials();return {api,state:()=>snapshot(),subscribe:()=>subscribe(()=>{})};
}
const entry={id:'a',title:'Notes'};
function ok(){return Response.json({materials:[entry],savedIds:[],canManage:true});}
test('failed read clears previous class content and permissions',async()=>{let fail=false;const s=setup(async()=>fail?Response.json({error:'Unavailable'},{status:503}):ok());await s.api.refreshMaterials();assert.equal(s.state().materials.length,1);fail=true;await s.api.refreshMaterials();assert.equal(s.state().materials.length,0);assert.equal(s.state().canManage,false);assert.equal(s.state().error,'Unavailable');});
test('out-of-order read cannot restore stale content',async()=>{let release;let n=0;const s=setup(()=>++n===1?new Promise(r=>release=r):Promise.resolve(Response.json({materials:[],savedIds:[],canManage:false})));const first=s.api.refreshMaterials();await s.api.refreshMaterials();release(ok());await first;assert.equal(s.state().materials.length,0);});
test('unmount clears cache and rejects late response',async()=>{let release;const s=setup(()=>new Promise(r=>release=r));const unsub=s.subscribe();unsub();release(ok());await new Promise(r=>setImmediate(r));assert.equal(s.state().materials.length,0);assert.equal(s.state().canManage,false);});
test('failed upload and bookmark reject without displaying success',async()=>{const s=setup(async()=>Response.json({error:'Denied'},{status:403}));await assert.rejects(s.api.uploadMaterial(new FormData()),/Denied/);await assert.rejects(s.api.saveMaterial('a',true),/Denied/);assert.equal(s.state().materials.length,0);assert.equal(s.state().savedIds.length,0);});
test('successful mutation refreshes server list',async()=>{const calls=[];const s=setup(async(url,opts)=>{calls.push(opts?.method||'GET');return opts?.method?Response.json({ok:true}):ok();});await s.api.saveMaterial('a',true);assert.deepEqual(calls,['PATCH','GET']);assert.equal(s.state().materials[0].title,'Notes');});
