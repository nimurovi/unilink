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



const id='11111111-1111-4111-8111-111111111111',key='announcements:'+id+':1';
function setup({user={id:7,class_id:42,role:'student'},rows=[],fail=false}={}){const calls=[];
 const execute=async(sql,args)=>{calls.push([sql,args]);if(fail)throw Error('secret DB password');return sql.startsWith('SELECT')?[rows]:[{affectedRows:1}];};
 const load=loader({'./session':{getSessionUser:async()=>user},'@/lib/server/db':{getDb:()=>({execute})}});
 return {api:load('src/app/api/notifications/route.ts'),calls};}
function req(body={keys:[key],read:true},origin='http://localhost:3002'){return new Request('http://localhost:3002/api/notifications',{method:'PATCH',headers:{origin,'Content-Type':'application/json'},body:JSON.stringify(body)});}
test('notifications require authentication for reads and writes',async()=>{const s=setup({user:null});assert.equal((await s.api.GET()).status,401);assert.equal((await s.api.PATCH(req())).status,401);assert.equal(s.calls.length,0);});
test('feed scopes all nine sources and joins receipts for session user and exact version',async()=>{const s=setup();assert.equal((await s.api.GET()).status,200);const [sql,args]=s.calls[0];assert.equal((sql.match(/class_id=\?/g)||[]).length,9);assert.deepEqual(Array.from(args),[42,42,42,42,42,42,42,42,42,7]);assert.match(sql,/r.user_id=\? AND r.kind=n.kind AND r.source_id=n.id AND r.version=n.version/);assert.match(sql,/LIMIT 200/);assert.match(sql,/status='published'/);assert.equal((sql.match(/deleted_at IS NULL/g)||[]).length,2);});
test('read receipt and version are correctly represented in API',async()=>{const rows=[0,1].map((is_read,i)=>({id,kind:'announcements',title:'Notice',body:'Text',version:i+1,activity_at:new Date('2026-11-05T10:00:00Z'),is_read}));const s=setup({rows});const b=await (await s.api.GET()).json();assert.equal(b.entries[0].unread,true);assert.equal(b.entries[1].unread,false);assert.equal(b.entries[1].key,'announcements:'+id+':2');assert.equal(b.entries[0].time,'2026-11-05T10:00:00.000Z');});
test('students may persist their own read status; forged user and class are ignored',async()=>{const s=setup();assert.equal((await s.api.PATCH(req({keys:[key],read:true,user_id:999,class_id:999}))).status,200);assert.deepEqual(Array.from(s.calls[0][1]),[7,1,42,42,42,42,42,42,42,42,42,key]);});
test('mark unread persists false without altering source tables',async()=>{const s=setup();await s.api.PATCH(req({keys:[key],read:false}));assert.equal(s.calls[0][1][1],0);assert.match(s.calls[0][0],/^INSERT INTO notification_reads/);assert.match(s.calls[0][0],/ON DUPLICATE KEY UPDATE is_read=VALUES\(is_read\)/);});
test('batch mark reads only explicit current same-class source versions in one write',async()=>{const s=setup();await s.api.PATCH(req({keys:[key,key,'exams:'+id+':2'],read:true}));assert.equal(s.calls.length,1);assert.match(s.calls[0][0],/WHERE CONCAT\(n.kind,':',n.id,':',n.version\) IN \(\?,\?\)/);assert.equal(s.calls[0][1].length,13);assert.equal((s.calls[0][0].match(/class_id=\?/g)||[]).length,9);});
test('foreign origin denied without database access',async()=>{const s=setup();assert.equal((await s.api.PATCH(req(undefined,'http://evil.test'))).status,403);assert.equal(s.calls.length,0);});
test('invalid payloads fail before DB access',async()=>{for(const body of [{keys:[],read:true},{keys:[key],read:'true'},{keys:Array(201).fill(key),read:true},{keys:['other:'+id+':1'],read:true},{keys:['exams:../../etc:1'],read:true},{keys:['exams:'+id+':0'],read:true},{keys:['exams:'+id+':4294967296'],read:true},{keys:[123],read:true}]){const s=setup();assert.equal((await s.api.PATCH(req(body))).status,400);assert.equal(s.calls.length,0);}});
test('malformed or oversized JSON rejected',async()=>{for(const [body,status] of [['{',400],['x'.repeat(41000),413]]){const s=setup();assert.equal((await s.api.PATCH(new Request('http://localhost:3002/api/notifications',{method:'PATCH',headers:{origin:'http://localhost:3002','Content-Type':'application/json'},body}))).status,status);assert.equal(s.calls.length,0);}});
test('unavailable database clears success and hides SQL internals',async()=>{const s=setup({fail:true});for(const res of [await s.api.GET(),await s.api.PATCH(req())]){assert.equal(res.status,503);assert.doesNotMatch(await res.text(),/secret DB/);}});
test('SQL parameters match placeholders for read and write',async()=>{const s=setup();await s.api.GET();await s.api.PATCH(req());for(const [sql,args] of s.calls)assert.equal((sql.match(/\?/g)||[]).length,args.length);});

test('opportunity notifications support own read receipts',async()=>{const s=setup();assert.equal((await s.api.PATCH(req({keys:['opportunities:'+id+':1'],read:true}))).status,200);assert.match(s.calls[0][0],/FROM class_opportunities WHERE class_id=\?/);});

test('club notifications support own read receipts without membership data',async()=>{const s=setup();assert.equal((await s.api.PATCH(req({keys:['clubs:'+id+':1'],read:true}))).status,200);assert.match(s.calls[0][0],/FROM class_clubs WHERE class_id=\?/);assert.doesNotMatch(s.calls[0][0],/club_memberships/);});
