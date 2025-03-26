
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, ArrowUp } from 'lucide-react';
import { useSite } from '@/contexts/SiteContext';
import AdminLogin from './admin/AdminLogin';
const Footer = () => {
  const { data } = useSite();
  const { socialLinks } = data.settings;
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Check if user is already logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check localStorage for admin user
    const checkLoginStatus = () => {
      const storedUser = localStorage.getItem('bazaart-admin-user');
      setIsLoggedIn(!!storedUser);
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

  const handleLogin = (user: { email: string; role: string }) => {
    // Store in localStorage happens in App.tsx
    setIsLoggedIn(true);
    window.dispatchEvent(new Event('storage'));
    window.location.href = '/admin';
  };

  return (
    <footer className="bg-bazaart-black text-white pt-16 pb-8 px-6 md:px-12 lg:px-24 relative">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-display font-bold mb-6">À propos</h3>
            <p className="text-gray-400">
              Bazaart est une association dédiée à la promotion de l'art et de la culture sous toutes ses formes.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-display font-bold mb-6">Liens utiles</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-bazaart-pink transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/presentation" className="hover:text-bazaart-pink transition-colors">
                  Présentation
                </Link>
              </li>
              <li>
                <Link to="/projets" className="hover:text-bazaart-pink transition-colors">
                  Projets
                </Link>
              </li>
              <li>
                <Link to="/evenements" className="hover:text-bazaart-pink transition-colors">
                  Événements
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-bazaart-pink transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-display font-bold mb-6">Nos services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-bazaart-pink transition-colors">
                  Expositions d'art
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-bazaart-pink transition-colors">
                  Ateliers créatifs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-bazaart-pink transition-colors">
                  Événements culturels
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-bazaart-pink transition-colors">
                  Soutien aux artistes
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-display font-bold mb-6">Administration</h3>
            <div className="space-y-3">
              {isLoggedIn ? (
                <Link to="/admin" className="inline-block hover:text-bazaart-pink transition-colors">
                  Tableau de bord
                </Link>
              ) : (
                <AdminLogin onLogin={handleLogin} />
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Bazaart. Tous droits réservés.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {socialLinks.facebook && (
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-bazaart-pink transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
            )}
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-bazaart-pink transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            )}
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-bazaart-pink transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
            )}
            {socialLinks.linkedin && (
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-bazaart-pink transition-colors">
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
