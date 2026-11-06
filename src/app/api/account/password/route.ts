import type {RowDataPacket} from 'mysql2/promise';
import {cookies} from 'next/headers';
import {getDb} from '@/lib/server/db';
import {verifyPassword,hashPassword} from '@/lib/server/password';
import {COOKIE_NAME,cookieOptions} from '@/lib/server/session';
import {AuthError,json} from '@/lib/server/auth-http';
import {accountUser,accountJson,accountFailure,validatePassword} from '@/lib/server/account';
export const runtime='nodejs';export const dynamic='force-dynamic';
// Bounded single-process protection, matching the local app's login deployment model.
// Public multi-instance hosting requires a shared limiter.
const state=globalThis as typeof globalThis & {unilinkPasswordLimit?:{start:number;count:number;active:number}};
const limit=state.unilinkPasswordLimit??={start:Date.now(),count:0,active:0};
export async function POST(req:Request){let acquired=false;try{
 const b=await accountJson(req),u=await accountUser(),v=validatePassword(b);
 if(Date.now()-limit.start>=60000){limit.start=Date.now();limit.count=0;}
 if(limit.count>=20||limit.active>=2){const r=json({error:'Too many password attempts. Try again in one minute.'},429);r.headers.set('Retry-After','60');return r;}
 limit.count++;limit.active++;acquired=true;
 const [rows]=await getDb().execute<RowDataPacket[]>('SELECT password_hash FROM users WHERE id=? AND is_active=1',[u.id]);const oldHash=rows[0]?.password_hash;
 if(!oldHash)throw new AuthError('Please sign in again.',401);
 if(!await verifyPassword(v.current,oldHash))throw new AuthError('Current password is incorrect.',400);
 const newHash=await hashPassword(v.next),jar=await cookies(),db=await getDb().getConnection();
 try{await db.beginTransaction();
 const [locked]=await db.execute<RowDataPacket[]>('SELECT password_hash FROM users WHERE id=? AND is_active=1 FOR UPDATE',[u.id]);
 if(!locked[0]||locked[0].password_hash!==oldHash)throw new AuthError('Your account changed. Sign in again before changing the password.',409);
 await db.execute('UPDATE users SET password_hash=? WHERE id=?',[newHash,u.id]);
 await db.execute('DELETE FROM sessions WHERE user_id=?',[u.id]);
 await db.commit();}catch(e){await db.rollback();throw e;}finally{db.release();}
 jar.set(COOKIE_NAME,'',{...cookieOptions(),maxAge:0});return json({ok:true,redirect:'/login'});
 }catch(e){return accountFailure(e);}finally{if(acquired)limit.active--;}}
