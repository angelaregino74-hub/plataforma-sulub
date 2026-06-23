-- =================================================================
-- SULUB PLATAFORMA — Schema de base de datos
-- Pega este archivo completo en el SQL Editor de Supabase
-- Seguro para ejecutar múltiples veces (idempotente)
-- =================================================================

-- ----------------------------------------------------------------
-- PERFILES (extiende auth.users de Supabase)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id         UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name       TEXT NOT NULL DEFAULT '',
  role       TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
  avatar     TEXT DEFAULT '',
  area       TEXT DEFAULT '',
  email      TEXT DEFAULT '',
  phone      TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "perfil_propio_lectura"   ON public.profiles;
DROP POLICY IF EXISTS "perfil_propio_escritura" ON public.profiles;
CREATE POLICY "perfil_propio_lectura"   ON public.profiles FOR SELECT USING (true);
CREATE POLICY "perfil_propio_escritura" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ----------------------------------------------------------------
-- MATERIAS
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.materias (
  id           TEXT PRIMARY KEY,
  name         TEXT NOT NULL,
  color        TEXT NOT NULL DEFAULT '#1E5FFF',
  short        TEXT NOT NULL DEFAULT '',
  teacher_name TEXT DEFAULT ''
);

ALTER TABLE public.materias ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "materias_lectura_todos"   ON public.materias;
DROP POLICY IF EXISTS "materias_escritura_admin" ON public.materias;
CREATE POLICY "materias_lectura_todos"    ON public.materias FOR SELECT USING (true);
CREATE POLICY "materias_escritura_admin"  ON public.materias FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher','admin')));


-- ----------------------------------------------------------------
-- INSCRIPCIONES (alumno <-> materia)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.enrollments (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id      UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  materia_id      TEXT REFERENCES public.materias(id),
  progress        INT DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  lessons         INT DEFAULT 0,
  materials_count INT DEFAULT 0,
  exams_count     INT DEFAULT 0,
  UNIQUE (student_id, materia_id)
);

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "enrollment_propio"        ON public.enrollments;
DROP POLICY IF EXISTS "enrollment_maestro_lee"   ON public.enrollments;
DROP POLICY IF EXISTS "enrollment_admin_escribe" ON public.enrollments;
CREATE POLICY "enrollment_propio"        ON public.enrollments FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "enrollment_maestro_lee"   ON public.enrollments FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher','admin')));
CREATE POLICY "enrollment_admin_escribe" ON public.enrollments FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));


