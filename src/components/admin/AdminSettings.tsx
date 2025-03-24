
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Lock, User, Globe, Bell, Mail, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Switch
} from "@/components/ui/switch";

const AdminSettings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Bazaart',
    siteDescription: 'Plateforme dédiée à l\'art et la culture afrodiasporique',
    siteEmail: 'contact@bazaart.org',
    contactPhone: '+33 (0)1 23 45 67 89',
    contactAddress: '123 Avenue des Arts, 75001 Paris, France',
  });

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Paramètres généraux enregistrés");
  };

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Paramètres de sécurité enregistrés");
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

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-display font-bold">Paramètres</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-5 h-auto p-1">
          <TabsTrigger value="general" className="py-2">Général</TabsTrigger>
          <TabsTrigger value="security" className="py-2">Sécurité</TabsTrigger>
          <TabsTrigger value="notifications" className="py-2">Notifications</TabsTrigger>
          <TabsTrigger value="appearance" className="py-2">Apparence</TabsTrigger>
          <TabsTrigger value="advanced" className="py-2">Avancé</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres généraux</CardTitle>
                <CardDescription>
                  Configurer les informations générales du site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGeneralSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="siteName" className="text-sm font-medium">Nom du site</label>
                      <Input 
                        id="siteName" 
                        value={generalSettings.siteName}
                        onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="siteEmail" className="text-sm font-medium">Email du site</label>
                      <Input 
                        id="siteEmail" 
                        type="email"
                        value={generalSettings.siteEmail}
                        onChange={(e) => setGeneralSettings({...generalSettings, siteEmail: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="siteDescription" className="text-sm font-medium">Description du site</label>
                    <Textarea 
                      id="siteDescription" 
                      value={generalSettings.siteDescription}
                      onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <Separator />
                  
                  <h3 className="font-medium text-lg">Coordonnées de contact</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="contactPhone" className="text-sm font-medium">Téléphone</label>
                      <Input 
                        id="contactPhone" 
                        value={generalSettings.contactPhone}
                        onChange={(e) => setGeneralSettings({...generalSettings, contactPhone: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="contactAddress" className="text-sm font-medium">Adresse</label>
                    <Textarea 
                      id="contactAddress" 
                      value={generalSettings.contactAddress}
                      onChange={(e) => setGeneralSettings({...generalSettings, contactAddress: e.target.value})}
                      className="min-h-[80px]"
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-bazaart-pink hover:bg-bazaart-salmon text-bazaart-black flex items-center gap-2">
                      <Save size={16} />
                      Enregistrer les modifications
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Réseaux sociaux</CardTitle>
                <CardDescription>
                  Configurez les liens vers les réseaux sociaux
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="instagram" className="text-sm font-medium">Instagram</label>
                      <Input id="instagram" placeholder="https://instagram.com/votre-compte" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="facebook" className="text-sm font-medium">Facebook</label>
                      <Input id="facebook" placeholder="https://facebook.com/votre-page" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="twitter" className="text-sm font-medium">Twitter</label>
                      <Input id="twitter" placeholder="https://twitter.com/votre-compte" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="youtube" className="text-sm font-medium">YouTube</label>
                      <Input id="youtube" placeholder="https://youtube.com/votre-chaine" />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="bg-bazaart-pink hover:bg-bazaart-salmon text-bazaart-black flex items-center gap-2">
                      <Save size={16} />
                      Enregistrer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sécurité du compte</CardTitle>
                <CardDescription>
                  Gérez les paramètres de sécurité de votre compte administrateur
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSecuritySubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="currentPassword" className="text-sm font-medium">Mot de passe actuel</label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="newPassword" className="text-sm font-medium">Nouveau mot de passe</label>
                      <Input id="newPassword" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="text-sm font-medium">Confirmer le mot de passe</label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Options de sécurité avancées</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          <Lock size={16} />
                          Authentification à deux facteurs
                        </div>
                        <p className="text-sm text-gray-500">Renforce la sécurité de votre compte</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          <Shield size={16} />
                          Notifications de connexion
                        </div>
                        <p className="text-sm text-gray-500">Recevoir un email à chaque nouvelle connexion</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-bazaart-black hover:bg-gray-800 text-white flex items-center gap-2">
                      <Save size={16} />
                      Mettre à jour
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de notification</CardTitle>
                <CardDescription>
                  Configurez quand et comment vous recevez des notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Notifications par email</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          <Mail size={16} />
                          Nouvelles inscriptions aux événements
                        </div>
                        <p className="text-sm text-gray-500">Recevoir un email pour chaque nouvelle inscription</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          <Mail size={16} />
                          Demandes de contact
                        </div>
                        <p className="text-sm text-gray-500">Recevoir un email pour chaque nouveau message</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          <Mail size={16} />
                          Rapports hebdomadaires
                        </div>
                        <p className="text-sm text-gray-500">Recevoir un résumé hebdomadaire des activités</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Notifications sur le site</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          <Bell size={16} />
                          Notifications en temps réel
                        </div>
                        <p className="text-sm text-gray-500">Afficher des notifications en temps réel sur le site</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          <Bell size={16} />
                          Sons de notification
                        </div>
                        <p className="text-sm text-gray-500">Jouer un son lors des notifications</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="bg-bazaart-pink hover:bg-bazaart-salmon text-bazaart-black flex items-center gap-2">
                      <Save size={16} />
                      Enregistrer les préférences
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personnalisation de l'apparence</CardTitle>
                <CardDescription>
                  Configurez l'apparence du site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Logo du site</h3>
                      <div className="h-32 border-2 border-dashed rounded-md flex flex-col items-center justify-center">
                        <p className="text-sm text-gray-500">Déposez une image ou</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Parcourir
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Favicon</h3>
                      <div className="h-32 border-2 border-dashed rounded-md flex flex-col items-center justify-center">
                        <p className="text-sm text-gray-500">Déposez une image ou</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Parcourir
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Couleurs du thème</h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Couleur principale</label>
                        <div className="h-10 rounded-md overflow-hidden border flex">
                          <div className="w-10 h-full bg-bazaart-pink"></div>
                          <input type="text" value="#FF87B2" className="flex-1 px-3 text-sm" readOnly />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Couleur secondaire</label>
                        <div className="h-10 rounded-md overflow-hidden border flex">
                          <div className="w-10 h-full bg-bazaart-blue"></div>
                          <input type="text" value="#A0E4DB" className="flex-1 px-3 text-sm" readOnly />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Arrière-plan</label>
                        <div className="h-10 rounded-md overflow-hidden border flex">
                          <div className="w-10 h-full bg-bazaart-green"></div>
                          <input type="text" value="#E9F5DB" className="flex-1 px-3 text-sm" readOnly />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Accentuation</label>
                        <div className="h-10 rounded-md overflow-hidden border flex">
                          <div className="w-10 h-full bg-bazaart-salmon"></div>
                          <input type="text" value="#FFB4A2" className="flex-1 px-3 text-sm" readOnly />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="bg-bazaart-pink hover:bg-bazaart-salmon text-bazaart-black flex items-center gap-2">
                      <Save size={16} />
                      Enregistrer les changements
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres avancés</CardTitle>
                <CardDescription>
                  Configurations techniques avancées du site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">SEO</h3>
                    
                    <div className="space-y-2">
                      <label htmlFor="metaTitle" className="text-sm font-medium">Titre META par défaut</label>
                      <Input id="metaTitle" placeholder="Bazaart - Art et Culture Afrodiasporique" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="metaDescription" className="text-sm font-medium">Description META par défaut</label>
                      <Textarea 
                        id="metaDescription" 
                        placeholder="Bazaart est une plateforme dédiée à l'art et la culture afrodiasporique, proposant des événements, expositions et ateliers."
                        className="min-h-[80px]"
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Intégrations</h3>
                    
                    <div className="space-y-2">
                      <label htmlFor="googleAnalytics" className="text-sm font-medium">ID Google Analytics</label>
                      <Input id="googleAnalytics" placeholder="UA-XXXXXXXXX-X ou G-XXXXXXXXXX" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="pixelFacebook" className="text-sm font-medium">ID Pixel Facebook</label>
                      <Input id="pixelFacebook" placeholder="XXXXXXXXXXXXXXXXXX" />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Paramètres du système</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          <Globe size={16} />
                          Mode maintenance
                        </div>
                        <p className="text-sm text-gray-500">Activer le mode maintenance du site</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          <User size={16} />
                          Inscriptions ouvertes
                        </div>
                        <p className="text-sm text-gray-500">Permettre aux visiteurs de s'inscrire aux événements</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button className="bg-bazaart-pink hover:bg-bazaart-salmon text-bazaart-black flex items-center gap-2">
                      <Save size={16} />
                      Enregistrer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </motion.div>
  );
};

export default AdminSettings;
