import { Link } from "react-router-dom";

// RecipeCard displays one single recipe.
// This is a great example of "props flowing down" and
// "callbacks flowing up":
//   - recipe & isFavorited flow DOWN from RecipeGrid (data)
//   - onToggleFavorite flows UP a click event to the parent (action)
function RecipeCard({ recipe, isFavorited, onToggleFavorite }) {
  return (
    <div className="recipe-card">
      <div className="recipe-card-image-wrapper">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="recipe-card-image"
        />
        <button
          className={`favorite-button ${isFavorited ? "favorited" : ""}`}
          onClick={() => onToggleFavorite(recipe)}
          aria-label="Toggle favorite"
        >
          {isFavorited ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="recipe-card-body">
        <h3 className="recipe-card-title">{recipe.strMeal}</h3>
        <p className="recipe-card-info">
          {recipe.strArea ? `${recipe.strArea} cuisine` : "Delicious recipe"}
          {recipe.strCategory ? ` · ${recipe.strCategory}` : ""}
        </p>
        <Link to={`/recipe/${recipe.idMeal}`} className="details-button">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;
