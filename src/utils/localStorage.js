export const getFavorites = () => {
  try {
    const item = window.localStorage.getItem('pokedex_favorites');
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error('Error reading favorites from localStorage:', error);
    return [];
  }
};

export const saveFavorites = (favorites) => {
  try {
    window.localStorage.setItem('pokedex_favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};
