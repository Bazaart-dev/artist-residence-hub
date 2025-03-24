
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Users, FileText, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const AdminHome = () => {
  const [stats, setStats] = useState({
    projects: 12,
    events: 8,
    visitors: 1243,
    registrations: 87
  });
  
  const [progressValue, setProgressValue] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setProgressValue(72), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-display font-bold">Tableau de bord</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-gray-500">
            <Clock size={14} className="inline mr-1" /> 
            Dernière mise à jour: {new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </div>
          <Button 
            size="sm"
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Actualiser
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700 flex items-center justify-between">
                Projets <FileText size={18} className="text-bazaart-pink" />
              </CardTitle>
              <CardDescription>Total des projets publiés</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.projects}</div>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="text-xs text-green-600">+2 ce mois-ci</div>
            </CardFooter>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700 flex items-center justify-between">
                Événements <Calendar size={18} className="text-bazaart-salmon" />
              </CardTitle>
              <CardDescription>Événements à venir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.events}</div>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="text-xs text-amber-600">1 cette semaine</div>
            </CardFooter>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700 flex items-center justify-between">
                Visiteurs <Users size={18} className="text-bazaart-blue" />
              </CardTitle>
              <CardDescription>Visites ce mois-ci</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.visitors}</div>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="text-xs text-green-600">+18% vs mois dernier</div>
            </CardFooter>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700 flex items-center justify-between">
                Inscriptions <BarChart2 size={18} className="text-purple-500" />
              </CardTitle>
              <CardDescription>Inscriptions aux événements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.registrations}</div>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="text-xs text-green-600">+12 cette semaine</div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
              <CardDescription>
                Les 5 dernières actions effectuées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  { action: 'Nouvel événement créé', user: 'Admin', time: 'Il y a 2 heures', icon: <Calendar size={16} className="text-bazaart-salmon" /> },
                  { action: 'Page d\'accueil modifiée', user: 'Admin', time: 'Il y a 5 heures', icon: <FileText size={16} className="text-bazaart-pink" /> },
                  { action: '3 nouvelles inscriptions', user: 'Système', time: 'Hier, 15:45', icon: <Users size={16} className="text-bazaart-blue" /> },
                  { action: 'Nouveau projet publié', user: 'Admin', time: 'Hier, 11:32', icon: <FileText size={16} className="text-bazaart-pink" /> },
                  { action: '2 nouvelles images ajoutées', user: 'Admin', time: '12/05/2023', icon: <FileText size={16} className="text-bazaart-pink" /> },
                ].map((item, index) => (
                  <li key={index} className="flex justify-between items-start pb-2 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.action}</span>
                    </div>
                    <div className="text-sm text-gray-500 flex flex-col items-end">
                      <span>{item.user}</span>
                      <span>{item.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm">Voir tout l'historique</Button>
            </CardFooter>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Performance du site</CardTitle>
              <CardDescription>Analyse des performances actuelles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Vitesse de chargement</span>
                  <span className="text-sm text-gray-500">72%</span>
                </div>
                <Progress value={progressValue} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Taux de conversion</span>
                  <span className="text-sm text-gray-500">2.4%</span>
                </div>
                <Progress value={24} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Taux de rebond</span>
                  <span className="text-sm text-gray-500">38%</span>
                </div>
                <Progress value={38} className="h-2" />
              </div>
              
              <div className="pt-4">
                <div className="text-sm font-medium mb-2">Trafic par source</div>
                <ul className="space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span>Direct</span>
                    <span className="font-medium">45%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Social</span>
                    <span className="font-medium">32%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Recherche</span>
                    <span className="font-medium">18%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Autres</span>
                    <span className="font-medium">5%</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminHome;
