'use client';
import { useState } from 'react';
import { I } from './icons';
import type { AppData, UserProfile } from '../lib/types';

export default function Perfil({ data, user }: { data: AppData; user: UserProfile | null }) {
  const [tab, setTab] = useState('progreso');
  const name  = user?.name  ?? 'Usuario';
  const email = user?.email ?? '';
  const area  = user?.area  ?? '';

  return (
    <div className="content content--narrow fade-in">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Tu cuenta</div>
          <h1 className="page-title">Mi perfil</h1>
          <p className="page-subtitle">Tu información, progreso e historial en un solo lugar.</p>
        </div>
        <button className="btn"><I.edit size={14} /> Editar</button>
      </div>

      <div className="profile-shell">
        <div className="card profile-card">
          <div className="avatar avatar--xl" style={{ margin: '0 auto' }}>{user?.avatar ?? name.slice(0,2).toUpperCase()}</div>
          <h2 className="profile-card__name">{name}</h2>
          <p className="profile-card__sub">
            {area ? `Generación 2026 · ${area}` : 'Generación 2026'}
            {user?.role === 'student' && <><br />Aspirante UNAM</>}
          </p>
          <div className="profile-stats">
            <div>
              <div className="profile-stats__num">
                {data.EXAMS.filter(e => e.score).length > 0
                  ? Math.round(data.EXAMS.filter(e=>e.score).reduce((a,b)=>a+(b.score??0),0)/data.EXAMS.filter(e=>e.score).length)
                  : '—'}
              </div>
              <div className="profile-stats__lbl">Promedio</div>
            </div>
            <div>
              <div className="profile-stats__num">
                {data.SIMULATIONS.filter(s => s.score !== null).length > 0
                  ? data.SIMULATIONS.filter(s => s.score !== null).length
                  : '—'}
              </div>
              <div className="profile-stats__lbl">Simulacros</div>
            </div>
            <div>
              <div className="profile-stats__num">
                {data.MATERIAS.length > 0
                  ? Math.round(data.MATERIAS.reduce((a,m)=>a+m.progress,0)/data.MATERIAS.length)
                  : 0}<span style={{ fontSize: 14 }}>%</span>
              </div>
              <div className="profile-stats__lbl">Avance</div>
            </div>
          </div>
          <hr className="divider" />
          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12.5 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Correo</span><span>{email}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Rol</span>
              <span>{user?.role === 'teacher' ? 'Profesor' : 'Alumno'}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="tabs">
            {[['progreso', 'Progreso'], ['historial', 'Historial'], ['ajustes', 'Ajustes']].map(([k, l]) => (
              <div key={k} className="tab" data-active={tab === k} onClick={() => setTab(k)}>{l}</div>
            ))}
          </div>

          {tab === 'progreso' && (
            <div>
              <div className="card" style={{ marginBottom: 18 }}>
                <div className="section-title"><span>Tu progreso por materia</span></div>
                {data.MATERIAS.map(m => (
                  <div key={m.id} className="progress-row">
                    <div className="progress-dot" style={{ background: m.color }}></div>
                    <div className="progress-name">{m.name}</div>
                    <div className="progress-bar" style={{ width: 120 }}>
                      <div className="progress-bar__fill" style={{ width: `${m.progress}%`, background: m.color }}></div>
                    </div>
                    <div className="progress-pct">{m.progress}%</div>
                  </div>
                ))}
              </div>
              <div className="card">
                <div className="section-title"><span>Resumen de actividad</span></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
                  <div style={{ padding: 14, border: '1px solid var(--line)', borderRadius: 10, textAlign: 'center' }}>
                    <I.star size={22} stroke="var(--blue-500)" />
                    <div style={{ fontWeight: 500, fontSize: 12.5, marginTop: 6 }}>Simulacros</div>
                    <div style={{ fontSize: 18, fontFamily: 'var(--font-mono)', marginTop: 4 }}>{data.SIMULATIONS.filter(s => s.score !== null).length}</div>
                  </div>
                  <div style={{ padding: 14, border: '1px solid var(--line)', borderRadius: 10, textAlign: 'center' }}>
                    <I.star size={22} stroke="var(--acc-emerald)" />
                    <div style={{ fontWeight: 500, fontSize: 12.5, marginTop: 6 }}>Exámenes</div>
                    <div style={{ fontSize: 18, fontFamily: 'var(--font-mono)', marginTop: 4 }}>{data.EXAMS.filter(e => e.score).length}</div>
                  </div>
                  <div style={{ padding: 14, border: '1px solid var(--line)', borderRadius: 10, textAlign: 'center' }}>
                    <I.star size={22} stroke="var(--acc-amber)" />
                    <div style={{ fontWeight: 500, fontSize: 12.5, marginTop: 6 }}>Materiales</div>
                    <div style={{ fontSize: 18, fontFamily: 'var(--font-mono)', marginTop: 4 }}>{data.RECENT_MATERIALS.length}</div>
                  </div>
                  <div style={{ padding: 14, border: '1px solid var(--line)', borderRadius: 10, textAlign: 'center' }}>
                    <I.star size={22} stroke="var(--acc-rose)" />
                    <div style={{ fontWeight: 500, fontSize: 12.5, marginTop: 6 }}>Materias</div>
                    <div style={{ fontSize: 18, fontFamily: 'var(--font-mono)', marginTop: 4 }}>{data.MATERIAS.length}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'historial' && (
            <div className="card card--flat" style={{ padding: 0, overflow: 'hidden' }}>
              <table className="table">
                <thead><tr><th>Actividad</th><th>Fecha</th><th style={{ textAlign: 'right' }}>Resultado</th></tr></thead>
                <tbody>
                  {data.EXAMS.filter(e => e.score).map(e => (
                    <tr key={e.id}>
                      <td><strong style={{ fontWeight: 500 }}>{e.name}</strong><div style={{ color: 'var(--text-muted)', fontSize: 11.5 }}>{e.materia}</div></td>
                      <td style={{ color: 'var(--text-muted)' }}>{e.date}</td>
                      <td style={{ textAlign: 'right' }}><span className="score">{e.score}<span className="score__pct">/100</span></span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'ajustes' && (
            <div className="card">
              <div className="field"><label>Nombre</label><input defaultValue={name} /></div>
              <div className="field"><label>Correo</label><input defaultValue={email} /></div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button className="btn btn--primary">Guardar cambios</button>
                <button className="btn">Cancelar</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
