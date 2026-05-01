const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (limit = 20, offset = 0) => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon list');
  }
  return response.json();
};

export const fetchPokemonDetails = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon details');
  }
  return response.json();
};

export const fetchAllTypes = async () => {
  const response = await fetch(`${BASE_URL}/type`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon types');
  }
  return response.json();
};

export const fetchPokemonByType = async (typeUrl) => {
  const response = await fetch(typeUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon by type');
  }
  return response.json();
};
