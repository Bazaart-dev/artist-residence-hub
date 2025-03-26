
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
const [loading, setLoading] = useState(true);

  useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
      setLoading(false);
    });
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

  r return (
    <SiteProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <Admin />
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
