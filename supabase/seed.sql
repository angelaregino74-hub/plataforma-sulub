-- =================================================================
-- SULUB PLATAFORMA — Datos iniciales (seed)
-- Ejecutar DESPUÉS de schema.sql
-- =================================================================

-- ----------------------------------------------------------------
-- MATERIAS
-- ----------------------------------------------------------------
INSERT INTO public.materias (id, name, color, short, teacher_name) VALUES
  ('mat', 'Matemáticas',        '#1E5FFF', 'M', 'Prof. Luis Castillo'),
  ('esp', 'Español y Verbal',   '#0E8E6A', 'E', 'Prof. Marisol Pech'),
  ('his', 'Historia de México', '#B8741A', 'H', 'Prof. Andrés Couoh'),
  ('bio', 'Biología',           '#B8456E', 'B', 'Prof. Daniela Uc'),
  ('qui', 'Química',            '#6B46C1', 'Q', 'Prof. Ricardo Tun'),
  ('fis', 'Física',             '#0E7C8E', 'F', 'Prof. Luis Castillo')
ON CONFLICT (id) DO NOTHING;


-- ----------------------------------------------------------------
-- GRABACIONES
-- ----------------------------------------------------------------
INSERT INTO public.grabaciones (title, materia_id, teacher_name, duration, is_new, recorded_at) VALUES
  ('Funciones cuadráticas — clase 12',      'mat', 'Luis Castillo', '1:42:18', true,  '2026-05-02 18:00:00'),
  ('Independencia: causas y consecuencias', 'his', 'Andrés Couoh',  '1:08:55', true,  '2026-05-01 17:00:00'),
  ('Reproducción celular — Mitosis',        'bio', 'Daniela Uc',    '54:12',   false, '2026-04-30 16:00:00'),
  ('Comprensión lectora — práctica',        'esp', 'Marisol Pech',  '1:15:40', false, '2026-04-29 18:00:00'),
  ('Estequiometría — balanceo',             'qui', 'Ricardo Tun',   '1:22:10', false, '2026-04-28 17:00:00'),
  ('Cinemática — ejercicios',               'fis', 'Luis Castillo', '47:33',   false, '2026-04-26 18:00:00');


-- ----------------------------------------------------------------
-- MATERIALES
-- ----------------------------------------------------------------
INSERT INTO public.materiales (title, type, materia_id, file_size, uploaded_at) VALUES
  ('Guía Álgebra — Funciones cuadráticas',  'PDF',  'mat', '2.4 MB', now()),
  ('Resumen Independencia 1810–1821',        'DOCX', 'his', '840 KB', now() - INTERVAL '1 day'),
  ('Mitosis y Meiosis — diapositivas',       'PPT',  'bio', '5.1 MB', '2026-04-28 09:00:00'),
  ('Verbal — Analogías y antónimos',         'PDF',  'esp', '1.8 MB', '2026-04-28 10:00:00'),
  ('Tabla periódica — propiedades',          'PDF',  'qui', '3.2 MB', '2026-04-25 11:00:00'),
  ('Funciones — ejercicios resueltos',       'PDF',  'mat', '1.2 MB', '2026-04-24 09:00:00'),
  ('Comprensión lectora — antología',        'DOCX', 'esp', '720 KB', '2026-04-22 10:00:00'),
  ('Revolución Mexicana',                    'PPT',  'his', '4.8 MB', '2026-04-20 09:00:00'),
  ('Cinemática — formulario',               'PDF',  'fis', '420 KB', '2026-04-18 08:00:00');


-- ----------------------------------------------------------------
-- EXÁMENES
-- ----------------------------------------------------------------
INSERT INTO public.examenes (name, materia_id, exam_date) VALUES
  ('Parcial 2 — Funciones',         'mat', '2026-05-08'),
  ('Parcial 2 — Siglo XIX',         'his', '2026-05-10'),
  ('Parcial 2 — Genética',          'bio', '2026-05-02'),
  ('Parcial 2 — Comprensión',       'esp', '2026-05-01'),
  ('Parcial 1 — Materia y energía', 'qui', '2026-04-15'),
  ('Parcial 1 — Cinemática',        'fis', '2026-04-12');


