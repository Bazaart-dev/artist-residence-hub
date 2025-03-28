import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  condition: boolean;
  fallbackPath: string;
  loading?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  condition, 
  fallbackPath = "/", 
  loading = false 
}: ProtectedRouteProps) => {
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-bazaart-pink"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (!condition) {
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
