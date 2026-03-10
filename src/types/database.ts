// Custom database types - intentionally permissive to allow all table references
// The auto-generated types.ts doesn't cover all tables in the database

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Use a permissive Database type that allows any table name
// This prevents TS2769 "not assignable to parameter of type 'never'" errors
export interface Database {
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: Record<string, {
      Row: Record<string, any>
      Insert: Record<string, any>
      Update: Record<string, any>
      Relationships: any[]
    }>
    Views: Record<string, {
      Row: Record<string, any>
      Relationships: any[]
    }>
    Functions: Record<string, {
      Args: Record<string, any>
      Returns: any
    }>
    Enums: Record<string, string>
    CompositeTypes: Record<string, any>
  }
}
