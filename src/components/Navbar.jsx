import React from 'react';
import { Heart } from 'lucide-react';

const Navbar = ({ favoritesCount }) => {
  return (
    <nav className="bg-red-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {/* A simple pokeball icon placeholder using CSS/SVG could go here */}
          <div className="w-8 h-8 bg-white rounded-full border-4 border-gray-800 flex justify-center items-center relative overflow-hidden">
             <div className="absolute top-0 w-full h-1/2 bg-red-500 border-b-2 border-gray-800"></div>
             <div className="w-3 h-3 bg-white rounded-full border-2 border-gray-800 relative z-10"></div>
          </div>
          <h1 className="text-2xl font-bold tracking-wider">Pokédex</h1>
        </div>
        <div className="flex items-center gap-2 bg-red-700 px-4 py-2 rounded-full shadow-inner">
          <Heart className="w-5 h-5 text-red-300 fill-current" />
          <span className="font-semibold">Favorites: {favoritesCount}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
