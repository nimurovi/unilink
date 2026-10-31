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
      process: { cwd:()=>root, env: { APP_ORIGIN: "http://localhost:3002", MATERIALS_DIR: tmp } }, console: { error() {} },
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
const context={params:Promise.resolve({id:key})};
const pdf=Buffer.from('%PDF-1.4\nTest file\n%%EOF');
function setup({role='cr',rows=[],fail=false,affected=1}={}) {
 const calls=[];
 const load=loader({
 './session':{getSessionUser:async()=>role?{id:7,class_id:42,role}:null,isCr:r=>r==='cr'||r==='admin'},
 '@/lib/server/session':{isCr:r=>r==='cr'||r==='admin'},
 '@/lib/server/db':{getDb:()=>({execute:async(sql,args)=>{calls.push([sql,args]);if(fail)throw Error('DB secret');return [sql.startsWith('SELECT')?rows:{affectedRows:affected}];}})}
 });
 return {api:load('src/app/api/materials/route.ts'),item:load('src/app/api/materials/[id]/route.ts'),download:load('src/app/api/materials/[id]/download/route.ts'),files:load('src/lib/server/material-files.ts'),calls};
}
function req(method,body,origin='http://localhost:3002') {return new Request('http://localhost:3002/api/materials',{method,headers:{origin,...(body instanceof FormData?{}:{'Content-Type':'application/json'})},body:body===undefined?undefined:body instanceof FormData?body:JSON.stringify(body)});}
function form(name='lesson.pdf',bytes=pdf){const f=new FormData();for(const [k,v] of Object.entries({title:'SQL notes',course:'Database',code:'CSE 305',type:'Notes',description:'Test',class_id:'999'}))f.set(k,v);f.set('file',new File([bytes],name));return f;}
test('anonymous users cannot list or download',async()=>{const s=setup({role:null});assert.equal((await s.api.GET()).status,401);assert.equal((await s.download.GET(req('GET'),context)).status,401);assert.equal(s.calls.length,0);});
test('list scopes materials to class and bookmarks to user',async()=>{const s=setup({role:'student'});assert.equal((await s.api.GET()).status,200);assert.deepEqual(Array.from(s.calls[0][1]),[7,42]);assert.match(s.calls[0][0],/m.class_id=\? AND m.deleted_at IS NULL/);});
test('student cannot upload or remove materials',async()=>{const s=setup({role:'student'});assert.equal((await s.api.POST(req('POST',form()))).status,403);assert.equal((await s.item.DELETE(req('DELETE'),context)).status,403);assert.equal(s.calls.length,0);});
test('foreign origins blocked before upload',async()=>{const s=setup();assert.equal((await s.api.POST(req('POST',form(),'https://evil.test'))).status,403);});
test('upload writes exact bytes and derives class and author from session',async()=>{const s=setup();const res=await s.api.POST(req('POST',form()));assert.equal(res.status,201);const b=await res.json();assert.deepEqual(await s.files.loadFile(b.id),pdf);assert.equal(s.calls[0][1][1],42);assert.equal(s.calls[0][1][2],7);await s.files.discardFile(b.id);});
test('failed metadata insert cleans staged file and hides DB details',async()=>{const s=setup({fail:true});const before=fs.readdirSync(tmp);const res=await s.api.POST(req('POST',form()));assert.equal(res.status,503);assert.doesNotMatch(await res.text(),/secret/);assert.deepEqual(fs.readdirSync(tmp),before);});
test('invalid signature and disallowed HTML uploads rejected',async()=>{for(const f of [form('x.pdf',Buffer.from('not pdf')),form('x.html',Buffer.from('<script>'))]){const s=setup();assert.equal((await s.api.POST(req('POST',f))).status,400);assert.equal(s.calls.length,0);}});
test('empty or oversized files and traversal IDs rejected',()=>{const f=setup().files;assert.throws(()=>f.validateFile('x.pdf',Buffer.alloc(0)));assert.throws(()=>f.validateFile('x.pdf',Buffer.alloc(f.MAX_FILE+1)));assert.throws(()=>f.materialId('../../private'));assert.equal(f.safeFilename('../../x.pdf'),'x.pdf');});
test('foreign and removed materials cannot be downloaded',async()=>{const s=setup();assert.equal((await s.download.GET(req('GET'),context)).status,404);assert.deepEqual(Array.from(s.calls[0][1]),[key,42]);assert.match(s.calls[0][0],/deleted_at IS NULL/);});
test('authorized download returns exact bytes as private attachment',async()=>{const s=setup({rows:[{file_name:'lesson.pdf'}]});await s.files.storeFile(key,pdf);const res=await s.download.GET(req('GET'),context);assert.equal(res.status,200);assert.match(res.headers.get('content-disposition'),/^attachment/);assert.match(res.headers.get('cache-control'),/no-store/);assert.equal(res.headers.get('x-content-type-options'),'nosniff');assert.deepEqual(Buffer.from(await res.arrayBuffer()),pdf);await s.files.discardFile(key);});
test('missing file returns useful error',async()=>{const s=setup({rows:[{file_name:'missing.pdf'}]});assert.equal((await s.download.GET(req('GET'),context)).status,404);});
test('bookmark requires same-class material and uses account ID',async()=>{const s=setup({role:'student',rows:[{id:key}]});assert.equal((await s.item.PATCH(req('PATCH',{saved:true,user_id:999}),context)).status,200);assert.deepEqual(Array.from(s.calls[0][1]),[key,42]);assert.deepEqual(Array.from(s.calls[1][1]),[7,key]);const foreign=setup({role:'student'});assert.equal((await foreign.item.PATCH(req('PATCH',{saved:true}),context)).status,404);assert.equal(foreign.calls.length,1);});
test('remove scopes to class and denies missing records',async()=>{const s=setup();assert.equal((await s.item.DELETE(req('DELETE'),context)).status,200);assert.deepEqual(Array.from(s.calls[0][1]),[key,42]);assert.match(s.calls[0][0],/SET deleted_at/);const missing=setup({affected:0});assert.equal((await missing.item.DELETE(req('DELETE'),context)).status,404);});
