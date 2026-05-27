export const MATERIAS = [
  { id: 'mat', name: 'Matemáticas',        teacher: 'Prof. Luis Castillo', color: '#1E5FFF', short: 'M', progress: 72, lessons: 24, materials: 18, exams: 4 },
  { id: 'esp', name: 'Español y Verbal',   teacher: 'Prof. Marisol Pech',  color: '#0E8E6A', short: 'E', progress: 65, lessons: 22, materials: 15, exams: 3 },
  { id: 'his', name: 'Historia de México', teacher: 'Prof. Andrés Couoh',  color: '#B8741A', short: 'H', progress: 48, lessons: 18, materials: 12, exams: 3 },
  { id: 'bio', name: 'Biología',           teacher: 'Prof. Daniela Uc',    color: '#B8456E', short: 'B', progress: 81, lessons: 20, materials: 16, exams: 4 },
  { id: 'qui', name: 'Química',            teacher: 'Prof. Ricardo Tun',   color: '#6B46C1', short: 'Q', progress: 54, lessons: 19, materials: 14, exams: 3 },
  { id: 'fis', name: 'Física',             teacher: 'Prof. Luis Castillo', color: '#0E7C8E', short: 'F', progress: 38, lessons: 21, materials: 13, exams: 3 },
];

export const RECENT_MATERIALS = [
  { id: 1, type: 'PDF',  title: 'Guía Álgebra — Funciones cuadráticas', materia: 'Matemáticas', color: '#1E5FFF', date: 'Hoy, 09:14', size: '2.4 MB' },
  { id: 2, type: 'DOCX', title: 'Resumen Independencia 1810–1821',      materia: 'Historia',    color: '#B8741A', date: 'Ayer',       size: '840 KB' },
  { id: 3, type: 'PPT',  title: 'Mitosis y Meiosis — diapositivas',     materia: 'Biología',    color: '#B8456E', date: 'Lun 28',    size: '5.1 MB' },
  { id: 4, type: 'PDF',  title: 'Verbal — Analogías y antónimos',       materia: 'Español',     color: '#0E8E6A', date: 'Lun 28',    size: '1.8 MB' },
  { id: 5, type: 'PDF',  title: 'Tabla periódica — propiedades',        materia: 'Química',     color: '#6B46C1', date: 'Vie 25',    size: '3.2 MB' },
];

export const RECORDINGS = [
  { id: 1, title: 'Funciones cuadráticas — clase 12',     materia: 'Matemáticas', teacher: 'Luis Castillo', dur: '1:42:18', date: '02 May', new: true },
  { id: 2, title: 'Independencia: causas y consecuencias', materia: 'Historia',   teacher: 'Andrés Couoh',  dur: '1:08:55', date: '01 May', new: true },
  { id: 3, title: 'Reproducción celular — Mitosis',        materia: 'Biología',   teacher: 'Daniela Uc',    dur: '54:12',   date: '30 Abr', new: false },
  { id: 4, title: 'Comprensión lectora — práctica',        materia: 'Español',    teacher: 'Marisol Pech',  dur: '1:15:40', date: '29 Abr', new: false },
  { id: 5, title: 'Estequiometría — balanceo',             materia: 'Química',    teacher: 'Ricardo Tun',   dur: '1:22:10', date: '28 Abr', new: false },
  { id: 6, title: 'Cinemática — ejercicios',               materia: 'Física',     teacher: 'Luis Castillo', dur: '47:33',   date: '26 Abr', new: false },
];

export const EXAMS = [
  { id: 1, materia: 'Matemáticas', name: 'Parcial 2 — Funciones',         date: '08 May', status: 'pending', score: null },
  { id: 2, materia: 'Historia',    name: 'Parcial 2 — Siglo XIX',         date: '10 May', status: 'pending', score: null },
  { id: 3, materia: 'Biología',    name: 'Parcial 2 — Genética',          date: '02 May', status: 'graded',  score: 92 },
  { id: 4, materia: 'Español',     name: 'Parcial 2 — Comprensión',       date: '01 May', status: 'graded',  score: 88 },
  { id: 5, materia: 'Química',     name: 'Parcial 1 — Materia y energía', date: '15 Abr', status: 'graded',  score: 78 },
  { id: 6, materia: 'Física',      name: 'Parcial 1 — Cinemática',        date: '12 Abr', status: 'graded',  score: 71 },
];

