# Setup Instructions for Where's Waldo

## Quick Start

### 1. Database Setup

First, you need a PostgreSQL database:

```bash
# Create database
createdb wheres_waldo

# Or using PostgreSQL CLI
psql -c "CREATE DATABASE wheres_waldo;"
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your connection string
# DATABASE_URL="postgresql://user:password@localhost:5432/wheres_waldo"

# Run database migrations
npm run migrate

# (Optional) Seed with sample data
npm run seed

# Start development server
npm run dev
```

Backend will be available at `http://localhost:5000`

### 3. Frontend Setup

In a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at `http://localhost:5173`

## Adding Sample Images

To add images with characters:

### Using the API

```bash
# Add an image
curl -X POST http://localhost:5000/api/images \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Beach Scene",
    "imageUrl": "https://your-image-url.com/beach.jpg",
    "description": "Find hidden characters at the beach"
  }'

# Add characters to that image
curl -X POST http://localhost:5000/api/characters \
  -H "Content-Type: application/json" \
  -d '{
    "imageId": 1,
    "name": "Waldo",
    "pixelX": 450,
    "pixelY": 350,
    "radius": 30
  }'
```

### Using the Seed Script

Modify `backend/src/db/seed.js` with your image URLs and coordinates, then run:

```bash
npm run seed
```

## Configuration

### Backend (.env)

```
DATABASE_URL="postgresql://user:password@localhost:5432/wheres_waldo"
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### Frontend (optional .env in frontend/)

```
VITE_API_URL=http://localhost:5000/api
```

## How to Find Character Coordinates

To properly set character locations:

1. Open image in an image editor (like GIMP or Photoshop)
2. Find the character's position
3. Note the pixel coordinates of the character's center
4. Set `radius` to the acceptable click distance (typically 30-50 pixels)

## Development

### Running Both Servers

Terminal 1:

```bash
cd backend
npm run dev
```

Terminal 2:

```bash
cd frontend
npm run dev
```

### Database Management

View database (requires admin panel):

```bash
cd backend
npm run prisma:studio
```

### Debugging

Check logs in the respective terminal windows for errors.

## Deployment

### Frontend

1. Build for production:

```bash
cd frontend
npm run build
```

2. Deploy `dist` folder to:
   - Vercel
   - Netlify
   - GitHub Pages
   - Any static host

### Backend

Deploy to any Node.js hosting:

- Heroku
- Railway
- Render
- Digital Ocean
- AWS

Ensure environment variables are configured on the host.

## Troubleshooting

**Port already in use**

```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

**Database connection error**

- Verify PostgreSQL is running
- Check DATABASE_URL is correct
- Ensure database exists

**CORS errors**

- Verify FRONTEND_URL in backend .env
- Check frontend is accessing correct API URL

**Images not loading**

- Verify image URLs are valid
- Check browser console for actual errors
- Ensure CORS headers are correct

## Next Steps

1. Set up your database
2. Add sample images
3. Mark character locations
4. Test gameplay
5. Deploy!
