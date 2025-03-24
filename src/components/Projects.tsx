
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";

const projectsData = [
  {
    id: 1,
    title: "Résidence Artistique Internationale",
    category: "Bazaart Home",
    description: "Programme de résidence pour artistes internationaux explorant les thématiques afro-diasporiques.",
    image: "https://images.unsplash.com/photo-1578926288207-32356af70663?q=80&w=500&auto=format&fit=crop",
    date: "Mai - Août 2023",
    location: "Paris, France",
    participants: "12 artistes"
  },
  {
    id: 2,
    title: "Festival des Arts Afro-Contemporains",
    category: "Bazaart Club",
    description: "Célébration annuelle présentant des performances, expositions et ateliers.",
    image: "https://images.unsplash.com/photo-1576502200916-f1d9ac915c84?q=80&w=500&auto=format&fit=crop",
    date: "Octobre 2023",
    location: "Marseille, France",
    participants: "30+ artistes"
  },
  {
    id: 3,
    title: "Atelier Design Collaboratif",
    category: "Bazaart Design",
    description: "Workshops de création textile s'inspirant des traditions et techniques ancestrales.",
    image: "https://images.unsplash.com/photo-1596466220697-248b10df77b9?q=80&w=500&auto=format&fit=crop",
    date: "En cours",
    location: "Lyon, France",
    participants: "Ouvert à tous"
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-24 px-6 md:px-12 lg:px-24 bg-bazaart-blue">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-white/40 backdrop-blur-sm mb-4 text-bazaart-black text-sm font-medium">
            DÉCOUVREZ
          </span>
          <h2 className="section-title">Nos Projets</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <div 
              key={project.id}
              className={`glass-card overflow-hidden transition-all duration-700 delay-${100 * (index + 1)} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <div className="h-56 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 rounded-full bg-white/70 text-xs font-medium mb-3">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="mb-4 text-gray-800">{project.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm">
                    <Calendar size={16} className="mr-2" />
                    <span>{project.date}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin size={16} className="mr-2" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users size={16} className="mr-2" />
                    <span>{project.participants}</span>
                  </div>
                </div>
                
                <Button variant="link" className="p-0 text-bazaart-black font-medium hover:text-bazaart-salmon flex items-center gap-1">
                  En savoir plus <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button className="rounded-full bg-bazaart-black text-white hover:bg-gray-800 px-8 py-6 text-lg">
            Voir tous les projets
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
