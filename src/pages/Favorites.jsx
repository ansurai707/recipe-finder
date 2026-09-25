import RecipeGrid from "../components/RecipeGrid";

// Favorites page just displays whatever is currently in the
// favorites list (managed by the useFavorites hook in App.jsx).
// Note: recipes saved from the "search by ingredient" results
// only have basic info (name + image), since that's all the API
// gives us at search time — clicking "View Details" will fetch the rest.
function Favorites({ favorites, isFavorite, onToggleFavorite }) {
  return (
    <div className="page favorites-page">
      <h1>Your Favorite Recipes</h1>

      {favorites.length === 0 ? (
        <p className="empty-message">
          You haven't saved any favorites yet. Go find something delicious!
        </p>
      ) : (
        <RecipeGrid
          recipes={favorites}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </div>
  );
}

export default Favorites;
