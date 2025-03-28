import { supabase } from './supabaseClient';
import { toast } from 'sonner';

export const useAuth = () => {
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Déconnexion réussie');
    } catch (error) {
      toast.error('Erreur lors de la déconnexion');
    }
  };

  return { logout };
};
