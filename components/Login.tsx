'use client';
import { useState } from 'react';
import { I } from './icons';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail]     = useState('');
  const [pwd, setPwd]         = useState('');
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password: pwd });
    if (error) setError(error.message === 'Invalid login credentials' ? 'Correo o contraseña incorrectos.' : error.message);
    setLoading(false);
  }

  return (
    <div className="login-shell">
      <div className="login-art">
        <div className="login-art__brand">
          <div className="brand-mark">S</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Sulub</div>
            <div style={{ fontSize: 11, opacity: 0.75, letterSpacing: '0.04em', textTransform: 'uppercase' }}>Centro de Desarrollo</div>
          </div>
        </div>
        <div className="login-art__orbit-1"></div>
        <div className="login-art__orbit-2"></div>
        <div className="login-art__star" style={{ top: '20%', right: '15%' }}></div>
        <div className="login-art__star" style={{ top: '60%', left: '25%', width: 5, height: 5 }}></div>
        <div className="login-art__star" style={{ top: '40%', right: '40%', width: 4, height: 4, opacity: 0.6 }}></div>
        <div className="login-art__quote">Tu camino a la universidad, en un solo lugar.</div>
        <div className="login-art__cite">Plataforma educativa Sulub · Generación 2026</div>
      </div>

      <div className="login-form-wrap">
        <div className="login-form">
          <h1>Bienvenido de vuelta</h1>
          <p>Ingresa para acceder a tus clases, materiales y simulacros.</p>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                disabled={loading}
              />
            </div>
            <div className="field">
              <label>Contraseña</label>
              <input
                type="password"
                value={pwd}
                onChange={e => setPwd(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>
            {error && (
              <div style={{ color: 'var(--acc-rose)', fontSize: 13, marginBottom: 8, padding: '8px 12px', background: 'var(--acc-rose)18', borderRadius: 8 }}>
                {error}
              </div>
            )}
            <div className="login-row">
              <label className="checkbox">
                <input type="checkbox" defaultChecked />
                Mantener sesión iniciada
              </label>
              <a className="login-link" href="#">¿Olvidaste tu contraseña?</a>
            </div>
            <button
              type="submit"
              className="btn btn--primary btn--lg"
              style={{ width: '100%', justifyContent: 'center' }}
              disabled={loading}
            >
              {loading ? 'Entrando…' : <>Entrar a la plataforma <I.arrowR size={16} /></>}
            </button>
          </form>
          <div style={{ textAlign: 'center', marginTop: 24, fontSize: 12.5, color: 'var(--text-muted)' }}>
            ¿Aún no tienes cuenta? <a className="login-link" href="#">Habla con tu coordinador</a>
          </div>
        </div>
      </div>
    </div>
  );
}
