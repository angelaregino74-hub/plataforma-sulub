// ============================================================
// data.ts — Solo configuración estática de la UI
// Los datos reales (materias, grabaciones, exámenes, etc.)
// vienen de Supabase a través de lib/db.ts
// ============================================================

export const EVENT_COLORS: Record<string, string> = {
  mat:  'cal-event',
  esp:  'cal-event--em',
  his:  'cal-event--am',
  bio:  'cal-event--ro',
  qui:  'cal-event--vi',
  fis:  'cal-event',
  sim:  'cal-event--vi',
  exam: 'cal-event--ro',
  tut:  'cal-event--em',
};

export const NAV_STUDENT = [
  { group: null,            items: [
    { id: 'dashboard',  label: 'Inicio',       icon: 'home' },
    { id: 'materias',   label: 'Mis materias', icon: 'book' },
  ]},
  { group: 'CONTENIDO',    items: [
    { id: 'grabaciones', label: 'Grabaciones', icon: 'video' },
    { id: 'material',    label: 'Material',    icon: 'doc'   },
  ]},
  { group: 'EVALUACIÓN',   items: [
    { id: 'examenes',   label: 'Exámenes parciales', icon: 'exam', badge: '2' },
    { id: 'simulacros', label: 'Simulacros',          icon: 'flask' },
  ]},
  { group: 'ORGANIZACIÓN', items: [
    { id: 'calendario', label: 'Calendario', icon: 'cal'   },
    { id: 'directorio', label: 'Apoyo',      icon: 'phone' },
  ]},
];

export const NAV_TEACHER = [
  { group: null,         items: [
    { id: 'maestro',    label: 'Panel docente', icon: 'home' },
    { id: 'materias',   label: 'Mis grupos',    icon: 'book' },
  ]},
  { group: 'CONTENIDO', items: [
    { id: 'grabaciones', label: 'Grabaciones', icon: 'video' },
    { id: 'material',    label: 'Material',    icon: 'doc'   },
  ]},
  { group: 'EVALUACIÓN', items: [
    { id: 'examenes',   label: 'Exámenes',   icon: 'exam'  },
    { id: 'simulacros', label: 'Simulacros', icon: 'flask' },
  ]},
  { group: 'GESTIÓN',   items: [
    { id: 'calendario', label: 'Calendario', icon: 'cal'   },
    { id: 'directorio', label: 'Directorio', icon: 'phone' },
  ]},
];
