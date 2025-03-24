import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ArrowRight, Ticket } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import EventRegistrationForm from '@/components/EventRegistrationForm';
import TicketPurchaseForm from '@/components/TicketPurchaseForm';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  time: string;
  capacity: string;
  description: string;
  image: string;
  category: 'atelier' | 'exposition' | 'performance' | 'autre';
}

const eventData: Event[] = [
  {
    id: 1,
    title: "Exposition: Arts Numériques Contemporains",
    date: "12 juin 2023",
    location: "Galerie Bazaart, Paris",
    time: "18h00 - 22h00",
    capacity: "100 personnes",
    description: "Une exposition immersive explorant les frontières entre art traditionnel et numérique avec des installations interactives.",
    image: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "exposition"
  },
  {
    id: 2,
    title: "Atelier: Initiation à la Sérigraphie",
    date: "20 juin 2023",
    location: "Studio Bazaart, Lyon",
    time: "14h00 - 17h00",
    capacity: "15 personnes",
    description: "Découvrez les techniques de base de la sérigraphie et repartez avec vos créations personnalisées sur textile ou papier.",
    image: "https://images.unsplash.com/photo-1607457661771-2a4b797d600f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    category: "atelier"
  },
  {
    id: 3,
    title: "Performance: Danse Contemporaine & Mapping Vidéo",
    date: "8 juillet 2023",
    location: "Théâtre de la Lumière, Marseille",
    time: "20h30 - 22h00",
    capacity: "200 personnes",
    description: "Une performance unique alliant danse contemporaine et projections vidéo interactives en temps réel.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    category: "performance"
  },
  {
    id: 4,
    title: "Atelier: Création de Fanzines",
    date: "15 juillet 2023",
    location: "Médiathèque Centrale, Bordeaux",
    time: "10h00 - 16h00",
    capacity: "20 personnes",
    description: "Une journée dédiée à la création de fanzines, de la conception à l'impression, avec un focus sur la mise en page et les techniques de reliure.",
    image: "https://images.unsplash.com/photo-1576280314498-31e7c50af242?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "atelier"
  },
  {
    id: 5,
    title: "Exposition: Photographie Urbaine",
    date: "3 août 2023",
    location: "Centre d'Art Contemporain, Toulouse",
    time: "11h00 - 19h00",
    capacity: "150 personnes",
    description: "Une exploration visuelle de la ville à travers l'objectif de cinq photographes émergents, questionnant notre rapport à l'environnement urbain.",
    image: "https://images.unsplash.com/photo-1541417904950-b855846fe074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1241&q=80",
    category: "exposition"
  },
  {
    id: 6,
    title: "Rencontre-Débat: Art & Engagement Social",
    date: "22 août 2023",
    location: "Forum Culturel, Lille",
    time: "19h00 - 21h30",
    capacity: "80 personnes",
    description: "Table ronde réunissant des artistes et acteurs culturels autour du rôle de l'art dans les mouvements sociaux contemporains.",
    image: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "autre"
  },
  {
    id: 7,
    title: "Performance: Art Sonore & Expérimental",
    date: "5 septembre 2023",
    location: "Friche Industrielle, Nantes",
    time: "21h00 - 00h00",
    capacity: "120 personnes",
    description: "Une soirée dédiée à l'exploration sonore avec des performances live d'artistes travaillant sur les frontières entre musique électronique, bruitisme et installations acoustiques.",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "performance"
  },
  {
    id: 8,
    title: "Atelier: Gravure & Techniques d'Impression",
    date: "19 septembre 2023",
    location: "Atelier d'Arts Plastiques, Rennes",
    time: "13h00 - 18h00",
    capacity: "12 personnes",
    description: "Initiation aux différentes techniques de gravure (pointe sèche, eau-forte) et impression sur presse traditionnelle.",
    image: "https://images.unsplash.com/photo-1579684288361-5c1a2957cc28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "atelier"
  }
];

