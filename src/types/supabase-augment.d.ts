// Module augmentation to override the empty Database type from auto-generated types
// This makes all existing imports from @/integrations/supabase/client work with proper types

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database';

declare module '@/integrations/supabase/client' {
  export const supabase: SupabaseClient<Database>;
}

declare module '@supabase/supabase-js' {
  // Augment the module to use our Database type
}
