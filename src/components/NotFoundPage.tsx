
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page non trouvée</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Désolé, nous n'avons pas pu trouver la page que vous cherchez.
      </p>
      <Button asChild className="flex items-center gap-2 px-6 py-2">
        <Link to="/">
          <ArrowLeft size={16} className="mr-2" />
          Retour à l'accueil
        </Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
