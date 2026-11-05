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
const valid={id:key,version:1,title:'Class notice',message:'Bring your lab notebook.',category:'Academic',pinned:false};
function setup({role='cr',affected=1,fail=false}={}){const calls=[];
 const execute=async(sql,args)=>{calls.push([sql,args]);if(fail)throw Error('secret credentials');if(sql.startsWith('SELECT'))return sql.includes('FROM classes')?[[{department:'CSE',batch:'52',section:'B'}]]:[[{...valid,author:'CR User',created_at:new Date('2026-11-05T10:00:00Z'),updated_at:new Date('2026-11-05T10:00:00Z')}]];return [{affectedRows:affected}];};
 const load=loader({'./session':{getSessionUser:async()=>role?{id:7,class_id:42,role}:null,isCr:r=>r==='cr'||r==='admin'},'@/lib/server/session':{isCr:r=>r==='cr'||r==='admin'},'@/lib/server/db':{getDb:()=>({execute})}});
 return {api:load('src/app/api/announcements/route.ts'),calls};}
function req(method,body=valid,origin='http://localhost:3002'){return new Request('http://localhost:3002/api/announcements',{method,headers:{origin,'Content-Type':'application/json'},body:JSON.stringify(body)});}
test('anonymous cannot read announcements',async()=>{const s=setup({role:null});assert.equal((await s.api.GET()).status,401);assert.equal(s.calls.length,0);});
test('read scopes class and orders pinned posts before newest posts',async()=>{const s=setup({role:'student'});const b=await (await s.api.GET()).json();assert.equal(b.canManage,false);assert.equal(b.entries[0].author,'CR User');assert.equal(b.entries[0].pinned,false);assert.equal(b.entries[0].createdAt,'2026-11-05T10:00:00.000Z');assert.match(s.calls[0][0],/WHERE a.class_id=\?/);assert.match(s.calls[0][0],/ORDER BY a.pinned DESC,a.created_at DESC/);assert.deepEqual(Array.from(s.calls[0][1]),[42]);});
test('students cannot publish edit or delete',async()=>{for(const method of ['POST','PATCH','DELETE']){const s=setup({role:'student'});assert.equal((await s.api[method](req(method))).status,403);assert.equal(s.calls.length,0);}});
test('foreign origin rejected before database access',async()=>{const s=setup();assert.equal((await s.api.POST(req('POST',valid,'http://evil.test'))).status,403);assert.equal(s.calls.length,0);});
test('publish derives author and class from session and persists plain text',async()=>{const s=setup();const message='<script>alert(1)</script>';assert.equal((await s.api.POST(req('POST',{...valid,message,class_id:999,author_id:999}))).status,201);assert.deepEqual(Array.from(s.calls[0][1]).slice(1),[42,7,valid.title,message,valid.category,0]);});
test('invalid fields and pin types rejected',async()=>{for(const bad of [{title:''},{message:' '},{category:'University Admin'},{pinned:'true'},{title:'x'.repeat(201)},{message:'x'.repeat(8001)}]){const s=setup();assert.equal((await s.api.POST(req('POST',{...valid,...bad}))).status,400);assert.equal(s.calls.length,0);}});
test('edit scopes version and class, increments version and preserves original author',async()=>{const s=setup();assert.equal((await s.api.PATCH(req('PATCH',{...valid,pinned:true,author_id:999}))).status,200);const q=s.calls[0];assert.match(q[0],/version=version\+1/);assert.match(q[0],/WHERE id=\? AND class_id=\? AND version=\?/);assert.doesNotMatch(q[0],/author_id=/);assert.deepEqual(Array.from(q[1]).slice(-4),[1,key,42,1]);});
test('stale missing or foreign entries cannot be edited or deleted',async()=>{for(const method of ['PATCH','DELETE']){const s=setup({affected:0});assert.equal((await s.api[method](req(method))).status,409);}});
test('delete affects only requested row in session class and version',async()=>{const s=setup();assert.equal((await s.api.DELETE(req('DELETE'))).status,200);assert.match(s.calls[0][0],/^DELETE FROM class_announcements WHERE id=\? AND class_id=\? AND version=\?/);assert.deepEqual(Array.from(s.calls[0][1]),[key,42,1]);});
test('malformed ID or version rejected before write',async()=>{for(const bad of [{id:'../../etc'},{version:0},{version:'1'}]){const s=setup();assert.equal((await s.api.DELETE(req('DELETE',{...valid,...bad}))).status,400);assert.equal(s.calls.length,0);}});
test('database errors remain errors without exposing internals',async()=>{const s=setup({fail:true});const res=await s.api.POST(req('POST'));assert.equal(res.status,503);assert.doesNotMatch(await res.text(),/secret/);});
test('malformed and oversized JSON fail before DB access',async()=>{const s=setup();const request=body=>new Request('http://localhost:3002/api/announcements',{method:'POST',headers:{origin:'http://localhost:3002','Content-Type':'application/json'},body});assert.equal((await s.api.POST(request('{'))).status,400);assert.equal((await s.api.POST(request(JSON.stringify({...valid,message:'x'.repeat(41000)})))).status,413);assert.equal(s.calls.length,0);});
test('SQL placeholders match bound values for all writes',async()=>{for(const method of ['POST','PATCH','DELETE']){const s=setup();await s.api[method](req(method));assert.equal((s.calls[0][0].match(/\?/g)||[]).length,s.calls[0][1].length);}});
