
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, X, Ticket, CreditCard, Calendar } from 'lucide-react';
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

interface TicketPurchaseFormProps {
  event: Event;
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Email invalide" }),
  ticketType: z.string(),
  quantity: z.string().transform(val => parseInt(val, 10)),
  cardNumber: z.string().min(16, { message: "Numéro de carte invalide" }),
  expiryDate: z.string().min(5, { message: "Date d'expiration invalide" }),
  cvv: z.string().min(3, { message: "CVV invalide" }),
});

type FormValues = z.infer<typeof formSchema>;

const TicketPurchaseForm = ({ event, onClose }: TicketPurchaseFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      ticketType: "standard",
      quantity: "1",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const goToNextStep = () => {
    const fieldsToValidate = currentStep === 1 
      ? ['name', 'email', 'ticketType', 'quantity'] 
      : ['cardNumber', 'expiryDate', 'cvv'];
    
    form.trigger(fieldsToValidate as any).then(isValid => {
      if (isValid) setCurrentStep(prev => prev + 1);
    });
  };

  const goToPreviousStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const onSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    
    // Simuler un envoi
    setTimeout(() => {
      toast.success(`Billets achetés pour "${event.title}"`, {
        description: "Vous recevrez vos billets par email prochainement.",
      });
      onClose();
      setIsSubmitting(false);
    }, 1500);
  };

  const calculateTotal = () => {
    const ticketType = form.watch('ticketType');
    const quantity = parseInt(form.watch('quantity') || "1", 10);
    
    let price = 0;
    switch(ticketType) {
      case 'standard':
        price = 15;
        break;
      case 'premium':
        price = 25;
        break;
      case 'vip':
        price = 45;
        break;
      default:
        price = 15;
    }
    
    return price * quantity;
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
        <div className="p-6 bg-gradient-to-r from-bazaart-blue to-bazaart-salmon">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full p-2 text-black transition-colors"
          >
            <X size={18} />
          </button>
          <h2 className="text-2xl font-display font-bold text-bazaart-black flex items-center gap-2">
            <Ticket className="animate-pulse" size={24} />
            Achat de billets
          </h2>
          <p className="text-bazaart-black">
            {event.title} - {event.date}
          </p>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className={`flex-1 h-1 ${currentStep >= 1 ? 'bg-bazaart-pink' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-bazaart-pink text-white' : 'bg-gray-200'}`}>1</div>
            <div className={`flex-1 h-1 ${currentStep >= 2 ? 'bg-bazaart-pink' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-bazaart-pink text-white' : 'bg-gray-200'}`}>2</div>
            <div className={`flex-1 h-1 ${currentStep >= 3 ? 'bg-bazaart-pink' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-bazaart-pink text-white' : 'bg-gray-200'}`}>3</div>
            <div className={`flex-1 h-1 ${currentStep >= 3 ? 'bg-bazaart-pink' : 'bg-gray-200'}`}></div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h3 className="text-lg font-semibold mb-4">Informations personnelles</h3>
                  
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
                  
                  <div className="mt-6 flex justify-end">
                    <Button 
                      type="button" 
                      onClick={goToNextStep}
                      className="bg-bazaart-black text-white hover:bg-gray-800"
                    >
                      Suivant
                    </Button>
                  </div>
                </motion.div>
              )}
              
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h3 className="text-lg font-semibold mb-4">Sélection des billets</h3>
                  
                  <FormField
                    control={form.control}
                    name="ticketType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de billet</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un type de billet" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="standard">Standard (15€)</SelectItem>
                            <SelectItem value="premium">Premium (25€)</SelectItem>
                            <SelectItem value="vip">VIP (45€)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantité</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Nombre de billets" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 billet</SelectItem>
                            <SelectItem value="2">2 billets</SelectItem>
                            <SelectItem value="3">3 billets</SelectItem>
                            <SelectItem value="4">4 billets</SelectItem>
                            <SelectItem value="5">5 billets</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <div className="flex justify-between">
                      <span>Total :</span>
                      <span className="font-semibold">{calculateTotal()}€</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={goToPreviousStep}
                    >
                      Retour
                    </Button>
                    <Button 
                      type="button" 
                      onClick={goToNextStep}
                      className="bg-bazaart-black text-white hover:bg-gray-800"
                    >
                      Suivant
                    </Button>
                  </div>
                </motion.div>
              )}
              
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h3 className="text-lg font-semibold mb-4">Paiement</h3>
                  
                  <div className="mb-4 p-3 bg-gray-50 rounded-md">
                    <div className="text-sm text-gray-500 mb-2">Récapitulatif</div>
                    <div className="flex justify-between mb-1">
                      <span>Événement :</span>
                      <span className="font-medium">{event.title}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Date :</span>
                      <span className="font-medium">{event.date}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Type de billet :</span>
                      <span className="font-medium">{form.watch('ticketType') === 'standard' ? 'Standard' : form.watch('ticketType') === 'premium' ? 'Premium' : 'VIP'}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Quantité :</span>
                      <span className="font-medium">{form.watch('quantity')}</span>
                    </div>
                    <div className="flex justify-between mt-2 pt-2 border-t border-gray-200">
                      <span className="font-semibold">Total :</span>
                      <span className="font-semibold">{calculateTotal()}€</span>
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-1">
                          <CreditCard size={16} />
                          Numéro de carte
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="1234 5678 9012 3456" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-1">
                            <Calendar size={16} />
                            Date d'expiration
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="MM/AA" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={goToPreviousStep}
                    >
                      Retour
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-bazaart-pink text-bazaart-black hover:bg-bazaart-salmon flex items-center gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Traitement...' : 'Acheter maintenant'} 
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </motion.div>
              )}
            </form>
          </Form>
        </div>
      </div>
    </motion.div>
  );
};

export default TicketPurchaseForm;
