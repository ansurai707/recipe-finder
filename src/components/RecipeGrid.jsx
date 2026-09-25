import RecipeCard from "./RecipeCard";

// RecipeGrid takes a LIST of recipes and renders one RecipeCard per recipe.
// This is the classic ".map() to render a list" pattern, and each card
// gets a unique "key" prop (recipe.idMeal) so React can track items efficiently.
function RecipeGrid({ recipes, isFavorite, onToggleFavorite }) {
  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          recipe={recipe}
          isFavorited={isFavorite(recipe.idMeal)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default RecipeGrid;
