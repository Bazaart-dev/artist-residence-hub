
import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Save } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SettingsForm from './forms/SettingsForm';
import { useSite, SiteSettings } from '@/contexts/SiteContext';
import SecuritySettings from './SecuritySettings';
import AppearanceSettings from './AppearanceSettings';

const AdminSettings = () => {
  const { data, updateSettings } = useSite();
  
  const handleSettingsSubmit = (formData: any) => {
    // Extract social links
    const { facebook, instagram, twitter, linkedin, ...otherSettings } = formData;
    
    // Update settings
    updateSettings({
      ...otherSettings,
      socialLinks: {
        facebook,
        instagram,
        twitter,
        linkedin
      }
    });
    
    toast.success("Paramètres mis à jour avec succès");
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
        <TabsList className="mb-6">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="appearance">Apparence</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres généraux</CardTitle>
              <CardDescription>
                Gérez les informations de contact, les réseaux sociaux et autres paramètres de base de votre site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SettingsForm 
                settings={data.settings}
                onSubmit={handleSettingsSubmit}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Apparence</CardTitle>
              <CardDescription>
                Personnalisez l'apparence de votre site, les couleurs, les polices, etc.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AppearanceSettings />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
              <CardDescription>
                Gérez les paramètres de sécurité de votre site, les autorisations, etc.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SecuritySettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AdminSettings;
