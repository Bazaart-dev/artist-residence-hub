
import { useState } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Home, 
  LogOut, 
  Menu,
  Calendar,
  Image,
  Settings,
  FileText,
  Palette,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/useAuth';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const Admin = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Définition des liens de navigation du tableau de bord
  const navLinks = [
    { 
      href: "/admin", 
      label: "Tableau de bord", 
      icon: <LayoutDashboard size={18} />,
      exact: true
    },
    { 
      href: "/admin/projects", 
      label: "Projets", 
      icon: <FileText size={18} /> 
    },
    { 
      href: "/admin/events", 
      label: "Événements", 
      icon: <Calendar size={18} /> 
    },
    { 
      href: "/admin/media", 
      label: "Médias", 
      icon: <Image size={18} /> 
    },
    { 
      href: "/admin/pages", 
      label: "Pages", 
      icon: <FileText size={18} /> 
    }
  ];

  const settingsLinks = [
    { 
      href: "/admin/appearance", 
      label: "Apparence", 
      icon: <Palette size={18} /> 
    },
    { 
      href: "/admin/security", 
      label: "Sécurité", 
      icon: <Lock size={18} /> 
    },
    { 
      href: "/admin/settings", 
      label: "Paramètres", 
      icon: <Settings size={18} /> 
    }
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Sidebar pour les écrans plus grands
  const DesktopSidebar = () => (
    <aside className={cn(
      "bg-gray-900 text-white h-screen transition-all duration-300 overflow-y-auto",
      sidebarOpen ? "w-64" : "w-20"
    )}>
      <div className="p-4 flex items-center justify-between">
        <h2 className={cn("font-bold text-xl", !sidebarOpen && "hidden")}>Admin</h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white hover:bg-gray-800"
        >
          <Menu size={20} />
        </Button>
      </div>

      <nav className="mt-6">
        <ul className="space-y-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={cn(
                  "flex items-center px-4 py-3 hover:bg-gray-800 transition-colors",
                  isActive(link.href, link.exact) && "bg-gray-800 border-l-4 border-bazaart-pink pl-3"
                )}
              >
                {link.icon}
                {sidebarOpen && <span className="ml-3">{link.label}</span>}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 pt-4 border-t border-gray-700">
          <p className={cn("px-4 text-xs text-gray-400 mb-2", !sidebarOpen && "hidden")}>
            Paramètres
          </p>
          <ul className="space-y-1">
            {settingsLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={cn(
                    "flex items-center px-4 py-3 hover:bg-gray-800 transition-colors",
                    isActive(link.href) && "bg-gray-800 border-l-4 border-bazaart-pink pl-3"
                  )}
                >
                  {link.icon}
                  {sidebarOpen && <span className="ml-3">{link.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );

  // Sidebar mobile avec Sheet
  const MobileSidebar = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden ml-2"
        >
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-gray-900 text-white">
        <div className="p-4">
          <h2 className="font-bold text-xl">Admin</h2>
        </div>
        <nav className="mt-6">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={cn(
                    "flex items-center px-4 py-3 hover:bg-gray-800 transition-colors",
                    isActive(link.href, link.exact) && "bg-gray-800 border-l-4 border-bazaart-pink pl-3"
                  )}
                >
                  {link.icon}
                  <span className="ml-3">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 pt-4 border-t border-gray-700">
            <p className="px-4 text-xs text-gray-400 mb-2">
              Paramètres
            </p>
            <ul className="space-y-1">
              {settingsLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={cn(
                      "flex items-center px-4 py-3 hover:bg-gray-800 transition-colors",
                      isActive(link.href) && "bg-gray-800 border-l-4 border-bazaart-pink pl-3"
                    )}
                  >
                    {link.icon}
                    <span className="ml-3">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar pour desktop */}
      <div className="hidden md:block">
        <DesktopSidebar />
      </div>
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b py-4 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MobileSidebar />
              <LayoutDashboard className="text-bazaart-pink" />
              <h1 className="text-xl font-bold">Admin Panel</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-1 hover:text-bazaart-pink">
                <Home size={16} />
                <span>Retour au site</span>
              </Link>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut size={16} className="mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </header>
        
        <div className={cn(
          "flex-grow p-6",
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        )}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
