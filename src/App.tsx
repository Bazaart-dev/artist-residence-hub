
import React, { useState, useEffect } from 'react';
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
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [authUser, setAuthUser] = useState<{ email: string; role: string; id: string; } | null>(null);
  const [loading, setLoading] = useState(true);

  // Vérification de l'authentification au montage
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
            
          setAuthUser({
            email: session.user.email || '',
            role: profile?.role || 'viewer'
          });
        } else {
          setAuthUser(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setAuthUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Écoute les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        checkAuth();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        const user = {
          email: data.user.email || email,
          role: profile?.role || 'viewer'
        };
        
        // Met à jour l'état authUser directement après une connexion réussie
        setAuthUser(user);
        
        return user;
      }
      return null;
    } catch (error) {
      toast.error('Erreur de connexion: ' + (error instanceof Error ? error.message : 'Erreur inconnue'));
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
              <ProtectedRoute user={authUser} loading={loading}>
                <Admin 
                  user={authUser!} 
                  onLogout={handleLogout} 
                  onLogin={handleLogin} 
                />
              </ProtectedRoute>
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
