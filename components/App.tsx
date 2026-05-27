'use client';
import { useState, useEffect } from 'react';
import { Sidebar, Topbar } from './Shell';
import Login from './Login';
import Dashboard from './Dashboard';
import Maestro from './Maestro';
import Materias from './Materias';
import Grabaciones from './Grabaciones';
import Material from './Material';
import Examenes from './Examenes';
import Simulacros from './Simulacros';
import Calendario from './Calendario';
import Directorio from './Directorio';
import Perfil from './Perfil';

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [theme, setTheme] = useState('light');
  const [role, setRole] = useState('student');
  const [view, setView] = useState('dashboard');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (role === 'teacher' && view === 'dashboard') setView('maestro');
    if (role === 'student' && view === 'maestro') setView('dashboard');
  }, [role]);

  if (!authed) {
    return <div className="app app--login"><Login onLogin={() => setAuthed(true)} /></div>;
  }

  let content;
  switch (view) {
    case 'dashboard':   content = <Dashboard setView={setView} />; break;
    case 'maestro':     content = <Maestro setView={setView} />; break;
    case 'materias':    content = <Materias setView={setView} role={role} />; break;
    case 'grabaciones': content = <Grabaciones role={role} />; break;
    case 'material':    content = <Material role={role} />; break;
    case 'examenes':    content = <Examenes role={role} />; break;
    case 'simulacros':  content = <Simulacros role={role} />; break;
    case 'calendario':  content = <Calendario role={role} />; break;
    case 'directorio':  content = <Directorio />; break;
    case 'perfil':      content = <Perfil />; break;
    default:            content = <Dashboard setView={setView} />;
  }

  return (
    <div className="app">
      <Sidebar role={role} view={view} setView={setView} />
      <div className="main">
        <Topbar role={role} setRole={setRole} theme={theme} setTheme={setTheme} view={view} onLogout={() => setAuthed(false)} />
        {content}
      </div>
    </div>
  );
}
