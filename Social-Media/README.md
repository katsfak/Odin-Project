# Social Media Platform - Full Stack

A Twitter-like social media application built with React, Express, PostgreSQL, and Prisma.

## 📋 Features

### Core Features ✅

- **User Authentication** - Register, login, logout with JWT
- **User Profiles** - Customize bio and profile picture
- **Create Posts** - Share text and image posts
- **Interactions** - Like posts and comments
- **Comments** - Comment on posts with nested likes
- **Follow System** - Request to follow, accept/decline
- **Feed** - Posts from followed users
- **User Discovery** - Browse and search users

### Extra Features ✅

- Image URLs in posts
- Profile picture upload (via URL)
- Responsive mobile design
- Follow request notifications (view pending)
- Online/follower counts
- Account management

## 🗂️ Project Structure

```
Social-Media/
├── backend/
│   ├── src/
│   │   ├── controllers/    (6 files with business logic)
│   │   ├── routes/         (6 files with endpoints)
│   │   ├── middleware/     (auth.js)
│   │   ├── utils/          (jwt, password, validation)
│   │   ├── db/             (seed.js)
│   │   └── server.js       (Express app)
│   ├── prisma/
│   │   └── schema.prisma   (6 models)
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── pages/          (6 page components)
│   │   ├── components/     (5 reusable components)
│   │   ├── styles/         (10 CSS files)
│   │   ├── utils/          (api.js, AuthContext.jsx)
│   │   ├── App.jsx         (Router)
│   │   └── main.jsx        (Entry)
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── PROJECT_PLAN.md         (Detailed planning)
├── SETUP.md               (Setup instructions)
├── DEPLOYMENT.md          (Deployment guide)
└── README.md              (This file)
```

## 🚀 Quick Start

### 1. Database Setup

```bash
createdb social_media
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with DATABASE_URL
npm run migrate
npm run seed          # Optional: load sample users
npm run dev           # Runs on localhost:5000
```

### 3. Frontend Setup (new terminal)

```bash
cd frontend
npm install
npm run dev           # Runs on localhost:5173
```

### 4. Login

Open http://localhost:5173 and use test credentials:

```
Email: alice@example.com
Password: password123
```

## 📚 Full Documentation

- **[SETUP.md](./SETUP.md)** - Detailed setup guide with troubleshooting
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deploy to production
- **[PROJECT_PLAN.md](./PROJECT_PLAN.md)** - Architecture & planning
- **[backend/README.md](./backend/README.md)** - API endpoints
- **[frontend/README.md](./frontend/README.md)** - Frontend guide

## 🔧 Tech Stack

### Backend

- **Node.js/Express** - REST API
- **PostgreSQL** - Database
- **Prisma** - ORM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend

- **React 18** - UI framework
- **Vite** - Build tool
- **React Router v6** - Navigation
- **Context API** - State management
- **CSS3** - Styling

## 📊 Database Schema

```
User (8 fields)
  └── posts, comments, likes, comments, followers, following

Post (5 fields)
  ├── author (FK)
  ├── likes (1:M)
  └── comments (1:M)

Comment (5 fields)
  ├── author (FK)
  ├── post (FK)
  └── likes (1:M)

Like (4 fields)
  ├── user (FK)
  └── post (FK)

CommentLike (4 fields)
  ├── user (FK)
  └── comment (FK)

Follow (6 fields)
  ├── follower (FK)
  └── following (FK)
```

## 🎯 API Endpoints Summary

**Auth:**

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- POST /api/auth/logout

**Users:**

- GET /api/users
- GET /api/users/search
- GET /api/users/:id
- PUT /api/users/:id

**Posts:**

- POST /api/posts
- GET /api/posts/feed
- GET /api/posts/user/:userId
- GET /api/posts/:id
- DELETE /api/posts/:id

**Comments:**

- POST /api/comments/:postId/comments
- GET /api/comments/:postId/comments
- DELETE /api/comments/comments/:id

