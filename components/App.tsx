'use client';
import { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
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
import { supabase } from '../lib/supabase';
import { fetchAppData } from '../lib/db';
import type { AppData, UserProfile } from '../lib/types';

export default function App() {
  const [session, setSession]   = useState<Session | null>(null);
  const [profile, setProfile]   = useState<UserProfile | null>(null);
  const [data, setData]         = useState<AppData | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [theme, setTheme]       = useState('light');
  const [role, setRole]         = useState<'student' | 'teacher'>('student');
  const [view, setView]         = useState('dashboard');

  // Suscribirse a cambios de sesión
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthReady(true);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        setProfile(null);
        setData(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Cargar perfil y datos cuando hay sesión
  useEffect(() => {
    if (!session) return;

    async function cargarDatos() {
      setDataLoading(true);

      const { data: p } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session!.user.id)
        .single();

      if (p) {
        const initials = p.name
          ? p.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
          : p.email?.slice(0, 2).toUpperCase() ?? 'U';

        const userProfile: UserProfile = {
          id:     p.id,
          name:   p.name || p.email,
          role:   p.role,
          avatar: p.avatar || initials,
          email:  p.email || session!.user.email || '',
          area:   p.area,
        };
        setProfile(userProfile);
        setRole(p.role === 'teacher' ? 'teacher' : 'student');
      }

      const appData = await fetchAppData(session!.user.id);
      setData(appData);
      setDataLoading(false);
    }

    cargarDatos();
  }, [session?.user.id]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (role === 'teacher' && view === 'dashboard') setView('maestro');
    if (role === 'student' && view === 'maestro')   setView('dashboard');
  }, [role]);

  // Aún verificando sesión
  if (!authReady) return null;

  // Sin sesión → Login
  if (!session) {
    return <div className="app app--login"><Login /></div>;
  }

  // Sesión activa pero datos cargando
  if (dataLoading || !data) {
    return (
      <div className="app app--login" style={{ display: 'grid', placeItems: 'center' }}>
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          <div className="brand-mark" style={{ margin: '0 auto 16px', opacity: 0.5 }}>S</div>
          <div style={{ fontSize: 14 }}>Cargando tu plataforma…</div>
        </div>
      </div>
    );
  }

  function handleLogout() {
    supabase.auth.signOut();
    setView('dashboard');
  }

  let content;
  switch (view) {
    case 'dashboard':   content = <Dashboard   data={data} setView={setView} />; break;
    case 'maestro':     content = <Maestro     data={data} setView={setView} />; break;
    case 'materias':    content = <Materias    data={data} setView={setView} role={role} />; break;
    case 'grabaciones': content = <Grabaciones data={data} role={role} />; break;
    case 'material':    content = <Material    data={data} role={role} />; break;
    case 'examenes':    content = <Examenes    data={data} role={role} />; break;
    case 'simulacros':  content = <Simulacros  data={data} role={role} />; break;
    case 'calendario':  content = <Calendario  data={data} role={role} />; break;
    case 'directorio':  content = <Directorio  data={data} />; break;
    case 'perfil':      content = <Perfil      data={data} user={profile} />; break;
    default:            content = <Dashboard   data={data} setView={setView} />;
  }

  return (
    <div className="app">
      <Sidebar role={role} view={view} setView={setView} user={profile} data={data} />
      <div className="main">
        <Topbar
          role={role} setRole={setRole}
          theme={theme} setTheme={setTheme}
          view={view} onLogout={handleLogout}
        />
        {content}
      </div>
    </div>
  );
}
