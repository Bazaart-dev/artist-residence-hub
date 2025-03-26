
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Layout, 
  LayoutDashboard, 
  Home, 
  Users, 
  FileText, 
  Image, 
  Calendar, 
  Settings, 
  ChevronRight, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import AdminHome from '@/components/admin/AdminHome';
import AdminProjects from '@/components/admin/AdminProjects';
import AdminEvents from '@/components/admin/AdminEvents';
import AdminPages from '@/components/admin/AdminPages';
import AdminMedia from '@/components/admin/AdminMedia';
import AdminSettings from '@/components/admin/AdminSettings';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import { useSite } from '@/contexts/SiteContext';
import { toast } from 'sonner';
import AdminLogin from '@/components/admin/AdminLogin';

type AdminProps = {
  user: {
    email: string;
    role: string;
  };
  onLogout: () => void;
  onLogin: (email: string, password: string) => Promise<{ email: string; role: string } | null>; // Ajoutez cette ligne
};


const Admin = ({ user, onLogout }: AdminProps) => {
  const { data } = useSite();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Bazaart - Administration";
  }, []);

  const handleLogout = () => {
    toast.success("Déconnexion réussie");
    onLogout();
    navigate('/');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <AdminHome />;
      case 'projects':
        return <AdminProjects />;
      case 'events':
        return <AdminEvents />;
      case 'pages':
        return <AdminPages />;
      case 'media':
        return <AdminMedia />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminHome />;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const sidebarVariants = {
    hidden: { x: -300 },
    visible: { 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        delay: 0.2,
        duration: 0.5
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Display first character of email for avatar
  const getInitial = () => {
    return user?.email ? user.email.charAt(0).toUpperCase() : 'A';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b py-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-full hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2">
              <LayoutDashboard className="text-bazaart-pink" />
              <h1 className="text-xl font-display font-bold">BAZAART Admin</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" onClick={scrollToTop} className="text-sm flex items-center gap-1 hover:text-bazaart-pink transition-colors">
              <Home size={16} />
              <span className="hidden sm:inline">Retour au site</span>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-bazaart-salmon flex items-center justify-center text-white font-medium">
                {getInitial()}
              </div>
              <div className="hidden sm:block">
                <p className="font-medium">{user?.email || 'Admin'}</p>
                <p className="text-xs text-gray-500">{user?.role || 'admin'}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-grow">
        {/* Sidebar for mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.aside
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={sidebarVariants}
              className="fixed inset-0 z-40 w-64 bg-white border-r pt-16 shadow-lg lg:hidden"
            >
              <nav className="p-4 space-y-1">
                <button 
                  onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'home' ? 'bg-bazaart-pink/10 text-bazaart-pink' : 'hover:bg-gray-100'}`}
                >
                  <LayoutDashboard size={18} />
                  <span>Tableau de bord</span>
                  {activeTab === 'home' && <ChevronRight size={16} className="ml-auto" />}
                </button>
                <button 
                  onClick={() => { setActiveTab('projects'); setIsMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'projects' ? 'bg-bazaart-pink/10 text-bazaart-pink' : 'hover:bg-gray-100'}`}
                >
                  <FileText size={18} />
                  <span>Projets</span>
                  {activeTab === 'projects' && <ChevronRight size={16} className="ml-auto" />}
                </button>
                <button 
                  onClick={() => { setActiveTab('events'); setIsMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'events' ? 'bg-bazaart-pink/10 text-bazaart-pink' : 'hover:bg-gray-100'}`}
                >
                  <Calendar size={18} />
                  <span>Événements</span>
                  {activeTab === 'events' && <ChevronRight size={16} className="ml-auto" />}
                </button>
                <button 
                  onClick={() => { setActiveTab('pages'); setIsMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'pages' ? 'bg-bazaart-pink/10 text-bazaart-pink' : 'hover:bg-gray-100'}`}
                >
                  <Layout size={18} />
                  <span>Pages</span>
                  {activeTab === 'pages' && <ChevronRight size={16} className="ml-auto" />}
                </button>
                <button 
                  onClick={() => { setActiveTab('media'); setIsMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'media' ? 'bg-bazaart-pink/10 text-bazaart-pink' : 'hover:bg-gray-100'}`}
                >
                  <Image size={18} />
                  <span>Médias</span>
                  {activeTab === 'media' && <ChevronRight size={16} className="ml-auto" />}
                </button>
                <button 
                  onClick={() => { setActiveTab('settings'); setIsMobileMenuOpen(false); }} 
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'settings' ? 'bg-bazaart-pink/10 text-bazaart-pink' : 'hover:bg-gray-100'}`}
                >
                  <Settings size={18} />
                  <span>Paramètres</span>
                  {activeTab === 'settings' && <ChevronRight size={16} className="ml-auto" />}
                </button>
                
                <Separator className="my-4" />
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Déconnexion</span>
                </button>
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Sidebar for desktop */}
        <aside className="hidden lg:block w-64 border-r bg-white">
          <nav className="p-4 space-y-1">
            <button 
              onClick={() => setActiveTab('home')} 
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'home' ? 'bg-bazaart-pink/10 text-bazaart-pink' : 'hover:bg-gray-100'}`}
            >
              <LayoutDashboard size={18} />
              <span>Tableau de bord</span>
              {activeTab === 'home' && <ChevronRight size={16} className="ml-auto" />}
            </button>
            <button 
              onClick={() => setActiveTab('projects')} 
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'projects' ? 'bg-bazaart-pink/10 text-bazaart-pink' : 'hover:bg-gray-100'}`}
            >
              <FileText size={18} />
              <span>Projets</span>
              {activeTab === 'projects' && <ChevronRight size={16} className="ml-auto" />}
            </button>
            <button 
              onClick={() => setActiveTab('events')} 
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'events' ? 'bg-bazaart-pink/10 text-bazaart-pink' : 'hover:bg-gray-100'}`}
            >
              <Calendar size={18} />
              <span>Événements</span>
              {activeTab === 'events' && <ChevronRight size={16} className="ml-auto" />}
            </button>
            <button 
              onClick={() => setActiveTab('pages')} 
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'pages' ? 'bg-bazaart-pink/10 text-bazaart-pink' : 'hover:bg-gray-100'}`}
            >
              <Layout size={18} />
              <span>Pages</span>
              {activeTab === 'pages' && <ChevronRight size={16} className="ml-auto" />}
            </button>
            <button 
              onClick={() => setActiveTab('media')} 
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'media' ? 'bg-bazaart-pink/10 text-bazaart-pink' : 'hover:bg-gray-100'}`}
            >
              <Image size={18} />
              <span>Médias</span>
              {activeTab === 'media' && <ChevronRight size={16} className="ml-auto" />}
            </button>
            <button 
              onClick={() => setActiveTab('settings')} 
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'settings' ? 'bg-bazaart-pink/10 text-bazaart-pink' : 'hover:bg-gray-100'}`}
            >
              <Settings size={18} />
              <span>Paramètres</span>
              {activeTab === 'settings' && <ChevronRight size={16} className="ml-auto" />}
            </button>
            
            <Separator className="my-4" />
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut size={18} />
              <span>Déconnexion</span>
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-grow p-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            key={activeTab}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
