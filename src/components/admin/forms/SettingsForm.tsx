
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { SiteSettings } from '@/contexts/SiteContext';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const settingsFormSchema = z.object({
  phone: z.string().min(5, {
    message: "Le numéro de téléphone doit contenir au moins 5 caractères",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
  address: z.string().min(5, {
    message: "L'adresse doit contenir au moins 5 caractères",
  }),
  facebook: z.string().url({
    message: "Veuillez entrer une URL valide",
  }).optional().or(z.literal('')),
  instagram: z.string().url({
    message: "Veuillez entrer une URL valide",
  }).optional().or(z.literal('')),
  twitter: z.string().url({
    message: "Veuillez entrer une URL valide",
  }).optional().or(z.literal('')),
  linkedin: z.string().url({
    message: "Veuillez entrer une URL valide",
  }).optional().or(z.literal('')),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

interface SettingsFormProps {
  settings: SiteSettings;
  onSubmit: (data: SettingsFormValues) => void;
}

const SettingsForm = ({ settings, onSubmit }: SettingsFormProps) => {
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      phone: settings.phone,
      email: settings.email,
      address: settings.address,
      facebook: settings.socialLinks.facebook || '',
      instagram: settings.socialLinks.instagram || '',
      twitter: settings.socialLinks.twitter || '',
      linkedin: settings.socialLinks.linkedin || '',
    },
  });

  const handleSubmit = (values: SettingsFormValues) => {
    onSubmit({
      ...values,
      // Filter out any empty social links
      facebook: values.facebook || undefined,
      instagram: values.instagram || undefined,
      twitter: values.twitter || undefined,
      linkedin: values.linkedin || undefined,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Informations de contact</h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de téléphone</FormLabel>
                  <FormControl>
                    <Input placeholder="+33 1 23 45 67 89" {...field} />
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
                  <FormLabel>Adresse email</FormLabel>
                  <FormControl>
                    <Input placeholder="contact@bazaart.org" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Avenue des Arts, 75001 Paris, France" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Réseaux sociaux</h2>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input placeholder="https://facebook.com/bazaart" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input placeholder="https://instagram.com/bazaart" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <Input placeholder="https://twitter.com/bazaart" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <Input placeholder="https://linkedin.com/company/bazaart" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button type="submit">Enregistrer les modifications</Button>
        </div>
      </form>
    </Form>
  );
};

export default SettingsForm;
