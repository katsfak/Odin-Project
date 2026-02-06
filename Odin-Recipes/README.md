# 🍳 Odin Recipes

A beautiful, responsive web application for discovering and exploring recipes from around the world. Search for any meal, browse through a stunning grid of options, and view detailed recipes with ingredients and step-by-step instructions.

## ✨ Features

- **Recipe Search**: Search for any meal by name using the TheMealDB API
- **Beautiful Grid Layout**: Responsive grid that adapts to any screen size (desktop, tablet, mobile)
- **Recipe Cards**: Quick preview of recipes with images, category, and cuisine type
- **Detailed View**: Click any recipe to see full ingredients list and detailed cooking instructions
- **Modern Design**: Purple gradient background with smooth animations and hover effects
- **Fully Responsive**: Works perfectly on all devices from mobile phones to large desktop screens
- **No API Key Required**: Uses the free TheMealDB API with no authentication needed

## 🎨 Design Highlights

- **Modern UI**: Purple gradient background with smooth transitions
- **Card Hover Effects**: Cards lift up when you hover over them for interactive feedback
- **Smooth Animations**: All interactions include smooth, polished animations
- **Clean Typography**: Well-chosen fonts and colors for excellent readability
- **Mobile-First**: Optimized for mobile devices with responsive grid layout

## 🚀 Getting Started

### Prerequisites

You don't need any special dependencies! This project uses:

- **Vanilla JavaScript** - No frameworks or libraries
- **CSS3** - Modern CSS features with animations and gradients
- **TheMealDB API** - Free, no authentication required

### Installation

1. Clone or download this project to your computer
2. Extract the files to a folder
3. Open `index.html` in your web browser
4. Start searching for recipes!

```bash
# No installation needed - just open the files!
# If you have Python installed, you can run a local server:
python -m http.server 8000
# Then visit: http://localhost:8000
```

## 📁 Project Structure

```
Odin-Recipes/
├── index.html          # Main HTML file with structure
├── styles.css          # All CSS styling with detailed comments
├── script.js           # JavaScript functionality with API integration
└── README.md          # This file - project documentation
```

## 💻 How to Use

### Step 1: Search for a Recipe

- Enter a meal name in the search box (e.g., "pasta", "chicken", "pizza")
- Click the "Search" button or press Enter
- The app will display all matching recipes in a beautiful grid

### Step 2: Browse Results

- See recipe cards with:
  - Beautiful meal photo
  - Recipe name
  - Category (e.g., Seafood, Dessert)
  - Cuisine type (e.g., Italian, Chinese)

### Step 3: View Full Recipe

- Click on any recipe card to see detailed information
- You'll see:
  - Large recipe photo
  - Complete ingredients list with measurements
  - Step-by-step cooking instructions
- Click "← Back" to return to the recipe list

## 🔧 Technical Details

### HTML Structure (`index.html`)

- Semantic HTML5 elements
- Search input and button for user interaction
- Two main sections: recipe list view and recipe detail view

### JavaScript Features (`script.js`)

- **searchRecipeAndDisplay()**: Fetches recipes from TheMealDB API
- **displayRecipes()**: Renders recipe cards in a grid
- **showRecipeDetail()**: Shows full recipe information
- **getIngredients()**: Extracts and formats ingredient data
- Event listeners for search and back navigation
- Error handling for failed API requests

### CSS Styling (`styles.css`)

- **Responsive Grid**: Auto-fill grid that adapts to screen size
- **Gradient Background**: Beautiful purple-to-pink gradient
- **Animations**: Smooth hover effects and transitions
- **Mobile Breakpoints**:
  - Tablet: 768px and below
  - Mobile: 480px and below
- **Modern Features**: CSS Grid, Flexbox, Linear Gradients, Transitions

## 🌐 API Reference

This project uses the **TheMealDB API** - a free database of world meals.

### Endpoints Used

```javascript
// Search by meal name
https://www.themealdb.com/api/json/v1/1/search.php?s={meal_name}

// Response includes:
// - strMeal: Recipe name
// - strMealThumb: Recipe image URL
// - strCategory: Type of meal
// - strArea: Cuisine type/country
// - strIngredient1-20: Ingredient names
// - strMeasure1-20: Ingredient measurements
// - strInstructions: Cooking instructions
```

## 📱 Responsive Design

The app looks great on all devices:

- **Desktop (1200px+)**: Full grid with multiple columns
- **Tablet (768px)**: Adjusted grid with fewer columns
- **Mobile (480px)**: Single column layout for easy scrolling

## 🎯 Browser Compatibility

Works on all modern browsers:

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## 💡 Tips & Tricks

- **Try Popular Searches**: pasta, chicken, pizza, pizza, salad, cake
- **Exact Names Work Best**: Use specific meal names for better results
- **Empty Searches**: If no results appear, try a different meal name
- **Mobile Friendly**: The app is fully optimized for touch devices

## 🚧 Future Enhancements

Possible features to add in the future:

- Save favorite recipes to local storage
- Filter recipes by category or cuisine
- Random meal generator
- Print recipe functionality
- Share recipes on social media
- Recipe ratings and reviews

## 📄 License

This project is free to use for personal and educational purposes.

## 🙏 Credits

- **TheMealDB API**: Free recipe database - https://www.themealdb.com/api.php
- **Design**: Modern UI with smooth animations and responsive layout
- **Odin Project**: Educational web development project

## 🔗 Links

- **TheMealDB**: https://www.themealdb.com/
- **API Documentation**: https://www.themealdb.com/api.php
- **GitHub**: Your repository link here

## 📧 Support

If you encounter any issues:

1. Check that your internet connection is working
2. Try searching for a different meal name
3. Open the browser Developer Console (F12) to see error messages
4. Clear your browser cache and reload the page

---

**Enjoy exploring recipes! 🍽️**