export const SIMULATIONS = [
  { id: 1, name: 'Simulacro UNAM Área I',  date: '04 May', dur: '3h 00m', score: 89, status: 'graded',   questions: 120 },
  { id: 2, name: 'Simulacro IPN — ICFM',   date: '27 Abr', dur: '3h 00m', score: 76, status: 'graded',   questions: 130 },
  { id: 3, name: 'Simulacro UAM',          date: '20 Abr', dur: '2h 30m', score: 82, status: 'graded',   questions: 100 },
  { id: 4, name: 'Simulacro COMIPEMS',     date: '13 Abr', dur: '3h 00m', score: 91, status: 'graded',   questions: 128 },
  { id: 5, name: 'Simulacro UNAM Área II', date: '12 May', dur: '3h 00m', score: null, status: 'upcoming', questions: 120 },
];

export const SIM_BREAKDOWN = [
  { area: 'Mat. lógica',  pct: 88 },
  { area: 'Razonamiento', pct: 82 },
  { area: 'Español',      pct: 91 },
  { area: 'Historia',     pct: 74 },
  { area: 'Biología',     pct: 86 },
  { area: 'Química',      pct: 71 },
  { area: 'Física',       pct: 68 },
];

export const DIRECTORY = [
  { id: 1, name: 'Coord. Académica', who: 'Mtra. Alma Sulub',  role: 'Coordinadora',    email: 'alma@sulub.mx',    phone: '+52 999 123 4567', hours: 'L–V 9:00–17:00',  avatar: 'AS' },
  { id: 2, name: 'Soporte Técnico',  who: 'Centro de Ayuda',   role: 'Soporte 24/7',    email: 'soporte@sulub.mx', phone: '+52 999 234 5678', hours: 'Lun a Dom 24h',   avatar: 'ST' },
  { id: 3, name: 'Tutorías',         who: 'Mtro. Diego Pat',   role: 'Tutor académico', email: 'diego@sulub.mx',   phone: '+52 999 345 6789', hours: 'L–V 14:00–20:00', avatar: 'DP' },
  { id: 4, name: 'Inscripciones',    who: 'Lic. Karla Mex',    role: 'Admisiones',      email: 'karla@sulub.mx',   phone: '+52 999 456 7890', hours: 'L–V 8:00–16:00',  avatar: 'KM' },
];

export const CAL_EVENTS: Record<number, { title: string; type: string }[]> = {
  4:  [{ title: 'Simulacro UNAM',    type: 'sim'  }],
  5:  [{ title: 'Mat. — clase 12',   type: 'mat'  }, { title: 'Bio — lab',      type: 'bio' }],
  6:  [{ title: 'Esp. — verbal',     type: 'esp'  }],
  7:  [{ title: 'His. — siglo XIX',  type: 'his'  }],
  8:  [{ title: 'Parcial Matemáticas', type: 'exam' }],
  10: [{ title: 'Parcial Historia',  type: 'exam' }],
  11: [{ title: 'Quí. — estequio.',  type: 'qui'  }],
  12: [{ title: 'Simulacro UNAM II', type: 'sim'  }],
  13: [{ title: 'Fís. — dinámica',   type: 'fis'  }],
  14: [{ title: 'Mat. — clase 13',   type: 'mat'  }],
  15: [{ title: 'Bio — genética',    type: 'bio'  }],
  18: [{ title: 'Tutoría grupal',    type: 'tut'  }],
  20: [{ title: 'Parcial Biología',  type: 'exam' }],
  21: [{ title: 'Esp. — redacción',  type: 'esp'  }],
  22: [{ title: 'His. — Revolución', type: 'his'  }],
  25: [{ title: 'Mat. — clase 14',   type: 'mat'  }],
  26: [{ title: 'Quí. — orgánica',   type: 'qui'  }],
  28: [{ title: 'Simulacro IPN',     type: 'sim'  }],
};

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
  { group: null,           items: [
    { id: 'dashboard',  label: 'Inicio',       icon: 'home' },
    { id: 'materias',   label: 'Mis materias', icon: 'book' },
  ]},
  { group: 'CONTENIDO',   items: [
    { id: 'grabaciones', label: 'Grabaciones', icon: 'video' },
    { id: 'material',    label: 'Material',    icon: 'doc'   },
  ]},
  { group: 'EVALUACIÓN',  items: [
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
    { id: 'examenes',   label: 'Exámenes', icon: 'exam' },
    { id: 'simulacros', label: 'Simulacros', icon: 'flask' },
  ]},
  { group: 'GESTIÓN',   items: [
    { id: 'calendario', label: 'Calendario',  icon: 'cal'   },
    { id: 'directorio', label: 'Directorio',  icon: 'phone' },
  ]},
];

export const DATA = {
  MATERIAS, RECENT_MATERIALS, RECORDINGS, EXAMS, SIMULATIONS, SIM_BREAKDOWN,
  DIRECTORY, CAL_EVENTS, EVENT_COLORS, NAV_STUDENT, NAV_TEACHER,
};
