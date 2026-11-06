const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');const vm=require('node:vm');const ts=require('typescript');
function setup(fetcher){let snapshot,subscribe;const mod={exports:{}};
 const code=ts.transpileModule(fs.readFileSync('src/lib/account.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
 vm.runInNewContext(code,{module:mod,exports:mod.exports,require:n=>{if(n==='react')return {useSyncExternalStore:(sub,get)=>{subscribe=sub;snapshot=get;return get();}};if(n==='./announcements-types')return {};throw Error(n);},fetch:fetcher,window:{addEventListener(){},removeEventListener(){}},setInterval(){return 1;},clearInterval(){},setTimeout(){},URL,console});
 const api=mod.exports;api.useAccount();return {api,state:()=>snapshot(),subscribe:()=>subscribe(()=>{})};
}

const account={fullName:'Test User',email:'test@example.com',role:'student'};
function ok(){return Response.json({account});}
test('account read failure clears previous private profile',async()=>{let fail=false;const s=setup(async()=>fail?Response.json({error:'Sign in'},{status:401}):ok());await s.api.refreshAccount();assert.equal(s.state().account.fullName,'Test User');fail=true;await s.api.refreshAccount();assert.equal(s.state().account,null);assert.equal(s.state().error,'Sign in');});
test('older account response cannot overwrite latest',async()=>{let release,n=0;const s=setup(()=>++n===1?new Promise(r=>release=r):Promise.resolve(Response.json({account:{fullName:'Latest'}})));const old=s.api.refreshAccount();await s.api.refreshAccount();release(ok());await old;assert.equal(s.state().account.fullName,'Latest');});
test('unmount clears private profile and invalidates pending request',async()=>{let release;const s=setup(()=>new Promise(r=>release=r));const unsubscribe=s.subscribe();unsubscribe();release(ok());await new Promise(r=>setImmediate(r));assert.equal(s.state().account,null);});
test('saving name sends original name and refreshes identity',async()=>{const calls=[];const s=setup(async(url,opts)=>{calls.push([url,opts]);return opts?.method?Response.json({ok:true}):ok();});await s.api.saveAccount('New Name','Old Name');assert.deepEqual(JSON.parse(calls[0][1].body),{fullName:'New Name',expectedName:'Old Name'});assert.equal(calls[1][0],'/api/account');assert.equal(s.state().account.fullName,'Test User');});
test('password success clears identity while failed password keeps it',async()=>{let fail=true;const s=setup(async(url,opts)=>opts?.method?fail?Response.json({error:'Incorrect'},{status:400}):Response.json({ok:true}):ok());await s.api.refreshAccount();await assert.rejects(s.api.changePassword('a','b','b'),/Incorrect/);assert.equal(s.state().account.fullName,'Test User');fail=false;await s.api.changePassword('a','b','b');assert.equal(s.state().account,null);});
test('name conflict rejects without false success',async()=>{const s=setup(async()=>Response.json({error:'Changed elsewhere'},{status:409}));await assert.rejects(s.api.saveAccount('New','Old'),/Changed elsewhere/);});
