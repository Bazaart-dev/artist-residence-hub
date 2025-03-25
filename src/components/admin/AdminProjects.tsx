
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import ProjectForm from './forms/ProjectForm';
import { useSite, Project } from '@/contexts/SiteContext';

const ProjectDetails = ({ project, onEdit, onDelete }: { project: Project; onEdit: () => void; onDelete: () => void }) => {
  return (
    <div className="space-y-6">
      <div className="aspect-video overflow-hidden rounded-lg">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-bold">{project.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            project.status === 'published' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-amber-100 text-amber-800'
          }`}>
            {project.status === 'published' ? 'Publié' : 'Brouillon'}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Slug</p>
            <p className="font-medium">{project.slug}</p>
          </div>
          <div>
            <p className="text-gray-500">Date</p>
            <p className="font-medium">{project.date}</p>
          </div>
          <div>
            <p className="text-gray-500">Auteur</p>
            <p className="font-medium">{project.author}</p>
          </div>
          <div>
            <p className="text-gray-500">Catégorie</p>
            <p className="font-medium">{project.category}</p>
          </div>
        </div>
        
        <div>
          <p className="text-gray-500">Description</p>
          <p className="mt-1">{project.description}</p>
        </div>
        
        <div className="flex gap-4 pt-4">
          <Button 
            className="flex-1 bg-bazaart-pink hover:bg-bazaart-salmon text-bazaart-black"
            onClick={onEdit}
          >
            <Edit size={16} className="mr-2" /> Modifier
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            onClick={onDelete}
          >
            <Trash size={16} className="mr-2" /> Supprimer
          </Button>
        </div>
      </div>
    </div>
  );
};

const AdminProjects = () => {
  const { data, addProject, updateProject, deleteProject } = useSite();
  const [projects, setProjects] = useState<Project[]>(data.projects);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | undefined>(undefined);
  
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);
  
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [projectDetail, setProjectDetail] = useState<Project | null>(null);

  useState(() => {
    setProjects(data.projects);
  });

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) || 
                          project.slug.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleOpenNewProjectForm = () => {
    setCurrentProject(undefined);
    setIsEditMode(false);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (project: Project) => {
    setCurrentProject(project);
    setIsEditMode(true);
    setIsFormOpen(true);
    setIsDetailDialogOpen(false);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleFormSubmit = (formData: Omit<Project, 'id' | 'author'>) => {
    if (isEditMode && currentProject) {
      const updatedProject = {
        ...currentProject,
        ...formData,
      };
      updateProject(updatedProject);
      setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
      toast.success("Projet modifié avec succès");
    } else {
      const newProject = {
        ...formData,
        id: Math.max(0, ...projects.map(p => p.id)) + 1,
        author: 'Admin',
      };
      addProject(newProject);
      setProjects(prev => [...prev, newProject]);
      toast.success("Projet créé avec succès");
    }
    setIsFormOpen(false);
  };

  const handleOpenDeleteDialog = (id: number) => {
    setProjectToDelete(id);
    setIsDeleteDialogOpen(true);
    setIsDetailDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (projectToDelete) {
      deleteProject(projectToDelete);
      setProjects(prev => prev.filter(project => project.id !== projectToDelete));
      toast.success("Projet supprimé avec succès");
      setIsDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };
  
  const handleOpenDetailDialog = (project: Project) => {
    setProjectDetail(project);
    setIsDetailDialogOpen(true);
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
        <Button 
          className="bg-bazaart-pink hover:bg-bazaart-salmon text-bazaart-black"
          onClick={handleOpenNewProjectForm}
        >
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

          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead className="hidden md:table-cell">Slug</TableHead>
                  <TableHead className="hidden md:table-cell">Statut</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="hidden md:table-cell">Auteur</TableHead>
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
                      <TableCell className="hidden md:table-cell">{project.slug}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          project.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {project.status === 'published' ? 'Publié' : 'Brouillon'}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{project.date}</TableCell>
                      <TableCell className="hidden md:table-cell">{project.author}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleOpenDetailDialog(project)}
                            title="Aperçu"
                          >
                            <Eye size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleOpenEditForm(project)}
                            title="Modifier"
                            className="hidden sm:inline-flex"
                          >
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500 hidden sm:inline-flex" 
                            onClick={() => handleOpenDeleteDialog(project.id)}
                            title="Supprimer"
                          >
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

      <ProjectForm 
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        project={currentProject}
        isEdit={isEditMode}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce projet ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Le projet sera définitivement supprimé.
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
      
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Détails du projet</DialogTitle>
            <DialogDescription>
              Consultez les détails du projet et effectuez des actions
            </DialogDescription>
          </DialogHeader>
          {projectDetail && (
            <ProjectDetails
              project={projectDetail}
              onEdit={() => handleOpenEditForm(projectDetail)}
              onDelete={() => handleOpenDeleteDialog(projectDetail.id)}
            />
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default AdminProjects;
