import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const session = supabase.auth.session();

  if (!session) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}
