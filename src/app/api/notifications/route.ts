import type {RowDataPacket} from 'mysql2/promise';
import {getDb} from '@/lib/server/db';
import {json} from '@/lib/server/auth-http';
import {notificationSource,classArgs,notificationUser,notificationFailure,notificationRequest} from '@/lib/server/notifications';
export const runtime='nodejs';export const dynamic='force-dynamic';
export async function GET(){try{
 const u=await notificationUser();
 const [rows]=await getDb().execute<RowDataPacket[]>(`SELECT n.*,COALESCE(r.is_read,0) AS is_read FROM (${notificationSource}) n LEFT JOIN notification_reads r ON r.user_id=? AND r.kind=n.kind AND r.source_id=n.id AND r.version=n.version ORDER BY n.activity_at DESC,n.kind,n.id LIMIT 200`,[...classArgs(u.class_id),u.id]);
 return json({entries:rows.map(r=>({key:`${r.kind}:${r.id}:${r.version}`,kind:r.kind,title:r.title,body:r.body,version:Number(r.version),time:new Date(r.activity_at).toISOString(),unread:!r.is_read}))});
 }catch(e){return notificationFailure(e);}}
export async function PATCH(req:Request){try{
 const u=await notificationUser(),b=await notificationRequest(req);
 // One atomic write; stale, deleted and other-class keys cannot produce a receipt.
 await getDb().execute(`INSERT INTO notification_reads (user_id,kind,source_id,version,is_read,updated_at)
 SELECT ?,n.kind,n.id,n.version,?,UTC_TIMESTAMP() FROM (${notificationSource}) n
 WHERE CONCAT(n.kind,':',n.id,':',n.version) IN (${b.keys.map(()=>'?').join(',')})
 ON DUPLICATE KEY UPDATE is_read=VALUES(is_read),updated_at=UTC_TIMESTAMP()`,[u.id,b.read?1:0,...classArgs(u.class_id),...b.keys]);
 return json({ok:true});
 }catch(e){return notificationFailure(e);}}
