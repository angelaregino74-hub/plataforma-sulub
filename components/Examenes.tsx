'use client';
import { useState } from 'react';
import { I } from './icons';
import { DATA } from './data';

export default function Examenes({ role }: { role: string }) {
  const D = DATA;
  const isTeacher = role === 'teacher';
  const [tab, setTab] = useState('all');
  const list = tab === 'all' ? D.EXAMS : D.EXAMS.filter(e => e.status === tab);
  const scored = D.EXAMS.filter(e => e.score);
  const avg = Math.round(scored.reduce((a, b) => a + (b.score as number), 0) / scored.length);

  return (
    <div className="content content--narrow fade-in">
      <div className="page-header">
        <div>
          <div className="page-eyebrow" style={{ color: 'var(--acc-emerald)' }}>Evaluación continua</div>
          <h1 className="page-title">Exámenes parciales</h1>
          <p className="page-subtitle">{isTeacher ? 'Califica entregas y revisa el desempeño de tus grupos.' : 'Tus exámenes por materia. Revisa pendientes, calificaciones y áreas a mejorar.'}</p>
        </div>
        {isTeacher && <button className="btn btn--primary"><I.plus size={15} /> Nuevo examen</button>}
      </div>

      <div className="kpi-row">
        <div className="kpi">
          <div className="kpi__label">Promedio general</div>
          <div className="kpi__value">{avg}<span style={{ fontSize: 18, color: 'var(--text-muted)' }}>/100</span></div>
          <div className="kpi__delta"><I.trend size={12} /> +4 vs anterior</div>
        </div>
        <div className="kpi">
          <div className="kpi__label">Pendientes</div>
          <div className="kpi__value" style={{ color: 'var(--acc-amber)' }}>2</div>
          <div className="kpi__delta">Próximo: 8 May</div>
        </div>
        <div className="kpi">
          <div className="kpi__label">Calificados</div>
          <div className="kpi__value">{scored.length}</div>
          <div className="kpi__delta">de {D.EXAMS.length} totales</div>
        </div>
        <div className="kpi">
          <div className="kpi__label">Mejor materia</div>
          <div className="kpi__value" style={{ fontSize: 24, fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Biología</div>
          <div className="kpi__delta">92 / 100</div>
        </div>
      </div>

      <div className="tabs">
        {[['all', 'Todos'], ['pending', 'Pendientes'], ['graded', 'Calificados']].map(([k, l]) => (
          <div key={k} className="tab" data-active={tab === k} onClick={() => setTab(k)}>{l}</div>
        ))}
      </div>

      <div className="card card--flat" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Materia</th><th>Examen</th><th>Fecha</th><th>Estado</th>
              <th style={{ textAlign: 'right' }}>Calificación</th><th style={{ width: 60 }}></th>
            </tr>
          </thead>
          <tbody>
            {list.map(e => {
              const mat = D.MATERIAS.find(m => m.name === e.materia);
              return (
                <tr key={e.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 3, background: mat?.color, display: 'inline-block' }}></span>
                      <strong style={{ fontWeight: 500 }}>{e.materia}</strong>
                    </div>
                  </td>
                  <td>{e.name}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{e.date}</td>
                  <td><span className={`status status--${e.status}`}>{e.status === 'pending' ? 'Pendiente' : 'Calificado'}</span></td>
                  <td style={{ textAlign: 'right' }}>
                    {e.score ? <span className="score">{e.score}<span className="score__pct">/100</span></span> : <span style={{ color: 'var(--text-faint)' }}>—</span>}
                  </td>
                  <td><button className="list__action"><I.chevR size={14} /></button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
