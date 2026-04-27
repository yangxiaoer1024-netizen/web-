import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// The client expects the base project URL, not the REST API path
const baseUrl = supabaseUrl.replace('/rest/v1', '');

if (!baseUrl || !supabaseAnonKey) {
  console.warn('Supabase configuration is missing or incomplete.');
}

export const supabase = (baseUrl && supabaseAnonKey) 
  ? createClient(baseUrl, supabaseAnonKey) 
  : null;
