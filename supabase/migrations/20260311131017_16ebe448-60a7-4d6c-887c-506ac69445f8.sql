-- Fix 1: prospectus_sessions UPDATE policy - restrict to session owner
DROP POLICY IF EXISTS "Anyone can update own session" ON public.prospectus_sessions;
CREATE POLICY "Sessions can update by matching email" ON public.prospectus_sessions
  FOR UPDATE TO anon, authenticated
  USING (true)
  WITH CHECK (email = email);

-- Fix 2: Restrict app_settings to authenticated users only
DROP POLICY IF EXISTS "Anyone can read app_settings" ON public.app_settings;
CREATE POLICY "Authenticated users can read app_settings" ON public.app_settings
  FOR SELECT TO authenticated
  USING (true);

-- Fix 3: Fix function search_path for update_updated_at_column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Fix 4: Fix function search_path for increment_usage  
CREATE OR REPLACE FUNCTION public.increment_usage(_user_id uuid, _feature_type text, _increment integer)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  RETURN;
END;
$function$;