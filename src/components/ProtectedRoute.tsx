import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

// Version simplifiée pour compatibilité ascendante
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  return children;
};

export default ProtectedRoute;
