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


const key='11111111-1111-4111-8111-111111111111';const context={params:Promise.resolve({id:key})};
const pdf=Buffer.from('%PDF-1.4\nTest submission\n%%EOF');
const valid={title:'SQL homework',course:'Database',code:'CSE 305',instructor:'Dr Test',description:'Solve the exercises.',dueAt:'2026-11-10T23:59:00+06:00',totalMarks:20,maxAttempts:3,allowLate:false,materialId:null,version:1};
const row={id:key,class_id:42,title:valid.title,course:valid.course,code:valid.code,instructor:valid.instructor,description:valid.description,due_at:'2026-11-10T17:59:00Z',created_at:'2026-10-31T00:00:00Z',total_marks:20,max_attempts:3,allow_late:0,version:1,material_id:null,past_due:0};
function setup({role='student',visible=true,late=0,allowLate=0,attempts=0,version=1,affected=1,fail=false,attachment=true,downloadRow=null}={}){
 const calls=[];let begin=0,commit=0,rollback=0,release=0;
 async function execute(sql,args){calls.push([sql,args]);if(fail&&(/INSERT|UPDATE/.test(sql)))throw Error('secret DB credentials');
 if(sql.startsWith('SELECT')){
  if(sql.includes('class_materials'))return [attachment?[{id:key}]:[]];
  if(sql.includes('FOR UPDATE'))return [visible?[{...row,past_due:late,allow_late:allowLate,max_attempts:3,version}]:[]];
  if(sql.startsWith('SELECT attempts'))return [attempts?[{attempts}]:[]];
  if(sql.includes('s.file_id'))return [downloadRow?[downloadRow]:[]];
  if(sql.includes('u.full_name'))return [[]];
  return [visible?[row]:[]];
 }
 return [{affectedRows:affected}];
 }
 const db={execute,beginTransaction:async()=>{begin++;},commit:async()=>{commit++;},rollback:async()=>{rollback++;},release:()=>{release++;}};
 const load=loader({
 './session':{getSessionUser:async()=>role?{id:7,class_id:42,role}:null,isCr:r=>r==='cr'||r==='admin'},
 '@/lib/server/session':{isCr:r=>r==='cr'||r==='admin'},
 '@/lib/server/db':{getDb:()=>({...db,getConnection:async()=>db})}
 });
 return {api:load('src/app/api/assignments/route.ts'),item:load('src/app/api/assignments/[id]/route.ts'),sub:load('src/app/api/assignments/[id]/submissions/route.ts'),download:load('src/app/api/assignments/[id]/submission/route.ts'),files:load('src/lib/server/assignment-files.ts'),logic:load('src/lib/server/assignments.ts'),types:load('src/lib/assignment-types.ts'),calls,counts:()=>({begin,commit,rollback,release})};
}
function req(method,body,url='http://localhost:3002/api/assignments',origin='http://localhost:3002'){return new Request(url,{method,headers:{origin,...(body instanceof FormData?{}:{'Content-Type':'application/json'})},body:body===undefined?undefined:body instanceof FormData?body:JSON.stringify(body)});}
function form(){const f=new FormData();f.set('version','1');f.set('note','My solution');f.set('user_id','999');f.set('file',new File([pdf],'answer.pdf'));return f;}
test('anonymous cannot list assignments',async()=>{const s=setup({role:null});assert.equal((await s.api.GET()).status,401);assert.equal(s.calls.length,0);});
test('list joins only own submission and filters by class',async()=>{const s=setup();const res=await s.api.GET();assert.equal(res.status,200);assert.deepEqual(Array.from(s.calls[0][1]),[7,42]);assert.match(s.calls[0][0],/s.user_id=\?/);assert.match(s.calls[0][0],/a.class_id=\?/);assert.equal((await res.json()).assignments[0].title,valid.title);});
test('foreign or removed detail is 404, never another assignment',async()=>{const s=setup({visible:false});assert.equal((await s.item.GET(req('GET'),context)).status,404);assert.deepEqual(Array.from(s.calls[0][1]),[7,key,42]);});
test('student cannot create edit or remove',async()=>{for(const [api,method] of [['api','POST'],['item','PATCH'],['item','DELETE']]){const s=setup();assert.equal((await s[api][method](req(method,valid),context)).status,403);assert.equal(s.calls.length,0);}});
test('cross-origin mutation rejected',async()=>{const s=setup({role:'cr'});assert.equal((await s.api.POST(req('POST',valid,undefined,'https://other.test'))).status,403);});
test('create derives class and author, normalizes deadline to UTC',async()=>{const s=setup({role:'cr'});assert.equal((await s.api.POST(req('POST',{...valid,class_id:999,author_id:999}))).status,201);const args=s.calls.find(c=>c[0].startsWith('INSERT'))[1];assert.equal(args[1],42);assert.equal(args[2],7);assert.equal(args[8],'2026-11-10 17:59:00');assert.deepEqual(s.counts(),{begin:1,commit:1,rollback:0,release:1});});
test('foreign attachment fails before assignment insert',async()=>{const s=setup({role:'cr',attachment:false});assert.equal((await s.api.POST(req('POST',{...valid,materialId:key}))).status,400);assert.equal(s.calls.length,1);assert.equal(s.counts().rollback,1);});
test('invalid deadline, marks and attempt limits rejected',()=>{const s=setup();for(const b of [{...valid,dueAt:'tomorrow'},{...valid,dueAt:'2026-11-10T23:59:00'},{...valid,totalMarks:-1},{...valid,maxAttempts:0},{...valid,maxAttempts:1.5},{...valid,allowLate:'true'}])assert.throws(()=>s.logic.validateAssignment(b));});
test('edit scopes by class and version and stale edit conflicts',async()=>{const s=setup({role:'cr'});assert.equal((await s.item.PATCH(req('PATCH',valid),context)).status,200);const c=s.calls.find(c=>c[0].startsWith('UPDATE'));assert.deepEqual(Array.from(c[1].slice(-3)),[key,42,1]);const stale=setup({role:'cr',affected:0});assert.equal((await stale.item.PATCH(req('PATCH',valid),context)).status,409);assert.equal(stale.counts().rollback,1);});
test('remove is scoped and preserves submission records',async()=>{const s=setup({role:'cr'});assert.equal((await s.item.DELETE(req('DELETE',{version:1}),context)).status,200);assert.match(s.calls[0][0],/SET deleted_at/);assert.deepEqual(Array.from(s.calls[0][1]),[key,42,1]);});
test('student cannot list classmates submissions',async()=>{const s=setup();assert.equal((await s.sub.GET(req('GET'),context)).status,403);assert.equal(s.calls.length,0);});
test('CR review query is scoped to class and current student membership',async()=>{const s=setup({role:'cr'});assert.equal((await s.sub.GET(req('GET'),context)).status,200);assert.match(s.calls[1][0],/u.class_id=a.class_id/);assert.deepEqual(Array.from(s.calls[1][1]),[key,42]);});
test('foreign assignment rejects upload before file writes',async()=>{const s=setup({visible:false});const before=fs.readdirSync(tmp);assert.equal((await s.sub.POST(req('POST',form()),context)).status,404);assert.deepEqual(fs.readdirSync(tmp),before);});
test('accepted submission locks assignment, uses session user and saves exact bytes',async()=>{const s=setup();const res=await s.sub.POST(req('POST',form()),context);assert.equal(res.status,201);assert.match(s.calls[1][0],/FOR UPDATE/);const args=s.calls.find(c=>c[0].startsWith('INSERT'))[1];assert.equal(args[0],key);assert.equal(args[1],7);assert.deepEqual(await s.files.readSubmission(args[2]),pdf);assert.deepEqual(s.counts(),{begin:1,commit:1,rollback:0,release:1});await s.files.discardSubmission(args[2]);});
test('deadline, attempt and changed-version conflicts roll back and clean file',async()=>{for(const opts of [{late:1},{attempts:3},{version:2}]){const s=setup(opts);const before=fs.readdirSync(tmp);const res=await s.sub.POST(req('POST',form()),context);assert.equal(res.status,409);assert.equal(s.counts().rollback,1);assert.equal(s.counts().commit,0);assert.deepEqual(fs.readdirSync(tmp),before);assert.equal(s.calls.filter(c=>c[0].startsWith('INSERT')).length,0);}});
test('allowed late submission is stored with late flag',async()=>{const s=setup({late:1,allowLate:1});assert.equal((await s.sub.POST(req('POST',form()),context)).status,201);const args=s.calls.find(c=>c[0].startsWith('INSERT'))[1];assert.equal(args.at(-1),1);await s.files.discardSubmission(args[2]);});
test('failed submission DB write cleans file and hides internals',async()=>{const s=setup({fail:true});const before=fs.readdirSync(tmp);const res=await s.sub.POST(req('POST',form()),context);assert.equal(res.status,503);assert.doesNotMatch(await res.text(),/credentials/);assert.equal(s.counts().rollback,1);assert.deepEqual(fs.readdirSync(tmp),before);});
test('student cannot download someone elses work',async()=>{const s=setup();assert.equal((await s.download.GET(req('GET',undefined,'http://localhost:3002/api/assignments/'+key+'/submission?userId=8'),context)).status,403);assert.equal(s.calls.length,0);});
test('own download returns original bytes with safe private headers',async()=>{const s=setup({downloadRow:{file_id:key,file_name:'answer.pdf'}});await s.files.storeSubmission(key,pdf);const res=await s.download.GET(req('GET'),context);assert.equal(res.status,200);assert.deepEqual(Array.from(s.calls[0][1]),[key,42,7]);assert.match(res.headers.get('content-disposition'),/^attachment/);assert.match(res.headers.get('cache-control'),/no-store/);assert.deepEqual(Buffer.from(await res.arrayBuffer()),pdf);await s.files.discardSubmission(key);});
test('CR cannot download across classes; missing work is 404',async()=>{const s=setup({role:'cr'});assert.equal((await s.download.GET(req('GET',undefined,'http://localhost:3002/api/assignments/'+key+'/submission?userId=8'),context)).status,404);assert.deepEqual(Array.from(s.calls[0][1]),[key,42,8]);assert.match(s.calls[0][0],/owner.class_id=a.class_id/);});
test('status is deadline-based and a real submission takes priority',()=>{const s=setup();const due='2026-11-10T00:00:00Z';const t=Date.parse(due);assert.equal(s.types.assignmentStatus(due,false,t),'overdue');assert.equal(s.types.assignmentStatus(due,false,t-3600000),'due-soon');assert.equal(s.types.assignmentStatus(due,false,t-72*3600000),'upcoming');assert.equal(s.types.assignmentStatus(due,true,t+3600000),'submitted');});
