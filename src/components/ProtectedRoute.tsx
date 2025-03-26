import React from 'react';
import { Navigate } from 'react-router-dom';
import { type AdminRole } from '@/lib/constants';

interface ProtectedRouteProps {
  user: {
    email: string;
    role: AdminRole;
    id: string;
  } | null;
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, children }) => {
  if (!user) {
    // Redirige vers la page d'accueil si l'utilisateur n'est pas connecté
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
