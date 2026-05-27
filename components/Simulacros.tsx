import React from 'react';
import { I } from './icons';
import { DATA } from './data';

export default function Simulacros({ role }: { role: string }) {
  const D = DATA;
  const isTeacher = role === 'teacher';
  const last = D.SIMULATIONS.find(s => s.score)!;
  const r = 52;
  const circ = 2 * Math.PI * r;

  return (
    <div className="content content--narrow fade-in">
      <div className="page-header">
        <div>
          <div className="page-eyebrow" style={{ color: 'var(--acc-amber)' }}>Práctica con tiempo real</div>
          <h1 className="page-title">Simulacros</h1>
          <p className="page-subtitle">{isTeacher ? 'Crea y administra simulacros con banco de preguntas.' : 'Practica como en el examen real — tiempo, formato y dificultad iguales al CENEVAL.'}</p>
        </div>
        {isTeacher
          ? <button className="btn btn--primary"><I.plus size={15} /> Crear simulacro</button>
          : <button className="btn btn--primary"><I.play size={15} /> Iniciar nuevo</button>}
      </div>

      <div className="two-col" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="section-title"><span>Último simulacro</span><span className="tag">UNAM Área I</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 18 }}>
            <div style={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}>
              <svg viewBox="0 0 120 120" width="120" height="120">
                <circle cx="60" cy="60" r={r} fill="none" stroke="var(--bg-sunken)" strokeWidth="10" />
                <circle cx="60" cy="60" r={r} fill="none" stroke="var(--blue-500)" strokeWidth="10"
                  strokeDasharray={`${circ}`} strokeDashoffset={`${circ * (1 - last.score! / 100)}`}
                  transform="rotate(-90 60 60)" strokeLinecap="round" />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 34, lineHeight: 1 }}>{last.score}</div>
                  <div style={{ fontSize: 10.5, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>de 100</div>
                </div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, margin: '0 0 6px', lineHeight: 1.1 }}>{last.name}</h3>
              <div style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 14 }}>{last.date} · {last.dur} · {last.questions} reactivos</div>
              <div style={{ display: 'flex', gap: 18, fontSize: 12 }}>
                <div><div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Aciertos</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, marginTop: 2 }}>107/120</div></div>
                <div><div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Tiempo</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, marginTop: 2 }}>2:48:12</div></div>
                <div><div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Percentil</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, marginTop: 2, color: 'var(--acc-emerald)' }}>P-87</div></div>
              </div>
            </div>
          </div>
          <button className="btn" style={{ width: '100%', justifyContent: 'center' }}>Ver análisis detallado <I.arrowR size={14} /></button>
        </div>

        <div className="card">
          <div className="section-title"><span>Desempeño por área</span></div>
          {D.SIM_BREAKDOWN.map(s => (
            <div key={s.area} className="sim-bar">
              <div className="sim-bar__lbl">{s.area}</div>
              <div className="hbar">
                <div className="hbar__fill" style={{ width: s.pct + '%', background: s.pct >= 85 ? 'var(--acc-emerald)' : s.pct >= 75 ? 'var(--blue-500)' : 'var(--acc-amber)' }}></div>
              </div>
              <div className="sim-bar__pct">{s.pct}%</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section-title"><span>Historial de simulacros</span></div>
      <div className="card card--flat" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="table">
          <thead>
            <tr><th>Simulacro</th><th>Fecha</th><th>Duración</th><th>Reactivos</th><th>Estado</th><th style={{ textAlign: 'right' }}>Resultado</th></tr>
          </thead>
          <tbody>
            {D.SIMULATIONS.map(s => (
              <tr key={s.id}>
                <td><strong style={{ fontWeight: 500 }}>{s.name}</strong></td>
                <td style={{ color: 'var(--text-muted)' }}>{s.date}</td>
                <td style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{s.dur}</td>
                <td style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{s.questions}</td>
                <td><span className={`status status--${s.status === 'graded' ? 'graded' : 'upcoming'}`}>{s.status === 'graded' ? 'Calificado' : 'Próximo'}</span></td>
                <td style={{ textAlign: 'right' }}>
                  {s.score ? <span className="score">{s.score}<span className="score__pct">/100</span></span> : <span style={{ color: 'var(--text-faint)' }}>—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
