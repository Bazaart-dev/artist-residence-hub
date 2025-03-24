
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Search, Filter, Eye } from 'lucide-react';
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

interface Project {
  id: number;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  date: string;
  author: string;
}

const projectsData: Project[] = [
  { id: 1, title: 'Bazaart Club', slug: 'bazaart-club', status: 'published', date: '15/04/2023', author: 'Admin' },
  { id: 2, title: 'Bazaart Home', slug: 'bazaart-home', status: 'published', date: '23/05/2023', author: 'Admin' },
  { id: 3, title: 'Bazaart Design', slug: 'bazaart-design', status: 'published', date: '07/07/2023', author: 'Admin' },
  { id: 4, title: 'Bazaart Food', slug: 'bazaart-food', status: 'draft', date: '18/08/2023', author: 'Admin' },
  { id: 5, title: 'Bazaart Lab', slug: 'bazaart-lab', status: 'published', date: '30/09/2023', author: 'Admin' },
  { id: 6, title: 'Collaboration artistique internationale', slug: 'collab-artistique', status: 'draft', date: '12/10/2023', author: 'Admin' },
  { id: 7, title: 'Festival des cultures urbaines', slug: 'festival-cultures-urbaines', status: 'published', date: '05/11/2023', author: 'Admin' },
  { id: 8, title: 'Résidence d\'artistes 2024', slug: 'residence-artistes-2024', status: 'draft', date: '20/12/2023', author: 'Admin' },
];

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>(projectsData);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) || 
                          project.slug.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: number) => {
    setProjects(prev => prev.filter(project => project.id !== id));
    toast.success("Projet supprimé avec succès");
  };

  const handleEdit = (id: number) => {
    toast.info(`Modification du projet #${id}`);
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
        <h1 className="text-3xl font-display font-bold">Projets</h1>
        <Button className="bg-bazaart-pink hover:bg-bazaart-salmon text-bazaart-black">
          <Plus size={16} className="mr-2" /> Nouveau projet
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Liste des projets</CardTitle>
          <CardDescription>
            Gérez vos projets et leurs informations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                className="pl-10" 
                placeholder="Rechercher un projet..." 
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
                <DropdownMenuItem onClick={() => setStatusFilter('all')} className={statusFilter === 'all' ? 'bg-gray-100' : ''}>
                  Tous les statuts
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setStatusFilter('published')} className={statusFilter === 'published' ? 'bg-gray-100' : ''}>
                  Publié
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter('draft')} className={statusFilter === 'draft' ? 'bg-gray-100' : ''}>
                  Brouillon
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Auteur</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      Aucun projet trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell>{project.slug}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          project.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {project.status === 'published' ? 'Publié' : 'Brouillon'}
                        </span>
                      </TableCell>
                      <TableCell>{project.date}</TableCell>
                      <TableCell>{project.author}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => window.open(`/projets/${project.slug}`, '_blank')}>
                            <Eye size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(project.id)}>
                            <Edit size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(project.id)}>
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
            Affichage de {filteredProjects.length} sur {projects.length} projets
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AdminProjects;
