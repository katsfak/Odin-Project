// Get DOM elements
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const recipeResults = document.getElementById("recipe-results");
const recipeDetail = document.getElementById("recipe-detail");

// Get ingredients and measurements
function getIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }
  return ingredients;
}

// Display recipes as clickable list
function displayRecipes(meals) {
  recipeResults.innerHTML = "";
  recipeDetail.style.display = "none";
  recipeResults.style.display = "block";

  meals.forEach((meal) => {
    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card";
    recipeCard.style.cursor = "pointer";
    recipeCard.innerHTML = `
      <h3>${meal.strMeal}</h3>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <p><strong>Category:</strong> ${meal.strCategory}</p>
      <p><strong>Cuisine:</strong> ${meal.strArea}</p>
    `;

    recipeCard.addEventListener("click", () => showRecipeDetail(meal));
    recipeResults.appendChild(recipeCard);
  });
}

// Display full recipe details
function showRecipeDetail(meal) {
  const ingredients = getIngredients(meal);

  recipeDetail.innerHTML = `
    <button id="back-button" style="margin-bottom: 20px; padding: 10px 20px; cursor: pointer;">← Back</button>
    <h2>${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="max-width: 400px;" />
    <p><strong>Category:</strong> ${meal.strCategory}</p>
    <p><strong>Cuisine:</strong> ${meal.strArea}</p>
    <h3>Ingredients:</h3>
    <ul>
      ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
    </ul>
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>
  `;

  recipeDetail.style.display = "block";
  recipeResults.style.display = "none";

  document.getElementById("back-button").addEventListener("click", () => {
    recipeResults.style.display = "block";
    recipeDetail.style.display = "none";
  });
}

// Update searchRecipe to display results
async function searchRecipeAndDisplay(recipeName) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.meals) {
      displayRecipes(data.meals);
    } else {
      recipeResults.innerHTML =
        "<p>No recipes found. Try searching for something else.</p>";
    }
  } catch (error) {
    console.error("Error searching recipe:", error);
    recipeResults.innerHTML =
      "<p>Error fetching recipes. Please check your connection and try again.</p>";
  }
}

// Event listener for search button
searchButton.addEventListener("click", () => {
  const recipeName = searchInput.value.trim();
  if (recipeName) {
    searchRecipeAndDisplay(recipeName);
  } else {
    recipeResults.innerHTML = "<p>Please enter a recipe name.</p>";
  }
});

// Allow search on Enter key press
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchButton.click();
  }
});
