import React from 'react';
import { I } from './icons';
import type { AppData } from '../lib/types';

export default function Maestro({ data, setView }: { data: AppData; setView: (v: string) => void }) {
  const D = data;

  // KPIs calculados desde datos reales
  const gradedExams = D.EXAMS.filter(e => e.score !== null);
  const avgScore = gradedExams.length > 0
    ? Math.round(gradedExams.reduce((a, e) => a + (e.score ?? 0), 0) / gradedExams.length)
    : null;
  const pendingExams = D.EXAMS.filter(e => e.status === 'pending').length;

  // Próximo evento del calendario
  const todayNum = new Date().getDate();
  const nextEvent = Object.entries(D.CAL_EVENTS)
    .map(([day, evs]) => ({ day: parseInt(day), evs }))
    .filter(({ day }) => day >= todayNum)
    .sort((a, b) => a.day - b.day)[0];

  // Actividad reciente: últimos materiales subidos
  const recentActivity = D.RECENT_MATERIALS.slice(0, 4);

  return (
    <div className="content content--narrow fade-in">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Buenos días</div>
          <h1 className="page-title">Panel docente</h1>
          <p className="page-subtitle">Tus grupos, materiales y exámenes a calificar.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn"><I.upload size={14} /> Subir material</button>
          <button className="btn btn--primary"><I.plus size={14} /> Crear examen</button>
        </div>
      </div>

      <div className="kpi-row">
        <div className="kpi">
          <div className="kpi__label">Grupos activos</div>
          <div className="kpi__value">{D.MATERIAS.length > 0 ? D.MATERIAS.length : '—'}</div>
          <div className="kpi__delta">Materias asignadas</div>
        </div>
        <div className="kpi">
          <div className="kpi__label">Por calificar</div>
          <div className="kpi__value" style={{ color: pendingExams > 0 ? 'var(--acc-amber)' : undefined }}>
            {pendingExams > 0 ? pendingExams : '—'}
          </div>
          <div className="kpi__delta">Exámenes pendientes</div>
        </div>
        <div className="kpi">
          <div className="kpi__label">Promedio del grupo</div>
          <div className="kpi__value">{avgScore !== null ? avgScore : '—'}</div>
          <div className="kpi__delta">{gradedExams.length > 0 ? `${gradedExams.length} exámenes calificados` : 'Sin calificaciones aún'}</div>
        </div>
        <div className="kpi">
          <div className="kpi__label">Próximo evento</div>
          <div className="kpi__value" style={{ fontSize: 22, fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
            {nextEvent ? `Día ${nextEvent.day}` : '—'}
          </div>
          <div className="kpi__delta">
            {nextEvent ? nextEvent.evs[0]?.title ?? 'Evento' : 'Sin eventos próximos'}
          </div>
        </div>
      </div>

      <div className="dash-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card">
            <div className="section-title">
              <span>Entregas por calificar</span>
              <a className="section-title__action" style={{ cursor: 'pointer' }}>Ver todas →</a>
            </div>
            <div style={{ textAlign: 'center', padding: '32px 20px', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>📋</div>
              <div style={{ fontWeight: 500, fontSize: 14 }}>No hay entregas pendientes</div>
              <div style={{ fontSize: 12.5, marginTop: 4 }}>Las entregas de los alumnos aparecerán aquí.</div>
            </div>
          </div>

          <div className="card">
            <div className="section-title"><span>Tus grupos</span></div>
            {D.MATERIAS.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Sin grupos asignados.</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
                {D.MATERIAS.map(m => (
                  <div key={m.id} style={{ padding: 16, border: '1px solid var(--line)', borderRadius: 12, cursor: 'pointer' }} onClick={() => setView('materias')}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                      <div className="list__icon" style={{ background: m.color + '18', color: m.color, fontFamily: 'var(--font-serif)', fontSize: 14 }}>{m.short}</div>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{m.name}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 2 }}>Generación {new Date().getFullYear()}</div>
                    <div style={{ display: 'flex', gap: 14, marginTop: 12, fontSize: 11, color: 'var(--text-muted)' }}>
                      <span>{m.lessons} clases</span>
                      <span>{m.materials} materiales</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="side-stack">
          <div className="card">
            <div className="section-title"><span>Progreso por materia</span></div>
            {D.MATERIAS.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Sin materias asignadas.</div>
            ) : D.MATERIAS.map(m => (
              <div key={m.id} className="progress-row">
                <div className="progress-dot" style={{ background: m.color }}></div>
                <div className="progress-name">{m.name}</div>
                <div className="progress-bar">
                  <div className="progress-bar__fill" style={{ width: `${m.progress}%`, background: m.color }}></div>
                </div>
                <div className="progress-pct">{m.progress}%</div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="section-title"><span>Material subido recientemente</span></div>
            {recentActivity.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>No hay material subido aún.</div>
            ) : (
              <div className="feed">
                {recentActivity.map(m => (
                  <div key={m.id} className="feed__row">
                    <span className="feed__bullet" style={{ background: m.color }}></span>
                    <div>
                      <div className="feed__text"><strong>{m.title}</strong></div>
                      <div className="feed__time">{m.materia} · {m.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
