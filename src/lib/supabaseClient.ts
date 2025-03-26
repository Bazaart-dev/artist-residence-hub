import { createClient } from '@supabase/supabase-js';

// Vérification plus sécurisée des variables d'environnement
const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY');

// Configuration de base sans typage initial
const baseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false, // Désactivé pour éviter des bugs avec React Router
    flowType: 'pkce'
  }
});

// Vérification immédiate de la connexion
baseClient.auth.getSession()
  .then(({ data: { session } }) => console.debug('Session initiale:', session))
  .catch(console.error);

// Typage (à adapter selon votre base de données)
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
    };
  };
}

// Exportez les clients
export const supabase = baseClient as SupabaseClient<Database>;
export const typedSupabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: baseClient.auth.options
});
