ALTER TABLE public.custom_packages ADD COLUMN IF NOT EXISTS is_default boolean DEFAULT false;
ALTER TABLE public.custom_packages ADD COLUMN IF NOT EXISTS modules jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.custom_packages ADD COLUMN IF NOT EXISTS slug text;