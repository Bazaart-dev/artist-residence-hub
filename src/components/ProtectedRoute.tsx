import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  user: any;
  loading: boolean;
}

const ProtectedRoute = ({ children, user, loading }: ProtectedRouteProps) => {
  if (loading) {
    return null; // Ou votre spinner ici si vous préférez
  }

  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
