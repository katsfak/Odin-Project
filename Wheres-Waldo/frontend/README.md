# Frontend for Where's Waldo

React + Vite frontend for the Where's Waldo photo tagging game.

## Features

- **Image Selection** - Choose from multiple game images
- **Interactive Targeting** - Click on image to place target box
- **Character Selection** - Dropdown menu to select found character
- **Coordinate Normalization** - Works across all screen sizes
- **Real-time Timer** - Tracks time to find all characters
- **Score Submission** - Enter name for high scores table
- **Responsive Design** - Works on desktop and mobile

## Setup

### Prerequisites

- Node.js 16+
- Backend API running on `http://localhost:5000`

### Installation

1. Install dependencies:

```bash
npm install
```

2. Development server:

```bash
npm run dev
```

The app will run on `http://localhost:5173`

### Build

Create optimized production build:

```bash
npm run build
```

Output will be in the `dist` folder.

### Preview

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # React components
│   ├── App.jsx
│   ├── Game.jsx     # Main game component
│   ├── ImageSelector.jsx
│   ├── TargetBox.jsx
│   ├── CharacterDropdown.jsx
│   ├── ScoreModal.jsx
│   └── *.css
├── utils/           # Utility functions
│   ├── api.js       # API calls
│   └── coordinates.js # Coordinate normalization
├── App.jsx
├── main.jsx
└── index.css
```

## How It Works

### Coordinate Normalization

The key challenge in this project is handling clicks correctly across different screen sizes:

1. **Screen Coordinates** - When user clicks, they get screen coordinates
2. **Relative Coordinates** - Calculate position relative to image element
3. **Normalized Coordinates** - Convert to actual image pixel coordinates using scaling factors

```javascript
// Example
const scaleX = imageNaturalWidth / displayedImageWidth;
const imageX = relativeX * scaleX;
```

### Game Flow

1. User selects an image from the selector
2. Game loads and displays image with character list
3. User clicks on the image to place a target box
4. Dropdown appears with character options
5. User selects a character
6. Frontend sends coordinates to backend
7. Backend validates if click is within tolerance radius
8. If correct, character is marked as found
9. When all characters found, timer stops and score modal appears
10. User can enter name to save high score

## API Integration

The frontend communicates with the backend API at `/api`:

- `GET /api/images` - Fetch all available images
- `GET /api/characters/image/:imageId` - Get characters (names only)
- `POST /api/validate/click` - Validate a click
- `POST /api/high-scores` - Submit high score

See [backend README](../backend/README.md) for full API documentation.

## Environment Variables

Create a `.env` file for API configuration:

```
VITE_API_URL=http://localhost:5000/api
```

If not set, defaults to the Vite proxy configuration.

## License

MIT
