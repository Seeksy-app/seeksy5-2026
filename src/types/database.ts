// Fully permissive Database type - bypasses all Supabase type checking
// This is an interim solution until the auto-generated types cover all tables

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Use a minimal Database type that satisfies SupabaseClient<Database> constraints
// but doesn't trigger SelectQueryError for relational queries
export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      [key: string]: {
        Row: { [key: string]: any }
        Insert: { [key: string]: any }
        Update: { [key: string]: any }
        Relationships: {
          foreignKeyName: string
          columns: string[]
          isOneToOne: boolean
          referencedRelation: string
          referencedColumns: string[]
        }[]
      }
    }
    Views: {
      [key: string]: {
        Row: { [key: string]: any }
        Relationships: {
          foreignKeyName: string
          columns: string[]
          isOneToOne: boolean
          referencedRelation: string
          referencedColumns: string[]
        }[]
      }
    }
    Functions: {
      [key: string]: {
        Args: { [key: string]: any }
        Returns: any
      }
    }
    Enums: {
      [key: string]: string
      account_type: 'creator' | 'advertiser' | 'listener'
    }
    CompositeTypes: {
      [key: string]: any
    }
  }
}
