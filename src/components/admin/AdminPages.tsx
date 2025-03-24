
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Search, Calendar, Eye, FileText } from 'lucide-react';
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

interface Page {
  id: number;
  title: string;
  slug: string;
  lastModified: string;
  author: string;
}

const pagesData: Page[] = [
  { id: 1, title: 'Accueil', slug: '/', lastModified: '12/05/2023', author: 'Admin' },
  { id: 2, title: 'Présentation', slug: '/presentation', lastModified: '18/06/2023', author: 'Admin' },
  { id: 3, title: 'Projets', slug: '/projets', lastModified: '05/07/2023', author: 'Admin' },
  { id: 4, title: 'Événements', slug: '/evenements', lastModified: '22/08/2023', author: 'Admin' },
  { id: 5, title: 'Contact', slug: '/contact', lastModified: '15/09/2023', author: 'Admin' },
  { id: 6, title: 'Mentions légales', slug: '/mentions-legales', lastModified: '10/04/2023', author: 'Admin' },
  { id: 7, title: 'Politique de confidentialité', slug: '/politique-de-confidentialite', lastModified: '10/04/2023', author: 'Admin' },
];

const AdminPages = () => {
  const [pages, setPages] = useState<Page[]>(pagesData);
  const [search, setSearch] = useState('');

  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(search.toLowerCase()) || 
    page.slug.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (id <= 5) {
      toast.error("Les pages principales ne peuvent pas être supprimées");
      return;
    }
    setPages(prev => prev.filter(page => page.id !== id));
    toast.success("Page supprimée avec succès");
  };

  const handleEdit = (id: number) => {
    toast.info(`Modification de la page #${id}`);
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
        <h1 className="text-3xl font-display font-bold">Pages</h1>
        <Button className="bg-bazaart-pink hover:bg-bazaart-salmon text-bazaart-black">
          <Plus size={16} className="mr-2" /> Nouvelle page
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Liste des pages</CardTitle>
          <CardDescription>
            Gérez les pages du site et leur contenu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                className="pl-10" 
                placeholder="Rechercher une page..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Dernière modification</TableHead>
                  <TableHead>Auteur</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                      Aucune page trouvée
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPages.map((page) => (
                    <TableRow key={page.id} className={page.id <= 5 ? 'bg-gray-50' : ''}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText size={16} className="text-gray-400" />
                          {page.title}
                        </div>
                      </TableCell>
                      <TableCell><code className="bg-gray-100 px-1 py-0.5 rounded text-xs">{page.slug}</code></TableCell>
                      <TableCell>{page.lastModified}</TableCell>
                      <TableCell>{page.author}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => window.open(page.slug, '_blank')}>
                            <Eye size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(page.id)}>
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className={page.id <= 5 ? 'text-gray-300 cursor-not-allowed' : 'text-red-500'}
                            onClick={() => handleDelete(page.id)}
                            disabled={page.id <= 5}
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
            Affichage de {filteredPages.length} sur {pages.length} pages
          </div>
          <div className="text-sm text-gray-500 italic">
            Les pages sur fond gris sont des pages principales et ne peuvent pas être supprimées.
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AdminPages;
