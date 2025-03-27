import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext'; // Vous devriez créer ce contexte

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth(); // Récupérez l'état d'authentification depuis un contexte
  
  if (loading) {
    return <div>Chargement...</div>;
  }
  
  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
