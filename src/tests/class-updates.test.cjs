const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = process.cwd();
function loader(mocks = {}) {
  const cache = new Map();
  function load(relative) {
    const file = path.resolve(root, relative);
    if (cache.has(file)) return cache.get(file);
    const result = { exports: {} };
    cache.set(file, result.exports);
    const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
    const context = { exports: result.exports, module: result, Buffer, Request, Response, URL, Date, Uint8Array,
      process: { env: { APP_ORIGIN: "http://localhost:3002" } }, console: { error() {} },
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

function setup(role='cr',fail=false,affected=1) {
 const calls=[];
 const load=loader({
 '@/lib/server/session':{getSessionUser:async()=>role?{id:7,class_id:42,role}:null,isCr:r=>r==='cr'||r==='admin'},
 '@/lib/server/db':{getDb:()=>({execute:async(sql,args)=>{calls.push([sql,args]);if(fail)throw Error('DB password');return [sql.startsWith('SELECT')?[]:{affectedRows:affected}];}})}
 });
 return {api:load('src/app/api/class-updates/route.ts'),calls};
}
const valid={id:'11111111-1111-4111-8111-111111111111',code:'CSE 305',type:'Class Delayed',detail:'11 AM',note:'',version:1};
function req(method,b=valid,origin='http://localhost:3002'){return new Request('http://localhost:3002/api/class-updates',{method,headers:{origin,'content-type':'application/json'},body:JSON.stringify(b)});}
test('unauthenticated read is denied',async()=>{const s=setup(null);assert.equal((await s.api.GET()).status,401);assert.equal(s.calls.length,0);});
test('read is scoped to session class',async()=>{const s=setup('student');assert.equal((await s.api.GET()).status,200);assert.match(s.calls[0][0],/WHERE class_id = \?/);assert.equal(s.calls[0][1][0],42);});
test('student cannot create, edit or delete',async()=>{for(const method of ['POST','PATCH','DELETE']){const s=setup('student');assert.equal((await s.api[method](req(method))).status,403);assert.equal(s.calls.length,0);}});
test('wrong origin is denied',async()=>{const s=setup();assert.equal((await s.api.POST(req('POST',valid,'https://other.example'))).status,403);assert.equal(s.calls.length,0);});
test('CR post ignores forged class and author',async()=>{const s=setup();assert.equal((await s.api.POST(req('POST',{...valid,class_id:99,author_id:99}))).status,201);assert.equal(s.calls[0][1][1],42);assert.equal(s.calls[0][1][2],7);});
test('invalid type and overlong details are rejected',async()=>{for(const b of [{...valid,type:'Fake'},{...valid,detail:'x'.repeat(2001)}]){const s=setup();assert.equal((await s.api.POST(req('POST',b))).status,400);assert.equal(s.calls.length,0);}});
test('edit and delete scope by class and version',async()=>{for(const m of ['PATCH','DELETE']){const s=setup();assert.equal((await s.api[m](req(m))).status,200);assert.match(s.calls[0][0],/class_id=\? AND version=\?/);assert.equal(s.calls[0][1].at(-2),42);assert.equal(s.calls[0][1].at(-1),1);}});
test('stale or foreign update returns conflict',async()=>{for(const m of ['PATCH','DELETE']){const s=setup('cr',false,0);assert.equal((await s.api[m](req(m))).status,409);}});
test('database failures do not report success or leak internals',async()=>{const s=setup('cr',true);const res=await s.api.POST(req('POST'));assert.equal(res.status,503);assert.doesNotMatch(await res.text(),/password/);});
