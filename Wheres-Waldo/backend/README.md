# Where's Waldo - Backend API

A Node.js/Express API for the Where's Waldo photo tagging game.

## Features

- **Image Management** - Store and retrieve game images
- **Character Locations** - Define character locations with tolerance radius
- **Coordinate Validation** - Validate clicks against character locations with screen-size normalization
- **High Scores** - Track and display top scores for each image
- **Database** - PostgreSQL with Prisma ORM

## Setup

### Prerequisites

- Node.js 16+
- PostgreSQL database

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

3. Update `.env` with your database URL and settings

4. Run database migrations:

```bash
npm run migrate
```

5. Seed the database with sample data:

```bash
npm run seed
```

## Development

Start the development server with hot reload:

```bash
npm run dev
```

The server will run on `http://localhost:5000` (or the port specified in `.env`)

## API Endpoints

### Images

- `GET /api/images` - Get all images
- `GET /api/images/:id` - Get image with characters
- `POST /api/images` - Create new image
- `DELETE /api/images/:id` - Delete image

### Characters

- `GET /api/characters/image/:imageId` - Get characters for an image
- `POST /api/characters` - Create character
- `GET /api/characters/:id` - Get character details
- `PUT /api/characters/:id` - Update character
- `DELETE /api/characters/:id` - Delete character

### Validation

- `POST /api/validate/click` - Validate a click coordinates against a character
  ```json
  {
    "characterId": 1,
    "clickX": 450,
    "clickY": 350
  }
  ```

### High Scores

- `GET /api/high-scores` - Get all high scores
- `GET /api/high-scores/image/:imageId` - Get scores for specific image
- `POST /api/high-scores` - Submit a new high score
  ```json
  {
    "imageId": 1,
    "playerName": "John Doe",
    "timeInSeconds": 125
  }
  ```

## Database Schema

### Images

- `id` - Primary key
- `title` - Image title
- `imageUrl` - URL to the image
- `description` - Optional description
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Characters

- `id` - Primary key
- `imageId` - Foreign key to Image
- `name` - Character name
- `pixelX` - X coordinate in image pixels
- `pixelY` - Y coordinate in image pixels
- `radius` - Tolerance radius in pixels (default: 30)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### High Scores

- `id` - Primary key
- `imageId` - Foreign key to Image
- `playerName` - Player name
- `timeInSeconds` - Time to complete the game
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## Coordinate Normalization

The backend automatically handles coordinate normalization for different screen sizes through the `coordinateUtils`.js file. The validation endpoint accepts click coordinates in the image's natural pixel space.

The frontend is responsible for:

1. Getting the image element's bounding rectangle
2. Getting the image's natural dimensions
3. Converting screen coordinates to image coordinates
4. Sending normalized coordinates to the validation endpoint

## License

MIT
