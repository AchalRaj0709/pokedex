import React from 'react';
import { Heart } from 'lucide-react';

const typeColors = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-700',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

const PokemonCard = ({ pokemon, isFavorite, toggleFavorite, onClick }) => {
  if (!pokemon) return null;

  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden border border-gray-100 group relative"
      onClick={() => onClick(pokemon)}
    >
      <div className="absolute top-3 right-3 z-10">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(pokemon);
          }}
          className="p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} 
          />
        </button>
      </div>

      <div className="bg-gray-50 p-6 flex justify-center items-center group-hover:bg-gray-100 transition-colors">
        <img 
          src={pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default} 
          alt={pokemon.name} 
          className="w-32 h-32 object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <div className="text-xs text-gray-500 font-mono mb-1">
          #{String(pokemon.id).padStart(4, '0')}
        </div>
        <h3 className="text-lg font-bold capitalize text-gray-800 mb-3">
          {pokemon.name}
        </h3>
        
        <div className="flex flex-wrap gap-1.5">
          {pokemon.types?.map((typeInfo) => (
            <span 
              key={typeInfo.type.name}
              className={`text-xs px-2.5 py-1 rounded-full text-white font-medium capitalize ${typeColors[typeInfo.type.name] || 'bg-gray-500'}`}
            >
              {typeInfo.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
