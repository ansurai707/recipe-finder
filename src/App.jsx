import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favorites";
import { useFavorites } from "./hooks/useFavorites";

// App is the top-level component. It sets up the favorites hook
// ONCE here, then passes the data + functions down to whichever
// page is currently active. This way, favorites stay in sync no
// matter which page the user is on.
function App() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<Home isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />}
          />
          <Route
            path="/recipe/:id"
            element={
              <RecipeDetails isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
        </Routes>
      </main>

      <footer className="footer">
        <p>Made with React · Recipe data from TheMealDB</p>
      </footer>
    </div>
  );
}

export default App;
