
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Search, Filter, Calendar, Clock, MapPin, Users, ArrowRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  category: 'atelier' | 'exposition' | 'performance' | 'autre';
  capacity: string;
  registrations: number;
}

const eventsData: Event[] = [
  {
    id: 1,
    title: "Exposition: Arts Numériques Contemporains",
    date: "12 juin 2023",
    location: "Galerie Bazaart, Paris",
    category: "exposition",
    capacity: "100 personnes",
    registrations: 68
  },
  {
    id: 2,
    title: "Atelier: Initiation à la Sérigraphie",
    date: "20 juin 2023",
    location: "Studio Bazaart, Lyon",
    category: "atelier",
    capacity: "15 personnes",
    registrations: 12
  },
  {
    id: 3,
    title: "Performance: Danse Contemporaine & Mapping Vidéo",
    date: "8 juillet 2023",
    location: "Théâtre de la Lumière, Marseille",
    category: "performance",
    capacity: "200 personnes",
    registrations: 142
  },
  {
    id: 4,
    title: "Atelier: Création de Fanzines",
    date: "15 juillet 2023",
    location: "Médiathèque Centrale, Bordeaux",
    category: "atelier",
    capacity: "20 personnes",
    registrations: 15
  },
  {
    id: 5,
    title: "Exposition: Photographie Urbaine",
    date: "3 août 2023",
    location: "Centre d'Art Contemporain, Toulouse",
    category: "exposition",
    capacity: "150 personnes",
    registrations: 87
  }
];

const AdminEvents = () => {
  const [events, setEvents] = useState<Event[]>(eventsData);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'atelier' | 'exposition' | 'performance' | 'autre'>('all');

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase()) || 
                          event.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: number) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    toast.success("Événement supprimé avec succès");
  };

  const handleEdit = (id: number) => {
    toast.info(`Modification de l'événement #${id}`);
    // Implémentation de l'édition à venir
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
        <h1 className="text-3xl font-display font-bold">Événements</h1>
        <Button className="bg-bazaart-pink hover:bg-bazaart-salmon text-bazaart-black">
          <Plus size={16} className="mr-2" /> Nouvel événement
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Liste des événements</CardTitle>
          <CardDescription>
            Gérez vos événements et suivez les inscriptions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                className="pl-10" 
                placeholder="Rechercher un événement..." 
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
                <DropdownMenuItem onClick={() => setCategoryFilter('all')} className={categoryFilter === 'all' ? 'bg-gray-100' : ''}>
                  Toutes les catégories
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setCategoryFilter('atelier')} className={categoryFilter === 'atelier' ? 'bg-gray-100' : ''}>
                  Ateliers
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter('exposition')} className={categoryFilter === 'exposition' ? 'bg-gray-100' : ''}>
                  Expositions
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter('performance')} className={categoryFilter === 'performance' ? 'bg-gray-100' : ''}>
                  Performances
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter('autre')} className={categoryFilter === 'autre' ? 'bg-gray-100' : ''}>
                  Autres
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Lieu</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Inscriptions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      Aucun événement trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.title}</TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          event.category === 'atelier' ? 'bg-bazaart-blue/20 text-bazaart-blue' : 
                          event.category === 'exposition' ? 'bg-bazaart-pink/20 text-bazaart-pink' : 
                          event.category === 'performance' ? 'bg-bazaart-salmon/20 text-bazaart-salmon' : 
                          'bg-gray-200 text-gray-800'
                        }`}>
                          {event.category === 'atelier' ? 'Atelier' : 
                          event.category === 'exposition' ? 'Exposition' : 
                          event.category === 'performance' ? 'Performance' : 
                          'Autre'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{event.registrations}/{event.capacity.split(' ')[0]}</span>
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-bazaart-pink rounded-full"
                              style={{ width: `${(event.registrations / parseInt(event.capacity.split(' ')[0])) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => window.open(`/evenements`, '_blank')}>
                            <Eye size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(event.id)}>
                            <Edit size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(event.id)}>
                            <Trash size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            Affichage de {filteredEvents.length} sur {events.length} événements
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AdminEvents;
