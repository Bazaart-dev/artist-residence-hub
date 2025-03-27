import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  user: any; // Ajoutez cette prop
  loading: boolean; // Ajoutez cette prop
}

const ProtectedRoute = ({ children, user, loading }: ProtectedRouteProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bazaart-pink"></div>
          <p>Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
