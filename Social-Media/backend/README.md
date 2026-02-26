# Social Media Platform - Backend

Express.js + PostgreSQL backend for the Twitter-like social media platform.

## Features

- **User Authentication** - Register, login with JWT tokens
- **User Profiles** - Bio, profile picture, profile editing
- **Posts** - Create, read, delete text and image posts
- **Likes** - Like/unlike posts and comments
- **Comments** - Comment on posts with likes
- **Follow System** - Send follow requests, accept/decline
- **Feed** - Posts from followed users
- **Search** - Search users by username or bio

## API Endpoints

### Authentication

```
POST   /api/auth/register         - Register new user
POST   /api/auth/login             - Login user
GET    /api/auth/me                - Get current user
POST   /api/auth/logout            - Logout (client-side in JWT)
```

### Users

```
GET    /api/users                  - Get all users (paginated)
GET    /api/users/search?q=...    - Search users
GET    /api/users/:userId         - Get user profile
PUT    /api/users/:userId         - Update own profile
```

### Posts

```
POST   /api/posts                  - Create post
GET    /api/posts/feed            - Get feed posts
GET    /api/posts/user/:userId    - Get user's posts
GET    /api/posts/:postId         - Get single post
DELETE /api/posts/:postId         - Delete own post
```

### Comments

```
POST   /api/comments/:postId/comments         - Create comment
GET    /api/comments/:postId/comments         - Get post comments
DELETE /api/comments/comments/:commentId      - Delete own comment
```

### Likes

```
POST   /api/likes/posts/:postId/like          - Like post
DELETE /api/likes/posts/:postId/like          - Unlike post
POST   /api/likes/comments/:commentId/like    - Like comment
DELETE /api/likes/comments/:commentId/like    - Unlike comment
```

### Follow

```
POST   /api/follow/request                    - Send follow request
PUT    /api/follow/:followId/accept          - Accept follow request
DELETE /api/follow/:followId/decline         - Decline follow request
DELETE /api/follow/:targetUserId             - Unfollow user
GET    /api/follow/user/:userId/following    - Get following list
GET    /api/follow/user/:userId/followers    - Get followers list
GET    /api/follow/requests/pending          - Get pending requests
GET    /api/follow/status/:targetUserId      - Check follow status
```

All endpoints except `/api/auth/register` and `/api/auth/login` require:

```
Authorization: Bearer TOKEN
```

## Setup

### Prerequisites

- Node.js 16+
- PostgreSQL 12+

### Installation

1. **Create database:**

```bash
createdb social_media
```

2. **Install dependencies:**

```bash
npm install
```

3. **Setup environment:**

```bash
cp .env.example .env
# Edit .env with your database URL and JWT secret
```

4. **Run migrations:**

```bash
npm run migrate
```

5. **Seed sample data:**

```bash
npm run seed
```

6. **Start server:**

```bash
npm run dev
```

Server runs on `http://localhost:5000`

## Database Schema

### User

- id, username (unique), email (unique), passwordHash
- bio, profileImage, createdAt, updatedAt

### Post

- id, content, imageUrl, authorId (FK), createdAt, updatedAt

### Like

- id, userId (FK), postId (FK), createdAt
- Unique constraint on (userId, postId)

### Comment

- id, content, authorId (FK), postId (FK), createdAt, updatedAt

### CommentLike

- id, userId (FK), commentId (FK), createdAt
- Unique constraint on (userId, commentId)

### Follow

- id, followerId (FK), followingId (FK), status (pending/accepted/blocked)
- Unique constraint on (followerId, followingId)

## Authentication

- Passwords hashed with bcryptjs (10 rounds)
- JWT tokens with 7-day expiration
- Tokens stored in `Authorization: Bearer TOKEN` header

## Validation

### Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

### Username

- 3-20 characters
- Alphanumeric and underscores only

### Post Content

- Required, maximum 500 characters

### Comment Content

- Required, maximum 280 characters

## Error Handling

All errors return JSON:

```json
{
  "error": "Error message"
}
```

HTTP status codes:

- 400 - Bad request / Validation error
- 401 - Unauthorized
- 403 - Forbidden
- 404 - Not found
- 500 - Server error

## Development

### Prisma Studio

View and manage database visually:

```bash
npm run studio
```

### Testing Endpoints

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","email":"alice@example.com","password":"SecurePass123","confirmPassword":"SecurePass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"SecurePass123"}'
```

## Deployment

See [../DEPLOYMENT.md](../DEPLOYMENT.md)

## Dependencies

- express - Web framework
- @prisma/client - Database ORM
- jsonwebtoken - JWT authentication
- bcryptjs - Password hashing
- cors - Cross-origin requests
- dotenv - Environment variables
- @faker-js/faker - Seed data generation

## License

MIT
