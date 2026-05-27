import React from 'react';
import { I } from './icons';
import { DATA } from './data';

export default function Dashboard({ setView }: { setView: (v: string) => void }) {
  const D = DATA;
  const today = 5;
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const weekDays = [4, 5, 6, 7, 8, 9, 10];
  const dotColors: Record<string, string> = {
    mat: 'var(--blue-500)', esp: 'var(--acc-emerald)', his: 'var(--acc-amber)',
    bio: 'var(--acc-rose)', qui: 'var(--acc-violet)', fis: 'var(--acc-teal)',
    sim: 'var(--acc-violet)', exam: 'var(--acc-rose)', tut: 'var(--acc-emerald)',
  };

  return (
    <div className="content content--narrow fade-in">
      <div className="hero-greet">
        <div>
          <div className="hero-greet__hello">¡Hola Alejandro!</div>
          <h1 className="hero-greet__title">Vas al 64%<br />de tu prepa para la UNAM.</h1>
          <p className="hero-greet__sub">Tienes 2 exámenes esta semana y 1 simulacro el lunes. Mantén el ritmo — vas mejor que el 78% del grupo.</p>
          <div className="hero-stats">
            <div><div className="hero-stat__num">24</div><div className="hero-stat__lbl">Materiales nuevos</div></div>
            <div><div className="hero-stat__num">3</div><div className="hero-stat__lbl">Simulacros</div></div>
            <div>
              <div className="hero-stat__num">82<span style={{ fontSize: 18, color: 'var(--text-muted)' }}>%</span></div>
              <div className="hero-stat__lbl">Promedio</div>
            </div>
          </div>
        </div>
        <div className="hero-next">
          <div className="hero-next__orbit"></div>
          <div className="hero-next__eyebrow">Próxima clase</div>
          <h3 className="hero-next__title">Funciones cuadráticas — Cap. 13</h3>
          <div className="hero-next__meta">Matemáticas · Prof. Luis Castillo</div>
          <div className="hero-next__time">
            <span className="hero-next__time-val">18:00</span>
            <span className="hero-next__time-lbl">Hoy · en 2h 14min</span>
          </div>
        </div>
      </div>

      <div className="dash-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card">
            <div className="section-title">
              <span>Esta semana</span>
              <a className="section-title__action" onClick={() => setView('calendario')} style={{ cursor: 'pointer' }}>Ver calendario →</a>
            </div>
            <div className="week-strip">
              {weekDays.map((d, i) => {
                const events = D.CAL_EVENTS[d] || [];
                const isToday = d === today;
                return (
                  <div key={d} className={`week-day ${isToday ? 'week-day--today' : ''}`}>
                    <div className="week-day__name">{days[i]}</div>
                    <div className="week-day__num">{d}</div>
                    <div className="week-day__dots">
                      {events.slice(0, 3).map((e, j) => (
                        <span key={j} className="week-day__dot" style={{ background: dotColors[e.type] || 'var(--blue-500)' }}></span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card">
            <div className="section-title">
              <span>Material reciente</span>
              <a className="section-title__action" onClick={() => setView('material')} style={{ cursor: 'pointer' }}>Ver todo →</a>
            </div>
            <div className="list">
              {D.RECENT_MATERIALS.map(m => (
                <div key={m.id} className="list__row">
                  <div className="list__icon" style={{ background: m.color + '18', color: m.color }}>{m.type}</div>
                  <div>
                    <div className="list__title">{m.title}</div>
                    <div className="list__meta">{m.materia} · {m.size}</div>
                  </div>
                  <div className="list__date">{m.date}</div>
                  <button className="list__action"><I.download size={15} /></button>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="section-title">
              <span>Grabaciones nuevas</span>
              <a className="section-title__action" onClick={() => setView('grabaciones')} style={{ cursor: 'pointer' }}>Ver todas →</a>
            </div>
            <div className="recording-list">
              {D.RECORDINGS.slice(0, 4).map((r, i) => (
                <div key={r.id} className={`recording-item ${i === 0 ? 'recording-item--active' : ''}`} onClick={() => setView('grabaciones')}>
                  <div className="recording-thumb"><span className="recording-thumb__dur">{r.dur}</span></div>
                  <div>
                    <div className="recording-item__title">{r.title}</div>
                    <div className="recording-item__meta">{r.materia} · {r.teacher} · {r.date}</div>
                  </div>
                  <button className="list__action"><I.play size={15} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="side-stack">
          <div className="card">
            <div className="section-title"><span>Progreso por materia</span></div>
            {D.MATERIAS.map(m => (
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
            <div className="section-title"><span>Próximas evaluaciones</span></div>
            <div className="feed">
              <div className="feed__row">
                <span className="feed__bullet" style={{ background: 'var(--acc-rose)' }}></span>
                <div><div className="feed__text"><strong>Parcial 2 — Matemáticas</strong></div><div className="feed__time">Vie 8 May · 10:00 · 90 min</div></div>
              </div>
              <div className="feed__row">
                <span className="feed__bullet" style={{ background: 'var(--acc-amber)' }}></span>
                <div><div className="feed__text"><strong>Parcial 2 — Historia</strong></div><div className="feed__time">Dom 10 May · 09:00</div></div>
              </div>
              <div className="feed__row">
                <span className="feed__bullet" style={{ background: 'var(--acc-violet)' }}></span>
                <div><div className="feed__text"><strong>Simulacro UNAM Área II</strong></div><div className="feed__time">Lun 12 May · 9:00 · 3h</div></div>
              </div>
            </div>
          </div>

          <div className="card" style={{ background: 'var(--blue-500)', color: '#fff', borderColor: 'var(--blue-500)' }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.85, marginBottom: 8 }}>Tip de la semana</div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, lineHeight: 1.2, marginBottom: 12 }}>Repasa el simulacro de la semana pasada antes del lunes.</div>
            <div style={{ fontSize: 12.5, opacity: 0.85, marginBottom: 16 }}>Sacaste 89 en UNAM Área I. Revisa tus 13 errores en Química y Física.</div>
            <button className="btn btn--sm" style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', borderColor: 'transparent' }} onClick={() => setView('simulacros')}>
              Abrir simulacro <I.arrowR size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
