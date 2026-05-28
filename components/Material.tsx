'use client';
import { useState } from 'react';
import { I } from './icons';
import type { AppData } from '../lib/types';

export default function Material({ data, role }: { data: AppData; role: string }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const isTeacher = role === 'teacher';

  const materias = [...new Set(data.RECENT_MATERIALS.map(m => m.materia))].filter(Boolean);
  const list = data.RECENT_MATERIALS
    .filter(m => filter === 'all' || m.materia === filter)
    .filter(m => !search || m.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="content content--narrow fade-in">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Biblioteca · documentos del curso</div>
          <h1 className="page-title">Material de clase</h1>
          <p className="page-subtitle">PDFs, presentaciones y ejercicios subidos por tus profesores.</p>
        </div>
        {isTeacher && <button className="btn btn--primary"><I.upload size={15} /> Subir material</button>}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 16, flexWrap: 'wrap' }}>
        <div className="pills">
          <div className="pill" data-active={filter === 'all'} onClick={() => setFilter('all')}>Todas</div>
          {materias.map(m => (
            <div key={m} className="pill" data-active={filter === m} onClick={() => setFilter(m)}>{m}</div>
          ))}
        </div>
        <div className="searchbox" style={{ maxWidth: 280 }}>
          <I.search size={14} />
          <input placeholder="Buscar archivo…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {list.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📂</div>
          <div style={{ fontWeight: 500 }}>No hay materiales aún</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>Los archivos que suban tus profesores aparecerán aquí.</div>
        </div>
      ) : (
        <div className="card card--flat" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>Tipo</th>
                <th>Nombre</th>
                <th>Materia</th>
                <th>Tamaño</th>
                <th>Subido</th>
                <th style={{ width: 110 }}></th>
              </tr>
            </thead>
            <tbody>
              {list.map(m => (
                <tr key={m.id}>
                  <td><div className="list__icon" style={{ background: m.color + '18', color: m.color, width: 32, height: 32, fontSize: 10 }}>{m.type}</div></td>
                  <td><strong style={{ fontWeight: 500 }}>{m.title}</strong></td>
                  <td><span style={{ color: m.color, fontWeight: 500, fontSize: 12.5 }}>{m.materia}</span></td>
                  <td style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>{m.size}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{m.date}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                      <button className="list__action"><I.eye size={14} /></button>
                      <button className="list__action"><I.download size={14} /></button>
                      <button className="list__action"><I.more size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
