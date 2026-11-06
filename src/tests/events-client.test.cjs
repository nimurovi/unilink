const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');const vm=require('node:vm');const ts=require('typescript');
function setup(fetcher){let snapshot,subscribe;const mod={exports:{}};
 const code=ts.transpileModule(fs.readFileSync('src/lib/events.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
 vm.runInNewContext(code,{module:mod,exports:mod.exports,require:n=>{if(n==='./portal-access')return {usePortalCanManage:v=>v};if(n==='react')return {useSyncExternalStore:(sub,get)=>{subscribe=sub;snapshot=get;return get();}};if(n==='./events-types')return {};throw Error(n);},fetch:fetcher,window:{addEventListener(){},removeEventListener(){}},setInterval(){return 1;},clearInterval(){},setTimeout(){},URL,console});
 const api=mod.exports;api.useEvent();return {api,state:()=>snapshot(),subscribe:()=>subscribe(()=>{})};
}
const entry={id:'a',title:'Notes'};
function ok(){return Response.json({entries:[entry],savedIds:[],canManage:true});}
test('failed read clears previous class content and permissions',async()=>{let fail=false;const s=setup(async()=>fail?Response.json({error:'Unavailable'},{status:503}):ok());await s.api.refreshEvent();assert.equal(s.state().entries.length,1);fail=true;await s.api.refreshEvent();assert.equal(s.state().entries.length,0);assert.equal(s.state().canManage,false);assert.equal(s.state().error,'Unavailable');});
test('out-of-order read cannot restore stale content',async()=>{let release;let n=0;const s=setup(()=>++n===1?new Promise(r=>release=r):Promise.resolve(Response.json({entries:[],savedIds:[],canManage:false})));const first=s.api.refreshEvent();await s.api.refreshEvent();release(ok());await first;assert.equal(s.state().entries.length,0);});
test('unmount clears cache and rejects late response',async()=>{let release;const s=setup(()=>new Promise(r=>release=r));const unsub=s.subscribe();unsub();release(ok());await new Promise(r=>setImmediate(r));assert.equal(s.state().entries.length,0);assert.equal(s.state().canManage,false);});
test('failed events mutations reject without displaying success',async()=>{const s=setup(async()=>Response.json({error:'Denied'},{status:403}));await assert.rejects(s.api.saveEvent({}),/Denied/);await assert.rejects(s.api.deleteEvent({id:'a',version:1}),/Denied/);assert.equal(s.state().entries.length,0);});
test('successful mutation refreshes server list',async()=>{const calls=[];const s=setup(async(url,opts)=>{calls.push(opts?.method||'GET');return opts?.method?Response.json({ok:true}):ok();});await s.api.saveEvent({},{id:'a',version:1});assert.deepEqual(calls,['PATCH','GET']);assert.equal(s.state().entries[0].title,'Notes');});

test('RSVP posts exact event version and refreshes list',async()=>{const calls=[];const s=setup(async(url,opts)=>{calls.push([url,opts]);return opts?.method?Response.json({ok:true}):ok();});await s.api.respondEvent({id:'a',version:3},false);assert.equal(calls[0][0],'/api/events/rsvp');assert.equal(calls[0][1].method,'PUT');assert.deepEqual(JSON.parse(calls[0][1].body),{id:'a',version:3,going:false});assert.equal(calls[1][0],'/api/events');});
test('failed RSVP surfaces conflict without claiming success',async()=>{const s=setup(async()=>Response.json({error:'Event changed'},{status:409}));await assert.rejects(s.api.respondEvent({id:'a',version:1},true),/Event changed/);});
