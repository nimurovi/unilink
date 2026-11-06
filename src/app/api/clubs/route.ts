import {randomUUID} from 'node:crypto';
import type {RowDataPacket,ResultSetHeader} from 'mysql2/promise';
import {getDb} from '@/lib/server/db';
import {isCr} from '@/lib/server/session';
import {AuthError,json} from '@/lib/server/auth-http';
import {materialId} from '@/lib/server/material-files';
import {clubUser,clubFailure,clubJson,validateClub,clubVersion,clubFields} from '@/lib/server/clubs';
export const runtime='nodejs';export const dynamic='force-dynamic';
export async function GET(){try{
 const u=await clubUser();
 const [rows]=await getDb().execute<RowDataPacket[]>(`SELECT e.*,a.full_name AS author,r.joined AS my_joined,
 (SELECT COUNT(*) FROM club_memberships x JOIN users attendee ON attendee.id=x.user_id AND attendee.class_id=e.class_id AND attendee.is_active=1 WHERE x.club_id=e.id AND x.joined=1) AS member_count
 FROM class_clubs e JOIN users a ON a.id=e.author_id LEFT JOIN club_memberships r ON r.club_id=e.id AND r.user_id=? WHERE e.class_id=? ORDER BY e.title,e.id`,[u.id,u.class_id]);
 return json({entries:rows.map(r=>({id:r.id,title:r.title,description:r.description,category:r.category,contact:r.contact,meetingInfo:r.meeting_info,closed:!!r.closed,version:r.version,author:r.author,memberCount:Number(r.member_count),joined:!!r.my_joined})),canManage:isCr(u.role)});
 }catch(e){return clubFailure(e);}}
export async function POST(req:Request){try{const b=await clubJson(req),u=await clubUser(true),v=validateClub(b),id=randomUUID();
 await getDb().execute('INSERT INTO class_clubs (id,class_id,author_id,title,description,category,contact,meeting_info,closed,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,UTC_TIMESTAMP(),UTC_TIMESTAMP())',[id,u.class_id,u.id,...clubFields(v)]);return json({ok:true,id},201);
 }catch(e){return clubFailure(e);}}
async function change(req:Request,remove=false){try{const b=await clubJson(req),u=await clubUser(true),id=materialId(String(b.id||'')),version=clubVersion(b.version);let result:ResultSetHeader;
 if(remove){[result]=await getDb().execute<ResultSetHeader>('DELETE FROM class_clubs WHERE id=? AND class_id=? AND version=?',[id,u.class_id,version]);}
 else {const v=validateClub(b);[result]=await getDb().execute<ResultSetHeader>('UPDATE class_clubs SET title=?,description=?,category=?,contact=?,meeting_info=?,closed=?,version=version+1,updated_at=UTC_TIMESTAMP() WHERE id=? AND class_id=? AND version=?',[...clubFields(v),id,u.class_id,version]);}
 if(result.affectedRows!==1)throw new AuthError('This club changed or is no longer available. Refresh and reopen it.',409);return json({ok:true});
 }catch(e){return clubFailure(e);}}
export async function PATCH(req:Request){return change(req);}
export async function DELETE(req:Request){return change(req,true);}
