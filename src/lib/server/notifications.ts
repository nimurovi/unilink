import "server-only";
import {getSessionUser} from './session';
import {AuthError,json,checkOrigin} from './auth-http';
import {boundedBody} from './material-http';
import {NOTIFICATION_KINDS} from '@/lib/notification-types';
// Each branch is scoped before joining user-specific read receipts. No client class ID is accepted.
export const notificationSource = `
 SELECT 'announcements' AS kind,id,title,message AS body,version,updated_at AS activity_at FROM class_announcements WHERE class_id=?
 UNION ALL SELECT 'class-updates',id,CONCAT(code,' · ',type),detail,version,updated_at FROM class_updates WHERE class_id=? AND status='published'
 UNION ALL SELECT 'materials',id,title,description,1,created_at FROM class_materials WHERE class_id=? AND deleted_at IS NULL
 UNION ALL SELECT 'assignments',id,title,description,version,created_at FROM assignments WHERE class_id=? AND deleted_at IS NULL
 UNION ALL SELECT 'routine',id,CONCAT(code,' · ',course),CONCAT(room,' · ',instructor),version,updated_at FROM class_routine WHERE class_id=?
 UNION ALL SELECT 'exams',id,title,CONCAT(IF(cancelled=1,'Cancelled · ',''),course,' · ',DATE_FORMAT(exam_date,'%Y-%m-%d'),' · ',TIME_FORMAT(start_time,'%H:%i')),version,updated_at FROM class_exams WHERE class_id=?`;
export function classArgs(classId:number){return Array(6).fill(classId) as number[];}
export async function notificationUser(){const user=await getSessionUser();if(!user)throw new AuthError('Please sign in again.',401);return user;}
export function notificationFailure(e:unknown){return e instanceof AuthError?json({error:e.message},e.status):json({error:'Notifications are unavailable. Check MySQL and run sql/009-notification-reads.sql after the earlier module migrations.'},503);}
export async function notificationRequest(req:Request){
 checkOrigin(req);
 if(req.headers.get('content-type')?.split(';')[0].trim()!=='application/json')throw new AuthError('JSON is required.',415);
 const bytes=await boundedBody(req,40000);let b:Record<string,unknown>;
 try {b=JSON.parse(bytes.toString('utf8'));if(!b||typeof b!=='object'||Array.isArray(b))throw Error();}catch{throw new AuthError('Invalid notification request.');}
 if(typeof b.read!=='boolean'||!Array.isArray(b.keys)||!b.keys.length||b.keys.length>200)throw new AuthError('Choose 1–200 notifications and a read status.');
 const keys=b.keys as unknown[];
 for(const key of keys){if(typeof key!=='string')throw new AuthError('Invalid notification.');const [kind,id,version,...extra]=key.split(':');if(extra.length||!NOTIFICATION_KINDS.includes(kind as typeof NOTIFICATION_KINDS[number])||!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id||'')||!(/^[1-9][0-9]{0,9}$/).test(version||'')||Number(version)>4294967295)throw new AuthError('Invalid notification.');}
 return {keys:[...new Set(keys as string[])],read:b.read};
}
