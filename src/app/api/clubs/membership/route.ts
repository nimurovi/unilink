import type {RowDataPacket} from 'mysql2/promise';
import {getDb} from '@/lib/server/db';
import {AuthError,json} from '@/lib/server/auth-http';
import {materialId} from '@/lib/server/material-files';
import {clubUser,clubFailure,clubJson,clubVersion} from '@/lib/server/clubs';
export const runtime='nodejs';export const dynamic='force-dynamic';
export async function PUT(req:Request){try{
 const b=await clubJson(req),u=await clubUser(),id=materialId(String(b.id||'')),version=clubVersion(b.version);
 if(typeof b.joined!=='boolean')throw new AuthError('Choose Join or Leave.');
 const db=await getDb().getConnection();try{
 await db.beginTransaction();
 const [rows]=await db.execute<RowDataPacket[]>('SELECT version,closed FROM class_clubs WHERE id=? AND class_id=? FOR UPDATE',[id,u.class_id]);
 const club=rows[0];if(!club)throw new AuthError('Club not found.',404);
 if(club.version!==version)throw new AuthError('The club changed. Refresh before responding.',409);
 if(b.joined&&club.closed)throw new AuthError('This club is not accepting new members.',409);
 await db.execute('INSERT INTO club_memberships (club_id,user_id,joined,updated_at) VALUES (?,?,?,UTC_TIMESTAMP()) ON DUPLICATE KEY UPDATE joined=VALUES(joined),updated_at=UTC_TIMESTAMP()',[id,u.id,b.joined?1:0]);
 await db.commit();}catch(e){await db.rollback();throw e;}finally{db.release();}
 return json({ok:true});
 }catch(e){return clubFailure(e);}}
