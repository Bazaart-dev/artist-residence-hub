
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
import { ADMIN_ROLES } from '@/lib/constants';


// Admin roles
const roleOptions = Object.values(ADMIN_ROLES);


const formSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
  role: z.string()
});

type AdminLoginProps = {
  onLogin: (email: string, password: string) => Promise<{ email: string; role: string } | null>;
};

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "admin"
    }
  });

  const signUpForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "admin"
    }
  });

const handleLogin = async (values: z.infer<typeof formSchema>) => {
  try {
    const user = await onLogin(values.email, values.password);
    if (user) {
      toast.success(`Bienvenue ${user.email}`);
      setIsOpen(false);
      window.location.reload(); // Force un re-check de l'authentification
    }
  } catch (error) {
    toast.error("Échec de connexion", {
      description: error instanceof Error ? error.message : "Erreur inconnue"
    });
  }
};

  const handleSignUp = async (values: z.infer<typeof formSchema>) => {
    try {
      // Ici vous devrez implémenter la logique d'inscription
      // ou la déplacer dans App.tsx comme pour handleLogin
      toast.success("Inscription réussie (fonctionnalité à implémenter)");
      setActiveTab("signin");
      signUpForm.reset();
    } catch (error) {
      toast.error("Échec de l'inscription", {
        description: error instanceof Error ? error.message : "Erreur inconnue"
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
            Connectez-vous pour accéder au tableau de bord d'administration
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
                          <Input className="pl-10" type="email" placeholder="admin@exemple.com" {...field} />
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
                          <Input className="pl-10" type="password" placeholder="••••••••" {...field} />
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
  {roleOptions.map(role => (
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
                
                <Button type="submit" className="w-full">
                  <LogIn size={16} className="mr-2" />
                  Se connecter
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="signup">
            <Form {...signUpForm}>
              <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
                {/* Formulaire d'inscription similaire à celui de connexion */}
                <Button type="submit" className="w-full">
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
