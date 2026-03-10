// Untyped Supabase client for components with complex relational queries
// Use this import when you get SelectQueryError or deep type instantiation errors
// import { db } from '@/lib/db';
import { supabase } from '@/integrations/supabase/client';

export const db: any = supabase;
