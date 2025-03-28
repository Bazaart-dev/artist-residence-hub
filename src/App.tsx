
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import Presentation from './pages/Presentation';
import Contact from './pages/Contact';
import Evenements from './pages/Evenements';
import Projets from './pages/Projets';
import Admin from './pages/Admin';
import NotFoundPage from './components/NotFoundPage'; // Add proper import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/presentation" element={<Presentation />} />
        <Route path="/projets" element={<Projets />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/evenements" element={<Evenements />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<NotFoundPage />} /> {/* Use the imported component */}
      </Routes>
    </Router>
  );
}

export default App;
