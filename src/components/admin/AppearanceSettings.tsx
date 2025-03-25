
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save, Palette, RefreshCw, Type, Layout } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSite } from '@/contexts/SiteContext';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

const ColorPicker = ({ 
  label, 
  value, 
  onChange, 
  variable 
}: { 
  label: string; 
  value: string; 
  onChange: (value: string) => void; 
  variable: string;
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={variable}>{label}</Label>
        <div className="flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded-full border"
            style={{ backgroundColor: value }}
          ></div>
          <input
            type="color"
            id={variable}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-10 h-10 cursor-pointer appearance-none bg-transparent border-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch]:rounded-full"
          />
        </div>
      </div>
      <div className="flex gap-2 items-center justify-between">
        <div className="text-xs text-gray-500">{variable}</div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="px-2 py-1 border rounded text-xs w-20 text-center"
        />
      </div>
    </div>
  );
};

const AppearanceSettings = () => {
  const { data } = useSite();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [colorScheme, setColorScheme] = useState("custom");
  const [borderRadius, setBorderRadius] = useState(8);
  const [customFonts, setCustomFonts] = useState(false);
  
  const [colors, setColors] = useState({
    primary: "#FF6B6B",        // Bazaart Pink
    secondary: "#4ECDC4",      // Bazaart Blue
    accent: "#FFE66D",         // Bazaart Yellow
    background: "#FFFFFF",
    text: "#1A1A1A",
    header: "#F7FFF7",
    footer: "#1A1A1A",
    button: "#FF6B6B",
    buttonText: "#FFFFFF",
    error: "#FF0000"
  });

  const handleColorChange = (key: string) => (value: string) => {
    setColors(prev => ({ ...prev, [key]: value }));
  };

  const applyColorScheme = (scheme: string) => {
    setColorScheme(scheme);
    
    switch(scheme) {
      case "light":
        setColors({
          primary: "#FF6B6B",
          secondary: "#4ECDC4",
          accent: "#FFE66D",
          background: "#FFFFFF",
          text: "#1A1A1A",
          header: "#F7FFF7",
          footer: "#1A1A1A",
          button: "#FF6B6B",
          buttonText: "#FFFFFF",
          error: "#FF0000"
        });
        break;
      case "dark":
        setColors({
          primary: "#FF6B6B",
          secondary: "#4ECDC4",
          accent: "#FFE66D",
          background: "#1A1A1A",
          text: "#F7FFF7",
          header: "#272727",
          footer: "#272727",
          button: "#FF6B6B",
          buttonText: "#FFFFFF",
          error: "#FF5252"
        });
        break;
      case "pastel":
        setColors({
          primary: "#FFAFCC",
          secondary: "#A2D2FF",
          accent: "#CDB4DB",
          background: "#FFF1E6",
          text: "#594A4E",
          header: "#FFC8DD",
          footer: "#594A4E",
          button: "#FFAFCC",
          buttonText: "#594A4E",
          error: "#FF5252"
        });
        break;
      case "monochrome":
        setColors({
          primary: "#4A4A4A",
          secondary: "#757575",
          accent: "#BDBDBD",
          background: "#F5F5F5",
          text: "#212121",
          header: "#E0E0E0",
          footer: "#212121",
          button: "#4A4A4A",
          buttonText: "#FFFFFF",
          error: "#D32F2F"
        });
        break;
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Apply CSS variables
    const root = document.documentElement;
    
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    root.style.setProperty('--border-radius', `${borderRadius}px`);
    
    // Simulate saving
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Apparence mise à jour avec succès", {
        description: "Les changements ont été appliqués à votre site."
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
      className="space-y-8"
    >
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Palette size={20} />
          <h3 className="text-xl font-semibold">Thème de couleurs</h3>
        </div>
        
        <RadioGroup
          value={colorScheme}
          onValueChange={applyColorScheme}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div>
            <RadioGroupItem 
              value="light" 
              id="light"
              className="peer sr-only"
            />
            <Label
              htmlFor="light"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <div className="flex items-center justify-center w-10 h-10 mb-2 rounded-full bg-gray-100">
                <span className="text-lg">☀️</span>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold">Clair</div>
                <div className="text-xs text-muted-foreground">Fond clair, texte foncé</div>
              </div>
            </Label>
          </div>
          
          <div>
            <RadioGroupItem 
              value="dark" 
              id="dark"
              className="peer sr-only"
            />
            <Label
              htmlFor="dark"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <div className="flex items-center justify-center w-10 h-10 mb-2 rounded-full bg-gray-100">
                <span className="text-lg">🌙</span>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold">Sombre</div>
                <div className="text-xs text-muted-foreground">Fond foncé, texte clair</div>
              </div>
            </Label>
          </div>
          
          <div>
            <RadioGroupItem 
              value="pastel" 
              id="pastel"
              className="peer sr-only"
            />
            <Label
              htmlFor="pastel"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <div className="flex items-center justify-center w-10 h-10 mb-2 rounded-full bg-gray-100">
                <span className="text-lg">🎨</span>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold">Pastel</div>
                <div className="text-xs text-muted-foreground">Couleurs douces et claires</div>
              </div>
            </Label>
          </div>
          
          <div>
            <RadioGroupItem 
              value="monochrome" 
              id="monochrome"
              className="peer sr-only"
            />
            <Label
              htmlFor="monochrome"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <div className="flex items-center justify-center w-10 h-10 mb-2 rounded-full bg-gray-100">
                <span className="text-lg">⚪</span>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold">Monochrome</div>
                <div className="text-xs text-muted-foreground">Tons de gris élégants</div>
              </div>
            </Label>
          </div>
          
          <div>
            <RadioGroupItem 
              value="custom" 
              id="custom"
              className="peer sr-only"
            />
            <Label
              htmlFor="custom"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-100 hover:text-gray-900 peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <div className="flex items-center justify-center w-10 h-10 mb-2 rounded-full bg-gray-100">
                <span className="text-lg">🔧</span>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold">Personnalisé</div>
                <div className="text-xs text-muted-foreground">Définir vos propres couleurs</div>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </motion.div>
      
      <motion.div variants={itemVariants} className="space-y-4 pt-4 border-t">
        <div className="flex items-center gap-2 mb-4">
          <Layout size={20} />
          <h3 className="text-xl font-semibold">Style d'interface</h3>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Arrondi des coins</Label>
              <span className="text-sm">{borderRadius}px</span>
            </div>
            <Slider
              value={[borderRadius]}
              min={0}
              max={20}
              step={1}
              onValueChange={(value) => setBorderRadius(value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Carré</span>
              <span>Arrondi</span>
              <span>Circulaire</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="customFonts" className="flex items-center gap-2">
                <Type size={16} />
                <span>Utiliser des polices personnalisées</span>
              </Label>
              <p className="text-xs text-muted-foreground ml-7">
                Ceci permet d'utiliser des polices web personnalisées au lieu des polices système
              </p>
            </div>
            <Switch
              id="customFonts"
              checked={customFonts}
              onCheckedChange={setCustomFonts}
            />
          </div>
        </div>
      </motion.div>
      
      {colorScheme === "custom" && (
        <motion.div variants={itemVariants} className="space-y-4 pt-4 border-t">
          <div className="flex items-center gap-2 mb-4">
            <Palette size={20} />
            <h3 className="text-xl font-semibold">Couleurs personnalisées</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ColorPicker 
              label="Couleur primaire" 
              value={colors.primary} 
              onChange={handleColorChange('primary')}
              variable="--color-primary"
            />
            <ColorPicker 
              label="Couleur secondaire" 
              value={colors.secondary} 
              onChange={handleColorChange('secondary')}
              variable="--color-secondary"
            />
            <ColorPicker 
              label="Couleur d'accent" 
              value={colors.accent} 
              onChange={handleColorChange('accent')}
              variable="--color-accent"
            />
            <ColorPicker 
              label="Arrière-plan" 
              value={colors.background} 
              onChange={handleColorChange('background')}
              variable="--color-background"
            />
            <ColorPicker 
              label="Texte" 
              value={colors.text} 
              onChange={handleColorChange('text')}
              variable="--color-text"
            />
            <ColorPicker 
              label="En-tête" 
              value={colors.header} 
              onChange={handleColorChange('header')}
              variable="--color-header"
            />
            <ColorPicker 
              label="Pied de page" 
              value={colors.footer} 
              onChange={handleColorChange('footer')}
              variable="--color-footer"
            />
            <ColorPicker 
              label="Boutons" 
              value={colors.button} 
              onChange={handleColorChange('button')}
              variable="--color-button"
            />
            <ColorPicker 
              label="Texte des boutons" 
              value={colors.buttonText} 
              onChange={handleColorChange('buttonText')}
              variable="--color-buttonText"
            />
            <ColorPicker 
              label="Erreur" 
              value={colors.error} 
              onChange={handleColorChange('error')}
              variable="--color-error"
            />
          </div>
        </motion.div>
      )}
      
      <motion.div variants={itemVariants} className="pt-4">
        <Button 
          onClick={handleSubmit}
          className="w-full sm:w-auto bg-bazaart-pink hover:bg-bazaart-salmon text-bazaart-black"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <RefreshCw size={16} className="mr-2 animate-spin" />
              Application en cours...
            </>
          ) : (
            <>
              <Save size={16} className="mr-2" />
              Appliquer les changements
            </>
          )}
        </Button>
        <p className="text-xs text-gray-500 mt-2">
          Les changements seront appliqués immédiatement, mais seront réinitialisés au rechargement de la page
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AppearanceSettings;
