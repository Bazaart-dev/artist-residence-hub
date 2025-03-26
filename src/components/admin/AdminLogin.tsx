
import { useState } from 'react';
import { toast } from 'sonner';
import { Lock, User, LogIn } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

// Admin roles
const adminRoles = [
  { value: "admin", label: "Administrateur" },
  { value: "editor", label: "Éditeur" },
  { value: "viewer", label: "Visualiseur" },
];

const formSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
  role: z.string().optional(),
});

type AdminLoginProps = {
  onLogin: (user: { email: string; role: string }) => void;
};

// Create a mock login function for development without Supabase
const mockLogin = (email: string, password: string, role: string) => {
  // In a real app, you would validate against your backend
  if (email === "admin@bazaart.fr" && password === "admin123") {
    return { success: true, user: { email, role } };
  }
  throw new Error("Identifiants invalides");
};

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  // Check if Supabase environment variables are available
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  // Initialize Supabase client only if environment variables are available
  const supabase = supabaseUrl && supabaseAnonKey 
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "admin",
    },
  });

  const handleLogin = async (values: z.infer<typeof formSchema>) => {
    try {
      if (supabase) {
        // Connexion avec Supabase si disponible
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        if (error) {
          throw error;
        }

        // Vérifier si l'utilisateur a le bon rôle
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user?.id)
          .single();

        if (userError || !userData) {
          throw new Error("Impossible de récupérer les informations de l'utilisateur");
        }

        // Vérifier que le rôle correspond au rôle sélectionné
        if (userData.role !== values.role) {
          await supabase.auth.signOut();
          throw new Error("Vous n'avez pas les permissions pour ce rôle");
        }

        toast.success("Connexion réussie", {
          description: `Bienvenue !`,
        });
        
        onLogin({ 
          email: data.user?.email || values.email, 
          role: userData.role 
        });
      } else {
        // Mode de développement sans Supabase
        console.warn("Supabase n'est pas configuré. Utilisation du mode de développement.");
        
        const result = mockLogin(values.email, values.password, values.role || 'admin');
        
        if (result.success) {
          toast.success("Connexion réussie (mode démo)", {
            description: `Bienvenue ${values.email} !`,
          });
          
          onLogin({
            email: values.email,
            role: values.role || 'admin',
          });
        }
      }

      // Redirection vers la page admin
      navigate('/admin');
      
      setIsOpen(false);
    } catch (error) {
      toast.error("Échec de la connexion", {
        description: error instanceof Error ? error.message : "Une erreur est survenue",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <LogIn size={16} />
          <span>Se connecter</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connexion Administrateur</DialogTitle>
          <DialogDescription>
            Connectez-vous pour accéder au tableau de bord d'administration
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <Input 
                        className="pl-10" 
                        type="email"
                        placeholder="Entrez votre email" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <Input 
                        className="pl-10" 
                        type="password" 
                        placeholder="Entrez votre mot de passe" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rôle</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un rôle" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {adminRoles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-bazaart-pink text-bazaart-black hover:bg-bazaart-salmon"
            >
              Se connecter
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminLogin;
