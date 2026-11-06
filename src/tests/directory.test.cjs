const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),ts=require('typescript');
function setup({user={id:7,class_id:42,role:'student'},fail=false,rows=[{department:'CSE',batch:'52',section:'B',id:7,full_name:'Student Seven',student_id:'ST7',role:'student',email:'private',password_hash:'secret'}]}={}) {
 const calls=[];class AuthError extends Error {constructor(message,status){super(message);this.status=status;}}
 const mocks={'@/lib/server/db':{getDb:()=>({execute:async(sql,args)=>{calls.push([sql,Array.from(args)]);if(fail)throw Error('SQL secrets');return [rows];}})},'@/lib/server/session':{getSessionUser:async()=>user},'@/lib/server/auth-http':{AuthError,json:(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}})}};
 const mod={exports:{}};vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/app/api/directory/route.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{module:mod,exports:mod.exports,require:n=>mocks[n]});
 return {api:mod.exports,calls};
}
test('directory requires authentication before querying',async()=>{const s=setup({user:null});assert.equal((await s.api.GET()).status,401);assert.equal(s.calls.length,0);});
test('student and CR reads use only session class and exclude inactive/non-class users',async()=>{for(const role of ['student','cr']){const s=setup({user:{id:7,class_id:42,role}});assert.equal((await s.api.GET(new Request('http://localhost/api/directory?class_id=99'))).status,200);const [sql,args]=s.calls[0];assert.deepEqual(args,[42]);assert.match(sql,/u.class_id=c.id/);assert.match(sql,/u.is_active=1/);assert.match(sql,/u.role IN \('student','cr'\)/);assert.match(sql,/WHERE c.id=\?/);assert.doesNotMatch(sql,/email|password|sessions/);}});
test('directory exposes only public class identity and marks own user',async()=>{const s=setup();const r=await s.api.GET();assert.equal(r.headers.get('Cache-Control'),'no-store');assert.deepEqual(await r.json(),{directory:{department:'CSE',batch:'52',section:'B',members:[{id:7,fullName:'Student Seven',studentId:'ST7',role:'student',isYou:true}]}});});
test('other members do not get own profile marker',async()=>{const s=setup({user:{id:9,class_id:42,role:'cr'}});assert.equal((await (await s.api.GET()).json()).directory.members[0].isYou,false);});
test('class without active members returns empty array',async()=>{const s=setup({rows:[{department:'CSE',batch:'52',section:'B',id:null}]});assert.deepEqual((await (await s.api.GET()).json()).directory.members,[]);});
test('missing class fails closed',async()=>{const s=setup({rows:[]});assert.equal((await s.api.GET()).status,403);});
test('database error is recoverable and does not expose SQL',async()=>{const s=setup({fail:true});const r=await s.api.GET();assert.equal(r.status,503);assert.doesNotMatch(await r.text(),/SQL secrets/);});
test('directory has no account mutation handlers',()=>{const s=setup();assert.deepEqual(Object.keys(s.api).sort(),['GET','dynamic','runtime']);});
