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
const valid={id:key,version:1,title:'AI Workshop',description:'Bring a laptop.',category:'Workshop',organizer:'Class CR',location:'Lab 2',startsAt:'2027-01-10T10:00',endsAt:'2027-01-10T12:00',cancelled:false};
function setup({role='cr',affected=1,fail=false,event={version:1,cancelled:0,rsvp_open:1}}={}){
 const calls=[],steps=[];
 const execute=async(sql,args)=>{calls.push([sql,args]);if(fail)throw Error('secret credentials');if(sql.includes('FOR UPDATE'))return [event?[event]:[]];if(sql.startsWith('SELECT'))return [[{...valid,starts_at:new Date('2027-01-10T04:00:00Z'),ends_at:new Date('2027-01-10T06:00:00Z'),my_going:null,going_count:2,author:'CR User'}]];return [{affectedRows:affected}];};
 const db={execute,beginTransaction:async()=>steps.push('begin'),commit:async()=>steps.push('commit'),rollback:async()=>steps.push('rollback'),release:()=>steps.push('release')};
 const load=loader({'./session':{getSessionUser:async()=>role?{id:7,class_id:42,role}:null,isCr:r=>r==='cr'||r==='admin'},'@/lib/server/session':{isCr:r=>r==='cr'||r==='admin'},'@/lib/server/db':{getDb:()=>({...db,getConnection:async()=>db})}});
 return {api:load('src/app/api/events/route.ts'),rsvp:load('src/app/api/events/rsvp/route.ts'),types:load('src/lib/event-types.ts'),calls,steps};
}
function req(method,body=valid,origin='http://localhost:3002'){return new Request('http://localhost:3002/api/events',{method,headers:{origin,'Content-Type':'application/json'},body:JSON.stringify(body)});}
test('events reject anonymous reads and writes',async()=>{const s=setup({role:null});assert.equal((await s.api.GET()).status,401);assert.equal((await s.api.POST(req('POST'))).status,401);assert.equal((await s.rsvp.PUT(req('PUT',{...valid,going:true}))).status,401);assert.equal(s.calls.length,0);});
test('event list scopes class, own response and aggregate attendees without exposing identities',async()=>{const s=setup({role:'student'});const b=await (await s.api.GET()).json();assert.equal(b.canManage,false);assert.equal(b.entries[0].myGoing,null);assert.equal(b.entries[0].goingCount,2);assert.equal(b.entries[0].startsAt,'2027-01-10T04:00:00.000Z');assert.match(s.calls[0][0],/r.user_id=\? WHERE e.class_id=\?/);assert.match(s.calls[0][0],/attendee.class_id=e.class_id/);assert.deepEqual(Array.from(s.calls[0][1]),[7,42]);assert.equal(b.entries[0].user_id,undefined);});
test('students cannot create edit or delete events',async()=>{for(const m of ['POST','PATCH','DELETE']){const s=setup({role:'student'});assert.equal((await s.api[m](req(m))).status,403);assert.equal(s.calls.length,0);}});
test('event writes reject cross-origin requests',async()=>{for(const m of ['POST','PATCH','DELETE']){const s=setup();assert.equal((await s.api[m](req(m,valid,'http://evil.test'))).status,403);assert.equal(s.calls.length,0);}const s=setup();assert.equal((await s.rsvp.PUT(req('PUT',{...valid,going:true},'http://evil.test'))).status,403);assert.equal(s.calls.length,0);});
test('publish forces session class and author and converts BD time to UTC',async()=>{const s=setup();assert.equal((await s.api.POST(req('POST',{...valid,class_id:999,author_id:999}))).status,201);const a=s.calls[0][1];assert.deepEqual(Array.from(a).slice(1,3),[42,7]);assert.equal(a[8].toISOString(),'2027-01-10T04:00:00.000Z');assert.equal(a[9].toISOString(),'2027-01-10T06:00:00.000Z');});
test('invalid dates ranges types and fields rejected',async()=>{for(const bad of [{title:''},{description:' '},{category:'Invalid'},{cancelled:'false'},{organizer:''},{location:'x'.repeat(201)},{startsAt:'2027-02-29T10:00'},{startsAt:'2027-13-01T10:00'},{startsAt:'2027-01-10T24:30'},{endsAt:valid.startsAt},{endsAt:'2027-01-10T09:00'},{startsAt:'2027-01-10T10:00Z'}]){const s=setup();assert.equal((await s.api.POST(req('POST',{...valid,...bad}))).status,400);assert.equal(s.calls.length,0);}});
test('valid leap date and multi-day events allowed',async()=>{const s=setup();assert.equal((await s.api.POST(req('POST',{...valid,startsAt:'2028-02-29T23:00',endsAt:'2028-03-01T01:00'}))).status,201);});
test('cancel and edit guarded by class and version and preserve author',async()=>{const s=setup();assert.equal((await s.api.PATCH(req('PATCH',{...valid,cancelled:true}))).status,200);assert.match(s.calls[0][0],/version=version\+1/);assert.match(s.calls[0][0],/WHERE id=\? AND class_id=\? AND version=\?/);assert.doesNotMatch(s.calls[0][0],/author_id=/);assert.deepEqual(Array.from(s.calls[0][1]).slice(-4),[1,key,42,1]);});
test('stale or other-class event cannot be changed or deleted',async()=>{for(const m of ['PATCH','DELETE']){const s=setup({affected:0});assert.equal((await s.api[m](req(m))).status,409);}});
test('delete scopes class and version and migration cascades RSVP cleanup',async()=>{const s=setup();await s.api.DELETE(req('DELETE'));assert.match(s.calls[0][0],/^DELETE FROM class_events WHERE id=\? AND class_id=\? AND version=\?/);assert.deepEqual(Array.from(s.calls[0][1]),[key,42,1]);assert.match(fs.readFileSync('sql/010-class-events.sql','utf8'),/FOREIGN KEY \(event_id\) REFERENCES class_events\(id\) ON DELETE CASCADE/);});
test('malformed identifiers and versions rejected before query',async()=>{for(const bad of [{id:'bad'},{version:0},{version:'1'},{version:4294967296}]){const s=setup();assert.equal((await s.api.DELETE(req('DELETE',{...valid,...bad}))).status,400);assert.equal(s.calls.length,0);}});
test('RSVP forces session user and locks class event before idempotent upsert',async()=>{const s=setup({role:'student'});assert.equal((await s.rsvp.PUT(req('PUT',{...valid,going:true,user_id:999,class_id:999}))).status,200);assert.deepEqual(s.steps,['begin','commit','release']);assert.match(s.calls[0][0],/WHERE id=\? AND class_id=\? FOR UPDATE/);assert.deepEqual(Array.from(s.calls[0][1]),[key,42]);assert.deepEqual(Array.from(s.calls[1][1]),[key,7,1]);assert.match(s.calls[1][0],/ON DUPLICATE KEY UPDATE going=VALUES\(going\)/);});
test('not-going stored as own explicit response',async()=>{const s=setup({role:'student'});assert.equal((await s.rsvp.PUT(req('PUT',{...valid,going:false}))).status,200);assert.equal(s.calls[1][1][2],0);});
test('missing foreign cancelled started or stale event rejects RSVP and rolls back',async()=>{for(const event of [null,{version:1,cancelled:1,rsvp_open:1},{version:1,cancelled:0,rsvp_open:0},{version:2,cancelled:0,rsvp_open:1}]){const s=setup({event});assert.equal((await s.rsvp.PUT(req('PUT',{...valid,going:true}))).status,event?409:404);assert.deepEqual(s.steps,['begin','rollback','release']);assert.equal(s.calls.length,1);}});
test('RSVP boolean type required before transaction',async()=>{const s=setup();assert.equal((await s.rsvp.PUT(req('PUT',{...valid,going:'true'}))).status,400);assert.equal(s.calls.length,0);assert.equal(s.steps.length,0);});
test('database errors are safe and RSVP always releases connection',async()=>{const s=setup({fail:true});const res=await s.rsvp.PUT(req('PUT',{...valid,going:true}));assert.equal(res.status,503);assert.doesNotMatch(await res.text(),/secret/);assert.deepEqual(s.steps,['begin','rollback','release']);});
test('oversized malformed and wrong content type requests rejected',async()=>{for(const [body,type,status] of [['{','application/json',400],['x'.repeat(41000),'application/json',413],['{}','text/plain',415]]){const s=setup();assert.equal((await s.api.POST(new Request('http://localhost:3002/api/events',{method:'POST',headers:{origin:'http://localhost:3002','Content-Type':type},body}))).status,status);assert.equal(s.calls.length,0);}});
test('event status boundaries and Bangladesh editor roundtrip',()=>{const {types:t}=setup(),e={...valid,startsAt:'2027-01-10T04:00:00Z',endsAt:'2027-01-10T06:00:00Z'};assert.equal(t.eventStatus(e,Date.parse('2027-01-10T03:59:59Z')),'Upcoming');assert.equal(t.eventStatus(e,Date.parse(e.startsAt)),'In progress');assert.equal(t.eventStatus(e,Date.parse(e.endsAt)),'Completed');assert.equal(t.eventStatus({...e,cancelled:true},0),'Cancelled');assert.equal(t.eventLocal(e.startsAt),valid.startsAt);});
test('SQL placeholders match values for CRUD and RSVP',async()=>{const s=setup();await s.api.GET();for(const m of ['POST','PATCH','DELETE'])await s.api[m](req(m));await s.rsvp.PUT(req('PUT',{...valid,going:true}));for(const [sql,args] of s.calls)assert.equal((sql.match(/\?/g)||[]).length,args.length);});
