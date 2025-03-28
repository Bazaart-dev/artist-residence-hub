import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SiteProvider } from './contexts/SiteContext';
import { Toaster } from '@/components/ui/sonner';
import Index from './pages/Index';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Presentation from './pages/Presentation';
import Projets from './pages/Projets';
import Evenements from './pages/Evenements';

import AdminLayout from './components/AdminLayout';
import AdminAuthWrapper from './components/AdminAuthWrapper';
import SecuritySettings from '@/components/admin/SecuritySettings';
import AppearanceSettings from '@/components/admin/AppearanceSettings';
import AdminProjetcs from '@/components/admin/AdminProjects';


function App() {
  return (
    <SiteProvider>
      <Router>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/presentation" element={<Presentation />} />
          <Route path="/projets" element={<Projets />} />
          <Route path="/evenements" element={<Evenements />} />
            <Route path="/login" element={<LoginPage />} />


          {/* Routes admin protégées */}
          <Route path="/admin" element={
          <AdminAuthWrapper>
            <AdminLayout />
          </AdminAuthWrapper>
          }
            >
            <Route index element={<Admin />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="login" element={<AdminLogin />} />
            <Route path="home" element={<AdminHome />} />
            <Route path="media" element={<AdminMedia />} />            
            <Route path="pages" element={<AdminPages />} />
            <Route path="projets" element={<AdminProjects />} />
            <Route path="appearance" element={<AppearanceSettings />} />
            <Route path="security" element={<SecuritySettings />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Route 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Router>
    </SiteProvider>
  );
}

export default App;