-- ----------------------------------------------------------------
-- MATERIALES (archivos PDF, DOCX, PPT)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.materiales (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title       TEXT NOT NULL,
  type        TEXT NOT NULL DEFAULT 'PDF',
  materia_id  TEXT REFERENCES public.materias(id),
  file_url    TEXT DEFAULT '',
  file_size   TEXT DEFAULT '',
  uploaded_by UUID REFERENCES public.profiles(id),
  uploaded_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.materiales ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "materiales_lectura_todos"   ON public.materiales;
DROP POLICY IF EXISTS "materiales_maestro_escribe" ON public.materiales;
CREATE POLICY "materiales_lectura_todos"   ON public.materiales FOR SELECT USING (true);
CREATE POLICY "materiales_maestro_escribe" ON public.materiales FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher','admin')));


-- ----------------------------------------------------------------
-- GRABACIONES (videos de clases)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.grabaciones (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title        TEXT NOT NULL,
  materia_id   TEXT REFERENCES public.materias(id),
  teacher_name TEXT DEFAULT '',
  duration     TEXT DEFAULT '',
  video_url    TEXT DEFAULT '',
  is_new       BOOLEAN DEFAULT false,
  recorded_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.grabaciones ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "grabaciones_lectura_todos"   ON public.grabaciones;
DROP POLICY IF EXISTS "grabaciones_maestro_escribe" ON public.grabaciones;
CREATE POLICY "grabaciones_lectura_todos"   ON public.grabaciones FOR SELECT USING (true);
CREATE POLICY "grabaciones_maestro_escribe" ON public.grabaciones FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher','admin')));


-- ----------------------------------------------------------------
-- EXÁMENES
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.examenes (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL,
  materia_id TEXT REFERENCES public.materias(id),
  exam_date  DATE,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.examenes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "examenes_lectura_todos"   ON public.examenes;
DROP POLICY IF EXISTS "examenes_maestro_escribe" ON public.examenes;
CREATE POLICY "examenes_lectura_todos"   ON public.examenes FOR SELECT USING (true);
CREATE POLICY "examenes_maestro_escribe" ON public.examenes FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher','admin')));


-- ----------------------------------------------------------------
-- RESULTADOS DE EXÁMENES (por alumno)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.exam_results (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  exam_id    UUID REFERENCES public.examenes(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  score      INT CHECK (score >= 0 AND score <= 100),
  status     TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'graded')),
  UNIQUE (exam_id, student_id)
);

ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "exam_results_propio"          ON public.exam_results;
DROP POLICY IF EXISTS "exam_results_maestro_lee"     ON public.exam_results;
DROP POLICY IF EXISTS "exam_results_maestro_escribe" ON public.exam_results;
CREATE POLICY "exam_results_propio"          ON public.exam_results FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "exam_results_maestro_lee"     ON public.exam_results FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher','admin')));
CREATE POLICY "exam_results_maestro_escribe" ON public.exam_results FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher','admin')));


-- ----------------------------------------------------------------
-- SIMULACROS
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.simulacros (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name            TEXT NOT NULL,
  sim_date        DATE,
  duration        TEXT DEFAULT '3h 00m',
  total_questions INT DEFAULT 120
);

ALTER TABLE public.simulacros ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "simulacros_lectura_todos"   ON public.simulacros;
DROP POLICY IF EXISTS "simulacros_maestro_escribe" ON public.simulacros;
CREATE POLICY "simulacros_lectura_todos"   ON public.simulacros FOR SELECT USING (true);
CREATE POLICY "simulacros_maestro_escribe" ON public.simulacros FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher','admin')));


-- ----------------------------------------------------------------
-- RESULTADOS DE SIMULACROS (por alumno)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.sim_results (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sim_id     UUID REFERENCES public.simulacros(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  score      INT CHECK (score >= 0 AND score <= 100),
  status     TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'graded')),
  UNIQUE (sim_id, student_id)
);

ALTER TABLE public.sim_results ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "sim_results_propio"          ON public.sim_results;
DROP POLICY IF EXISTS "sim_results_maestro_lee"     ON public.sim_results;
DROP POLICY IF EXISTS "sim_results_maestro_escribe" ON public.sim_results;
CREATE POLICY "sim_results_propio"          ON public.sim_results FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "sim_results_maestro_lee"     ON public.sim_results FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher','admin')));
CREATE POLICY "sim_results_maestro_escribe" ON public.sim_results FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher','admin')));


-- ----------------------------------------------------------------
-- DESGLOSE DE SIMULACROS (áreas por alumno)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.sim_breakdown (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sim_id     UUID REFERENCES public.simulacros(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  area       TEXT NOT NULL,
  pct        INT
);

ALTER TABLE public.sim_breakdown ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "sim_breakdown_propio"          ON public.sim_breakdown;
DROP POLICY IF EXISTS "sim_breakdown_maestro_escribe" ON public.sim_breakdown;
CREATE POLICY "sim_breakdown_propio"          ON public.sim_breakdown FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "sim_breakdown_maestro_escribe" ON public.sim_breakdown FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher','admin')));


-- ----------------------------------------------------------------
-- EVENTOS DE CALENDARIO
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.eventos (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title      TEXT NOT NULL,
  type       TEXT NOT NULL DEFAULT 'mat',
  event_day  INT NOT NULL,
  materia_id TEXT REFERENCES public.materias(id)
);

ALTER TABLE public.eventos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "eventos_lectura_todos"   ON public.eventos;
DROP POLICY IF EXISTS "eventos_maestro_escribe" ON public.eventos;
CREATE POLICY "eventos_lectura_todos"   ON public.eventos FOR SELECT USING (true);
CREATE POLICY "eventos_maestro_escribe" ON public.eventos FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('teacher','admin')));


-- ----------------------------------------------------------------
-- DIRECTORIO DE APOYO
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.directorio (
  id     SERIAL PRIMARY KEY,
  name   TEXT NOT NULL,
  who    TEXT NOT NULL,
  role   TEXT NOT NULL,
  email  TEXT DEFAULT '',
  phone  TEXT DEFAULT '',
  hours  TEXT DEFAULT '',
  avatar TEXT DEFAULT ''
);

ALTER TABLE public.directorio ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "directorio_lectura_todos" ON public.directorio;
DROP POLICY IF EXISTS "directorio_admin_escribe" ON public.directorio;
CREATE POLICY "directorio_lectura_todos"  ON public.directorio FOR SELECT USING (true);
CREATE POLICY "directorio_admin_escribe"  ON public.directorio FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
