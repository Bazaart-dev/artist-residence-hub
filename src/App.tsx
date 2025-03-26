
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

type AuthUser = {
  email: string;
  role: string;
} | null;

function App() {
  const [authUser, setAuthUser] = useState<AuthUser>(null);

  // Check for user in localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('bazaart-admin-user');
    if (storedUser) {
      try {
        setAuthUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing stored user:', e);
        localStorage.removeItem('bazaart-admin-user');
      }
    }
  }, []);

  // Save user to localStorage on change
  useEffect(() => {
    if (authUser) {
      localStorage.setItem('bazaart-admin-user', JSON.stringify(authUser));
    } else {
      localStorage.removeItem('bazaart-admin-user');
    }
  }, [authUser]);

  const handleLogin = (user: { email: string; role: string }) => {
    setAuthUser(user);
  };

  const handleLogout = () => {
    setAuthUser(null);
  };

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
