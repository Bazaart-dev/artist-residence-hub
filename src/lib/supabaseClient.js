import { createClient } from '@supabase/supabase-js';

// 1. Configuration plus robuste des variables d'environnement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Supabase credentials missing! Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY'
  );
}

// 2. Configuration recommandée par Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // Essential for session persistence
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce' // Better security
  }
});

// 3. Vérification de la connexion au démarrage (optionnel)
supabase.auth.getSession().then(({ data: { session } }) => {
  console.log('Initial session:', session);
});

// 4. Typage TypeScript amélioré (optionnel mais recommandé)
interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          role: string;
        };
      };
      // Ajoutez vos autres tables ici
    };
  };
}

// Client typé
export const typedSupabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
