
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from 'framer-motion';
import { Save, Fingerprint, Lock, KeyRound, Eye, RefreshCw } from 'lucide-react';

const SecuritySettings = () => {
  const [settings, setSettings] = useState({
    twoFactorAuth: false,
    loginAttempts: "3",
    sessionTimeout: "30",
    passwordPolicy: "medium",
    adminAccess: "restricted",
    autoLogout: true,
    ipRestriction: false,
    notifyOnLogin: true,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSwitchChange = (field: string) => (checked: boolean) => {
    setSettings(prev => ({ ...prev, [field]: checked }));
  };

  const handleSelectChange = (field: string) => (value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings(prev => ({ ...prev, [field]: e.target.value }));
  };

  const generatePassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    const passwordInput = document.getElementById('newPassword') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.value = password;
      passwordInput.type = 'text';
      setTimeout(() => {
        passwordInput.type = 'password';
      }, 3000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Paramètres de sécurité mis à jour", {
        description: "Les nouvelles configurations ont été appliquées."
      });
    }, 1500);
  };

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <form onSubmit={handleSubmit}>
        <motion.div variants={itemVariants}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock size={18} />
                <span>Authentification</span>
              </CardTitle>
              <CardDescription>
                Configurez les paramètres d'authentification et de connexion
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="twoFactorAuth" className="flex items-center gap-2">
                    <Fingerprint size={16} />
                    <span>Authentification à deux facteurs</span>
                  </Label>
                  <Switch
                    id="twoFactorAuth"
                    checked={settings.twoFactorAuth}
                    onCheckedChange={handleSwitchChange('twoFactorAuth')}
                  />
                </div>
                <p className="text-sm text-gray-500 ml-7">
                  Ajoute une couche de sécurité supplémentaire lors de la connexion
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="loginAttempts">Tentatives de connexion avant blocage</Label>
                  <Select 
                    value={settings.loginAttempts}
                    onValueChange={handleSelectChange('loginAttempts')}
                  >
                    <SelectTrigger id="loginAttempts">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 tentatives</SelectItem>
                      <SelectItem value="5">5 tentatives</SelectItem>
                      <SelectItem value="10">10 tentatives</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Expiration de session (minutes)</Label>
                  <Select 
                    value={settings.sessionTimeout}
                    onValueChange={handleSelectChange('sessionTimeout')}
                  >
                    <SelectTrigger id="sessionTimeout">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="120">2 heures</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoLogout" className="flex items-center gap-2">
                    <LogOut size={16} />
                    <span>Déconnexion automatique après inactivité</span>
                  </Label>
                  <Switch
                    id="autoLogout"
                    checked={settings.autoLogout}
                    onCheckedChange={handleSwitchChange('autoLogout')}
                  />
                </div>
                <p className="text-sm text-gray-500 ml-7">
                  Déconnecte automatiquement l'utilisateur après la période d'inactivité définie
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound size={18} />
                <span>Politique de mot de passe</span>
              </CardTitle>
              <CardDescription>
                Définissez les exigences pour les mots de passe des administrateurs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="passwordPolicy">Force minimale requise</Label>
                <Select 
                  value={settings.passwordPolicy}
                  onValueChange={handleSelectChange('passwordPolicy')}
                >
                  <SelectTrigger id="passwordPolicy">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Basique (min. 6 caractères)</SelectItem>
                    <SelectItem value="medium">Modérée (min. 8 caractères, majuscules, chiffres)</SelectItem>
                    <SelectItem value="high">Élevée (min. 12 caractères, majuscules, chiffres, symboles)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="newPassword">Changer le mot de passe administrateur</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input 
                      id="newPassword" 
                      type="password" 
                      placeholder="Nouveau mot de passe"
                    />
                    <button 
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => {
                        const input = document.getElementById('newPassword') as HTMLInputElement;
                        if (input) {
                          input.type = input.type === 'password' ? 'text' : 'password';
                        }
                      }}
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={generatePassword}
                    className="flex items-center gap-1"
                  >
                    <RefreshCw size={14} />
                    <span>Générer</span>
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Le mot de passe sera visible pendant 3 secondes si généré</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users size={18} />
                <span>Contrôle d'accès</span>
              </CardTitle>
              <CardDescription>
                Gérez qui peut accéder au tableau de bord d'administration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="adminAccess">Niveau d'accès au tableau de bord</Label>
                <Select 
                  value={settings.adminAccess}
                  onValueChange={handleSelectChange('adminAccess')}
                >
                  <SelectTrigger id="adminAccess">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Ouvert (tous les administrateurs ont un accès complet)</SelectItem>
                    <SelectItem value="restricted">Restreint (accès basé sur les rôles)</SelectItem>
                    <SelectItem value="custom">Personnalisé (permissions détaillées par utilisateur)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="ipRestriction" className="flex items-center gap-2">
                    <Globe size={16} />
                    <span>Restriction par adresse IP</span>
                  </Label>
                  <p className="text-sm text-gray-500 ml-7">
                    Limite l'accès au tableau de bord à certaines adresses IP
                  </p>
                </div>
                <Switch
                  id="ipRestriction"
                  checked={settings.ipRestriction}
                  onCheckedChange={handleSwitchChange('ipRestriction')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifyOnLogin" className="flex items-center gap-2">
                    <Bell size={16} />
                    <span>Notification de connexion</span>
                  </Label>
                  <p className="text-sm text-gray-500 ml-7">
                    Envoi un email à l'administrateur lors d'une nouvelle connexion
                  </p>
                </div>
                <Switch
                  id="notifyOnLogin"
                  checked={settings.notifyOnLogin}
                  onCheckedChange={handleSwitchChange('notifyOnLogin')}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Button 
            type="submit" 
            className="w-full sm:w-auto bg-bazaart-pink hover:bg-bazaart-salmon text-bazaart-black"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <RefreshCw size={16} className="mr-2 animate-spin" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" />
                Enregistrer les paramètres
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

// Import missing icons for the component
import { LogOut, Users, Globe, Bell } from 'lucide-react';

export default SecuritySettings;