-- ----------------------------------------------------------------
-- SIMULACROS
-- ----------------------------------------------------------------
INSERT INTO public.simulacros (name, sim_date, duration, total_questions) VALUES
  ('Simulacro UNAM Área I',  '2026-05-04', '3h 00m', 120),
  ('Simulacro IPN — ICFM',   '2026-04-27', '3h 00m', 130),
  ('Simulacro UAM',          '2026-04-20', '2h 30m', 100),
  ('Simulacro COMIPEMS',     '2026-04-13', '3h 00m', 128),
  ('Simulacro UNAM Área II', '2026-05-12', '3h 00m', 120);


-- ----------------------------------------------------------------
-- EVENTOS DE CALENDARIO (Mayo 2026)
-- ----------------------------------------------------------------
INSERT INTO public.eventos (title, type, event_day, materia_id) VALUES
  ('Simulacro UNAM',      'sim',  4,  null),
  ('Mat. — clase 12',     'mat',  5,  'mat'),
  ('Bio — lab',           'bio',  5,  'bio'),
  ('Esp. — verbal',       'esp',  6,  'esp'),
  ('His. — siglo XIX',    'his',  7,  'his'),
  ('Parcial Matemáticas', 'exam', 8,  'mat'),
  ('Parcial Historia',    'exam', 10, 'his'),
  ('Quí. — estequio.',    'qui',  11, 'qui'),
  ('Simulacro UNAM II',   'sim',  12, null),
  ('Fís. — dinámica',     'fis',  13, 'fis'),
  ('Mat. — clase 13',     'mat',  14, 'mat'),
  ('Bio — genética',      'bio',  15, 'bio'),
  ('Tutoría grupal',      'tut',  18, null),
  ('Parcial Biología',    'exam', 20, 'bio'),
  ('Esp. — redacción',    'esp',  21, 'esp'),
  ('His. — Revolución',   'his',  22, 'his'),
  ('Mat. — clase 14',     'mat',  25, 'mat'),
  ('Quí. — orgánica',     'qui',  26, 'qui'),
  ('Simulacro IPN',       'sim',  28, null);


-- ----------------------------------------------------------------
-- DIRECTORIO DE APOYO
-- ----------------------------------------------------------------
INSERT INTO public.directorio (name, who, role, email, phone, hours, avatar) VALUES
  ('Coord. Académica', 'Mtra. Alma Sulub', 'Coordinadora',    'alma@sulub.mx',    '+52 999 123 4567', 'L–V 9:00–17:00',  'AS'),
  ('Soporte Técnico',  'Centro de Ayuda',  'Soporte 24/7',    'soporte@sulub.mx', '+52 999 234 5678', 'Lun a Dom 24h',   'ST'),
  ('Tutorías',         'Mtro. Diego Pat',  'Tutor académico', 'diego@sulub.mx',   '+52 999 345 6789', 'L–V 14:00–20:00', 'DP'),
  ('Inscripciones',    'Lic. Karla Mex',   'Admisiones',      'karla@sulub.mx',   '+52 999 456 7890', 'L–V 8:00–16:00',  'KM');


-- =================================================================
-- DATOS POR ALUMNO (ejecutar después de crear usuarios)
--
-- 1. Ve a Supabase > Authentication > Users > Invite user
--    Crea: alejandro@sulub.mx (alumno) y luis@sulub.mx (maestro)
--
-- 2. En Authentication > Users, copia el UUID de cada usuario
--
-- 3. Actualiza el rol del maestro:
--    UPDATE public.profiles
--    SET role = 'teacher', name = 'Luis Castillo', avatar = 'LC'
--    WHERE email = 'luis@sulub.mx';
--
--    UPDATE public.profiles
--    SET name = 'Alejandro Silva', avatar = 'AS', area = 'Área II'
--    WHERE email = 'alejandro@sulub.mx';
--
-- 4. Inscribe al alumno en todas las materias (reemplaza el UUID):
-- =================================================================

