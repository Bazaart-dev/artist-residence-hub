
import { useEffect, useRef, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const Projets = () => {
  useEffect(() => {
    document.title = "Bazaart - Nos Projets";
  }, []);

  const [activeCategory, setActiveCategory] = useState('all');
  const projectsRef = useRef<HTMLDivElement>(null);
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

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const projets = [
    {
      id: 1,
      title: "Bazaart Club",
      description: "Lieu de rencontres et d'échanges autour des cultures afrodiasporiques.",
      image: "/lovable-uploads/bdcc5bf4-1ea4-4eb0-bf20-90f01174a939.png",
      category: "lieu",
    },
    {
      id: 2,
      title: "Bazaart Home",
      description: "Résidences d'artistes et espaces de création collaboratifs.",
      image: "/lovable-uploads/bdcc5bf4-1ea4-4eb0-bf20-90f01174a939.png",
      category: "residence",
    },
    {
      id: 3,
      title: "Bazaart Design",
      description: "Studio de création visuelle et d'identités graphiques.",
      image: "/lovable-uploads/bdcc5bf4-1ea4-4eb0-bf20-90f01174a939.png",
      category: "creation",
    },
    {
      id: 4,
      title: "Bazaart Food",
      description: "Exploration des cuisines afrodiasporiques et événements culinaires.",
      image: "/lovable-uploads/bdcc5bf4-1ea4-4eb0-bf20-90f01174a939.png",
      category: "gastronomie",
    },
    {
      id: 5,
      title: "Bazaart Lab",
      description: "Laboratoire d'idées et d'expérimentations artistiques.",
      image: "/lovable-uploads/bdcc5bf4-1ea4-4eb0-bf20-90f01174a939.png",
      category: "recherche",
    },
    {
      id: 6,
      title: "Bazaart Digital",
      description: "Médiation numérique et exploration des technologies.",
      image: "/lovable-uploads/bdcc5bf4-1ea4-4eb0-bf20-90f01174a939.png",
      category: "numerique",
    }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projets 
    : projets.filter(project => project.category === activeCategory);

  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'lieu', name: 'Lieux' },
    { id: 'residence', name: 'Résidences' },
    { id: 'creation', name: 'Création' },
    { id: 'gastronomie', name: 'Gastronomie' },
    { id: 'recherche', name: 'Recherche' },
    { id: 'numerique', name: 'Numérique' }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-bazaart-purple pt-20">
        <div className="absolute right-0 top-0 -z-10 h-full w-1/2 bg-bazaart-blue rounded-bl-[100px] md:rounded-bl-[200px]"></div>
        
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1 rounded-full bg-white/40 backdrop-blur-sm mb-6">
              <span className="font-medium text-bazaart-black text-sm">NOS PROJETS</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Donnons vie à nos idées
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 max-w-xl">
              Découvrez les différents projets développés par Bazaart pour promouvoir les cultures afrodiasporiques.
            </p>
          </div>
        </div>
        
        {/* Animated shapes */}
        <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-bazaart-pink animate-spin-slow"></div>
        <div className="absolute top-20 right-40 w-16 h-16 rounded-full bg-bazaart-green animate-spin-slow animation-delay-2000"></div>
      </section>
      
      {/* Projects Section */}
      <section ref={projectsRef} className="py-24 px-6 md:px-12 lg:px-24 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-8 text-center">Nos projets</h2>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.id 
                      ? 'bg-bazaart-black text-white' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className={`transform transition-all duration-700 delay-${index * 100} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm text-bazaart-black text-xs font-medium">
                        {categories.find(c => c.id === project.category)?.name}
                      </span>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="font-display text-2xl">{project.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <CardDescription className="text-base text-gray-700">
                      {project.description}
                    </CardDescription>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="rounded-full border-bazaart-black text-bazaart-black hover:bg-bazaart-black hover:text-white"
                    >
                      En savoir plus <ArrowRight size={16} />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Animated circles */}
      <div className="relative py-20 bg-bazaart-green overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-bazaart-pink opacity-70 animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-bazaart-blue opacity-60 animate-spin-slow"></div>
        <div className="absolute top-40 right-40 w-20 h-20 rounded-full bg-bazaart-salmon opacity-80 animate-bounce"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold mb-6">Vous avez un projet ?</h2>
            <p className="text-xl mb-10">
              Discutons ensemble de la façon dont nous pouvons collaborer et donner vie à vos idées créatives.
            </p>
            <Button className="rounded-full bg-bazaart-black text-white hover:bg-gray-800 px-8 py-6 text-lg flex items-center gap-2 mx-auto">
              Contactez-nous <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </div>
      
      <Contact />
      <Footer />
    </div>
  );
};

export default Projets;
