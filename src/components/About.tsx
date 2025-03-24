
import { useState, useEffect, useRef } from 'react';

const About = () => {
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
    <section ref={sectionRef} id="about" className="py-24 px-6 md:px-12 lg:px-24 bg-bazaart-pink">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Présentation</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <p className={`text-xl md:text-2xl mb-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
            L'association Bazaart est dédiée à la création d'espaces de collaboration interculturelle et 
            intergénérationnelle, à la promotion des cultures afro-diasporiques, et à l'accompagnement de 
            projets portés par des artistes débutants et émergents. Bazaart englobe diverses initiatives et 
            projets spécifiques.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <div className={`glass-card p-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h3 className="text-xl font-bold mb-4">Bazaart Club</h3>
            <p>Organisation d'événements culturels et artistiques ancrés dans les pratiques et les savoir-faire des territoires. Espace de mise en lien et de circulation, Bazaart Club valorise les dynamiques collaboratives.</p>
          </div>
          
          <div className={`glass-card p-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h3 className="text-xl font-bold mb-4">Bazaart Home</h3>
            <p>Création de résidences artistiques pensées comme des espaces de traversée à destination d'artistes locaux et internationaux. Bazaart Home encourage des pratiques contextuelles, attentives aux environnements.</p>
          </div>
          
          <div className={`glass-card p-6 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h3 className="text-xl font-bold mb-4">Bazaart Design</h3>
            <p>Ateliers consacrés au design et à la création, pensés comme espaces de fabrication, de transmission et d'insertion. Bazaart Design valorise les démarches collectives, le travail de la main.</p>
          </div>
          
          <div className={`glass-card p-6 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h3 className="text-xl font-bold mb-4">Bazaart Food</h3>
            <p>Valorisation des arts culinaires afro-diasporiques à travers des expériences sensibles autour des savoir-faire et des mémoires. Bazaart Food explore les liens entre alimentation, territoires et pratiques durables.</p>
          </div>
        </div>
        
        <div className="mt-24">
          <h3 className={`text-3xl font-bold mb-8 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'}`}>
            Nos Valeurs
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`glass-card p-6 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <h4 className="text-xl font-bold mb-2">1. Respect et Inclusion</h4>
              <p>Nous valorisons la diversité des perspectives et créons des espaces où chacun se sent respecté et inclus.</p>
            </div>
            
            <div className={`glass-card p-6 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <h4 className="text-xl font-bold mb-2">2. Transparence et Franchise</h4>
              <p>Nous communiquons ouvertement et honnêtement avec nos partenaires, artistes et communautés.</p>
            </div>
            
            <div className={`glass-card p-6 transition-all duration-700 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <h4 className="text-xl font-bold mb-2">3. Bienveillance et Entraide</h4>
              <p>Nous cultivons un environnement de soutien mutuel et d'encouragement entre les artistes.</p>
            </div>
            
            <div className={`glass-card p-6 transition-all duration-700 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <h4 className="text-xl font-bold mb-2">4. Créativité et Innovation</h4>
              <p>Nous encourageons l'exploration artistique et les approches novatrices dans toutes nos initiatives.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
