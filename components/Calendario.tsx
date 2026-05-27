import React from 'react';
import { I } from './icons';
import { DATA } from './data';

export default function Calendario({ role }: { role: string }) {
  const D = DATA;
  const isTeacher = role === 'teacher';
  const startCol = 4;
  const totalDays = 31;
  const today = 5;

  const cells: { out: boolean; num: number }[] = [];
  for (let i = 0; i < startCol; i++) cells.push({ out: true, num: 30 - startCol + i + 1 });
  for (let d = 1; d <= totalDays; d++) cells.push({ out: false, num: d });
  while (cells.length % 7 !== 0) cells.push({ out: true, num: cells.length - startCol - totalDays + 1 });

  const dows = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className="content content--narrow fade-in">
      <div className="page-header">
        <div>
          <div className="page-eyebrow" style={{ color: 'var(--acc-rose)' }}>Tu mes de un vistazo</div>
          <h1 className="page-title">Calendario</h1>
          <p className="page-subtitle">{isTeacher ? 'Programa clases, exámenes y simulacros para tus grupos.' : 'Clases, exámenes y simulacros — diferenciados por color por materia.'}</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn"><I.download size={14} /> Exportar a Google</button>
          {isTeacher && <button className="btn btn--primary"><I.plus size={14} /> Nuevo evento</button>}
        </div>
      </div>

      <div className="cal-shell">
        <div>
          <div className="cal-header">
            <h2 className="cal-title">Mayo · 2026</h2>
            <div className="cal-nav">
              <button className="icon-btn"><I.chevL size={16} /></button>
              <button className="btn btn--sm">Hoy</button>
              <button className="icon-btn"><I.chevR size={16} /></button>
            </div>
          </div>
          <div className="cal-grid">
            {dows.map(d => <div key={d} className="cal-dow">{d}</div>)}
            {cells.map((c, i) => {
              const events = !c.out ? (D.CAL_EVENTS[c.num] || []) : [];
              return (
                <div key={i} className={`cal-cell ${c.out ? 'cal-cell--out' : ''} ${!c.out && c.num === today ? 'cal-cell--today' : ''}`}>
                  <div className="cal-cell__num">{c.num}</div>
                  <div className="cal-cell__events">
                    {events.slice(0, 3).map((e, j) => (
                      <div key={j} className={`cal-event ${D.EVENT_COLORS[e.type] !== 'cal-event' ? D.EVENT_COLORS[e.type] : ''}`}>{e.title}</div>
                    ))}
                    {events.length > 3 && <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>+{events.length - 3} más</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="card cal-side-card">
            <div className="section-title" style={{ marginBottom: 12 }}><span>Próximos eventos</span></div>
            {[
              { d: '4',  m: 'May', t: 'Simulacro UNAM Área I',  meta: '09:00 · 3h' },
              { d: '5',  m: 'May', t: 'Matemáticas — clase 12', meta: '18:00 · Online' },
              { d: '8',  m: 'May', t: 'Parcial — Matemáticas',  meta: '10:00 · 90 min' },
              { d: '10', m: 'May', t: 'Parcial — Historia',     meta: '09:00 · 90 min' },
              { d: '12', m: 'May', t: 'Simulacro UNAM Área II', meta: '09:00 · 3h' },
            ].map((e, i) => (
              <div key={i} className="upcoming-event">
                <div className="upcoming-event__date">
                  <div className="upcoming-event__day">{e.d}</div>
                  <div className="upcoming-event__mon">{e.m}</div>
                </div>
                <div>
                  <div className="upcoming-event__title">{e.t}</div>
                  <div className="upcoming-event__meta">{e.meta}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="card cal-side-card">
            <div className="section-title" style={{ marginBottom: 12 }}><span>Filtros</span></div>
            <div className="cal-legend">
              {[
                ['var(--blue-500)', 'Matemáticas / Física'],
                ['var(--acc-emerald)', 'Español / Tutoría'],
                ['var(--acc-amber)', 'Historia'],
                ['var(--acc-rose)', 'Biología / Exámenes'],
                ['var(--acc-violet)', 'Química / Simulacros'],
              ].map(([c, l]) => (
                <label key={l} className="cal-legend__item">
                  <input type="checkbox" defaultChecked style={{ accentColor: c }} />
                  <span className="cal-legend__dot" style={{ background: c }}></span>
                  <span>{l}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
