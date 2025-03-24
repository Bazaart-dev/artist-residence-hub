
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Trash, Search, Filter, Image, File, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MediaItem {
  id: number;
  type: 'image' | 'document';
  name: string;
  url: string;
  size: string;
  date: string;
  thumbnail?: string;
}

const mediaData: MediaItem[] = [
  { 
    id: 1, 
    type: 'image', 
    name: 'hero-image.jpg', 
    url: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69', 
    size: '1.2 MB', 
    date: '15/04/2023',
    thumbnail: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  },
  { 
    id: 2, 
    type: 'document', 
    name: 'programme.pdf', 
    url: '/documents/programme.pdf', 
    size: '450 KB', 
    date: '18/05/2023' 
  },
  { 
    id: 3, 
    type: 'image', 
    name: 'event-poster.jpg', 
    url: 'https://images.unsplash.com/photo-1607457661771-2a4b797d600f', 
    size: '890 KB', 
    date: '22/06/2023',
    thumbnail: 'https://images.unsplash.com/photo-1607457661771-2a4b797d600f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  },
  { 
    id: 4, 
    type: 'image', 
    name: 'gallery-01.jpg', 
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819', 
    size: '1.5 MB', 
    date: '30/06/2023',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  },
  { 
    id: 5, 
    type: 'document', 
    name: 'rapport-2023.pdf', 
    url: '/documents/rapport-2023.pdf', 
    size: '2.3 MB', 
    date: '15/07/2023' 
  },
  { 
    id: 6, 
    type: 'image', 
    name: 'team-photo.jpg', 
    url: 'https://images.unsplash.com/photo-1576280314498-31e7c50af242', 
    size: '950 KB', 
    date: '08/08/2023',
    thumbnail: 'https://images.unsplash.com/photo-1576280314498-31e7c50af242?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  },
  { 
    id: 7, 
    type: 'image', 
    name: 'exhibition.jpg', 
    url: 'https://images.unsplash.com/photo-1541417904950-b855846fe074', 
    size: '1.1 MB', 
    date: '20/09/2023',
    thumbnail: 'https://images.unsplash.com/photo-1541417904950-b855846fe074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
  },
  { 
    id: 8, 
    type: 'document', 
    name: 'contrat-type.docx', 
    url: '/documents/contrat-type.docx', 
    size: '68 KB', 
    date: '15/10/2023' 
  },
];

const AdminMedia = () => {
  const [media, setMedia] = useState<MediaItem[]>(mediaData);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'document'>('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const handleDelete = (id: number) => {
    setMedia(prev => prev.filter(item => item.id !== id));
    toast.success("Fichier supprimé avec succès");
  };

  const handleUpload = () => {
    toast.info("Fonctionnalité d'upload à implémenter");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
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
        <Button className="bg-bazaart-pink hover:bg-bazaart-salmon text-bazaart-black" onClick={handleUpload}>
          <Upload size={16} className="mr-2" /> Importer des fichiers
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Bibliothèque de médias</CardTitle>
          <CardDescription>
            Gérez les images et documents utilisés sur le site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                className="pl-10" 
                placeholder="Rechercher un fichier..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter size={16} />
                    <span>Type</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setTypeFilter('all')} className={typeFilter === 'all' ? 'bg-gray-100' : ''}>
                    Tous les fichiers
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
              
              <div className="flex border rounded-md overflow-hidden">
                <button 
                  className={`px-3 py-1.5 ${view === 'grid' ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`}
                  onClick={() => setView('grid')}
                >
                  <Settings size={16} />
                </button>
                <button 
                  className={`px-3 py-1.5 ${view === 'list' ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`}
                  onClick={() => setView('list')}
                >
                  <Settings size={16} />
                </button>
              </div>
            </div>
          </div>

          {view === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredMedia.length === 0 ? (
                <div className="col-span-full text-center py-10 text-gray-500">
                  Aucun fichier trouvé
                </div>
              ) : (
                filteredMedia.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="group relative border rounded-md overflow-hidden bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-white hover:bg-white/20"
                        onClick={() => window.open(item.url, '_blank')}
                      >
                        <Settings size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-white hover:bg-white/20"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                    
                    <div className="h-24 bg-gray-100 flex items-center justify-center">
                      {item.type === 'image' ? (
                        <img 
                          src={item.thumbnail || item.url} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <File size={32} className="text-gray-400" />
                      )}
                    </div>
                    
                    <div className="p-2">
                      <div className="text-xs font-medium truncate" title={item.name}>
                        {item.name}
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{item.size}</span>
                        <span>{item.type === 'image' ? <Image size={12} /> : <File size={12} />}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          ) : (
            <div className="border rounded-md divide-y">
              {filteredMedia.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  Aucun fichier trouvé
                </div>
              ) : (
                filteredMedia.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="flex items-center px-4 py-3 hover:bg-gray-50"
                  >
                    <div className="w-10 h-10 mr-3 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                      {item.type === 'image' ? (
                        <img 
                          src={item.thumbnail || item.url} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <File size={20} className="text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.date} · {item.size}</div>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => window.open(item.url, '_blank')}
                      >
                        <Settings size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Affichage de {filteredMedia.length} sur {media.length} fichiers
          </div>
          <div className="text-sm text-gray-500">
            Espace total utilisé: 8.4 MB
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AdminMedia;
