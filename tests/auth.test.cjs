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
function request(body, origin = 'http://localhost:3002') {
 return new Request('http://localhost:3002/api/auth/login', {method:'POST',headers:{origin,'content-type':'application/json'},body:JSON.stringify(body)});
}
const input = {identifier:'TEST@example.com',password:'test-password',portal:'student'};
function loginSetup(user, valid=true, failure=false) {
 const calls=[]; let sessions=0;
 const load=loader({
  '@/lib/server/db':{getDb:()=>({execute:async(sql,args)=>{calls.push([sql,args]);if(failure)throw new Error('secret SQL');return [user?[user]:[]];}})},
  '@/lib/server/password':{verifyPassword:async()=>valid},
  '@/lib/server/session':{isCr:r=>r==='cr'||r==='admin',createSession:async()=>{sessions++;}}
 });
 return {post:load('src/app/api/auth/login/route.ts').POST,calls,count:()=>sessions};
}
const student={id:1,role:'student',is_active:1,password_hash:'hash'};
test('credentials and active state are required; student cannot choose CR',async()=>{
 for(const [user,valid,status] of [[null,true,401],[student,false,401],[{...student,is_active:0},true,401]]) {
  const s=loginSetup(user,valid);assert.equal((await s.post(request(input))).status,status);assert.equal(s.count(),0);
 }
 const s=loginSetup(student);assert.equal((await s.post(request({...input,portal:'cr',role:'admin'}))).status,403);assert.equal(s.count(),0);
});
test('email and student ID queries are parameterized; role controls destination',async()=>{
 const s=loginSetup(student);const r=await s.post(request(input));assert.equal(r.status,200);assert.equal((await r.json()).redirect,'/dashboard');assert.equal(s.count(),1);
 assert.match(s.calls[0][0],/email = \?/);assert.equal(s.calls[0][1][0],'test@example.com');
 const cr=loginSetup({...student,role:'cr'});assert.equal((await (await cr.post(request({...input,portal:'cr',identifier:'ID-123'}))).json()).redirect,'/cr-portal');assert.match(cr.calls[0][0],/student_id = \?/);
});
test('origin, JSON size, invalid input, and errors are handled',async()=>{
 const s=loginSetup(student);
 assert.equal((await s.post(request(input,'http://evil.test'))).status,403);
 assert.equal((await s.post(request({...input,password:''}))).status,400);
 assert.equal((await s.post(request({...input,identifier:'x'.repeat(5000)}))).status,413);
 const fail=loginSetup(student,true,true);const r=await fail.post(request(input));assert.equal(r.status,503);assert.ok(!(await r.text()).includes('secret SQL'));
});
test('local attempt limit returns 429',async()=>{
 const s=loginSetup(null);for(let i=0;i<20;i++)assert.equal((await s.post(request(input))).status,401);
 assert.equal((await s.post(request(input))).status,429);
});
function sessionSetup(token='a'.repeat(64),rows=[]) {
 const calls=[];const changes=[];
 const connection={beginTransaction:async()=>calls.push(['begin']),execute:async(sql,args)=>{calls.push([sql,args]);return [rows];},commit:async()=>calls.push(['commit']),rollback:async()=>calls.push(['rollback']),release:()=>calls.push(['release'])};
 const db={...connection,getConnection:async()=>connection};
 const load=loader({'./db':{getDb:()=>db},'next/headers':{cookies:async()=>({get:()=>token?{value:token}:undefined,set:(...args)=>changes.push(args)})},'next/navigation':{redirect:to=>{throw new Error('redirect:'+to);}}});
 return {api:load('src/lib/server/session.ts'),calls,changes};
}
test('sessions rotate tokens, store only hashes, set HttpOnly and revoke on logout',async()=>{
 const s=sessionSetup();await s.api.createSession(7);
 const insert=s.calls.find(c=>c[0].includes('INSERT INTO sessions'));
 const cookie=s.changes[0];assert.equal(cookie[0],'unilink_session');assert.match(cookie[1],/^[a-f0-9]{64}$/);assert.notEqual(insert[1][0],cookie[1]);assert.equal(insert[1][0],s.api.tokenHash(cookie[1]));assert.equal(cookie[2].httpOnly,true);assert.equal(cookie[2].sameSite,'lax');
 assert.ok(s.calls.some(c=>c[0].includes('DELETE FROM sessions WHERE token_hash')));
 await s.api.destroySession();assert.equal(s.changes[1][2].maxAge,0);
});
test('session lookup rejects malformed tokens and requires expiry and active account',async()=>{
 const bad=sessionSetup('bad');assert.equal(await bad.api.getSessionUser(),null);assert.equal(bad.calls.length,0);
 const expired=sessionSetup();assert.equal(await expired.api.getSessionUser(),null);assert.match(expired.calls[0][0],/expires_at > UTC_TIMESTAMP\(\)/);assert.match(expired.calls[0][0],/is_active = 1/);
 await assert.rejects(expired.api.requireUser(),/redirect:\/login/);
 const studentSession=sessionSetup('a'.repeat(64),[student]);await assert.rejects(studentSession.api.requireUser(true),/cr-required/);
});
test('logout rejects foreign origins and clears sessions only on POST',async()=>{
 let destroyed=0;
 const post=loader({'@/lib/server/session':{destroySession:async()=>{destroyed++;}}})('src/app/api/auth/logout/route.ts').POST;
 assert.equal((await post(request({},'https://evil.test'))).status,403);assert.equal(destroyed,0);
 assert.equal((await post(request({}))).status,200);assert.equal(destroyed,1);
});
