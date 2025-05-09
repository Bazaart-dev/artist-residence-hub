
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import Presentation from './pages/Presentation';
import Contact from './pages/Contact';
import Evenements from './pages/Evenements';
import Projets from './pages/Projets';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import { SiteProvider } from './contexts/SiteContext';

// Admin
import AdminAuthWrapper from './components/AdminAuthWrapper';
import AdminLayout from './components/AdminLayout';

// Composants admin
import AdminEvents from '@/components/admin/AdminEvents';
import AdminMedia from '@/components/admin/AdminMedia';
import AdminPages from '@/components/admin/AdminPages';
import AdminProjects from '@/components/admin/AdminProjects';
import AdminSettings from '@/components/admin/AdminSettings';
import AppearanceSettings from '@/components/admin/AppearanceSettings';
import SecuritySettings from '@/components/admin/SecuritySettings';
import AdminHome from '@/components/admin/AdminHome';

function App() {
  return (
    <SiteProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/presentation" element={<Presentation />} />
          <Route path="/projets" element={<Projets />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/evenements" element={<Evenements />} />
          <Route path="/login" element={<Login />} />
          
          {/* Admin routes */}
          <Route 
            path="/admin" 
            element={
              <AdminAuthWrapper>
                <Admin />
              </AdminAuthWrapper>
            }
          >
            <Route index element={<AdminHome />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="pages" element={<AdminPages />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="appearance" element={<AppearanceSettings />} />
            <Route path="security" element={<SecuritySettings />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          
          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </SiteProvider>
  );
}

export default App;
