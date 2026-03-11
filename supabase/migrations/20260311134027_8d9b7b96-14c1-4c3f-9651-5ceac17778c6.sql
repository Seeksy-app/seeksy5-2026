
-- Create storage bucket for demo videos
INSERT INTO storage.buckets (id, name, public) VALUES ('demo-videos', 'demo-videos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload to demo-videos bucket
CREATE POLICY "Admins can upload demo videos" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'demo-videos' AND is_admin(auth.uid()));

-- Allow public read access
CREATE POLICY "Public can view demo videos" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'demo-videos');

-- Allow admins to delete
CREATE POLICY "Admins can delete demo videos" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'demo-videos' AND is_admin(auth.uid()));
