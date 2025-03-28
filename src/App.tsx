import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SiteProvider } from './contexts/SiteContext';
import { Toaster } from '@/components/ui/sonner';
import Index from './pages/index';
import Contact from './pages/Contact';
import Admin from './pages/admin';
import Presentation from './pages/presentation';
import Projets from './pages/projets';
import Evenements from './pages/evenements';

import AdminLayout from './admin/AdminLayout';
import AdminAuthWrapper from './components/AdminAuthWrapper';


function App() {
  return (
    <SiteProvider>
      <Router>
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<index />} />
          <Route path="/contact" element={<contact />} />
          <Route path="/presentation" element={<presentation />} />
          <Route path="/projets" element={<projets />} />
          <Route path="/evenements" element={<evenements />} />
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
