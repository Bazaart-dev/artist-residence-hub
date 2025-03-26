import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SiteProvider } from './contexts/SiteContext';
import { Toaster } from '@/components/ui/sonner';
import { supabase } from './lib/supabaseClient';
import { toast } from 'sonner';
import ProtectedRoute from './components/ProtectedRoute';
import Index from './pages/Index';
import Admin from './pages/Admin';
import { ADMIN_ROLES, ALL_ADMIN_ROLES, type AdminRole } from '@/lib/constants';

function App() {
  const [authUser, setAuthUser] = useState<{
    email: string;
    role: AdminRole;
    id: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

      const authTimeout = setTimeout(() => {
    if (loading) {
      console.warn("Auth check taking too long, forcing load");
      setLoading(false);
    }
  }, 1000); // 1 secondes timeout
    
    const checkAuth = async () => {
      console.log('Session:', session);
console.log('Profile:', profile);
console.log('Auth User:', authUser);
      
        setLoading(true); // Réinitialise le chargement à true au début
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

          if (!ALL_ADMIN_ROLES.includes(profile?.role as AdminRole)) {
            throw new Error('Rôle non autorisé');
          }

          setAuthUser({
            email: session.user.email || '',
            role: profile?.role as AdminRole,
            id: session.user.id
          });
        } else {
          setAuthUser(null);
        }
      } catch (error) {
        console.error('Auth error:', error);
        setAuthUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (['SIGNED_IN', 'SIGNED_OUT', 'INITIAL_SESSION'].includes(event)) {
        checkAuth();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  //SECTION LOADING
  if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bazaart-pink"></div>
        <p>Chargement de l'application...</p>
      </div>
    </div>
  );
}

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });

      if (error) throw error;

      if (!data.user) throw new Error("Aucun utilisateur retourné");

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (!profile || !ALL_ADMIN_ROLES.includes(profile.role as AdminRole)) {
        await supabase.auth.signOut();
        throw new Error("Rôle non autorisé");
      }

      return {
        email: data.user.email || email,
        role: profile.role as AdminRole,
        id: data.user.id
      };
    } catch (error) {
      toast.error('Erreur de connexion', {
        description: error instanceof Error ? error.message : 'Erreur inconnue'
      });
      throw error;
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthUser(null);
    toast.success('Déconnexion réussie');
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  }

  return (
    <SiteProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          
 <Route
  path="/admin/*"
  element={
    <ProtectedRoute user={authUser}>
      <Admin user={authUser!} onLogout={handleLogout} onLogin={handleLogin} />
    </ProtectedRoute>
  }
/>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </SiteProvider>
  );
}

export default App;
