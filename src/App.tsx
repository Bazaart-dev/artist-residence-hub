
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SiteProvider } from './contexts/SiteContext';
import Index from './pages/Index';
import Presentation from './pages/Presentation';
import Projets from './pages/Projets';
import Evenements from './pages/Evenements';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import { Toaster } from '@/components/ui/sonner';
import { supabase } from './lib/supabaseClient';
import { toast } from 'sonner';

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérification de l'authentification au montage
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // 1. Vérifie la session active
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // 2. Récupère le profil utilisateur
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
            
          if (error) throw error;
          
          // 3. Stocke l'utilisateur dans le state
          setAuthUser({
            email: session.user.email,
            role: profile?.role || 'viewer'
          });
        }
      } catch (error) {
        console.error('Auth check error:', error);
        // Ne pas se déconnecter automatiquement en cas d'erreur
      } finally {
        // Toujours finir le chargement, même en cas d'erreur
        setLoading(false);
      }
    };

    const timeout = setTimeout(() => {
      // Failsafe: si l'authentification prend trop de temps, on arrête le chargement
      if (loading) {
        setLoading(false);
        console.warn('Authentication check timeout - forcing load completion');
      }
    }, 3000);

    checkAuth();

    // Écoute les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
            
          setAuthUser({
            email: session.user.email,
            role: profile?.role || 'viewer'
          });
        } catch (error) {
          console.error('Profile fetch error:', error);
        }
      } else {
        setAuthUser(null);
      }
      
      setLoading(false);
    });

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        return {
          email: data.user.email,
          role: profile?.role || 'viewer'
        };
      }
      
      return null;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Erreur de connexion: ' + error.message);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setAuthUser(null);
      toast.success('Déconnexion réussie');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Erreur lors de la déconnexion');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-bazaart-green">
        <div className="text-2xl font-semibold">Chargement...</div>
      </div>
    );
  }

  return (
    <SiteProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/presentation" element={<Presentation />} />
          <Route path="/projets" element={<Projets />} />
          <Route path="/evenements" element={<Evenements />} />
          <Route 
            path="/admin/*" 
            element={
              authUser ? (
                <Admin user={authUser} onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </SiteProvider>
  );
}

export default App;
