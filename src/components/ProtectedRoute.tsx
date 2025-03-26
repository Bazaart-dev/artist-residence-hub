import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  user: {
    email: string;
    id: string;
  } | null;
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, children }) => {
  if (!user) {
    console.log('Redirection vers / - User non connecté');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
