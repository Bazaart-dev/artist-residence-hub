
import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { Image, Upload, File, X } from 'lucide-react';
import { useSite, MediaItem } from '@/contexts/SiteContext';

type MediaUploadDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const MediaUploadDialog = ({ open, onOpenChange }: MediaUploadDialogProps) => {
  const { addMedia } = useSite();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Aucun fichier à importer");
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create media items from files
    const newMediaItems: MediaItem[] = files.map((file, index) => {
      const isImage = file.type.startsWith('image/');
      const date = new Date().toLocaleDateString('fr-FR');
      
      // Generate URL for preview
      const url = isImage 
        ? URL.createObjectURL(file)
        : '/documents/example.pdf'; // Fallback for non-image files
      
      return {
        id: Date.now() + index,
        type: isImage ? 'image' : 'document',
        name: file.name,
        url: url,
        size: `${(file.size / 1024).toFixed(0)} KB`,
        date: date,
        thumbnail: isImage ? URL.createObjectURL(file) : undefined
      };
    });
    
    // Add media items to context
    newMediaItems.forEach(item => {
      addMedia(item);
    });
    
    toast.success(`${files.length} fichier(s) importé(s) avec succès`);
    setFiles([]);
    setIsUploading(false);
    onOpenChange(false);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Importer des fichiers</DialogTitle>
          <DialogDescription>
            Importez des images ou des documents sur votre site
          </DialogDescription>
        </DialogHeader>
        
        <div 
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <Upload size={40} className="text-gray-400 mb-2" />
            <h3 className="text-lg font-medium mb-2">Glissez et déposez des fichiers ici</h3>
            <p className="text-sm text-gray-500 mb-4">ou cliquez pour parcourir vos fichiers</p>
            <Button type="button" variant="outline" onClick={e => { e.stopPropagation(); triggerFileInput(); }}>
              Parcourir
            </Button>
            <Input 
              type="file" 
              multiple 
              className="hidden" 
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>
        </div>
        
        {files.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Fichiers sélectionnés ({files.length})</h4>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    {file.type.startsWith('image/') ? (
                      <Image size={18} className="text-blue-500 mr-2" />
                    ) : (
                      <File size={18} className="text-amber-500 mr-2" />
                    )}
                    <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                    <span className="text-xs text-gray-500 ml-2">({(file.size / 1024).toFixed(0)} KB)</span>
                  </div>
                  <button 
                    className="text-gray-500 hover:text-red-500 transition-colors"
                    onClick={(e) => { e.stopPropagation(); handleRemoveFile(index); }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-end gap-2 mt-4">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isUploading}
          >
            Annuler
          </Button>
          <Button 
            onClick={handleUpload}
            disabled={files.length === 0 || isUploading}
            className="bg-bazaart-pink text-bazaart-black hover:bg-bazaart-salmon"
          >
            {isUploading ? 'Importation en cours...' : 'Importer'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaUploadDialog;
