# Quick Reference Guide

## 🚀 Start Your App (5 minutes)

### Terminal 1: Database & Backend

```bash
# Create database (first time only)
createdb social_media

# Setup backend
cd backend
npm install
cp .env.example .env
# Edit .env if needed (defaults work locally)
npm run migrate
npm run seed
npm run dev

# Backend runs on http://localhost:5000
```

### Terminal 2: Frontend

```bash
cd frontend
npm install
npm run dev

# Frontend runs on http://localhost:5173
```

### Terminal 3: Optional - Database UI

```bash
cd backend
npm run studio

# Prisma Studio runs on http://localhost:5555
```

## 🔑 Login with Test Users

After running `npm run seed`:

**Accounts:** alice, bob, charlie, diana
**Password:** password123

Email: Use `username@example.com` format

- alice@example.com
- bob@example.com
- charlie@example.com
- diana@example.com

## 📋 Feature Checklist

### What You Can Do

- ✅ Register new account
- ✅ Login/Logout
- ✅ Create posts (text + image URL)
- ✅ Delete own posts
- ✅ Like/unlike posts
- ✅ Comment on posts
- ✅ Like/unlike comments
- ✅ Delete own comments
- ✅ Follow/unfollow users
- ✅ View follower counts
- ✅ Browse user profiles
- ✅ Edit own profile (bio, username, picture)
- ✅ Search for users
- ✅ View feed from followed users
- ✅ See follow requests

## 🎯 API Endpoints (35+)

### Auth (Public)

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me (requires token)
```

### Users

```
GET    /api/users
GET    /api/users/search?q=alice
GET    /api/users/:id
PUT    /api/users/:id (requires token)
```

### Posts

```
POST   /api/posts (requires token)
GET    /api/posts/feed (requires token)
GET    /api/posts/user/:userId
DELETE /api/posts/:id (requires token, author only)
```

### Comments

```
POST   /api/comments/:postId/comments (requires token)
GET    /api/comments/:postId/comments
DELETE /api/comments/comments/:id (requires token)
```

### Likes

```
POST   /api/likes/posts/:postId/like (requires token)
DELETE /api/likes/posts/:postId/like (requires token)
POST   /api/likes/comments/:commentId/like (requires token)
DELETE /api/likes/comments/:commentId/like (requires token)
```

### Follow

```
POST   /api/follow/request (requires token)
PUT    /api/follow/:followId/accept (requires token)
DELETE /api/follow/:followId/decline (requires token)
DELETE /api/follow/:targetUserId (requires token)
GET    /api/follow/user/:userId/following
GET    /api/follow/user/:userId/followers
GET    /api/follow/requests/pending (requires token)
GET    /api/follow/status/:targetUserId
```

## 🛠️ Common Commands

```bash
# Backend
npm run dev           # Start with hot reload
npm run studio        # Open database UI
npm run migrate       # Run migrations
npm run seed          # Add test data
npm start             # Run for production

# Frontend
npm run dev           # Start dev server
npm run build         # Build for production
npm run preview       # Preview production build

# Database
npm run prisma:push   # Sync schema
npm run prisma:reset  # Reset database
```

## 📱 Pages

- `LoginPage` - /login
- `RegisterPage` - /register
- `FeedPage` - /feed (protected)
- `UsersPage` - /users (protected)
- `UserPage` - /users/:id (protected)
- `ProfilePage` - /profile (protected)

## 🐛 Troubleshooting in 30 Seconds

| Problem             | Solution                                       |
| ------------------- | ---------------------------------------------- |
| Can't login         | Clear localStorage, re-login                   |
| Posts not showing   | Follow users first, refresh page               |
| Backend won't start | Check Database URL in .env, PostgreSQL running |
| Port 5000 in use    | Kill process: `lsof -ti:5000 \| xargs kill -9` |
| Port 5173 in use    | Kill process: `lsof -ti:5173 \| xargs kill -9` |
| CORS error          | Verify backend running, frontend on :5173      |
| Database errors     | Run `npm run migrate` and `npm run seed`       |

## 🔐 Authentication Flow

1. User registers with email/password
2. Password hashed with bcryptjs (10 rounds)
3. JWT token created (7-day expiration)
4. Token stored in browser localStorage
5. Token sent with every API request
6. Backend validates token on each request
7. Protected routes check authentication

## 🗄️ Database Models (6 tables)

```
User → Posts, Comments, Likes, Follows
Post → Comments, Likes
Comment → Likes (on comments)
Like → Post or Comment
Follow → User to User
CommentLike → User + Comment
```

## 🎨 Component Tree

```
App (Router)
├── LoginPage
├── RegisterPage
├── FeedPage
│   ├── NavBar
│   ├── PostForm
│   └── Post (multiple)
│       └── Comment (multiple)
├── UsersPage
│   ├── NavBar
│   └── UserCard (grid)
├── UserPage
│   ├── NavBar
│   ├── User Info
│   ├── Posts
│   └── Followers/Following
└── ProfilePage
    ├── NavBar
    └── Edit Profile Form
```

## 📊 Data Flow

```
Frontend (React)
    ↓ (fetch + JWT)
Backend (Express)
    ↓
Prisma ORM
    ↓
PostgreSQL Database
```

## 🚢 Deploy

See `DEPLOYMENT.md` for:

- Deploy backend to Railway
- Deploy frontend to Vercel
- Setup PostgreSQL cloud database
- Configure environment variables

Quick: Railway (backend) + Vercel (frontend) = 5 minutes

## 📚 Documentation Files

- `README.md` - Project overview
- `SETUP.md` - Detailed setup guide
- `DEPLOYMENT.md` - Production deployment
- `PROJECT_PLAN.md` - Architecture & planning
- `backend/README.md` - API endpoints
- `frontend/README.md` - Frontend guide

## 🎯 Next Steps

1. ✅ Run `npm install` in both dirs
2. ✅ Create database: `createdb social_media`
3. ✅ Run migrations: `npm run migrate`
4. ✅ Load test data: `npm run seed`
5. ✅ Start both servers
6. ✅ Login and explore
7. 🚀 Deploy to production (DEPLOYMENT.md)

## 💡 Tips

- **Passwords:** For test users, all use `password123`
- **Images:** Use valid image URLs in posts/profile
- **Local API:** Vite proxy handles `/api` → backend
- **Tokens:** Auto-saved in localStorage
- **Real-time:** Not implemented (REST API only)
- **Emails:** Not validated - any format works

## 🆘 Need Help?

1. Check terminal for error messages
2. Browser DevTools (F12) for frontend errors
3. Check `backend/README.md` for API docs
4. Check `frontend/README.md` for component info
5. Review `SETUP.md` for common issues

---

**Ready?** Run the startup commands above! 🚀
