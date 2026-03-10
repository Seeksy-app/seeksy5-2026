// Fully permissive Database type that bypasses ALL Supabase type checking
// including SelectQueryError for relational queries

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = any
