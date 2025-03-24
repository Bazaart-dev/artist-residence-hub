
import { useState, useRef, useEffect } from 'react';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler un envoi
    setTimeout(() => {
      toast.success("Message envoyé avec succès!");
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 px-6 md:px-12 lg:px-24 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className={`transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <span className="inline-block px-4 py-1 rounded-full bg-bazaart-green/40 backdrop-blur-sm mb-4 text-bazaart-black text-sm font-medium">
              CONTACTEZ-NOUS
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Prêt à collaborer avec nous?
            </h2>
            <p className="text-lg mb-8 text-gray-700">
              Nous sommes à l'écoute de vos idées, questions ou propositions de collaboration. 
              N'hésitez pas à nous contacter pour en discuter.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start">
                <div className="bg-bazaart-green rounded-full p-3 mr-4">
                  <Mail size={24} className="text-bazaart-black" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Email</h3>
                  <p className="text-gray-700">contact@bazaart.org</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-bazaart-pink rounded-full p-3 mr-4">
                  <MapPin size={24} className="text-bazaart-black" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Adresse</h3>
                  <p className="text-gray-700">123 Avenue des Arts, 75001 Paris, France</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-bazaart-blue rounded-full p-3 mr-4">
                  <Phone size={24} className="text-bazaart-black" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Téléphone</h3>
                  <p className="text-gray-700">+33 (0)1 23 45 67 89</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Envoyez-nous un message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nom complet
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom"
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Votre message..."
                    required
                    className="w-full min-h-[150px]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full rounded-full bg-bazaart-black text-white hover:bg-gray-800 py-6 flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'} 
                  <Send size={16} />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
