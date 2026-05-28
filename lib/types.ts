export interface Materia {
  id: string;
  name: string;
  teacher: string;
  color: string;
  short: string;
  progress: number;
  lessons: number;
  materials: number;
  exams: number;
}

export interface Material {
  id: string | number;
  type: string;
  title: string;
  materia: string;
  color: string;
  date: string;
  size: string;
}

export interface Recording {
  id: string | number;
  title: string;
  materia: string;
  teacher: string;
  dur: string;
  date: string;
  new: boolean;
}

export interface Exam {
  id: string | number;
  materia: string;
  name: string;
  date: string;
  status: 'pending' | 'graded';
  score: number | null;
}

export interface Simulation {
  id: string | number;
  name: string;
  date: string;
  dur: string;
  score: number | null;
  status: 'graded' | 'upcoming';
  questions: number;
}

export interface SimBreakdown {
  area: string;
  pct: number;
}

export interface DirectorioEntry {
  id: number;
  name: string;
  who: string;
  role: string;
  email: string;
  phone: string;
  hours: string;
  avatar: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: string;
}

export interface NavGroup {
  group: string | null;
  items: NavItem[];
}

export interface AppData {
  MATERIAS: Materia[];
  RECENT_MATERIALS: Material[];
  RECORDINGS: Recording[];
  EXAMS: Exam[];
  SIMULATIONS: Simulation[];
  SIM_BREAKDOWN: SimBreakdown[];
  DIRECTORY: DirectorioEntry[];
  CAL_EVENTS: Record<number, { title: string; type: string }[]>;
  EVENT_COLORS: Record<string, string>;
  NAV_STUDENT: NavGroup[];
  NAV_TEACHER: NavGroup[];
}

export interface UserProfile {
  id: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
  avatar: string;
  email: string;
  area?: string;
}
