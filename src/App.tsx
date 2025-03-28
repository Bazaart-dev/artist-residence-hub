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

import AdminLayout from './admin/AdminLayout';
import AdminAuthWrapper from './components/AdminAuthWrapper';


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
          <Route path="/admin" element={<AdminAuthWrapper><AdminLayout /></AdminAuthWrapper>}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
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