const Evenements = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [registrationEvent, setRegistrationEvent] = useState<Event | null>(null);
  
  useEffect(() => {
    document.title = "Bazaart - Événements";
  }, []);

  const filteredEvents = eventData.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRegister = (event: Event) => {
    setRegistrationEvent(event);
    setShowRegistrationForm(true);
  };

  const handleBuyTicket = (event: Event) => {
    setRegistrationEvent(event);
    setShowTicketForm(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const bubbles = Array.from({ length: 15 }).map((_, i) => ({
    size: Math.random() * 120 + 60,
    position: {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    },
    color: [
      "bg-bazaart-pink/20",
      "bg-bazaart-blue/20",
      "bg-bazaart-salmon/20",
      "bg-purple-300/20",
      "bg-yellow-300/20",
    ][Math.floor(Math.random() * 5)],
    delay: i * 0.2,
    duration: Math.random() * 15 + 10,
  }));

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />

      {bubbles.map((bubble, index) => (
        <div
          key={index}
          className={`bubble ${bubble.color} fixed -z-10`}
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            top: bubble.position.top,
            left: bubble.position.left,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
          }}
        />
      ))}

      <div className="relative z-10 pt-24 px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 animate-text-shimmer bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.bazaart-black),theme(colors.bazaart-pink),theme(colors.bazaart-black))] bg-[length:200%_auto]">
            Nos Événements
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">Découvrez notre programmation variée d'ateliers, expositions, performances et rencontres artistiques.</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-1/4 lg:w-1/5">
            <div className="glass-card p-6 sticky top-24 animate-hover-float">
              <h2 className="text-2xl font-display font-bold mb-4">Filtres</h2>
              
              <div className="mb-6">
                <label htmlFor="search" className="block mb-2 font-medium">Rechercher</label>
                <input
                  type="text"
                  id="search"
                  className="w-full p-2 border border-gray-200 rounded-md bg-white/50 transition-all focus:ring-2 focus:ring-bazaart-pink focus:border-transparent"
                  placeholder="Titre, lieu, description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div>
                <h3 className="mb-2 font-medium">Catégories</h3>
                <div className="space-y-2">
                  <button 
                    className={`w-full text-left px-3 py-2 rounded-md transition-all duration-300 ${selectedCategory === 'all' ? 'bg-bazaart-pink text-bazaart-black translate-x-1' : 'hover:bg-bazaart-pink/20 hover:translate-x-1'}`}
                    onClick={() => setSelectedCategory('all')}
                  >
                    Tous les événements
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded-md transition-all duration-300 ${selectedCategory === 'atelier' ? 'bg-bazaart-pink text-bazaart-black translate-x-1' : 'hover:bg-bazaart-pink/20 hover:translate-x-1'}`}
                    onClick={() => setSelectedCategory('atelier')}
                  >
                    Ateliers
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded-md transition-all duration-300 ${selectedCategory === 'exposition' ? 'bg-bazaart-pink text-bazaart-black translate-x-1' : 'hover:bg-bazaart-pink/20 hover:translate-x-1'}`}
                    onClick={() => setSelectedCategory('exposition')}
                  >
                    Expositions
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded-md transition-all duration-300 ${selectedCategory === 'performance' ? 'bg-bazaart-pink text-bazaart-black translate-x-1' : 'hover:bg-bazaart-pink/20 hover:translate-x-1'}`}
                    onClick={() => setSelectedCategory('performance')}
                  >
                    Performances
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 rounded-md transition-all duration-300 ${selectedCategory === 'autre' ? 'bg-bazaart-pink text-bazaart-black translate-x-1' : 'hover:bg-bazaart-pink/20 hover:translate-x-1'}`}
                    onClick={() => setSelectedCategory('autre')}
                  >
                    Autres événements
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-3/4 lg:w-4/5">
            {filteredEvents.length === 0 ? (
              <div className="glass-card p-8 text-center">
                <h3 className="text-xl font-medium mb-2">Aucun événement trouvé</h3>
                <p>Essayez de modifier vos critères de recherche.</p>
              </div>
            ) : (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredEvents.map((event) => (
                  <motion.div 
                    key={event.id}
                    variants={itemVariants}
                    className="glass-card overflow-hidden card-hover"
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  >
                    <div 
                      className="h-48 bg-cover bg-center relative group overflow-hidden" 
                      style={{ backgroundImage: `url(${event.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <h3 className="text-white text-lg font-semibold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{event.title}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-3">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          event.category === 'atelier' ? 'bg-bazaart-blue text-bazaart-black' : 
                          event.category === 'exposition' ? 'bg-bazaart-pink text-bazaart-black' : 
                          event.category === 'performance' ? 'bg-bazaart-salmon text-bazaart-black' : 
                          'bg-gray-200 text-gray-800'
                        }`}>
                          {event.category === 'atelier' ? 'Atelier' : 
                          event.category === 'exposition' ? 'Exposition' : 
                          event.category === 'performance' ? 'Performance' : 
                          'Rencontre'}
                        </span>
                      </div>
                      <h3 className="text-xl font-display font-bold mb-2">{event.title}</h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 opacity-70" />
                          <span className="text-sm">{event.date}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 opacity-70" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 opacity-70" />
                          <span className="text-sm">{event.time}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4 opacity-70" />
                          <span className="text-sm">{event.capacity}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          className="bg-white/50"
                          onClick={() => setSelectedEvent(event)}
                        >
                          Détails
                        </Button>
                        <Button 
                          className="bg-bazaart-pink text-bazaart-black hover:bg-bazaart-salmon flex items-center justify-center gap-1"
                          onClick={() => handleRegister(event)}
                        >
                          S'inscrire <ArrowRight size={16} />
                        </Button>
                        <Button 
                          className="col-span-2 bg-bazaart-black text-white hover:bg-gray-800 flex items-center justify-center gap-1"
                          onClick={() => handleBuyTicket(event)}
                        >
                          <Ticket size={16} className="animate-pulse" /> Acheter des billets
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedEvent(null)}
          ></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-white rounded-xl overflow-hidden max-w-3xl w-full h-[80vh] flex flex-col"
          >
            <div 
              className="h-56 bg-cover bg-center" 
              style={{ backgroundImage: `url(${selectedEvent.image})` }}
            >
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full p-2 text-black transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-grow p-6 overflow-auto">
              <ScrollArea className="h-full pr-4">
                <div className="mb-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    selectedEvent.category === 'atelier' ? 'bg-bazaart-blue text-bazaart-black' : 
                    selectedEvent.category === 'exposition' ? 'bg-bazaart-pink text-bazaart-black' : 
                    selectedEvent.category === 'performance' ? 'bg-bazaart-salmon text-bazaart-black' : 
                    'bg-gray-200 text-gray-800'
                  }`}>
                    {selectedEvent.category === 'atelier' ? 'Atelier' : 
                    selectedEvent.category === 'exposition' ? 'Exposition' : 
                    selectedEvent.category === 'performance' ? 'Performance' : 
                    'Rencontre'}
                  </span>
                </div>
                
                <h2 className="text-2xl font-display font-bold mb-4">{selectedEvent.title}</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 opacity-70" />
                    <span>{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 opacity-70" />
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 opacity-70" />
                    <span>{selectedEvent.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-5 w-5 opacity-70" />
                    <span>{selectedEvent.capacity}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Description</h3>
                  <p className="leading-relaxed">{selectedEvent.description}</p>
                  
                  <h3 className="text-lg font-medium pt-4">Informations pratiques</h3>
                  <p className="leading-relaxed">
                    L'inscription est recommandée mais non obligatoire pour participer à cet événement. 
                    Arrivez 15 minutes avant le début pour vous installer confortablement.
                  </p>
                  
                  <h3 className="text-lg font-medium pt-4">Accessibilité</h3>
                  <p className="leading-relaxed">
                    Le lieu est accessible aux personnes à mobilité réduite. 
                    Des interprètes en langue des signes seront présents sur demande préalable.
                  </p>
                </div>
              </ScrollArea>
            </div>
            
            <div className="p-6 border-t grid grid-cols-2 gap-3">
              <Button 
                className="bg-bazaart-pink text-bazaart-black hover:bg-bazaart-salmon flex items-center justify-center gap-2"
                onClick={() => {
                  handleRegister(selectedEvent);
                  setSelectedEvent(null);
                }}
              >
                S'inscrire <ArrowRight size={16} />
              </Button>
              <Button 
                className="bg-bazaart-black text-white hover:bg-gray-800 flex items-center justify-center gap-2"
                onClick={() => {
                  handleBuyTicket(selectedEvent);
                  setSelectedEvent(null);
                }}
              >
                <Ticket size={16} /> Acheter des billets
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {showRegistrationForm && registrationEvent && (
        <EventRegistrationForm 
          event={registrationEvent} 
          onClose={() => setShowRegistrationForm(false)} 
        />
      )}

      {showTicketForm && registrationEvent && (
        <TicketPurchaseForm 
          event={registrationEvent} 
          onClose={() => setShowTicketForm(false)} 
        />
      )}

      <Footer />

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
          }
          
          .bubble {
            animation: float 15s ease-in-out infinite alternate;
            border-radius: 50%;
          }
          
          @keyframes text-shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: 0 0; }
          }
          
          .animate-text-shimmer {
            animation: text-shimmer 4s linear infinite;
          }
          
          @keyframes hover-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          .animate-hover-float {
            animation: hover-float 6s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Evenements;
