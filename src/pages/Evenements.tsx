
import { useEffect, useRef, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { ArrowRight, Calendar, MapPin, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Evenements = () => {
  useEffect(() => {
    document.title = "Bazaart - Nos Événements";
  }, []);

  const eventsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (eventsRef.current) {
      observer.observe(eventsRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Données des événements à venir
  const upcomingEvents = [
    {
      id: 1,
      title: "Festival Afro-Urban",
      date: "15 Juin 2024",
      time: "14:00 - 22:00",
      location: "Bazaart Club, Paris",
      image: "/lovable-uploads/bdcc5bf4-1ea4-4eb0-bf20-90f01174a939.png",
      description: "Une journée complète dédiée aux expressions urbaines afrodiasporiques: danse, musique, arts visuels et gastronomie.",
      category: "Festival"
    },
    {
      id: 2,
      title: "Exposition: Diaspora Visuelle",
      date: "22-30 Juillet 2024",
      time: "10:00 - 19:00",
      location: "Galerie Bazaart, Paris",
      image: "/lovable-uploads/bdcc5bf4-1ea4-4eb0-bf20-90f01174a939.png",
      description: "Une exposition collective réunissant 12 artistes visuels explorant les thèmes de l'identité et de la mémoire collective.",
      category: "Exposition"
    },
    {
      id: 3,
      title: "Atelier Création Textile",
      date: "12 Août 2024",
      time: "15:00 - 18:00",
      location: "Bazaart Home, Paris",
      image: "/lovable-uploads/bdcc5bf4-1ea4-4eb0-bf20-90f01174a939.png",
      description: "Un atelier pratique explorant les techniques traditionnelles de teinture et d'impression textile d'Afrique de l'Ouest.",
      category: "Atelier"
    },
    {
      id: 4,
      title: "Conférence: Art & Engagement",
      date: "5 Septembre 2024",
      time: "18:30 - 20:30",
      location: "Auditorium Central, Paris",
      image: "/lovable-uploads/bdcc5bf4-1ea4-4eb0-bf20-90f01174a939.png",
      description: "Une série de discussions sur le rôle de l'art comme vecteur de changement social et d'activisme culturel.",
      category: "Conférence"
    }
  ];

  // Données des événements passés
  const pastEvents = [
    {
      id: 5,
      title: "Workshop Danse Afro-Contemporaine",
      date: "25 Mars 2024",
      image: "/lovable-uploads/bdcc5bf4-1ea4-4eb0-bf20-90f01174a939.png",
      category: "Atelier"
    },
    {
      id: 6,
      title: "Projection: Cinémas d'Afrique",
      date: "10 Février 2024",
      image: "/lovable-uploads/bdcc5bf4-1ea4-4eb0-bf20-90f01174a939.png",
      category: "Projection"
    },
    {
      id: 7,
      title: "Concert: Nouvelle Scène Afro",
      date: "20 Janvier 2024",
      image: "/lovable-uploads/bdcc5bf4-1ea4-4eb0-bf20-90f01174a939.png",
      category: "Concert"
    }
  ];

  // Animation des bulles flottantes
  const floatingBubbles = Array.from({ length: 15 }).map((_, index) => ({
    id: index,
    size: Math.floor(Math.random() * 60) + 20, // 20-80px
    left: `${Math.floor(Math.random() * 100)}%`,
    top: `${Math.floor(Math.random() * 100)}%`,
    animationDuration: `${Math.floor(Math.random() * 30) + 10}s`, // 10-40s
    background: [
      'bg-bazaart-pink',
      'bg-bazaart-blue',
      'bg-bazaart-green',
      'bg-bazaart-salmon',
      'bg-bazaart-purple'
    ][Math.floor(Math.random() * 5)]
  }));

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-bazaart-blue pt-20 overflow-hidden">
        <div className="absolute right-0 top-0 -z-10 h-full w-1/2 bg-bazaart-green rounded-bl-[100px] md:rounded-bl-[200px]"></div>
        
        {/* Animated floating bubbles */}
        {floatingBubbles.map(bubble => (
          <div
            key={bubble.id}
            className={`absolute rounded-full opacity-40 ${bubble.background}`}
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: bubble.left,
              top: bubble.top,
              animation: `float ${bubble.animationDuration} ease-in-out infinite alternate`
            }}
          />
        ))}
        
        <div className="container mx-auto px-6 py-12 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1 rounded-full bg-white/40 backdrop-blur-sm mb-6">
              <span className="font-medium text-bazaart-black text-sm">ÉVÉNEMENTS</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Rencontres culturelles
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-xl">
              Découvrez nos événements passés et à venir dédiés aux expressions culturelles afrodiasporiques.
            </p>
            
            <Button className="rounded-full bg-bazaart-black text-white hover:bg-gray-800 px-8 py-6 text-lg flex items-center gap-2">
              Voir le programme <ArrowRight size={20} />
            </Button>
          </div>
        </div>
        
        {/* Animated circles */}
        <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-bazaart-pink animate-spin-slow"></div>
        <div className="absolute top-20 right-40 w-16 h-16 rounded-full bg-bazaart-salmon animate-bounce"></div>
      </section>
      
      {/* Events Carousel */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
        <div className="absolute top-40 -left-20 w-40 h-40 rounded-full bg-bazaart-green/30 blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-bazaart-blue/20 blur-xl"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4 text-center">Événements à venir</h2>
            <p className="text-xl text-gray-700 max-w-2xl text-center">
              Ne manquez pas nos prochains rendez-vous culturels, artistiques et gastronomiques.
            </p>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {upcomingEvents.map((event) => (
                <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3 p-2">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="inline-block px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm text-bazaart-black text-xs font-medium">
                          {event.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="font-display text-xl font-bold mb-3">{event.title}</h3>
                      
                      <div className="space-y-2 mb-4 text-gray-700">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span className="text-sm">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span className="text-sm">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <span className="text-sm">{event.location}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-6 flex-grow">
                        {event.description}
                      </p>
                      
                      <Button 
                        variant="outline" 
                        className="rounded-full border-bazaart-black text-bazaart-black hover:bg-bazaart-black hover:text-white mt-auto w-full"
                      >
                        S'inscrire <ArrowRight size={16} />
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="relative inset-auto mr-2" />
              <CarouselNext className="relative inset-auto ml-2" />
            </div>
          </Carousel>
        </div>
      </section>
      
      {/* Past Events Grid */}
      <section ref={eventsRef} className="py-24 px-6 md:px-12 lg:px-24 bg-bazaart-green/20">
        <div className="container mx-auto">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4 text-center">Événements passés</h2>
            <p className="text-xl text-gray-700 max-w-2xl text-center">
              Revivez les moments forts de nos précédents événements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <div 
                key={event.id}
                className={`transform transition-all duration-700 delay-${index * 100} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-bazaart-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button 
                        variant="outline" 
                        className="rounded-full border-white text-white hover:bg-white hover:text-bazaart-black"
                      >
                        Voir l'album
                      </Button>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm text-bazaart-black text-xs font-medium">
                        {event.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold mb-2">{event.title}</h3>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar size={16} />
                      <span className="text-sm">{event.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section with colorful design */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-bazaart-blue via-bazaart-purple to-bazaart-pink opacity-80"></div>
        
        <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-yellow-300 opacity-30"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-blue-300 opacity-40"></div>
        <div className="absolute top-40 right-40 w-20 h-20 rounded-full bg-pink-300 opacity-50 animate-bounce"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto p-10 bg-white/20 backdrop-blur-md rounded-3xl">
            <div className="text-center">
              <h2 className="text-4xl font-display font-bold mb-6 text-white">Restez informé·e·s !</h2>
              <p className="text-xl mb-8 text-white/90">
                Inscrivez-vous à notre newsletter pour recevoir les actualités et les invitations à nos prochains événements.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="Votre adresse email" 
                  className="flex-grow rounded-full px-6 py-3 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-bazaart-black"
                />
                <Button className="rounded-full bg-bazaart-black text-white hover:bg-gray-800 whitespace-nowrap">
                  S'inscrire <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Contact />
      <Footer />
      
      {/* Adding floating animation keyframes */}
      <style jsx="true">{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
          100% {
            transform: translateY(-40px) rotate(-10deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Evenements;
