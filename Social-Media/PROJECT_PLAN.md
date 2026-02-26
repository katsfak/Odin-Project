# Social Media Platform - Project Plan

## Overview

Building a **Twitter-like social media platform** with the following core features:

- User authentication & profiles
- Follow/unfollow system with follow requests
- Creating posts with images
- Liking & commenting on posts
- Feed showing posts from followed users
- User discovery page

## 🎯 Core Requirements Checklist

### Phase 1: Authentication & Users (MVP Foundation)

- [ ] User registration & login (JWT)
- [ ] User profiles with bio and profile picture
- [ ] Password hashing with bcryptjs
- [ ] Protected routes

### Phase 2: Following System

- [ ] Send follow requests to other users
- [ ] Accept/decline follow requests
- [ ] Unfollow users
- [ ] View followers/following lists
- [ ] Check follow status between users

### Phase 3: Posts & Interaction

- [ ] Create text posts
- [ ] View all posts
- [ ] Like/unlike posts
- [ ] Delete own posts
- [ ] Comment on posts
- [ ] Like/unlike comments

### Phase 4: Feed & Discovery

- [ ] Personal feed (posts from followed users)
- [ ] User discovery page
- [ ] Search users
- [ ] Profile pages with user's posts
- [ ] Post timestamps

### Phase 5: Polish & Deployment

- [ ] Responsive UI
- [ ] Error handling
- [ ] Loading states
- [ ] Deploy to production

## 📊 Database Schema

```
User
├── id (PK)
├── username (unique)
├── email (unique)
├── passwordHash
├── bio
├── profileImage (URL)
├── createdAt
└── updatedAt

Post
├── id (PK)
├── content (text)
├── imageUrl (optional)
├── authorId (FK → User)
├── createdAt
└── updatedAt

Like
├── id (PK)
├── userId (FK → User)
├── postId (FK → Post)
└── createdAt

Comment
├── id (PK)
├── content
├── authorId (FK → User)
├── postId (FK → Post)
├── createdAt
└── updatedAt

CommentLike
├── id (PK)
├── userId (FK → User)
├── commentId (FK → Comment)
└── createdAt

Follow
├── id (PK)
├── followerId (FK → User)
├── followingId (FK → User)
├── status (enum: pending/accepted/blocked)
├── createdAt
└── updatedAt
```

## 🏗️ Technology Stack

### Backend

- **Node.js/Express** - Server framework
- **PostgreSQL** - Database
- **Prisma** - ORM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **cors** - Cross-origin requests
- **Faker** - Generate seed data
- **Cloudinary** - Image hosting (optional)

### Frontend

- **React 18** - UI framework
- **Vite** - Build tool
- **React Router v6** - Navigation
- **Context API** - State management
- **CSS3** - Styling (custom or CSS modules)
- **Fetch API** - HTTP requests

## 📁 Project Structure

```
Social-Media/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── postController.js
│   │   │   ├── commentController.js
│   │   │   ├── likeController.js
│   │   │   └── followController.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── postRoutes.js
│   │   │   ├── commentRoutes.js
│   │   │   └── followRoutes.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── utils/
│   │   │   ├── jwt.js
│   │   │   ├── password.js
│   │   │   └── validation.js
│   │   ├── db/
│   │   │   └── seed.js
│   │   └── server.js
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── FeedPage.jsx
│   │   │   ├── UserPage.jsx
│   │   │   ├── UsersPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── SearchPage.jsx
│   │   ├── components/
│   │   │   ├── Post.jsx
│   │   │   ├── PostForm.jsx
│   │   │   ├── Comment.jsx
│   │   │   ├── UserCard.jsx
│   │   │   ├── NavBar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── AuthContext.jsx
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── README.md
├── SETUP.md
└── DEPLOYMENT.md
```

## 🔄 Data Flow Examples

### User Posts Feed

1. User logs in
2. Frontend fetches `/api/posts/feed`
3. Backend queries: User's own posts + posts from users they follow
4. Return with likes count, comments, author info
5. Display in reverse chronological order

### Follow System

1. User clicks "Follow" on a user card
2. POST `/api/follow/request` with targetUserId
3. Create Follow record with status='pending'
4. Send notification to target user (optional)
5. Target user can Accept/Decline
6. Once accepted, target's posts appear in follower's feed

### Liking a Post

1. User clicks like button on post
2. POST `/api/posts/:id/like`
3. Backend creates Like record linking user + post
4. Return updated like count
5. Update UI immediately (optimistic update)

## 🎨 UI Components Breakdown

### Pages

- **LoginPage** - Email/password login form
- **RegisterPage** - New user registration
- **FeedPage** - Posts from followed users (main page)
- **UserPage** - Individual user's profile and posts
- **UsersPage** - Discover all users, send follow requests
- **ProfilePage** - Current user's profile, edit options
- **SearchPage** - Search users and posts (optional)

### Components

- **Post** - Display single post with likes/comments
- **PostForm** - Create new post
- **Comment** - Display single comment
- **UserCard** - Display user with follow button
- **NavBar** - Top navigation
- **Sidebar** - Left sidebar with options

## ✨ Extra Credit Features

### Priority 1 (Core extras)

1. **Image uploads for posts** - Via Cloudinary or direct URL
2. **Update profile photo** - User can upload avatar
3. **Guest login** - Demo account for visitors

### Priority 2 (Polish)

1. Better UI/styling
2. Search posts by keyword
3. Trending/popular posts
4. Comment editing/deletion
5. Post editing
6. Infinite scroll on feed

## 📋 Implementation Order

1. **Database & Backend Setup** (2-3 hours)
   - Create Prisma schema
   - Set up Express server
   - Implement auth (login/register)
   - User CRUD operations

2. **Follow System** (1-2 hours)
   - Follow/unfollow endpoints
   - Follow request handling
   - Query optimizations

3. **Posts & Interactions** (2-3 hours)
   - Post CRUD
   - Like system
   - Comment system
   - Feed endpoint

4. **Frontend Setup** (1 hour)
   - Project structure
   - Auth pages
   - Router setup
   - API integration

5. **Frontend Pages** (2-3 hours)
   - Feed page
   - User profiles
   - User discovery
   - Post creation

6. **Styling & Polish** (1-2 hours)
   - CSS styling
   - Responsive design
   - Error states

7. **Images & Extra Features** (1-2 hours)
   - Profile image upload
   - Post images
   - Guest login

8. **Deployment** (1-2 hours)
   - Environment setup
   - Deploy backend
   - Deploy frontend

**Total estimated time: 12-18 hours**

## 🚀 Development Workflow

1. Create detailed plan ✓
2. Set up backend boilerplate
3. Create Prisma schema
4. Build all API endpoints
5. Seed database with test data
6. Test all endpoints with a tool
7. Build frontend app
8. Integrate frontend with API
9. Test full user flow
10. Style and polish
11. Deploy!

## 📝 Notes

- Keep authentication between frontend/backend solid
- Use protected routes on frontend and backend
- Implement pagination for large datasets
- Consider N+1 query problems in Prisma
- Use optimistic updates for better UX
- Test follow/unfollow edge cases
- Handle concurrent likes gracefully
- Validate all user input

## Success Criteria

✅ User can create account and login
✅ User can create text posts
✅ User can like/unlike posts
✅ User can comment on posts
✅ User can follow/unfollow other users
✅ User sees feed of posts from followed users
✅ User can view other profiles
✅ User can upload profile image
✅ App is deployed and accessible
✅ Guest login works
✅ Responsive design on mobile

---

**Let's build! Starting with backend setup...**
