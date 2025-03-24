
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';

const Presentation = () => {
  useEffect(() => {
    document.title = "Présentation - Bazaart";
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />
      
      <main className="pt-24">
        <section className="py-16 px-6 md:px-12 lg:px-24 bg-bazaart-pink">
          <div className="container mx-auto max-w-5xl">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-12 text-center">
              Présentation
            </h1>
            
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-md">
              <p className="text-xl mb-6">
                L'association Bazaart est dédiée à la création d'espaces de collaboration interculturelle et 
                intergénérationnelle, à la promotion des cultures afro-diasporiques, et à l'accompagnement de 
                projets portés par des artistes débutants et émergents. Bazaart englobe diverses initiatives et 
                projets spécifiques.
              </p>
              
              <p className="text-xl mb-6">
                Notre mission est de créer des ponts entre les différentes expressions culturelles afro-diasporiques 
                et de fournir des plateformes où ces expressions peuvent être valorisées, partagées et transmises 
                aux générations futures.
              </p>
              
              <p className="text-xl">
                À travers nos différentes initiatives, nous nous efforçons de faire vivre ces cultures 
                et de leur donner la place qu'elles méritent dans le paysage culturel contemporain.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16 px-6 md:px-12 lg:px-24 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-display font-bold mb-12 text-center">
              Nos Initiatives
            </h2>
            
            <div className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Bazaart Club</h3>
                  <p className="text-lg mb-4">
                    Organisation d'événements culturels et artistiques ancrés dans les pratiques et 
                    les savoir-faire des territoires. Espace de mise en lien et de circulation, Bazaart Club 
                    valorise les dynamiques collaboratives, les gestes de réemploi et les formes de création 
                    qui s'inscrivent dans une approche sensible des ressources, des territoires et des communautés.
                  </p>
                  <a href="#" className="inline-flex items-center text-bazaart-black font-medium hover:text-bazaart-salmon transition-colors duration-300">
                    En savoir plus <ArrowRight size={16} className="ml-2" />
                  </a>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1571624436279-b272aff752b5?q=80&w=600&auto=format&fit=crop" 
                    alt="Bazaart Club" 
                    className="w-full h-72 object-cover"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=600&auto=format&fit=crop" 
                    alt="Bazaart Home" 
                    className="w-full h-72 object-cover"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-2xl font-bold mb-4">Bazaart Home</h3>
                  <p className="text-lg mb-4">
                    Création de résidences artistiques pensées comme des espaces de traversée à destination 
                    d'artistes locaux et internationaux. Bazaart Home encourage des pratiques contextuelles, 
                    attentives aux environnements et aux récits des territoires afro-diasporiques, en dialogue 
                    avec les enjeux contemporains liés aux ressources, à la transmission et aux formes de vie collectives.
                  </p>
                  <a href="#" className="inline-flex items-center text-bazaart-black font-medium hover:text-bazaart-salmon transition-colors duration-300">
                    En savoir plus <ArrowRight size={16} className="ml-2" />
                  </a>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Bazaart Design</h3>
                  <p className="text-lg mb-4">
                    Ateliers consacrés au design et à la création, pensés comme espaces de fabrication, 
                    de transmission et d'insertion. Bazaart Design valorise les démarches collectives, 
                    le travail de la main, et les pratiques attentives aux récits du quotidien.
                  </p>
                  <a href="#" className="inline-flex items-center text-bazaart-black font-medium hover:text-bazaart-salmon transition-colors duration-300">
                    En savoir plus <ArrowRight size={16} className="ml-2" />
                  </a>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1507137566324-5321519fca23?q=80&w=600&auto=format&fit=crop" 
                    alt="Bazaart Design" 
                    className="w-full h-72 object-cover"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1 rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1577219492769-b63a779fac28?q=80&w=600&auto=format&fit=crop" 
                    alt="Bazaart Food" 
                    className="w-full h-72 object-cover"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-2xl font-bold mb-4">Bazaart Food</h3>
                  <p className="text-lg mb-4">
                    Valorisation des arts culinaires afro-diasporiques à travers des expériences sensibles 
                    autour des savoir-faire et des mémoires. Bazaart Food explore les liens entre alimentation, 
                    territoires et pratiques durables.
                  </p>
                  <a href="#" className="inline-flex items-center text-bazaart-black font-medium hover:text-bazaart-salmon transition-colors duration-300">
                    En savoir plus <ArrowRight size={16} className="ml-2" />
                  </a>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Bazaart Lab</h3>
                  <p className="text-lg mb-4">
                    Laboratoire d'expérimentation et de transmission des savoirs, Bazaart Lab explore 
                    différentes formes d'innovations quelles soient culturelles ou pédagogiques.
                  </p>
                  <a href="#" className="inline-flex items-center text-bazaart-black font-medium hover:text-bazaart-salmon transition-colors duration-300">
                    En savoir plus <ArrowRight size={16} className="ml-2" />
                  </a>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1560523160-754a9e25c68f?q=80&w=600&auto=format&fit=crop" 
                    alt="Bazaart Lab" 
                    className="w-full h-72 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Presentation;
