# Where's Waldo - Quick Start Guide

## 🎯 What's Been Built

A complete full-stack photo tagging game with:

✅ **Backend (Node.js/Express)**
- REST API for images, characters, validation, and high scores
- PostgreSQL database with Prisma ORM
- Coordinate validation with tolerance radius
- High score tracking and leaderboards

✅ **Frontend (React + Vite)**
- Image selection screen
- Interactive game with click-to-select targeting
- Dropdown menu for character identification
- Real-time timer
- Score submission modal
- Responsive design (mobile, tablet, desktop)

✅ **Key Features**
- Automatic coordinate normalization for all screen sizes
- Server-side validation of character locations
- High score tracking per image
- Beautiful animations and UI
- Cross-device compatibility

## 🚀 Installation (5 minutes)

### Step 1: Setup PostgreSQL

```bash
# Create database (macOS/Linux)
createdb wheres_waldo

# Or on all platforms using psql
psql -c "CREATE DATABASE wheres_waldo;"
```

### Step 2: Run Backend

```bash
cd backend
npm install
cp .env.example .env

# Edit .env - your DATABASE_URL should be:
# DATABASE_URL="postgresql://user:password@localhost:5432/wheres_waldo"

npm run migrate
npm run seed  # Optional: adds sample data
npm run dev
```

Backend will run on `http://localhost:5000`

### Step 3: Run Frontend (new terminal)

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

### Step 4: Play!

Visit `http://localhost:5173` and start finding characters!

## 📋 How to Add Your Own Images

### Option 1: Using the Seed Script

Edit `backend/src/db/seed.js`:

```javascript
// Find character coordinates in your image editor
await prisma.character.createMany({
  data: [
    {
      imageId: image1.id,
      name: "Character Name",
      pixelX: 450,      // X position in pixels
      pixelY: 350,      // Y position in pixels
      radius: 30,       // Click tolerance in pixels
    },
  ],
});
```

Then run:
```bash
cd backend
npm run seed
```

### Option 2: Using the API

```bash
# Add image
curl -X POST http://localhost:5000/api/images \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Image",
    "imageUrl": "https://example.com/image.jpg",
    "description": "Find hidden characters"
  }'

# Add character (use imageId from response above)
curl -X POST http://localhost:5000/api/characters \
  -H "Content-Type: application/json" \
  -d '{
    "imageId": 1,
    "name": "Character Name",
    "pixelX": 450,
    "pixelY": 350,
    "radius": 30
  }'
```

## 🎮 Game Flow

1. **Select Image** - Choose a game image from the selector
2. **Click on Image** - Click anywhere on the image to place a target box
3. **Select Character** - A dropdown menu appears with available characters
4. **Validate** - Backend verifies if you clicked in the correct area
5. **Find All** - Locate all characters as fast as you can
6. **Submit Score** - Enter your name to save your time

## 📂 Project Structure

```
Wheres-Waldo/
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── controllers/  # API logic
│   │   ├── routes/       # API endpoints
│   │   ├── utils/        # Helper functions
│   │   └── server.js
│   ├── prisma/          # Database schema
│   ├── package.json
│   └── README.md
│
├── frontend/            # React/Vite app
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── utils/       # Utilities
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── README.md           # Main documentation
└── SETUP.md           # Detailed setup guide
```

## 🔑 Key Features Explained

### Coordinate Normalization
The app automatically handles different screen sizes. When you click on the image, the frontend converts your click position to the actual image pixel coordinates, no matter how large or small the image is displayed.

### Backend Validation
Character locations are stored in the database with:
- **pixelX, pixelY** - Center position of the character
- **radius** - How far from the center you can click (tolerance in pixels)

The backend validates clicks by calculating the distance from your click to the character's position.

### Timer & Scoring
- Starts when the page loads
- Stops when you find all characters
- You can submit your time to the leaderboard

### Responsive Design
Works on:
- Desktop (1920px+)
- Tablet (768px+)
- Mobile (320px+)

## 🚀 Deployment

### Frontend
```bash
cd frontend
npm run build
# Deploy dist/ folder to Vercel, Netlify, or any static host
```

### Backend
Deploy to Heroku, Railway, Render, or any Node.js host with environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `FRONTEND_URL` - URL of deployed frontend
- `NODE_ENV` - "production"

## ⚙️ Customization

### Change Colors/Styling
Edit the CSS files in `frontend/src/`:
- `index.css` - Global styles
- `components/*.css` - Component styles

### Adjust Game Parameters
Edit `backend/src/db/seed.js`:
- `radius` - Click tolerance (currently 30px)
- Add more characters per image
- Modify character names

### Change API Port
Edit `backend/.env`:
```
PORT=5000  # Change this
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot connect to database" | Verify PostgreSQL is running and DATABASE_URL is correct |
| CORS errors | Check FRONTEND_URL in backend .env matches your frontend URL |
| Images not loading | Verify image URLs are accessible and valid |
| Coordinates don't match | Ensure you have the correct character positions in the database |

## 📚 More Info

- Backend details: See [backend/README.md](./backend/README.md)
- Frontend details: See [frontend/README.md](./frontend/README.md)
- Full setup guide: See [SETUP.md](./SETUP.md)

## 🎉 You're Ready!

Your Where's Waldo app is ready to use. Start the backend and frontend, then visit `http://localhost:5173` and start playing!

Good luck finding Waldo! 🔍
