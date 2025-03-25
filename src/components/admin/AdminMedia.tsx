
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Trash, Search, Filter, Eye, Image as ImageIcon, File, Download } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSite, MediaItem } from '@/contexts/SiteContext';
import MediaUploadDialog from './MediaUploadDialog';

const MediaDetails = ({ item, onDelete }: { item: MediaItem; onDelete: () => void }) => {
  return (
    <div className="space-y-6">
      {item.type === 'image' && (
        <div className="rounded-lg overflow-hidden">
          <img 
            src={item.url} 
            alt={item.name} 
            className="w-full h-auto max-h-80 object-contain bg-gray-100"
          />
        </div>
      )}
      
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-bold text-ellipsis overflow-hidden">{item.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            item.type === 'image'
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-amber-100 text-amber-800'
          }`}>
            {item.type === 'image' ? 'Image' : 'Document'}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Taille</p>
            <p className="font-medium">{item.size}</p>
          </div>
          <div>
            <p className="text-gray-500">Date</p>
            <p className="font-medium">{item.date}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-500">URL</p>
            <p className="font-medium text-xs break-all">{item.url}</p>
          </div>
        </div>
        
        <div className="flex gap-4 pt-4">
          <Button 
            className="flex-1"
            onClick={() => window.open(item.url, '_blank')}
          >
            <Eye size={16} className="mr-2" /> Voir
          </Button>
          <a 
            href={item.url}
            download={item.name}
            target="_blank"
            className="flex-1"
          >
            <Button 
              variant="outline" 
              className="w-full"
            >
              <Download size={16} className="mr-2" /> Télécharger
            </Button>
          </a>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
          onClick={onDelete}
        >
          <Trash size={16} className="mr-2" /> Supprimer
        </Button>
      </div>
    </div>
  );
};

const AdminMedia = () => {
  const { data, deleteMedia } = useSite();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(data.media);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'document'>('all');
  
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [mediaToDelete, setMediaToDelete] = useState<number | null>(null);

  // Filter media items
  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const handleOpenDetailDialog = (item: MediaItem) => {
    setSelectedMedia(item);
    setIsDetailDialogOpen(true);
  };

  const handleOpenDeleteDialog = (id: number) => {
    setMediaToDelete(id);
    setIsDeleteDialogOpen(true);
    setIsDetailDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (mediaToDelete) {
      deleteMedia(mediaToDelete);
      setMediaItems(prev => prev.filter(item => item.id !== mediaToDelete));
      toast.success("Fichier supprimé avec succès");
      setIsDeleteDialogOpen(false);
      setMediaToDelete(null);
    }
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-display font-bold">Médiathèque</h1>
        <Button 
          className="bg-bazaart-pink hover:bg-bazaart-salmon text-bazaart-black"
          onClick={() => setIsUploadDialogOpen(true)}
        >
          <Upload size={16} className="mr-2" /> Importer des fichiers
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Bibliothèque de médias</CardTitle>
          <CardDescription>
            Gérez vos images et documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                className="pl-10" 
                placeholder="Rechercher un média..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter size={16} />
                  <span>Filtrer</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setTypeFilter('all')} className={typeFilter === 'all' ? 'bg-gray-100' : ''}>
                  Tous les types
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTypeFilter('image')} className={typeFilter === 'image' ? 'bg-gray-100' : ''}>
                  Images
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter('document')} className={typeFilter === 'document' ? 'bg-gray-100' : ''}>
                  Documents
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {filteredMedia.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <div className="flex flex-col items-center">
                <ImageIcon size={48} className="text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucun média trouvé</h3>
                <p className="text-sm text-gray-500 mb-4">Commencez par importer une image ou un document</p>
                <Button 
                  variant="outline" 
                  onClick={() => setIsUploadDialogOpen(true)}
                >
                  Importer des fichiers
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredMedia.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="group relative border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-all"
                  onClick={() => handleOpenDetailDialog(item)}
                >
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    {item.type === 'image' ? (
                      <img 
                        src={item.thumbnail || item.url} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 text-center">
                        <File size={32} className="text-amber-500 mb-2" />
                        <span className="text-xs font-medium truncate max-w-full">{item.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="rounded-full bg-white text-black border-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDetailDialog(item);
                      }}
                    >
                      <Eye size={16} />
                    </Button>
                  </div>
                  <div className="p-2">
                    <h3 className="text-xs truncate">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Affichage de {filteredMedia.length} sur {mediaItems.length} médias
          </div>
        </CardFooter>
      </Card>

      <MediaUploadDialog
        open={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
      />

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Détails du média</DialogTitle>
            <DialogDescription>
              Consultez les informations et effectuez des actions sur ce fichier
            </DialogDescription>
          </DialogHeader>
          {selectedMedia && (
            <MediaDetails
              item={selectedMedia}
              onDelete={() => handleOpenDeleteDialog(selectedMedia.id)}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce fichier ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Le fichier sera définitivement supprimé.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-500 hover:bg-red-600">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default AdminMedia;
