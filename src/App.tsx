import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SiteProvider } from './contexts/SiteContext';
import { Toaster } from '@/components/ui/sonner';
import Index from './pages/Index';
import Admin from './pages/Admin';
import AdminAuthWrapper from './components/AdminAuthWrapper';

function App() {
  return (
    <SiteProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/admin/*"
            element={
              <AdminAuthWrapper>
                <Admin />
              </AdminAuthWrapper>
            }
          />
        </Routes>
        <Toaster />
      </Router>
    </SiteProvider>
  );
}

export default App;
