import React from 'react';
import { Heart } from 'lucide-react';

const Navbar = ({ favoritesCount, onFavoritesClick, showFavoritesOnly }) => {
  return (
    <nav className="bg-red-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
          {/* A simple pokeball icon placeholder using CSS/SVG could go here */}
          <div className="w-8 h-8 bg-white rounded-full border-4 border-gray-800 flex justify-center items-center relative overflow-hidden">
             <div className="absolute top-0 w-full h-1/2 bg-red-500 border-b-2 border-gray-800"></div>
             <div className="w-3 h-3 bg-white rounded-full border-2 border-gray-800 relative z-10"></div>
          </div>
          <h1 className="text-2xl font-bold tracking-wider">Pokédex</h1>
        </div>
        <button 
          onClick={onFavoritesClick}
          className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-inner transition-colors ${showFavoritesOnly ? 'bg-white text-red-600' : 'bg-red-700 hover:bg-red-800 text-white'}`}
        >
          <Heart className={`w-5 h-5 ${showFavoritesOnly ? 'fill-red-500 text-red-500' : 'text-red-300 fill-current'}`} />
          <span className="font-semibold">Favorites: {favoritesCount}</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
