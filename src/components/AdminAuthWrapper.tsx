import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';

interface AuthUser {
  email: string;
  role: string;
  id: string;
}

const AdminAuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        if (session?.user) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profileError) throw profileError;

          setUser({
            email: session.user.email || '',
            role: profile?.role || 'user',
            id: session.user.id
          });
        }
      } catch (error) {
        console.error('Auth check error:', error);
        toast.error('Erreur de vérification');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(checkAuth);

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bazaart-pink"></div>
          <p>Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    toast.error('Accès admin non autorisé');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminAuthWrapper;
