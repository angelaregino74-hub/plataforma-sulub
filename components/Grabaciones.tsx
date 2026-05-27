'use client';
import { useState } from 'react';
import { I } from './icons';
import { DATA } from './data';

export default function Grabaciones({ role }: { role: string }) {
  const D = DATA;
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? D.RECORDINGS : D.RECORDINGS.filter(r => r.materia === filter);
  const cur = filtered[active] || D.RECORDINGS[0];
  const isTeacher = role === 'teacher';

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

      <div className="pills" style={{ marginBottom: 20 }}>
        {['all', 'Matemáticas', 'Historia', 'Biología', 'Español', 'Química', 'Física'].map(p => (
          <div key={p} className="pill" data-active={filter === p} onClick={() => { setFilter(p); setActive(0); }}>
            {p === 'all' ? 'Todas' : p}
          </div>
        ))}
      </div>

      <div className="video-shell">
        <div>
          <div className="video-frame">
            <div className="video-frame__overlay"></div>
            <div className="video-frame__chips">
              <div className="video-frame__chip">{cur.materia}</div>
              <div className="video-frame__chip">{cur.dur}</div>
            </div>
            <button className="video-frame__play"><I.play size={26} /></button>
            <div className="video-frame__title">{cur.title}</div>
            <div className="video-frame__progress"><div className="video-frame__progress-fill"></div></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 18, gap: 20 }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, margin: '0 0 4px', letterSpacing: '-0.01em' }}>{cur.title}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 13.5, margin: 0 }}>{cur.materia} · {cur.teacher} · grabada el {cur.date}</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn--sm"><I.download size={14} /> Descargar</button>
              <button className="btn btn--sm"><I.star size={14} /> Guardar</button>
            </div>
          </div>
          <hr className="divider" />
          <div>
            <div className="section-title"><span>Capítulos</span></div>
            {[
              { t: 'Introducción y repaso', d: '00:00' },
              { t: 'Definición de función cuadrática', d: '08:32' },
              { t: 'Forma estándar y vértice', d: '24:15' },
              { t: 'Ejercicios guiados', d: '52:40' },
              { t: 'Examen rápido y dudas', d: '1:18:05' },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line-soft)', cursor: 'pointer' }}>
                <span style={{ fontSize: 13.5, fontWeight: i === 1 ? 600 : 400 }}>{c.t}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{c.d}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="section-title">
            <span>{filtered.length} grabaciones</span>
            <a className="section-title__action" style={{ cursor: 'pointer' }}>Filtrar</a>
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
    </div>
  );
}
