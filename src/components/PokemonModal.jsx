import React, { useEffect } from 'react';
import { X } from 'lucide-react';

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

const PokemonModal = ({ pokemon, onClose }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!pokemon) return null;

  const mainType = pokemon.types?.[0]?.type?.name || 'normal';
  const bgColor = typeColors[mainType] || 'bg-gray-500';

  const formatStatName = (name) => {
    const stats = {
      hp: 'HP',
      attack: 'Attack',
      defense: 'Defense',
      'special-attack': 'Sp. Atk',
      'special-defense': 'Sp. Def',
      speed: 'Speed'
    };
    return stats[name] || name;
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/10 hover:bg-black/20 rounded-full text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className={`pt-8 pb-16 px-6 flex justify-center ${bgColor} relative`}>
          <div className="absolute inset-0 opacity-10 flex items-center justify-center overflow-hidden">
             {/* A decorative pokeball shape in the background */}
             <div className="w-64 h-64 border-[32px] border-white rounded-full"></div>
          </div>
          <img 
            src={pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default} 
            alt={pokemon.name} 
            className="w-48 h-48 object-contain filter drop-shadow-2xl relative z-10"
          />
        </div>

        <div className="px-6 pb-8 pt-4 relative bg-white rounded-t-3xl -mt-8">
          <div className="text-center mb-6">
            <div className="text-sm text-gray-500 font-mono mb-1">
              #{String(pokemon.id).padStart(4, '0')}
            </div>
            <h2 className="text-3xl font-bold capitalize text-gray-800 mb-4">
              {pokemon.name}
            </h2>
            <div className="flex justify-center gap-2">
              {pokemon.types?.map((typeInfo) => (
                <span 
                  key={typeInfo.type.name}
                  className={`px-3 py-1 rounded-full text-white text-sm font-medium capitalize shadow-sm ${typeColors[typeInfo.type.name] || 'bg-gray-500'}`}
                >
                  {typeInfo.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3 border-b pb-2">Base Stats</h3>
              <div className="space-y-3">
                {pokemon.stats?.map((statInfo) => {
                  const percentage = Math.min(100, (statInfo.base_stat / 255) * 100);
                  return (
                    <div key={statInfo.stat.name} className="flex items-center text-sm">
                      <span className="w-20 text-gray-600 font-medium capitalize">
                        {formatStatName(statInfo.stat.name)}
                      </span>
                      <span className="w-8 text-right font-bold text-gray-800 mr-3">
                        {statInfo.base_stat}
                      </span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${percentage > 50 ? 'bg-green-500' : percentage > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 border-b pb-2">Abilities</h3>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities?.map((abilityInfo) => (
                  <span 
                    key={abilityInfo.ability.name}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm capitalize border border-gray-200"
                  >
                    {abilityInfo.ability.name.replace('-', ' ')}
                    {abilityInfo.is_hidden && ' (Hidden)'}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="text-center">
                   <p className="text-gray-500 text-xs mb-1 uppercase tracking-wider font-semibold">Height</p>
                   <p className="font-medium text-gray-800">{pokemon.height / 10} m</p>
                </div>
                <div className="text-center">
                   <p className="text-gray-500 text-xs mb-1 uppercase tracking-wider font-semibold">Weight</p>
                   <p className="font-medium text-gray-800">{pokemon.weight / 10} kg</p>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
