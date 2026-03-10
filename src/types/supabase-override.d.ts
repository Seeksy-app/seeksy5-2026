// Override Supabase client types to prevent SelectQueryError
// This makes all Supabase query results typed as `any`
import type { SupabaseClient } from '@supabase/supabase-js';

declare module '@/integrations/supabase/client' {
  export const supabase: SupabaseClient<any>;
}
