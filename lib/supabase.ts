import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Faltan variables de entorno: NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY ' +
    'deben estar configuradas en Vercel (Project → Settings → Environment Variables).'
  );
}

// NEXT_PUBLIC_SUPABASE_URL debe ser la URL completa del proyecto
// (https://<project-ref>.supabase.co), NO solo el "project ref".
// Si se configura solo el ref, createClient lanza "Invalid URL" y la app
// se queda en blanco con un "client-side exception" sin pista del motivo.
if (!/^https:\/\/[a-z0-9-]+\.supabase\.(co|in)\/?$/i.test(supabaseUrl)) {
  throw new Error(
    `NEXT_PUBLIC_SUPABASE_URL no es una URL válida de Supabase: "${supabaseUrl}". ` +
    'Debe verse como https://<project-ref>.supabase.co'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
