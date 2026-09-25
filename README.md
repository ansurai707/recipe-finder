# Recipe Finder App

## Description

Recipe Finder is a responsive single-page React application that lets users search for recipes by name or by ingredient using the free TheMealDB API. Users can browse results in a card grid, view full recipe details (ingredients, measurements, instructions, and video links), and save recipes to a Favorites list that persists across browser sessions using localStorage.

## Features

- Search recipes by name (e.g. "chicken", "pasta")
- Search recipes by ingredient (e.g. "tomato")
- Live recipe data from TheMealDB API (no hard-coded data)
- Responsive recipe card grid (4 columns desktop, 2 columns tablet, 1 column mobile)
- Full recipe details page with ingredients, measurements, instructions, and optional YouTube link
- Add/remove recipes from Favorites
- Favorites persist after refreshing the browser (localStorage)
- Loading state while fetching data
- Friendly "no results" state
- Friendly error handling for failed API requests
- Multi-page navigation with React Router (Home, Recipe Details, Favorites)

## Technologies

- React.js (functional components + hooks only)
- JavaScript (ES6+)
- CSS (custom, responsive, no framework)
- React Router (react-router-dom)
- TheMealDB API
- localStorage
- React Hooks: useState, useEffect, custom hook (useFavorites)

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── SearchBar.jsx
│   ├── RecipeCard.jsx
│   ├── RecipeGrid.jsx
│   ├── Loading.jsx
│   └── ErrorMessage.jsx
├── pages/
│   ├── Home.jsx
│   ├── RecipeDetails.jsx
│   └── Favorites.jsx
├── hooks/
│   └── useFavorites.js
├── services/
│   └── recipeApi.js
├── App.jsx
├── main.jsx
└── index.css
```

## Installation

```bash
npm install
```

## Run the Project

```bash
npm run dev
```

Then open the local URL shown in your terminal (usually `http://localhost:5173`).

## Screenshots

> Add screenshots here after running the app locally.

### Home / Search Page
_(screenshot placeholder)_

### Recipe Details Page
_(screenshot placeholder)_

### Favorites Page
_(screenshot placeholder)_

## Known Limitations

- Recipes found via ingredient search show basic info (name + image) in the card until you open "View Details," since that's all the API returns for ingredient search results.
- Favorites are stored per-browser (localStorage), not tied to a user account, so they won't sync across devices.