-- INSTRUCCIÓN: Descomenta y reemplaza 'AQUI-VA-EL-UUID-DEL-ALUMNO'
-- con el UUID real del alumno de Supabase Authentication.

/*
DO $$
DECLARE
  alumno_id UUID := 'AQUI-VA-EL-UUID-DEL-ALUMNO';
  sim1_id   UUID;
BEGIN
  -- Inscripciones con progreso
  INSERT INTO public.enrollments (student_id, materia_id, progress, lessons, materials_count, exams_count)
  VALUES
    (alumno_id, 'mat', 72, 24, 18, 4),
    (alumno_id, 'esp', 65, 22, 15, 3),
    (alumno_id, 'his', 48, 18, 12, 3),
    (alumno_id, 'bio', 81, 20, 16, 4),
    (alumno_id, 'qui', 54, 19, 14, 3),
    (alumno_id, 'fis', 38, 21, 13, 3)
  ON CONFLICT (student_id, materia_id) DO NOTHING;

  -- Resultados de exámenes calificados
  INSERT INTO public.exam_results (exam_id, student_id, score, status)
  SELECT e.id, alumno_id, 92, 'graded' FROM public.examenes e WHERE e.name = 'Parcial 2 — Genética'
  ON CONFLICT DO NOTHING;
  INSERT INTO public.exam_results (exam_id, student_id, score, status)
  SELECT e.id, alumno_id, 88, 'graded' FROM public.examenes e WHERE e.name = 'Parcial 2 — Comprensión'
  ON CONFLICT DO NOTHING;
  INSERT INTO public.exam_results (exam_id, student_id, score, status)
  SELECT e.id, alumno_id, 78, 'graded' FROM public.examenes e WHERE e.name = 'Parcial 1 — Materia y energía'
  ON CONFLICT DO NOTHING;
  INSERT INTO public.exam_results (exam_id, student_id, score, status)
  SELECT e.id, alumno_id, 71, 'graded' FROM public.examenes e WHERE e.name = 'Parcial 1 — Cinemática'
  ON CONFLICT DO NOTHING;

  -- Resultados de simulacros
  INSERT INTO public.sim_results (sim_id, student_id, score, status)
  SELECT s.id, alumno_id, 89, 'graded' FROM public.simulacros s WHERE s.name = 'Simulacro UNAM Área I'
  ON CONFLICT DO NOTHING;
  INSERT INTO public.sim_results (sim_id, student_id, score, status)
  SELECT s.id, alumno_id, 76, 'graded' FROM public.simulacros s WHERE s.name = 'Simulacro IPN — ICFM'
  ON CONFLICT DO NOTHING;
  INSERT INTO public.sim_results (sim_id, student_id, score, status)
  SELECT s.id, alumno_id, 82, 'graded' FROM public.simulacros s WHERE s.name = 'Simulacro UAM'
  ON CONFLICT DO NOTHING;
  INSERT INTO public.sim_results (sim_id, student_id, score, status)
  SELECT s.id, alumno_id, 91, 'graded' FROM public.simulacros s WHERE s.name = 'Simulacro COMIPEMS'
  ON CONFLICT DO NOTHING;

  -- Desglose del primer simulacro
  SELECT id INTO sim1_id FROM public.simulacros WHERE name = 'Simulacro UNAM Área I';
  INSERT INTO public.sim_breakdown (sim_id, student_id, area, pct)
  VALUES
    (sim1_id, alumno_id, 'Mat. lógica',  88),
    (sim1_id, alumno_id, 'Razonamiento', 82),
    (sim1_id, alumno_id, 'Español',      91),
    (sim1_id, alumno_id, 'Historia',     74),
    (sim1_id, alumno_id, 'Biología',     86),
    (sim1_id, alumno_id, 'Química',      71),
    (sim1_id, alumno_id, 'Física',       68)
  ON CONFLICT DO NOTHING;
END $$;
*/
