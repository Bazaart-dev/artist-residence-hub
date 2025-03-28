
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';

const AdminAuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        if (session?.user) {
          // Simplified profile check to speed up loading
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          setUser({
            email: session.user.email,
            role: profile?.role,
            id: session.user.id
          });
        }
      } catch (error) {
        console.error("Erreur d'authentification:", error);
        toast.error('Erreur de vérification');
      } finally {
        // Set loading to false more quickly
        setLoading(false);
      }
    };

    // Immediate check on mount
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-bazaart-pink"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login page
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AdminAuthWrapper;
