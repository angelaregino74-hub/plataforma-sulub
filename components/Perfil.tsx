'use client';
import { useState } from 'react';
import { I } from './icons';
import { DATA } from './data';

export default function Perfil() {
  const [tab, setTab] = useState('progreso');
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
          <div className="avatar avatar--xl" style={{ margin: '0 auto' }}>AS</div>
          <h2 className="profile-card__name">Alejandro Silva</h2>
          <p className="profile-card__sub">Generación 2026 · Área II<br />Aspirante UNAM — Medicina</p>
          <div className="profile-stats">
            <div><div className="profile-stats__num">82</div><div className="profile-stats__lbl">Promedio</div></div>
            <div><div className="profile-stats__num">87</div><div className="profile-stats__lbl">Percentil</div></div>
            <div><div className="profile-stats__num">64<span style={{ fontSize: 14 }}>%</span></div><div className="profile-stats__lbl">Avance</div></div>
          </div>
          <hr className="divider" />
          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12.5 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Correo</span><span>alejandro@sulub.mx</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Teléfono</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>+52 999 555 0142</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Inscripción</span><span>Sep 2025</span>
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
                {DATA.MATERIAS.map(m => (
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
                <div className="section-title"><span>Logros</span></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
                  {[
                    { t: 'Primera clase', d: 'Sep 2025' },
                    { t: '10 simulacros', d: 'Abr 2026' },
                    { t: 'Promedio +85',  d: 'Mar 2026' },
                    { t: 'Percentil 90',  d: 'Feb 2026' },
                  ].map(a => (
                    <div key={a.t} style={{ padding: 14, border: '1px solid var(--line)', borderRadius: 10, textAlign: 'center' }}>
                      <I.star size={22} stroke="var(--blue-500)" />
                      <div style={{ fontWeight: 500, fontSize: 12.5, marginTop: 6 }}>{a.t}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{a.d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'historial' && (
            <div className="card card--flat" style={{ padding: 0, overflow: 'hidden' }}>
              <table className="table">
                <thead><tr><th>Actividad</th><th>Fecha</th><th style={{ textAlign: 'right' }}>Resultado</th></tr></thead>
                <tbody>
                  {DATA.EXAMS.filter(e => e.score).map(e => (
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
              <div className="field"><label>Nombre</label><input defaultValue="Alejandro Silva" /></div>
              <div className="field"><label>Correo</label><input defaultValue="alejandro@sulub.mx" /></div>
              <div className="field"><label>Teléfono</label><input defaultValue="+52 999 555 0142" /></div>
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
