
-- Prospectus access sessions (one per email visit)
CREATE TABLE public.prospectus_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  session_start TIMESTAMPTZ NOT NULL DEFAULT now(),
  session_end TIMESTAMPTZ,
  duration_seconds INTEGER DEFAULT 0,
  ip_address TEXT,
  user_agent TEXT,
  is_internal BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Individual page/app views within a session
CREATE TABLE public.prospectus_page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.prospectus_sessions(id) ON DELETE CASCADE NOT NULL,
  page_name TEXT NOT NULL,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  time_spent_seconds INTEGER DEFAULT 0
);

-- Enable RLS
ALTER TABLE public.prospectus_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prospectus_page_views ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (email gate, no auth required)
CREATE POLICY "Anyone can create sessions" ON public.prospectus_sessions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update own session" ON public.prospectus_sessions
  FOR UPDATE USING (true);

CREATE POLICY "Anyone can insert page views" ON public.prospectus_page_views
  FOR INSERT WITH CHECK (true);

-- Admin read access
CREATE POLICY "Admins can read sessions" ON public.prospectus_sessions
  FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can read page views" ON public.prospectus_page_views
  FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

-- Allow anon role to insert
GRANT INSERT, UPDATE ON public.prospectus_sessions TO anon;
GRANT INSERT ON public.prospectus_page_views TO anon;
GRANT SELECT ON public.prospectus_sessions TO authenticated;
GRANT SELECT ON public.prospectus_page_views TO authenticated;
