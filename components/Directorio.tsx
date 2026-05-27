import React from 'react';
import { I } from './icons';
import { DATA } from './data';

export default function Directorio() {
  const D = DATA;
  return (
    <div className="content content--narrow fade-in">
      <div className="page-header">
        <div>
          <div className="page-eyebrow" style={{ color: 'var(--acc-teal)' }}>¿Necesitas ayuda?</div>
          <h1 className="page-title">Directorio de apoyo</h1>
          <p className="page-subtitle">Coordinación, profesores y soporte técnico — un mensaje y te respondemos.</p>
        </div>
      </div>

      <div className="dir-grid">
        {D.DIRECTORY.map(d => (
          <div key={d.id} className="card dir-card">
            <div className="dir-card__head">
              <div className="avatar avatar--lg">{d.avatar}</div>
              <div>
                <div className="dir-card__name">{d.who}</div>
                <div className="dir-card__role">{d.role}</div>
              </div>
            </div>
            <div className="dir-card__contact">
              <div className="dir-card__contact-row"><I.mail size={14} /> {d.email}</div>
              <div className="dir-card__contact-row"><I.phone size={14} /> {d.phone}</div>
              <div className="dir-card__contact-row"><I.clock size={14} /> {d.hours}</div>
            </div>
            <div className="dir-card__actions">
              <button className="btn btn--primary btn--sm" style={{ flex: 1, justifyContent: 'center' }}>
                <I.whatsapp size={13} /> WhatsApp
              </button>
              <button className="btn btn--sm" style={{ flex: 1, justifyContent: 'center' }}>
                <I.mail size={13} /> Correo
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 28, background: 'var(--bg-soft)', border: '1px dashed var(--line)', textAlign: 'center', padding: '32px 20px' }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, margin: '0 0 6px' }}>¿No encuentras a alguien?</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: 13.5, margin: '0 0 14px' }}>Escríbenos por WhatsApp y te conectamos con la persona indicada.</p>
        <button className="btn btn--primary"><I.whatsapp size={14} /> Chat general</button>
      </div>
    </div>
  );
}
