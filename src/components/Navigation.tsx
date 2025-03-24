
import { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <h1 className="text-3xl font-display font-black tracking-tight">BAZAART</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link to="/" className="nav-item">Accueil</Link>
            <Link to="/presentation" className="nav-item">Présentation</Link>
            <Link to="/projets" className="nav-item">Projets</Link>
            <Link to="/evenements" className="nav-item">Événements</Link>
            <Link to="/contact" className="nav-item">Contact</Link>
          </nav>

          <div className="hidden md:block">
            <Button className="rounded-full bg-bazaart-pink text-bazaart-black hover:bg-bazaart-salmon flex items-center gap-2">
              Nous rejoindre <ArrowRight size={16} />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden fixed inset-0 bg-bazaart-green pt-20 px-6 z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col space-y-6">
          <Link to="/" className="text-2xl font-medium" onClick={toggleMenu}>Accueil</Link>
          <Link to="/presentation" className="text-2xl font-medium" onClick={toggleMenu}>Présentation</Link>
          <Link to="/projets" className="text-2xl font-medium" onClick={toggleMenu}>Projets</Link>
          <Link to="/evenements" className="text-2xl font-medium" onClick={toggleMenu}>Événements</Link>
          <Link to="/contact" className="text-2xl font-medium" onClick={toggleMenu}>Contact</Link>
          
          <Button className="mt-8 rounded-full bg-bazaart-pink text-bazaart-black hover:bg-bazaart-salmon flex items-center justify-center gap-2">
            Nous rejoindre <ArrowRight size={16} />
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
