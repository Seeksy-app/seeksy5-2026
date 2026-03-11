
-- Create demo_videos table
CREATE TABLE public.demo_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text DEFAULT 'Platform Overview',
  video_url text,
  thumbnail_url text,
  duration_seconds numeric,
  order_index integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.demo_videos ENABLE ROW LEVEL SECURITY;

-- Anyone can view active demo videos
CREATE POLICY "Anyone can view demo videos"
  ON public.demo_videos FOR SELECT
  USING (true);

-- Admins can manage all demo videos
CREATE POLICY "Admins can manage demo videos"
  ON public.demo_videos FOR ALL
  USING (is_admin(auth.uid()));

-- Create video_progress table for tracking watch progress
CREATE TABLE public.video_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  video_id text NOT NULL,
  progress_seconds integer DEFAULT 0,
  completed boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, video_id)
);

ALTER TABLE public.video_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own video progress"
  ON public.video_progress FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
