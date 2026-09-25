import { useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeGrid from "../components/RecipeGrid";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { searchRecipesByName, searchRecipesByIngredient } from "../services/recipeApi";

// Home is the main search page. It owns the search state
// (results, loading, error) and passes data + callbacks down
// to its children (SearchBar and RecipeGrid).
function Home({ isFavorite, onToggleFavorite }) {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // This function is passed to SearchBar as a prop (onSearch).
  // We don't use useEffect here because the search only needs to
  // happen in response to the user submitting the form, not
  // automatically when something changes.
  async function handleSearch(term, type) {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const results =
        type === "ingredient"
          ? await searchRecipesByIngredient(term)
          : await searchRecipesByName(term);

      setRecipes(results);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="page home-page">
      <div className="hero">
        <h1>Find Your Next Favorite Recipe</h1>
        <p>Search thousands of recipes by name or ingredient.</p>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Conditional rendering: show exactly one of these states at a time */}
      {isLoading && <Loading />}

      {!isLoading && error && <ErrorMessage message={error} />}

      {!isLoading && !error && hasSearched && recipes.length === 0 && (
        <p className="empty-message">
          No recipes found. Try searching for something else.
        </p>
      )}

      {!isLoading && !error && recipes.length > 0 && (
        <RecipeGrid
          recipes={recipes}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
        />
      )}

      {!hasSearched && !isLoading && (
        <p className="empty-message">
          Try searching for "chicken", "pasta", or an ingredient like "tomato".
        </p>
      )}
    </div>
  );
}

export default Home;
