
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import NotFoundPage from "@/components/NotFoundPage";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="grow flex items-center justify-center bg-bazaart-green py-20">
        <NotFoundPage />
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
