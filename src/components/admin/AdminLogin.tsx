// App.jsx
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) await fetchUserProfile(session.user);
      setLoading(false);
    };

    const fetchUserProfile = async (user) => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      setUser({ email: user.email, role: profile?.role });
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) await fetchUserProfile(session.user);
        else setUser(null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <SiteProvider>
      <Router>
        <Routes>
          {/* ... autres routes ... */}
          <Route 
            path="/admin/*" 
            element={
              user ? (
                <Admin user={user} onLogout={() => supabase.auth.signOut()} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
        </Routes>
      </Router>
      <Toaster />
    </SiteProvider>
  );
}
