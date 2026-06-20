import React from 'react';
import { I } from './icons';
import type { AppData } from '../lib/types';

export default function Dashboard({ data, setView }: { data: AppData; setView: (v: string) => void }) {
  const D = data;

  // Cálculos reales desde Supabase
  const avgProgress   = D.MATERIAS.length > 0
    ? Math.round(D.MATERIAS.reduce((a, m) => a + m.progress, 0) / D.MATERIAS.length)
    : 0;
  const pendingExams  = D.EXAMS.filter(e => e.status === 'pending').length;
  const gradedExams   = D.EXAMS.filter(e => e.score !== null);
  const avgScore      = gradedExams.length > 0
    ? Math.round(gradedExams.reduce((a, e) => a + (e.score ?? 0), 0) / gradedExams.length)
    : 0;
  const gradedSims    = D.SIMULATIONS.filter(s => s.status === 'graded');

  // Próximos eventos del calendario
  const todayNum = new Date().getDate();
  const upcomingEvents = Object.entries(D.CAL_EVENTS)
    .map(([day, evs]) => ({ day: parseInt(day), evs }))
    .filter(({ day }) => day >= todayNum)
    .sort((a, b) => a.day - b.day);
  const nextEvent = upcomingEvents[0];

  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const weekDays = [
    todayNum - 1, todayNum, todayNum + 1, todayNum + 2,
    todayNum + 3, todayNum + 4, todayNum + 5,
  ];
  const dotColors: Record<string, string> = {
    mat: 'var(--blue-500)', esp: 'var(--acc-emerald)', his: 'var(--acc-amber)',
    bio: 'var(--acc-rose)', qui: 'var(--acc-violet)', fis: 'var(--acc-teal)',
    sim: 'var(--acc-violet)', exam: 'var(--acc-rose)', tut: 'var(--acc-emerald)',
  };

  // Materia con menor progreso (para recomendar)
  const weakestMateria = D.MATERIAS.length > 0
    ? [...D.MATERIAS].sort((a, b) => a.progress - b.progress)[0]
    : null;

  return (
    <div className="content content--narrow fade-in">
      <div className="hero-greet">
        <div>
          <div className="hero-greet__hello">¡Bienvenido!</div>
          <h1 className="hero-greet__title">Vas al {avgProgress}%<br />de tu preparación.</h1>
          <p className="hero-greet__sub">
            {pendingExams > 0
              ? `Tienes ${pendingExams} examen${pendingExams > 1 ? 'es' : ''} pendiente${pendingExams > 1 ? 's' : ''}. ¡Sigue adelante!`
              : 'No tienes exámenes pendientes por ahora. ¡Buen trabajo!'}
          </p>
          <div className="hero-stats">
            <div>
              <div className="hero-stat__num">{D.RECENT_MATERIALS.length}</div>
              <div className="hero-stat__lbl">Materiales</div>
            </div>
            <div>
              <div className="hero-stat__num">{gradedSims.length}</div>
              <div className="hero-stat__lbl">Simulacros</div>
            </div>
            <div>
              <div className="hero-stat__num">
                {avgScore > 0 ? avgScore : '—'}
                {avgScore > 0 && <span style={{ fontSize: 18, color: 'var(--text-muted)' }}>%</span>}
              </div>
              <div className="hero-stat__lbl">Promedio</div>
            </div>
          </div>
        </div>

        {nextEvent ? (
          <div className="hero-next">
            <div className="hero-next__orbit"></div>
            <div className="hero-next__eyebrow">Próximo evento</div>
            <h3 className="hero-next__title">{nextEvent.evs[0]?.title}</h3>
            <div className="hero-next__meta">
              {nextEvent.evs.length > 1 ? `+${nextEvent.evs.length - 1} eventos más este día` : new Date().toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })}
            </div>
            <div className="hero-next__time">
              <span className="hero-next__time-val">Día {nextEvent.day}</span>
              <span className="hero-next__time-lbl">
                {nextEvent.day === todayNum ? 'Hoy' : nextEvent.day === todayNum + 1 ? 'Mañana' : `En ${nextEvent.day - todayNum} días`}
              </span>
            </div>
          </div>
        ) : (
          <div className="hero-next">
            <div className="hero-next__orbit"></div>
            <div className="hero-next__eyebrow">Sin eventos próximos</div>
            <h3 className="hero-next__title">Todo al día</h3>
            <div className="hero-next__meta">No hay eventos próximos en el calendario</div>
          </div>
        )}
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
                return (
                  <div key={d} className={`week-day ${d === todayNum ? 'week-day--today' : ''}`}>
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
            {D.RECENT_MATERIALS.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', fontSize: 13, padding: '12px 0' }}>No hay materiales aún.</div>
            ) : (
              <div className="list">
                {D.RECENT_MATERIALS.slice(0, 5).map(m => (
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
            )}
          </div>

          <div className="card">
            <div className="section-title">
              <span>Grabaciones recientes</span>
              <a className="section-title__action" onClick={() => setView('grabaciones')} style={{ cursor: 'pointer' }}>Ver todas →</a>
            </div>
            {D.RECORDINGS.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', fontSize: 13, padding: '12px 0' }}>No hay grabaciones aún.</div>
            ) : (
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
            )}
          </div>
        </div>

        <div className="side-stack">
          <div className="card">
            <div className="section-title"><span>Progreso por materia</span></div>
            {D.MATERIAS.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Sin materias inscritas.</div>
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
            <div className="section-title"><span>Próximas evaluaciones</span></div>
            <div className="feed">
              {D.EXAMS.filter(e => e.status === 'pending').length === 0 ? (
                <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Sin evaluaciones pendientes.</div>
              ) : D.EXAMS.filter(e => e.status === 'pending').slice(0, 3).map(e => {
                const mat = D.MATERIAS.find(m => m.name === e.materia);
                return (
                  <div key={e.id} className="feed__row">
                    <span className="feed__bullet" style={{ background: mat?.color || 'var(--acc-rose)' }}></span>
                    <div>
                      <div className="feed__text"><strong>{e.name}</strong></div>
                      <div className="feed__time">{e.date}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {weakestMateria && (
            <div className="card" style={{ background: 'var(--blue-500)', color: '#fff', borderColor: 'var(--blue-500)' }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.85, marginBottom: 8 }}>Área de oportunidad</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, lineHeight: 1.2, marginBottom: 12 }}>
                Refuerza {weakestMateria.name}
              </div>
              <div style={{ fontSize: 12.5, opacity: 0.85, marginBottom: 16 }}>
                Es tu materia con menor avance — {weakestMateria.progress}%. Revisa el material y las grabaciones.
              </div>
              <button className="btn btn--sm" style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', borderColor: 'transparent' }} onClick={() => setView('materias')}>
                Ver materias <I.arrowR size={13} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
