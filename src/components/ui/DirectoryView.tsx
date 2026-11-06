"use client";
import { useState } from 'react';
import { useTheme, tok } from './Theme';
import { useDirectory, refreshDirectory } from '@/lib/directory';

export default function DirectoryView() {
  const { theme } = useTheme(), c = tok(theme);
  const { directory, loading, error } = useDirectory();
  const [query, setQuery] = useState(''), [role, setRole] = useState('all');
  const members = directory?.members.filter(m =>
    (role === 'all' || m.role === role) &&
    `${m.fullName} ${m.studentId}`.toLowerCase().includes(query.trim().toLowerCase())
  ) ?? [];
  const control: React.CSSProperties = { padding: '10px 14px', borderRadius: 10, border: `1px solid ${c.border}`, background: c.surface, color: c.text, maxWidth: '100%', boxSizing: 'border-box' };
  return <main style={{ flex: 1, minHeight: 0, minWidth: 0, overflowY: 'auto', overflowX: 'hidden', boxSizing: 'border-box', padding: 24, background: c.bg, color: c.text }}>
    <header style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
      <div><h1 style={{ margin: '0 0 8px', fontSize: 26 }}>Class Directory</h1>
        <p style={{ color: c.textMuted, margin: 0 }}>{directory ? `${directory.department} · ${directory.batch} · ${directory.section}` : 'Your department, batch and section'}</p></div>
      <button style={control} onClick={() => void refreshDirectory()}>Refresh</button>
    </header>
    <p style={{ fontSize: 13, color: c.textMuted }}>Registered students and class representatives in your class. Names update from each person’s own profile.</p>
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
      <input aria-label="Search classmates" placeholder="Search by name or student ID" value={query} onChange={e => setQuery(e.target.value)} style={{ ...control, width: 320 }} />
      <select aria-label="Filter by role" value={role} onChange={e => setRole(e.target.value)} style={control}>
        <option value="all">Everyone</option><option value="student">Students</option><option value="cr">Class Representatives</option>
      </select>
    </div>
    {loading ? <p role="status">Loading classmates…</p> : error ? <p role="alert" style={{ color: '#EF4444' }}>{error} Use Refresh to retry.</p> : directory && <>
      <p style={{ fontSize: 13, color: c.textMuted }}>{members.length} of {directory.members.length} classmates shown</p>
      {members.length ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 16, maxWidth: 1200 }}>
        {members.map(m => <article key={m.id} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 16, padding: 22, overflowWrap: 'anywhere' }}>
          <div aria-hidden="true" style={{ width: 44, height: 44, borderRadius: '50%', display: 'grid', placeItems: 'center', background: c.surface2, color: c.primary, fontWeight: 700 }}>{m.fullName.trim().split(/\s+/).slice(0, 2).map(n => n[0]).join('').toUpperCase()}</div>
          <h2 style={{ fontSize: 18, margin: '14px 0 8px' }}>{m.fullName}{m.isYou && <span style={{ fontSize: 12, color: c.textMuted }}> (You)</span>}</h2>
          <p style={{ margin: '8px 0', fontSize: 13 }}>Student ID: {m.studentId}</p>
          <span style={{ color: c.primary, fontSize: 12, fontWeight: 700 }}>{m.role === 'cr' ? 'Class Representative' : 'Student'}</span>
        </article>)}
      </div> : <p>{directory.members.length ? 'No classmates match your search.' : 'No active students or class representatives are registered in this class yet.'}</p>}
    </>}
  </main>;
}
