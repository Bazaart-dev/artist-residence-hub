import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ALL_ADMIN_ROLES, type AdminRole } from '@/lib/constants';

interface ProtectedRouteProps {
  user: { role: AdminRole } | null;
  children: React.ReactNode;
}

const ProtectedRoute = ({ user, children }: ProtectedRouteProps) => {
  if (!user || !ALL_ADMIN_ROLES.includes(user.role)) {
    toast.error('Accès non autorisé');
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
