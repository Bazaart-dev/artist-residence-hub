
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
const [authUser, setAuthUser] = useState(null); 
const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        setAuthUser({
          email: session.user.email,
          role: profile?.role,
          id: session.user.id
        });
      }
      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') checkAuth();
      if (event === 'SIGNED_OUT') setAuthUser(null);
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

      if (!profile) {
        await supabase.auth.signOut();
        throw new Error("Profil utilisateur non trouvé");
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

 return (
    <SiteProvider>
      <Router>
        <Routes>
         <Route
  path="/admin/*"
  element={
    <ProtectedRoute>
      <Admin user={authUser} onLogout={handleLogout} onLogin={handleLogin} />
    </ProtectedRoute>
  }
/>
        </Routes>
        <Toaster />
      </Router>
    </SiteProvider>
  );
}

export default App;
