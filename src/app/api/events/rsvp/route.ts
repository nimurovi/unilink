import type {RowDataPacket} from 'mysql2/promise';
import {getDb} from '@/lib/server/db';
import {AuthError,json} from '@/lib/server/auth-http';
import {materialId} from '@/lib/server/material-files';
import {eventUser,eventFailure,eventJson,eventVersion} from '@/lib/server/events';
export const runtime='nodejs';export const dynamic='force-dynamic';
export async function PUT(req:Request){try{
 const b=await eventJson(req),u=await eventUser(),id=materialId(String(b.id||'')),version=eventVersion(b.version);
 if(typeof b.going!=='boolean')throw new AuthError('Choose Going or Not Going.');
 const db=await getDb().getConnection();try{
 await db.beginTransaction();
 const [rows]=await db.execute<RowDataPacket[]>('SELECT version,cancelled,(starts_at>UTC_TIMESTAMP()) AS rsvp_open FROM class_events WHERE id=? AND class_id=? FOR UPDATE',[id,u.class_id]);
 const event=rows[0];if(!event)throw new AuthError('Event not found.',404);
 if(event.version!==version)throw new AuthError('The event changed. Refresh before responding.',409);
 if(event.cancelled||!event.rsvp_open)throw new AuthError('Responses are closed for cancelled or started events.',409);
 await db.execute('INSERT INTO event_rsvps (event_id,user_id,going,updated_at) VALUES (?,?,?,UTC_TIMESTAMP()) ON DUPLICATE KEY UPDATE going=VALUES(going),updated_at=UTC_TIMESTAMP()',[id,u.id,b.going?1:0]);
 await db.commit();}catch(e){await db.rollback();throw e;}finally{db.release();}
 return json({ok:true});
 }catch(e){return eventFailure(e);}}
