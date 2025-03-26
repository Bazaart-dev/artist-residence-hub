import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const [authVerified, setAuthVerified] = React.useState(false);

  React.useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (!session || error) {
        console.log('Redirection vers / - Session:', session, 'Error:', error);
        setAuthVerified(false);
      } else {
        setAuthVerified(true);
      }
    };

    checkAuth();
  }, [location]);

  if (!authVerified) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
