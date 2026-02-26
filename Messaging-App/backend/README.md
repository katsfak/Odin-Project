# Messaging App - Backend API

Node.js/Express backend for the messaging application.

## Features

- **User Authentication** - JWT-based authentication with bcrypt password hashing
- **User Profiles** - Create and customize user profiles with bio and avatar
- **Direct Messaging** - Send and receive messages between users
- **Friendships** - Add friends, pending requests, and online status
- **Message History** - Store and retrieve message conversations
- **Image Support** - Send images with messages

## Setup

### Prerequisites

- Node.js 16+
- PostgreSQL 12+

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Configure your database:

```bash
# Edit .env with your PostgreSQL connection string
DATABASE_URL="postgresql://user:password@localhost:5432/messaging_app"
```

4. Run migrations:

```bash
npm run migrate
```

5. Seed sample data (optional):

```bash
npm run seed
```

### Development

Start the development server:

```bash
npm run dev
```

Server runs on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)
- `POST /api/auth/logout` - Logout user (requires auth)

### Users

- `GET /api/users` - Get all users (requires auth)
- `GET /api/users/search?q=query` - Search users (requires auth)
- `GET /api/users/:id` - Get user profile (requires auth)
- `PUT /api/users/:id` - Update own profile (requires auth)

### Messages

- `POST /api/messages` - Send message (requires auth)
- `GET /api/messages/conversations` - Get all conversations (requires auth)
- `GET /api/messages/:userId` - Get conversation with user (requires auth)
- `DELETE /api/messages/:id` - Delete message (requires auth)

### Friendships

- `POST /api/friendships` - Add friend (requires auth)
- `GET /api/friendships` - Get friends list (requires auth)
- `GET /api/friendships/pending` - Get pending requests (requires auth)
- `GET /api/friendships/online` - Get online friends (requires auth)
- `PUT /api/friendships/:friendshipId` - Accept friend request (requires auth)
- `DELETE /api/friendships/:friendshipId` - Remove friend (requires auth)

## Request Examples

### Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","email":"alice@example.com","password":"password123"}'
```

### Send Message

```bash
curl -X POST http://localhost:5000/api/messages \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"recipientId":2,"content":"Hello!"}'
```

### Add Friend

```bash
curl -X POST http://localhost:5000/api/friendships \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"friendId":3}'
```

## Database Schema

### User

- `id` - Primary key
- `username` - Unique username
- `email` - Unique email
- `passwordHash` - Hashed password
- `avatar` - Avatar URL
- `bio` - User biography
- `isOnline` - Online status
- `lastSeen` - Last activity timestamp
- `createdAt` - Account creation time

### Message

- `id` - Primary key
- `content` - Message text
- `imageUrl` - Attached image URL
- `senderId` - Sender user ID (FK)
- `recipientId` - Recipient user ID (FK)
- `isRead` - Read status
- `createdAt` - Sent timestamp

### Friendship

- `id` - Primary key
- `user1Id` - First user ID (FK)
- `user2Id` - Second user ID (FK)
- `status` - pending, accepted, or blocked
- `createdAt` - Request timestamp

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

Tokens expire after 7 days.

## Error Handling

All errors return JSON with an error message:

```json
{
  "error": "Error message here"
}
```

## Environment Variables

```
DATABASE_URL          # PostgreSQL connection string
JWT_SECRET            # Secret key for JWT signing
NODE_ENV              # development or production
PORT                  # Server port (default: 5000)
FRONTEND_URL          # Frontend URL for CORS
```

## License

MIT
