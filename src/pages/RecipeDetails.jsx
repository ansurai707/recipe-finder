import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { getRecipeById, getIngredientsList } from "../services/recipeApi";

// useParams() reads the ":id" part of the URL (e.g. /recipe/52772 -> id = "52772").
// This page fetches the FULL details for that one recipe.
function RecipeDetails({ isFavorite, onToggleFavorite }) {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the recipe whenever the "id" in the URL changes.
  // This matters if the user navigates from one recipe details page
  // straight to another — the dependency array [id] makes sure we
  // re-fetch instead of showing stale data.
  useEffect(() => {
    let isCancelled = false;

    async function fetchDetails() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getRecipeById(id);
        if (!isCancelled) {
          setRecipe(data);
        }
      } catch (err) {
        if (!isCancelled) {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchDetails();

    // Cleanup function: if the component unmounts (user navigates away)
    // before the fetch finishes, we ignore the result instead of
    // trying to update state that no longer exists.
    return () => {
      isCancelled = true;
    };
  }, [id]);

  if (isLoading) return <Loading message="Loading recipe details..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!recipe) return <ErrorMessage message="Recipe not found." />;

  const ingredients = getIngredientsList(recipe);
  const favorited = isFavorite(recipe.idMeal);

  return (
    <div className="page recipe-details-page">
      <Link to="/" className="back-link">
        ← Back to search
      </Link>

      <div className="recipe-details">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="recipe-details-image"
        />

        <div className="recipe-details-content">
          <h1>{recipe.strMeal}</h1>

          <div className="recipe-details-tags">
            {recipe.strCategory && <span className="tag">{recipe.strCategory}</span>}
            {recipe.strArea && <span className="tag">{recipe.strArea}</span>}
          </div>

          <button
            className={`favorite-toggle-button ${favorited ? "favorited" : ""}`}
            onClick={() => onToggleFavorite(recipe)}
          >
            {favorited ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
          </button>

          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {ingredients.map((item, index) => (
              <li key={index}>
                {item.measure} {item.ingredient}
              </li>
            ))}
          </ul>

          <h2>Instructions</h2>
          <p className="instructions">{recipe.strInstructions}</p>

          {recipe.strYoutube && (
            <a
              href={recipe.strYoutube}
              target="_blank"
              rel="noreferrer"
              className="youtube-link"
            >
              ▶ Watch Video Tutorial
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
