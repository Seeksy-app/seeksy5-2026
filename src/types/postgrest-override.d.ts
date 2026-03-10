// Override Supabase PostgREST's SelectQueryError to resolve as `any` instead of an error string
// This prevents all "could not find the relation" type errors across the codebase

declare module '@supabase/postgrest-js' {
  // Override SelectQueryError to be permissive
  export type SelectQueryError<Message extends string> = any
}
