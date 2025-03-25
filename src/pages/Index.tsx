
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollDownArrow from '@/components/ScrollDownArrow';

const Index = () => {
  useEffect(() => {
    document.title = "Bazaart - Art & Culture";
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />
      <ScrollDownArrow />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
