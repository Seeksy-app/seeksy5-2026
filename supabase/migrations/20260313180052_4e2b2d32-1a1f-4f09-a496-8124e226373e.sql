CREATE TABLE IF NOT EXISTS public.directory_access_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  source text DEFAULT 'app-directory',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.directory_access_logs ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (anonymous access)
CREATE POLICY "Anyone can log directory access"
  ON public.directory_access_logs
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only admins can read
CREATE POLICY "Admins can read directory access logs"
  ON public.directory_access_logs
  FOR SELECT
  TO authenticated
  USING (is_admin(auth.uid()));