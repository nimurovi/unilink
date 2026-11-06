import type { RowDataPacket } from 'mysql2/promise';
import { getDb } from '@/lib/server/db';
import { getSessionUser } from '@/lib/server/session';
import { AuthError, json } from '@/lib/server/auth-http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) throw new AuthError('Please sign in again.', 401);
    // Scope comes exclusively from the authenticated session, never URL parameters.
    const [rows] = await getDb().execute<RowDataPacket[]>(
      `SELECT c.department,c.batch,c.section,u.id,u.full_name,u.student_id,u.role
       FROM classes c LEFT JOIN users u ON u.class_id=c.id
         AND u.is_active=1 AND u.role IN ('student','cr')
       WHERE c.id=?
       ORDER BY CASE WHEN u.role='cr' THEN 0 ELSE 1 END,u.full_name,u.id`,
      [user.class_id]
    );
    if (!rows.length) throw new AuthError('Your class is unavailable. Please sign in again.', 403);
    const cls = rows[0];
    return json({ directory: {
      department: cls.department, batch: cls.batch, section: cls.section,
      members: rows.filter(r => r.id != null).map(r => ({
        id: Number(r.id), fullName: r.full_name, studentId: r.student_id,
        role: r.role, isYou: Number(r.id) === user.id,
      })),
    }});
  } catch (error) {
    return error instanceof AuthError
      ? json({ error: error.message }, error.status)
      : json({ error: 'Class directory is unavailable. Please check MySQL and retry.' }, 503);
  }
}
