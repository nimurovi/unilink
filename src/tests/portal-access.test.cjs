
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),ts=require('typescript');
function load(file,mocks,globals={}){const mod={exports:{}};const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX}}).outputText;vm.runInNewContext(code,{module:mod,exports:mod.exports,require:n=>{if(n in mocks)return mocks[n];throw Error(n);},...globals});return mod.exports;}
const modules=[['materials','useMaterials','refreshMaterials'],['assignments','useAssignments','refreshAssignments'],['routine','useRoutine','refreshRoutine'],['exams','useExam','refreshExam'],['announcements','useAnnouncement','refreshAnnouncement'],['events','useEvent','refreshEvent'],['opportunities','useOpportunity','refreshOpportunity'],['clubs','useClub','refreshClub']];
for(const [name,hook,refresh] of modules)test(`${name}: student context blocks management even with cached CR permission`,async()=>{
 let mode='student',allowed=true;
 const react={createContext:defaultValue=>({defaultValue}),useContext:ctx=>mode??ctx.defaultValue,useSyncExternalStore:(_,get)=>get()};
 const policy=load('src/lib/portal-access.ts',{react});
 const mod=load('src/lib/'+name+'.ts',{'react':react,'./portal-access':policy,'./assignment-types':{},'./routine-types':{}},{fetch:async()=>Response.json({canManage:allowed,entries:[],materials:[],assignments:[]}),setInterval(){},clearInterval(){},window:{addEventListener(){},removeEventListener(){}}});
 await mod[refresh]();assert.equal(mod[hook]().canManage,false);
 mode='cr';assert.equal(mod[hook]().canManage,true);
 allowed=false;await mod[refresh]();assert.equal(mod[hook]().canManage,false);
 mode=undefined;allowed=true;await mod[refresh]();assert.equal(mod[hook]().canManage,false);
});
function boundary(account){const effects=[],redirects=[];const jsx=(type,props)=>({type,props});const mod=load('src/components/auth/PortalBoundary.tsx',{'react':{useEffect:fn=>effects.push(fn)},'react/jsx-runtime':{jsx,jsxs:jsx},'@/lib/account':{useAccount:()=>({account,loading:false,error:''}),refreshAccount(){}},'@/lib/portal-access':{PortalAccess:{Provider:'Provider'}}},{window:{location:{replace:url=>redirects.push(url)}}});const tree=mod.default({id:7,role:'student',classId:42,children:'PRIVATE STUDENT CONTENT'});effects.forEach(fn=>fn());return {tree,redirects};}
test('identity boundary blocks old student page after login changes to CR',()=>{const s=boundary({id:8,role:'cr',classId:42});assert.equal(s.tree.type,'main');assert.doesNotMatch(JSON.stringify(s.tree),/PRIVATE STUDENT CONTENT/);assert.deepEqual(s.redirects,['/cr-portal']);});
test('identity boundary reloads for a different student or reassigned class',()=>{for(const a of [{id:8,role:'student',classId:42},{id:7,role:'student',classId:99}]){const s=boundary(a);assert.equal(s.tree.type,'main');assert.deepEqual(s.redirects,['/dashboard']);}});
test('identity boundary shows only current matching account and denies signed-out state',()=>{const s=boundary({id:7,role:'student',classId:42});assert.equal(s.tree.type,'Provider');assert.equal(s.tree.props.value,'student');assert.equal(s.tree.props.children,'PRIVATE STUDENT CONTENT');const absent=boundary(null);assert.doesNotMatch(JSON.stringify(absent.tree),/PRIVATE STUDENT CONTENT/);});
