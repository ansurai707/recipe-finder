import { Link } from "react-router-dom";

// A simple, reusable navigation bar shown on every page.
// It uses React Router's <Link> instead of <a> so the page
// doesn't fully reload when the user navigates.
function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        🍳 Recipe Finder
      </Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
    </nav>
  );
}

export default Navbar;
