
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, MessageSquare } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Email invalide" }),
  subject: z.string().min(5, { message: "Le sujet doit contenir au moins 5 caractères" }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères" }),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    document.title = "Bazaart - Contact";
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simuler un envoi
    setTimeout(() => {
      toast.success("Message envoyé avec succès!", {
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  };

  // Animation variants
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

  // Cercles d'animation
  const bubbles = Array.from({ length: 10 }).map((_, i) => ({
    size: Math.random() * 100 + 50,
    position: {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    },
    color: [
      "bg-bazaart-pink/30",
      "bg-bazaart-blue/30",
      "bg-bazaart-salmon/30",
      "bg-purple-300/30",
      "bg-yellow-300/30",
    ][Math.floor(Math.random() * 5)],
    delay: i * 0.2,
    duration: Math.random() * 15 + 10,
  }));

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />
      
      {/* Cercles animés */}
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
      
      <div className="pt-28 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-bazaart-green to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4">Contactez-nous</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Nous sommes à l'écoute de vos idées, questions ou propositions. N'hésitez pas à nous contacter.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Informations de contact */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="glass-card p-8 relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-bazaart-pink opacity-20"></div>
              <div className="absolute bottom-20 -left-20 w-40 h-40 rounded-full bg-bazaart-blue opacity-20"></div>
              
              <motion.div variants={itemVariants} className="mb-8">
                <h2 className="text-3xl font-display font-bold mb-4">Nos coordonnées</h2>
                <p className="text-lg text-gray-700">
                  Plusieurs moyens sont à votre disposition pour nous joindre. Choisissez celui qui vous convient le mieux.
                </p>
              </motion.div>
              
              <div className="space-y-6">
                <motion.div variants={itemVariants} className="flex items-start">
                  <div className="bg-bazaart-green rounded-full p-4 mr-5">
                    <Mail size={24} className="text-bazaart-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Email</h3>
                    <p className="text-gray-700">contact@bazaart.org</p>
                    <p className="text-gray-600 text-sm mt-1">Réponse sous 24-48h</p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-start">
                  <div className="bg-bazaart-pink rounded-full p-4 mr-5">
                    <MapPin size={24} className="text-bazaart-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Adresse</h3>
                    <p className="text-gray-700">123 Avenue des Arts, 75001 Paris, France</p>
                    <p className="text-gray-600 text-sm mt-1">Ouvert du lundi au vendredi, 9h-17h</p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-start">
                  <div className="bg-bazaart-blue rounded-full p-4 mr-5">
                    <Phone size={24} className="text-bazaart-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Téléphone</h3>
                    <p className="text-gray-700">+33 (0)1 23 45 67 89</p>
                    <p className="text-gray-600 text-sm mt-1">Du lundi au vendredi, 9h-17h</p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-start">
                  <div className="bg-bazaart-salmon rounded-full p-4 mr-5">
                    <MessageSquare size={24} className="text-bazaart-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Réseaux sociaux</h3>
                    <div className="flex gap-4 mt-2">
                      <a href="#" className="hover:text-bazaart-blue transition-colors">Instagram</a>
                      <a href="#" className="hover:text-bazaart-blue transition-colors">Twitter</a>
                      <a href="#" className="hover:text-bazaart-blue transition-colors">Facebook</a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Formulaire de contact */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="glass-card p-8"
            >
              <motion.h2 variants={itemVariants} className="text-3xl font-display font-bold mb-6">
                Envoyez-nous un message
              </motion.h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom complet</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre nom" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="votre@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sujet</FormLabel>
                          <FormControl>
                            <Input placeholder="Sujet de votre message" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Votre message..." 
                              className="min-h-[150px]" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <Button 
                      type="submit" 
                      className="w-full rounded-full bg-bazaart-black text-white hover:bg-gray-800 py-6 flex items-center justify-center gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'} 
                      <Send size={16} />
                    </Button>
                  </motion.div>
                </form>
              </Form>
            </motion.div>
          </div>
          
          {/* Carte ou image supplémentaire */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 mb-12"
          >
            <div className="glass-card overflow-hidden rounded-xl h-[300px] md:h-[400px] relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047564644!2d2.3315847153251434!3d48.87456397929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e38f817b573%3A0x48d69c30470e7aeb!2sPlace%20de%20l&#39;Op%C3%A9ra%2C%2075009%20Paris!5e0!3m2!1sfr!2sfr!4v1626189161466!5m2!1sfr!2sfr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                className="absolute inset-0"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
