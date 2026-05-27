import React from 'react';
import { I } from './icons';
import { DATA } from './data';

export function Sidebar({ role, view, setView }: { role: string; view: string; setView: (v: string) => void }) {
  const groups = role === 'teacher' ? DATA.NAV_TEACHER : DATA.NAV_STUDENT;
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="brand-mark">S</div>
        <div>
          <div className="brand-name">Sulub</div>
          <div className="brand-tag">Centro de Desarrollo</div>
        </div>
      </div>
      <nav className="sidebar__nav">
        {groups.map((g, i) => (
          <React.Fragment key={i}>
            {g.group && <div className="nav__group-label">{g.group}</div>}
            {g.items.map((it: any) => {
              const active = view === it.id;
              const Ico = I[it.icon];
              return (
                <div key={it.id} className={`nav__item ${active ? 'nav__item--active' : ''}`} onClick={() => setView(it.id)}>
                  <Ico />
                  <span>{it.label}</span>
                  {it.badge && <span className="nav__badge">{it.badge}</span>}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </nav>
      <div className="sidebar__footer">
        <div className="user-chip" onClick={() => setView('perfil')} style={{ cursor: 'pointer' }}>
          <div className="avatar">{role === 'teacher' ? 'LC' : 'AS'}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="user-chip__name">{role === 'teacher' ? 'Luis Castillo' : 'Alejandro Silva'}</div>
            <div className="user-chip__role">{role === 'teacher' ? 'Profesor' : 'Alumno · Área II'}</div>
          </div>
          <I.chevR size={14} />
        </div>
      </div>
    </aside>
  );
}

export function Topbar({ role, setRole, theme, setTheme, view, onLogout }: {
  role: string; setRole: (r: string) => void;
  theme: string; setTheme: (t: string) => void;
  view: string; onLogout: () => void;
}) {
  const labels: Record<string, string> = {
    dashboard: 'Inicio', materias: 'Mis materias', grabaciones: 'Grabaciones',
    material: 'Material de clase', examenes: 'Exámenes parciales', simulacros: 'Simulacros',
    calendario: 'Calendario', directorio: 'Directorio de apoyo', perfil: 'Mi perfil', maestro: 'Panel docente',
  };
  return (
    <header className="topbar">
      <div className="crumbs">
        <span>Sulub</span>
        <span className="crumbs-sep">/</span>
        <strong>{labels[view] || view}</strong>
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div className="topbar__search">
          <I.search size={15} />
          <input placeholder="Buscar materiales, clases…" />
          <kbd>⌘K</kbd>
        </div>
        <div className="role-toggle">
          <button data-active={role === 'student'} onClick={() => setRole('student')}>Alumno</button>
          <button data-active={role === 'teacher'} onClick={() => setRole('teacher')}>Maestro</button>
        </div>
        <button className="icon-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title="Tema">
          {theme === 'dark' ? <I.sun /> : <I.moon />}
        </button>
        <button className="icon-btn" title="Notificaciones">
          <I.bell />
          <span className="icon-btn__dot"></span>
        </button>
        <button className="icon-btn" onClick={onLogout} title="Salir"><I.logout /></button>
      </div>
    </header>
  );
}
