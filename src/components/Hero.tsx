
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-bazaart-green pt-20">
      <div className="absolute right-0 top-0 -z-10 h-full w-1/2 bg-bazaart-pink rounded-bl-[100px] md:rounded-bl-[200px]"></div>
      
      <div className="container mx-auto px-6 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-0'}`}>
            <div className="inline-block px-4 py-1 rounded-full bg-white/40 backdrop-blur-sm mb-6">
              <span className="font-medium text-bazaart-black text-sm">ART & CULTURE</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-black mb-6 leading-tight">
              BAZAART
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-xl">
              Créer, accompagner et promouvoir les cultures afrodiasporiques.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button className="rounded-full bg-bazaart-black text-white hover:bg-gray-800 px-8 py-6 text-lg flex items-center gap-2">
                Découvrir <ArrowRight size={20} />
              </Button>
              <Button variant="outline" className="rounded-full border-bazaart-black text-bazaart-black hover:bg-bazaart-black hover:text-white px-8 py-6 text-lg">
                Nos projets
              </Button>
            </div>
          </div>
          
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'}`}>
            <div className="relative rounded-3xl overflow-hidden aspect-[3/4] w-full max-w-lg mx-auto">
              <img 
                src="/lovable-uploads/bdcc5bf4-1ea4-4eb0-bf20-90f01174a939.png" 
                alt="Bazaart" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 right-6">
                <span className="inline-block px-4 py-1 rounded-full bg-white/70 backdrop-blur-sm text-bazaart-black font-medium">
                  ART & CULTURE
                </span>
              </div>
            </div>
            
            <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-bazaart-blue animate-spin-slow"></div>
            <div className="absolute -top-10 -right-10 w-16 h-16 rounded-full bg-bazaart-salmon animate-spin-slow animation-delay-2000"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-bazaart-black">
          <ArrowRight size={20} className="rotate-90" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
