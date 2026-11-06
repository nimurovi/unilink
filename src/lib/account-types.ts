export type Account={id:number;classId:number;fullName:string;studentId:string;email:string;role:'student'|'cr'|'admin';department:string;batch:string;section:string};
export function accountClass(a:Account|null){return a?[a.department,a.batch,a.section].join(' · '):'Loading account…';}
export function accountInitial(a:Account|null){return a?.fullName.trim().charAt(0).toUpperCase()||'?';}
