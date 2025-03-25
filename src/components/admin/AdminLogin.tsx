
import { useState } from 'react';
import { motion } from 'framer-motion';
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

// Admin roles
const adminRoles = [
  { value: "admin", label: "Administrateur" },
  { value: "editor", label: "Éditeur" },
  { value: "viewer", label: "Visualiseur" },
];

// Mock admin users
const adminUsers = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "editor", password: "editor123", role: "editor" },
  { username: "viewer", password: "viewer123", role: "viewer" },
];

const formSchema = z.object({
  username: z.string().min(3, { message: "Le nom d'utilisateur doit contenir au moins 3 caractères" }),
  password: z.string().min(5, { message: "Le mot de passe doit contenir au moins 5 caractères" }),
  role: z.string().optional(),
});

type AdminLoginProps = {
  onLogin: (user: { username: string; role: string }) => void;
};

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      role: "admin",
    },
  });

  const handleLogin = (values: z.infer<typeof formSchema>) => {
    // Check admin credentials
    const user = adminUsers.find(
      user => user.username === values.username && user.password === values.password
    );

    if (user) {
      toast.success("Connexion réussie", {
        description: `Bienvenue, ${user.username} !`,
      });
      onLogin({ username: user.username, role: user.role });
      setIsOpen(false);
    } else {
      toast.error("Échec de la connexion", {
        description: "Nom d'utilisateur ou mot de passe incorrect",
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom d'utilisateur</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <Input 
                        className="pl-10" 
                        placeholder="Entrez votre nom d'utilisateur" 
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
        <div className="text-sm text-gray-500 pt-4">
          <p>Comptes de test :</p>
          <ul className="list-disc list-inside mt-1">
            <li>admin / admin123 (Administrateur)</li>
            <li>editor / editor123 (Éditeur)</li>
            <li>viewer / viewer123 (Visualiseur)</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminLogin;
