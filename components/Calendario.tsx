import React from 'react';
import { I } from './icons';
import type { AppData } from '../lib/types';

const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const MONTHS_SHORT = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

export default function Calendario({ data, role }: { data: AppData; role: string }) {
  const D = data;
  const isTeacher = role === 'teacher';

  const now       = new Date();
  const todayNum  = now.getDate();
  const monthName = MONTHS[now.getMonth()];
  const year      = now.getFullYear();

  // Construir celdas del calendario para el mes actual
  const firstDay   = new Date(year, now.getMonth(), 1).getDay(); // 0=Dom
  const totalDays  = new Date(year, now.getMonth() + 1, 0).getDate();
  const startCol   = firstDay;

  const cells: { out: boolean; num: number }[] = [];
  const prevMonthDays = new Date(year, now.getMonth(), 0).getDate();
  for (let i = 0; i < startCol; i++)
    cells.push({ out: true, num: prevMonthDays - startCol + i + 1 });
  for (let d = 1; d <= totalDays; d++)
    cells.push({ out: false, num: d });
  while (cells.length % 7 !== 0)
    cells.push({ out: true, num: cells.length - startCol - totalDays + 1 });

  const dows = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  // Próximos eventos desde Supabase (CAL_EVENTS)
  const upcomingEvents = Object.entries(D.CAL_EVENTS)
    .map(([day, evs]) => ({ day: parseInt(day), evs }))
    .filter(({ day }) => day >= todayNum)
    .sort((a, b) => a.day - b.day)
    .slice(0, 5);

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
            <h2 className="cal-title">{monthName} · {year}</h2>
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
                <div key={i} className={`cal-cell ${c.out ? 'cal-cell--out' : ''} ${!c.out && c.num === todayNum ? 'cal-cell--today' : ''}`}>
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
            {upcomingEvents.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Sin eventos próximos.</div>
            ) : upcomingEvents.map(({ day, evs }) => (
              evs.map((ev, j) => (
                <div key={`${day}-${j}`} className="upcoming-event">
                  <div className="upcoming-event__date">
                    <div className="upcoming-event__day">{day}</div>
                    <div className="upcoming-event__mon">{MONTHS_SHORT[now.getMonth()]}</div>
                  </div>
                  <div>
                    <div className="upcoming-event__title">{ev.title}</div>
                    <div className="upcoming-event__meta">
                      {day === todayNum ? 'Hoy' : day === todayNum + 1 ? 'Mañana' : `En ${day - todayNum} días`}
                    </div>
                  </div>
                </div>
              ))
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
