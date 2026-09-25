// recipeApi.js
// This file talks to TheMealDB, a free public recipe API.
// Keeping all the "fetch" logic in one file means our components
// don't need to know anything about API URLs — they just call these functions.

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

/**
 * Search for recipes by dish name (e.g. "chicken", "pasta").
 * Returns an array of recipe objects, or an empty array if nothing is found.
 */
export async function searchRecipesByName(name) {
  const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(name)}`);

  if (!response.ok) {
    throw new Error("Failed to fetch recipes. Please try again.");
  }

  const data = await response.json();
  // TheMealDB returns { meals: null } when there are no results
  return data.meals || [];
}

/**
 * Search for recipes by a main ingredient (e.g. "tomato").
 * This TheMealDB endpoint returns "lite" recipe objects (no full details),
 * so later we fetch full details when the user opens one.
 */
export async function searchRecipesByIngredient(ingredient) {
  const response = await fetch(
    `${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recipes. Please try again.");
  }

  const data = await response.json();
  return data.meals || [];
}

/**
 * Get the full details for a single recipe by its id.
 * Used on the Recipe Details page.
 */
export async function getRecipeById(id) {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`);

  if (!response.ok) {
    throw new Error("Failed to fetch recipe details. Please try again.");
  }

  const data = await response.json();
  return data.meals ? data.meals[0] : null;
}

/**
 * TheMealDB stores each ingredient/measurement as separate numbered fields
 * (strIngredient1, strMeasure1, strIngredient2, strMeasure2, ... up to 20).
 * This helper turns that awkward shape into a clean array of
 * { ingredient, measure } objects that's easy to .map() over.
 */
export function getIngredientsList(recipe) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        ingredient,
        measure: measure && measure.trim() !== "" ? measure : "",
      });
    }
  }

  return ingredients;
}
