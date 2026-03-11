-- Allow users to insert their own custom_packages
CREATE POLICY "Users can insert own packages" ON public.custom_packages
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own custom_packages  
CREATE POLICY "Users can update own packages" ON public.custom_packages
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own custom_packages
CREATE POLICY "Users can delete own packages" ON public.custom_packages
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);