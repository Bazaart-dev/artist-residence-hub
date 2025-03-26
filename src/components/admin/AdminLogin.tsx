
import { useState } from 'react';
import { toast } from 'sonner';
import { Lock, User, LogIn, UserPlus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/lib/supabaseClient';

// Admin roles
const adminRoles = [
  {
    value: "admin",
    label: "Administrateur"
  },
  {
    value: "editor",
    label: "Éditeur"
  },
  {
    value: "viewer",
    label: "Visualiseur"
  }
];

const formSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide"
  }),
  password: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères"
  }),
  role: z.string().optional()
});

type AdminLoginProps = {
  onLogin: (user: { email: string; role: string }) => void;
};

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "admin"
    }
  });

  const signUpForm = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "admin"
    }
  });

const handleLogin = async (values: z.infer<typeof formSchema>) => {
    // les logs de débogage
    console.log("Tentative de connexion lancée"); // Debug 1
  console.log("Tentative de connexion avec:", values);
  console.log("Rôle sélectionné:", values.role);
  try 
      console.log("Avant appel Supabase", values); // Debug 2

    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password
    });
    console.log("Réponse Supabase", { data, error }); // Debug 3

    if (error) {
      console.error("Erreur Supabase", error); // Debug 4
      throw error;
          }

    if (!data.user) {
      throw new Error("Aucun utilisateur retourné");
    }
          console.log("Récupération du profil..."); // Debug 5

    // Récupération du rôle
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user?.id)
      .single();
    console.log("Profil récupéré", { profile, profileError }); // Debug 6

    if (!profile) throw new Error("Profil utilisateur introuvable");
    console.log("Vérification du rôle..."); // Debug 7

    // Vérification du rôle
    if (profile.role !== values.role) {
      await supabase.auth.signOut();
      throw new Error(`Vous n'avez pas les permissions de ${values.role}`);
    }
      console.log("Connexion réussie, appel onLogin"); // Debug 8


    toast.success("Connexion réussie", {
      description: `Bienvenue ${data.user?.email}`
    });

    // Appel de la callback parent
    onLogin({
      email: data.user?.email || values.email,
      role: profile.role
    });

    // Fermeture du modal
      console.log("Fermeture du modal"); // Debug 9
    setIsOpen(false);

  } catch (error) {
    console.error("Erreur de connexion:", error);
    toast.error("Échec de la connexion", {
      description: error instanceof Error ? error.message : "Erreur inconnue"
    });
  }
};

const handleSignUp = async (values: z.infer<typeof formSchema>) => {
    // Debug logs
  console.log("Tentative d'inscription avec:", values);
  console.log("Rôle sélectionné:", values.role);
  try {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password
    });

    if (error) throw error;

    // Création du profil AVEC le rôle sélectionné
    if (data.user?.id) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: data.user.id,
          email: values.email,
          role: values.role // Prend le rôle du formulaire
        });

      if (profileError) throw profileError;
    }

    toast.success("Inscription réussie");
    setActiveTab("signin");
    signUpForm.reset();
  } catch (error) {
    toast.error("Échec de l'inscription", {
      description: error instanceof Error ? error.message : "Une erreur est survenue"
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
          <DialogTitle>Espace Administrateur</DialogTitle>
          <DialogDescription>
            Connectez-vous ou inscrivez-vous pour accéder au tableau de bord d'administration
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "signin" | "signup")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Connexion</TabsTrigger>
            <TabsTrigger value="signup">Inscription</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
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
                          <Input className="pl-10" type="email" placeholder="Entrez votre email" {...field} />
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
                          <Input className="pl-10" type="password" placeholder="Entrez votre mot de passe" {...field} />
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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

                <Button type="submit" className="w-full bg-bazaart-pink text-bazaart-black hover:bg-bazaart-salmon">
                  <LogIn size={16} className="mr-2" />
                  Se connecter
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="signup">
            <Form {...signUpForm}>
              <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
                <FormField
                  control={signUpForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                          <Input className="pl-10" type="email" placeholder="Entrez votre email" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signUpForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                          <Input className="pl-10" type="password" placeholder="Entrez votre mot de passe" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signUpForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rôle</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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

                <Button type="submit" className="w-full bg-bazaart-pink text-bazaart-black hover:bg-bazaart-salmon">
                  <UserPlus size={16} className="mr-2" />
                  S'inscrire
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AdminLogin;
