'use client';
import { useState } from 'react';
import { I } from './icons';
import type { AppData } from '../lib/types';

export default function Grabaciones({ data, role }: { data: AppData; role: string }) {
  const D = data;
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState('all');
  const isTeacher = role === 'teacher';

  const materias = [...new Set(D.RECORDINGS.map(r => r.materia))].filter(Boolean);
  const filtered = filter === 'all' ? D.RECORDINGS : D.RECORDINGS.filter(r => r.materia === filter);
  const cur = filtered[active] ?? filtered[0];

  return (
    <div className="content content--narrow fade-in">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Repositorio · clases en video</div>
          <h1 className="page-title">Grabaciones</h1>
          <p className="page-subtitle">Vuelve a ver cualquier clase. Acelera el video, salta entre temas y descarga para ver sin internet.</p>
        </div>
        {isTeacher && <button className="btn btn--primary"><I.upload size={15} /> Subir grabación</button>}
      </div>

      {D.RECORDINGS.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🎥</div>
          <div style={{ fontWeight: 500 }}>No hay grabaciones aún</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>Las clases grabadas aparecerán aquí.</div>
        </div>
      ) : (
        <>
          <div className="pills" style={{ marginBottom: 20 }}>
            <div className="pill" data-active={filter === 'all'} onClick={() => { setFilter('all'); setActive(0); }}>Todas</div>
            {materias.map(m => (
              <div key={m} className="pill" data-active={filter === m} onClick={() => { setFilter(m); setActive(0); }}>{m}</div>
            ))}
          </div>

          <div className="video-shell">
            <div>
              <div className="video-frame">
                <div className="video-frame__overlay"></div>
                <div className="video-frame__chips">
                  <div className="video-frame__chip">{cur?.materia}</div>
                  <div className="video-frame__chip">{cur?.dur}</div>
                </div>
                <button className="video-frame__play"><I.play size={26} /></button>
                <div className="video-frame__title">{cur?.title}</div>
                <div className="video-frame__progress"><div className="video-frame__progress-fill"></div></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 18, gap: 20 }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, margin: '0 0 4px', letterSpacing: '-0.01em' }}>{cur?.title}</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: 13.5, margin: 0 }}>
                    {cur?.materia} · {cur?.teacher} · grabada el {cur?.date}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn--sm"><I.download size={14} /> Descargar</button>
                  <button className="btn btn--sm"><I.star size={14} /> Guardar</button>
                </div>
              </div>
            </div>

            <div>
              <div className="section-title">
                <span>{filtered.length} grabación{filtered.length !== 1 ? 'es' : ''}</span>
              </div>
              <div className="recording-list">
                {filtered.map((r, i) => (
                  <div key={r.id} className={`recording-item ${i === active ? 'recording-item--active' : ''}`} onClick={() => setActive(i)}>
                    <div className="recording-thumb"><span className="recording-thumb__dur">{r.dur}</span></div>
                    <div>
                      <div className="recording-item__title">{r.title}</div>
                      <div className="recording-item__meta">{r.teacher} · {r.date}</div>
                    </div>
                    {r.new && <span className="tag" style={{ background: 'var(--blue-500)', color: '#fff' }}>Nuevo</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
