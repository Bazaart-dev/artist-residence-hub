
import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

type ProtectedRouteProps = {
  user: { email: string; role: string } | null;
  loading: boolean;
  children: React.ReactNode;
};

const ProtectedRoute = ({ user, loading, children }: ProtectedRouteProps) => {
  React.useEffect(() => {
    if (!loading && !user) {
      toast.error("Accès non autorisé", {
        description: "Veuillez vous connecter pour accéder à cette page."
      });
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-2xl font-semibold">Chargement...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
