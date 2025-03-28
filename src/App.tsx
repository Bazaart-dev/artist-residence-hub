
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import Presentation from './pages/Presentation';
import Contact from './pages/Contact';
import Evenements from './pages/Evenements';
import Projets from './pages/Projets';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import { SiteProvider } from './contexts/SiteContext';

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
          <Route path="/admin/*" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </SiteProvider>
  );
}

export default App;
