import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollDownArrow = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [sections, setSections] = useState<HTMLElement[]>([]);
  
  useEffect(() => {
    // Collect all major sections on the page
    const mainSections = Array.from(document.querySelectorAll('section')).filter(
      section => section.offsetHeight > 300 // Only consider major sections
    );
    setSections(mainSections);
  }, []);

  // Function to handle scroll to next section
  const scrollToNextSection = () => {
    if (sections.length === 0) return;
    
    // If we're at the last section, scroll to top
    if (currentSection >= sections.length - 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentSection(0);
      return;
    }
    
    // Otherwise scroll to next section
    const nextSection = currentSection + 1;
    sections[nextSection].scrollIntoView({ behavior: 'smooth' });
    setCurrentSection(nextSection);
  };

  // Update current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (sections.length === 0) return;
      
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setCurrentSection(i);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Calculate progress
  const progress = sections.length ? (currentSection + 1) / sections.length : 0;
  
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed bottom-10 right-10 z-40 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToNextSection}
      >
        <div className="relative flex items-center justify-center bg-bazaart-black text-white w-14 h-14 rounded-full shadow-lg">
          <ArrowDown size={24} className="text-white" />
          
          {/* Progress circle around the arrow */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="46"
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="4"
            />
            <circle 
              cx="50" 
              cy="50" 
              r="46"
              fill="none"
              stroke="#fff"
              strokeWidth="4"
              strokeDasharray={`${Math.PI * 92 * progress} ${Math.PI * 92 * (1 - progress)}`}
              strokeLinecap="round"
            />
          </svg>
        </div>
        
        <span className="sr-only">
          {currentSection >= sections.length - 1 ? "Retour en haut" : "Section suivante"}
        </span>
      </motion.div>
    </AnimatePresence>
  );
};

export default ScrollDownArrow;
