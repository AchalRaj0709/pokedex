import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonGrid = ({ pokemonList, favorites, toggleFavorite, onCardClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
      {pokemonList.map((pokemon) => {
        const isFavorite = favorites.some((fav) => fav.id === pokemon.id);
        return (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
            onClick={onCardClick}
          />
        );
      })}
    </div>
  );
};

export default PokemonGrid;
