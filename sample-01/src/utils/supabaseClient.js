import { createClient } from '@supabase/supabase-js';

// Remplacez par vos propres valeurs depuis Supabase > Settings > API
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
