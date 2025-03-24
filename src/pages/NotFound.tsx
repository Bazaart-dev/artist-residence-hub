
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    document.title = "Page non trouvée - Bazaart";
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="grow flex items-center justify-center bg-bazaart-green py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="inline-block text-bazaart-black font-display">
              <span className="text-9xl font-black">404</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Page non trouvée
          </h1>
          
          <p className="text-xl mb-12 max-w-xl mx-auto">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          
          <Link to="/">
            <Button className="rounded-full bg-bazaart-black text-white hover:bg-gray-800 px-8 py-6 text-lg flex items-center gap-2 mx-auto">
              <ArrowLeft size={20} />
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
