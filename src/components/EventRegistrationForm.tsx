
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, X } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from 'framer-motion';

interface Event {
  id: number;
  title: string;
  date: string;
  category: string;
}

interface EventRegistrationFormProps {
  event: Event;
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Email invalide" }),
  phone: z.string().min(10, { message: "Numéro de téléphone invalide" }),
  participants: z.coerce.number().min(1), // Fixed: Using coerce.number() instead of string().transform
  specialRequests: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const EventRegistrationForm = ({ event, onClose }: EventRegistrationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      participants: 1, // Changed to number
      specialRequests: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    
    // Simuler un envoi
    setTimeout(() => {
      toast.success(`Inscription confirmée pour "${event.title}"`, {
        description: "Vous recevrez un email de confirmation prochainement.",
      });
      onClose();
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-xl overflow-hidden max-w-md w-full">
        <div className="p-6 bg-gradient-to-r from-bazaart-pink to-bazaart-salmon">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full p-2 text-black transition-colors"
          >
            <X size={18} />
          </button>
          <h2 className="text-2xl font-display font-bold text-bazaart-black">
            Inscription à l'événement
          </h2>
          <p className="text-bazaart-black">
            {event.title} - {event.date}
          </p>
        </div>
        
        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre numéro de téléphone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="participants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de participants</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1 personne</SelectItem>
                        <SelectItem value="2">2 personnes</SelectItem>
                        <SelectItem value="3">3 personnes</SelectItem>
                        <SelectItem value="4">4 personnes</SelectItem>
                        <SelectItem value="5">5 personnes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="specialRequests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Demandes particulières (optionnel)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Allergies, besoins spécifiques..." 
                        className="min-h-[80px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full rounded-full bg-bazaart-black text-white hover:bg-gray-800 flex items-center justify-center gap-2 mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Traitement en cours...' : 'Confirmer mon inscription'} 
                <ArrowRight size={16} />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </motion.div>
  );
};

export default EventRegistrationForm;
