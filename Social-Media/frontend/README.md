# Social Media Platform - Frontend

React + Vite frontend for the Twitter-like social media platform.

## Features

- **Authentication** - Register, login with email/password
- **User Profiles** - View and edit profiles with avatar and bio
- **Posts** - Create posts with text and images
- **Feed** - View posts from users you follow
- **Interactions** - Like posts and comments, write comments
- **Follow System** - Send follow requests, accept/decline, unfollow
- **User Discovery** - Browse and search for users
- **Responsive Design** - Works on all devices

## Pages

### Public Pages

- **LoginPage** - User login
- **RegisterPage** - Create new account

### Protected Pages

- **FeedPage** - Posts from followed users
- **UsersPage** - Discover and search users
- **UserPage** - Individual user profile
- **ProfilePage** - Current user's profile (edit mode)

## Setup

### Prerequisites

- Node.js 16+
- Backend running on http://localhost:5000

### Installation

```bash
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output in `dist` folder.

## Project Structure

```
src/
├── pages/             # Page components
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── FeedPage.jsx
│   ├── UserPage.jsx
│   ├── UsersPage.jsx
│   └── ProfilePage.jsx
├── components/        # Reusable components
│   ├── NavBar.jsx
│   ├── Post.jsx
│   ├── PostForm.jsx
│   ├── Comment.jsx
│   └── UserCard.jsx
├── utils/
│   ├── api.js         # API functions
│   └── AuthContext.jsx # Auth state
├── styles/            # CSS files
├── App.jsx            # Main router
└── main.jsx           # Entry point
```

## API Integration

All API calls go through `src/utils/api.js`. The frontend expects:

- Backend at `/api` path (Vite proxy configured)
- JWT token in `Authorization: Bearer TOKEN`
- Token stored in `localStorage`

## Components

### NavBar

Top navigation with links and user menu.

### Post

Display single post with:

- Author info and timestamp
- Content and image
- Like and comment buttons
- Comment section (expandable)
- Delete button (for author)

### PostForm

Create new post:

- Text content (max 500 chars)
- Optional image URL
- Character counter

### Comment

Display single comment with:

- Author info and timestamp
- Content
- Like button
- Delete button (for author)

### UserCard

Display user card with:

- Profile image
- Username
- Bio
- Follower count
- Follow/Unfollow button
- Link to full profile

## Features in Detail

### Authentication Flow

1. User registers or logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token sent with each API request
5. Protected routes check authentication
6. Auto-logout if token expires

### Feed

- Shows posts from current user and followed users
- Newest first
- Pagination with "Load More"
- Auto-marks messages as read

### Following

- Click follow button on UserCard or profile
- Shows "Request Pending" while awaiting acceptance
- Once accepted, user's posts appear in feed
- Can unfollow anytime

### Interactions

- Like/unlike posts and comments (optimistic updates)
- Comment on posts (expandable section)
- See like counts and comment counts
- Delete own posts and comments

### Search

- Users page has search box
- Real-time search as you type
- Shows matching usernames and bios

## Styling

Uses custom CSS with:

- CSS Grid for layouts
- Flexbox for components
- CSS variables for colors
- Mobile-first responsive design
- Dark mode friendly (use system colors)

## Environment Variables

Optional, defaults work locally:

- API runs on localhost:5000
- Frontend on localhost:5173

For production, configure:

- `VITE_API_URL` environment variable

## Deployment

See [../DEPLOYMENT.md](../DEPLOYMENT.md)

### Build & Deploy

```bash
npm run build
# Deploy dist/ to Vercel, Netlify, or static host
```

## Troubleshooting

### CORS errors

- Verify backend is running
- Check `FRONTEND_URL` in backend .env

### Token errors

- Clear localStorage and re-login
- Check token is sent in Authorization header

### API 404s

- Verify backend routes match
- Check API endpoint paths in api.js

## Technologies

- React 18 - UI framework
- Vite - Build tool
- React Router v6 - Navigation
- Context API - State management
- CSS3 - Styling
- Fetch API - HTTP requests

## License

MIT
