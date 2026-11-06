const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');const vm=require('node:vm');const ts=require('typescript');
function setup(fetcher){let snapshot,subscribe;const mod={exports:{}};
 const code=ts.transpileModule(fs.readFileSync('src/lib/directory.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
 vm.runInNewContext(code,{module:mod,exports:mod.exports,require:n=>{if(n==='react')return {useSyncExternalStore:(sub,get)=>{subscribe=sub;snapshot=get;return get();}};if(n==='./announcements-types')return {};throw Error(n);},fetch:fetcher,window:{addEventListener(){},removeEventListener(){}},setInterval(){return 1;},clearInterval(){},setTimeout(){},URL,console});
 const api=mod.exports;api.useDirectory();return {api,state:()=>snapshot(),subscribe:()=>subscribe(()=>{})};
}

const directory={fullName:'Test User',members:[]};
function ok(){return Response.json({directory});}
test('directory read failure clears previous private profile',async()=>{let fail=false;const s=setup(async()=>fail?Response.json({error:'Sign in'},{status:401}):ok());await s.api.refreshDirectory();assert.equal(s.state().directory.fullName,'Test User');fail=true;await s.api.refreshDirectory();assert.equal(s.state().directory,null);assert.equal(s.state().error,'Sign in');});
test('older directory response cannot overwrite latest',async()=>{let release,n=0;const s=setup(()=>++n===1?new Promise(r=>release=r):Promise.resolve(Response.json({directory:{fullName:'Latest'}})));const old=s.api.refreshDirectory();await s.api.refreshDirectory();release(ok());await old;assert.equal(s.state().directory.fullName,'Latest');});
test('unmount clears private profile and invalidates pending request',async()=>{let release;const s=setup(()=>new Promise(r=>release=r));const unsubscribe=s.subscribe();unsubscribe();release(ok());await new Promise(r=>setImmediate(r));assert.equal(s.state().directory,null);});
