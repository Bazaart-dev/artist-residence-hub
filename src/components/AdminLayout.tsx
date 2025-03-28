import { Outlet, NavLink } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { 
  LayoutDashboard,
  Calendar,
  Image,
  Settings,
  FileText,
  Users,
  Lock,
  Palette
} from 'lucide-react';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar intégrée directement */}
      <div className="w-64 bg-gray-800 text-white p-4 hidden md:block">
        <nav className="space-y-2">
          <NavLink 
            to="/admin" 
            end
            className={({isActive}) => 
              `flex items-center gap-3 p-2 rounded-lg transition-colors ${
                isActive ? 'bg-gray-900 font-medium' : 'hover:bg-gray-700'
              }`
            }
          >
            <LayoutDashboard size={18} />
            Tableau de bord
          </NavLink>

          <NavLink
            to="/admin/projets"
            className={({isActive}) => 
              `flex items-center gap-3 p-2 rounded-lg transition-colors ${
                isActive ? 'bg-gray-900 font-medium' : 'hover:bg-gray-700'
              }`
            }
          >
            <FileText size={18} />
            Projets
          </NavLink>

          <NavLink
            to="/admin/events"
            className={({isActive}) => 
              `flex items-center gap-3 p-2 rounded-lg transition-colors ${
                isActive ? 'bg-gray-900 font-medium' : 'hover:bg-gray-700'
              }`
            }
          >
            <Calendar size={18} />
            Événements
          </NavLink>

          <NavLink
            to="/admin/media"
            className={({isActive}) => 
              `flex items-center gap-3 p-2 rounded-lg transition-colors ${
                isActive ? 'bg-gray-900 font-medium' : 'hover:bg-gray-700'
              }`
            }
          >
            <Image size={18} />
            Médias
          </NavLink>

          <NavLink
            to="/admin/pages"
            className={({isActive}) => 
              `flex items-center gap-3 p-2 rounded-lg transition-colors ${
                isActive ? 'bg-gray-900 font-medium' : 'hover:bg-gray-700'
              }`
            }
          >
            <FileText size={18} />
            Pages
          </NavLink>

          <div className="pt-4 mt-4 border-t border-gray-700">
            <NavLink
              to="/admin/appearance"
              className={({isActive}) => 
                `flex items-center gap-3 p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-gray-900 font-medium' : 'hover:bg-gray-700'
                }`
              }
            >
              <Palette size={18} />
              Apparence
            </NavLink>

            <NavLink
              to="/admin/security"
              className={({isActive}) => 
                `flex items-center gap-3 p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-gray-900 font-medium' : 'hover:bg-gray-700'
                }`
              }
            >
              <Lock size={18} />
              Sécurité
            </NavLink>

            <NavLink
              to="/admin/settings"
              className={({isActive}) => 
                `flex items-center gap-3 p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-gray-900 font-medium' : 'hover:bg-gray-700'
                }`
              }
            >
              <Settings size={18} />
              Paramètres
            </NavLink>
          </div>
        </nav>
      </div>

      {/* Zone de contenu principal */}
      <main className="flex-1 overflow-y-auto p-6 bg-white">
        {/* Le contenu des pages s'affichera ici */}
        <Outlet />
        
        {/* Toaster pour les notifications */}
        <Toaster position="top-right" />
      </main>
    </div>
  );
};

export default AdminLayout;
