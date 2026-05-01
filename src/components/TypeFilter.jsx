import React from 'react';

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

const TypeFilter = ({ types, selectedType, setSelectedType }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => setSelectedType('')}
        className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${
          selectedType === ''
            ? 'bg-gray-800 text-white shadow-md'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        All
      </button>
      {types.map((type) => (
        <button
          key={type.name}
          onClick={() => setSelectedType(type.name)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${
            selectedType === type.name
              ? `${typeColors[type.name] || 'bg-gray-500'} text-white shadow-md ring-2 ring-offset-2 ring-${typeColors[type.name] || 'gray-500'}`
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {type.name}
        </button>
      ))}
    </div>
  );
};

export default TypeFilter;
