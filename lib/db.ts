import { supabase } from './supabase';
import { EVENT_COLORS, NAV_STUDENT, NAV_TEACHER } from '../components/data';
import type { AppData } from './types';

// ── Formatos de fecha ──────────────────────────────────────────
function formatUploadDate(iso: string): string {
  const date  = new Date(iso);
  const now   = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const d     = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diff  = Math.round((today.getTime() - d.getTime()) / 86400000);
  if (diff === 0) {
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `Hoy, ${h}:${m}`;
  }
  if (diff === 1) return 'Ayer';
  return shortDate(iso.split('T')[0]);
}

function shortDate(iso: string): string {
  const [, mo, d] = iso.split('-').map(Number);
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  return `${d.toString().padStart(2, '0')} ${months[mo - 1]}`;
}

// ── Carga todos los datos del usuario desde Supabase ──────────
export async function fetchAppData(userId: string): Promise<AppData> {
  const [
    enrollRes,
    matRes,
    grabRes,
    examRes,
    examResRes,
    simRes,
    simResRes,
    breakRes,
    dirRes,
    evRes,
  ] = await Promise.all([
    supabase
      .from('enrollments')
      .select('progress, lessons, materials_count, exams_count, materias(id, name, color, short, teacher_name)')
      .eq('student_id', userId),

    supabase
      .from('materiales')
      .select('id, title, type, file_size, uploaded_at, materias(name, color)')
      .order('uploaded_at', { ascending: false }),

    supabase
      .from('grabaciones')
      .select('id, title, teacher_name, duration, is_new, recorded_at, materias(name)')
      .order('recorded_at', { ascending: false }),

    supabase
      .from('examenes')
      .select('id, name, exam_date, materias(name, color)')
      .order('exam_date', { ascending: false }),

    supabase
      .from('exam_results')
      .select('exam_id, score, status')
      .eq('student_id', userId),

    supabase
      .from('simulacros')
      .select('id, name, sim_date, duration, total_questions')
      .order('sim_date', { ascending: false }),

    supabase
      .from('sim_results')
      .select('sim_id, score, status')
      .eq('student_id', userId),

    supabase
      .from('sim_breakdown')
      .select('area, pct')
      .eq('student_id', userId),

    supabase
      .from('directorio')
      .select('*')
      .order('id'),

    supabase
      .from('eventos')
      .select('event_day, title, type')
      .order('event_day'),
  ]);

  // CAL_EVENTS: Record<day, events[]>
  const calEvents: Record<number, { title: string; type: string }[]> = {};
  for (const ev of (evRes.data ?? [])) {
    if (!calEvents[ev.event_day]) calEvents[ev.event_day] = [];
    calEvents[ev.event_day].push({ title: ev.title, type: ev.type });
  }

  // MATERIAS
  const materias = (enrollRes.data ?? []).map((e: any) => ({
    id:        e.materias.id,
    name:      e.materias.name,
    teacher:   e.materias.teacher_name,
    color:     e.materias.color,
    short:     e.materias.short,
    progress:  e.progress,
    lessons:   e.lessons,
    materials: e.materials_count,
    exams:     e.exams_count,
  }));

  // RECENT_MATERIALS
  const materiales = (matRes.data ?? []).map((m: any) => ({
    id:      m.id,
    type:    m.type,
    title:   m.title,
    materia: m.materias?.name  ?? '',
    color:   m.materias?.color ?? '#1E5FFF',
    date:    formatUploadDate(m.uploaded_at),
    size:    m.file_size,
  }));

  // RECORDINGS
  const grabaciones = (grabRes.data ?? []).map((g: any) => ({
    id:      g.id,
    title:   g.title,
    materia: g.materias?.name ?? '',
    teacher: g.teacher_name,
    dur:     g.duration,
    date:    shortDate(g.recorded_at.split('T')[0]),
    new:     g.is_new,
  }));

  // EXAMS — todos los exámenes + resultados del alumno
  const examResultsMap = new Map(
    (examResRes.data ?? []).map((r: any) => [r.exam_id, r])
  );
  const examenes = (examRes.data ?? []).map((e: any) => {
    const r = examResultsMap.get(e.id);
    return {
      id:      e.id,
      materia: e.materias?.name ?? '',
      name:    e.name,
      date:    shortDate(e.exam_date),
      status:  (r?.status ?? 'pending') as 'pending' | 'graded',
      score:   r?.score ?? null,
    };
  });

  // SIMULATIONS — todos los simulacros + resultados del alumno
  const simResultsMap = new Map(
    (simResRes.data ?? []).map((r: any) => [r.sim_id, r])
  );
  const simulacros = (simRes.data ?? []).map((s: any) => {
    const r = simResultsMap.get(s.id);
    return {
      id:        s.id,
      name:      s.name,
      date:      shortDate(s.sim_date),
      dur:       s.duration,
      questions: s.total_questions,
      status:    (r?.status ?? 'upcoming') as 'graded' | 'upcoming',
      score:     r?.score ?? null,
    };
  });

  // SIM_BREAKDOWN
  const simBreakdown = (breakRes.data ?? []).map((b: any) => ({
    area: b.area,
    pct:  b.pct,
  }));

  // DIRECTORY
  const directory = (dirRes.data ?? []).map((d: any) => ({
    id:     d.id,
    name:   d.name,
    who:    d.who,
    role:   d.role,
    email:  d.email,
    phone:  d.phone,
    hours:  d.hours,
    avatar: d.avatar,
  }));

  return {
    MATERIAS:         materias,
    RECENT_MATERIALS: materiales,
    RECORDINGS:       grabaciones,
    EXAMS:            examenes,
    SIMULATIONS:      simulacros,
    SIM_BREAKDOWN:    simBreakdown,
    DIRECTORY:        directory,
    CAL_EVENTS:       calEvents,
    EVENT_COLORS,
    NAV_STUDENT,
    NAV_TEACHER,
  };
}
