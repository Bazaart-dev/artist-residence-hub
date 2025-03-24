
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSite } from '@/contexts/SiteContext';
import { toast } from 'sonner';

const Footer = () => {
  const { data } = useSite();
  const { phone, email, address, socialLinks } = data.settings;

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Inscription à la newsletter réussie !");
    // Réinitialiser le formulaire
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-bazaart-black text-white pt-20 pb-6">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Colonne 1: Logo & Description */}
          <div>
            <div className="font-display font-bold text-3xl text-bazaart-pink mb-4">BAZAART</div>
            <p className="text-gray-300 mb-6">
              Association culturelle dédiée à la promotion et au développement des arts contemporains afro-diasporiques.
            </p>
            <div className="flex space-x-4">
              {socialLinks.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-bazaart-pink transition-colors">
                  <Facebook size={20} />
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-bazaart-pink transition-colors">
                  <Instagram size={20} />
                </a>
              )}
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-bazaart-pink transition-colors">
                  <Twitter size={20} />
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-bazaart-pink transition-colors">
                  <Linkedin size={20} />
                </a>
              )}
            </div>
          </div>
          
          {/* Colonne 2: Liens Rapides */}
          <div>
            <h3 className="text-lg font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" onClick={scrollToTop} className="text-gray-300 hover:text-bazaart-pink transition-colors">Accueil</Link>
              </li>
              <li>
                <Link to="/presentation" onClick={scrollToTop} className="text-gray-300 hover:text-bazaart-pink transition-colors">Présentation</Link>
              </li>
              <li>
                <Link to="/projets" onClick={scrollToTop} className="text-gray-300 hover:text-bazaart-pink transition-colors">Projets</Link>
              </li>
              <li>
                <Link to="/evenements" onClick={scrollToTop} className="text-gray-300 hover:text-bazaart-pink transition-colors">Événements</Link>
              </li>
              <li>
                <Link to="/admin" onClick={scrollToTop} className="text-gray-300 hover:text-bazaart-pink transition-colors">Administration</Link>
              </li>
            </ul>
          </div>
          
          {/* Colonne 3: Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <address className="not-italic">
              <div className="flex items-center mb-2">
                <MapPin size={16} className="mr-2 text-bazaart-pink" />
                <span className="text-gray-300">{address}</span>
              </div>
              <div className="flex items-center mb-2">
                <Phone size={16} className="mr-2 text-bazaart-pink" />
                <span className="text-gray-300">{phone}</span>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="mr-2 text-bazaart-pink" />
                <a href={`mailto:${email}`} className="text-gray-300 hover:text-bazaart-pink transition-colors">{email}</a>
              </div>
            </address>
          </div>
          
          {/* Colonne 4: Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">Restez informé de nos actualités et événements.</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input 
                type="email" 
                placeholder="Votre email" 
                required 
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button type="submit" className="w-full bg-bazaart-pink hover:bg-bazaart-salmon text-bazaart-black">
                S'inscrire
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Bazaart. Tous droits réservés.
          </div>
          <div className="flex space-x-4 text-gray-400 text-sm">
            <Link to="/mentions-legales" className="hover:text-bazaart-pink transition-colors">Mentions légales</Link>
            <Link to="/politique-de-confidentialite" className="hover:text-bazaart-pink transition-colors">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
