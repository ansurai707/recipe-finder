import { useState } from "react";

// SearchBar is a "controlled form" — the input's value lives in
// React state (searchTerm), not in the DOM. That's what "controlled
// input" means: React is always in control of what the input shows.
//
// Props:
// - onSearch(term, type): a callback passed down from the parent (Home page).
//   SearchBar doesn't know HOW to search, it just reports what the user typed.
function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name"); // "name" or "ingredient"

  function handleChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault(); // stop the browser from reloading the page
    if (searchTerm.trim() === "") return;
    onSearch(searchTerm.trim(), searchType);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Search by recipe name or ingredient..."
        value={searchTerm}
        onChange={handleChange}
      />

      <select
        className="search-type"
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="name">By Name</option>
        <option value="ingredient">By Ingredient</option>
      </select>

      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
