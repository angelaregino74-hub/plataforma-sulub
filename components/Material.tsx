'use client';
import { useState } from 'react';
import { I } from './icons';
import { DATA } from './data';

const EXTRA_ITEMS = [
  { id: 6, type: 'PDF',  title: 'Funciones — ejercicios resueltos',  materia: 'Matemáticas', color: '#1E5FFF', date: '24 Abr', size: '1.2 MB' },
  { id: 7, type: 'DOCX', title: 'Comprensión lectora — antología',   materia: 'Español',     color: '#0E8E6A', date: '22 Abr', size: '720 KB' },
  { id: 8, type: 'PPT',  title: 'Revolución Mexicana',               materia: 'Historia',    color: '#B8741A', date: '20 Abr', size: '4.8 MB' },
  { id: 9, type: 'PDF',  title: 'Cinemática — formulario',           materia: 'Física',      color: '#0E7C8E', date: '18 Abr', size: '420 KB' },
];

export default function Material({ role }: { role: string }) {
  const D = DATA;
  const [filter, setFilter] = useState('all');
  const isTeacher = role === 'teacher';
  const items = [...D.RECENT_MATERIALS, ...EXTRA_ITEMS];
  const list = filter === 'all' ? items : items.filter(i => i.materia === filter);

  return (
    <div className="content content--narrow fade-in">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Biblioteca · documentos del curso</div>
          <h1 className="page-title">Material de clase</h1>
          <p className="page-subtitle">PDFs, presentaciones y ejercicios subidos por tus profesores. Descarga, lee online o guarda tus favoritos.</p>
        </div>
        {isTeacher && <button className="btn btn--primary"><I.upload size={15} /> Subir material</button>}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 16, flexWrap: 'wrap' }}>
        <div className="pills">
          {['all', 'Matemáticas', 'Español', 'Historia', 'Biología', 'Química', 'Física'].map(p => (
            <div key={p} className="pill" data-active={filter === p} onClick={() => setFilter(p)}>
              {p === 'all' ? 'Todas' : p}
            </div>
          ))}
        </div>
        <div className="searchbox" style={{ maxWidth: 280 }}>
          <I.search size={14} />
          <input placeholder="Buscar archivo…" />
        </div>
      </div>

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
    </div>
  );
}
