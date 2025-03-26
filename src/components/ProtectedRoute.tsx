
import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AdminRole } from '@/lib/constants';


type ProtectedRouteProps = {
  user: { role: AdminRole } | null;
  allowedRoles: AdminRole[];
  children: React.ReactNode;
};

const ProtectedRoute = ({ user, allowedRoles, children }: ProtectedRouteProps) => {
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default ProtectedRoute;