**Likes:**

- POST /api/likes/posts/:postId/like
- DELETE /api/likes/posts/:postId/like
- POST /api/likes/comments/:commentId/like
- DELETE /api/likes/comments/:commentId/like

**Follow:**

- POST /api/follow/request
- PUT /api/follow/:followId/accept
- DELETE /api/follow/:followId/decline
- DELETE /api/follow/:targetUserId
- GET /api/follow/user/:userId/following
- GET /api/follow/user/:userId/followers
- GET /api/follow/requests/pending
- GET /api/follow/status/:targetUserId

## 🎨 Pages & Components

### Pages

- **LoginPage** - Authentication (public)
- **RegisterPage** - New account (public)
- **FeedPage** - Posts timeline (protected)
- **UsersPage** - User discovery (protected)
- **UserPage** - User profile (protected)
- **ProfilePage** - Current user settings (protected)

### Components

- **NavBar** - Top navigation
- **Post** - Display post with interactions
- **PostForm** - Create new post
- **Comment** - Display comment
- **UserCard** - User preview card

## 🔐 Security

- Passwords hashed with bcryptjs (10 rounds)
- JWT tokens (7-day expiration)
- Protected routes on frontend & backend
- CORS configured
- Input validation
- User can only modify own content

## 🌟 Features Walkthrough

### Create Account

1. Click "Create an account" on login
2. Enter username, email, password
3. Auto-logged in after registration

### Post Something

1. On Feed page, click text area
2. Type your message (max 500 chars)
3. Add optional image URL
4. Click "Post"

### Follow Someone

1. Go to Users page
2. Click "Follow" on a user card
3. Go to Friends page to manage requests
4. Once accepted, see their posts in feed

### Interactive Posts

1. Click ❤️ to like a post
2. Click 💬 to expand and add comments
3. Like comments with ❤️
4. Delete your own posts/comments with ✕

### Edit Profile

1. Click "Profile" in navbar
2. Click "Edit Profile"
3. Update username, bio, avatar URL
4. Click "Save Changes"

## 🧪 Test Data

Seeded with 4 test users:

- alice, bob, charlie, diana
- Password: password123
- With sample posts, follows, likes

Add more with custom API calls.

## 📱 Responsive Design

- Works on mobile (< 480px)
- Tablet optimized (480px - 768px)
- Desktop fully featured (> 768px)
- Touch-friendly buttons
- Mobile navigation

## 🚢 Deployment

### Frontend (Vercel/Netlify)

```bash
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Render)

- Set DATABASE_URL env var
- Set JWT_SECRET
- Deploy `/backend` directory

See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step guide.

## 🐛 Development

### Common Issues

**Can't connect to database**

- Verify PostgreSQL running
- Check DATABASE_URL in .env
- Run `npm run migrate`

**CORS errors**

- Ensure backend started on :5000
- Check FRONTEND_URL in backend .env
- Verify frontend on :5173

**Tokens not working**

- Clear localStorage
- Re-login
- Check Authorization header

### Useful Commands

```bash
# Backend
npm run dev         # Start with watch mode
npm run studio      # Open Prisma Studio
npm run migrate     # Run migrations
npm run seed        # Populate sample data

# Frontend
npm run dev         # Vite dev server
npm run build       # Build for production
npm run preview      # Preview production build
```

## 👥 Contributing

This is a learning project. Extend it with:

- Real-time updates (Socket.io)
- Comments on comments
- Direct messaging
- Notifications
- Hashtags
- User groups
- Trending posts
- DM notifications
- Email verification
- Password reset

## 📄 License

MIT

---

**Ready to deploy?** See [DEPLOYMENT.md](./DEPLOYMENT.md)

**Need help setting up?** See [SETUP.md](./SETUP.md)

**Want more details?** See [PROJECT_PLAN.md](./PROJECT_PLAN.md)
