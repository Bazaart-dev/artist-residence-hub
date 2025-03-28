
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, ArrowUp, LogOut, UserCircle } from 'lucide-react';
import { useSite } from '@/contexts/SiteContext';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';
import { type AdminRole } from '@/lib/constants';

const Footer = () => {
  const { data } = useSite();
  const { socialLinks } = data.settings;
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState<{ email: string; role: string } | null>(null);

  useEffect(() => {
    const checkLoginStatus = () => {
      const storedUser = localStorage.getItem('bazaart-admin-user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setIsLoggedIn(true);
        setAdminUser(user);
      } else {
        setIsLoggedIn(false);
        setAdminUser(null);
      }
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRedirectToLogin = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    localStorage.removeItem('bazaart-admin-user');
    
    if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
      await supabase.auth.signOut();
    }
    
    setIsLoggedIn(false);
    setAdminUser(null);
    window.dispatchEvent(new Event('storage'));
    
    toast.success("Déconnexion réussie", {
      description: "Vous avez été déconnecté avec succès."
    });
    
    if (window.location.pathname.startsWith('/admin')) {
      navigate('/');
    }
  };

  return (
    <footer className="bg-bazaart-black text-white pt-12 pb-6 px-4 md:px-8 lg:px-16 relative">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="text-xl font-display font-bold mb-6 text-bazaart-pink">À propos</h3>
            <p className="text-gray-300">
              Bazaart est une association dédiée à la promotion de l'art et de la culture sous toutes ses formes.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-display font-bold mb-6 text-bazaart-pink">Liens rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-bazaart-pink transition-colors flex items-center">
                  <span className="mr-2">→</span> Accueil
                </Link>
              </li>
              <li>
                <Link to="/presentation" className="text-gray-300 hover:text-bazaart-pink transition-colors flex items-center">
                  <span className="mr-2">→</span> Présentation
                </Link>
              </li>
              <li>
                <Link to="/projets" className="text-gray-300 hover:text-bazaart-pink transition-colors flex items-center">
                  <span className="mr-2">→</span> Projets
                </Link>
              </li>
              <li>
                <Link to="/evenements" className="text-gray-300 hover:text-bazaart-pink transition-colors flex items-center">
                  <span className="mr-2">→</span> Événements
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-bazaart-pink transition-colors flex items-center">
                  <span className="mr-2">→</span> Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-display font-bold mb-6 text-bazaart-pink">Nos services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-bazaart-pink transition-colors flex items-center">
                  <span className="mr-2">→</span> Expositions d'art
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-bazaart-pink transition-colors flex items-center">
                  <span className="mr-2">→</span> Ateliers créatifs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-bazaart-pink transition-colors flex items-center">
                  <span className="mr-2">→</span> Événements culturels
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-bazaart-pink transition-colors flex items-center">
                  <span className="mr-2">→</span> Soutien aux artistes
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-display font-bold mb-6 text-bazaart-pink">Administration</h3>
            <div className="space-y-3">
              {isLoggedIn && adminUser ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-300">
                    Connecté en tant que: <span className="text-white font-semibold">{adminUser.email}</span>
                    <br />
                    Rôle: <span className="text-white font-semibold capitalize">{adminUser.role}</span>
                  </p>
                  <div className="flex flex-col gap-2">
                    <Link to="/admin">
                      <Button variant="outline" className="w-full justify-start border-bazaart-pink text-bazaart-pink hover:bg-bazaart-pink/10">
                        Tableau de bord
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-red-400 hover:text-red-300 hover:border-red-400 hover:bg-red-900/10"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} className="mr-2" />
                      Se déconnecter
                    </Button>
                  </div>
                </div>
              ) : (
                <Button 
                  onClick={handleRedirectToLogin}
                  variant="outline"
                  className="w-full border-bazaart-pink text-bazaart-pink hover:bg-bazaart-pink/10 flex items-center gap-2"
                >
                  <UserCircle size={16} />
                  Espace administrateur
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Bazaart. Tous droits réservés.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            {socialLinks.facebook && (
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-bazaart-pink transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
            )}
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-bazaart-pink transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            )}
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-bazaart-pink transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-bazaart-pink transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            )}
          </div>
        </div>
      </div>
      
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-bazaart-pink text-bazaart-black rounded-full p-3 shadow-lg transition-all hover:bg-bazaart-salmon"
          aria-label="Retour en haut"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
