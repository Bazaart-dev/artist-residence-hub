import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/components/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <Outlet /> {/* Ceci affiche les sous-routes admin */}
      </div>
    </div>
  );
};

export default AdminLayout;
