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
const valid={id:key,version:1,title:'Programming Club',description:'Weekly practice.',category:'Technology',contact:'Organizer at Lab 2',meetingInfo:'Thursday 3pm, Lab 2',closed:false};
function setup({role='cr',affected=1,fail=false,club={version:1,closed:0}}={}){
 const calls=[],steps=[];
 const execute=async(sql,args)=>{calls.push([sql,args]);if(fail)throw Error('secret credentials');if(sql.includes('FOR UPDATE'))return [club?[club]:[]];if(sql.startsWith('SELECT'))return [[{...valid,my_joined:null,member_count:2,author:'CR User'}]];return [{affectedRows:affected}];};
 const db={execute,beginTransaction:async()=>steps.push('begin'),commit:async()=>steps.push('commit'),rollback:async()=>steps.push('rollback'),release:()=>steps.push('release')};
 const load=loader({'./session':{getSessionUser:async()=>role?{id:7,class_id:42,role}:null,isCr:r=>r==='cr'||r==='admin'},'@/lib/server/session':{isCr:r=>r==='cr'||r==='admin'},'@/lib/server/db':{getDb:()=>({...db,getConnection:async()=>db})}});
 return {api:load('src/app/api/clubs/route.ts'),membership:load('src/app/api/clubs/membership/route.ts'),types:load('src/lib/club-types.ts'),calls,steps};
}
function req(method,body=valid,origin='http://localhost:3002'){return new Request('http://localhost:3002/api/clubs',{method,headers:{origin,'Content-Type':'application/json'},body:JSON.stringify(body)});}
test('clubs reject anonymous reads and writes',async()=>{const s=setup({role:null});assert.equal((await s.api.GET()).status,401);assert.equal((await s.api.POST(req('POST'))).status,401);assert.equal((await s.membership.PUT(req('PUT',{...valid,joined:true}))).status,401);assert.equal(s.calls.length,0);});
test('club list scopes class, own response and aggregate attendees without exposing identities',async()=>{const s=setup({role:'student'});const b=await (await s.api.GET()).json();assert.equal(b.canManage,false);assert.equal(b.entries[0].joined,false);assert.equal(b.entries[0].memberCount,2);assert.match(s.calls[0][0],/r.user_id=\? WHERE e.class_id=\?/);assert.match(s.calls[0][0],/attendee.class_id=e.class_id/);assert.deepEqual(Array.from(s.calls[0][1]),[7,42]);assert.equal(b.entries[0].user_id,undefined);});
test('students cannot create edit or delete clubs',async()=>{for(const m of ['POST','PATCH','DELETE']){const s=setup({role:'student'});assert.equal((await s.api[m](req(m))).status,403);assert.equal(s.calls.length,0);}});
test('club writes reject cross-origin requests',async()=>{for(const m of ['POST','PATCH','DELETE']){const s=setup();assert.equal((await s.api[m](req(m,valid,'http://evil.test'))).status,403);assert.equal(s.calls.length,0);}const s=setup();assert.equal((await s.membership.PUT(req('PUT',{...valid,joined:true},'http://evil.test'))).status,403);assert.equal(s.calls.length,0);});
test('publish forces session class and author',async()=>{const s=setup();assert.equal((await s.api.POST(req('POST',{...valid,class_id:999,author_id:999}))).status,201);const a=s.calls[0][1];assert.deepEqual(Array.from(a).slice(1,3),[42,7]);assert.equal(a[6],valid.contact);assert.equal(a[7],valid.meetingInfo);});
test('invalid fields and closed types rejected',async()=>{for(const bad of [{title:''},{title:'x'.repeat(201)},{description:' '},{description:'x'.repeat(8001)},{category:'Invalid'},{closed:'false'},{contact:''},{meetingInfo:'x'.repeat(1001)}]){const s=setup();assert.equal((await s.api.POST(req('POST',{...valid,...bad}))).status,400);assert.equal(s.calls.length,0);}});
test('close and edit guarded by class and version and preserve author',async()=>{const s=setup();assert.equal((await s.api.PATCH(req('PATCH',{...valid,closed:true}))).status,200);assert.match(s.calls[0][0],/version=version\+1/);assert.match(s.calls[0][0],/WHERE id=\? AND class_id=\? AND version=\?/);assert.doesNotMatch(s.calls[0][0],/author_id=/);assert.deepEqual(Array.from(s.calls[0][1]).slice(-4),[1,key,42,1]);});
test('stale or other-class club cannot be changed or deleted',async()=>{for(const m of ['PATCH','DELETE']){const s=setup({affected:0});assert.equal((await s.api[m](req(m))).status,409);}});
test('delete scopes class and version and migration cascades membership cleanup',async()=>{const s=setup();await s.api.DELETE(req('DELETE'));assert.match(s.calls[0][0],/^DELETE FROM class_clubs WHERE id=\? AND class_id=\? AND version=\?/);assert.deepEqual(Array.from(s.calls[0][1]),[key,42,1]);assert.match(fs.readFileSync('sql/012-class-clubs.sql','utf8'),/FOREIGN KEY \(club_id\) REFERENCES class_clubs\(id\) ON DELETE CASCADE/);});
test('malformed identifiers and versions rejected before query',async()=>{for(const bad of [{id:'bad'},{version:0},{version:'1'},{version:4294967296}]){const s=setup();assert.equal((await s.api.DELETE(req('DELETE',{...valid,...bad}))).status,400);assert.equal(s.calls.length,0);}});
test('membership forces session user and locks class club before idempotent upsert',async()=>{const s=setup({role:'student'});assert.equal((await s.membership.PUT(req('PUT',{...valid,joined:true,user_id:999,class_id:999}))).status,200);assert.deepEqual(s.steps,['begin','commit','release']);assert.match(s.calls[0][0],/WHERE id=\? AND class_id=\? FOR UPDATE/);assert.deepEqual(Array.from(s.calls[0][1]),[key,42]);assert.deepEqual(Array.from(s.calls[1][1]),[key,7,1]);assert.match(s.calls[1][0],/ON DUPLICATE KEY UPDATE joined=VALUES\(joined\)/);});
test('not-joined stored as own explicit response',async()=>{const s=setup({role:'student'});assert.equal((await s.membership.PUT(req('PUT',{...valid,joined:false}))).status,200);assert.equal(s.calls[1][1][2],0);});
test('missing foreign closed or stale club rejects membership and rolls back',async()=>{for(const club of [null,{version:1,closed:1},{version:2,closed:0}]){const s=setup({club});assert.equal((await s.membership.PUT(req('PUT',{...valid,joined:true}))).status,club?409:404);assert.deepEqual(s.steps,['begin','rollback','release']);assert.equal(s.calls.length,1);}});
test('membership boolean type required before transaction',async()=>{const s=setup();assert.equal((await s.membership.PUT(req('PUT',{...valid,joined:'true'}))).status,400);assert.equal(s.calls.length,0);assert.equal(s.steps.length,0);});
test('database errors are safe and membership always releases connection',async()=>{const s=setup({fail:true});const res=await s.membership.PUT(req('PUT',{...valid,joined:true}));assert.equal(res.status,503);assert.doesNotMatch(await res.text(),/secret/);assert.deepEqual(s.steps,['begin','rollback','release']);});
test('oversized malformed and wrong content type requests rejected',async()=>{for(const [body,type,status] of [['{','application/json',400],['x'.repeat(41000),'application/json',413],['{}','text/plain',415]]){const s=setup();assert.equal((await s.api.POST(new Request('http://localhost:3002/api/clubs',{method:'POST',headers:{origin:'http://localhost:3002','Content-Type':type},body}))).status,status);assert.equal(s.calls.length,0);}});
test('SQL placeholders match values for CRUD and membership',async()=>{const s=setup();await s.api.GET();for(const m of ['POST','PATCH','DELETE'])await s.api[m](req(m));await s.membership.PUT(req('PUT',{...valid,joined:true}));for(const [sql,args] of s.calls)assert.equal((sql.match(/\?/g)||[]).length,args.length);});

test('members can leave after registration closes',async()=>{const s=setup({role:'student',club:{version:1,closed:1}});assert.equal((await s.membership.PUT(req('PUT',{...valid,joined:false}))).status,200);assert.equal(s.calls[1][1][2],0);assert.deepEqual(s.steps,['begin','commit','release']);});
test('member counts exclude inactive and transferred users',async()=>{const s=setup();await s.api.GET();assert.match(s.calls[0][0],/attendee.class_id=e.class_id AND attendee.is_active=1/);});
