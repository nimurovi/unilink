import {randomUUID} from 'node:crypto';
import type {RowDataPacket,ResultSetHeader} from 'mysql2/promise';
import {getDb} from '@/lib/server/db';
import {isCr} from '@/lib/server/session';
import {AuthError,json} from '@/lib/server/auth-http';
import {materialId} from '@/lib/server/material-files';
import {eventUser,eventFailure,eventJson,validateEvent,eventVersion,eventFields} from '@/lib/server/events';
export const runtime='nodejs';export const dynamic='force-dynamic';
export async function GET(){try{
 const u=await eventUser();
 const [rows]=await getDb().execute<RowDataPacket[]>(`SELECT e.*,a.full_name AS author,r.going AS my_going,
 (SELECT COUNT(*) FROM event_rsvps x JOIN users attendee ON attendee.id=x.user_id AND attendee.class_id=e.class_id WHERE x.event_id=e.id AND x.going=1) AS going_count
 FROM class_events e JOIN users a ON a.id=e.author_id LEFT JOIN event_rsvps r ON r.event_id=e.id AND r.user_id=? WHERE e.class_id=? ORDER BY e.starts_at,e.id`,[u.id,u.class_id]);
 return json({entries:rows.map(r=>({id:r.id,title:r.title,description:r.description,category:r.category,organizer:r.organizer,location:r.location,startsAt:new Date(r.starts_at).toISOString(),endsAt:new Date(r.ends_at).toISOString(),cancelled:!!r.cancelled,version:r.version,author:r.author,goingCount:Number(r.going_count),myGoing:r.my_going===null?null:!!r.my_going})),canManage:isCr(u.role)});
 }catch(e){return eventFailure(e);}}
export async function POST(req:Request){try{const b=await eventJson(req),u=await eventUser(true),v=validateEvent(b),id=randomUUID();
 await getDb().execute('INSERT INTO class_events (id,class_id,author_id,title,description,category,organizer,location,starts_at,ends_at,cancelled,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,UTC_TIMESTAMP(),UTC_TIMESTAMP())',[id,u.class_id,u.id,...eventFields(v)]);return json({ok:true,id},201);
 }catch(e){return eventFailure(e);}}
async function change(req:Request,remove=false){try{const b=await eventJson(req),u=await eventUser(true),id=materialId(String(b.id||'')),version=eventVersion(b.version);let result:ResultSetHeader;
 if(remove){[result]=await getDb().execute<ResultSetHeader>('DELETE FROM class_events WHERE id=? AND class_id=? AND version=?',[id,u.class_id,version]);}
 else {const v=validateEvent(b);[result]=await getDb().execute<ResultSetHeader>('UPDATE class_events SET title=?,description=?,category=?,organizer=?,location=?,starts_at=?,ends_at=?,cancelled=?,version=version+1,updated_at=UTC_TIMESTAMP() WHERE id=? AND class_id=? AND version=?',[...eventFields(v),id,u.class_id,version]);}
 if(result.affectedRows!==1)throw new AuthError('This event changed or is no longer available. Refresh and reopen it.',409);return json({ok:true});
 }catch(e){return eventFailure(e);}}
export async function PATCH(req:Request){return change(req);}
export async function DELETE(req:Request){return change(req,true);}
