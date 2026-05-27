import React from 'react';
import { I } from './icons';
import { DATA } from './data';

const GROUP_COUNTS: Record<string, number> = { mat: 42, fis: 37 };

export default function Maestro({ setView }: { setView: (v: string) => void }) {
  const D = DATA;
  const luisGroups = D.MATERIAS.filter(m => m.teacher === 'Prof. Luis Castillo');

  return (
    <div className="content content--narrow fade-in">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Buenos días, Luis</div>
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
          <div className="kpi__label">Alumnos activos</div>
          <div className="kpi__value">142</div>
          <div className="kpi__delta"><I.trend size={12} /> +8 esta semana</div>
        </div>
        <div className="kpi">
          <div className="kpi__label">Por calificar</div>
          <div className="kpi__value" style={{ color: 'var(--acc-amber)' }}>23</div>
          <div className="kpi__delta">Entregas pendientes</div>
        </div>
        <div className="kpi">
          <div className="kpi__label">Promedio del grupo</div>
          <div className="kpi__value">79</div>
          <div className="kpi__delta"><I.trend size={12} /> +3 vs anterior</div>
        </div>
        <div className="kpi">
          <div className="kpi__label">Próxima clase</div>
          <div className="kpi__value" style={{ fontSize: 24, fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Hoy 18:00</div>
          <div className="kpi__delta">Matemáticas · Área II</div>
        </div>
      </div>

      <div className="dash-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card">
            <div className="section-title">
              <span>Entregas por calificar</span>
              <a className="section-title__action" style={{ cursor: 'pointer' }}>Ver todas →</a>
            </div>
            <div className="list">
              {[
                { n: 'Daniela Pech',  e: 'Parcial 2 — Funciones',  m: 'Matemáticas', d: 'Hace 2h' },
                { n: 'Carlos Méndez', e: 'Parcial 2 — Funciones',  m: 'Matemáticas', d: 'Hace 3h' },
                { n: 'Sofía Cab',     e: 'Tarea 8 — Derivadas',    m: 'Matemáticas', d: 'Hoy' },
                { n: 'Luis Tun',      e: 'Parcial 1 — Cinemática', m: 'Física',      d: 'Ayer' },
                { n: 'Karla Uc',      e: 'Tarea 5 — Dinámica',     m: 'Física',      d: 'Ayer' },
              ].map((r, i) => (
                <div key={i} className="list__row">
                  <div className="avatar" style={{ width: 36, height: 36, fontSize: 12 }}>{r.n.split(' ').map((s: string) => s[0]).join('')}</div>
                  <div>
                    <div className="list__title">{r.n}</div>
                    <div className="list__meta">{r.e} · {r.m}</div>
                  </div>
                  <div className="list__date">{r.d}</div>
                  <button className="btn btn--sm btn--primary">Calificar</button>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="section-title"><span>Tus grupos</span></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
              {luisGroups.map(m => (
                <div key={m.id} style={{ padding: 16, border: '1px solid var(--line)', borderRadius: 12, cursor: 'pointer' }} onClick={() => setView('materias')}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div className="list__icon" style={{ background: m.color + '18', color: m.color, fontFamily: 'var(--font-serif)', fontSize: 14 }}>{m.short}</div>
                    <span className="tag">{GROUP_COUNTS[m.id] ?? 30} alumnos</span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{m.name}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 2 }}>Generación 2026 · Área II</div>
                  <div style={{ display: 'flex', gap: 14, marginTop: 12, fontSize: 11, color: 'var(--text-muted)' }}>
                    <span>{m.lessons} clases</span>
                    <span>{m.materials} materiales</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="side-stack">
          <div className="card">
            <div className="section-title"><span>Promedios por grupo</span></div>
            {D.MATERIAS.slice(0, 4).map(m => (
              <div key={m.id} className="progress-row">
                <div className="progress-dot" style={{ background: m.color }}></div>
                <div className="progress-name">{m.name}</div>
                <div className="progress-bar"><div className="progress-bar__fill" style={{ width: `${m.progress + 5}%`, background: m.color }}></div></div>
                <div className="progress-pct">{m.progress + 5}</div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="section-title"><span>Actividad reciente</span></div>
            <div className="feed">
              <div className="feed__row"><span className="feed__bullet"></span><div><div className="feed__text"><strong>23 entregas</strong> nuevas en Matemáticas</div><div className="feed__time">Hace 1h</div></div></div>
              <div className="feed__row"><span className="feed__bullet" style={{ background: 'var(--acc-emerald)' }}></span><div><div className="feed__text">Subiste <strong>Funciones cuadráticas — Cap. 13</strong></div><div className="feed__time">Hoy 10:15</div></div></div>
              <div className="feed__row"><span className="feed__bullet" style={{ background: 'var(--acc-amber)' }}></span><div><div className="feed__text">Programaste <strong>Parcial 2 — Funciones</strong></div><div className="feed__time">Ayer</div></div></div>
              <div className="feed__row"><span className="feed__bullet" style={{ background: 'var(--acc-rose)' }}></span><div><div className="feed__text">Calificaste <strong>15 exámenes</strong> de Física</div><div className="feed__time">Lun 28 Abr</div></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
