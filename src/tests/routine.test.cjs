const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = process.cwd();
const os=require('node:os');
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'unilink-materials-'));
process.on('exit',()=>fs.rmSync(tmp,{recursive:true,force:true}));
function loader(mocks = {}) {
  const cache = new Map();
  function load(relative) {
    const file = path.resolve(root, relative);
    if (cache.has(file)) return cache.get(file);
    const result = { exports: {} };
    cache.set(file, result.exports);
    const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { esModuleInterop:true, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
    const context = { exports: result.exports, module: result, Buffer, Request, Response, URL, Date, Uint8Array, FormData, File,
      process: { cwd:()=>root, env: { APP_ORIGIN: "http://localhost:3002", MATERIALS_DIR: tmp, ASSIGNMENTS_DIR: tmp } }, console: { error() {} },
      require(spec) {
        if (Object.hasOwn(mocks, spec)) return mocks[spec];
        if (spec === 'server-only') return {};
        if (spec.startsWith('node:')) return require(spec);
        if (spec.startsWith('@/')) return load('src/' + spec.slice(2) + '.ts');
        if (spec.startsWith('.')) return load(path.resolve(path.dirname(file), spec + '.ts'));
        throw new Error('Unexpected import: ' + spec);
      },
    };
    vm.runInNewContext(code, context, { filename: file });
    return result.exports;
  }
  return load;
}


const key='11111111-1111-4111-8111-111111111111';
const valid={id:key,version:1,course:'Database',code:'CSE 305',instructor:'Dr Test',room:'502',weekday:0,startTime:'09:00',endTime:'10:30',kind:'Lecture',notes:''};
function setup({role='cr',overlap=false,exists=true,version=1,fail=false}={}){const calls=[];let committed=0,rolled=0,released=0;
 const execute=async(sql,args)=>{calls.push([sql,args]);if(fail&&/INSERT|UPDATE class_routine|DELETE/.test(sql))throw Error('secret');if(sql.startsWith('SELECT')){
 if(sql.includes('FROM classes'))return [[{id:42,department:'CSE',batch:'52',section:'B'}]];
 if(sql.includes('SELECT version'))return [exists?[{version}]:[]];
 if(sql.includes('start_time<?'))return [overlap?[{id:key}]:[]];
 return [[{...valid,start_time:'09:00:00',end_time:'10:30:00'}]];}return [{affectedRows:1}];};
 const db={execute,beginTransaction:async()=>{},commit:async()=>{committed++},rollback:async()=>{rolled++},release:()=>{released++}};
 const load=loader({'./session':{getSessionUser:async()=>role?{id:7,class_id:42,role}:null,isCr:r=>r==='cr'||r==='admin'},'@/lib/server/session':{isCr:r=>r==='cr'||r==='admin'},'@/lib/server/db':{getDb:()=>({...db,getConnection:async()=>db})}});
 return {api:load('src/app/api/routine/route.ts'),logic:load('src/lib/server/routine.ts'),types:load('src/lib/routine-types.ts'),calls,counts:()=>({committed,rolled,released})};}
function req(method,body=valid,origin='http://localhost:3002'){return new Request('http://localhost:3002/api/routine',{method,headers:{origin,'Content-Type':'application/json'},body:JSON.stringify(body)});}
test('anonymous cannot read routine',async()=>{const s=setup({role:null});assert.equal((await s.api.GET()).status,401);assert.equal(s.calls.length,0);});
test('read scopes entries and class label to session',async()=>{const s=setup({role:'student'});const b=await (await s.api.GET()).json();assert.equal(b.canManage,false);assert.equal(b.entries[0].startTime,'09:00');assert.match(s.calls[0][0],/WHERE class_id=\?/);assert.deepEqual(Array.from(s.calls[0][1]),[42]);});
test('students cannot create edit or delete',async()=>{for(const method of ['POST','PATCH','DELETE']){const s=setup({role:'student'});assert.equal((await s.api[method](req(method))).status,403);assert.equal(s.calls.length,0);}});
test('foreign origin is rejected before database access',async()=>{const s=setup();assert.equal((await s.api.POST(req('POST',valid,'http://evil.test'))).status,403);assert.equal(s.calls.length,0);});
test('create uses session class and author and locks parent before checking overlap',async()=>{const s=setup();assert.equal((await s.api.POST(req('POST',{...valid,class_id:999,author_id:999}))).status,201);assert.match(s.calls[0][0],/FROM classes.*FOR UPDATE/);assert.match(s.calls[1][0],/start_time<\? AND end_time>\?/);const insert=s.calls.find(c=>c[0].startsWith('INSERT'));assert.deepEqual(Array.from(insert[1]).slice(-2),[42,7]);assert.equal(s.counts().committed,1);});
test('overlap rejects both create and edit and rolls back',async()=>{for(const method of ['POST','PATCH']){const s=setup({overlap:true});assert.equal((await s.api[method](req(method))).status,409);assert.equal(s.calls.some(c=>/^(INSERT|UPDATE)/.test(c[0])),false);assert.equal(s.counts().rolled,1);}});
test('overlap check permits touching boundaries and excludes edited id',async()=>{const s=setup();await s.api.PATCH(req('PATCH'));const q=s.calls.find(c=>c[0].includes('start_time<?'));assert.deepEqual(Array.from(q[1]),[42,0,key,'10:30','09:00']);assert.equal(q[0].includes('start_time<=?'),false);});
test('invalid days times overnight and empty fields rejected',async()=>{for(const invalid of [{weekday:7},{weekday:'0'},{startTime:'24:00'},{endTime:'09:00'},{endTime:'08:00'},{course:''},{kind:'Unknown'},{notes:'a'.repeat(2001)}]){const s=setup();assert.equal((await s.api.POST(req('POST',{...valid,...invalid}))).status,400);assert.equal(s.calls.length,0);}});
test('foreign or absent entry cannot be edited or deleted',async()=>{for(const method of ['PATCH','DELETE']){const s=setup({exists:false});assert.equal((await s.api[method](req(method))).status,404);assert.match(s.calls[1][0],/id=\? AND class_id=\?/);assert.deepEqual(Array.from(s.calls[1][1]),[key,42]);}});
test('stale version conflicts before edit or delete',async()=>{for(const method of ['PATCH','DELETE']){const s=setup({version:2});assert.equal((await s.api[method](req(method))).status,409);assert.equal(s.counts().rolled,1);}});
test('edit increments version and delete removes only session class row',async()=>{for(const method of ['PATCH','DELETE']){const s=setup();assert.equal((await s.api[method](req(method))).status,200);const q=s.calls.at(-1);assert.match(q[0],/WHERE id=\? AND class_id=\? AND version=\?/);assert.deepEqual(Array.from(q[1]).slice(-3),[key,42,1]);if(method==='PATCH')assert.match(q[0],/version=version\+1/);assert.equal(s.counts().released,1);}});
test('database write failure rolls back hides internals and releases connection',async()=>{const s=setup({fail:true});const res=await s.api.POST(req('POST'));assert.equal(res.status,503);assert.doesNotMatch(await res.text(),/secret/);assert.equal(s.counts().rolled,1);assert.equal(s.counts().released,1);});
test('Bangladesh day changes at 18:00 UTC and time formats noon/midnight',()=>{const s=setup();assert.equal(s.types.dhakaClock(Date.parse('2026-10-31T18:00:00Z')).day,0);assert.equal(s.types.dhakaClock(Date.parse('2026-10-31T18:00:00Z')).time,'00:00');assert.equal(s.types.formatRoutineTime('00:00'),'12:00 AM');assert.equal(s.types.formatRoutineTime('12:00'),'12:00 PM');});
