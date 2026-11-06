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



const user={id:7,class_id:42,role:'student'},row={id:7,class_id:42,full_name:'Test Student',student_id:'ST7',email:'test@example.com',role:'student',department:'CSE',batch:'Batch 52',section:'Section B'};
const nameBody={fullName:'New Name',expectedName:row.full_name};
const passwordBody={currentPassword:'old password 123',newPassword:'new password 456',confirmPassword:'new password 456'};
function setup({accountUser=user,profile=row,signedIn=true,exists=true,currentName=row.full_name,correct=true,lockedHash='old-hash',failAt=''}={}){
 const calls=[],steps=[],cookies=[],passwords=[];
 const execute=async(sql,args)=>{calls.push([sql,args]);if(failAt&&sql.includes(failAt))throw Error('secret SQL');if(sql.startsWith('SELECT')){if(!exists)return [[]];if(sql.includes('password_hash'))return [[{password_hash:sql.includes('FOR UPDATE')?lockedHash:'old-hash'}]];return [[{...profile,full_name:currentName}]];}return [{affectedRows:1}];};
 const db={execute,beginTransaction:async()=>steps.push('begin'),commit:async()=>steps.push('commit'),rollback:async()=>steps.push('rollback'),release:()=>steps.push('release')};
 const load=loader({'./session':{getSessionUser:async()=>signedIn?accountUser:null},'@/lib/server/session':{COOKIE_NAME:'unilink_session',cookieOptions:()=>({httpOnly:true,path:'/',sameSite:'lax'})},'@/lib/server/db':{getDb:()=>({...db,getConnection:async()=>db})},'@/lib/server/password':{verifyPassword:async(p,h)=>{passwords.push(['verify',p,h]);return correct;},hashPassword:async p=>{passwords.push(['hash',p]);return 'new-hash';}},'next/headers':{cookies:async()=>({set:(...args)=>{steps.push('cookie');cookies.push(args);}})}});
 return {api:load('src/app/api/account/route.ts'),password:load('src/app/api/account/password/route.ts'),calls,steps,cookies,passwords};
}
function req(method,body,origin='http://localhost:3002'){return new Request('http://localhost:3002/api/account',{method,headers:{origin,'Content-Type':'application/json'},body:JSON.stringify(body)});}
test('account and password routes require sign-in',async()=>{const s=setup({signedIn:false});assert.equal((await s.api.GET()).status,401);assert.equal((await s.api.PATCH(req('PATCH',nameBody))).status,401);assert.equal((await s.password.POST(req('POST',passwordBody))).status,401);assert.equal(s.calls.length,0);});
test('account returns only own profile fields and never a password hash',async()=>{const s=setup();const b=await (await s.api.GET()).json();assert.equal(b.account.id,7);assert.equal(b.account.classId,42);assert.equal(b.account.fullName,row.full_name);assert.equal(b.account.studentId,'ST7');assert.equal(b.account.email,row.email);assert.equal(b.account.password_hash,undefined);assert.match(s.calls[0][0],/WHERE u.id=\? AND u.is_active=1/);assert.doesNotMatch(s.calls[0][0],/password_hash/);assert.deepEqual(Array.from(s.calls[0][1]),[7]);});
test('missing inactive account is not returned',async()=>{const s=setup({exists:false});assert.equal((await s.api.GET()).status,401);});
test('both account mutations reject foreign origins before querying',async()=>{const s=setup();assert.equal((await s.api.PATCH(req('PATCH',nameBody,'http://evil.test'))).status,403);assert.equal((await s.password.POST(req('POST',passwordBody,'http://evil.test'))).status,403);assert.equal(s.calls.length,0);});
test('name update trims text and is scoped to current user under lock',async()=>{const s=setup();assert.equal((await s.api.PATCH(req('PATCH',{...nameBody,fullName:'  New Name  '}))).status,200);assert.match(s.calls[0][0],/WHERE id=\? AND is_active=1 FOR UPDATE/);assert.deepEqual(Array.from(s.calls[1][1]),['New Name',7]);assert.deepEqual(s.steps,['begin','commit','release']);});
test('unchanged name is a successful no-op',async()=>{const s=setup();assert.equal((await s.api.PATCH(req('PATCH',{fullName:row.full_name,expectedName:row.full_name}))).status,200);assert.equal(s.calls.length,1);});
test('stale name edit is rejected and rolled back',async()=>{const s=setup({currentName:'Changed elsewhere'});assert.equal((await s.api.PATCH(req('PATCH',nameBody))).status,409);assert.equal(s.calls.length,1);assert.deepEqual(s.steps,['begin','rollback','release']);});
test('protected identity fields cannot be changed through profile endpoint',async()=>{for(const field of ['role','class_id','email','student_id','id']){const s=setup();assert.equal((await s.api.PATCH(req('PATCH',{...nameBody,[field]:'admin'}))).status,400);assert.equal(s.calls.length,0);}});
test('invalid names or missing original name rejected',async()=>{for(const bad of [{fullName:''},{fullName:'x'},{fullName:'x'.repeat(151)},{fullName:'Name\nAdmin'},{expectedName:null}]){const s=setup();assert.equal((await s.api.PATCH(req('PATCH',{...nameBody,...bad}))).status,400);assert.equal(s.calls.length,0);}});
test('wrong current password never hashes or writes a replacement',async()=>{const s=setup({correct:false});assert.equal((await s.password.POST(req('POST',passwordBody))).status,400);assert.equal(s.passwords.length,1);assert.equal(s.steps.length,0);assert.equal(s.cookies.length,0);});
test('password policy and confirmation enforced before hashing',async()=>{for(const bad of [{currentPassword:''},{newPassword:'short',confirmPassword:'short'},{newPassword:'x'.repeat(129),confirmPassword:'x'.repeat(129)},{confirmPassword:'different'},{newPassword:passwordBody.currentPassword,confirmPassword:passwordBody.currentPassword},{role:'admin'}]){const s=setup();assert.equal((await s.password.POST(req('POST',{...passwordBody,...bad}))).status,400);assert.equal(s.passwords.length,0);assert.equal(s.calls.length,0);}});
test('password update atomically saves only hash and revokes every session of that user',async()=>{const s=setup();const res=await s.password.POST(req('POST',passwordBody));assert.equal(res.status,200);assert.equal((await res.json()).redirect,'/login');assert.deepEqual(Array.from(s.calls[2][1]),['new-hash',7]);assert.match(s.calls[3][0],/^DELETE FROM sessions WHERE user_id=\?/);assert.deepEqual(Array.from(s.calls[3][1]),[7]);assert.deepEqual(s.steps,['begin','commit','release','cookie']);assert.equal(s.cookies[0][0],'unilink_session');assert.equal(s.cookies[0][1],'');assert.equal(s.cookies[0][2].maxAge,0);assert.ok(s.calls.every(([,args])=>!args.includes(passwordBody.newPassword)));});
test('password spaces are preserved exactly',async()=>{const s=setup(),body={currentPassword:' old password ',newPassword:' new password 456 ',confirmPassword:' new password 456 '};await s.password.POST(req('POST',body));assert.equal(s.passwords[0][1],body.currentPassword);assert.equal(s.passwords[1][1],body.newPassword);});
test('concurrent password change conflicts before update and cookie change',async()=>{const s=setup({lockedHash:'changed-hash'});assert.equal((await s.password.POST(req('POST',passwordBody))).status,409);assert.deepEqual(s.steps,['begin','rollback','release']);assert.equal(s.cookies.length,0);assert.ok(!s.calls.some(([sql])=>sql.startsWith('UPDATE')));});
test('session revocation failure rolls back password and leaves cookie intact',async()=>{const s=setup({failAt:'DELETE FROM sessions'});const res=await s.password.POST(req('POST',passwordBody));assert.equal(res.status,503);assert.doesNotMatch(await res.text(),/secret/);assert.deepEqual(s.steps,['begin','rollback','release']);assert.equal(s.cookies.length,0);});
test('password attempt limit stops repeated guessing',async()=>{const s=setup({correct:false});for(let i=0;i<20;i++)assert.equal((await s.password.POST(req('POST',passwordBody))).status,400);const res=await s.password.POST(req('POST',passwordBody));assert.equal(res.status,429);assert.equal(res.headers.get('Retry-After'),'60');assert.equal(s.calls.length,20);});
test('malformed oversized or non-JSON input rejected',async()=>{for(const [body,type,status] of [['{','application/json',400],['x'.repeat(4200),'application/json',413],['{}','text/plain',415]]){const s=setup();assert.equal((await s.api.PATCH(new Request('http://localhost:3002/api/account',{method:'PATCH',headers:{origin:'http://localhost:3002','Content-Type':type},body}))).status,status);assert.equal(s.calls.length,0);}});
test('parameterized SQL matches values across profile and password operations',async()=>{const s=setup();await s.api.GET();await s.api.PATCH(req('PATCH',nameBody));await s.password.POST(req('POST',passwordBody));for(const [sql,args] of s.calls)assert.equal((sql.match(/\?/g)||[]).length,args.length);});

test('different student and CR sessions return their own identities without copying the CR profile',async()=>{for(const who of [{id:11,class_id:42,role:'student',full_name:'Student Eleven',student_id:'ST11',email:'student11@example.com'},{id:22,class_id:42,role:'cr',full_name:'Representative Twenty Two',student_id:'CR22',email:'cr22@example.com'}]){const s=setup({accountUser:who,profile:{...row,...who},currentName:who.full_name});const b=await (await s.api.GET()).json();assert.equal(b.account.id,who.id);assert.equal(b.account.fullName,who.full_name);assert.equal(b.account.email,who.email);assert.equal(b.account.role,who.role);assert.deepEqual(Array.from(s.calls[0][1]),[who.id]);}});
