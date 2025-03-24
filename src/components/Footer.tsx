
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, YouTube, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-bazaart-black text-white pt-16 pb-8 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h2 className="text-3xl font-display font-bold mb-6">BAZAART</h2>
            <p className="text-gray-300 mb-6">
              Créer, accompagner et promouvoir les cultures afrodiasporiques.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors duration-300"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors duration-300"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors duration-300"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors duration-300"
              >
                <YouTube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Navigation</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/presentation" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Présentation
                </Link>
              </li>
              <li>
                <Link to="/projets" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Projets
                </Link>
              </li>
              <li>
                <Link to="/evenements" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Événements
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Nos Projets</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/bazaart-club" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Bazaart Club
                </Link>
              </li>
              <li>
                <Link to="/bazaart-home" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Bazaart Home
                </Link>
              </li>
              <li>
                <Link to="/bazaart-design" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Bazaart Design
                </Link>
              </li>
              <li>
                <Link to="/bazaart-food" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Bazaart Food
                </Link>
              </li>
              <li>
                <Link to="/bazaart-lab" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Bazaart Lab
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="text-gray-300">
                123 Avenue des Arts, 75001 Paris, France
              </li>
              <li>
                <a href="mailto:contact@bazaart.org" className="text-gray-300 hover:text-white transition-colors duration-300">
                  contact@bazaart.org
                </a>
              </li>
              <li>
                <a href="tel:+33123456789" className="text-gray-300 hover:text-white transition-colors duration-300">
                  +33 (0)1 23 45 67 89
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Bazaart. Tous droits réservés.
          </p>
          
          <div className="flex items-center space-x-6">
            <Link to="/mentions-legales" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Mentions légales
            </Link>
            <Link to="/politique-de-confidentialite" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              Politique de confidentialité
            </Link>
            <button 
              onClick={scrollToTop}
              className="bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors duration-300 flex items-center justify-center"
              aria-label="Retour en haut"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
