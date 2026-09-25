import { useState, useEffect } from "react";

// This is a "custom hook" — a reusable function that starts with "use"
// and can use other hooks (useState, useEffect) inside it.
// It packages up all the favorites logic (state + localStorage) so
// any component can call useFavorites() and get everything it needs.

const STORAGE_KEY = "recipeFinderFavorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage once, when the app first starts.
  // The empty dependency array [] means "run this only once".
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error("Could not read saved favorites:", error);
      }
    }
  }, []);

  // Whenever "favorites" changes, save the new list to localStorage.
  // The [favorites] dependency array means "run this every time favorites changes".
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function isFavorite(id) {
    return favorites.some((recipe) => recipe.idMeal === id);
  }

  function addFavorite(recipe) {
    setFavorites((prev) => {
      if (prev.some((r) => r.idMeal === recipe.idMeal)) {
        return prev; // already saved, don't add it twice
      }
      return [...prev, recipe];
    });
  }

  function removeFavorite(id) {
    setFavorites((prev) => prev.filter((recipe) => recipe.idMeal !== id));
  }

  function toggleFavorite(recipe) {
    if (isFavorite(recipe.idMeal)) {
      removeFavorite(recipe.idMeal);
    } else {
      addFavorite(recipe);
    }
  }

  return { favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite };
}
