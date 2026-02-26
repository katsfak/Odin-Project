# Where's Waldo - Photo Tagging App

A full-stack photo tagging game where players find hidden characters in images. Built with React + Vite (frontend) and Node.js + Express (backend).

## 🎮 Features

- **Image Selection** - Choose from multiple game images
- **Interactive Gameplay** - Click to select and identify characters
- **Smart Targeting** - Visual targeting box with character dropdown
- **Cross-Device Support** - Coordinate normalization handles all screen sizes
- **Real-time Timer** - Tracks completion time
- **High Scores** - Leaderboard per image
- **Responsive Design** - Works on desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- PostgreSQL 12+

### Installation

#### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your database URL

# Run database migrations
npm run migrate

# Seed with sample data (optional)
npm run seed

# Start development server
npm run dev
```

Backend will run on `http://localhost:5000`

#### 2. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

### 🎯 How to Play

1. **Select an Image** - Choose from available game images
2. **Click on Character** - Click anywhere on the image to place a target
3. **Identify Character** - Select the character from the dropdown menu
4. **Validate Click** - Backend checks if you clicked in the correct area
5. **Find All Characters** - Locate all hidden characters as fast as you can
6. **Submit Score** - Enter your name to save your time on the leaderboard

## 🛠️ Architecture

### Frontend Structure

- **React + Vite** - Modern frontend framework
- **Components** - Modular component architecture
- **Coordinate Normalization** - Handles different screen sizes
- **Real-time Updates** - Instant feedback on clicks

### Backend Structure

- **Express.js** - RESTful API
- **Prisma ORM** - Database management
- **PostgreSQL** - Data persistence
- **Validation Logic** - Click verification with tolerance radius

### Key Technologies

#### Frontend

- React 18
- Vite
- CSS3 (Grid, Flexbox, Animations)

#### Backend

- Node.js + Express
- Prisma ORM
- PostgreSQL
- CORS for cross-origin requests

## 📚 API Documentation

### Images

- `GET /api/images` - Get all game images
- `GET /api/images/:id` - Get single image with characters

### Characters

- `GET /api/characters/image/:imageId` - Get characters for image

### Validation

- `POST /api/validate/click` - Validate click coordinates
  ```json
  {
    "characterId": 1,
    "clickX": 450,
    "clickY": 350
  }
  ```

### High Scores

- `GET /api/high-scores` - Get global high scores
- `GET /api/high-scores/image/:imageId` - Scores for specific image
- `POST /api/high-scores` - Submit new score

See [backend README](./backend/README.md) for full documentation.

## 🔧 Configuration

### Database Setup

The app uses PostgreSQL. Create a database:

```sql
CREATE DATABASE wheres_waldo;
```

Update your `.env` file:

```
DATABASE_URL="postgresql://user:password@localhost:5432/wheres_waldo"
```

### Seed Data

To populate with sample images and characters:

```bash
cd backend
npm run seed
```

Currently seeds with placeholder images. You can modify `src/db/seed.js` to add your own images.

## 📱 Responsive Design

The app handles different screen sizes through:

1. **Coordinate Normalization** - Converts screen clicks to actual image pixel coordinates
2. **Viewport Scaling** - Calculates scaling factors for responsive images
3. **Touch Support** - Works with mouse clicks and touch events
4. **CSS Grid/Flexbox** - Responsive layouts on all devices

## 🎨 Styling

The app features:

- Gradient backgrounds (purple theme)
- Smooth animations and transitions
- Visual feedback on interactions
- Accessible color contrast
- Mobile-first responsive design

## 🚀 Deployment

### Frontend Deployment (Vercel, Netlify, etc.)

```bash
# Build for production
npm run build

# Output is in dist/ folder
```

### Backend Deployment (Heroku, Railway, Render, etc.)

Ensure environment variables are set:

- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV` - Set to "production"
- `PORT` - Server port
- `FRONTEND_URL` - URL of deployed frontend

## 📝 Project Structure

```
Wheres-Waldo/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── db/
│   │   └── server.js
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   └── README.md
└── README.md
```

## 🔐 Security Considerations

- Character coordinates are never exposed to the frontend
- Click validation happens server-side
- High score submission validates time values
- CORS enabled only for frontend URL
- Input validation on all endpoints

## 📈 Future Enhancements

- [ ] User authentication and accounts
- [ ] Difficulty levels (normal, hard, expert)
- [ ] Multiplayer/competitive mode
- [ ] Custom image upload
- [ ] Admin panel for managing images
- [ ] Game statistics and achievements
- [ ] Difficulty ratings for images
- [ ] Hint system

## 🐛 Troubleshooting

### Coordinates not matching

- Ensure image has fully loaded before clicking
- Check that natural dimensions are retrieved correctly
- Verify tolerance radius in database

### API connection errors

- Verify backend is running on correct port
- Check CORS settings match frontend URL
- Ensure database is connected

### Database issues

- Verify PostgreSQL is running
- Check DATABASE_URL is correct
- Run migrations: `npm run migrate`

## 📄 License

MIT

## 👤 Author

Developed as part of The Odin Project curriculum.
