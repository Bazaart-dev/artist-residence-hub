import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setVerified(!!session);
    });
  }, []);

  if (!verified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; // Export par défaut
