import React from 'react';
import { I } from './icons';
import { DATA } from './data';

export default function Materias({ setView, role }: { setView: (v: string) => void; role: string }) {
  const D = DATA;
  const isTeacher = role === 'teacher';
  return (
    <div className="content content--narrow fade-in">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">{isTeacher ? 'Tus grupos' : 'Tu plan de estudios'}</div>
          <h1 className="page-title">{isTeacher ? 'Grupos que enseñas' : 'Mis materias'}</h1>
          <p className="page-subtitle">{isTeacher ? '6 grupos activos · 142 alumnos en total · generación 2026.' : '6 materias activas en tu preparación para examen de admisión.'}</p>
        </div>
        {isTeacher && <button className="btn btn--primary"><I.plus size={15} /> Nuevo grupo</button>}
      </div>

      <div className="materia-grid">
        {D.MATERIAS.map(m => (
          <div key={m.id} className="materia-card" onClick={() => setView('material')}>
            <div className="materia-card__accent" style={{ background: m.color }}></div>
            <div className="materia-card__icon" style={{ background: m.color + '18', color: m.color }}>{m.short}</div>
            <h3 className="materia-card__name">{m.name}</h3>
            <p className="materia-card__teacher">{m.teacher}</p>
            <div style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: 'var(--text-muted)', marginBottom: 6 }}>
                <span>Avance</span><span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>{m.progress}%</span>
              </div>
              <div className="hbar"><div className="hbar__fill" style={{ width: m.progress + '%', background: m.color }}></div></div>
            </div>
            <div className="materia-card__stats">
              <div><span className="materia-card__stat-num">{m.lessons}</span> clases</div>
              <div><span className="materia-card__stat-num">{m.materials}</span> materiales</div>
              <div><span className="materia-card__stat-num">{m.exams}</span> exámenes</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
