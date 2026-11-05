const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');const vm=require('node:vm');const ts=require('typescript');
function setup(fetcher){let snapshot,subscribe;const mod={exports:{}};
 const code=ts.transpileModule(fs.readFileSync('src/lib/notifications.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
 vm.runInNewContext(code,{module:mod,exports:mod.exports,require:n=>{if(n==='react')return {useSyncExternalStore:(sub,get)=>{subscribe=sub;snapshot=get;return get();}};if(n==='./notifications-types')return {};throw Error(n);},fetch:fetcher,window:{addEventListener(){},removeEventListener(){}},setInterval(){return 1;},clearInterval(){},setTimeout(){},URL,console});
 const api=mod.exports;api.useNotifications();return {api,state:()=>snapshot(),subscribe:()=>subscribe(()=>{})};
}
const entry={id:'a',title:'Notes'};
function ok(){return Response.json({entries:[entry],savedIds:[],canManage:true});}
test('failed read clears previous class content and permissions',async()=>{let fail=false;const s=setup(async()=>fail?Response.json({error:'Unavailable'},{status:503}):ok());await s.api.refreshNotifications();assert.equal(s.state().entries.length,1);fail=true;await s.api.refreshNotifications();assert.equal(s.state().entries.length,0);assert.equal(s.state().error,'Unavailable');});
test('out-of-order read cannot restore stale content',async()=>{let release;let n=0;const s=setup(()=>++n===1?new Promise(r=>release=r):Promise.resolve(Response.json({entries:[],savedIds:[],canManage:false})));const first=s.api.refreshNotifications();await s.api.refreshNotifications();release(ok());await first;assert.equal(s.state().entries.length,0);});
test('unmount clears cache and rejects late response',async()=>{let release;const s=setup(()=>new Promise(r=>release=r));const unsub=s.subscribe();unsub();release(ok());await new Promise(r=>setImmediate(r));assert.equal(s.state().entries.length,0);});
test('failed notifications mutations reject without displaying success',async()=>{const s=setup(async()=>Response.json({error:'Denied'},{status:403}));await assert.rejects(s.api.markNotifications([{key:'a'}],true),/Denied/);await assert.rejects(s.api.markNotifications([{key:'a'}],false),/Denied/);assert.equal(s.state().entries.length,0);});
test('successful mutation refreshes server list',async()=>{const calls=[];const s=setup(async(url,opts)=>{calls.push(opts?.method||'GET');return opts?.method?Response.json({ok:true}):ok();});await s.api.markNotifications([{key:'a'}],true);assert.deepEqual(calls,['PATCH','GET']);assert.equal(s.state().entries[0].title,'Notes');});

test('empty mark-all performs no network mutation',async()=>{const s=setup(async()=>{throw Error('Unexpected request');});await s.api.markNotifications([],true);});
