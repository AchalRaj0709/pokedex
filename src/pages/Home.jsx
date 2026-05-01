import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import TypeFilter from '../components/TypeFilter';
import PokemonGrid from '../components/PokemonGrid';
import Pagination from '../components/Pagination';
import PokemonModal from '../components/PokemonModal';
import Loader from '../components/Loader';
import { 
  fetchPokemonList, 
  fetchPokemonDetails, 
  fetchAllTypes, 
  fetchPokemonByType 
} from '../services/api';
import { getFavorites, saveFavorites } from '../utils/localStorage';

const LIMIT = 20;

const Home = () => {
  // State
  const [pokemonList, setPokemonList] = useState([]);
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filtering & Pagination State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // User State
  const [favorites, setFavorites] = useState([]);
  
  // Modal State
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Initialize favorites on mount
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  // Save favorites when changed
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  // Fetch Types once
  useEffect(() => {
    const loadTypes = async () => {
      try {
        const data = await fetchAllTypes();
        // Filter out unknown/shadow types if desired, keeping it simple here
        setTypes(data.results);
      } catch (err) {
        console.error('Failed to load types:', err);
      }
    };
    loadTypes();
  }, []);

  // Fetch Pokemon Data based on filters
  useEffect(() => {
    const loadPokemon = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let results = [];
        let count = 0;

        if (selectedType) {
          // If a type is selected, we fetch all for that type, then we'll paginate locally
          const typeData = await fetchPokemonByType(`https://pokeapi.co/api/v2/type/${selectedType}`);
          const allPokemonOfType = typeData.pokemon.map(p => p.pokemon);
          count = allPokemonOfType.length;
          
          // Local pagination for type filtering
          const paginatedPokemon = allPokemonOfType.slice(offset, offset + LIMIT);
          results = paginatedPokemon;
        } else {
          // Standard pagination
          const data = await fetchPokemonList(LIMIT, offset);
          results = data.results;
          count = data.count;
        }

        setTotalCount(count);

        // Fetch details for each pokemon in the current list
        const detailedPokemon = await Promise.all(
          results.map(async (pokemon) => {
            return await fetchPokemonDetails(pokemon.url);
          })
        );
        
        setPokemonList(detailedPokemon);
      } catch (err) {
        setError('Failed to load Pokémon. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPokemon();
  }, [offset, selectedType]);

  // Reset offset when type changes
  useEffect(() => {
    setOffset(0);
  }, [selectedType]);

  // Handlers
  const handlePrevious = () => {
    if (offset > 0) {
      setOffset(prev => Math.max(0, prev - LIMIT));
    }
  };

  const handleNext = () => {
    if (offset + LIMIT < totalCount) {
      setOffset(prev => prev + LIMIT);
    }
  };

  const toggleFavorite = (pokemon) => {
    setFavorites(prev => {
      const isFav = prev.some(p => p.id === pokemon.id);
      if (isFav) {
        return prev.filter(p => p.id !== pokemon.id);
      } else {
        return [...prev, pokemon];
      }
    });
  };

  // Filter list by search query (Client side filtering on currently displayed items, 
  // or ideally across all, but for PokeAPI we filter current page to keep it simple, 
  // or fetch all names and filter. We'll filter the currently loaded list for simplicity and performance).
  // A true robust search needs to hit a different endpoint or fetch all locally.
  const displayedPokemon = useMemo(() => {
    if (!searchQuery.trim()) return pokemonList;
    return pokemonList.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [pokemonList, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Navbar favoritesCount={favorites.length} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <TypeFilter 
            types={types} 
            selectedType={selectedType} 
            setSelectedType={setSelectedType} 
          />
          <SearchBar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center mb-6">
            {error}
          </div>
        )}

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {displayedPokemon.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-500">No Pokémon found.</p>
              </div>
            ) : (
              <PokemonGrid 
                pokemonList={displayedPokemon} 
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                onCardClick={setSelectedPokemon}
              />
            )}
            
            {/* Hide pagination if searching within the page */}
            {!searchQuery && (
              <Pagination 
                offset={offset}
                limit={LIMIT}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                isLoading={isLoading}
              />
            )}
          </>
        )}
      </main>

      {selectedPokemon && (
        <PokemonModal 
          pokemon={selectedPokemon} 
          onClose={() => setSelectedPokemon(null)} 
        />
      )}
    </div>
  );
};

export default Home;
